"use client";

import { useState } from "react";
import Image from "next/image";
import type { StudioWorkspaceHotspot } from "@/content/studio";

/**
 * Full-width isometric studio image with six accessible hotspot pins.
 * Pins are real <button> elements (native keyboard + touch + mouse
 * support, no custom key handling needed) positioned by percentage over a
 * non-clipping wrapper, so a pin near the edge is never cut off by the
 * image's own rounded-corner clip (applied to an inner layer instead).
 */
export function StudioWorkspace({
  hotspots,
  src,
  alt,
}: {
  hotspots: StudioWorkspaceHotspot[];
  src: string;
  alt: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = hotspots.find((h) => h.id === activeId) ?? null;

  return (
    <div>
      <div className="relative w-full" style={{ aspectRatio: "1672 / 941" }}>
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-ink-elevated bg-ink">
          <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 1100px, 100vw" className="object-cover" />
          <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" />
        </div>

        {hotspots.map((hotspot) => {
          const isActive = hotspot.id === activeId;
          return (
            <button
              key={hotspot.id}
              type="button"
              aria-pressed={isActive}
              aria-label={`${hotspot.label}: ${hotspot.description}`}
              onClick={() => setActiveId(isActive ? null : hotspot.id)}
              className={`absolute flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 font-mono text-xs transition-colors duration-200 ${
                isActive
                  ? "border-teal bg-teal text-teal-foreground"
                  : "border-white/60 bg-ink/70 text-ink-foreground backdrop-blur hover:border-teal"
              }`}
              style={{ left: `${hotspot.position.x}%`, top: `${hotspot.position.y}%` }}
            >
              {!isActive && (
                <span aria-hidden className="absolute inset-2 animate-ping rounded-full bg-teal/50" />
              )}
              <span className="relative">{hotspot.number}</span>
            </button>
          );
        })}
      </div>

      <div
        aria-live="polite"
        className="mt-4 min-h-[4.5rem] rounded-xl border border-ink-elevated bg-ink-elevated/40 p-4 text-sm leading-relaxed text-ink-muted"
      >
        {active ? (
          <>
            <p className="font-medium text-ink-foreground">
              {active.number} — {active.label}
            </p>
            <p className="mt-1">{active.description}</p>
          </>
        ) : (
          <p>Select a numbered point on the studio to see what that part of the build represents.</p>
        )}
      </div>
    </div>
  );
}
