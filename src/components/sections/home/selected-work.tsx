import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { FeaturedProjectCard } from "@/components/motion/featured-project-card";
import { CapabilityPathCard } from "@/components/motion/capability-path-card";
import { featuredWork, capabilityPaths } from "@/content/selected-work";

export function SelectedWork() {
  return (
    <Section id="work" tone="paper">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Selected work and capabilities</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display-2 mt-4 text-paper-foreground">
            Digital work built for real operations.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-3 text-base text-slate sm:text-lg">
            From public-facing websites to internal operational systems, our work is shaped around what
            people need to manage, deliver and improve.
          </p>
        </Reveal>
      </div>

      <div className="mt-8">
        <FeaturedProjectCard work={featuredWork} />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {capabilityPaths.map((path, index) => (
          <CapabilityPathCard key={path.id} path={path} index={index} />
        ))}
      </div>
    </Section>
  );
}
