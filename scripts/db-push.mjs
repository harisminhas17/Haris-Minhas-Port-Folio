import { readFile } from "node:fs/promises";
import path from "node:path";

import { closeDb, getSql } from "../lib/db.js";

const sql = getSql();

if (!sql) {
  console.error("DATABASE_URL is missing or invalid. Add it to .env first.");
  process.exit(1);
}

const schemaPath = path.join(process.cwd(), "db", "schema.sql");
const schema = await readFile(schemaPath, "utf8");

const statements = schema
  .split(";")
  .map((s) =>
    s
      .split("\n")
      .filter((line) => !line.trim().startsWith("--"))
      .join("\n")
      .trim()
  )
  .filter(Boolean);

for (const statement of statements) {
  const label = statement.slice(0, 48).replace(/\s+/g, " ");
  try {
    await sql.query(statement);
    console.log(`ok   ${label}`);
  } catch (error) {
    console.error(`fail ${label}`);
    console.error(error.message);
    process.exit(1);
  }
}

console.log(`\nApplied ${statements.length} statements.`);
await closeDb();
