import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ProblemsShowcase } from "@/components/motion/problems-showcase";
import { problemPairs } from "@/content/problems";

export function ProblemsWeSolve() {
  return (
    <Section tone="elevated">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Problems we solve</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display-2 mt-4 text-paper-foreground">
            Recognise the situation before the service name.
          </h2>
        </Reveal>
      </div>

      <div className="mt-10">
        <Reveal delay={0.16}>
          <ProblemsShowcase items={problemPairs} />
        </Reveal>
      </div>
    </Section>
  );
}
