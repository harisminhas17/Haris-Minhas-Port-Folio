import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}

if (password.length < 8) {
  console.error("Use at least 8 characters.");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");

// Colon-delimited on purpose: Next.js runs dotenv-expand on .env, which would
// treat "$abc" inside the value as a variable reference and blank it out.
console.log(`\nADMIN_PASSWORD_HASH=scrypt:${salt}:${hash}\n`);
