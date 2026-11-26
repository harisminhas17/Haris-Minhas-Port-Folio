import { getSession } from "@/lib/auth/session";

export async function requireSession() {
  const session = await getSession();

  if (!session) {
    return {
      ok: false,
      response: Response.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true, session };
}
