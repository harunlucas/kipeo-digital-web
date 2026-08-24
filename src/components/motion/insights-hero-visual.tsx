"use client";

import { motion, useReducedMotion } from "motion/react";
import { Lightbulb, GitBranch, Boxes } from "lucide-react";

const steps = [
  { id: "idea", label: "Idea", icon: Lightbulb, x: 12, y: 20 },
  { id: "decision", label: "Decision", icon: GitBranch, x: 46, y: 52 },
  { id: "system", label: "System", icon: Boxes, x: 82, y: 20 },
];

/**
 * A compact editorial visual for the /insights hero — an idea moving
 * through a decision point into a built system, connected by a drawn path.
 * Deliberately smaller and calmer than the Services `EcosystemVisual` (no
 * pointer-tracked tilt) so the hero stays compact, and built fresh so it
 * isn't reused from Homepage, Services, Work or Studio.
 */
export function InsightsHeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[440px]">
      <div aria-hidden className="absolute -right-8 top-2 h-48 w-48 rounded-full bg-teal/15 blur-[80px]" />
      <div aria-hidden className="absolute -left-6 bottom-0 h-40 w-40 rounded-full bg-highlight/15 blur-[80px]" />

      <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="insight-path" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-highlight)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <motion.path
          d={`M${steps[0].x},${steps[0].y} Q${steps[1].x - 6},${steps[0].y + 8} ${steps[1].x},${steps[1].y}`}
          stroke="url(#insight-path)"
          strokeWidth="0.6"
          strokeDasharray="2 2"
          fill="none"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d={`M${steps[1].x},${steps[1].y} Q${steps[2].x - 6},${steps[1].y - 8} ${steps[2].x},${steps[2].y}`}
          stroke="url(#insight-path)"
          strokeWidth="0.6"
          strokeDasharray="2 2"
          fill="none"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {steps.map(({ id, label, icon: Icon, x, y }, index) => (
        <motion.div
          key={id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 bg-paper shadow-panel sm:h-14 sm:w-14">
            <Icon className="h-5 w-5 text-teal-strong" aria-hidden />
          </span>
          <span className="rounded-full bg-ink/85 px-2 py-0.5 text-[10px] font-medium text-ink-foreground">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
