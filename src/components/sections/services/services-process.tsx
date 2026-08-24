import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ServiceProcessRail } from "@/components/motion/service-process-rail";
import { studioJourneyStages } from "@/content/studio";

export function ServicesProcess() {
  return (
    <Section id="process" tone="paper">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>How an engagement runs</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display-2 mt-4 text-paper-foreground">One process, whichever service you start with.</h2>
        </Reveal>
      </div>

      <div className="mt-10">
        <ServiceProcessRail stages={studioJourneyStages} />
      </div>

      <Reveal delay={0.1}>
        <Link
          href="/studio"
          className="group/cta mt-8 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-teal-strong hover:text-ink"
        >
          See the complete process at Kipeo Studio
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
            aria-hidden
          />
        </Link>
      </Reveal>
    </Section>
  );
}
