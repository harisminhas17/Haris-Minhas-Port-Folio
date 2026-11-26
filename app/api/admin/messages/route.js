import { requireSession } from "@/lib/auth/guard";
import { getSql } from "@/lib/db";

export async function GET() {
  const auth = await requireSession();
  if (!auth.ok) return auth.response;

  const sql = getSql();
  if (!sql) {
    return Response.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  const rows = await sql`
    select id, name, email, message, is_read, created_at
    from contact_messages
    order by created_at desc
    limit 200
  `;

  const unread = rows.filter((r) => !r.is_read).length;

  return Response.json({ items: rows, unread });
}

export async function PATCH(request) {
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

  const id = Number(body?.id);
  if (!id) return Response.json({ error: "id is required" }, { status: 422 });

  const isRead = Boolean(body.isRead);
  await sql`update contact_messages set is_read = ${isRead} where id = ${id}`;

  return Response.json({ ok: true });
}

export async function DELETE(request) {
  const auth = await requireSession();
  if (!auth.ok) return auth.response;

  const sql = getSql();
  if (!sql) {
    return Response.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return Response.json({ error: "id is required" }, { status: 422 });

  await sql`delete from contact_messages where id = ${id}`;
  return Response.json({ ok: true });
}
