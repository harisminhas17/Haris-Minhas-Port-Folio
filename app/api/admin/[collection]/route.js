import { getSql } from "@/lib/db";
import { requireSession } from "@/lib/auth/guard";
import {
  coerceValue,
  fieldColumn,
  getCollection,
} from "@/lib/admin/collections";

function db() {
  const sql = getSql();
  if (!sql) {
    return { error: Response.json({ error: "DATABASE_URL is not configured" }, { status: 503 }) };
  }
  return { sql };
}

async function readRows(sql, config) {
  return sql.query(
    `select * from ${config.table} order by ${config.sortable ? "sort_order, " : ""}id`
  );
}

function serializeRow(config, row) {
  const out = { id: row.id };
  for (const field of config.fields) {
    out[field.name] = row[fieldColumn(field)];
  }
  return out;
}

function buildValues(config, body, { forInsert }) {
  const values = {};
  let missing = null;

  for (const field of config.fields) {
    if (forInsert && field.type === "slug" && field.from && !body[field.name]) {
      values[fieldColumn(field)] = coerceValue(field, body[field.from]);
      continue;
    }

    const raw = body[field.name];
    const value = coerceValue(field, raw);

    if (field.required && (value === "" || value == null)) {
      missing = field.label;
      break;
    }

    if (field.default && value === "") {
      values[fieldColumn(field)] = field.default;
      continue;
    }

    values[fieldColumn(field)] = value;
  }

  if (missing) {
    return { error: `${missing} is required` };
  }

  const columns = Object.keys(values);
  if (!columns.length) return { error: "No fields to save" };

  return { columns, values, params: columns.map((c) => values[c]) };
}

export async function GET(_request, { params }) {
  const auth = await requireSession();
  if (!auth.ok) return auth.response;

  const config = getCollection(params.collection);
  if (!config) return Response.json({ error: "Unknown collection" }, { status: 404 });

  const { sql, error } = db();
  if (error) return error;

  const rows = await readRows(sql, config);
  return Response.json({ items: rows.map((r) => serializeRow(config, r)) });
}

export async function POST(request, { params }) {
  const auth = await requireSession();
  if (!auth.ok) return auth.response;

  const config = getCollection(params.collection);
  if (!config) return Response.json({ error: "Unknown collection" }, { status: 404 });

  const { sql, error } = db();
  if (error) return error;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid body" }, { status: 400 });
  }

  const built = buildValues(config, body, { forInsert: true });
  if (built.error) return Response.json({ error: built.error }, { status: 422 });

  const next = await sql.query(
    `select coalesce(max(sort_order), -1) + 1 as next from ${config.table}`
  );
  const sortOrder = next[0]?.next ?? 0;

  const placeholders = built.columns.map((_, i) => `$${i + 1}`).join(", ");
  const sqlText = `insert into ${config.table} (${built.columns.join(", ")}, sort_order) values (${placeholders}, $${
    built.columns.length + 1
  }) returning *`;

  try {
    const rows = await sql.query(sqlText, [...built.params, sortOrder]);
    return Response.json({ item: serializeRow(config, rows[0]) }, { status: 201 });
  } catch (e) {
    if (e.code === "23505") {
      return Response.json({ error: "That slug is already used" }, { status: 409 });
    }
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const auth = await requireSession();
  if (!auth.ok) return auth.response;

  const config = getCollection(params.collection);
  if (!config) return Response.json({ error: "Unknown collection" }, { status: 404 });

  const { sql, error } = db();
  if (error) return error;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid body" }, { status: 400 });
  }

  // Reorder: { order: [id, id, ...] }
  if (Array.isArray(body.order)) {
    await Promise.all(
      body.order.map((id, index) =>
        sql.query(`update ${config.table} set sort_order = $1 where id = $2`, [index, id])
      )
    );
    return Response.json({ ok: true });
  }

  const id = Number(body.id);
  if (!id) return Response.json({ error: "id is required" }, { status: 422 });

  const built = buildValues(config, body, { forInsert: false });
  if (built.error) return Response.json({ error: built.error }, { status: 422 });

  const setClause = built.columns.map((c, i) => `${c} = $${i + 1}`).join(", ");
  const sqlText = `update ${config.table} set ${setClause} where id = $${built.columns.length + 1} returning *`;

  try {
    const rows = await sql.query(sqlText, [...built.params, id]);
    if (!rows.length) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ item: serializeRow(config, rows[0]) });
  } catch (e) {
    if (e.code === "23505") {
      return Response.json({ error: "That slug is already used" }, { status: 409 });
    }
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireSession();
  if (!auth.ok) return auth.response;

  const config = getCollection(params.collection);
  if (!config) return Response.json({ error: "Unknown collection" }, { status: 404 });

  const { sql, error } = db();
  if (error) return error;

  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return Response.json({ error: "id is required" }, { status: 422 });

  await sql.query(`delete from ${config.table} where id = $1`, [id]);
  return Response.json({ ok: true });
}
