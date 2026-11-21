import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { EnquiryForm } from "@/components/enquiry/enquiry-form";
import { ENQUIRY_FORM_ANCHOR } from "@/components/enquiry/project-enquiry-link";
import { ContactFaq } from "@/components/sections/contact/contact-faq";
import { siteConfig } from "@/content/site-config";
import { contactFaq, whatsappHref } from "@/content/contact";
import { enquiryCopy } from "@/content/enquiry";
import { organizationSchema, contactPageSchema, faqSchema } from "@/lib/schema";
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

type ContactDetail = {
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string;
  external?: boolean;
};

const contactDetails: ContactDetail[] = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
  { label: "Phone", value: siteConfig.phone, href: siteConfig.phoneHref, icon: Phone },
  { label: "WhatsApp", value: "Message Kipeo", href: whatsappHref, icon: MessageCircle, external: true },
  { label: "Studio", value: `${siteConfig.location} · Working worldwide`, icon: MapPin },
];

/**
 * General contact page: direct details on the left, the shared project
 * enquiry form inline on the right (stacked in that order on phones).
 * Project CTAs elsewhere open the same form in the site-wide panel; here
 * they scroll to this inline copy instead (see `ProjectEnquiryLink`).
 */
export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(contactFaq)) }} />

      <section className="relative overflow-hidden bg-paper">
        <div aria-hidden className="bg-grid-paper absolute inset-0 opacity-40" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_45%_50%_at_85%_30%,var(--color-teal-tint),transparent)]"
        />
        <Container className="relative py-12 sm:py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 xl:gap-24">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal immediate>
                <Eyebrow>Contact</Eyebrow>
              </Reveal>
              <Reveal immediate delay={0.06}>
                <h1 className="mt-4 font-display text-[clamp(2.5rem,2rem+2.4vw,4.25rem)] leading-[1.04] tracking-[-0.02em] text-paper-foreground">
                  Contact Kipeo
                </h1>
              </Reveal>
              <Reveal immediate delay={0.12}>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-slate">
                  Have a project in mind or a question about our work?
                </p>
              </Reveal>
              <Reveal immediate delay={0.18}>
                <dl className="mt-8 max-w-md divide-y divide-neutral-200 border-y border-neutral-200">
                  {contactDetails.map((detail) => {
                    const Icon = detail.icon;
                    return (
                      <div key={detail.label} className="flex items-center gap-4 py-3.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-paper-elevated/60 text-teal-strong">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-slate-muted">
                            {detail.label}
                          </dt>
                          <dd className="mt-0.5">
                            {detail.href ? (
                              <a
                                href={detail.href}
                                {...(detail.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                className="inline-flex items-center gap-1 rounded-sm text-base font-medium text-paper-foreground underline decoration-neutral-300 underline-offset-4 transition-colors [overflow-wrap:anywhere] hover:text-teal-strong hover:decoration-teal-strong"
                              >
                                {detail.value}
                                {detail.external && (
                                  <>
                                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                                    <span className="sr-only">(opens WhatsApp in a new tab)</span>
                                  </>
                                )}
                              </a>
                            ) : (
                              <span className="text-base text-paper-foreground">{detail.value}</span>
                            )}
                          </dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>
              </Reveal>
            </div>

            <Reveal immediate delay={0.1}>
              <div className="rounded-2xl border border-neutral-300/80 bg-ivory p-6 shadow-card sm:p-8 lg:p-10">
                <h2
                  id={ENQUIRY_FORM_ANCHOR}
                  tabIndex={-1}
                  className="scroll-mt-28 font-display text-[1.75rem] leading-tight tracking-[-0.015em] text-paper-foreground focus:outline-none sm:text-[2rem]"
                >
                  {enquiryCopy.heading}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-slate">{enquiryCopy.intro}</p>
                <div className="mt-6">
                  <EnquiryForm context="page" />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <ContactFaq />
    </>
  );
}
