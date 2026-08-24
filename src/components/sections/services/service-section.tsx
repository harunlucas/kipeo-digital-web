import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { BrowserFrame } from "@/components/motion/capability-path-card";
import type { ServiceSection as ServiceSectionData } from "@/content/services-page";

const toneClasses = {
  paper: "bg-paper text-paper-foreground",
  ink: "bg-ink text-ink-foreground",
  elevated: "bg-paper-elevated text-paper-foreground",
} as const;

function FactBlock({
  label,
  text,
  tone,
}: {
  label: string;
  text: string;
  tone: ServiceSectionData["tone"];
}) {
  return (
    <div>
      <p className={`font-mono text-[10px] uppercase tracking-wide ${tone === "ink" ? "text-teal" : "text-slate-muted"}`}>
        {label}
      </p>
      <p className={`mt-1.5 text-sm leading-relaxed ${tone === "ink" ? "text-ink-muted" : "text-slate"}`}>{text}</p>
    </div>
  );
}

function SectionVisual({ section }: { section: ServiceSectionData }) {
  const { visual } = section;

  if (visual.kind === "screenshots") {
    return (
      <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-panel">
        <div className="relative aspect-[4/3] bg-ink sm:aspect-[16/11]">
          <BrowserFrame>
            <div className="absolute inset-0 grid grid-cols-2 gap-px bg-ink-elevated">
              {visual.items.map((item) => (
                <div key={item.src} className="relative overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, 45vw"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </BrowserFrame>
        </div>
        <p className="bg-ink-elevated px-4 py-2 text-xs text-ink-muted">{visual.attribution}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl border border-neutral-200/40 shadow-panel">
        <div className="relative aspect-[4/3] sm:aspect-[16/11]">
          <Image src={visual.src} alt={visual.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
        </div>
        <a
          href={visual.creditHref}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-ink-elevated px-4 py-2 text-xs text-ink-muted hover:text-ink-foreground"
        >
          {visual.credit} (Pexels) — representative photo, not a Kipeo Digital project
        </a>
      </div>
      {visual.secondary && (
        <div>
          {visual.secondaryLabel && (
            <p className="mb-2 font-mono text-[10px] uppercase tracking-wide text-slate-muted">{visual.secondaryLabel}</p>
          )}
          <div className="grid grid-cols-2 gap-3">
            {visual.secondary.map((item) => (
              <div key={item.src} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200/30">
                <Image src={item.src} alt={item.alt} fill sizes="20vw" className="object-cover object-top" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ServiceSection({ section }: { section: ServiceSectionData }) {
  const isInk = section.tone === "ink";
  const imageFirst = section.imageSide === "left";

  return (
    <section id={section.id} className={`scroll-mt-[140px] py-14 sm:py-20 ${toneClasses[section.tone]}`}>
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className={imageFirst ? "lg:order-2" : undefined}>
            <Reveal>
              <span className={`font-mono text-xs ${isInk ? "text-teal" : "text-teal-strong"}`}>{section.number}</span>
              <Eyebrow tone={isInk ? "ink" : "paper"} className="mt-1 inline-block">
                {section.eyebrow}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className={`text-display-2 mt-4 ${isInk ? "text-ink-foreground" : "text-paper-foreground"}`}>
                {section.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className={`mt-4 text-base leading-relaxed sm:text-lg ${isInk ? "text-ink-muted" : "text-slate"}`}>
                {section.intro}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {section.includes.map((item) => (
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

            {section.disclosure && (
              <Reveal delay={0.16}>
                <p
                  className={`mt-5 rounded-xl border px-4 py-3 text-sm leading-relaxed ${
                    isInk ? "border-highlight/30 bg-highlight/10 text-ink-foreground/90" : "border-highlight/30 bg-highlight/5 text-slate"
                  }`}
                >
                  {section.disclosure}
                </p>
              </Reveal>
            )}

            <Reveal delay={0.18}>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <FactBlock label="Suited to" text={section.suitableFor} tone={section.tone} />
                <FactBlock label="What you get" text={section.deliverables} tone={section.tone} />
                <FactBlock label="How it works" text={section.howItWorks} tone={section.tone} />
                <FactBlock label="Investment factors" text={section.investmentNote} tone={section.tone} />
              </div>
            </Reveal>

            {section.confirmedTechnologies && (
              <Reveal delay={0.2}>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {section.confirmedTechnologies.map((tech) => (
                    <li
                      key={tech}
                      className={`rounded-full px-3 py-1 text-xs ${isInk ? "bg-teal/10 text-teal" : "bg-teal-tint text-teal-strong"}`}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button href="/contact" variant={isInk ? "accent" : "primary"} tone={section.tone === "ink" ? "ink" : "paper"}>
                  Start a project
                </Button>
                <Link
                  href={section.workLink.href}
                  className={`group/cta inline-flex min-h-11 items-center gap-1.5 text-sm font-medium ${
                    isInk ? "text-teal hover:text-white" : "text-teal-strong hover:text-ink"
                  }`}
                >
                  {section.workLink.label}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                    aria-hidden
                  />
                </Link>
              </div>
            </Reveal>

            {section.secondaryExpertiseLink && (
              <Reveal delay={0.28}>
                <div className={`mt-5 border-t pt-4 ${isInk ? "border-white/10" : "border-neutral-200"}`}>
                  <a
                    href={section.secondaryExpertiseLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-11 items-center gap-1.5 text-sm font-medium ${
                      isInk ? "text-ink-muted hover:text-ink-foreground" : "text-slate hover:text-paper-foreground"
                    }`}
                  >
                    {section.secondaryExpertiseLink.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    <span className="sr-only">(opens {section.secondaryExpertiseLink.sourceName} in a new tab)</span>
                  </a>
                </div>
              </Reveal>
            )}
          </div>

          <div className={imageFirst ? "lg:order-1" : undefined}>
            <Reveal delay={0.12}>
              <SectionVisual section={section} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
