import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { WorkExplorer } from "@/components/sections/work/work-explorer";
import { featuredWork, capabilityPaths } from "@/content/selected-work";
import { relatedWebsites } from "@/content/work";
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
      <section className="bg-grid-paper relative overflow-hidden bg-paper pb-10 pt-12 sm:pb-14 sm:pt-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,var(--color-teal-tint),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Reveal immediate>
              <Eyebrow>Work</Eyebrow>
            </Reveal>
            <Reveal immediate delay={0.06}>
              <h1 className="text-display-1 mt-6 text-paper-foreground">Selected work, clearly attributed.</h1>
            </Reveal>
            <Reveal immediate delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
                Explore live projects, collaborative work, internal products and capability areas connected to
                the team behind Kipeo Digital.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <WorkExplorer
          featured={featuredWork}
          relatedWebsites={relatedWebsites}
          hseSpotlightPath={hseSpotlightPath}
          capabilityPanels={capabilityPanels}
        />
      </Section>

      <Section tone="ink" className="bg-grid-ink">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-lg">
            <h2 className="text-display-3 text-ink-foreground">Have a project that belongs here?</h2>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/contact" variant="accent" size="lg" tone="ink">
              Start a project
            </Button>
            <Button href="/services" variant="outline" size="lg" tone="ink">
              Explore services
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
