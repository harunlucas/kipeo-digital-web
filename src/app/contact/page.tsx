import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ContactIntakePanel } from "@/components/motion/contact-intake-panel";
import { StartEnquiryButton } from "@/components/sections/contact/start-enquiry-button";
import { ContactPathways } from "@/components/sections/contact/contact-pathways";
import { ContactProcess } from "@/components/sections/contact/contact-process";
import { ContactTrustStrip } from "@/components/sections/contact/contact-trust-strip";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { ContactFaq } from "@/components/sections/contact/contact-faq";
import { siteConfig } from "@/content/site-config";
import { organizationSchema, contactPageSchema, faqSchema } from "@/lib/schema";
import { contactFaq } from "@/content/contact";
import { buildMetadata } from "@/lib/metadata";

const title = "Contact Kipeo Digital | Start a Software Project";
const description =
  "Contact Kipeo Digital to discuss custom software, business systems, web applications, websites, integrations or supported digital platforms.";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  keywords: ["contact software agency", "start a software project", "request a proposal", "Kipeo Digital contact"],
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title, description },
  twitter: { title, description },
});

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(contactFaq)) }} />

      <section className="relative overflow-hidden bg-paper py-10 sm:py-12 lg:flex lg:min-h-[580px] lg:items-center lg:py-0">
        <div aria-hidden className="bg-grid-paper absolute inset-0 opacity-50" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_82%_38%,var(--color-teal-tint),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_35%_40%_at_18%_88%,color-mix(in_srgb,var(--color-highlight)_9%,transparent),transparent)]"
        />
        <Container className="relative w-full">
          <div className="grid items-center gap-10 min-[900px]:grid-cols-[11fr_9fr] min-[900px]:gap-14">
            <div>
              <Reveal immediate>
                <Eyebrow>Start a conversation</Eyebrow>
              </Reveal>
              <Reveal immediate delay={0.06}>
                <h1 className="mt-5 font-display leading-[1.05] tracking-[-0.02em] text-paper-foreground [text-wrap:balance] text-[clamp(2.625rem,2.05rem+3vw,5.125rem)]">
                  Tell us what needs to work better.
                </h1>
              </Reveal>
              <Reveal immediate delay={0.12}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
                  Share the problem, idea or system you need to build. We&apos;ll review it and recommend a practical
                  next step.
                </p>
              </Reveal>
              <Reveal immediate delay={0.18}>
                <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                  <StartEnquiryButton />
                  <Button href={`mailto:${siteConfig.email}`} variant="outline" size="lg">
                    <Mail className="h-4 w-4" aria-hidden />
                    Email Kipeo
                  </Button>
                </div>
              </Reveal>
              <Reveal immediate delay={0.22}>
                <p className="mt-5 text-xs font-medium uppercase tracking-wide text-slate-muted">
                  Based in Nairobi · Working remotely worldwide
                </p>
              </Reveal>
            </div>
            <Reveal immediate delay={0.1}>
              <ContactIntakePanel />
            </Reveal>
          </div>
        </Container>
      </section>

      <Container className="border-t border-neutral-200/80 pb-16 pt-14 sm:pb-20 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
          <div className="lg:col-start-1 lg:row-start-1">
            <h2 className="text-display-3 text-paper-foreground">Choose the easiest way to reach us.</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate sm:text-base">
              Email, call or message us directly, or fill in the project enquiry form with as much or as little
              detail as you have.
            </p>
            <div className="mt-6">
              <ContactPathways />
            </div>
          </div>

          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <h2 id="enquiry-form" tabIndex={-1} className="text-display-3 text-paper-foreground focus:outline-none">
              Tell us about your project.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate sm:text-base">
              Fields marked required help us understand the project; everything else is optional context.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="flex flex-col gap-10 lg:col-start-1 lg:row-start-2">
            <ContactProcess />
            <ContactTrustStrip />
          </div>
        </div>
      </Container>

      <ContactFaq />
    </>
  );
}
