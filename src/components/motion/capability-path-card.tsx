"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink, Globe2, ShieldCheck, Cpu, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { CapabilityPath } from "@/content/selected-work";

const icons: Record<CapabilityPath["visual"], typeof Globe2> = {
  websites: Globe2,
  systems: ShieldCheck,
  engineering: Cpu,
  commerce: ShoppingBag,
};

export function CapabilityPathCard({ path, index }: { path: CapabilityPath; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = icons[path.visual];

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-paper shadow-card">
        <div className="group relative aspect-[2/1] overflow-hidden bg-ink">
          <div className="absolute inset-0 opacity-90 transition-transform duration-500 group-hover:scale-105">
            <PathArtwork visual={path.visual} />
          </div>
          <div aria-hidden className="bg-grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-ink-elevated bg-ink/80 px-3 py-1 text-[11px] uppercase tracking-wide text-ink-foreground backdrop-blur">
            <Icon className="h-3 w-3" aria-hidden />
            What we build
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-semibold text-paper-foreground">{path.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate">{path.description}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {path.examples.map((example) => (
              <li key={example} className="rounded-full bg-mist px-2.5 py-1 text-[11px] text-slate">
                {example}
              </li>
            ))}
          </ul>

          <Link
            href={path.href}
            className="group/cta mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-teal-strong hover:text-ink"
          >
            {path.primaryAgencyCta}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              aria-hidden
            />
          </Link>

          {path.relatedExpertise && (
            <div className="mt-5 border-t border-neutral-200 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wide text-slate-muted">
                {path.relatedExpertise.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate">{path.relatedExpertise.description}</p>
              <a
                href={path.relatedExpertise.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-teal-strong hover:text-ink"
              >
                {path.secondaryExpertiseLink}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                <span className="sr-only">(opens {path.relatedExpertise.sourceName} in a new tab)</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PathArtwork({ visual }: { visual: CapabilityPath["visual"] }) {
  switch (visual) {
    case "websites":
      return (
        <svg viewBox="0 0 400 225" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <rect x="20" y="20" width="360" height="24" rx="6" fill="var(--color-ink-elevated)" />
          <circle cx="34" cy="32" r="4" fill="var(--color-teal)" />
          <rect x="20" y="58" width="360" height="52" rx="8" fill="var(--color-ink-elevated)" opacity="0.85" />
          <rect x="20" y="122" width="220" height="12" rx="4" fill="var(--color-ink-elevated)" />
          <rect x="20" y="142" width="150" height="12" rx="4" fill="var(--color-ink-elevated)" opacity="0.7" />
          <rect x="20" y="170" width="120" height="30" rx="15" fill="var(--color-teal)" fillOpacity="0.85" />
        </svg>
      );

    case "systems":
      return (
        <svg viewBox="0 0 400 225" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <rect x="20" y="20" width="120" height="80" rx="8" fill="var(--color-ink-elevated)" />
          <rect x="20" y="112" width="120" height="93" rx="8" fill="var(--color-ink-elevated)" />
          <rect x="152" y="20" width="228" height="44" rx="8" fill="var(--color-ink-elevated)" />
          <g fill="var(--color-teal)" fillOpacity="0.8">
            <rect x="166" y="96" width="20" height="60" rx="3" />
            <rect x="196" y="70" width="20" height="86" rx="3" />
            <rect x="226" y="110" width="20" height="46" rx="3" />
            <rect x="256" y="52" width="20" height="104" rx="3" />
            <rect x="286" y="82" width="20" height="74" rx="3" />
          </g>
        </svg>
      );

    case "engineering":
      return (
        <svg viewBox="0 0 400 225" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <g stroke="var(--color-teal)" strokeOpacity="0.4" fill="none">
            <path d="M40,175 L120,120 L200,150 L280,85 L360,115" />
          </g>
          {[
            [40, 175],
            [120, 120],
            [200, 150],
            [280, 85],
            [360, 115],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i === 3 ? 8 : 5} fill="var(--color-teal)" />
          ))}
          <path
            d="M280,175 A40,40 0 1 1 340,175"
            stroke="var(--color-highlight)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      );

    case "commerce":
      return (
        <svg viewBox="0 0 400 225" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          {[0, 1, 2, 3].map((col) => (
            <rect
              key={col}
              x={20 + col * 92}
              y="24"
              width="76"
              height="86"
              rx="8"
              fill="var(--color-ink-elevated)"
            />
          ))}
          <rect x="20" y="128" width="360" height="16" rx="8" fill="var(--color-ink-elevated)" />
          <rect x="20" y="156" width="240" height="16" rx="8" fill="var(--color-ink-elevated)" />
          <rect x="36" y="40" width="44" height="44" rx="6" fill="var(--color-teal)" fillOpacity="0.75" />
          <rect x="220" y="40" width="44" height="44" rx="6" fill="var(--color-highlight)" fillOpacity="0.7" />
        </svg>
      );
  }
}
