import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { SystemCard } from "@/components/motion/system-card";
import { systemTypes } from "@/content/systems";

export function SystemsShowcase() {
  const [featured, ...rest] = systemTypes;

  return (
    <Section tone="paper">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Systems we build</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display-2 mt-4 text-paper-foreground">
            The kind of systems we build.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 text-lg text-slate">
            Published case studies are added here once approved project details are available.
          </p>
        </Reveal>
      </div>

      {featured && (
        <div className="mt-12">
          <SystemCard system={featured} index={0} featured />
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {rest.map((system, index) => (
            <SystemCard key={system.slug} system={system} index={index + 1} />
          ))}
        </div>
      )}
    </Section>
  );
}
