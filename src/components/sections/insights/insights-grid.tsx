"use client";

import { useMemo, useState } from "react";
import { InsightCard } from "@/components/sections/insights/insight-card";
import type { Insight, InsightCategory } from "@/content/insights";

const ALL = "All" as const;

/**
 * Category pills filter this grid client-side (three articles today, more
 * over time — no need for a server round trip). Only categories with a
 * published article ever appear, per the brief.
 */
export function InsightsGrid({ insights, categories }: { insights: Insight[]; categories: InsightCategory[] }) {
  const [active, setActive] = useState<InsightCategory | typeof ALL>(ALL);

  const filtered = useMemo(
    () => (active === ALL ? insights : insights.filter((insight) => insight.category === active)),
    [insights, active],
  );

  return (
    <div>
      <div role="group" aria-label="Filter insights by category" className="flex flex-wrap gap-2">
        {[ALL, ...categories].map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category)}
              className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "border-teal-strong bg-teal-strong text-white"
                  : "border-neutral-300 text-slate hover:bg-mist"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-slate-muted">No insights in this category yet.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((insight, index) => (
            <div key={insight.slug} className={index === 0 ? "sm:col-span-2 lg:col-span-3" : undefined}>
              <InsightCard insight={insight} size={index === 0 ? "large" : "small"} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
