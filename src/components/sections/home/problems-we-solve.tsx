import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ProblemsShowcase } from "@/components/motion/problems-showcase";
import { problemPairs } from "@/content/problems";

export function ProblemsWeSolve() {
  return (
    <Section tone="elevated" className="py-14 sm:py-20">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Problems we solve</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display-2 mt-4 text-paper-foreground">
            The problem comes first.
            <br />
            The right solution follows.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-3 text-base text-slate sm:text-lg">
            We identify what is slowing the business down, then shape the website, system or workflow
            around it.
          </p>
        </Reveal>
      </div>

      <div className="mt-8 sm:mt-10">
        <Reveal delay={0.2}>
          <ProblemsShowcase items={problemPairs} />
        </Reveal>
      </div>
    </Section>
  );
}
