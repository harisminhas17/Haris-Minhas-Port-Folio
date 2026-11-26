import { requireSession } from "@/lib/auth/guard";
import { getSql } from "@/lib/db";

const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml", "image/avif"];
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(request) {
  const auth = await requireSession();
  if (!auth.ok) return auth.response;

  const sql = getSql();
  if (!sql) {
    return Response.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return Response.json({ error: "No file provided" }, { status: 422 });
  }

  if (!ALLOWED.includes(file.type)) {
    return Response.json(
      { error: `Unsupported type. Use PNG, JPG, WEBP, GIF, AVIF or SVG.` },
      { status: 415 }
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json({ error: "File is larger than 5 MB" }, { status: 413 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 120);

  const rows = await sql`
    insert into media (filename, content_type, size, data)
    values (${safeName}, ${file.type}, ${buffer.length}, ${buffer})
    returning id, filename, content_type, size
  `;

  return Response.json({
    id: rows[0].id,
    url: `/api/media/${rows[0].id}`,
    filename: rows[0].filename,
    type: rows[0].content_type,
    size: rows[0].size,
  });
}
