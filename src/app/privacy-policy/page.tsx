import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection, type LegalTocItem } from "@/components/sections/legal/legal-layout";
import { siteConfig } from "@/content/site-config";
import { buildMetadata } from "@/lib/metadata";

const title = "Privacy Policy | Kipeo Digital";
const description = "How Kipeo Digital collects, uses and protects information from visitors and enquiries.";
const lastUpdated = "25 August 2026";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { url: "/privacy-policy", title, description },
  twitter: { title, description },
  robots: { index: true, follow: true },
});

const toc: LegalTocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "information-you-provide", label: "Information you provide" },
  { id: "technical-information", label: "Technical information" },
  { id: "cookies-and-storage", label: "Cookies and browser storage" },
  { id: "how-we-use-it", label: "How we use information" },
  { id: "service-providers", label: "Service providers" },
  { id: "international-processing", label: "International processing" },
  { id: "retention", label: "Retention" },
  { id: "security", label: "Security" },
  { id: "your-rights", label: "Your rights" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated={lastUpdated} toc={toc}>
      <LegalSection id="overview" heading="Overview">
        <p>
          This policy explains what information Kipeo Digital (&ldquo;Kipeo&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
          collects through this website, why, and how it is handled. It covers the website at{" "}
          <span className="font-medium text-paper-foreground">{siteConfig.url}</span>, the enquiry form on the{" "}
          <Link href="/contact" className="text-teal-strong underline underline-offset-2 hover:text-ink">
            Contact
          </Link>{" "}
          page, and the application form on the{" "}
          <Link href="/impact-build/apply" className="text-teal-strong underline underline-offset-2 hover:text-ink">
            Kipeo Impact Build
          </Link>{" "}
          page. It does not cover the separate terms of any individual client project or Impact Build agreement,
          which are agreed in writing before work begins.
        </p>
      </LegalSection>

      <LegalSection id="information-you-provide" heading="Information you provide">
        <p>The enquiry form on the Contact page asks for:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Your full name and email address</li>
          <li>Optionally, your company, phone number, country or timezone, and website URL</li>
          <li>Your project type, stage, timeline, budget range and a written project summary</li>
          <li>Your preferred way to be contacted</li>
        </ul>
        <p>
          You choose what optional fields to complete. If you email or call us directly instead, we receive whatever
          information that message contains. The &ldquo;Notify me&rdquo; link on the Insights page simply opens your
          own email app addressed to us &mdash; it does not add you to a mailing list, and Kipeo does not operate a
          newsletter or marketing email list.
        </p>
        <p>
          The application form on the{" "}
          <Link href="/impact-build/apply" className="text-teal-strong underline underline-offset-2 hover:text-ink">
            Kipeo Impact Build
          </Link>{" "}
          page is separate from the Contact form. It asks for your contact details, information about your
          organisation or initiative, a description of the problem and intended users, your readiness to
          participate in the project, and three explicit acknowledgements (privacy, the Impact Build Terms, and an
          accuracy declaration). The form warns against submitting passwords, access keys, identification documents,
          confidential records, health information or sensitive beneficiary data, and does not ask for any of it.
        </p>
      </LegalSection>

      <LegalSection id="technical-information" heading="Technical information">
        <p>
          When you submit the enquiry form, our server briefly reads your IP address to apply spam and abuse
          protection (rate limiting, and Cloudflare Turnstile verification where enabled &mdash; see{" "}
          <a href="#cookies-and-storage" className="text-teal-strong underline underline-offset-2 hover:text-ink">
            Cookies and browser storage
          </a>
          ). Like any hosted website, our hosting provider also records standard technical request logs (such as
          timestamps, IP address and browser user-agent) for reliability and security purposes. Kipeo does not run a
          dedicated analytics, tracking or advertising product on this site.
        </p>
      </LegalSection>

      <LegalSection id="cookies-and-storage" heading="Cookies and browser storage">
        <p>
          Kipeo Digital does not set tracking or advertising cookies. The site uses your browser&rsquo;s
          <code className="mx-1 rounded bg-mist px-1.5 py-0.5 font-mono text-[0.85em]">localStorage</code>
          for one purpose only: remembering that you dismissed the announcement banner, so it doesn&rsquo;t reappear
          on your next visit. These values stay on your device, are never sent to us or any third party, and
          aren&rsquo;t cookies. See the{" "}
          <Link href="/cookie-policy" className="text-teal-strong underline underline-offset-2 hover:text-ink">
            Cookie Policy
          </Link>{" "}
          for full detail, including the one third-party exception (Cloudflare Turnstile, when active on the contact
          form).
        </p>
      </LegalSection>

      <LegalSection id="how-we-use-it" heading="How we use information">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>To respond to your enquiry and prepare a proposal where relevant</li>
          <li>To communicate with you about a potential or active project</li>
          <li>To assess and respond to a Kipeo Impact Build application against its published criteria</li>
          <li>To protect the website and forms from spam, abuse and automated submissions</li>
          <li>To operate, secure and maintain the website</li>
        </ul>
        <p>
          We do not sell or rent visitor information, we do not use it for advertising, and we do not add anyone to
          a marketing list without separate consent. Kipeo does not publicly identify Impact Build applicants or a
          selected recipient without their separate written consent.
        </p>
      </LegalSection>

      <LegalSection id="service-providers" heading="Service providers">
        <p>The following third parties process data on our behalf, strictly to operate the services above:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <span className="font-medium text-paper-foreground">Brevo</span> &mdash; delivers the email notification
            and confirmation generated when you submit the enquiry form.
          </li>
          <li>
            <span className="font-medium text-paper-foreground">Cloudflare (Turnstile)</span> &mdash; where enabled,
            helps verify that a form submission is not automated.
          </li>
          <li>
            <span className="font-medium text-paper-foreground">Vercel</span> &mdash; hosts the website and handles
            its infrastructure and request logs.
          </li>
        </ul>
        <p>Each provider processes data under its own privacy policy and terms.</p>
      </LegalSection>

      <LegalSection id="international-processing" heading="International processing">
        <p>
          Kipeo is based in Nairobi, Kenya. The service providers above operate global infrastructure, so information
          may be processed on servers outside Kenya. We only work with established providers and limit what is
          shared with them to what each service needs to function.
        </p>
      </LegalSection>

      <LegalSection id="retention" heading="Retention">
        <p>
          Enquiry emails are kept in our mailbox for as long as reasonably needed to respond to you and manage any
          resulting project relationship, then deleted or archived in the ordinary course of business. IP addresses
          used for rate limiting are held in memory only and clear automatically after a short window; Kipeo does not
          maintain a database of visitor information &mdash; enquiries and Impact Build applications alike exist only
          as email.
        </p>
        <p>
          An Impact Build application that is not selected is retained only for the review cycle it was submitted
          for, plus a limited administrative period afterwards, then deleted or archived in the ordinary course of
          business. Where an application is selected, the information is retained for as long as reasonably needed
          for the resulting written Impact Build agreement and project. You can ask us to delete an application
          earlier under{" "}
          <a href="#your-rights" className="text-teal-strong underline underline-offset-2 hover:text-ink">
            Your rights
          </a>
          , subject to any legitimate legal or administrative need to keep it.
        </p>
      </LegalSection>

      <LegalSection id="security" heading="Security">
        <p>
          We use reasonable technical measures to protect information submitted through this site, including
          HTTPS, server-side validation, and spam/abuse protection on the enquiry form. No method of transmission or
          storage is completely secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection id="your-rights" heading="Your rights">
        <p>
          You can ask us what information we hold about you, request a correction, or ask us to delete it, by
          emailing{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-teal-strong underline underline-offset-2 hover:text-ink">
            {siteConfig.email}
          </a>
          . We will respond to reasonable requests as promptly as we can.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="Changes to this policy">
        <p>
          We may update this policy as the website or its services change. The &ldquo;Last updated&rdquo; date at the
          top of this page reflects the most recent revision.
        </p>
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
