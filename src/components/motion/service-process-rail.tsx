"use client";

import { motion, useReducedMotion } from "motion/react";
import type { StudioJourneyStage } from "@/content/studio";

/**
 * Compact, non-interactive 8-step process rail for /services — reuses
 * `studioJourneyStages` (Discover…Support) from `content/studio.ts` rather
 * than duplicating the stage list, and deliberately stays lighter than the
 * homepage's full interactive `ProcessRoute` (no tabs, no per-stage detail
 * panel), since the brief asks for a compact summary that links out to
 * `/studio` for the complete process.
 */
export function ServiceProcessRail({ stages }: { stages: StudioJourneyStage[] }) {
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
        <ol className="relative grid grid-cols-8 gap-2">
          {stages.map((stage, index) => (
            <motion.li
              key={stage.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-strong bg-paper font-display text-sm text-teal-strong">
                {index + 1}
              </span>
              <span className="mt-2.5 text-xs font-semibold text-paper-foreground sm:text-sm">{stage.label}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Below sm: horizontally scrollable strip */}
      <ol className="flex gap-5 overflow-x-auto pb-1 sm:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {stages.map((stage, index) => (
          <li key={stage.id} className="flex shrink-0 flex-col items-center gap-2 text-center" style={{ width: "76px" }}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-teal-strong bg-paper font-display text-sm text-teal-strong">
              {index + 1}
            </span>
            <span className="text-xs font-medium text-paper-foreground">{stage.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
