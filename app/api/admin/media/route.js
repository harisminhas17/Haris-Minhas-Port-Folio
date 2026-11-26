import { requireSession } from "@/lib/auth/guard";
import { getSql } from "@/lib/db";
import {
  checkImageBytes,
  checkImageDimensions,
  checkImageFormat,
  getImageRule,
} from "@/lib/admin/image-rules";
import { readImageDimensions } from "@/lib/admin/image-size";

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

  const rule = getImageRule(form.get("kind") || "default");

  const formatError = checkImageFormat(file.type, rule);
  if (formatError) return Response.json({ error: formatError }, { status: 415 });

  const byteError = checkImageBytes(file.size, rule);
  if (byteError) return Response.json({ error: byteError }, { status: 413 });

  const buffer = Buffer.from(await file.arrayBuffer());

  const dimensionError = checkImageDimensions(readImageDimensions(buffer), rule);
  if (dimensionError) return Response.json({ error: dimensionError }, { status: 422 });

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
