"use client";

import { motion, useReducedMotion } from "motion/react";
import type { InternalProduct } from "@/content/work";
import { HseProductVisual } from "@/components/motion/hse-product-visual";

/**
 * /work's own Internal Products section — built fresh rather than reusing
 * the shared `ProductSpotlight` (which the homepage also renders via
 * `selected-work.ts`'s embedded HSE project and its AI-generated concept
 * renders). Keeping this separate means /work never repeats homepage or
 * Services imagery for the same product.
 */
export function InternalProductSpotlight({ product }: { product: InternalProduct }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-8 overflow-hidden rounded-2xl border border-neutral-200 bg-paper shadow-card lg:grid-cols-2 lg:items-center"
    >
      <div className="p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-strong">{product.category}</p>
        <h3 className="mt-2 text-2xl font-semibold text-paper-foreground">{product.title}</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-[11px] font-medium text-slate-muted">
            Internal product
          </span>
          <span className="rounded-full border border-highlight/30 bg-highlight/10 px-2.5 py-0.5 text-[11px] font-medium text-highlight-strong">
            Active development
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate">{product.description}</p>
        <p className="mt-3 text-xs leading-relaxed text-slate-muted">{product.attribution}</p>
      </div>

      <div className="relative border-t border-neutral-200 bg-ink lg:border-l lg:border-t-0">
        <div className="aspect-[4/3] sm:aspect-[16/11]">
          <HseProductVisual />
        </div>
        <p className="border-t border-white/10 px-4 py-2 text-[11px] text-ink-muted">{product.disclosure}</p>
      </div>
    </motion.div>
  );
}
