"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

type Surface = {
  x: number;
  y: number;
  size: number;
  z: number;
  rotate: number;
  delay: number;
  floatAmplitude: number;
  floatDuration: number;
  tone: "paper" | "ink" | "highlight";
};

const surfaces: Surface[] = [
  { x: 10, y: 8, size: 30, z: 70, rotate: -6, delay: 0.35, floatAmplitude: -8, floatDuration: 6, tone: "paper" },
  { x: 66, y: 14, size: 24, z: 100, rotate: 5, delay: 0.5, floatAmplitude: 7, floatDuration: 5.2, tone: "highlight" },
  { x: 60, y: 62, size: 28, z: 60, rotate: -4, delay: 0.65, floatAmplitude: -6, floatDuration: 6.6, tone: "ink" },
];

const core = { x: 50, y: 50 };
const surfaceCenter = (s: Surface) => ({ x: s.x + s.size / 2, y: s.y + s.size / 2 });

const surfaceContent: Record<Surface["tone"], number[]> = {
  paper: [40, 65, 50, 85, 60],
  highlight: [70, 45, 90],
  ink: [55, 80, 35, 70],
};

/**
 * Pointer-responsive dimensional composition: a central "core" with three
 * connected modular surfaces and animated data paths. [data-hero-stage] is
 * the intended mount point for a future WebGL scene — this layer can be
 * swapped without touching the surrounding hero layout.
 */
export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || event.pointerType !== "mouse" || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={stageRef}
      data-hero-stage
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto aspect-square w-full max-w-[520px] [perspective:1400px]"
    >
      <div aria-hidden className="absolute -left-12 top-6 h-64 w-64 rounded-full bg-teal/25 blur-[90px]" />
      <div aria-hidden className="absolute -right-8 bottom-4 h-72 w-72 rounded-full bg-highlight/20 blur-[100px]" />
      <div aria-hidden className="bg-grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />

      <motion.div
        className="absolute inset-0"
        style={
          shouldReduceMotion
            ? { transformStyle: "preserve-3d" }
            : { transformStyle: "preserve-3d", rotateX, rotateY }
        }
      >
        {/* Data paths */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="hero-path" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--color-teal)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {surfaces.map((surface, index) => {
            const sc = surfaceCenter(surface);
            const pathId = `hero-data-path-${index}`;
            return (
              <g key={index}>
                <motion.path
                  id={pathId}
                  d={`M${core.x},${core.y} L${sc.x},${sc.y}`}
                  stroke="url(#hero-path)"
                  strokeWidth="0.4"
                  fill="none"
                  initial={shouldReduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                />
                {!shouldReduceMotion && (
                  <circle r="1" fill="var(--color-teal)">
                    <animateMotion
                      dur={`${3 + index * 0.7}s`}
                      begin={`${1.2 + index * 0.4}s`}
                      repeatCount="indefinite"
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Central core */}
        <motion.div
          initial={shouldReduceMotion ? false : { scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute flex items-center justify-center"
          style={{
            left: `${core.x}%`,
            top: `${core.y}%`,
            width: "34%",
            height: "34%",
            transform: "translate(-50%, -50%) translateZ(30px)",
          }}
        >
          <motion.span
            aria-hidden
            className="absolute inset-[-18%] rounded-full border border-teal/30"
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={shouldReduceMotion ? undefined : { duration: 24, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            aria-hidden
            className="h-full w-full rounded-[38%] bg-[radial-gradient(circle_at_32%_28%,var(--color-teal-tint),var(--color-teal-strong)_58%,var(--color-ink)_100%)] shadow-panel"
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.045, 1] }}
            transition={shouldReduceMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Orbiting modular surfaces */}
        {surfaces.map((surface, index) => (
          <motion.div
            key={index}
            initial={shouldReduceMotion ? false : { scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: Math.min(surface.delay, 0.25), ease: [0.16, 1, 0.3, 1] }}
            className="absolute"
            style={{
              left: `${surface.x}%`,
              top: `${surface.y}%`,
              width: `${surface.size}%`,
              aspectRatio: "1 / 1",
              transform: `translateZ(${surface.z}px) rotate(${surface.rotate}deg)`,
            }}
          >
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, surface.floatAmplitude, 0] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: surface.floatDuration, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }
              className={`flex h-full w-full flex-col justify-end gap-1 rounded-xl border p-2 shadow-panel backdrop-blur-sm ${
                surface.tone === "paper"
                  ? "border-neutral-300 bg-paper/95"
                  : surface.tone === "highlight"
                    ? "border-highlight/40 bg-highlight"
                    : "border-ink-elevated bg-ink"
              }`}
            >
              {surfaceContent[surface.tone].map((h, i) => (
                <span
                  key={i}
                  className={`block w-full rounded-sm ${
                    surface.tone === "highlight" ? "bg-white/70" : "bg-teal"
                  }`}
                  style={{ height: "12%", opacity: 0.5 + h / 200 }}
                />
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
