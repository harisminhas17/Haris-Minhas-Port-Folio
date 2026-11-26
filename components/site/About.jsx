"use client";

import { Reveal, RevealStagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";

export default function About({ content }) {
  const { about } = content;

  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>{about.kicker}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 max-w-sm font-display text-h2">{about.title}</h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="space-y-6">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <blockquote className="mt-10 border-l-2 border-accent pl-6">
                <p className="font-display text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl">
                  {about.pullQuote}
                </p>
              </blockquote>
            </Reveal>

            <RevealStagger className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {about.facts.map((fact) => (
                <StaggerItem key={fact.label} className="bg-surface p-4 sm:p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-snug text-ink">
                    {fact.value}
                  </p>
                </StaggerItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
