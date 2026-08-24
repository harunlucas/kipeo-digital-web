import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { InsightVisual } from "@/components/motion/insight-visual";
import { InsightCard } from "@/components/sections/insights/insight-card";
import { getAllSlugs, getInsightBySlug, getLatestInsights } from "@/lib/insights";
import { formatInsightDate } from "@/lib/format-date";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const result = await getInsightBySlug(slug);
  if (!result) return {};

  const { insight } = result;
  return buildMetadata({
    title: { absolute: `${insight.title} | Kipeo Digital` },
    description: insight.description,
    keywords: insight.keywords,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      url: `/insights/${insight.slug}`,
      title: insight.title,
      description: insight.description,
      type: "article",
      publishedTime: insight.publishedAt,
      modifiedTime: insight.updatedAt ?? insight.publishedAt,
    },
    twitter: {
      title: insight.title,
      description: insight.description,
    },
  });
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getInsightBySlug(slug);
  if (!result) notFound();

  const { Content, insight } = result;
  const related = (await getLatestInsights(insight.slug)).slice(0, 2);

  return (
    <>
      <section className="bg-grid-paper relative overflow-hidden bg-paper pb-8 pt-10 sm:pt-12">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,var(--color-teal-tint),transparent)]"
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl">
          <Reveal immediate>
            <Link
              href="/insights"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-slate hover:text-paper-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All insights
            </Link>
          </Reveal>
          <Reveal immediate delay={0.06}>
            <Eyebrow className="mt-6">{insight.category}</Eyebrow>
          </Reveal>
          <Reveal immediate delay={0.1}>
            <h1 className="text-display-1 mt-4 text-paper-foreground">{insight.title}</h1>
          </Reveal>
          <Reveal immediate delay={0.14}>
            <p className="mt-5 text-lg leading-relaxed text-slate">{insight.description}</p>
          </Reveal>
          <Reveal immediate delay={0.18}>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-muted">
              <span>By {insight.author}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                <time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {insight.readingTime}
              </span>
            </div>
          </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal immediate delay={0.1}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-neutral-200 bg-ink shadow-panel sm:aspect-[2.2/1]">
              <div aria-hidden className="bg-grid-ink pointer-events-none absolute inset-0 opacity-40" />
              <div role="img" aria-label={insight.featuredImageAlt} className="h-full w-full">
                <InsightVisual variant={insight.featuredImage} />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          <article>
            <Content />
          </article>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="elevated">
          <Eyebrow>More insights</Eyebrow>
          <h2 className="text-display-3 mt-2 text-paper-foreground">Continue reading.</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {related.map((item) => (
              <InsightCard key={item.slug} insight={item} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
