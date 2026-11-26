"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Reveal, RevealStagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/primitives";

function ProjectCard({ project, large }) {
  const href = project.liveUrl || project.repoUrl || null;

  return (
    <StaggerItem
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-500 hover:border-line-strong ${
        large ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[color:var(--surface-raised)] ${
          large ? "aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[320px]" : "aspect-[16/11]"
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} interface`}
            fill
            sizes={large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover object-top transition-transform duration-[900ms] ease-expo group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-faint">
            {project.name}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--surface)]/90 via-transparent to-transparent opacity-80" />
        <span className="absolute left-4 top-4 rounded-full border border-line-strong bg-[color:var(--canvas)]/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink backdrop-blur">
          {project.year}
        </span>
      </div>

      <div className={`flex flex-col p-5 sm:p-6 ${large ? "" : "flex-1"}`}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-h3 text-ink">{project.name}</h3>
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name}`}
              className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-muted transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
          )}
        </div>
        <p className={`mt-3 text-sm leading-relaxed text-muted ${large ? "" : "flex-1"}`}>
          {project.summary}
        </p>
        <ul className={`mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-line ${large ? "" : "mt-auto"}`}>
          {project.tags.slice(0, large ? 6 : 4).map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-faint"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </StaggerItem>
  );
}

export default function Work({ content }) {
  const { work } = content;

  return (
    <section id="work" className="relative border-t border-line py-20 md:py-32">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionLabel>{work.kicker}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-h2">{work.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              {work.intro}
            </p>
          </Reveal>
        </div>

        <RevealStagger className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {work.projects.map((project, i) => (
            <ProjectCard
              key={project.slug || project.name}
              project={project}
              large={i === 0}
            />
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
