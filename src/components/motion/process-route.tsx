"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ProcessStage } from "@/content/process";

export function ProcessRoute({ stages }: { stages: ProcessStage[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Desktop: horizontal route */}
      <div className="relative hidden lg:block">
        <div className="absolute left-[10%] right-[10%] top-7 h-px bg-neutral-300" aria-hidden />
        <motion.div
          className="absolute left-[10%] right-[10%] top-7 h-px origin-left bg-teal-strong"
          initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
          whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        />
        <ol className="grid grid-cols-5 gap-6">
          {stages.map((stage, index) => (
            <motion.li
              key={stage.step}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.35 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-teal-strong bg-paper font-display text-lg text-teal-strong">
                {stage.step}
              </span>
              <h3 className="mt-5 text-base font-semibold text-paper-foreground">{stage.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{stage.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Mobile / tablet: vertical route */}
      <ol className="relative flex flex-col gap-8 lg:hidden">
        <div className="absolute left-7 top-4 bottom-4 w-px bg-neutral-300" aria-hidden />
        <motion.div
          className="absolute left-7 top-4 bottom-4 w-px origin-top bg-teal-strong"
          initial={shouldReduceMotion ? undefined : { scaleY: 0 }}
          whileInView={shouldReduceMotion ? undefined : { scaleY: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        />
        {stages.map((stage, index) => (
          <motion.li
            key={stage.step}
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: -8 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-start gap-4"
          >
            <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-teal-strong bg-paper font-display text-lg text-teal-strong">
              {stage.step}
            </span>
            <div className="pt-2.5">
              <h3 className="text-base font-semibold text-paper-foreground">{stage.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{stage.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
