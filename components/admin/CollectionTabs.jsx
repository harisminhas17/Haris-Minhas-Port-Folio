import Link from "next/link";

import { collections } from "@/lib/admin/collections";

export default function CollectionTabs({ activeKey }) {
  return (
    <nav
      aria-label="Collections"
      className="mb-8 flex flex-wrap gap-2 border-b border-line pb-4"
    >
      {Object.entries(collections).map(([key, config]) => (
        <Link
          key={key}
          href={`/admin/content/${key}`}
          aria-current={key === activeKey ? "page" : undefined}
          className={`rounded-md border px-3 py-1.5 text-[13px] transition-colors ${
            key === activeKey
              ? "border-accent-line bg-accent-soft text-ink"
              : "border-line text-muted hover:border-line-strong hover:text-ink"
          }`}
        >
          {config.label}
        </Link>
      ))}
    </nav>
  );
}
