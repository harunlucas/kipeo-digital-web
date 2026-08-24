"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ProcessPhase } from "@/content/services-page";

/**
 * Compact, non-interactive 4-phase process rail for /services — a local,
 * /services-only phase list (not `studioJourneyStages`, which /studio still
 * uses at its own 8-stage granularity and which this pass must not touch).
 */
export function ServiceProcessRail({ phases }: { phases: ProcessPhase[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div>
      {/* sm and up: single row with a connecting line */}
      <div className="relative hidden sm:block">
        <div className="absolute left-[4%] right-[4%] top-5 h-px bg-neutral-300" aria-hidden />
        <motion.div
          className="absolute left-[4%] top-5 h-px w-[92%] origin-left bg-teal-strong"
          initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
          whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        />
        <ol className="relative grid grid-cols-4 gap-4">
          {phases.map((phase, index) => (
            <motion.li
              key={phase.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-strong bg-paper font-display text-sm text-teal-strong">
                {index + 1}
              </span>
              <span className="mt-2.5 text-sm font-semibold text-paper-foreground">{phase.label}</span>
              <span className="mt-1 max-w-[15rem] text-xs leading-relaxed text-slate">{phase.description}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Below sm: vertical stack */}
      <ol className="flex flex-col gap-5 sm:hidden">
        {phases.map((phase, index) => (
          <li key={phase.id} className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-teal-strong bg-paper font-display text-sm text-teal-strong">
              {index + 1}
            </span>
            <div>
              <span className="block text-sm font-semibold text-paper-foreground">{phase.label}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-slate">{phase.description}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
