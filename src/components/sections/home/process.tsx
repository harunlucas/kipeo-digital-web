import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ProcessRoute } from "@/components/motion/process-route";
import { processStages } from "@/content/process";

export function Process() {
  return (
    <Section tone="paper">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display-2 mt-4 text-paper-foreground">
            From first conversation to a system ready for use.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-3 text-base text-slate sm:text-lg">
            Every engagement follows a visible process, with decisions, deliverables and responsibilities
            agreed at each stage.
          </p>
        </Reveal>
      </div>

      <div className="mt-10">
        <ProcessRoute stages={processStages} />
      </div>
    </Section>
  );
}
