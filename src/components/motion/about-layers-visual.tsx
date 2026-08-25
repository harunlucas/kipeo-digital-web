"use client";

import { motion, useReducedMotion } from "motion/react";
import { heroStackLayers } from "@/content/about";

/**
 * /about hero visual: the layers a working product is actually made of,
 * stacked as a dimensional deck rather than a flat list — people and roles
 * at the top, support at the base. Built fresh for this page; not the
 * Homepage's dimensional hero panels, Contact's two-node connector, or the
 * Insights three-step path.
 */
export function AboutLayersVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[420px] rounded-2xl border border-ink-elevated bg-ink p-4 shadow-panel sm:p-5">
      <div aria-hidden className="bg-grid-ink pointer-events-none absolute inset-0 rounded-2xl opacity-40" />
      <p className="sr-only">
        A stacked diagram of the layers a working product is made of: people and roles, interface, application
        logic, data, integration, deployment and support — connected top to bottom.
      </p>
      <div aria-hidden className="relative flex flex-col gap-1.5">
        {heroStackLayers.map(({ id, label, description, icon: Icon }, index) => (
          <motion.div
            key={id}
            initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginLeft: `${index * 4}px` }}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${
              index === 0
                ? "border-teal/50 bg-teal/10"
                : "border-white/8 bg-ink-elevated/60"
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                index === 0 ? "bg-teal text-teal-foreground" : "bg-white/5 text-teal"
              }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="text-xs font-medium text-ink-foreground">{label}</span>
              <span className="hidden text-[10px] leading-tight text-ink-muted sm:block">{description}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
