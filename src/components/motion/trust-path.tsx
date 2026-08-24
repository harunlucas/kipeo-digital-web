"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type TrustPathItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function TrustPath({ items }: { items: TrustPathItem[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative">
      {/* Desktop: horizontal path */}
      <div className="relative hidden md:block">
        <div className="absolute left-[12.5%] right-[12.5%] top-6 h-px bg-ink-elevated" aria-hidden />
        <motion.div
          className="absolute left-[12.5%] right-[12.5%] top-6 h-px origin-left bg-teal"
          initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
          whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        />
        <ol className="grid grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.li
              key={item.title}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-teal bg-ink text-teal">
                {item.icon}
              </span>
              <p className="mt-4 text-sm font-medium text-ink-foreground">{item.title}</p>
              <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Mobile: vertical path */}
      <ol className="relative flex flex-col gap-8 md:hidden">
        <div className="absolute left-6 top-3 bottom-3 w-px bg-ink-elevated" aria-hidden />
        <motion.div
          className="absolute left-6 top-3 bottom-3 w-px origin-top bg-teal"
          initial={shouldReduceMotion ? undefined : { scaleY: 0 }}
          whileInView={shouldReduceMotion ? undefined : { scaleY: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        />
        {items.map((item, index) => (
          <motion.li
            key={item.title}
            initial={shouldReduceMotion ? undefined : { opacity: 0, x: -8 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-start gap-4 pl-0"
          >
            <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-teal bg-ink text-teal">
              {item.icon}
            </span>
            <div className="pt-2">
              <p className="text-sm font-medium text-ink-foreground">{item.title}</p>
              <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
