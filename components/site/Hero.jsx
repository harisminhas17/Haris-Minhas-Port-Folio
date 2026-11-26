"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { PillButton } from "@/components/ui/primitives";

const ease = [0.16, 1, 0.3, 1];

export default function Hero({ content }) {
  const { hero } = content;

  return (
    <section id="top" className="relative pt-28 md:pt-36">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6"
        >
          <span className="label">{hero.eyebrow}</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <span className="label hidden sm:inline-block">
              {content.meta.availabilityNote}
            </span>
            <span className="label text-accent">Portfolio / 2026</span>
          </div>
        </motion.div>

        <div className="pt-10 md:pt-14">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="text-display font-display"
          >
            {hero.headlineLines.map((line, i) => (
              <span key={line} className="block">
                {i === hero.headlineLines.length - 1 ? (
                  <span className="text-muted">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h1>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-16 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="relative col-span-1 min-h-[340px] overflow-hidden bg-surface md:col-span-5 md:min-h-[420px]"
          >
            <Image
              src="/assets/Haris%20Minhas.png"
              alt="Haris Minhas"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top grayscale transition-all duration-700 ease-expo hover:grayscale-0"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--surface)] via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-line-strong bg-[color:var(--canvas)]/70 px-3 py-1.5 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
                {content.meta.role}
              </span>
            </div>
          </motion.div>

          <div className="col-span-1 flex flex-col bg-surface md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease }}
              className="flex flex-1 flex-col justify-between gap-8 p-6 sm:p-9"
            >
              <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
                {hero.intro}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <PillButton href={hero.ctaPrimary.href}>
                  {hero.ctaPrimary.label}
                </PillButton>
                <PillButton href={hero.ctaSecondary.href} variant="ghost">
                  {hero.ctaSecondary.label}
                </PillButton>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 border-t border-line">
              {hero.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                  className={`min-w-0 px-3 py-5 sm:px-6 ${
                    i !== 0 ? "border-l border-line" : ""
                  }`}
                >
                  <p className="font-display text-xl font-semibold tracking-tight sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase leading-snug tracking-[0.1em] text-faint sm:text-[10px] sm:tracking-[0.14em]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 overflow-hidden border-y border-line py-4 md:mt-24">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center gap-8" aria-hidden={dup === 1}>
              {[
                "Laravel",
                "React",
                "Next.js",
                "Node.js",
                "PHP",
                "MySQL",
                "MongoDB",
                "Tailwind",
                "AWS",
                "AI Integration",
              ].map((tech) => (
                <span key={`${dup}-${tech}`} className="flex items-center gap-8">
                  <span className="font-display text-sm uppercase tracking-[0.2em] text-faint">
                    {tech}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-accent opacity-60" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
