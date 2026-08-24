import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { FeaturedProjectCard } from "@/components/motion/featured-project-card";
import { CapabilityPathCard } from "@/components/motion/capability-path-card";
import { ProductSpotlight } from "@/components/motion/product-spotlight";
import { featuredWork, capabilityPaths } from "@/content/selected-work";

// Alternating 7/5 · 5/7 column spans (of 12) instead of a uniform 2-up grid,
// so the section reads as a varied, image-led layout rather than equal boxes.
const spanClasses = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

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

      <div className="mt-6">
        <FeaturedProjectCard work={featuredWork} />
      </div>

      <div className="mt-6 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-12">
        {capabilityPaths.map((path, index) => (
          <div key={path.id} className={spanClasses[index % spanClasses.length]}>
            <CapabilityPathCard path={path} index={index} />
          </div>
        ))}
      </div>

      {capabilityPaths
        .filter((path) => path.embeddedProject)
        .map((path) => (
          <div key={path.id} className="mt-6">
            <ProductSpotlight path={path} />
          </div>
        ))}

      <Reveal delay={0.1}>
        <div className="mt-8">
          <Button href="/work" variant="outline" size="md">
            View all work
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
