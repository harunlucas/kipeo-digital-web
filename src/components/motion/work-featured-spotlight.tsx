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

/**
 * A dedicated, more cinematic presentation of the featured project for
 * /work — built fresh rather than extending `FeaturedProjectCard`, which
 * the homepage also renders and this pass must not change. Genuine BushLite
 * screenshots are shown here exclusively — no longer duplicated in the
 * /work hero, which uses `WorkIndexVisual` instead.
 */
export function WorkFeaturedSpotlight({
  work,
  secondaryScreenshot,
}: {
  work: FeaturedWork;
  secondaryScreenshot?: { src: string; alt: string };
}) {
  const shouldReduceMotion = useReducedMotion();
  const metadata = [work.contribution, statusLabels[work.status], "External case study"].filter(Boolean) as string[];

  return (
    <motion.article
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="group relative overflow-hidden rounded-2xl border border-ink-elevated bg-ink shadow-panel">
        <div className="flex items-center gap-1.5 border-b border-ink-elevated bg-ink px-4 py-3" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-ink-muted/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-muted/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-teal" />
        </div>
        <div className="relative aspect-[21/9] overflow-hidden sm:aspect-[2.4/1]">
          <Image
            src={work.image}
            alt={work.imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-top grayscale transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"
          />
        </div>
        {secondaryScreenshot && (
          <div className="relative aspect-[21/5] overflow-hidden border-t border-ink-elevated sm:aspect-[3/1]">
            <Image
              src={secondaryScreenshot.src}
              alt={secondaryScreenshot.alt}
              fill
              sizes="100vw"
              className="object-cover object-top grayscale transition-all duration-500 ease-out group-hover:grayscale-0"
            />
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-strong">{work.category}</p>
          <h3 className="mt-2 text-2xl font-semibold text-paper-foreground sm:text-3xl">{work.title}</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate sm:text-base">{work.description}</p>
        </div>

        <div>
          <ul className="flex flex-wrap gap-2">
            {metadata.map((label) => (
              <li
                key={label}
                className="rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium text-slate-muted"
              >
                {label}
              </li>
            ))}
          </ul>
          <ul className="mt-3 flex flex-wrap gap-2">
            {work.technologies.map((tech) => (
              <li key={tech} className="rounded-full bg-mist px-3 py-1 text-xs text-slate">
                {tech}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-muted">{work.disclosure}</p>
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-teal-strong hover:text-ink"
          >
            View case study
            <ExternalLink
              className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              aria-hidden
            />
            <span className="sr-only">(opens harunlucas.com in a new tab)</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
