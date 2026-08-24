import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ServiceGroupVisual } from "@/components/motion/service-group-visual";
import type { ExpertiseLink as ExpertiseLinkData, ServiceGroup } from "@/content/services-page";

const toneClasses = {
  paper: "bg-paper text-paper-foreground",
  ink: "bg-ink text-ink-foreground",
  elevated: "bg-paper-elevated text-paper-foreground",
} as const;

function ExpertiseLink({ expertise, isInk }: { expertise: ExpertiseLinkData; isInk: boolean }) {
  return (
    <a
      href={expertise.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/link inline-flex min-h-11 items-center gap-1.5 text-xs font-medium ${
        isInk ? "text-ink-muted hover:text-ink-foreground" : "text-slate hover:text-paper-foreground"
      }`}
    >
      {expertise.linkLabel}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      <span className="sr-only">(opens {expertise.sourceName} in a new tab)</span>
    </a>
  );
}

export function ServiceSection({ group }: { group: ServiceGroup }) {
  const isInk = group.tone === "ink";
  const imageFirst = group.imageSide === "left";

  return (
    <section id={group.id} className={`scroll-mt-[140px] py-14 sm:py-20 ${toneClasses[group.tone]}`}>
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className={imageFirst ? "lg:order-2" : undefined}>
            <Reveal>
              <span className={`font-mono text-xs ${isInk ? "text-teal" : "text-teal-strong"}`}>{group.number}</span>
              <Eyebrow tone={isInk ? "ink" : "paper"} className="mt-1 block">
                {group.eyebrow}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className={`text-display-2 mt-4 ${isInk ? "text-ink-foreground" : "text-paper-foreground"}`}>
                {group.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className={`mt-4 text-base leading-relaxed sm:text-lg ${isInk ? "text-ink-muted" : "text-slate"}`}>
                {group.intro}
              </p>
            </Reveal>

            {group.servicesIncluded.length > 0 && (
              <Reveal delay={0.14}>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {group.servicesIncluded.map((item) => (
                    <li
                      key={item}
                      className={`rounded-full px-2.5 py-1 text-[11px] ${
                        isInk ? "border border-white/10 bg-white/5 text-ink-foreground/85" : "bg-mist text-slate"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {group.subsections && (
              <Reveal delay={0.14}>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {group.subsections.map((sub) => (
                    <div
                      key={sub.label}
                      className={`rounded-xl border p-4 ${isInk ? "border-white/10 bg-white/5" : "border-neutral-200 bg-paper"}`}
                    >
                      <p className={`text-sm font-semibold ${isInk ? "text-ink-foreground" : "text-paper-foreground"}`}>
                        {sub.label}
                      </p>
                      <p className={`mt-1.5 text-xs leading-relaxed ${isInk ? "text-ink-muted" : "text-slate"}`}>
                        {sub.description}
                      </p>
                      <div className="mt-3">
                        <ExpertiseLink expertise={sub.relatedExpertise} isInk={isInk} />
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.18}>
              <ul className="mt-6 flex flex-col gap-2">
                {group.typicalOutcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className={`mt-0.5 h-4 w-4 shrink-0 ${isInk ? "text-teal" : "text-teal-strong"}`}
                      aria-hidden
                    />
                    <span className={`text-sm leading-relaxed ${isInk ? "text-ink-muted" : "text-slate"}`}>{outcome}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.22}>
              <details className="group mt-6">
                <summary
                  className={`inline-flex min-h-11 cursor-pointer list-none items-center text-xs font-medium uppercase tracking-wide ${
                    isInk ? "text-ink-muted hover:text-ink-foreground" : "text-slate-muted hover:text-paper-foreground"
                  }`}
                >
                  More about this group
                </summary>
                <p className={`mt-2 max-w-lg text-sm leading-relaxed ${isInk ? "text-ink-muted" : "text-slate"}`}>
                  {group.expandableDetails}
                </p>
              </details>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button href="/contact" variant={isInk ? "accent" : "primary"} tone={group.tone === "ink" ? "ink" : "paper"}>
                  Start a project
                </Button>
                <Link
                  href={group.workLink.href}
                  className={`group/cta inline-flex min-h-11 items-center gap-1.5 text-sm font-medium ${
                    isInk ? "text-teal hover:text-white" : "text-teal-strong hover:text-ink"
                  }`}
                >
                  {group.workLink.label}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className={imageFirst ? "lg:order-1" : undefined}>
            <Reveal delay={0.12}>
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl border shadow-panel sm:aspect-[16/11] ${
                  isInk ? "border-ink-elevated bg-ink" : "border-neutral-200 bg-ink"
                }`}
              >
                <div aria-hidden className="bg-grid-ink pointer-events-none absolute inset-0 opacity-40" />
                <ServiceGroupVisual variant={group.visual} />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
