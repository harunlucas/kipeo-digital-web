import { Compass } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { impactBuildConfig } from "@/content/impact-build";

/**
 * Compact, restrained — this must never outweigh the commercial sections
 * around it. No photography, no claim of past Impact Builds; a small
 * abstract geometric mark stands in for "practical digital impact."
 */
export function ImpactBuildTeaser() {
  const isOpen = impactBuildConfig.status === "open";

  return (
    <Section tone="elevated">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.6fr] lg:gap-14">
        <div>
          <Reveal>
            <Eyebrow>Kipeo Impact Build</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display-3 mt-4 text-paper-foreground">
              One useful digital project, built to support meaningful work.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate sm:text-base">
              Each year, Kipeo may select one eligible organisation or purpose-led initiative for a clearly scoped
              digital project with the development fee waived.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/impact-build" variant="outline" size="md">
                Learn about the initiative
              </Button>
              {isOpen && (
                <Button href="/impact-build/apply" variant="accent" size="md">
                  Apply for the Impact Build
                </Button>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="hidden lg:block">
          <div
            aria-hidden
            className="relative flex aspect-square items-center justify-center rounded-2xl border border-neutral-200 bg-paper"
          >
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_60%_60%_at_50%_30%,var(--color-teal-tint),transparent)]"
            />
            <Compass className="relative h-12 w-12 text-teal-strong" strokeWidth={1.5} aria-hidden />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
