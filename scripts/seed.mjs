import { closeDb, getSql } from "../lib/db.js";
import defaultContent from "../lib/content.js";

const sql = getSql();

if (!sql) {
  console.error("DATABASE_URL is missing or invalid. Add it to .env first.");
  process.exit(1);
}

const { meta, hero, about, contact } = defaultContent;

const settings = {
  meta: {
    siteName: meta.siteName,
    role: meta.role,
    available: meta.available,
    availabilityNote: meta.availabilityNote,
    nav: meta.nav,
  },
  hero: {
    eyebrow: hero.eyebrow,
    firstName: hero.firstName,
    lastName: hero.lastName,
    headlineLines: hero.headlineLines,
    intro: hero.intro,
    phone: hero.phone,
    email: hero.email,
    ctaPrimary: hero.ctaPrimary,
    ctaSecondary: hero.ctaSecondary,
    stats: hero.stats,
  },
  about: {
    kicker: about.kicker,
    title: about.title,
    paragraphs: about.paragraphs,
    pullQuote: about.pullQuote,
    facts: about.facts,
  },
  contact: {
    kicker: contact.kicker,
    title: contact.title,
    intro: contact.intro,
    email: contact.email,
    phone: contact.phone,
    whatsapp: contact.whatsapp,
    location: contact.location,
  },
};

async function seed() {
  await sql.query(
    `insert into site_settings (id, data) values (1, $1::jsonb)
     on conflict (id) do update set data = excluded.data, updated_at = now()`,
    [JSON.stringify(settings)]
  );
  console.log("ok   site_settings");

  const tables = [
    "projects",
    "experiences",
    "capabilities",
    "stack_groups",
    "stack_logos",
    "testimonials",
    "socials",
  ];

  const counts = await Promise.all(
    tables.map(async (table) => ({
      table,
      rows: await sql.query(`select count(*)::int as n from ${table}`),
    }))
  );

  if (counts.some((c) => c.rows[0].n > 0)) {
    console.log("skip content rows (data already present)");
    return;
  }

  for (const [i, p] of defaultContent.work.projects.entries()) {
    await sql.query(
      `insert into projects (slug, name, year, summary, description, tags, image, logo, live_url, repo_url, sort_order)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [p.slug, p.name, p.year, p.summary, p.description, p.tags, p.image, p.logo, p.liveUrl, p.repoUrl, i]
    );
  }
  console.log(`ok   projects (${defaultContent.work.projects.length})`);

  for (const [i, e] of defaultContent.experience.items.entries()) {
    await sql.query(
      `insert into experiences (company, role, period, logo, points, sort_order)
       values ($1,$2,$3,$4,$5,$6)`,
      [e.company, e.role, e.period, e.logo, e.points, i]
    );
  }
  console.log(`ok   experiences (${defaultContent.experience.items.length})`);

  for (const [i, c] of defaultContent.capabilities.items.entries()) {
    await sql.query(
      `insert into capabilities (icon, title, description, sort_order) values ($1,$2,$3,$4)`,
      [c.icon, c.title, c.description, i]
    );
  }
  console.log(`ok   capabilities (${defaultContent.capabilities.items.length})`);

  for (const [i, g] of defaultContent.stack.groups.entries()) {
    await sql.query(
      `insert into stack_groups (label, items, sort_order) values ($1,$2,$3)`,
      [g.label, g.items, i]
    );
  }
  console.log(`ok   stack_groups (${defaultContent.stack.groups.length})`);

  for (const [i, l] of defaultContent.stack.logos.entries()) {
    await sql.query(
      `insert into stack_logos (name, src, sort_order) values ($1,$2,$3)`,
      [l.name, l.src, i]
    );
  }
  console.log(`ok   stack_logos (${defaultContent.stack.logos.length})`);

  for (const [i, t] of defaultContent.testimonials.items.entries()) {
    await sql.query(
      `insert into testimonials (quote, name, role, sort_order) values ($1,$2,$3,$4)`,
      [t.quote, t.name, t.role, i]
    );
  }
  console.log(`ok   testimonials (${defaultContent.testimonials.items.length})`);

  for (const [i, s] of defaultContent.contact.socials.entries()) {
    await sql.query(
      `insert into socials (label, href, sort_order) values ($1,$2,$3)`,
      [s.label, s.href, i]
    );
  }
  console.log(`ok   socials (${defaultContent.contact.socials.length})`);
}

seed()
  .then(async () => {
    console.log("\nSeed complete.");
    await closeDb();
  })
  .catch(async (error) => {
    console.error(error);
    await closeDb();
    process.exit(1);
  });
