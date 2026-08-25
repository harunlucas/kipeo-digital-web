"use client";

import { motion, useReducedMotion } from "motion/react";
import { Layers } from "lucide-react";
import { problemSituations } from "@/content/about";

const PROBLEM_Y = [10, 28.5, 50, 71.5, 90];
const PROBLEM_X = 10;
const SYSTEM_X = 88;
const SYSTEM_Y = 50;

/**
 * "Why Kipeo exists" visual: several disconnected, everyday situations
 * converging into one system — a static editorial diagram, not the
 * Homepage's interactive tabbed problem/solution showcase. Everything here
 * is visible at once; nothing depends on hover or a click.
 */
export function AboutProblemSystemVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[480px] py-4">
      <p className="sr-only">
        A diagram showing several disconnected situations — spreadsheets, repeated data entry, tools that do not
        communicate, websites that are difficult to manage, and operational records that are difficult to
        retrieve — each connecting into a single consolidated system.
      </p>

      <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        {PROBLEM_Y.map((y, index) => (
          <motion.line
            key={index}
            x1={PROBLEM_X + 4}
            y1={(y / 100) * 75}
            x2={SYSTEM_X - 5}
            y2={(SYSTEM_Y / 100) * 75}
            stroke="var(--color-neutral-300)"
            strokeWidth="0.4"
            initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </svg>

      {problemSituations.map((problem, index) => {
        const Icon = problem.icon;
        return (
          <motion.div
            key={problem.id}
            aria-hidden
            initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="absolute flex max-w-[150px] -translate-y-1/2 items-center gap-2 rounded-lg border border-neutral-200 bg-paper px-2.5 py-2 shadow-card"
            style={{ left: `${PROBLEM_X}%`, top: `${PROBLEM_Y[index]}%` }}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-mist text-slate">
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="text-[10px] leading-tight text-slate">{problem.label}</span>
          </motion.div>
        );
      })}

      <motion.div
        aria-hidden
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center"
        style={{ left: `${SYSTEM_X}%`, top: `${SYSTEM_Y}%` }}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-strong bg-teal-strong text-white shadow-panel">
          <Layers className="h-5 w-5" aria-hidden />
        </span>
        <span className="text-[10px] font-medium leading-tight text-paper-foreground">One clear system</span>
      </motion.div>
    </div>
  );
}
