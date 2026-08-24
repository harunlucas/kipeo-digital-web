"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { CapabilityPath } from "@/content/selected-work";

/**
 * A dedicated, dark-section capability panel for /work — built fresh
 * rather than reusing `CapabilityPathCard` (which the homepage also
 * renders), so it can drop the long per-card AI-disclosure line in favour
 * of one section-level note, and point its CTA at /services instead of
 * the self-referencing /work href baked into the shared content.
 */
export function CapabilityPanel({
  path,
  ctaHref,
  ctaLabel,
  index,
}: {
  path: CapabilityPath;
  ctaHref: string;
  ctaLabel: string;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const visual = path.capabilityVisual;

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-elevated bg-ink-elevated/40"
    >
      {visual && (
        <div className="group relative aspect-[2.35/1] overflow-hidden bg-ink">
          <Image
            src={visual.src}
            alt={visual.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full border border-dashed border-white/40 bg-ink/60 px-3 py-1 text-[11px] uppercase tracking-wide text-ink-muted backdrop-blur">
            Concept visual
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-ink-foreground">{path.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{path.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {path.examples.map((example) => (
            <li key={example} className="rounded-full border border-white/10 bg-ink/60 px-2.5 py-1 text-[11px] text-ink-muted">
              {example}
            </li>
          ))}
        </ul>

        <Link
          href={ctaHref}
          className="group/cta mt-5 inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-medium text-teal hover:text-white"
        >
          {ctaLabel}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
            aria-hidden
          />
        </Link>

        {path.relatedExpertise && (
          <div className="mt-auto pt-5">
            <a
              href={path.relatedExpertise.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-ink-foreground"
            >
              {path.secondaryExpertiseLink}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              <span className="sr-only">(opens {path.relatedExpertise.sourceName} in a new tab)</span>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
