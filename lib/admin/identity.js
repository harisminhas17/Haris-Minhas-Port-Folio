import defaultContent from "@/lib/content";
import { getSql } from "@/lib/db";

// Minimal read of the identity fields the admin shell needs. The dashboard is
// server-rendered, so this stays separate from the full site content query.
export async function getAdminIdentity() {
  const sql = getSql();
  if (!sql) return defaultContent.meta;

  try {
    const rows = await sql`select data from site_settings where id = 1`;
    const meta = rows[0]?.data?.meta ?? {};
    return { ...defaultContent.meta, ...meta };
  } catch {
    return defaultContent.meta;
  }
}
