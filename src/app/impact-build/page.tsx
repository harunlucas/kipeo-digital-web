import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { organizationSchema, webPageSchema, breadcrumbListSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site-config";
import {
  impactBuildConfig,
  eligibleProjectTypes,
  possibleIncludedWork,
  separateCostItems,
  eligibleApplicantTypes,
  applicantRequirements,
  selectionCriteria,
  selectionStages,
  impactBuildFaq,
} from "@/content/impact-build";

const title = "Kipeo Impact Build | Apply for a Supported Digital Project";
const description =
  "Learn about the Kipeo Impact Build, an annual initiative through which one suitable organisation or purpose-led initiative may receive a clearly scoped digital project with Kipeo's development fee waived.";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  alternates: { canonical: "/impact-build" },
  openGraph: { url: "/impact-build", title, description },
  twitter: { title, description },
});

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate sm:text-base">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-strong" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StatusPanel() {
  const status = impactBuildConfig.status;

  if (status === "open") {
    return (
      <>
        <p className="text-sm font-medium text-teal-strong">Applications are currently open.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/impact-build/apply" variant="accent" size="md">
            Apply now
          </Button>
          <Button href="#what-is-included" variant="outline" size="md">
            Learn about the initiative
          </Button>
        </div>
      </>
    );
  }

  if (status === "reviewing") {
    return (
      <>
        <p className="text-sm font-medium text-paper-foreground">
          Applications for the current Impact Build are being reviewed.
        </p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate">
          The application form is closed while review is underway. Shortlisted applicants may be contacted directly.
        </p>
      </>
    );
  }

  if (status === "selected") {
    const showRecipient = impactBuildConfig.selectedApplicantPublished && impactBuildConfig.selectedApplicantConsent;
    return (
      <>
        <p className="text-sm font-medium text-paper-foreground">A project has been selected for the current Impact Build.</p>
        {showRecipient && impactBuildConfig.selectedApplicantName && (
          <p className="mt-2 text-sm leading-relaxed text-slate">
            This cycle&rsquo;s selected recipient: {impactBuildConfig.selectedApplicantName}.
          </p>
        )}
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate">
          Kipeo does not publish applicant or recipient details without separate written consent.
        </p>
      </>
    );
  }

  if (status === "closed") {
    return (
      <>
        <p className="text-sm font-medium text-paper-foreground">Applications are currently closed.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="#what-is-included" variant="outline" size="md">
            Learn about the initiative
          </Button>
          <Button href="/contact" variant="outline" size="md">
            Discuss a normally scoped project
          </Button>
        </div>
      </>
    );
  }

  // draft — kept private: no public status claim while the cycle isn't announced.
  return (
    <p className="text-sm leading-relaxed text-slate">
      Details for the next Impact Build cycle will be published here once confirmed.
    </p>
  );
}

