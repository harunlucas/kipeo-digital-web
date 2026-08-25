"use client";

import { motion, useReducedMotion } from "motion/react";
import { Clock } from "lucide-react";

const markers = [
  { hour: 8, label: "Planned call window" },
  { hour: 13, label: "Shared project update" },
  { hour: 17, label: "Milestone review" },
  { hour: 21, label: "Decision recorded" },
];

const RADIUS = 40;
const CENTER = 50;

function pointOnDial(hour: number) {
  const angle = (hour / 24) * 2 * Math.PI - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

/**
 * Location and collaboration visual: a 24-hour dial anchored to Nairobi
 * time, marked with the structured practices that keep a remote engagement
 * on track — not a world map with unverified client-location pins.
 */
export function AboutTimezoneVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px] p-6">
      <p className="sr-only">
        A 24-hour dial anchored to Nairobi, East Africa Time, marked with the structured practices used to keep
        remote collaboration on track: a planned call window, a shared project update, a milestone review and a
        recorded decision.
      </p>

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="var(--color-neutral-300)"
          strokeWidth="0.6"
          initial={shouldReduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      <div aria-hidden className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-strong bg-paper text-teal-strong shadow-card">
          <Clock className="h-6 w-6" aria-hidden />
        </span>
        <span className="text-[10px] font-medium leading-tight text-paper-foreground">
          Nairobi
          <br />
          EAT · UTC+3
        </span>
      </div>

      {markers.map((marker, index) => {
        const { x, y } = pointOnDial(marker.hour);
        return (
          <motion.div
            key={marker.hour}
            aria-hidden
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className="h-2 w-2 rounded-full bg-teal-strong" />
            <span className="text-[9px] leading-tight text-slate-muted">{marker.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
