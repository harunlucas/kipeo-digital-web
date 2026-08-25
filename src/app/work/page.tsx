import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { WorkSystemsLandscape } from "@/components/motion/work-systems-landscape";
import { PortfolioNavigator } from "@/components/sections/work/portfolio-navigator";
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
      <section className="relative overflow-hidden border-b border-neutral-200/70 bg-paper pb-10 pt-8 sm:pb-12 sm:pt-10 min-[900px]:flex min-[900px]:min-h-[500px] min-[900px]:flex-col min-[900px]:justify-center min-[900px]:py-8">
        <div aria-hidden className="bg-grid-paper absolute inset-0 opacity-50" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_82%_30%,var(--color-teal-tint),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_32%_36%_at_70%_62%,color-mix(in_srgb,var(--color-highlight)_9%,transparent),transparent)]"
        />
        <Container className="relative">
          <div className="grid items-center gap-10 min-[900px]:grid-cols-[48fr_52fr] min-[900px]:gap-14">
            <div>
              <Reveal immediate>
                <Eyebrow>Work</Eyebrow>
              </Reveal>
              <Reveal immediate delay={0.06}>
                <h1 className="max-w-[620px] font-display leading-[1.05] tracking-[-0.02em] text-paper-foreground [text-wrap:balance] text-[clamp(2.625rem,2.26rem+2.63vw,5rem)] mt-5">
                  Software work built for real operations.
                </h1>
              </Reveal>
              <Reveal immediate delay={0.12}>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-slate">
                  A verified live project, an internal product in active development and the software capabilities
                  Kipeo builds from.
                </p>
              </Reveal>
            </div>
            <Reveal immediate delay={0.1}>
              <WorkSystemsLandscape />
            </Reveal>
          </div>

          <Reveal immediate delay={0.2}>
            <div className="mt-9 min-[900px]:mt-8">
              <PortfolioNavigator anchors={workSectionAnchors} />
            </div>
          </Reveal>
        </Container>
      </section>

      <WorkExplorer
        featured={featuredWork}
        featuredSecondaryScreenshot={featuredSecondaryScreenshot}
        internalProduct={internalProduct}
        capabilityAreas={workCapabilityAreas}
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