export default function ImpactBuildPage() {
  const isOpen = impactBuildConfig.status === "open";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({ name: title, url: `${siteConfig.url}/impact-build`, description }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbListSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Impact Build", url: `${siteConfig.url}/impact-build` },
            ]),
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(impactBuildFaq)) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper py-14 sm:py-16 lg:py-20">
        <div aria-hidden className="bg-grid-paper absolute inset-0 opacity-50" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_82%_20%,var(--color-teal-tint),transparent)]"
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal immediate>
              <Eyebrow className="text-center">Kipeo Impact Build</Eyebrow>
            </Reveal>
            <Reveal immediate delay={0.06}>
              <h1 className="text-display-1 mt-5 text-paper-foreground [text-wrap:balance]">
                One useful digital project, built to support meaningful work.
              </h1>
            </Reveal>
            <Reveal immediate delay={0.12}>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate">
                Kipeo Digital invites applications from organisations and purpose-led initiatives that need a
                practical website, platform or small operational system. One suitable application may be selected
                for a clearly scoped project with Kipeo&rsquo;s development fee waived.
              </p>
            </Reveal>
            <Reveal immediate delay={0.18}>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                {isOpen && (
                  <Button href="/impact-build/apply" variant="accent" size="lg">
                    Apply for the Impact Build
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Button>
                )}
                <Button href="#what-is-included" variant="outline" size="lg">
                  Review what is included
                </Button>
              </div>
            </Reveal>
            <Reveal immediate delay={0.22}>
              <p className="mt-6 text-xs font-medium uppercase tracking-wide text-slate-muted">
                Third-party costs remain separate. Selection is based on suitability — not chance.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Why it exists */}
      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Eyebrow>Why it exists</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display-2 mt-4 text-paper-foreground">
              Digital capability should help useful ideas move forward.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
              Some organisations have a genuine operational or community need but cannot currently fund a
              professionally developed digital solution. The Kipeo Impact Build reserves part of our development
              capacity for one project where thoughtful technology could make a practical difference.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* What may be built */}
      <Section tone="elevated">
        <Reveal>
          <Eyebrow>What may be built</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display-3 mt-4 max-w-2xl text-paper-foreground">
            Applications may be considered for a focused, achievable project.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <BulletList items={eligibleProjectTypes} />
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-muted">
            The final solution and scope depend on the applicant&rsquo;s needs, Kipeo&rsquo;s capabilities and what
            can be delivered responsibly through the initiative. The Impact Build does not fund a large custom
            application, unlimited functionality, a large e-commerce catalogue, a complete enterprise system,
            unlimited integrations, or ongoing development.
          </p>
        </Reveal>
      </Section>

      {/* What is included */}
      <Section id="what-is-included" tone="paper">
        <Reveal>
          <Eyebrow>What is included</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display-3 mt-4 max-w-2xl text-paper-foreground">
            Depending on the agreed scope, the selected project may include:
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <BulletList items={possibleIncludedWork} />
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-muted">
            Not every item applies to every project — the agreed scope determines what is actually delivered.
          </p>
        </Reveal>
      </Section>

      {/* What remains separate */}
      <Section tone="elevated">
        <Reveal>
          <Eyebrow>What remains separate</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-paper-foreground sm:text-lg">
            Kipeo&rsquo;s development fee for the final agreed scope will be waived. The recipient remains
            responsible for approved third-party expenses.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate">Commonly separate items include:</p>
          <BulletList items={separateCostItems} />
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-muted">
            No third-party cost may be incurred without the recipient&rsquo;s prior written approval. The complete
            project is not universally &ldquo;free&rdquo; without this qualification.
          </p>
        </Reveal>
      </Section>

      {/* Who may apply */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Who may apply</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-display-3 mt-4 text-paper-foreground">Eligible applicants</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-5 flex flex-col gap-2.5">
                {eligibleApplicantTypes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate sm:text-base">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-strong" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.06}>
              <h2 className="text-display-3 mt-4 text-paper-foreground lg:mt-[2.6rem]">Applicants must</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-5 flex flex-col gap-2.5">
                {applicantRequirements.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate sm:text-base">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-strong" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Selection criteria */}
      <Section tone="elevated">
        <Reveal>
          <Eyebrow>Selection criteria</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display-3 mt-4 max-w-2xl text-paper-foreground">
            Applications are assessed against these criteria.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <BulletList items={selectionCriteria} />
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-2xl text-sm font-medium leading-relaxed text-paper-foreground">
            Selection is based on suitability and potential practical impact. It is not random, and submitting an
            application does not guarantee selection.
          </p>
        </Reveal>
      </Section>

      {/* How selection works */}
      <Section tone="paper">
        <Reveal>
          <Eyebrow>How selection works</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display-3 mt-4 max-w-2xl text-paper-foreground">The process, stage by stage.</h2>
        </Reveal>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {selectionStages.map((stage, index) => (
            <Reveal key={stage.title} delay={0.08 + index * 0.05}>
              <li className="h-full rounded-2xl border border-neutral-200 bg-paper-elevated p-5">
                <p className="font-mono text-xs text-teal-strong">0{index + 1}</p>
                <p className="mt-2 text-base font-medium text-paper-foreground">{stage.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{stage.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.4}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-slate-muted">
            Kipeo may choose not to select a project if no application is suitable, sufficiently prepared or
            responsibly deliverable. Kipeo does not publicly identify applicants or the selected recipient without
            separate written consent.
          </p>
        </Reveal>
      </Section>

      {/* Current application status */}
      <Section id="status" tone="elevated">
        <Reveal>
          <Eyebrow>Current application status</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-4 max-w-2xl">
            <StatusPanel />
          </div>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section tone="paper">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display-3 mt-4 text-paper-foreground">Frequently asked questions</h2>
        </Reveal>
        <div className="mt-8 grid gap-3 lg:grid-cols-2">
          {impactBuildFaq.map((item, index) => (
            <Reveal key={item.question} delay={0.08 + index * 0.03}>
              <details className="group rounded-xl border border-neutral-200 bg-paper-elevated">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-sm font-medium text-paper-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-strong [&::-webkit-details-marker]:hidden">
                  {item.question}
                </summary>
                <div className="border-t border-neutral-200 px-4 py-4">
                  <p className="text-sm leading-relaxed text-slate">{item.answer}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Apply CTA */}
      <Section tone="ink" className="bg-grid-ink relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,color-mix(in_srgb,var(--color-teal)_14%,transparent),transparent)]"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-display-2 text-ink-foreground">
              {isOpen ? "Ready to apply for the Kipeo Impact Build?" : "Want to be ready for the next cycle?"}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              {isOpen
                ? "Explain the problem, who it affects and what you'd like to build. Kipeo will assess it against the published criteria."
                : "Applications open periodically. Check back here, or get in touch about a normally scoped commercial project in the meantime."}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {isOpen ? (
                <Button href="/impact-build/apply" variant="accent" size="lg" tone="ink">
                  Apply for the Impact Build
                </Button>
              ) : (
                <Button href="/contact" variant="accent" size="lg" tone="ink">
                  Discuss a commercial project
                </Button>
              )}
              <Link
                href="/impact-build/terms"
                className="text-sm font-medium text-ink-muted underline underline-offset-2 hover:text-ink-foreground"
              >
                Read the Impact Build Terms
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
