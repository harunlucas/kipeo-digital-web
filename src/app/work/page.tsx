import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { AnimatedLink } from "@/components/sections/home/animated-link";
import { WorkEntry } from "@/components/sections/work/work-entry";
import { indexedCaseStudies } from "@/content/case-studies";
import { siteConfig } from "@/content/site-config";
import { buildMetadata } from "@/lib/metadata";

const title = "Selected Work | Kipeo Digital";
const description =
  "Real projects from the team behind Kipeo Digital: BushLite WiFi hotspot management, the SafetyOS corrective-action workflow and a Python CNC learning system, each with who built what.";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  keywords: [
    "software development portfolio",
    "hotspot management system",
    "HSE software",
    "corrective action tracking",
    "engineering education software",
    "custom software Nairobi",
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

/**
 * The Work index: one featured project in the first screen, a short list of
 * further documented work, and a closing invitation. Projects, copy and
 * media all come from `src/content/case-studies.ts` (`listing` entries).
 */
export default function WorkPage() {
  const [feature, ...rest] = indexedCaseStudies;

  return (
    <div className="bg-ivory">
      <section aria-labelledby="work-title" className="pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-10">
        <Container>
          <h1 id="work-title" className="section-headline">
            <span className="font-display font-semibold text-paper-foreground">Selected</span>{" "}
            <span className="font-serif-display italic text-teal-strong">work</span>
          </h1>

          {feature ? (
            <div className="mt-7 sm:mt-8">
              <WorkEntry study={feature} variant="feature" />
            </div>
          ) : null}
        </Container>
      </section>

      {rest.length > 0 ? (
        <section aria-labelledby="more-work" className="pb-20 sm:pb-24">
          <Container>
            <h2
              id="more-work"
              className="border-t border-neutral-300 pt-6 text-sm font-medium text-slate-muted"
            >
              More documented work
            </h2>
            <div className="mt-8 sm:mt-10">
              {rest.map((study, index) => (
                <div
                  key={study.slug}
                  className={index > 0 ? "mt-14 border-t border-neutral-300/70 pt-14 sm:mt-16 sm:pt-16" : undefined}
                >
                  <WorkEntry study={study} variant="row" />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section aria-labelledby="work-next" className="border-t border-neutral-300 pb-24 pt-16 sm:pb-28 sm:pt-20">
        <Container>
          <div className="max-w-2xl">
            <h2 id="work-next" className="section-headline">
              <span className="font-display font-semibold text-paper-foreground">Have a system like these</span>{" "}
              <span className="font-serif-display italic text-teal-strong">in mind?</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
              Tell us who will use it and what they need to get done. We’ll help you shape a practical first
              version.
            </p>
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <Button href="/contact" variant="primary" size="lg">
                Start a project
              </Button>
              <AnimatedLink href="/services">Explore services</AnimatedLink>
            </div>
            <p className="mt-8 text-sm text-slate-muted">
              Or email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-paper-foreground underline decoration-paper-foreground/30 underline-offset-4 transition-colors hover:text-teal-strong hover:decoration-teal-strong/50"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
