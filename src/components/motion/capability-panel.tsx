"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { WorkCapabilityArea } from "@/content/work";
import { CapabilityVisual } from "@/components/motion/capability-visual";

/**
 * /work's capability-area panel — labelled "Capability" (never "Case
 * study") and rendering a hand-built SVG/CSS composition instead of a
 * photo or screenshot, since these six areas are illustrative capability
 * summaries, not completed client deliverables.
 */
export function CapabilityPanel({ area, index }: { area: WorkCapabilityArea; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-elevated bg-ink-elevated/40"
    >
      <div className="relative aspect-[2.35/1] overflow-hidden bg-ink">
        <div aria-hidden className="bg-grid-ink pointer-events-none absolute inset-0 opacity-40" />
        <CapabilityVisual variant={area.visual} />
        <span className="absolute left-4 top-4 rounded-full border border-ink-elevated bg-ink/80 px-3 py-1 text-[11px] uppercase tracking-wide text-ink-foreground backdrop-blur">
          Capability
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-ink-foreground">{area.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{area.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {area.examples.map((example) => (
            <li key={example} className="rounded-full border border-white/10 bg-ink/60 px-2.5 py-1 text-[11px] text-ink-muted">
              {example}
            </li>
          ))}
        </ul>

        <Link
          href={area.ctaHref}
          className="group/cta mt-5 inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-medium text-teal hover:text-white"
        >
          {area.ctaLabel}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </motion.div>
  );
}
