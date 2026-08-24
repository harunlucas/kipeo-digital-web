"use client";

import type { KeyboardEvent } from "react";
import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProcessStage } from "@/content/process";
import { ProcessStageVisual } from "@/components/motion/process-stage-visuals";

function ResponsibilityList({
  label,
  items,
  accent = false,
}: {
  label: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div>
      <p className={`font-mono text-[10px] uppercase tracking-wide ${accent ? "text-teal" : "text-slate-muted"}`}>
        {label}
      </p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-1.5 text-sm leading-snug text-slate">
            <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${accent ? "bg-teal" : "bg-neutral-300"}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StageDetails({ stage, reduceMotion }: { stage: ProcessStage; reduceMotion: boolean }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex flex-col gap-4">
        <p className="text-base leading-relaxed text-paper-foreground">{stage.summary}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <ResponsibilityList label="What Kipeo does" items={stage.kipeoResponsibilities} />
          <ResponsibilityList label="What you contribute" items={stage.clientResponsibilities} />
          <ResponsibilityList label="What's produced" items={stage.outputs} accent />
        </div>
      </div>

      <div className="min-h-[190px] rounded-xl border border-ink-elevated bg-ink p-4 sm:min-h-[210px] sm:p-5">
        <ProcessStageVisual visual={stage.visualType} reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}

export function ProcessRoute({ stages }: { stages: ProcessStage[] }) {
  const baseId = useId();
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isAnimatingRef = useRef(false);
  const activeStage = stages[active];
  const panelId = `${baseId}-panel`;

  function selectIndex(index: number) {
    const next = Math.max(0, Math.min(stages.length - 1, index));
    if (next === active) return;
    if (isAnimatingRef.current && !shouldReduceMotion) return;
    isAnimatingRef.current = true;
    setActive(next);
  }

  function focusTab(index: number) {
    const next = (index + stages.length) % stages.length;
    tabRefs.current[next]?.focus();
    selectIndex(next);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(stages.length - 1);
        break;
    }
  }

  return (
    <div>
      {/* Tablet / desktop: horizontal stage navigation + single active panel */}
      <div className="hidden sm:block">
        <div className="relative">
          <div className="absolute left-[6%] right-[6%] top-6 h-px bg-neutral-300" aria-hidden />
          <motion.div
            className="absolute left-[6%] top-6 h-px origin-left bg-teal-strong"
            animate={{ width: `${(active / (stages.length - 1)) * 88}%` }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          />
          <ol role="tablist" aria-label="Project process" className="relative grid grid-cols-5 gap-3">
            {stages.map((stage, index) => {
              const isActive = index === active;
              return (
                <li key={stage.id} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${index}`}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    aria-selected={isActive}
                    aria-controls={panelId}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectIndex(index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    className="flex w-full flex-col items-center gap-2 text-center"
                  >
                    <span
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 font-display text-base transition-colors duration-200 ${
                        isActive
                          ? "border-teal-strong bg-teal-tint text-teal-strong"
                          : "border-neutral-300 bg-paper text-slate"
                      }`}
                    >
                      {stage.number}
                    </span>
                    <span
                      className={`text-xs transition-colors duration-200 sm:text-sm ${
                        isActive ? "font-semibold text-paper-foreground" : "font-medium text-slate"
                      }`}
                    >
                      {stage.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <motion.div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active}`}
          tabIndex={0}
          layout
          transition={{ layout: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-paper p-5 shadow-card sm:p-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, x: 12 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => {
                isAnimatingRef.current = false;
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-teal-strong">
                  Stage {activeStage.number} of {String(stages.length).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => selectIndex(active - 1)}
                    disabled={active === 0}
                    aria-label="Previous stage"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-slate transition-colors hover:bg-mist disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => selectIndex(active + 1)}
                    disabled={active === stages.length - 1}
                    aria-label="Next stage"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-slate transition-colors hover:bg-mist disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
              <h3 className="mt-2.5 text-2xl font-semibold text-paper-foreground">{activeStage.title}</h3>
              <div className="mt-4">
                <StageDetails stage={activeStage} reduceMotion={!!shouldReduceMotion} />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile: accessible accordion */}
      <ol className="flex flex-col gap-3 sm:hidden">
        {stages.map((stage, index) => {
          const isActive = index === active;
          const headerId = `${baseId}-accordion-header-${index}`;
          const regionId = `${baseId}-accordion-region-${index}`;

          return (
            <li key={stage.id} className="overflow-hidden rounded-2xl border border-neutral-200 bg-paper">
              <h3>
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isActive}
                  aria-controls={regionId}
                  onClick={() => selectIndex(index)}
                  className="flex min-h-11 w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-display text-sm ${
                      isActive ? "border-teal-strong text-teal-strong" : "border-neutral-300 text-slate"
                    }`}
                  >
                    {stage.number}
                  </span>
                  <span className={`flex-1 text-sm font-medium ${isActive ? "text-paper-foreground" : "text-slate"}`}>
                    {stage.title}
                  </span>
                </button>
              </h3>
              {isActive && (
                <motion.div
                  id={regionId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-neutral-200 p-4"
                >
                  <StageDetails stage={stage} reduceMotion={!!shouldReduceMotion} />
                </motion.div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
