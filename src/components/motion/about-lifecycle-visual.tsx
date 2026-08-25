"use client";

import { motion, useReducedMotion } from "motion/react";
import { lifecycleStages } from "@/content/about";

const RADIUS = 38;
const CENTER = 50;

function pointOnCircle(index: number, total: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

/**
 * "What Kipeo is" visual: the product lifecycle as a closed loop rather than
 * a one-way pipeline — discovery, design, build, data, integration and
 * deployment/support, circling back to discovery. Distinct from Studio's
 * isometric workspace and linear journey stages, and from the hero's
 * stacked-layer deck above.
 */
export function AboutLifecycleVisual() {
  const shouldReduceMotion = useReducedMotion();
  const total = lifecycleStages.length;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px] p-6">
      <p className="sr-only">
        A closed loop showing the product lifecycle: strategy and discovery, product and interface design, frontend
        and backend development, databases and data structures, APIs and integrations, and deployment, maintenance
        and support — connecting back to discovery.
      </p>

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="var(--color-teal)"
          strokeOpacity="0.35"
          strokeWidth="0.6"
          strokeDasharray="2 3"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      <div aria-hidden className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-teal-strong/30 bg-teal-tint text-[10px] font-medium leading-tight text-teal-strong">
          One
          <br />
          product
        </span>
      </div>

      {lifecycleStages.map((stage, index) => {
        const { x, y } = pointOnCircle(index, total);
        const Icon = stage.icon;
        return (
          <motion.div
            key={stage.id}
            aria-hidden
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="absolute flex w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-paper text-teal-strong shadow-card">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-[9px] leading-tight text-slate-muted">{stage.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
