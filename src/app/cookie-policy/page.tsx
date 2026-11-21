import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection, type LegalTocItem } from "@/components/sections/legal/legal-layout";
import { siteConfig } from "@/content/site-config";
import { buildMetadata } from "@/lib/metadata";

const title = "Cookie Policy | Kipeo Digital";
const description = "What Kipeo Digital does and does not store in your browser, and why.";
const lastUpdated = "21 November 2026";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  alternates: { canonical: "/cookie-policy" },
  openGraph: { url: "/cookie-policy", title, description },
  twitter: { title, description },
  robots: { index: true, follow: true },
});

const toc: LegalTocItem[] = [
  { id: "summary", label: "Summary" },
  { id: "cookies-we-set", label: "Cookies Kipeo sets" },
  { id: "browser-storage", label: "Browser storage we use" },
  { id: "third-party-cookies", label: "Third-party cookies" },
  { id: "managing-storage", label: "Managing or clearing this" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact" },
];

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" currentHref="/cookie-policy" lastUpdated={lastUpdated} toc={toc}>
      <LegalSection id="summary" heading="Summary">
        <p>
          Kipeo Digital does not set advertising or tracking cookies, and does not run analytics on this website. The
          only things stored in your browser are two small local preferences (not cookies): whether you&rsquo;ve
          dismissed the announcement banner, and your Light or Dark appearance choice if you make one. Because the site uses no non-essential cookies, it does not
          show a cookie-consent banner &mdash; there is nothing non-essential to ask consent for.
        </p>
      </LegalSection>

      <LegalSection id="cookies-we-set" heading="Cookies Kipeo sets">
        <p>None. Kipeo Digital does not set any first-party cookies on this website.</p>
      </LegalSection>

      <LegalSection id="browser-storage" heading="Browser storage we use">
        <p>
          The website uses your browser&rsquo;s{" "}
          <code className="rounded bg-mist px-1.5 py-0.5 font-mono text-[0.85em]">localStorage</code> &mdash; a
          different mechanism from a cookie, and one that is never sent to our server &mdash; for two purposes: once
          you close the announcement banner at the top of the site, that preference is saved on your device so the
          banner doesn&rsquo;t reopen every time you visit; and if you choose Light or Dark under Appearance, that
          choice is saved so the site opens in it next time. Both:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Stays only on your device and browser</li>
          <li>Is never transmitted to Kipeo or any third party</li>
          <li>Is not used to identify or track you</li>
          <li>
            Last only as long as they&rsquo;re useful: the banner preference expires after three days, and the
            appearance choice stays until you switch back to System or clear your browser&rsquo;s site data
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="third-party-cookies" heading="Third-party cookies">
        <p>
          Where Cloudflare Turnstile is active on the enquiry form or the Impact Build application form, Cloudflare may set its own technical cookies as
          part of verifying that a submission is not automated. This is a functional/security cookie needed for the
          form&rsquo;s spam protection to work, not an advertising or tracking cookie, and it is set by Cloudflare
          under its own policy rather than by Kipeo directly.
        </p>
      </LegalSection>

      <LegalSection id="managing-storage" heading="Managing or clearing this">
        <p>
          You can clear the announcement-banner and appearance preferences (or any Turnstile cookie) at any time through your
          browser&rsquo;s site-data or privacy settings, typically under &ldquo;Clear browsing data&rdquo; or
          &ldquo;Site settings&rdquo; for this domain. Clearing them simply means the announcement banner may show
          again and the site follows your device&rsquo;s light or dark setting.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="Changes to this policy">
        <p>
          If Kipeo Digital ever introduces cookies or storage that require consent, this page will be updated to
          describe them accurately, and appropriate consent controls will be added at that time &mdash; not before.
          See also the{" "}
          <Link href="/privacy-policy" className="text-teal-strong underline underline-offset-2 hover:text-link-hover">
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="Contact">
        <p>
          Kipeo Digital
          <br />
          Nairobi, Kenya
          <br />
          <a href={`mailto:${siteConfig.email}`} className="text-teal-strong underline underline-offset-2 hover:text-link-hover">
            {siteConfig.email}
          </a>
          <br />
          <a href={siteConfig.phoneHref} className="text-teal-strong underline underline-offset-2 hover:text-link-hover">
            {siteConfig.phone}
          </a>
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
