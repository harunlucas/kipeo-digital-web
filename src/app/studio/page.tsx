import type { Metadata } from "next";
import { ArrowUpRight, Cpu, Database, Globe2, Server, Share2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { StudioTeaserVisual } from "@/components/motion/studio-teaser-visual";
import { StudioWorkspace } from "@/components/motion/studio-workspace";
import { StudioJourney } from "@/components/motion/studio-journey";
import { ServiceTabs } from "@/components/motion/service-tabs";
import { TrustPath } from "@/components/motion/trust-path";
import {
  studioWorkspaceHotspots,
  studioJourneyStages,
  studioLayers,
  studioCapabilitySelector,
  type StudioLayer,
} from "@/content/studio";
import { trustCommitments } from "@/content/trust";
import { buildMetadata } from "@/lib/metadata";

const studioTitle = "Kipeo Studio";
const studioDescription =
  "A guided look inside how Kipeo Digital builds: strategy, interfaces, application logic, data, HSE and operational workflows, integrations, deployment and support.";

export const metadata: Metadata = buildMetadata({
  title: studioTitle,
  description: studioDescription,
  alternates: { canonical: "/studio" },
  openGraph: { url: "/studio", title: studioTitle, description: studioDescription },
  twitter: { title: studioTitle, description: studioDescription },
});

const layerIcons: Record<StudioLayer["id"], LucideIcon> = {
  frontend: Globe2,
  backend: Cpu,
  data: Database,
  integrations: Share2,
  infrastructure: Server,
};

export default function StudioPage() {
  return (
    <>
      <section className="bg-grid-paper relative overflow-hidden bg-paper pb-10 pt-12 sm:pb-14 sm:pt-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,var(--color-teal-tint),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
            <div>
              <Reveal immediate>
                <Eyebrow>Inside Kipeo</Eyebrow>
              </Reveal>
              <Reveal immediate delay={0.06}>
                <h1 className="text-display-1 mt-6 text-paper-foreground">
                  One studio. Every layer of the product.
                </h1>
              </Reveal>
              <Reveal immediate delay={0.12}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
                  Kipeo handles strategy, interfaces, application logic, data, HSE and operational workflows,
                  integrations, deployment and support — not the frontend alone. This is a guided look at how
                  those pieces connect into one build.
                </p>
              </Reveal>
            </div>
            <Reveal immediate delay={0.1}>
              <StudioTeaserVisual
                src="/images/projects/studio/kipeo-studio-workstation.webp"
                alt="Illustration of a Kipeo workstation with connected screens showing interface, application, HSE and integration panels"
                priority
              />
            </Reveal>
          </div>
        </div>
      </section>

      <Section tone="ink" className="bg-grid-ink relative overflow-hidden">
        <div
          aria-hidden
          className="animate-spotlight pointer-events-none absolute -top-32 left-1/2 h-80 w-[34rem] -translate-x-1/2 rounded-full bg-teal/10 blur-[110px]"
        />
        <div className="relative max-w-2xl">
          <Reveal>
            <Eyebrow tone="ink">The workspace</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display-2 mt-4 text-ink-foreground">Six areas, one connected build.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3 text-base text-ink-muted sm:text-lg">
              Select a numbered point on the studio below for a concise explanation of what that part of the
              build covers.
            </p>
          </Reveal>
        </div>

        <p className="sr-only">
          An isometric illustration of the Kipeo Studio workspace, divided into six areas: strategy and
          definition, interface and experience, applications and data, operational systems, integrations and
          automation, and deployment and support. Six numbered buttons over the illustration reveal a concise
          description of each area, so the illustration does not need to be seen to understand what it
          represents.
        </p>

        <div className="relative mt-8">
          <Reveal delay={0.16}>
            <StudioWorkspace
              hotspots={studioWorkspaceHotspots}
              src="/images/projects/studio/kipeo-studio-isometric.webp"
              alt="Isometric illustration of the full Kipeo Studio workspace, spanning strategy, interface, applications, operations, integrations and deployment"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="paper">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Project journey</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display-2 mt-4 text-paper-foreground">From first conversation to support.</h2>
          </Reveal>
        </div>
        <div className="mt-10">
          <Reveal delay={0.1}>
            <StudioJourney stages={studioJourneyStages} />
          </Reveal>
        </div>
      </Section>

      <Section tone="elevated">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Behind the interface</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display-2 mt-4 text-paper-foreground">
              What holds up what people actually see.
            </h2>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {studioLayers.map((layer, index) => {
            const Icon = layerIcons[layer.id];
            return (
              <Reveal key={layer.id} delay={index * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-paper p-5 shadow-card">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mist text-slate">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-paper-foreground">{layer.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{layer.description}</p>
                  {layer.confirmedTechnologies && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {layer.confirmedTechnologies.map((tech) => (
                        <li key={tech} className="rounded-full bg-mist px-2.5 py-1 text-[11px] text-slate">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="paper">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Choose where to start</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display-2 mt-4 text-paper-foreground">Every build starts somewhere specific.</h2>
          </Reveal>
        </div>
        <div className="mt-10">
          <Reveal delay={0.1}>
            <ServiceTabs
              items={studioCapabilitySelector.map((pillar) => ({
                id: pillar.id,
                title: pillar.title,
                problem: pillar.problem,
                subservices: pillar.subservices,
                icon: <pillar.icon className="h-5 w-5" aria-hidden />,
              }))}
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="ink" className="py-10 sm:py-14">
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow tone="ink">Collaboration model</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display-3 mt-3 text-ink-foreground">One team, one connected process.</h2>
          </Reveal>
        </div>
        <div className="mt-8">
          <Reveal delay={0.1}>
            <TrustPath
              items={trustCommitments.map((commitment) => ({
                title: commitment.title,
                description: commitment.description,
                icon: <commitment.icon className="h-5 w-5" aria-hidden />,
              }))}
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="ink" className="bg-grid-ink relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,color-mix(in_srgb,var(--color-teal)_14%,transparent),transparent)]"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-display-1 text-ink-foreground">Bring a real problem into the studio.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="accent" size="lg" tone="ink">
                Start a project
              </Button>
              <Button href="/work" variant="outline" size="lg" tone="ink">
                Explore our work
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
