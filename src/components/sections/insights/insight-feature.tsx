import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatInsightDate } from "@/lib/format-date";
import type { Insight } from "@/content/insights";

/**
 * The one featured article on /insights. Headline, excerpt and the "Read the
 * article" cue form a single link: one tab stop, nothing hover-only. On
 * hover or keyboard focus the headline underline draws and the arrow moves,
 * as in `AnimatedLink`.
 *
 * Without a `listingImage` (the usual case) typography carries it: topic and
 * headline on the left, excerpt and link on the right, on the About page's
 * 5/6 grid. With one, the image takes the right column and follows the text
 * on small screens, so the headline is read first. The image is lazy-loaded:
 * the hero above is the page's priority image.
 */
export function InsightFeature({ insight }: { insight: Insight }) {
  const image = insight.listingImage;
  const headlineId = `feature-${insight.slug}`;
  const href = `/insights/${insight.slug}`;

  const meta = (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-slate-muted">
      <span className="font-medium text-teal-strong">Featured</span>
      <span aria-hidden className="text-neutral-300">
        ·
      </span>
      <span>{insight.category}</span>
      <span aria-hidden className="text-neutral-300">
        ·
      </span>
      <time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time>
    </p>
  );

  const headline = (
    <h2
      id={headlineId}
      className="max-w-[24ch] break-words font-display text-[clamp(1.75rem,1.2rem+1.7vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.018em] text-paper-foreground"
    >
      <span className="headline-underline">{insight.title}</span>
    </h2>
  );

  const excerpt = (
    <p className="max-w-xl text-base leading-relaxed text-slate sm:text-lg">{insight.excerpt ?? insight.description}</p>
  );

  const cue = (
    <span className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-paper-foreground transition-colors group-hover:text-teal-strong sm:text-base">
      <span className="headline-underline">Read the article</span>
      <span className="sr-only">({insight.readingTime})</span>
      <ArrowUpRight className="link-arrow h-4 w-4 shrink-0" aria-hidden />
    </span>
  );

  if (!image) {
    return (
      <article aria-labelledby={headlineId}>
        <Link
          href={href}
          className="group grid gap-y-6 rounded-sm focus-visible:outline-offset-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-x-20"
        >
          <div>
            {meta}
            <div className="mt-4">{headline}</div>
          </div>
          <div className="lg:pb-1">
            {excerpt}
            <div className="mt-5">{cue}</div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article
      aria-labelledby={headlineId}
      className="grid gap-y-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-x-16"
    >
      <div>
        {meta}
        <Link href={href} className="group mt-4 block rounded-sm focus-visible:outline-offset-8">
          {headline}
          <div className="mt-5">{excerpt}</div>
          <div className="mt-6">{cue}</div>
        </Link>
      </div>

      <figure>
        <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-mist lg:aspect-[4/3]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            quality={90}
            sizes="(min-width: 1280px) 640px, (min-width: 1024px) 52vw, calc(100vw - 48px)"
            className="object-cover"
          />
        </div>
        {image.caption ? (
          <figcaption className="mt-3 max-w-md text-sm leading-relaxed text-slate-muted">{image.caption}</figcaption>
        ) : null}
      </figure>
    </article>
  );
}
