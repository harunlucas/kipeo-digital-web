import type { Metadata } from "next";
import { ArrowUpRight, Cpu, Database, Globe2, Server, Share2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Headline } from "@/components/ui/headline";
import { Reveal } from "@/components/motion/reveal";
import { StudioTeaserVisual } from "@/components/motion/studio-teaser-visual";
import { StudioWorkspace } from "@/components/motion/studio-workspace";
import { ServiceTabs } from "@/components/motion/service-tabs";
import {
  studioWorkspaceHotspots,
  studioJourneyStages,
  studioLayers,
  studioCapabilitySelector,
  type StudioLayer,
  type StudioJourneyStage,
} from "@/content/studio";
import { buildMetadata } from "@/lib/metadata";

const studioTitle = "How We Work";
const studioDescription =
  "How a Kipeo Digital project runs, stage by stage: what we do, what we'll need from you and what you get to review, from the first conversation to launch and support.";

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

const stageColumns: { key: keyof Pick<StudioJourneyStage, "kipeo" | "client" | "review">; label: string }[] = [
  { key: "kipeo", label: "What we do" },
  { key: "client", label: "What we need from you" },
  { key: "review", label: "What you review" },
];

/**
 * The detail behind the homepage's three-step summary: every stage, with
 * Kipeo's work, the client's part and the output to review side by side on
 * desktop, and in that reading order on phones.
 */
function StageList({ stages }: { stages: StudioJourneyStage[] }) {
  return (
    <ol className="mt-10">
      {stages.map((stage, index) => (
        <li
          key={stage.id}
          className="grid gap-5 border-t border-neutral-200 py-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-10"
        >
          <div>
            <p aria-hidden className="font-mono text-xs text-teal-strong">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1.5 font-display text-xl font-semibold text-paper-foreground">{stage.label}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-muted">{stage.summary}</p>
          </div>
          <dl className="grid gap-5 sm:grid-cols-3 sm:gap-6 lg:gap-8">
            {stageColumns.map((column) => (
              <div key={column.key}>
                <dt
                  className={`font-mono text-[0.6875rem] uppercase tracking-[0.16em] ${
                    column.key === "review" ? "text-teal-strong" : "text-slate-muted"
                  }`}
                >
                  {column.label}
                </dt>
                <dd
                  className={`mt-1.5 text-sm leading-relaxed sm:text-base ${
                    column.key === "review" ? "text-paper-foreground" : "text-slate"
                  }`}
                >
                  {stage[column.key]}
                </dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ol>
  );
}

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
                <Eyebrow>How we work</Eyebrow>
              </Reveal>
              <Reveal immediate delay={0.06}>
                <h1 className="hero-headline mt-5">
                  <Headline stacked lead="What we’ll need from you," accent="and what you’ll review" />
                </h1>
              </Reveal>
              <Reveal immediate delay={0.12}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
                  Every project moves through the same eight stages, from the first conversation to support after
                  launch. For each one, here&rsquo;s what we do, what we&rsquo;ll ask of you and what you get to see
                  before we move on.
                </p>
              </Reveal>
              <Reveal immediate delay={0.16}>
                <div className="mt-8">
                  <Button enquiry variant="primary" size="md">
                    Start a project
                  </Button>
                </div>
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

      <Section id="stages" tone="paper">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="section-headline">
              <Headline lead="What happens" accent="at each stage" />
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
              Work outside the agreed scope is quoted and approved before it&rsquo;s built, and after final payment you
              own the custom deliverables made for your project.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <StageList stages={studioJourneyStages} />
        </Reveal>
      </Section>

      <Section tone="ink" className="bg-grid-ink relative overflow-hidden">
        <div
          aria-hidden
          className="animate-spotlight pointer-events-none absolute -top-32 left-1/2 h-80 w-[34rem] -translate-x-1/2 rounded-full bg-teal/10 blur-[110px]"
        />
        <div className="relative max-w-2xl">
          <Reveal>
            <h2 className="section-headline">
              <Headline tone="ink" lead="Six areas," accent="one connected build" />
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-3 text-base text-ink-muted sm:text-lg">
              Select a numbered point to see what each area covers.
            </p>
          </Reveal>
        </div>

        <p className="sr-only">
          An isometric illustration of the Kipeo Studio workspace, divided into six areas: strategy and
          definition, interface and experience, applications and data, operational systems, integrations and
          automation, and deployment and support. Six numbered buttons over the illustration reveal a concise
          description of each area.
        </p>

        <div className="relative mt-8">
          <Reveal delay={0.1}>
            <StudioWorkspace
              hotspots={studioWorkspaceHotspots}
              src="/images/projects/studio/kipeo-studio-isometric.webp"
              alt="Isometric illustration of the full Kipeo Studio workspace, spanning strategy, interface, applications, operations, integrations and deployment"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="elevated">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="section-headline">
              <Headline lead="What holds up" accent="what people see" />
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
            <h2 className="section-headline">
              <Headline lead="Every build starts" accent="somewhere specific" />
            </h2>
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

      <Section tone="ink" className="bg-grid-ink relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,color-mix(in_srgb,var(--color-teal)_14%,transparent),transparent)]"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="section-headline">
              <Headline tone="ink" lead="Bring a real problem" accent="into the studio" />
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              The first consultation is free. Where the project is a good fit, a written proposal follows with no
              obligation to proceed.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button enquiry variant="accent" size="lg" tone="ink">
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
