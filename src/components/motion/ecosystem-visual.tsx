"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Bell, Cloud, Cpu, Database, LayoutGrid, Workflow } from "lucide-react";

type Node = {
  id: string;
  label: string;
  icon: typeof Cpu;
  x: number;
  y: number;
  z: number;
  tone: "teal" | "highlight" | "paper";
};

/**
 * Six labelled nodes standing in for one end-to-end system: interface,
 * application logic, data, integrations/automation, deployment and
 * monitoring — connected by animated data paths around a central core.
 * Built specifically for the /services hero so it's not the same
 * composition as the homepage's abstract `HeroVisual` (no labelled nodes)
 * or /work's screenshot-based `WorkHeroVisual`.
 */
const nodes: Node[] = [
  { id: "interface", label: "Interface", icon: LayoutGrid, x: 50, y: 8, z: 90, tone: "paper" },
  { id: "logic", label: "App logic", icon: Cpu, x: 84, y: 28, z: 70, tone: "teal" },
  { id: "data", label: "Database", icon: Database, x: 82, y: 68, z: 60, tone: "highlight" },
  { id: "automation", label: "Automation", icon: Workflow, x: 50, y: 90, z: 75, tone: "teal" },
  { id: "deployment", label: "Deployment", icon: Cloud, x: 16, y: 68, z: 65, tone: "highlight" },
  { id: "monitoring", label: "Monitoring", icon: Bell, x: 18, y: 28, z: 80, tone: "paper" },
];

const core = { x: 50, y: 48 };

const toneClasses: Record<Node["tone"], string> = {
  teal: "border-teal/50 bg-teal text-teal-foreground",
  highlight: "border-highlight/50 bg-highlight text-highlight-foreground",
  paper: "border-neutral-300 bg-paper text-paper-foreground",
};

export function EcosystemVisual() {
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-11, 11]);

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
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto aspect-square w-full max-w-[520px] [perspective:1500px]"
    >
      <div aria-hidden className="absolute -left-10 top-8 h-56 w-56 rounded-full bg-teal/20 blur-[90px]" />
      <div aria-hidden className="absolute -right-6 bottom-4 h-64 w-64 rounded-full bg-highlight/20 blur-[100px]" />

      <motion.div
        className="absolute inset-0"
        style={
          shouldReduceMotion ? { transformStyle: "preserve-3d" } : { transformStyle: "preserve-3d", rotateX, rotateY }
        }
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="ecosystem-path" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="0.65" />
              <stop offset="100%" stopColor="var(--color-teal)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {nodes.map((node, index) => {
            const pathId = `ecosystem-path-${index}`;
            return (
              <g key={node.id}>
                <motion.path
                  id={pathId}
                  d={`M${core.x},${core.y} L${node.x},${node.y}`}
                  stroke="url(#ecosystem-path)"
                  strokeWidth="0.4"
                  fill="none"
                  initial={shouldReduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                />
                {!shouldReduceMotion && (
                  <circle r="0.9" fill="var(--color-teal)">
                    <animateMotion
                      dur={`${3.2 + index * 0.5}s`}
                      begin={`${1 + index * 0.35}s`}
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

        <motion.div
          initial={shouldReduceMotion ? false : { scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute flex items-center justify-center"
          style={{
            left: `${core.x}%`,
            top: `${core.y}%`,
            width: "26%",
            height: "26%",
            transform: "translate(-50%, -50%) translateZ(30px)",
          }}
        >
          <motion.span
            aria-hidden
            className="absolute inset-[-16%] rounded-full border border-teal/30"
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={shouldReduceMotion ? undefined : { duration: 26, repeat: Infinity, ease: "linear" }}
          />
          <div
            aria-hidden
            className="h-full w-full rounded-[38%] bg-[radial-gradient(circle_at_32%_28%,var(--color-teal-tint),var(--color-teal-strong)_58%,var(--color-ink)_100%)] shadow-panel"
          />
        </motion.div>

        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.15 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: `translateZ(${node.z}px)` }}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-panel backdrop-blur-sm sm:h-12 sm:w-12 ${toneClasses[node.tone]}`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-medium text-ink-foreground backdrop-blur">
                {node.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
