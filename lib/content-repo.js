import defaultContent from "@/lib/content";
import { getSql } from "@/lib/db";

function emptyContent() {
  return {
    meta: defaultContent.meta,
    hero: defaultContent.hero,
    about: defaultContent.about,
    capabilities: { ...defaultContent.capabilities, items: [] },
    work: { ...defaultContent.work, projects: [] },
    experience: { ...defaultContent.experience, items: [] },
    stack: { ...defaultContent.stack, groups: [], logos: [] },
    testimonials: { ...defaultContent.testimonials, items: [] },
    contact: { ...defaultContent.contact, socials: [] },
  };
}

function normalizeSettings(row) {
  const base = emptyContent();
  const data = row?.data ?? {};

  return {
    meta: { ...base.meta, ...(data.meta ?? {}) },
    hero: { ...base.hero, ...(data.hero ?? {}) },
    about: { ...base.about, ...(data.about ?? {}) },
    contact: { ...base.contact, ...(data.contact ?? {}), socials: [] },
  };
}

export async function getSiteContent() {
  const sql = getSql();

  if (!sql) {
    return { content: defaultContent, source: "default" };
  }

  try {
    const [settingsRows, projects, experiences, capabilities, stackGroups, stackLogos, testimonials, socials] =
      await Promise.all([
        sql`select data from site_settings where id = 1`,
        sql`select id, slug, name, year, summary, description, tags, image, logo, live_url, repo_url from projects order by sort_order, id`,
        sql`select id, company, role, period, logo, points from experiences order by sort_order, id`,
        sql`select id, icon, title, description from capabilities order by sort_order, id`,
        sql`select id, label, items from stack_groups order by sort_order, id`,
        sql`select id, name, src from stack_logos order by sort_order, id`,
        sql`select id, quote, name, role from testimonials order by sort_order, id`,
        sql`select id, label, href from socials order by sort_order, id`,
      ]);

    const settings = normalizeSettings(settingsRows[0]);

    return {
      source: "database",
      content: {
        meta: settings.meta,
        hero: settings.hero,
        about: settings.about,
        capabilities: {
          ...defaultContent.capabilities,
          items: capabilities.map((row) => ({
            id: row.id,
            icon: row.icon,
            title: row.title,
            description: row.description,
          })),
        },
        work: {
          ...defaultContent.work,
          projects: projects.map((row) => ({
            id: row.id,
            slug: row.slug,
            name: row.name,
            year: row.year,
            summary: row.summary,
            description: row.description,
            tags: row.tags ?? [],
            image: row.image,
            logo: row.logo,
            liveUrl: row.live_url,
            repoUrl: row.repo_url,
          })),
        },
        experience: {
          ...defaultContent.experience,
          items: experiences.map((row) => ({
            id: row.id,
            company: row.company,
            role: row.role,
            period: row.period,
            logo: row.logo,
            points: row.points ?? [],
          })),
        },
        stack: {
          ...defaultContent.stack,
          groups: stackGroups.map((row) => ({
            id: row.id,
            label: row.label,
            items: row.items ?? [],
          })),
          logos: stackLogos.map((row) => ({
            id: row.id,
            name: row.name,
            src: row.src,
          })),
        },
        testimonials: {
          ...defaultContent.testimonials,
          items: testimonials.map((row) => ({
            id: row.id,
            quote: row.quote,
            name: row.name,
            role: row.role,
          })),
        },
        contact: { ...settings.contact, socials: socials.map((row) => ({ ...row })) },
      },
    };
  } catch (error) {
    console.error("[content] falling back to defaults:", error.message);
    return { content: defaultContent, source: "default" };
  }
}
