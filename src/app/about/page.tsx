import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { AboutLayersVisual } from "@/components/motion/about-layers-visual";
import { AboutLifecycleVisual } from "@/components/motion/about-lifecycle-visual";
import { AboutProblemSystemVisual } from "@/components/motion/about-problem-system-visual";
import { AboutCollaborationVisual } from "@/components/motion/about-collaboration-visual";
import { AboutTimezoneVisual } from "@/components/motion/about-timezone-visual";
import { AboutPrinciples } from "@/components/sections/about/about-principles";
import { whatKipeoIsCapabilities, collaborationPractices } from "@/content/about";
import { buildMetadata } from "@/lib/metadata";
import { organizationSchema, aboutPageSchema } from "@/lib/schema";

const title = "About Kipeo Digital | Software and Digital Product Studio";
const description =
  "Learn how Kipeo Digital approaches custom software, business systems, websites, integrations and supported digital products from Nairobi for clients worldwide.";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  keywords: ["about Kipeo Digital", "software studio Nairobi", "digital product studio", "custom software team"],
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title, description },
  twitter: { title, description },
});

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema()) }} />

      {/* Hero */}
      <section className="bg-grid-paper relative overflow-hidden bg-paper pb-10 pt-12 sm:pb-12 sm:pt-14">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,var(--color-teal-tint),transparent)]"
        />
        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div>
              <Reveal immediate>
                <Eyebrow>About Kipeo</Eyebrow>
              </Reveal>
              <Reveal immediate delay={0.06}>
                <h1 className="text-display-1 mt-5 text-paper-foreground">
                  A software studio shaped around how work actually happens.
                </h1>
              </Reveal>
              <Reveal immediate delay={0.12}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
                  Kipeo Digital designs and builds practical software, websites and connected systems for
                  organisations that need clearer, more reliable ways to operate and grow.
                </p>
              </Reveal>
              <Reveal immediate delay={0.18}>
                <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                  <Button href="/work" variant="primary" size="lg">
                    Explore our work
                  </Button>
                  <Button href="/contact" variant="outline" size="lg">
                    Start a project
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal immediate delay={0.1}>
              <AboutLayersVisual />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What Kipeo is */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <Eyebrow>What we are</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-display-2 mt-4 text-paper-foreground">
                Digital products built as complete working systems.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-slate sm:text-lg">
                Kipeo is an independent, team-led software and digital-product studio. The work may begin with a
                website, an internal workflow, a disconnected set of tools or an idea for a new platform. The
                objective is not simply to deliver an interface, but to create a useful system that can be
                understood, managed and supported after launch.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 text-sm font-medium uppercase tracking-wide text-slate-muted">
                Kipeo works across the full product, not the frontend alone:
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-2">
                {whatKipeoIsCapabilities.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-strong" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <AboutLifecycleVisual />
          </Reveal>
        </div>
      </Section>

      {/* Why Kipeo exists */}
      <Section tone="elevated">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <Reveal delay={0.1} className="lg:order-2">
            <AboutProblemSystemVisual />
          </Reveal>
          <div className="lg:order-1">
            <Reveal>
              <Eyebrow>Why Kipeo</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-display-2 mt-4 text-paper-foreground">
                Because the difficult part is rarely the screen alone.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-slate sm:text-lg">
                Many of the problems Kipeo is asked to solve don&apos;t start with a screen. They start earlier —
                in processes spread across spreadsheets, information being entered repeatedly, tools that don&apos;t
                communicate, websites that are difficult to manage, operational records that are difficult to
                retrieve, or systems that were launched without practical support behind them.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 text-base font-medium leading-relaxed text-paper-foreground sm:text-lg">
                Kipeo exists to turn those disconnected parts into clearer digital products, workflows and
                platforms.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-4 text-sm leading-relaxed text-slate-muted">
                These are the kinds of problems the studio is built to address — not a claim that every one of
                them has already been solved for every client.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* What guides the work */}
      <Section tone="paper">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Our principles</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display-2 mt-4 text-paper-foreground">
              Clear decisions before complicated development.
            </h2>
          </Reveal>
        </div>
        <div className="mt-10">
          <AboutPrinciples />
        </div>
      </Section>

      {/* Team-led delivery model */}
      <Section tone="ink" className="bg-grid-ink relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,color-mix(in_srgb,var(--color-teal)_12%,transparent),transparent)]"
        />
        <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <Eyebrow tone="ink">How the studio operates</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-display-2 mt-4 text-ink-foreground">The right capability around each project.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                Kipeo is team-led, and organises capability around the needs of each engagement — product and
                requirements thinking, interface and experience design, frontend engineering, backend and data
                development, integration and deployment, specialist operational knowledge, and content or
                platform support where a project calls for it.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                Kipeo remains the primary client-engagement and delivery platform. Responsibilities are defined
                around the project rather than presented as a single person doing every discipline.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted/80">
                Some specialist software work may draw on operational experience connected to members of the
                wider Kipeo team.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <AboutCollaborationVisual />
          </Reveal>
        </div>
      </Section>

      {/* Location and collaboration */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <Eyebrow>Working together</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-display-2 mt-4 text-paper-foreground">
                Based in Nairobi. Structured for worldwide collaboration.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-slate sm:text-lg">
                Kipeo Digital is based in Nairobi, Kenya and works remotely with clients across different
                locations and time zones — working remotely worldwide, structured so distance doesn&apos;t
                become friction.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {collaborationPractices.map((practice) => (
                  <li key={practice} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-strong" aria-hidden />
                    {practice}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <AboutTimezoneVisual />
          </Reveal>
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-grid-ink relative overflow-hidden bg-ink py-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,color-mix(in_srgb,var(--color-teal)_14%,transparent),transparent)]"
        />
        <Container className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-display-1 text-ink-foreground">Bring us the problem, not a finished specification.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-lg text-ink-muted">
              You can contact Kipeo with an early idea, an existing system or a workflow that needs improvement.
              We&apos;ll help clarify the practical next step.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="accent" size="lg" tone="ink">
                Start a project
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/services" variant="outline" size="lg" tone="ink">
                Explore services
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
