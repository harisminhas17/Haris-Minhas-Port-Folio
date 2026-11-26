"use client";

import { usePathname, useRouter } from "next/navigation";

import ThemeToggle from "@/components/theme/ThemeToggle";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/content/projects", label: "Projects" },
  { href: "/admin/content/experiences", label: "Experience" },
  { href: "/admin/content/capabilities", label: "Capabilities" },
  { href: "/admin/content/testimonials", label: "Testimonials" },
  { href: "/admin/content/stack-groups", label: "Stack groups" },
  { href: "/admin/content/stack-logos", label: "Stack logos" },
  { href: "/admin/content/socials", label: "Social links" },
  { href: "/admin/settings", label: "Site settings" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminNav({ email }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex w-full shrink-0 flex-col gap-8 border-b border-line p-5 lg:h-dvh lg:w-64 lg:border-b-0 lg:border-r lg:p-6">
      <div className="flex items-center justify-between gap-3">
        <a href="/admin" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong font-mono text-[10px] text-muted">
            HM
          </span>
          <span className="font-display text-sm font-medium tracking-tight">
            Admin
          </span>
        </a>
        <ThemeToggle />
      </div>

      <nav aria-label="Admin" className="flex flex-wrap gap-1.5 lg:flex-col">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);

          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-[13px] transition-colors ${
                active
                  ? "bg-surface text-ink"
                  : "text-muted hover:bg-raised hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      <div className="mt-auto hidden flex-col gap-3 lg:flex">
        <p className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
          {email}
        </p>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-muted transition-colors hover:text-ink"
        >
          View site ↗
        </a>
        <button
          type="button"
          onClick={logout}
          className="text-left text-[13px] text-muted transition-colors hover:text-danger"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
