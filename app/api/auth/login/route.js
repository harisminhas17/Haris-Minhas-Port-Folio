import { cookies } from "next/headers";

import { getAdminEmail, verifyPassword } from "@/lib/auth/password";
import { SESSION_COOKIE, createSessionToken, sessionCookieOptions } from "@/lib/auth/session";

function fail(message, status = 401) {
  return Response.json({ error: message }, { status });
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return fail("Invalid request body", 400);
  }

  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

  if (!email || !password) {
    return fail("Email and password are required", 422);
  }

  const adminEmail = getAdminEmail();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.JWT_SECRET;

  if (!adminEmail || !passwordHash || !secret) {
    console.error("[auth] ADMIN_EMAIL, ADMIN_PASSWORD_HASH or JWT_SECRET is missing");
    return fail("Admin auth is not configured on the server", 500);
  }

  if (email !== adminEmail || !verifyPassword(password, passwordHash)) {
    return fail("Invalid email or password");
  }

  const token = await createSessionToken(email);
  cookies().set(SESSION_COOKIE, token, sessionCookieOptions());

  return Response.json({ ok: true, email });
}
