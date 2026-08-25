import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection, type LegalTocItem } from "@/components/sections/legal/legal-layout";
import { siteConfig } from "@/content/site-config";
import { buildMetadata } from "@/lib/metadata";

const title = "Terms of Use | Kipeo Digital";
const description = "The terms that govern use of the Kipeo Digital website and enquiry form.";
const lastUpdated = "25 August 2026";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms", title, description },
  twitter: { title, description },
  robots: { index: true, follow: true },
});

const toc: LegalTocItem[] = [
  { id: "acceptance", label: "Acceptance of these terms" },
  { id: "using-the-website", label: "Using the website" },
  { id: "enquiries-and-proposals", label: "Enquiries and proposals" },
  { id: "intellectual-property", label: "Intellectual property" },
  { id: "third-party-services", label: "Third-party services" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "availability", label: "Availability" },
  { id: "liability", label: "Liability" },
  { id: "external-links", label: "External links" },
  { id: "changes", label: "Changes to these terms" },
  { id: "governing-law", label: "Governing law" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" lastUpdated={lastUpdated} toc={toc}>
      <LegalSection id="acceptance" heading="Acceptance of these terms">
        <p>
          These terms govern your use of the Kipeo Digital website at{" "}
          <span className="font-medium text-paper-foreground">{siteConfig.url}</span>. By using this website, you
          agree to them. They apply to the website itself &mdash; not to any specific client project, which is
          governed by its own separate written agreement (see{" "}
          <a href="#enquiries-and-proposals" className="text-teal-strong underline underline-offset-2 hover:text-ink">
            Enquiries and proposals
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection id="using-the-website" heading="Using the website">
        <p>
          This website is provided for informational purposes: to describe Kipeo Digital&rsquo;s services, past
          work and approach, and to let visitors get in touch. You may browse it and submit the enquiry form for
          genuine business purposes.
        </p>
      </LegalSection>

      <LegalSection id="enquiries-and-proposals" heading="Enquiries and proposals">
        <p>
          Submitting the enquiry form, emailing, calling or messaging Kipeo Digital does not create a contract of
          any kind. It starts a conversation. Where a project is a suitable fit, Kipeo prepares a separate written
          proposal covering scope, deliverables, timeline and investment, and a project only begins once that
          proposal (or a further agreement) is accepted in writing by both parties. These website terms do not set
          the terms of any individual project &mdash; the project agreement does.
        </p>
      </LegalSection>

      <LegalSection id="intellectual-property" heading="Intellectual property">
        <p>
          The content of this website &mdash; including its text, design, layout and code &mdash; belongs to Kipeo
          Digital or its licensors, except where a project or item is credited to a third party (for example, the
          external expertise links on the Services and Work pages). Nothing on this website grants you a licence to
          reuse that content beyond ordinary browsing. Ownership of deliverables created for a specific client
          project is set out in that project&rsquo;s own agreement, not by these terms.
        </p>
      </LegalSection>

      <LegalSection id="third-party-services" heading="Third-party services">
        <p>
          The enquiry form is processed with the help of third-party services described in the{" "}
          <Link href="/privacy-policy" className="text-teal-strong underline underline-offset-2 hover:text-ink">
            Privacy Policy
          </Link>
          , and the website is hosted on Vercel&rsquo;s infrastructure. Use of those services is subject to their own
          terms, which Kipeo does not control.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" heading="Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Attempt to interfere with, disrupt or gain unauthorised access to the website or its systems</li>
          <li>Submit unlawful, fraudulent or abusive content through the enquiry form</li>
          <li>Use automated tools to scrape or overload the website</li>
        </ul>
      </LegalSection>

      <LegalSection id="availability" heading="Availability">
        <p>
          The website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We aim to keep it
          available and accurate but do not guarantee uninterrupted access, and content may be updated or changed
          without notice.
        </p>
      </LegalSection>

      <LegalSection id="liability" heading="Liability">
        <p>
          To the extent permitted by law, Kipeo Digital is not liable for indirect, incidental or consequential loss
          arising from your use of this website. Nothing in these terms excludes or limits liability that cannot
          lawfully be excluded or limited. These limitations apply to the website only &mdash; liability relating to a
          specific client project is instead governed by that project&rsquo;s own agreement.
        </p>
      </LegalSection>

      <LegalSection id="external-links" heading="External links">
        <p>
          This website links to external sites, such as case-study destinations and related professional expertise.
          Those sites are outside Kipeo&rsquo;s control, and linking to them does not imply endorsement of their full
          content. We are not responsible for the content or practices of external sites.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="Changes to these terms">
        <p>
          We may update these terms from time to time. The &ldquo;Last updated&rdquo; date at the top of this page
          reflects the most recent revision. Continued use of the website after a change constitutes acceptance of
          the updated terms.
        </p>
      </LegalSection>

      <LegalSection id="governing-law" heading="Governing law">
        <p>These terms are governed by the laws of Kenya.</p>
      </LegalSection>

      <LegalSection id="contact" heading="Contact">
        <p>
          Kipeo Digital
          <br />
          Nairobi, Kenya
          <br />
          <a href={`mailto:${siteConfig.email}`} className="text-teal-strong underline underline-offset-2 hover:text-ink">
            {siteConfig.email}
          </a>
          <br />
          <a href={siteConfig.phoneHref} className="text-teal-strong underline underline-offset-2 hover:text-ink">
            {siteConfig.phone}
          </a>
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
