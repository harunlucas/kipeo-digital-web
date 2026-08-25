"use client";

import { motion, useReducedMotion } from "motion/react";
import { collaborationRoles } from "@/content/about";

const RADIUS = 36;
const CENTER = 50;

function pointOnCircle(index: number, total: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

/**
 * Team-led delivery model visual: a hub-and-spoke arrangement — Kipeo
 * coordinating six roles around one project — rather than the Studio page's
 * single-line TrustPath. Every role's label and description are always
 * visible; nothing here depends on hover.
 */
export function AboutCollaborationVisual() {
  const shouldReduceMotion = useReducedMotion();
  const total = collaborationRoles.length;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] p-4 sm:p-8">
      <p className="sr-only">
        A hub-and-spoke diagram: Kipeo at the centre, coordinating six roles around each project — define, design,
        build, integrate, launch and support.
      </p>

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        {collaborationRoles.map((role, index) => {
          const { x, y } = pointOnCircle(index, total);
          return (
            <motion.line
              key={role.id}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="var(--color-neutral-300)"
              strokeWidth="0.5"
              initial={shouldReduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}
      </svg>

      <div aria-hidden className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-strong bg-teal-strong text-center text-xs font-semibold leading-tight text-white shadow-panel">
          Kipeo
        </span>
      </div>

      {collaborationRoles.map((role, index) => {
        const { x, y } = pointOnCircle(index, total);
        return (
          <motion.div
            key={role.id}
            aria-hidden
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.25 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="absolute flex w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-xl border border-neutral-200 bg-paper px-2 py-2 text-center shadow-card sm:w-28 sm:px-2.5 sm:py-2.5"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className="text-xs font-semibold text-paper-foreground">{role.label}</span>
            <span className="text-[9px] leading-tight text-slate-muted">{role.description}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
