import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ServiceTabs } from "@/components/motion/service-tabs";
import { servicePillars } from "@/content/service-pillars";

export function ServicesIntro() {
  return (
    <Section tone="paper">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display-2 mt-4 text-paper-foreground">
            Digital capability, organised around your business.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 text-lg text-slate">
            Start with one service or combine several in a single, clearly scoped project.
          </p>
        </Reveal>
      </div>

      <div className="mt-12">
        <ServiceTabs
          items={servicePillars.map((pillar) => ({
            id: pillar.id,
            title: pillar.title,
            problem: pillar.problem,
            subservices: pillar.subservices,
            icon: <pillar.icon className="h-5 w-5" aria-hidden />,
          }))}
        />
      </div>
    </Section>
  );
}
