// Reads pixel dimensions straight from PNG, JPEG and WebP headers. No image
// library: the upload API only needs width/height, and these three formats
// cover every rule that enforces a dimension.

function readPng(buffer) {
  // 8-byte signature, then IHDR: length(4) type(4) width(4) height(4)
  if (buffer.length < 24) return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function readJpeg(buffer) {
  let offset = 2; // skip SOI (0xFFD8)

  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];

    // SOFn markers carry the frame dimensions. C4/C8/CC are not frames.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    // Standalone markers have no length field.
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }

    const length = buffer.readUInt16BE(offset + 2);
    if (length < 2) return null;
    offset += 2 + length;
  }

  return null;
}

function readWebp(buffer) {
  const chunk = buffer.toString("ascii", 12, 16);

  if (chunk === "VP8 ") {
    // Lossy: 3-byte frame tag, 3-byte start code, then 14-bit dimensions.
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }

  if (chunk === "VP8L") {
    // Lossless: 14-bit width-1 and height-1 packed into 4 bytes.
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }

  if (chunk === "VP8X") {
    // Extended: 24-bit canvas size, minus one.
    const width = buffer.readUIntLE(24, 3) + 1;
    const height = buffer.readUIntLE(27, 3) + 1;
    return { width, height };
  }

  return null;
}

export function readImageDimensions(buffer) {
  if (!buffer || buffer.length < 16) return null;

  if (buffer[0] === 0x89 && buffer.toString("ascii", 1, 4) === "PNG") {
    return readPng(buffer);
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    return readJpeg(buffer);
  }

  if (buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") {
    return readWebp(buffer);
  }

  return null;
}
