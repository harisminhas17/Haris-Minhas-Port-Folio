import Link from "next/link";

import { getSql } from "@/lib/db";
import { collections } from "@/lib/admin/collections";

export const dynamic = "force-dynamic";

async function getCounts() {
  const sql = getSql();
  if (!sql) return null;

  try {
    const rows = await sql`
      select
        (select count(*) from projects)::int as projects,
        (select count(*) from experiences)::int as experiences,
        (select count(*) from capabilities)::int as capabilities,
        (select count(*) from testimonials)::int as testimonials,
        (select count(*) from contact_messages where is_read = false)::int as unread,
        (select count(*) from contact_messages)::int as messages
    `;
    return rows[0];
  } catch {
    return null;
  }
}

export default async function AdminOverview() {
  const counts = await getCounts();

  return (
    <div>
      <div className="border-b border-line pb-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Overview
        </h1>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          Content management
        </p>
      </div>

      {!counts ? (
        <div className="mt-8 rounded-lg border border-line-strong bg-surface p-6">
          <p className="text-sm font-medium text-ink">
            Database not connected
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Add <code className="font-mono text-[12px] text-accent">DATABASE_URL</code>{" "}
            to <code className="font-mono text-[12px]">.env</code>, then run{" "}
            <code className="font-mono text-[12px] text-accent">pnpm db:push</code>{" "}
            and <code className="font-mono text-[12px] text-accent">pnpm db:seed</code>.
            The public site keeps serving its built-in defaults until then.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
            {[
              { label: "Projects", value: counts.projects, href: "/admin/content/projects" },
              { label: "Experience", value: counts.experiences, href: "/admin/content/experiences" },
              { label: "Capabilities", value: counts.capabilities, href: "/admin/content/capabilities" },
              { label: "Testimonials", value: counts.testimonials, href: "/admin/content/testimonials" },
            ].map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className="bg-surface p-5 transition-colors hover:bg-raised"
              >
                <p className="font-display text-3xl font-semibold tracking-tight">
                  {card.value}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  {card.label}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Link
              href="/admin/messages"
              className="rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                Inbox
              </p>
              <p className="mt-2 font-display text-xl font-medium tracking-tight">
                {counts.unread} unread
                <span className="ml-2 text-sm font-normal text-muted">
                  of {counts.messages}
                </span>
              </p>
            </Link>

            <Link
              href="/admin/settings"
              className="rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                Settings
              </p>
              <p className="mt-2 font-display text-xl font-medium tracking-tight">
                Identity, hero, about, contact
              </p>
            </Link>
          </div>

          <div className="mt-10">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
              All collections
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(collections).map(([key, config]) => (
                <Link
                  key={key}
                  href={`/admin/content/${key}`}
                  className="rounded-md border border-line px-3 py-2 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  {config.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
