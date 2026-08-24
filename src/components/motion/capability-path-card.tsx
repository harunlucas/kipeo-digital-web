"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Globe2, ShieldCheck, Cpu, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { CapabilityPath, EngagementType, WorkStatus } from "@/content/selected-work";

const icons: Record<CapabilityPath["visual"], typeof Globe2> = {
  websites: Globe2,
  systems: ShieldCheck,
  engineering: Cpu,
  commerce: ShoppingBag,
};

export const engagementLabels: Record<EngagementType, string> = {
  client: "Client project",
  collaboration: "Collaboration",
  "internal-product": "Internal or collaborative product",
  "team-contribution": "Team contribution",
  "managed-platform": "Managed platform",
  "related-work": "Related work",
};

export const statusLabels: Record<WorkStatus, string> = {
  live: "Live",
  "in-development": "Active development",
  maintained: "Maintained",
  completed: "Completed",
};

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "amber" }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
        tone === "amber"
          ? "border-highlight/30 bg-highlight/10 text-highlight-strong"
          : "border-neutral-200 text-slate-muted"
      }`}
    >
      {children}
    </span>
  );
}

/** Minimal browser-chrome frame, matching the featured-project-card treatment,
 * so real screenshots read as "device framed" evidence rather than bare crops. */
export function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex items-center gap-1.5 bg-ink px-3 py-1.5" aria-hidden>
        <span className="h-1.5 w-1.5 rounded-full bg-ink-muted/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-muted/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-teal" />
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}

export function CapabilityPathCard({ path, index }: { path: CapabilityPath; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = icons[path.visual];
  // Tied to what's actually rendered below, not to whether content
  // remembered to set a label — a card can never end up badged "Real
  // screenshots" while rendering a stock photo, an AI concept render or the
  // abstract SVG artwork.
  const visualKind = path.screenshots ? "screenshots" : (path.capabilityVisual?.kind ?? "illustration");
  const isIllustration = visualKind !== "screenshots";
  const badgeLabel =
    visualKind === "screenshots"
      ? "Real screenshots"
      : visualKind === "photo"
        ? "Representative photo"
        : visualKind === "concept"
          ? "Concept visual"
          : (path.illustrationLabel ?? "What we build");

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-paper shadow-card">
        <div className="group relative aspect-[2.35/1] overflow-hidden bg-ink">
          {path.screenshots ? (
            <BrowserFrame>
              <div className="absolute inset-0 grid grid-cols-2 gap-px bg-ink-elevated">
                {path.screenshots.slice(0, 2).map((shot) => (
                  <div key={shot.src} className="relative overflow-hidden">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(min-width: 1024px) 20vw, 40vw"
                      className="object-cover object-top grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            </BrowserFrame>
          ) : path.capabilityVisual ? (
            <div className="absolute inset-0">
              <Image
                src={path.capabilityVisual.src}
                alt={path.capabilityVisual.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              {path.capabilityVisual.credit && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent pb-2 pt-8">
                  {path.capabilityVisual.creditHref ? (
                    <a
                      href={path.capabilityVisual.creditHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-3 inline-block text-[10px] text-ink-muted/90 hover:text-ink-foreground"
                    >
                      {path.capabilityVisual.credit}
                    </a>
                  ) : (
                    <span className="ml-3 inline-block text-[10px] text-ink-muted/90">
                      {path.capabilityVisual.credit}
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 opacity-90 transition-transform duration-500 group-hover:scale-105">
              <PathArtwork visual={path.visual} />
            </div>
          )}
          <div aria-hidden className="bg-grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
          <span
            className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] uppercase tracking-wide backdrop-blur ${
              isIllustration
                ? "border border-dashed border-white/30 bg-ink/50 text-ink-muted"
                : "border border-ink-elevated bg-ink/80 text-ink-foreground"
            }`}
          >
            <Icon className="h-3 w-3" aria-hidden />
            {badgeLabel}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold text-paper-foreground">{path.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate">{path.description}</p>

          {path.screenshotAttribution && (
            <p className="mt-1.5 text-xs text-slate-muted">{path.screenshotAttribution}</p>
          )}
          {path.capabilityVisual && (
            <p className="mt-1.5 text-xs text-slate-muted">
              {path.capabilityVisual.kind === "photo"
                ? "Representative photography — not a Kipeo Digital project or client."
                : "AI-generated concept visual — not a real product screenshot or client."}
            </p>
          )}

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {path.examples.map((example) => (
              <li key={example} className="rounded-full bg-mist px-2.5 py-1 text-[11px] text-slate">
                {example}
              </li>
            ))}
          </ul>

          <Link
            href={path.href}
            className="group/cta mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-medium text-teal-strong hover:text-ink"
          >
            {path.primaryAgencyCta}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              aria-hidden
            />
          </Link>

          {path.relatedExpertise && (
            <div className="mt-4 border-t border-neutral-200 pt-3">
              <p className="font-mono text-[10px] uppercase tracking-wide text-slate-muted">
                {path.relatedExpertise.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate">{path.relatedExpertise.description}</p>
              <a
                href={path.relatedExpertise.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-teal-strong hover:text-ink"
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

    case "engineering": {
      const sparklines = [
        [8, 14, 10, 18, 13, 20],
        [16, 12, 17, 11, 19, 14],
        [10, 15, 9, 16, 12, 17],
      ];
      return (
        <svg viewBox="0 0 400 225" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="eng-panel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-ink-elevated)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--color-ink-elevated)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <rect x="20" y="16" width="360" height="193" rx="10" fill="url(#eng-panel)" />

          {/* live status */}
          <circle cx="336" cy="34" r="4" fill="var(--color-teal)" />
          <text x="346" y="38" fontSize="10" fill="var(--color-ink-muted)" fontFamily="var(--font-mono, monospace)">
            LIVE
          </text>

          {/* three sensor-reading tiles with mini sparklines */}
          {sparklines.map((points, tileIndex) => {
            const tx = 40 + tileIndex * 100;
            const max = Math.max(...points);
            return (
              <g key={tileIndex}>
                <rect x={tx} y="28" width="84" height="52" rx="6" fill="var(--color-ink)" fillOpacity="0.5" />
                <text
                  x={tx + 10}
                  y="44"
                  fontSize="9"
                  fill="var(--color-ink-muted)"
                  fontFamily="var(--font-mono, monospace)"
                >
                  {["TEMP", "VIBR", "LOAD"][tileIndex]}
                </text>
                {points.map((p, i) => (
                  <rect
                    key={i}
                    x={tx + 10 + i * 11}
                    y={70 - (p / max) * 24}
                    width="6"
                    height={(p / max) * 24}
                    rx="1.5"
                    fill="var(--color-teal)"
                    fillOpacity={0.55 + (i / points.length) * 0.4}
                  />
                ))}
              </g>
            );
          })}

          {/* equipment health trend + gauge */}
          <g stroke="var(--color-teal)" strokeOpacity="0.6" fill="none" strokeWidth="1.5">
            <path d="M40,175 L120,138 L200,160 L280,105 L350,128" />
          </g>
          {[
            [40, 175],
            [120, 138],
            [200, 160],
            [280, 105],
            [350, 128],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i === 3 ? 7 : 4.5} fill="var(--color-teal)" fillOpacity="0.9" />
          ))}
          <path
            d="M255,192 A32,32 0 1 1 305,192"
            stroke="var(--color-highlight)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            opacity="0.75"
          />
          <text x="264" y="196" fontSize="10" fill="var(--color-highlight-foreground)" fontFamily="var(--font-mono, monospace)">
            92%
          </text>
        </svg>
      );
    }

    case "commerce": {
      const tiles = [
        { fill: "url(#commerce-card)" },
        { fill: "var(--color-highlight)", opacity: 0.75 },
        { fill: "var(--color-teal-strong)", opacity: 0.6 },
        { fill: "var(--color-highlight-strong)", opacity: 0.5 },
      ];
      return (
        <svg viewBox="0 0 400 225" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="commerce-card" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--color-teal-strong)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {tiles.map((tile, col) => (
            <g key={col}>
              <rect x={20 + col * 92} y="20" width="76" height="86" rx="8" fill="var(--color-ink-elevated)" />
              <rect
                x={36 + col * 92}
                y="36"
                width="44"
                height="44"
                rx="6"
                fill={tile.fill}
                fillOpacity={tile.opacity ?? 1}
              />
              <rect x={36 + col * 92} y="88" width="44" height="6" rx="3" fill="var(--color-ink-elevated)" opacity="0.9" />
            </g>
          ))}

          <rect x="20" y="126" width="360" height="14" rx="7" fill="var(--color-ink-elevated)" />
          <rect x="20" y="150" width="230" height="14" rx="7" fill="var(--color-ink-elevated)" opacity="0.8" />

          {/* cart / checkout bar */}
          <rect x="20" y="178" width="360" height="32" rx="16" fill="var(--color-ink-elevated)" opacity="0.7" />
          <circle cx="40" cy="194" r="7" fill="var(--color-teal)" />
          <rect x="56" y="188" width="120" height="12" rx="6" fill="var(--color-ink)" opacity="0.5" />
          <rect x="290" y="184" width="76" height="20" rx="10" fill="var(--color-teal)" fillOpacity="0.9" />
        </svg>
      );
    }
  }
}
