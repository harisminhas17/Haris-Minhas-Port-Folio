"use client";

import { Layers, Sparkles, Server, Database } from "lucide-react";

import { Reveal, RevealStagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";

const icons = { Layers, Sparkles, Server, Database };

export default function Capabilities({ content }) {
  const { capabilities } = content;

  return (
    <section className="relative border-t border-line py-20 md:py-32">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionLabel>{capabilities.kicker}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 max-w-xl font-display text-h2">
                {capabilities.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
              {String(capabilities.items.length).padStart(2, "0")} disciplines
            </span>
          </Reveal>
        </div>

        <RevealStagger className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          {capabilities.items.map((item, i) => {
            const Icon = icons[item.icon] || Layers;
            return (
              <StaggerItem
                key={item.title}
                className="group relative flex flex-col justify-between bg-surface p-6 transition-colors duration-500 hover:bg-raised sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <Icon
                    className="h-6 w-6 text-muted transition-colors duration-300 group-hover:text-accent"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] tracking-[0.16em] text-faint">
                    0{i + 1}
                  </span>
                </div>
                <div className="mt-16">
                  <h3 className="font-display text-h3 text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
