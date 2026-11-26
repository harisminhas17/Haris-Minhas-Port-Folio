import { scryptSync, timingSafeEqual } from "node:crypto";

const PREFIX = "scrypt";

export function verifyPassword(password, stored) {
  if (!stored) return false;

  // Only "$" in a .env value is expanded away by Next's dotenv-expand, so the
  // canonical format is colon-delimited. Accept "$" too for hand-written values.
  const parts = stored.startsWith(`${PREFIX}$`)
    ? stored.split("$")
    : stored.split(":");

  const [scheme, salt, hash] = parts;

  if (scheme !== PREFIX || !salt || !hash) return false;

  let expected;
  try {
    expected = Buffer.from(hash, "hex");
  } catch {
    return false;
  }

  if (!expected.length) return false;

  const actual = scryptSync(password, salt, expected.length);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function getAdminEmail() {
  return (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
}
