import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, LegalSection, type LegalTocItem } from "@/components/sections/legal/legal-layout";
import { siteConfig } from "@/content/site-config";
import { buildMetadata } from "@/lib/metadata";

const title = "Kipeo Impact Build Terms";
const description =
  "The programme terms governing the Kipeo Impact Build: eligibility, selection, the development-fee waiver, third-party costs and applicant responsibilities.";
const lastUpdated = "25 August 2026";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  alternates: { canonical: "/impact-build/terms" },
  openGraph: { url: "/impact-build/terms", title, description },
  twitter: { title, description },
  robots: { index: true, follow: true },
});

const toc: LegalTocItem[] = [
  { id: "purpose", label: "Purpose of the initiative" },
  { id: "eligibility", label: "Eligibility" },
  { id: "application-requirements", label: "Application requirements" },
  { id: "no-guarantee", label: "No guarantee of selection" },
  { id: "selection-criteria", label: "Selection is based on published criteria" },
  { id: "clarification-and-decline", label: "Clarification and the right to decline" },
  { id: "one-project", label: "One selected project per cycle" },
  { id: "scope-and-waiver", label: "Scope, agreement and the fee waiver" },
  { id: "third-party-costs", label: "Third-party expenses" },
  { id: "content-and-ownership", label: "Content, ownership and cooperation" },
  { id: "timeline-and-changes", label: "Timeline dependencies and changes outside scope" },
  { id: "support-and-ip", label: "Support period and intellectual property" },
  { id: "third-party-software", label: "Third-party software and licences" },
  { id: "confidentiality-and-publicity", label: "Confidentiality and publicity" },
  { id: "no-cash-alternative", label: "No cash alternative" },
  { id: "suspension", label: "Suspension or withdrawal" },
  { id: "limitation", label: "Limitation of commitment before agreement" },
  { id: "governing-law", label: "Governing law" },
  { id: "contact", label: "Contact" },
];

