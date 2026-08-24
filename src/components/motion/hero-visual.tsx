"use client";

import { motion, useReducedMotion } from "motion/react";
import { Layers, Boxes } from "lucide-react";

type Panel = {
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  rotate: number;
  tone: "teal" | "ink" | "highlight" | "paper";
  delay: number;
  floatAmplitude: number;
  floatDuration: number;
};

const panels: Panel[] = [
  { x: 8, y: 14, w: 46, h: 36, z: 10, rotate: -4, tone: "paper", delay: 0.1, floatAmplitude: 6, floatDuration: 6 },
  { x: 50, y: 40, w: 38, h: 32, z: 60, rotate: 5, tone: "ink", delay: 0.26, floatAmplitude: -8, floatDuration: 7 },
  { x: 60, y: 6, w: 22, h: 20, z: 90, rotate: -8, tone: "highlight", delay: 0.4, floatAmplitude: 7, floatDuration: 5.5 },
  { x: 4, y: 60, w: 24, h: 22, z: 40, rotate: 6, tone: "teal", delay: 0.5, floatAmplitude: -6, floatDuration: 6.5 },
];

const center = (p: Panel) => ({ x: p.x + p.w / 2, y: p.y + p.h / 2 });

const links: [Panel, Panel][] = [
  [panels[0], panels[1]],
  [panels[1], panels[2]],
  [panels[1], panels[3]],
];

const toneClasses: Record<Panel["tone"], string> = {
  paper: "border-neutral-300 bg-paper/90",
  ink: "border-ink-elevated bg-ink text-ink-foreground",
  highlight: "border-highlight/40 bg-highlight text-highlight-foreground",
  teal: "border-teal-strong/40 bg-teal-strong text-white",
};

/**
 * CSS-only dimensional composition: a small cluster of connected "glass"
 * panels in a real 3D perspective, standing in for Kipeo's connected
 * digital capability. [data-hero-stage] is the intended future mount point
 * for a WebGL scene, if one is ever justified — panels can be swapped
 * without touching the surrounding hero layout.
 */
export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      data-hero-stage
      className="relative mx-auto aspect-square w-full max-w-[520px] [perspective:1400px]"
    >
      <div aria-hidden className="absolute -left-12 top-4 h-64 w-64 rounded-full bg-teal/25 blur-[90px]" />
      <div aria-hidden className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-highlight/20 blur-[100px]" />
      <div aria-hidden className="bg-grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />

      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={shouldReduceMotion ? undefined : { rotateY: [-6, 6, -6] }}
        transition={shouldReduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          {links.map(([a, b], index) => {
            const ca = center(a);
            const cb = center(b);
            return (
              <motion.line
                key={index}
                x1={ca.x}
                y1={ca.y}
                x2={cb.x}
                y2={cb.y}
                stroke="var(--color-neutral-300)"
                strokeWidth="0.4"
                initial={shouldReduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                whileInView={shouldReduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}
        </svg>

        {panels.map((panel, index) => (
          <motion.div
            key={index}
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.85, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: panel.delay, ease: [0.16, 1, 0.3, 1] }}
            className="absolute"
            style={{
              left: `${panel.x}%`,
              top: `${panel.y}%`,
              width: `${panel.w}%`,
              height: `${panel.h}%`,
              transform: `translateZ(${panel.z}px) rotate(${panel.rotate}deg)`,
            }}
          >
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, panel.floatAmplitude, 0] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: panel.floatDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1 + index * 0.3,
                    }
              }
              className={`flex h-full w-full items-center justify-center rounded-2xl border shadow-panel backdrop-blur-sm ${toneClasses[panel.tone]}`}
            >
              {index === 0 && <Layers className="h-6 w-6 opacity-70" aria-hidden />}
              {index === 1 && <Boxes className="h-7 w-7 opacity-80" aria-hidden />}
              {index === 2 && <span className="h-2.5 w-2.5 rounded-full bg-white" aria-hidden />}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* One-time diagonal light sweep across the whole composition */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div className="animate-hero-sweep absolute -inset-y-10 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      </div>
    </div>
  );
}
