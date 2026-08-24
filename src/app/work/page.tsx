import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { FeaturedProjectCard } from "@/components/motion/featured-project-card";
import { CapabilityPathCard } from "@/components/motion/capability-path-card";
import { ProductSpotlight } from "@/components/motion/product-spotlight";
import { InDevelopmentSystems } from "@/components/sections/work/in-development-systems";
import { featuredWork, capabilityPaths } from "@/content/selected-work";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Selected digital work and capability from Kipeo Digital: websites, business and HSE systems, engineering tools, and commerce platforms.",
  alternates: { canonical: "/work" },
});

const spanClasses = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export default function WorkPage() {
  return (
    <>
      <section className="bg-grid-paper relative overflow-hidden bg-paper pb-10 pt-12 sm:pb-14 sm:pt-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,var(--color-teal-tint),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <Reveal immediate>
              <Eyebrow>Work</Eyebrow>
            </Reveal>
            <Reveal immediate delay={0.06}>
              <h1 className="text-display-1 mt-6 text-paper-foreground">Digital work built for real operations.</h1>
            </Reveal>
            <Reveal immediate delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
                From public-facing websites to internal operational systems, our work is shaped around what
                people need to manage, deliver and improve. Below is a genuine featured project, our core
                capability areas, and what&apos;s currently in development.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <FeaturedProjectCard work={featuredWork} />

        <div className="mt-10 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-12">
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
      </Section>

      <InDevelopmentSystems />

      <Section tone="ink" className="bg-grid-ink">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-lg">
            <h2 className="text-display-3 text-ink-foreground">Have a project in mind?</h2>
            <p className="mt-2 text-sm text-ink-muted sm:text-base">
              Tell us what you&apos;re building and we&apos;ll reply with a free initial proposal.
            </p>
          </div>
          <Button href="/contact" variant="accent" size="lg" tone="ink">
            Start a project
          </Button>
        </div>
      </Section>
    </>
  );
}
