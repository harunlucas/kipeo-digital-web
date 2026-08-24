import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { EcosystemVisual } from "@/components/motion/ecosystem-visual";
import { ServiceNav } from "@/components/sections/services/service-nav";
import { ServiceSection } from "@/components/sections/services/service-section";
import { InvestmentSection } from "@/components/sections/services/investment-section";
import { ServicesProcess } from "@/components/sections/services/services-process";
import { ServicesFaq } from "@/components/sections/services/services-faq";
import { serviceGroups, servicesFaq } from "@/content/services-page";
import { organizationSchema, professionalServiceSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Software and business systems, HSE and technical operational software, websites and commerce, and integration, deployment and support — a team-led software agency, scoped individually with a free initial proposal.",
  alternates: { canonical: "/services" },
});

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(servicesFaq)) }}
      />

      <section className="bg-grid-paper relative overflow-hidden bg-paper pb-14 pt-12 sm:pb-16 sm:pt-14">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,var(--color-teal-tint),transparent)]"
        />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div>
              <Reveal immediate>
                <Eyebrow>Services</Eyebrow>
              </Reveal>
              <Reveal immediate delay={0.06}>
                <h1 className="text-display-1 mt-6 text-paper-foreground">
                  Software and digital systems built around real operations.
                </h1>
              </Reveal>
              <Reveal immediate delay={0.12}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
                  From customer-facing platforms to internal workflows, we design, build, integrate and support
                  the systems businesses rely on.
                </p>
              </Reveal>
              <Reveal immediate delay={0.18}>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <Button href="/contact" variant="primary" size="lg">
                    Start a project
                  </Button>
                  <Button href="/work" variant="outline" size="lg">
                    Explore our work
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal immediate delay={0.1}>
              <EcosystemVisual />
            </Reveal>
          </div>
        </Container>
      </section>

      <ServiceNav
        sections={serviceGroups.map((group) => ({
          id: group.id,
          navLabel: group.navLabel,
          icon: <group.icon className="h-3.5 w-3.5 shrink-0" aria-hidden />,
        }))}
      />

      {serviceGroups.map((group) => (
        <ServiceSection key={group.id} group={group} />
      ))}

      <InvestmentSection />
      <ServicesProcess />
      <ServicesFaq />

      <section className="bg-grid-ink relative overflow-hidden bg-ink py-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,color-mix(in_srgb,var(--color-teal)_14%,transparent),transparent)]"
        />
        <Container className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-display-1 text-ink-foreground">Start with the problem&mdash;not a package.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-lg text-ink-muted">
              Tell us what is slowing the business down, what needs to connect or what needs to be built. We&apos;ll
              recommend a practical next step.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="accent" size="lg" tone="ink">
                Start a project
              </Button>
              <Button href="/work" variant="outline" size="lg" tone="ink">
                View selected work
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
