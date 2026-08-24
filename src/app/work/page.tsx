import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { WorkIndexVisual } from "@/components/motion/work-index-visual";
import { WorkExplorer } from "@/components/sections/work/work-explorer";
import { featuredWork } from "@/content/selected-work";
import { featuredSecondaryScreenshot, internalProduct, workCapabilityAreas, workSectionAnchors } from "@/content/work";
import { buildMetadata } from "@/lib/metadata";

const title = "Software Projects and Capabilities | Kipeo Digital";
const description =
  "Explore verified systems work, internal software products and the digital capabilities Kipeo Digital uses to build practical business platforms.";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  keywords: [
    "software development portfolio",
    "business systems",
    "HSE software",
    "engineering software",
    "web application development",
    "systems integration",
  ],
  alternates: { canonical: "/work" },
  openGraph: {
    url: "/work",
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
});

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
                <h1 className="text-display-1 mt-6 text-paper-foreground">Software work, built for real operations.</h1>
              </Reveal>
              <Reveal immediate delay={0.12}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-slate">
                  A verified live project, an internal product in active development, and the capability areas
                  Kipeo builds from.
                </p>
              </Reveal>
            </div>
            <Reveal immediate delay={0.1}>
              <div className="mx-auto lg:ml-auto lg:mr-0">
                <WorkIndexVisual />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <WorkExplorer
        featured={featuredWork}
        featuredSecondaryScreenshot={featuredSecondaryScreenshot}
        internalProduct={internalProduct}
        capabilityAreas={workCapabilityAreas}
        sectionAnchors={workSectionAnchors}
      />

      <Section tone="ink" className="bg-grid-ink relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,color-mix(in_srgb,var(--color-teal)_14%,transparent),transparent)]"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-display-1 text-ink-foreground">Have a system that needs building?</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-lg text-ink-muted">
              Tell us what needs to work, connect or improve. We&apos;ll help define a practical way forward.
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
