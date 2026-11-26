"use client";

import Image from "next/image";

import { Reveal, RevealStagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";

export default function Experience({ content }) {
  const { experience } = content;

  return (
    <section id="experience" className="relative border-t border-line py-20 md:py-32">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionLabel>{experience.kicker}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-h2">{experience.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
              {String(experience.items.length).padStart(2, "0")} roles
            </span>
          </Reveal>
        </div>

        <RevealStagger className="mt-12 md:mt-16">
          {experience.items.map((item, i) => (
            <StaggerItem
              key={`${item.company}-${i}`}
              className="group grid grid-cols-1 gap-4 border-t border-line py-7 md:grid-cols-12 md:gap-8 md:py-9"
            >
              <div className="flex items-center gap-3 md:col-span-3">
                {item.logo ? (
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-raised">
                    <Image
                      src={item.logo}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-contain p-1 grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  </span>
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-raised font-mono text-[10px] text-faint">
                    {item.company.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {item.period}
                </p>
              </div>

              <div className="md:col-span-4">
                <h3 className="font-display text-lg font-medium tracking-tight text-ink">
                  {item.company}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  {item.role}
                </p>
              </div>

              <ul className="space-y-2 md:col-span-5">
                {item.points.map((point, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-faint transition-colors group-hover:bg-accent"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
