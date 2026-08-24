"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ProblemPair } from "@/content/problems";

export function ProblemsShowcase({ items }: { items: ProblemPair[] }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const current = items[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
      <ol className="flex flex-col">
        {items.map((item, index) => {
          const isActive = index === active;
          const panelId = `${baseId}-panel`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <li key={item.problem} className="border-b border-neutral-300 first:border-t">
              <button
                type="button"
                id={buttonId}
                aria-controls={panelId}
                aria-current={isActive}
                onClick={() => setActive(index)}
                className="flex w-full items-center gap-5 py-5 text-left"
              >
                <span
                  className={`font-mono text-sm transition-colors duration-200 ${
                    isActive ? "text-teal-strong" : "text-slate-muted"
                  }`}
                >
                  0{index + 1}
                </span>
                <span
                  className={`text-lg transition-colors duration-200 ${
                    isActive ? "font-semibold text-paper-foreground" : "text-slate"
                  }`}
                >
                  {item.problem}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div
        id={`${baseId}-panel`}
        role="region"
        aria-labelledby={`${baseId}-button-${active}`}
        className="relative min-h-[320px] overflow-hidden rounded-2xl border border-neutral-200 bg-ink"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.problem}
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full min-h-[320px] flex-col justify-between p-8"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
              <SolutionArtwork seed={active} />
            </div>

            <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-teal">
              Direction
            </p>
            <p className="relative mt-auto max-w-sm text-lg leading-relaxed text-ink-foreground">
              {current.direction}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SolutionArtwork({ seed }: { seed: number }) {
  const nodeCount = 5;
  const round = (value: number) => Math.round(value * 100) / 100;
  const nodes = Array.from({ length: nodeCount }, (_, i) => {
    const angle = (i / nodeCount) * Math.PI * 2 + seed;
    const radius = 70 + (i % 2) * 20;
    return {
      x: round(200 + Math.cos(angle) * radius),
      y: round(140 + Math.sin(angle) * radius * 0.7),
    };
  });

  return (
    <svg viewBox="0 0 400 280" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <g stroke="var(--color-teal)" strokeOpacity="0.4">
        {nodes.map((node, i) => {
          const next = nodes[(i + 1) % nodes.length];
          return <line key={i} x1={node.x} y1={node.y} x2={next.x} y2={next.y} />;
        })}
      </g>
      {nodes.map((node, i) => (
        <circle key={i} cx={node.x} cy={node.y} r={i === 0 ? 8 : 5} fill="var(--color-teal)" />
      ))}
    </svg>
  );
}
