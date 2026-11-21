import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { AnimatedLink } from "@/components/sections/home/animated-link";
import { ServiceIndex } from "@/components/sections/services/service-index";
import { ServiceFamilySection } from "@/components/sections/services/service-family-section";
import { serviceFamilies, scopeTerms } from "@/content/services-page";
import { siteConfig } from "@/content/site-config";
import { organizationSchema, professionalServiceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";

const title = "Software Development Services | Kipeo Digital";
const description =
  "Kipeo Digital builds business systems, operational and technical software, websites and online stores, with SEO, integrations, deployment and ongoing support.";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  keywords: [
    "software development agency",
    "business systems",
    "workflow automation",
    "HSE software",
    "engineering software",
    "web application development",
    "WordPress development",
    "e-commerce development",
    "SEO and digital growth",
    "API integrations",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
});

/**
 * The Services hub: a compact opening whose service index is the focus,
 * five service families each organised around a buyer's question, a short
 * scoping section and one closing action. Content lives in
 * `src/content/services-page.ts`.
 */
export default function ServicesPage() {
  return (
    <div className="bg-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema()) }}
      />

      <section aria-labelledby="services-title" className="pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-14">
        <Container>
          {/* Mobile order: introduction → index → "Start a project", so the
              five choices reach the first screen. From `lg` the introduction
              and link share the left column and the index takes the right. */}
          <div className="grid gap-y-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-[1fr_auto] lg:gap-x-20 lg:gap-y-8">
            <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
              <h1 id="services-title" className="hero-headline">
                <span className="block font-display font-semibold text-paper-foreground">Digital services</span>{" "}
                <span className="block pb-[0.08em] font-serif-display italic text-teal-strong">for your business</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate sm:text-lg">
                Kipeo builds websites, operational software and the integrations behind them, then helps you run
                what we launch.
              </p>
            </div>

            <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <ServiceIndex families={serviceFamilies} />
            </div>

            <div className="lg:col-start-1 lg:row-start-2">
              <Button href="/contact" variant="primary" size="lg">
                Start a project
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {serviceFamilies.map((family) => (
        <ServiceFamilySection key={family.id} family={family} />
      ))}

      <section aria-labelledby="how-we-scope" className="border-t border-neutral-300">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-16">
            <div>
              <h2 id="how-we-scope" className="section-headline">
                <span className="font-display font-semibold text-paper-foreground">How we scope</span>{" "}
                <span className="font-serif-display italic text-teal-strong">your project</span>
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-slate">
                Every project is scoped on its own. A landing page and a multi-role operational system aren’t priced
                the same way.
              </p>
              <AnimatedLink href="/studio" className="mt-5">
                See how we work
              </AnimatedLink>
            </div>
            <dl className="grid gap-x-10 sm:grid-cols-2">
              {scopeTerms.map((term) => (
                <div key={term.title} className="border-t border-neutral-300 pb-6 pt-4">
                  <dt className="text-base font-semibold text-paper-foreground">{term.title}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate">{term.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section aria-labelledby="services-next" className="border-t border-neutral-300 pb-24 pt-16 sm:pb-28 sm:pt-20">
        <Container>
          <div className="max-w-2xl">
            <h2 id="services-next" className="section-headline">
              <span className="font-display font-semibold text-paper-foreground">Not sure which service</span>{" "}
              <span className="font-serif-display italic text-teal-strong">fits?</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
              Tell us what needs to change and who it’s for. We’ll recommend a practical place to start.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg">
                Start a project
              </Button>
            </div>
            <p className="mt-8 text-sm text-slate-muted">
              Or email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-paper-foreground underline decoration-paper-foreground/30 underline-offset-4 transition-colors hover:text-teal-strong hover:decoration-teal-strong/50"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
