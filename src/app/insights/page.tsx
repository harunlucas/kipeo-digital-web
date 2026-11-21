import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { AnimatedLink } from "@/components/sections/home/animated-link";
import { InsightsHero } from "@/components/sections/insights/insights-hero";
import { InsightFeature } from "@/components/sections/insights/insight-feature";
import { InsightIndex } from "@/components/sections/insights/insight-index";
import { getAllInsights, getAvailableCategories, getFeaturedInsight } from "@/lib/insights";
import { buildMetadata } from "@/lib/metadata";

const title = "Software and Digital Strategy Insights | Kipeo Digital";
const description =
  "Clear guidance on planning, building and maintaining software, websites and operational platforms — from the team behind Kipeo Digital.";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  keywords: ["software development guidance", "business systems planning", "web application development"],
  alternates: { canonical: "/insights" },
  openGraph: { url: "/insights", title, description },
  twitter: { title, description },
});

/**
 * The Insights index, in reading order: hero → featured article → topic
 * filters and article index → closing invitation → site footer.
 *
 * The feature is the article marked `featured: true`, else the newest.
 * Drafts never reach this page: every helper here reads `getAllInsights`,
 * which keeps only `published: true`. Filters appear only for categories
 * with published articles (`getAvailableCategories`). With a single
 * published article, the index is omitted and the feature stands alone.
 */
export default async function InsightsPage() {
  const [all, featured, categories] = await Promise.all([
    getAllInsights(),
    getFeaturedInsight(),
    getAvailableCategories(),
  ]);

  return (
    <div className="bg-ivory">
      <InsightsHero intro="Practical notes on choosing websites, planning software and improving how teams work." />

      <section aria-label="Featured article" className="pb-14 pt-12 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
        <Container>
          {featured ? (
            <InsightFeature insight={featured} />
          ) : (
            <p className="text-base text-slate">New articles are on the way.</p>
          )}
        </Container>
      </section>

      {all.length > 1 ? (
        <section aria-labelledby="browse-insights" className="pb-14 sm:pb-16 lg:pb-20">
          <Container>
            <h2
              id="browse-insights"
              className="border-t border-neutral-300 pt-8 text-sm font-medium text-slate-muted sm:pt-10"
            >
              Browse by topic
            </h2>
            <div className="mt-5">
              <InsightIndex insights={all} featuredSlug={featured?.slug} categories={categories} />
            </div>
          </Container>
        </section>
      ) : null}

      <section aria-labelledby="insights-next" className="border-t border-neutral-300 py-12 sm:py-14">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div>
              <h2
                id="insights-next"
                className="font-display text-2xl font-semibold leading-tight tracking-[-0.01em] text-paper-foreground sm:text-[1.75rem]"
              >
                Have a system in mind?
              </h2>
              <p className="mt-2 max-w-lg text-base leading-relaxed text-slate">
                Tell us who will use it and what they need to get done.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
              <Button href="/contact" variant="primary" size="lg">
                Start a project
              </Button>
              <AnimatedLink href="/services">Explore services</AnimatedLink>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
