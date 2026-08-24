import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TrustPath } from "@/components/motion/trust-path";
import { trustCommitments } from "@/content/trust";

export function TrustStrip() {
  return (
    <Section tone="ink" className="py-10 sm:py-14">
      <div className="max-w-xl">
        <Reveal immediate>
          <Eyebrow tone="ink">How we deliver</Eyebrow>
        </Reveal>
        <Reveal immediate delay={0.06}>
          <h2 className="text-display-3 mt-3 text-ink-foreground">
            One connected path from scope to support.
          </h2>
        </Reveal>
      </div>

      <div className="mt-8">
        <TrustPath
          items={trustCommitments.map((commitment) => ({
            title: commitment.title,
            description: commitment.description,
            icon: <commitment.icon className="h-5 w-5" aria-hidden />,
          }))}
        />
      </div>
    </Section>
  );
}
