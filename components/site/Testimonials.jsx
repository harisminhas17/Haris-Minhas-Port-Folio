"use client";

import { Reveal, RevealStagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";

export default function Testimonials({ content }) {
  const { testimonials } = content;

  return (
    <section className="relative border-t border-line py-20 md:py-32">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionLabel>{testimonials.kicker}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-h2">{testimonials.title}</h2>
            </Reveal>
          </div>
        </div>

        <RevealStagger className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <StaggerItem
              key={i}
              className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-line-strong sm:p-8"
            >
              <div>
                <span
                  className="font-display text-4xl leading-none text-accent"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-ink">
                  {item.quote}
                </p>
              </div>
              <div className="mt-8 border-t border-line pt-5">
                <p className="text-sm font-medium text-ink">{item.name}</p>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                  {item.role}
                </p>
              </div>
            </StaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
