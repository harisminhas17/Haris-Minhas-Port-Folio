import { getSql } from "@/lib/db";

// Neon returns bytea as a Buffer/Uint8Array. Some proxies hand back a
// `\xDEADBEEF` hex string instead, so normalize both shapes here rather than
// letting an unexpected form silently corrupt the image.
function toBuffer(data) {
  if (!data) return null;

  if (Buffer.isBuffer(data)) return data;

  if (data instanceof Uint8Array) return Buffer.from(data);

  if (typeof data === "string") {
    const hex = data.startsWith("\\x") ? data.slice(2) : data;
    return Buffer.from(hex, "hex");
  }

  return null;
}

export async function GET(_request, { params }) {
  const sql = getSql();
  if (!sql) return new Response("Not found", { status: 404 });

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return new Response("Not found", { status: 404 });
  }

  const rows = await sql`
    select content_type, data from media where id = ${id}
  `;

  if (!rows.length) return new Response("Not found", { status: 404 });

  const buffer = toBuffer(rows[0].data);

  if (!buffer) return new Response("Not found", { status: 404 });

  return new Response(buffer, {
    headers: {
      "Content-Type": rows[0].content_type,
      "Content-Length": String(buffer.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
