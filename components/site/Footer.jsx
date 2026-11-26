import { ArrowUpRight } from "lucide-react";

export default function Footer({ content }) {
  const { meta, contact } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="shell">
        <div className="flex flex-col justify-between gap-10 py-12 md:flex-row md:items-end md:py-16">
          <div>
            <p className="label">{meta.role}</p>
            <a
              href="#top"
              className="mt-4 block font-display text-h2 tracking-tight transition-colors hover:text-accent"
            >
              {meta.siteName}
            </a>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {contact.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 label text-muted transition-colors hover:text-ink"
              >
                {social.label}
                <ArrowUpRight
                  className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </a>
            ))}
            <a
              href={`mailto:${contact.email}`}
              className="label text-muted transition-colors hover:text-ink"
            >
              Email
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-line py-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            © {year} {meta.siteName}. All rights reserved.
          </p>
          <a
            href="/admin"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint transition-colors hover:text-accent"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
