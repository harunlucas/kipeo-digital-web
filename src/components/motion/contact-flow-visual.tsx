"use client";

import { motion, useReducedMotion } from "motion/react";
import { Inbox, Search, MessagesSquare, FileText, Rocket } from "lucide-react";

const steps = [
  { id: "enquiry", label: "Enquiry", icon: Inbox },
  { id: "review", label: "Review", icon: Search },
  { id: "clarification", label: "Clarification", icon: MessagesSquare },
  { id: "proposal", label: "Proposal", icon: FileText },
  { id: "start", label: "Project start", icon: Rocket },
];

/**
 * A quiet, compact visual for the /contact hero: an enquiry moving through
 * review, clarification and a proposal to a project start, as a connected
 * horizontal path. Built fresh for this page — not the Insights hero's
 * idea→decision→system composition, not any Services/Work visual.
 */
export function ContactFlowVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[440px] py-4">
      <div aria-hidden className="absolute -right-6 top-0 h-40 w-40 rounded-full bg-teal/15 blur-[80px]" />
      <div aria-hidden className="absolute -left-6 bottom-0 h-32 w-32 rounded-full bg-highlight/15 blur-[70px]" />

      <div className="relative flex items-start justify-between">
        <svg
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-[10%] right-[10%] top-6 h-px w-[80%]"
          aria-hidden
        >
          <motion.line
            x1="0"
            y1="5"
            x2="100"
            y2="5"
            stroke="var(--color-teal)"
            strokeOpacity="0.4"
            strokeWidth="1"
            strokeDasharray="3 3"
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        {steps.map(({ id, label, icon: Icon }, index) => (
          <motion.div
            key={id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-1/5 flex-col items-center gap-2 text-center"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-panel sm:h-12 sm:w-12 ${
                index === 0
                  ? "border-teal-strong bg-teal-strong text-white"
                  : "border-neutral-200 bg-paper text-teal-strong"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-[10px] font-medium leading-tight text-slate">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
