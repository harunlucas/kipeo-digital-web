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
            From first enquiry to a supported launch.
          </h2>
        </Reveal>
      </div>

      <div className="mt-14">
        <ProcessRoute stages={processStages} />
      </div>
    </Section>
  );
}
