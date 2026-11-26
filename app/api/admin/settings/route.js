import { requireSession } from "@/lib/auth/guard";
import { getSql } from "@/lib/db";

export async function GET() {
  const auth = await requireSession();
  if (!auth.ok) return auth.response;

  const sql = getSql();
  if (!sql) {
    return Response.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  const rows = await sql`select data, updated_at from site_settings where id = 1`;
  return Response.json({
    settings: rows[0]?.data ?? {},
    updatedAt: rows[0]?.updated_at ?? null,
  });
}

export async function PUT(request) {
  const auth = await requireSession();
  if (!auth.ok) return auth.response;

  const sql = getSql();
  if (!sql) {
    return Response.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Settings must be an object" }, { status: 422 });
  }

  const rows = await sql`
    insert into site_settings (id, data)
    values (1, ${JSON.stringify(body)}::jsonb)
    on conflict (id) do update set data = excluded.data, updated_at = now()
    returning data, updated_at
  `;

  return Response.json({ settings: rows[0].data, updatedAt: rows[0].updated_at });
}
