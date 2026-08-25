"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { WorkSectionAnchor } from "@/content/work";

/**
 * The three section jump-links, relocated into the hero and given a clearly
 * labelled "portfolio navigator" presentation. Still exactly the same
 * navigation as before — each link still just jumps to its section — this
 * only adds a scroll-aware "current section" indicator (`aria-current`) on
 * top of that unchanged behaviour, since a fixed set of anchor links has no
 * natural "active" state of its own to show.
 */
export function PortfolioNavigator({ anchors }: { anchors: WorkSectionAnchor[] }) {
  const [activeId, setActiveId] = useState<string>(anchors[0]?.id ?? "");
  const ratiosRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const sections = anchors
      .map((anchor) => document.getElementById(anchor.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratiosRef.current.set(entry.target.id, entry.intersectionRatio);
        }
        let topId = activeId;
        let topRatio = 0;
        for (const [id, ratio] of ratiosRef.current) {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        }
        if (topRatio > 0) setActiveId(topId);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchors]);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-paper-elevated/80 px-4 py-3.5 shadow-card backdrop-blur-sm sm:px-5">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-muted">Explore by type</span>
      <nav aria-label="Explore the portfolio by type" className="mt-2.5 flex flex-wrap gap-2">
        {anchors.map((anchor) => {
          const isActive = anchor.id === activeId;
          return (
            <Link
              key={anchor.id}
              href={`#${anchor.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "border-teal-strong bg-teal-strong text-white"
                  : "border-neutral-300 text-slate hover:bg-mist"
              }`}
            >
              {anchor.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
