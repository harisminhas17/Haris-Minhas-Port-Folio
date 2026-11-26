import { neon } from "@neondatabase/serverless";
import pg from "pg";

// Neon's serverless driver speaks HTTP and only works against Neon hosts.
// A plain `postgres://localhost:5433/...` URL needs the TCP driver instead.
function isNeonHost(url) {
  return /neon\.tech|neon\.build|\.neon\./i.test(url);
}

function createQueryFn(url) {
  if (isNeonHost(url)) {
    return { fn: neon(url), pool: null };
  }

  const createdPool = new pg.Pool({
    connectionString: url,
    max: 5,
    idleTimeoutMillis: 30_000,
  });

  const fn = async (strings, ...values) => {
    const text = Array.isArray(strings)
      ? strings.reduce(
          (acc, chunk, i) => acc + chunk + (i < values.length ? `$${i + 1}` : ""),
          ""
        )
      : strings;

    const { rows } = await createdPool.query(text, values);
    return rows;
  };

  // Used by the admin collection routes for dynamic SQL with explicit params.
  fn.query = async (text, params = []) => {
    const { rows } = await createdPool.query(text, params);
    return rows;
  };

  return { fn, pool: createdPool };
}

let client;
let pool = null;

export function getSql() {
  const url = process.env.DATABASE_URL;

  if (!url) return null;

  if (!/^postgres(ql)?:\/\//.test(url)) {
    return null;
  }

  if (!client) {
    const created = createQueryFn(url);
    client = created.fn;
    pool = created.pool;
  }

  return client;
}

export async function closeDb() {
  if (pool) {
    await pool.end();
    pool = null;
    client = null;
  }
}

export function isDbConfigured() {
  return Boolean(getSql());
}
