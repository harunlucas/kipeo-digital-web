import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { WorkHeroVisual } from "@/components/motion/work-hero-visual";
import { AttributionLegend } from "@/components/sections/work/attribution-legend";
import { WorkExplorer } from "@/components/sections/work/work-explorer";
import { featuredWork, capabilityPaths } from "@/content/selected-work";
import { relatedWebsites, attributionLegend, heroCollageImages } from "@/content/work";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Selected work from Kipeo Digital, clearly attributed: live projects, collaborative work, internal products and capability areas.",
  alternates: { canonical: "/work" },
});

const hseSpotlightPath = capabilityPaths.find((path) => path.id === "systems")!;
const capabilityPanels = capabilityPaths.filter((path) => path.id === "engineering" || path.id === "commerce");

export default function WorkPage() {
  return (
    <>
      <section className="bg-grid-paper relative overflow-hidden bg-paper pb-10 pt-10 sm:pb-12 sm:pt-12">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,var(--color-teal-tint),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div>
              <Reveal immediate>
                <Eyebrow>Work</Eyebrow>
              </Reveal>
              <Reveal immediate delay={0.06}>
                <h1 className="text-display-1 mt-6 text-paper-foreground">Selected work, clearly attributed.</h1>
              </Reveal>
              <Reveal immediate delay={0.12}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-slate">
                  Explore live projects, collaborative work, internal products and capability areas connected to
                  the team behind Kipeo Digital.
                </p>
              </Reveal>
            </div>
            <Reveal immediate delay={0.1}>
              <div className="mx-auto lg:ml-auto lg:mr-0">
                <WorkHeroVisual images={heroCollageImages} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section tone="paper" className="py-6 sm:py-8">
        <Reveal>
          <AttributionLegend items={attributionLegend} />
        </Reveal>
      </Section>

      <WorkExplorer
        featured={featuredWork}
        relatedWebsites={relatedWebsites}
        hseSpotlightPath={hseSpotlightPath}
        capabilityPanels={capabilityPanels}
      />

      <Section tone="ink" className="bg-grid-ink relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,color-mix(in_srgb,var(--color-teal)_14%,transparent),transparent)]"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-display-1 text-ink-foreground">Have a project that belongs here?</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-lg text-ink-muted">
              Tell us what needs to be built, improved or connected. We&apos;ll review the problem and propose a
              practical next step.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="accent" size="lg" tone="ink">
                Start a project
              </Button>
              <Button href="/services" variant="outline" size="lg" tone="ink">
                Explore services
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
