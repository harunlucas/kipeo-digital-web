"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type TabItem = {
  /** Also used as the `/services#id` anchor, so keep it a valid fragment id. */
  id: string;
  title: string;
  problem: string;
  subservices: string[];
  icon: ReactNode;
};

export function ServiceTabs({ items }: { items: TabItem[] }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const current = items[active];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function focusTab(index: number) {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
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
    <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
      <ol
        role="tablist"
        aria-label="Service pillars"
        aria-orientation="vertical"
        className="flex flex-col divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-paper"
      >
        {items.map((item, index) => {
          const isActive = index === active;
          const tabId = `${baseId}-tab-${index}`;
          const panelId = `${baseId}-panel`;

          return (
            <li key={item.id} role="presentation">
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
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`flex w-full items-start gap-4 border-l-2 px-5 py-4 text-left transition-colors duration-200 ${
                  isActive ? "border-teal-strong bg-teal-tint/60" : "border-transparent hover:bg-mist"
                }`}
              >
                <span
                  className={`mt-0.5 font-mono text-xs ${isActive ? "text-teal-strong" : "text-slate-muted"}`}
                >
                  0{index + 1}
                </span>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                    isActive ? "bg-teal-strong text-white" : "bg-mist text-slate"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="flex-1">
                  <span className="block text-base font-semibold text-paper-foreground">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm text-slate">{item.problem}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        aria-live="polite"
        tabIndex={0}
        className="relative min-h-[280px] overflow-hidden rounded-2xl border border-neutral-200 bg-ink"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-full min-h-[280px] flex-col justify-between p-7"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
              <PillarArtwork id={current.id} />
            </div>

            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal text-teal-foreground">
                {current.icon}
              </span>
              <h3 className="mt-5 text-2xl font-semibold text-ink-foreground">{current.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">{current.problem}</p>
            </div>

            <div className="relative">
              <ul className="flex flex-wrap gap-2">
                {current.subservices.map((service) => (
                  <li
                    key={service}
                    className="rounded-full border border-ink-elevated bg-ink/70 px-3 py-1 text-xs text-ink-foreground backdrop-blur"
                  >
                    {service}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services#${current.id}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:text-white"
              >
                Explore services
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PillarArtwork({ id }: { id: string }) {
  switch (id) {
    case "websites-and-commerce":
      return (
        <svg viewBox="0 0 400 320" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <rect x="150" y="40" width="220" height="150" rx="10" fill="none" stroke="var(--color-teal)" strokeOpacity="0.35" />
          <rect x="110" y="90" width="220" height="150" rx="10" fill="none" stroke="var(--color-teal)" strokeOpacity="0.5" />
          <rect x="70" y="140" width="220" height="150" rx="10" fill="var(--color-ink-elevated)" stroke="var(--color-teal)" />
        </svg>
      );
    case "software-and-business-systems":
      return (
        <svg viewBox="0 0 400 320" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <g stroke="var(--color-teal)" strokeOpacity="0.4">
            <path d="M60,260 L150,180 L240,220 L340,120" fill="none" />
            <path d="M150,180 L200,90" fill="none" />
          </g>
          {[
            [60, 260],
            [150, 180],
            [240, 220],
            [340, 120],
            [200, 90],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i === 1 ? 8 : 5} fill="var(--color-teal)" />
          ))}
        </svg>
      );
    case "integration-deployment-and-support":
      return (
        <svg viewBox="0 0 400 320" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          {[40, 80, 120, 160].map((r) => (
            <circle
              key={r}
              cx="260"
              cy="160"
              r={r}
              fill="none"
              stroke="var(--color-teal)"
              strokeOpacity={0.5 - r / 400}
            />
          ))}
          <circle cx="260" cy="160" r="10" fill="var(--color-teal)" />
        </svg>
      );
    case "operational-and-technical-software":
      return (
        <svg viewBox="0 0 400 320" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <path
            d="M200,50 L300,85 L300,175 Q300,240 200,270 Q100,240 100,175 L100,85 Z"
            fill="none"
            stroke="var(--color-teal)"
            strokeOpacity="0.45"
            strokeWidth="3"
          />
          <path d="M170,160 L192,182 L235,132" fill="none" stroke="var(--color-teal)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {[0, 1, 2].map((row) => (
            <g key={row}>
              <rect x="130" y={205 + row * 20} width="10" height="10" rx="2" fill="var(--color-highlight)" fillOpacity="0.6" />
              <rect x="150" y={207 + row * 20} width="90" height="6" rx="3" fill="var(--color-ink-elevated)" />
            </g>
          ))}
        </svg>
      );
    default:
      return null;
  }
}
