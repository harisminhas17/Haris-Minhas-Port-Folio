import { NextResponse } from "next/server";

import { getSql } from "@/lib/db";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required" },
      { status: 422 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 422 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long" }, { status: 422 });
  }

  const sql = getSql();

  if (!sql) {
    console.error("[contact] DATABASE_URL is not configured, message dropped");
    return NextResponse.json({ error: "Messages are not configured" }, { status: 503 });
  }

  try {
    await sql`
      insert into contact_messages (name, email, message)
      values (${name}, ${email}, ${message})
    `;
  } catch (error) {
    console.error("[contact] insert failed:", error.message);
    return NextResponse.json({ error: "Could not save message" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
