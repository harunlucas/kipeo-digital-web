import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { InsightsHeroVisual } from "@/components/motion/insights-hero-visual";
import { FeaturedInsight } from "@/components/sections/insights/featured-insight";
import { InsightsGrid } from "@/components/sections/insights/insights-grid";
import { InsightsUpdatePrompt } from "@/components/sections/insights/insights-update-prompt";
import { getAvailableCategories, getFeaturedInsight, getLatestInsights } from "@/lib/insights";
import { buildMetadata } from "@/lib/metadata";

const title = "Insights | Kipeo Digital";
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

export default async function InsightsPage() {
  const featured = await getFeaturedInsight();
  const latest = await getLatestInsights(featured?.slug);
  const categories = await getAvailableCategories();

  return (
    <>
      <section className="bg-grid-paper relative overflow-hidden bg-paper pb-10 pt-12 sm:pb-12 sm:pt-14">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,var(--color-teal-tint),transparent)]"
        />
        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div>
              <Reveal immediate>
                <Eyebrow>Insights</Eyebrow>
              </Reveal>
              <Reveal immediate delay={0.06}>
                <h1 className="text-display-1 mt-5 text-paper-foreground">
                  Practical thinking for better digital systems.
                </h1>
              </Reveal>
              <Reveal immediate delay={0.12}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
                  Clear guidance on planning, building and maintaining software, websites and operational platforms.
                </p>
              </Reveal>
            </div>
            <Reveal immediate delay={0.1}>
              <InsightsHeroVisual />
            </Reveal>
          </div>
        </Container>
      </section>

      {featured && (
        <Section tone="paper">
          <FeaturedInsight insight={featured} />
        </Section>
      )}

      <Section tone="elevated">
        <Eyebrow>Latest insights</Eyebrow>
        <h2 className="text-display-3 mt-2 text-paper-foreground">More from Kipeo Digital.</h2>
        <div className="mt-8">
          <InsightsGrid insights={latest} categories={categories} />
        </div>
      </Section>

      <Section tone="paper">
        <InsightsUpdatePrompt />
      </Section>

      <section className="bg-grid-ink relative overflow-hidden bg-ink py-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,color-mix(in_srgb,var(--color-teal)_14%,transparent),transparent)]"
        />
        <Container className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-display-1 text-ink-foreground">Have a system in mind?</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-lg text-ink-muted">
              See how Kipeo approaches software, business systems, websites and operational platforms.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/services" variant="accent" size="lg" tone="ink">
                Explore services
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/contact" variant="outline" size="lg" tone="ink">
                Start a project
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
