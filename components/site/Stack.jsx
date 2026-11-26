"use client";

import Image from "next/image";

import { Reveal, RevealStagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";

export default function Stack({ content }) {
  const { stack } = content;

  return (
    <section className="relative border-t border-line py-20 md:py-32">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionLabel>{stack.kicker}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-h2">{stack.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-2">
              {stack.logos.map((logo) => (
                <span
                  key={logo.name}
                  className="relative flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface"
                  title={logo.name}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={22}
                    height={22}
                    className="object-contain grayscale transition-all duration-500 hover:grayscale-0"
                  />
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <RevealStagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-16 lg:grid-cols-3">
          {stack.groups.map((group) => (
            <StaggerItem key={group.label} className="bg-surface p-6 sm:p-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {group.label}
              </h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line px-2.5 py-1.5 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-ink"
                  >
                    {item}
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
