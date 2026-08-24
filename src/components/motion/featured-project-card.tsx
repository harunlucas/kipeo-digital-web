"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { FeaturedWork, WorkStatus } from "@/content/selected-work";

const statusLabels: Record<WorkStatus, string> = {
  live: "Live project",
  "in-development": "In development",
  maintained: "Maintained platform",
  completed: "Completed project",
};

export function FeaturedProjectCard({ work }: { work: FeaturedWork }) {
  const shouldReduceMotion = useReducedMotion();
  const metadata = [work.contribution, statusLabels[work.status], "External case study"].filter(Boolean) as string[];

  return (
    <motion.article
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center"
    >
      <div className="relative overflow-hidden rounded-2xl border border-ink-elevated bg-ink shadow-panel">
        <div className="flex items-center gap-1.5 border-b border-ink-elevated bg-ink px-4 py-3" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-ink-muted/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-muted/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-teal" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={work.image}
            alt={work.imageAlt}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-top grayscale"
          />
        </div>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-strong">
          {work.category}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-paper-foreground">{work.title}</h3>

        <ul className="mt-3 flex flex-wrap gap-2">
          {metadata.map((label) => (
            <li
              key={label}
              className="rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium text-slate-muted"
            >
              {label}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm leading-relaxed text-slate">{work.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {work.technologies.map((tech) => (
            <li key={tech} className="rounded-full bg-mist px-3 py-1 text-xs text-slate">
              {tech}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs text-slate-muted">{work.disclosure}</p>

        <a
          href={work.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal-strong hover:text-ink"
        >
          View case study
          <ExternalLink
            className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
            aria-hidden
          />
          <span className="sr-only">(opens harunlucas.com in a new tab)</span>
        </a>
      </div>
    </motion.article>
  );
}
