import type { Metadata } from "next";
import { LegalLayout, LegalSection, type LegalTocItem } from "@/components/sections/legal/legal-layout";
import { siteConfig } from "@/content/site-config";
import { buildMetadata } from "@/lib/metadata";

const title = "Accessibility Statement | Kipeo Digital";
const description = "Kipeo Digital's accessibility commitment, current measures and how to report an issue.";
const lastUpdated = "25 August 2026";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  alternates: { canonical: "/accessibility" },
  openGraph: { url: "/accessibility", title, description },
  twitter: { title, description },
  robots: { index: true, follow: true },
});

const toc: LegalTocItem[] = [
  { id: "commitment", label: "Our commitment" },
  { id: "measures", label: "Measures we've implemented" },
  { id: "known-limitations", label: "Known limitations" },
  { id: "feedback", label: "Feedback and contact" },
  { id: "review-date", label: "Statement review date" },
];

export default function AccessibilityPage() {
  return (
    <LegalLayout title="Accessibility Statement" lastUpdated={lastUpdated} toc={toc}>
      <LegalSection id="commitment" heading="Our commitment">
        <p>
          Kipeo Digital wants this website to be usable by as many people as possible, including people navigating by
          keyboard, using a screen reader, or with low vision or motion sensitivity. We aim to align the website with
          WCAG 2.2 Level AA principles. This website has not been through a formal third-party accessibility audit,
          so we do not claim full conformance &mdash; this statement describes what we have done and what we know.
        </p>
      </LegalSection>

      <LegalSection id="measures" heading="Measures we've implemented">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Semantic HTML landmarks and heading structure throughout the site</li>
          <li>
            Keyboard-operable navigation, including the header&rsquo;s Services menu and the mobile menu (opens and
            closes with Enter, Space and Escape, with focus returned to the trigger on close)
          </li>
          <li>Visible focus indicators on interactive elements</li>
          <li>Descriptive accessible labels on icon-only controls and on external links that open a new tab</li>
          <li>A colour palette chosen with contrast in mind between text and background surfaces</li>
          <li>Responsive layout that works down to small mobile screens without horizontal scrolling</li>
          <li>Reduced-motion support: animations are shortened or removed when a visitor&rsquo;s system requests less motion</li>
          <li>Descriptive alternative text on meaningful images</li>
        </ul>
      </LegalSection>

      <LegalSection id="known-limitations" heading="Known limitations">
        <p>
          We are not currently aware of significant accessibility barriers on this website. As with any site, some
          areas may not yet fully meet every guideline. If you find something that doesn&rsquo;t work well with your
          browser, keyboard or assistive technology, please tell us using the contact details below &mdash; specific,
          reported issues are more useful to us than a general audit would be.
        </p>
      </LegalSection>

      <LegalSection id="feedback" heading="Feedback and contact">
        <p>
          If you experience an accessibility barrier on this website, email{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-teal-strong underline underline-offset-2 hover:text-ink">
            {siteConfig.email}
          </a>{" "}
          with the page you were on, what you were trying to do, and the browser or assistive technology you were
          using. We review accessibility reports and respond as promptly as we reasonably can.
        </p>
      </LegalSection>

      <LegalSection id="review-date" heading="Statement review date">
        <p>This statement was last reviewed on {lastUpdated}.</p>
      </LegalSection>
    </LegalLayout>
  );
}
