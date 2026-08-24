import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { InsightVisual } from "@/components/motion/insight-visual";
import { formatInsightDate } from "@/lib/format-date";
import type { Insight } from "@/content/insights";

/**
 * All information — category, title, description, date, reading time — is
 * static markup, never revealed only on hover, per the brief.
 */
export function FeaturedInsight({ insight }: { insight: Insight }) {
  return (
    <Reveal immediate>
      <Link
        href={`/insights/${insight.slug}`}
        className="group grid overflow-hidden rounded-2xl border border-neutral-200 bg-paper-elevated shadow-card transition-shadow duration-200 hover:shadow-panel lg:grid-cols-[1.05fr_1fr]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-ink sm:aspect-[16/9] lg:aspect-auto">
          <div aria-hidden className="bg-grid-ink pointer-events-none absolute inset-0 opacity-40" />
          <div role="img" aria-label={insight.featuredImageAlt} className="h-full w-full">
            <InsightVisual variant={insight.featuredImage} />
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-9">
          <div className="flex items-center gap-3">
            <Eyebrow>{insight.category}</Eyebrow>
            <span className="rounded-full border border-teal-strong/30 bg-teal-tint px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-teal-strong">
              Featured
            </span>
          </div>
          <h2 className="text-display-2 mt-4 text-paper-foreground">{insight.title}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate">{insight.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-muted">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden />
              <time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {insight.readingTime}
            </span>
          </div>

          <span className="group/cta mt-7 inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-medium text-teal-strong group-hover:text-ink">
            Read insight
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
