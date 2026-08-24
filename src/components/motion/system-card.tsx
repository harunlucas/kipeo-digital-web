"use client";

import { motion, useReducedMotion } from "motion/react";
import type { SystemType } from "@/content/systems";

export function SystemCard({
  system,
  index,
  featured = false,
}: {
  system: SystemType;
  index: number;
  featured?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group grid gap-6 ${featured ? "lg:grid-cols-[1.2fr_1fr] lg:items-center" : ""}`}
    >
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { scale: 1.012 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden rounded-2xl border border-ink-elevated bg-ink ${
          featured ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        <div aria-hidden className="absolute inset-0 opacity-90 transition-transform duration-500 group-hover:scale-105">
          <SystemArtwork visual={system.visual} />
        </div>
        <div aria-hidden className="bg-grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />

        <div className="relative flex h-full flex-col justify-between p-6">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-ink-muted/60" />
            <span className="h-2 w-2 rounded-full bg-ink-muted/60" />
            <span className="h-2 w-2 rounded-full bg-teal" />
          </div>
        </div>
      </motion.div>

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-strong">
          {system.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-paper-foreground">{system.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate">{system.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {system.technologies.map((tech) => (
            <li key={tech} className="rounded-full bg-mist px-3 py-1 text-xs text-slate">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function SystemArtwork({ visual }: { visual: SystemType["visual"] }) {
  if (visual === "dashboard") {
    return (
      <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect x="24" y="24" width="130" height="90" rx="8" fill="var(--color-ink-elevated)" />
        <rect x="24" y="128" width="130" height="108" rx="8" fill="var(--color-ink-elevated)" />
        <rect x="166" y="24" width="210" height="50" rx="8" fill="var(--color-ink-elevated)" />
        <g fill="var(--color-teal)" fillOpacity="0.8">
          <rect x="182" y="110" width="24" height="70" rx="3" />
          <rect x="216" y="80" width="24" height="100" rx="3" />
          <rect x="250" y="130" width="24" height="50" rx="3" />
          <rect x="284" y="60" width="24" height="120" rx="3" />
          <rect x="318" y="95" width="24" height="85" rx="3" />
        </g>
      </svg>
    );
  }

  if (visual === "app") {
    return (
      <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <rect x="24" y="24" width="90" height="212" rx="8" fill="var(--color-ink-elevated)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="40" y={44 + i * 36} width="58" height="10" rx="3" fill="var(--color-teal)" fillOpacity={i === 1 ? 0.9 : 0.35} />
        ))}
        <rect x="134" y="24" width="242" height="100" rx="8" fill="var(--color-ink-elevated)" />
        <rect x="134" y="136" width="116" height="100" rx="8" fill="var(--color-ink-elevated)" />
        <rect x="260" y="136" width="116" height="100" rx="8" fill="var(--color-ink-elevated)" />
        <circle cx="185" cy="74" r="26" fill="var(--color-teal)" fillOpacity="0.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      {[0, 1, 2, 3].map((col) =>
        [0, 1].map((row) => (
          <rect
            key={`${col}-${row}`}
            x={24 + col * 92}
            y={24 + row * 118}
            width="76"
            height="100"
            rx="8"
            fill="var(--color-ink-elevated)"
          />
        )),
      )}
      <rect x="40" y="40" width="44" height="44" rx="6" fill="var(--color-teal)" fillOpacity="0.75" />
      <rect x="132" y="158" width="44" height="44" rx="6" fill="var(--color-highlight)" fillOpacity="0.75" />
      <rect x="316" y="40" width="44" height="44" rx="6" fill="var(--color-teal)" fillOpacity="0.5" />
    </svg>
  );
}
