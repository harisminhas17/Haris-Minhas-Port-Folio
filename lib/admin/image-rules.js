// Validation rules for admin image uploads. Shared by the upload field (client)
// and the media API (server) so a rule is defined exactly once.

export const IMAGE_RULES = {
  default: {
    label: "Image",
    formats: ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif", "image/svg+xml"],
    formatHint: "PNG, JPG, WEBP, GIF, AVIF or SVG",
    maxBytes: 5 * 1024 * 1024,
    byteHint: "5 MB",
    enforceDimensions: false,
    dimensionHint: "",
  },

  avatar: {
    label: "Profile image",
    formats: ["image/png", "image/jpeg", "image/webp"],
    formatHint: "PNG, JPG or WEBP",
    maxBytes: 2 * 1024 * 1024,
    byteHint: "2 MB",
    enforceDimensions: true,
    minWidth: 128,
    minHeight: 128,
    maxWidth: 1024,
    maxHeight: 1024,
    aspect: [0.96, 1.04],
    dimensionHint: "Square (1:1), 128–1024 px",
  },

  hero: {
    label: "Hero image",
    formats: ["image/png", "image/jpeg", "image/webp"],
    formatHint: "PNG, JPG or WEBP",
    maxBytes: 4 * 1024 * 1024,
    byteHint: "4 MB",
    enforceDimensions: true,
    minWidth: 800,
    minHeight: 800,
    maxWidth: 2400,
    maxHeight: 3000,
    aspect: [0.68, 0.92],
    dimensionHint: "Portrait (3:4 to 4:5), 800–2400 px wide",
  },
};

export function getImageRule(kind) {
  return IMAGE_RULES[kind] ?? IMAGE_RULES.default;
}

// Reads intrinsic pixel size for raster formats. SVG and formats the browser
// cannot decode resolve to null, so callers skip dimension checks.
export function readImageDimensions(file) {
  return new Promise((resolve) => {
    if (file.type === "image/svg+xml") {
      resolve(null);
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

function formatMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(bytes >= 1024 * 1024 ? 1 : 2)} MB`;
}

export function checkImageFormat(type, rule) {
  if (!rule.formats.includes(type)) {
    return `Wrong format. Use ${rule.formatHint}.`;
  }
  return null;
}

export function checkImageBytes(bytes, rule) {
  if (bytes > rule.maxBytes) {
    return `File is ${formatMb(bytes)} — the limit is ${rule.byteHint}.`;
  }
  return null;
}

// Dimension rule check on an already-measured { width, height }.
export function checkImageDimensions(size, rule) {
  if (!rule.enforceDimensions) return null;

  if (!size) {
    return "Could not read the image dimensions. Try re-saving it as PNG or JPG.";
  }

  if (size.width < rule.minWidth || size.height < rule.minHeight) {
    return `Too small: ${size.width}×${size.height}px. Minimum is ${rule.minWidth}×${rule.minHeight}px.`;
  }

  if (size.width > rule.maxWidth || size.height > rule.maxHeight) {
    return `Too large: ${size.width}×${size.height}px. Maximum is ${rule.maxWidth}×${rule.maxHeight}px.`;
  }

  const ratio = size.width / size.height;
  if (ratio < rule.aspect[0] || ratio > rule.aspect[1]) {
    return `Wrong aspect ratio (${size.width}×${size.height}). Use ${rule.dimensionHint}.`;
  }

  return null;
}

// Client-side entry point: validates a File using the browser to measure pixels.
export async function validateImageFile(file, rule) {
  const formatError = checkImageFormat(file.type, rule);
  if (formatError) return formatError;

  const byteError = checkImageBytes(file.size, rule);
  if (byteError) return byteError;

  if (!rule.enforceDimensions) return null;

  const size = await readImageDimensions(file);
  return checkImageDimensions(size, rule);
}
