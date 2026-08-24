"use client";

import { Clock, Milestone, Globe2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const cards = [
  {
    icon: Globe2,
    title: "Nairobi, Kenya",
    detail: "EAT · UTC+3",
    rotate: -4,
    x: "0%",
    y: "0%",
    z: 0,
    tone: "bg-paper text-paper-foreground",
  },
  {
    icon: Clock,
    title: "Meeting window",
    detail: "Agreed to overlap with your working hours",
    rotate: 3,
    x: "24%",
    y: "34%",
    z: 20,
    tone: "bg-teal-strong text-white",
  },
  {
    icon: Milestone,
    title: "Documented milestones",
    detail: "Confirmed in writing, not left to memory",
    rotate: -2,
    x: "4%",
    y: "68%",
    z: 40,
    tone: "bg-ink text-ink-foreground",
  },
];

export function GlobalStack() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md [perspective:1200px]">
      <div aria-hidden className="absolute -right-8 top-6 h-56 w-56 rounded-full bg-teal/20 blur-[80px]" />

      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute w-64 rounded-2xl border border-neutral-200/20 p-5 shadow-panel ${card.tone}`}
          style={{
            left: card.x,
            top: card.y,
            transform: `translateZ(${card.z}px) rotate(${card.rotate}deg)`,
          }}
        >
          <card.icon className="h-5 w-5 opacity-80" aria-hidden />
          <p className="mt-3 text-sm font-semibold">{card.title}</p>
          <p className="mt-1 text-xs opacity-80">{card.detail}</p>
        </motion.div>
      ))}
    </div>
  );
}
