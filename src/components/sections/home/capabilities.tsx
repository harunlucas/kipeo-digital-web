import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { CapabilityArchitecture } from "@/components/motion/capability-architecture";
import { capabilities } from "@/content/capabilities";

export function Capabilities() {
  return (
    <Section tone="ink" className="bg-grid-ink relative overflow-hidden">
      <div
        aria-hidden
        className="animate-spotlight pointer-events-none absolute -top-40 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-teal/10 blur-[110px]"
      />

      <div className="relative max-w-2xl">
        <Reveal>
          <Eyebrow tone="ink">Full-service capability</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display-2 mt-4 text-ink-foreground">Strategy, software and support&mdash;connected.</h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-3 text-base text-ink-muted sm:text-lg">
            We bring together experience design, application development, integrations and ongoing
            operation so the finished system works as one product.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-10">
        <Reveal delay={0.2}>
          <CapabilityArchitecture items={capabilities} />
        </Reveal>
      </div>
    </Section>
  );
}
