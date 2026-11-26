"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ThemeToggle from "@/components/theme/ThemeToggle";

const ease = [0.16, 1, 0.3, 1];

export default function Navbar({ content }) {
  const nav = content.meta.nav;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-line bg-[color:var(--canvas)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label={`${content.meta.siteName} — home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong font-mono text-[11px] transition-colors group-hover:border-accent group-hover:text-accent">
            HM
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">
            {content.meta.siteName}
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-wipe label-lg text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {content.meta.available && (
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Available
            </span>
          )}
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex h-9 items-center rounded-full bg-accent px-4 text-[13px] font-medium text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Let&rsquo;s talk
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 top-0 h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] border-t border-line bg-[color:var(--canvas)] md:hidden"
          >
            <nav className="shell flex flex-col pt-8" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease }}
                  className="flex items-baseline justify-between border-b border-line py-5"
                >
                  <span className="font-display text-3xl font-medium tracking-tight">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-faint">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-accent text-sm font-medium text-[color:var(--accent-ink)]"
              >
                Let&rsquo;s talk
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
