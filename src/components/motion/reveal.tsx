"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /**
   * For content that is already in the initial viewport (e.g. the hero).
   * Animates immediately on mount instead of waiting for scroll
   * intersection, and never hides content via opacity — only a small
   * transform — so the SSR-rendered HTML is always fully visible and
   * legible even before JavaScript runs.
   */
  immediate?: boolean;
};

export function Reveal({ children, delay = 0, className, immediate = false }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial={shouldReduceMotion ? false : { y: 10 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : Math.min(delay, 0.15), ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