export default function ImpactBuildTermsPage() {
  return (
    <LegalLayout eyebrow="Kipeo Impact Build" title={title} lastUpdated={lastUpdated} toc={toc}>
      <div className="rounded-2xl border border-highlight/25 bg-highlight/5 p-5 text-sm leading-relaxed text-slate sm:p-6">
        <p>
          These programme terms are provided as a plain-language summary and should receive independent legal review
          before this initiative is formally launched. They do not constitute legal advice, and nothing here is
          jurisdiction-specific legal guidance.
        </p>
      </div>

      <LegalSection id="purpose" heading="Purpose of the initiative">
        <p>
          The Kipeo Impact Build is an annual initiative through which Kipeo Digital (&ldquo;Kipeo&rdquo;,
          &ldquo;we&rdquo;) may select one suitable organisation or purpose-led initiative for a clearly scoped
          digital project, with Kipeo&rsquo;s development fee waived for the agreed scope. It is separate from
          Kipeo&rsquo;s ordinary commercial services, described on the{" "}
          <Link href="/impact-build" className="text-teal-strong underline underline-offset-2 hover:text-ink">
            Impact Build
          </Link>{" "}
          information page.
        </p>
      </LegalSection>

      <LegalSection id="eligibility" heading="Eligibility">
        <p>
          Applications may come from nonprofit organisations, community organisations, social-impact initiatives,
          early-stage purpose-led organisations, small organisations addressing a genuine operational problem, or
          individuals developing a clearly defined public-benefit initiative. Kipeo retains discretion to consider
          another suitable applicant type where appropriate, and to decline an application that does not meet these
          terms.
        </p>
      </LegalSection>

      <LegalSection id="application-requirements" heading="Application requirements">
        <p>By applying, you confirm that you can and will:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Provide accurate information</li>
          <li>Explain the problem and intended users</li>
          <li>Appoint one project decision-maker</li>
          <li>Provide required content</li>
          <li>Own, or have permission to use, all submitted content</li>
          <li>Participate in discovery and reviews</li>
          <li>Maintain the result after handover</li>
          <li>Accept these programme terms</li>
        </ul>
      </LegalSection>

      <LegalSection id="no-guarantee" heading="No guarantee of selection">
        <p>
          Submitting an application does not guarantee selection. Kipeo may choose not to select a project in a given
          cycle if no application is suitable, sufficiently prepared, or responsibly deliverable within Kipeo&rsquo;s
          available capacity.
        </p>
      </LegalSection>

      <LegalSection id="selection-criteria" heading="Selection is based on published criteria">
        <p>
          Applications are assessed against the criteria published on the{" "}
          <Link href="/impact-build" className="text-teal-strong underline underline-offset-2 hover:text-ink">
            Impact Build
          </Link>{" "}
          page &mdash; including problem clarity, potential practical benefit, digital suitability, achievable scope
          and applicant readiness. Selection is not random and is not a competition, giveaway or prize draw.
        </p>
      </LegalSection>

      <LegalSection id="clarification-and-decline" heading="Clarification and the right to decline">
        <p>
          Kipeo may contact an applicant to request clarification or further information before reaching a decision.
          Kipeo reserves the right to decline any or all applications received in a given cycle, at its sole
          discretion.
        </p>
      </LegalSection>

      <LegalSection id="one-project" heading="One selected project per cycle">
        <p>
          Kipeo intends to select one project per annual cycle, subject to a suitable application being received and
          an achievable written scope being agreed. This is not a fixed guarantee &mdash; a cycle may result in no
          selection.
        </p>
      </LegalSection>

      <LegalSection id="scope-and-waiver" heading="Scope, agreement and the fee waiver">
        <p>
          If your application is selected, Kipeo will work with you to define a specific, written project scope. No
          project exists, and no development begins, until a written Impact Build agreement covering that scope is
          accepted by both parties. Kipeo&rsquo;s development fee for the final agreed scope is waived under that
          agreement &mdash; the waiver applies only to the scope actually agreed, not to any later addition or
          expansion of work.
        </p>
      </LegalSection>

      <LegalSection id="third-party-costs" heading="Third-party expenses">
        <p>
          The recipient remains responsible for approved third-party expenses, which commonly include domain
          registration, hosting, premium licences, payment-provider fees, professional photography, extensive
          copywriting, advertising expenditure, large-scale data entry, large product-catalogue population, and
          maintenance after the support period described below. No third-party cost will be incurred without the
          recipient&rsquo;s prior written approval.
        </p>
      </LegalSection>

      <LegalSection id="content-and-ownership" heading="Content, ownership and cooperation">
        <p>
          The recipient is responsible for providing required content and confirming they own it or have permission
          to use it. The recipient agrees to participate in discovery sessions and review cycles in a timely manner,
          as these directly affect whether the project can be delivered within Kipeo&rsquo;s available capacity for
          the initiative.
        </p>
      </LegalSection>

      <LegalSection id="timeline-and-changes" heading="Timeline dependencies and changes outside scope">
        <p>
          The project timeline depends on the recipient&rsquo;s responsiveness, content delivery and review turnaround.
          Delays on the recipient&rsquo;s side may delay delivery. Work requested outside the agreed written scope is
          not covered by the fee waiver and would need to be agreed and costed separately.
        </p>
      </LegalSection>

      <LegalSection id="support-and-ip" heading="Support period and intellectual property">
        <p>
          Where included in the agreed scope, Kipeo provides 30 days of defect support after launch. Ongoing
          maintenance beyond that period is the recipient&rsquo;s responsibility unless separately agreed. Ownership
          and licensing of project deliverables, and of any pre-existing Kipeo tools or components used to build them,
          is set out in the written Impact Build agreement for the selected project.
        </p>
      </LegalSection>

      <LegalSection id="third-party-software" heading="Third-party software and licences">
        <p>
          Where the project depends on third-party software, platforms or licences, those remain subject to their own
          providers&rsquo; terms, and any recurring cost is a third-party expense under{" "}
          <a href="#third-party-costs" className="text-teal-strong underline underline-offset-2 hover:text-ink">
            Third-party expenses
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="confidentiality-and-publicity" heading="Confidentiality and publicity">
        <p>
          Kipeo treats application information as confidential for the purposes of assessment, subject to the{" "}
          <Link href="/privacy-policy" className="text-teal-strong underline underline-offset-2 hover:text-ink">
            Privacy Policy
          </Link>
          . Kipeo does not publicly identify applicants or the selected recipient, and does not make any public
          announcement about a specific application or project, without the applicant&rsquo;s separate written
          consent.
        </p>
      </LegalSection>

      <LegalSection id="no-cash-alternative" heading="No cash alternative">
        <p>
          There is no cash alternative to the development-fee waiver, and it cannot be transferred, exchanged or
          redeemed for payment.
        </p>
      </LegalSection>

      <LegalSection id="suspension" heading="Suspension or withdrawal">
        <p>
          Kipeo may suspend or withdraw an application, or pause or withdraw from an accepted Impact Build agreement,
          if it discovers false or materially inaccurate information, misuse or abuse of the application process, or
          a sustained failure by the recipient to cooperate as required under these terms.
        </p>
      </LegalSection>

      <LegalSection id="limitation" heading="Limitation of commitment before agreement">
        <p>
          Nothing on the Impact Build pages, in an application confirmation, or in any pre-selection communication
          constitutes an offer or a binding commitment by Kipeo. Kipeo&rsquo;s only binding commitment under this
          initiative is the written Impact Build agreement it enters into with a selected recipient.
        </p>
      </LegalSection>

      <LegalSection id="governing-law" heading="Governing law">
        <p>
          These programme terms are intended to be governed by the laws of Kenya, consistent with Kipeo&rsquo;s base
          in Nairobi. This is a general statement, not jurisdiction-specific legal advice, and should be confirmed
          through the independent legal review noted at the top of this page.
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
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
