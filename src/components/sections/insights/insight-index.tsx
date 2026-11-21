"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatInsightDate } from "@/lib/format-date";
import type { Insight, InsightCategory } from "@/content/insights";

const ALL = "all" as const;
type Filter = InsightCategory | typeof ALL;

/**
 * Topic filters and the article index on /insights.
 *
 * - "All articles" is the default and lists every published article except
 *   the featured one, which already sits above. The server renders this
 *   state, so those links are in the initial HTML.
 * - Choosing a category lists every article in it, the featured one
 *   included, so nothing in a topic is hidden.
 * - Filters render only when there are two or more categories with
 *   published articles; each is a toggle button with `aria-pressed`, and a
 *   polite live region reports the result.
 *
 * Each row is one link (topic, date, headline, summary), so it takes one tab
 * stop and the global focus ring outlines the whole row. An article's
 * `listingImage`, when set, sits beside the link rather than inside it, so
 * the link's name stays the article text.
 */
export function InsightIndex({
  insights,
  featuredSlug,
  categories,
}: {
  insights: Insight[];
  featuredSlug?: string;
  categories: InsightCategory[];
}) {
  const [filter, setFilter] = useState<Filter>(ALL);
  const listId = useId();

  const visible =
    filter === ALL
      ? insights.filter((insight) => insight.slug !== featuredSlug)
      : insights.filter((insight) => insight.category === filter);

  const counts = new Map<InsightCategory, number>();
  for (const insight of insights) counts.set(insight.category, (counts.get(insight.category) ?? 0) + 1);

  const showFilters = categories.length > 1;
  const options: { value: Filter; label: string; count: number }[] = [
    { value: ALL, label: "All articles", count: insights.length },
    ...categories.map((category) => ({ value: category, label: category, count: counts.get(category) ?? 0 })),
  ];

  const status =
    filter === ALL
      ? `Showing all ${insights.length} articles.`
      : `${visible.length} ${visible.length === 1 ? "article" : "articles"} in ${filter}.`;

  return (
    <div>
      {showFilters ? (
        <>
          <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2.5">
            {options.map((option) => {
              const selected = option.value === filter;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  aria-controls={listId}
                  onClick={() => setFilter(option.value)}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-150 motion-reduce:transition-none",
                    selected
                      ? "border-teal-strong bg-teal-strong text-on-accent"
                      : "border-neutral-300 bg-transparent text-paper-foreground hover:border-teal-strong hover:text-teal-strong",
                  )}
                >
                  {option.label}
                  <span
                    className={cn("tabular-nums text-xs", selected ? "text-on-accent/80" : "text-slate-muted")}
                    aria-hidden
                  >
                    {option.count}
                  </span>
                  <span className="sr-only">
                    , {option.count} {option.count === 1 ? "article" : "articles"}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="sr-only" aria-live="polite">
            {status}
          </p>
        </>
      ) : null}

      <ul id={listId} className={cn("border-b border-neutral-300", showFilters && "mt-8 sm:mt-10")}>
        {visible.map((insight) => (
          <InsightRow key={insight.slug} insight={insight} featured={insight.slug === featuredSlug} />
        ))}
      </ul>
    </div>
  );
}

function InsightRow({ insight, featured }: { insight: Insight; featured: boolean }) {
  const image = insight.listingImage;

  return (
    <li
      className={cn(
        "grid gap-y-5 border-t border-neutral-300 py-8 sm:py-10",
        image && "lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start lg:gap-x-12",
      )}
    >
      <Link
        href={`/insights/${insight.slug}`}
        className="group grid gap-y-3 rounded-sm lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:gap-x-12"
      >
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-slate-muted lg:flex-col lg:items-start lg:pt-1.5">
          {featured ? <span className="font-medium text-teal-strong">Featured</span> : null}
          {featured ? (
            <span aria-hidden className="text-neutral-300 lg:hidden">
              ·
            </span>
          ) : null}
          <span className="text-teal-strong">{insight.category}</span>
          <span aria-hidden className="text-neutral-300 lg:hidden">
            ·
          </span>
          <time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time>
        </p>

        <div>
          <h3 className="max-w-[30ch] break-words font-display text-2xl font-semibold leading-[1.15] tracking-[-0.012em] text-paper-foreground transition-colors group-hover:text-teal-strong sm:text-[1.875rem]">
            <span className="headline-underline">{insight.title}</span>
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate">{insight.description}</p>
          <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-paper-foreground transition-colors group-hover:text-teal-strong">
            Read the article
            <ArrowUpRight className="link-arrow h-4 w-4 shrink-0" aria-hidden />
          </span>
        </div>
      </Link>

      {image ? (
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#e6ccad]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            quality={90}
            sizes="(min-width: 1024px) 288px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 48px)"
            className="object-cover"
          />
        </div>
      ) : null}
    </li>
  );
}
