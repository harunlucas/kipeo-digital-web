import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { InsightVisual } from "@/components/motion/insight-visual";
import { formatInsightDate } from "@/lib/format-date";
import type { Insight } from "@/content/insights";

export function InsightCard({ insight, size = "small" }: { insight: Insight; size?: "large" | "small" }) {
  const isLarge = size === "large";

  return (
    <Link
      href={`/insights/${insight.slug}`}
      className={`group flex h-full overflow-hidden rounded-2xl border border-neutral-200 bg-paper shadow-card transition-shadow duration-200 hover:shadow-panel ${
        isLarge ? "flex-col lg:flex-row" : "flex-col"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-ink ${
          isLarge ? "aspect-[16/9] lg:aspect-auto lg:w-[42%]" : "aspect-[16/10]"
        }`}
      >
        <div aria-hidden className="bg-grid-ink pointer-events-none absolute inset-0 opacity-40" />
        <div role="img" aria-label={insight.featuredImageAlt} className="h-full w-full">
          <InsightVisual variant={insight.featuredImage} />
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${isLarge ? "p-6 sm:p-7" : "p-5"}`}>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal-strong">{insight.category}</span>
        <h3 className={`mt-2 font-semibold text-paper-foreground ${isLarge ? "text-xl sm:text-2xl" : "text-base"}`}>
          {insight.title}
        </h3>
        <p className={`mt-2 flex-1 leading-relaxed text-slate ${isLarge ? "text-sm sm:text-base" : "text-sm"}`}>
          {insight.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            <time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {insight.readingTime}
          </span>
        </div>

        <span className="group/cta mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-medium text-teal-strong group-hover:text-ink">
          Read insight
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
