"use client";

import type { KeyboardEvent } from "react";
import { useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ProblemPair } from "@/content/problems";
import { ProblemSolutionVisual } from "@/components/motion/problem-solution-visuals";

export function ProblemsShowcase({ items }: { items: ProblemPair[] }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isAnimatingRef = useRef(false);
  const current = items[active];
  const panelId = `${baseId}-panel`;

  function selectIndex(index: number) {
    if (index === active) return;
    if (isAnimatingRef.current && !shouldReduceMotion) return;
    isAnimatingRef.current = true;
    setActive(index);
  }

  function focusTab(index: number) {
    const next = (index + items.length) % items.length;
    tabRefs.current[next]?.focus();
    selectIndex(next);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(items.length - 1);
        break;
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[42fr_58fr] lg:items-start lg:gap-8">
      <ol
        role="tablist"
        aria-label="Problems we solve"
        aria-orientation="vertical"
        className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 snap-x snap-mandatory sm:mx-0 sm:px-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:rounded-2xl lg:border lg:border-neutral-300 lg:bg-paper lg:pb-0 lg:divide-y lg:divide-neutral-300"
      >
        {items.map((item, index) => {
          const isActive = index === active;
          const tabId = `${baseId}-tab-${index}`;

          return (
            <li key={item.problem} role="presentation" className="shrink-0 snap-start lg:shrink lg:snap-align-none">
              <button
                type="button"
                id={tabId}
                role="tab"
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectIndex(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`group relative flex min-h-11 w-full items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-left transition-colors duration-300 sm:whitespace-normal lg:min-h-0 lg:gap-4 lg:rounded-none lg:px-5 lg:py-4 ${
                  isActive
                    ? "bg-gradient-to-r from-teal/10 to-transparent lg:from-teal/[0.08]"
                    : "hover:bg-mist"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId={`${baseId}-indicator`}
                    className="absolute inset-y-1.5 left-0 hidden w-[3px] rounded-full bg-teal lg:block"
                    transition={
                      shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                    }
                  />
                )}

                <motion.span
                  animate={shouldReduceMotion ? undefined : { x: isActive ? 3 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 lg:gap-4"
                >
                  <span
                    className={`shrink-0 font-mono text-sm transition-colors duration-300 ${
                      isActive ? "text-teal-strong" : "text-slate-muted"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span
                    className={`text-sm transition-colors duration-300 sm:text-base ${
                      isActive ? "font-semibold text-paper-foreground" : "text-slate"
                    }`}
                  >
                    {item.problem}
                  </span>
                </motion.span>

                {isActive && (
                  <span
                    aria-hidden
                    className="ml-auto hidden shrink-0 items-center rounded-full bg-teal-tint px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-teal-strong lg:inline-flex"
                  >
                    Selected
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className="bg-grid-ink relative min-h-[420px] overflow-hidden rounded-2xl border border-ink-elevated bg-ink shadow-panel sm:min-h-[440px]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-teal/10 blur-[100px]"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.problem}
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: 12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              isAnimatingRef.current = false;
            }}
            className="relative flex h-full min-h-[420px] flex-col gap-5 p-6 sm:min-h-[440px] sm:p-7"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-teal">
                {current.solutionLabel}
              </span>
            </div>

            <div className="min-h-0 flex-1 rounded-xl border border-white/5 bg-black/10 p-3 sm:p-4">
              <ProblemSolutionVisual visual={current.visual} reduceMotion={!!shouldReduceMotion} />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-sm text-base leading-relaxed text-ink-foreground">{current.response}</p>
              <Link
                href={current.linkHref}
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-teal transition-colors hover:text-white"
              >
                {current.linkLabel}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
