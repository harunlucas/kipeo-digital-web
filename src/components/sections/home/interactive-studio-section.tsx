import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { StudioTeaserVisual } from "@/components/motion/studio-teaser-visual";

const highlights = ["Design and experience", "Systems and integrations", "Deployment and support"];

export function InteractiveStudioSection() {
  return (
    <Section tone="ink" className="bg-grid-ink relative overflow-hidden">
      <div
        aria-hidden
        className="animate-spotlight pointer-events-none absolute -top-32 left-1/2 h-80 w-[34rem] -translate-x-1/2 rounded-full bg-teal/10 blur-[110px]"
      />

      {/*
        Mobile: single column, DOM order = copy, image, cta (matches the
        brief's required stacking order exactly). Desktop (lg+): a 40/60
        copy/image grid, with the cta block repositioned under the copy via
        explicit grid placement rather than duplicated markup.
      */}
      <div className="relative grid gap-8 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-12">
        <div className="lg:col-start-1 lg:row-start-1">
          <Reveal>
            <Eyebrow tone="ink">Kipeo Studio</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display-2 mt-4 text-ink-foreground">Step inside how we build.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3 max-w-md text-base text-ink-muted sm:text-lg">
              Explore a connected digital workspace where design, software, operational systems, integrations
              and deployment come together.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-1.5 text-sm text-ink-muted">
              {highlights.map((item, index) => (
                <li key={item} className="flex items-center gap-2">
                  {item}
                  {index < highlights.length - 1 && <span aria-hidden className="text-ink-muted/50">&middot;</span>}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <Reveal delay={0.1}>
            <StudioTeaserVisual
              src="/images/projects/studio/kipeo-studio-isometric.webp"
              alt="Isometric illustration of the Kipeo Studio: a connected digital workspace spanning design, application development, operational systems, integrations and deployment"
            />
          </Reveal>
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <Reveal delay={0.22}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="/studio" variant="accent" size="lg">
                Enter the studio
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
              <a
                href="#process"
                className="inline-flex min-h-11 items-center text-sm font-medium text-ink-muted underline decoration-ink-muted/40 underline-offset-4 transition-colors hover:text-ink-foreground"
              >
                See how we work
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
