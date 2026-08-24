"use client";

import type { KeyboardEvent } from "react";
import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Compass, Layout, Database, Share2, ShoppingBag, Cloud } from "lucide-react";
import type { Capability, CapabilityVisual } from "@/content/capabilities";

const icons: Record<CapabilityVisual, typeof Compass> = {
  strategy: Compass,
  frontend: Layout,
  backend: Database,
  applications: Share2,
  commerce: ShoppingBag,
  deployment: Cloud,
};

function Connector() {
  return (
    <div aria-hidden className="flex justify-center py-1">
      <ChevronDown className="h-4 w-4 text-teal/50" />
    </div>
  );
}

function NodeButton({
  capability,
  isActive,
  onSelect,
  onKeyDown,
  buttonRef,
  panelId,
  compact = false,
}: {
  capability: Capability;
  isActive: boolean;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
  panelId: string;
  compact?: boolean;
}) {
  const Icon = icons[capability.visualType];

  return (
    <button
      type="button"
      role="tab"
      ref={buttonRef}
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={`flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-colors duration-300 ${
        isActive
          ? "border-teal/60 bg-teal/10 ring-1 ring-teal/25"
          : "border-white/10 bg-ink-elevated/60 hover:border-white/25 hover:bg-ink-elevated"
      } ${compact ? "justify-center text-center" : ""}`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          isActive ? "bg-teal text-teal-foreground" : "bg-white/10 text-ink-foreground/75"
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span
        className={`text-sm ${isActive ? "font-semibold text-ink-foreground" : "font-medium text-ink-foreground/70"} ${compact ? "hidden sm:inline" : ""}`}
      >
        {capability.title}
      </span>
    </button>
  );
}

// Keyboard/focus order follows the visual layout (Commerce sits beside
// Frontend and Backend), not the content array order.
const visualOrder = ["strategy", "frontend", "backend", "commerce", "applications", "deployment"];

export function CapabilityArchitecture({ items }: { items: Capability[] }) {
  const baseId = useId();
  const shouldReduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(visualOrder[0]);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isAnimatingRef = useRef(false);
  const panelId = `${baseId}-panel`;

  const byId = Object.fromEntries(items.map((item) => [item.id, item]));
  const strategy = byId.strategy;
  const frontend = byId.frontend;
  const backend = byId.backend;
  const applications = byId.applications;
  const commerce = byId.commerce;
  const deployment = byId.deployment;
  const activeCapability = byId[activeId];

  function selectId(id: string) {
    if (id === activeId) return;
    if (isAnimatingRef.current && !shouldReduceMotion) return;
    isAnimatingRef.current = true;
    setActiveId(id);
  }

  function focusVisualIndex(index: number) {
    const nextId = visualOrder[(index + visualOrder.length) % visualOrder.length];
    buttonRefs.current[nextId]?.focus();
    selectId(nextId);
  }

  function makeKeyDown(id: string) {
    const index = visualOrder.indexOf(id);
    return (event: KeyboardEvent<HTMLButtonElement>) => {
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          focusVisualIndex(index + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          focusVisualIndex(index - 1);
          break;
        case "Home":
          event.preventDefault();
          focusVisualIndex(0);
          break;
        case "End":
          event.preventDefault();
          focusVisualIndex(visualOrder.length - 1);
          break;
      }
    };
  }

  function node(item: Capability, compact = false) {
    return (
      <NodeButton
        capability={item}
        isActive={item.id === activeId}
        onSelect={() => selectId(item.id)}
        onKeyDown={makeKeyDown(item.id)}
        buttonRef={(el) => {
          buttonRefs.current[item.id] = el;
        }}
        panelId={panelId}
        compact={compact}
      />
    );
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-9">
      <div role="tablist" aria-label="Full-service capability areas" className="flex flex-col">
        {node(strategy)}
        <Connector />
        <div className="flex items-stretch gap-3">
          <div className="flex flex-1 flex-col">
            {node(frontend)}
            <Connector />
            {node(backend)}
          </div>
          <div className="flex w-20 flex-col justify-center border-l border-dashed border-white/25 pl-3 sm:w-32">
            {node(commerce, true)}
          </div>
        </div>
        <Connector />
        {node(applications)}
        <Connector />
        {node(deployment)}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-label={`${activeCapability.title} capability detail`}
        tabIndex={0}
        className="bg-grid-ink relative min-h-[280px] overflow-hidden rounded-2xl border border-ink-elevated bg-ink p-6 shadow-panel sm:p-7"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-teal/10 blur-[100px]"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCapability.id}
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: 12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              isAnimatingRef.current = false;
            }}
            className="relative"
          >
            <h3 className="text-xl font-semibold text-ink-foreground sm:text-2xl">{activeCapability.title}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">{activeCapability.description}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {activeCapability.capabilities.map((item) => (
                <li key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-foreground/85">
                  {item}
                </li>
              ))}
            </ul>

            {activeCapability.confirmedTechnologies && activeCapability.confirmedTechnologies.length > 0 && (
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="font-mono text-[10px] uppercase tracking-wide text-teal">Confirmed technologies</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {activeCapability.confirmedTechnologies.map((tech) => (
                    <li key={tech} className="rounded-full bg-teal/10 px-3 py-1 text-xs text-teal">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
