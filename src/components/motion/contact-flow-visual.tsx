"use client";

import { motion, useReducedMotion } from "motion/react";
import { Mail, MessageCircle } from "lucide-react";

/**
 * A small, decorative signal for the /contact hero — an enquiry reaching
 * Kipeo and a response coming back. Deliberately not a repeat of the four
 * "What happens next" stages (see contact-process.tsx); this is just
 * connection and response, kept compact.
 */
export function ContactFlowVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex w-full max-w-[320px] items-center justify-center py-4">
      <div aria-hidden className="absolute -right-4 top-0 h-28 w-28 rounded-full bg-teal/15 blur-[70px]" />
      <div aria-hidden className="absolute -left-4 bottom-0 h-24 w-24 rounded-full bg-highlight/15 blur-[60px]" />

      <div className="relative flex items-center gap-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-teal-strong bg-teal-strong text-white shadow-panel">
          <Mail className="h-5 w-5" aria-hidden />
        </span>

        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="h-px w-16 sm:w-20" aria-hidden>
          <motion.line
            x1="0"
            y1="5"
            x2="100"
            y2="5"
            stroke="var(--color-teal)"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-paper text-teal-strong shadow-panel"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
        </motion.span>
      </div>
    </div>
  );
}
