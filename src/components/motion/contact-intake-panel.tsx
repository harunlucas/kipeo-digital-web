"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const briefFields = [
  { number: "01", title: "The problem", prompt: "What is currently difficult, manual or disconnected?" },
  { number: "02", title: "The people", prompt: "Who will use or manage the result?" },
  { number: "03", title: "The outcome", prompt: "What should work better after delivery?" },
];

/**
 * /contact hero visual: a project-intake "command panel" — not a functional
 * form (no inputs, nothing submits), just a visual explanation of what
 * information helps start a conversation. Deliberately not the numbered
 * list used by `ContactProcess` further down the page: this connects three
 * brief fields to one highlighted outcome node via a drawn connector line,
 * rather than a plain spaced list.
 */
export function ContactIntakePanel() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.4 });

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 10);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div
        aria-hidden
        className="absolute inset-x-5 -bottom-2.5 top-2.5 rounded-[28px] border border-white/5 bg-ink-elevated/50"
      />

      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="group relative"
      >
        <motion.div
          style={shouldReduceMotion ? undefined : { x: springX, y: springY }}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-ink p-6 shadow-panel transition-shadow duration-300 ease-out hover:shadow-[0_36px_90px_-24px_rgba(20,184,166,0.4)] sm:p-7"
        >
          <div aria-hidden className="bg-grid-ink pointer-events-none absolute inset-0 opacity-30" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-teal/20 blur-[90px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-14 bottom-0 h-44 w-44 rounded-full bg-highlight/18 blur-[80px]"
          />

          <div className="relative">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">Project intake</span>
            <h2 className="mt-3 text-2xl font-semibold text-ink-foreground sm:text-[26px]">
              Start with what you know.
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
              You do not need a finished specification. A problem, workflow or early idea is enough to begin.
            </p>

            <div className="relative mt-6 flex flex-col">
              <motion.div
                aria-hidden
                initial={shouldReduceMotion ? false : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ originY: 0 }}
                className="absolute bottom-5 left-5 top-5 w-px bg-gradient-to-b from-teal/60 via-teal/30 to-highlight/60"
              />

              {briefFields.map((field) => (
                <div key={field.number} className="relative flex gap-4 py-2">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-ink-elevated font-mono text-xs text-teal">
                    {field.number}
                  </span>
                  <div className="flex-1 rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-2.5">
                    <p className="text-xs font-medium text-ink-foreground">{field.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{field.prompt}</p>
                  </div>
                </div>
              ))}

              <div className="relative flex gap-4 py-2">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-teal bg-teal text-teal-foreground">
                  <CheckCircle2 className="h-4 w-4" aria-hidden />
                </span>
                <div className="flex flex-1 items-center rounded-xl border border-teal-strong/40 bg-teal/10 px-3.5 py-2.5">
                  <p className="text-xs font-semibold text-white">Review and practical next step</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2.5 border-t border-white/8 pt-4">
              <span className="relative flex h-2 w-2 shrink-0">
                <motion.span
                  aria-hidden
                  className="absolute inline-flex h-full w-full rounded-full bg-teal"
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={shouldReduceMotion ? undefined : { opacity: [0.5, 0], scale: [1, 2] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
              </span>
              <p className="text-[11px] font-medium text-ink-muted">Free initial consultation · No obligation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
