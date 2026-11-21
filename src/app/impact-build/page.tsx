import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Headline } from "@/components/ui/headline";
import { StatusLabel } from "@/components/sections/impact-build/status-label";
import { organizationSchema, webPageSchema, breadcrumbListSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/content/site-config";
import {
  impactBuildConfig,
  eligibleProjectTypes,
  possibleIncludedWork,
  separateCostItems,
  eligibleApplicantTypes,
  selectionCriteria,
  impactBuildFaq,
} from "@/content/impact-build";

const title = "Kipeo Impact Build | Apply for a Supported Digital Project";
const description =
  "Each year, Kipeo Digital may choose one organisation or purpose-led initiative and build a website or small system with our development fee waived. See who can apply, what it costs and how selection works.";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  alternates: { canonical: "/impact-build" },
  openGraph: { url: "/impact-build", title, description },
  twitter: { title, description },
});

const APPLY_HREF = "/impact-build/apply";
const TERMS_HREF = "/impact-build/terms";
const FIT_ID = "is-this-a-fit";

/**
 * Every other FAQ entry is answered in the page body above it, so only these
 * remain. Kept as a filter (not a trimmed array) so the full set in
 * `impactBuildFaq` stays the copy reference for the programme.
 */
const remainingFaqQuestions = new Set([
  "Can an existing Kipeo client apply?",
  "Will applicant information be published?",
]);
const pageFaq = impactBuildFaq.filter((item) => remainingFaqQuestions.has(item.question));

const buildExamples = [
  {
    title: "A website for a community organisation",
    body: "Where people can find your services, opening hours and who to contact.",
  },
  {
    title: "A campaign landing page",
    body: "One page with one clear action, such as signing up, volunteering or coming to an event.",
  },
  {
    title: "A small system for tracking requests",
    body: "A shared list showing each request, who is handling it and what happens next.",
  },
];

const readiness = [
  {
    title: "Someone who can make decisions",
    body: "One person who can approve choices for the project and join discovery and review sessions.",
  },
  {
    title: "The content",
    body: "The words, photos and information the site or system needs, which you own or have permission to use.",
  },
  {
    title: "Someone to look after it",
    body: "A person or team who will keep it running after handover.",
  },
];

const selectionSteps = [
  {
    title: "Send your idea",
    body: "Use the application form to explain the problem, who it affects and what you’d like to build.",
  },
  {
    title: "We review it and may ask questions",
    body: "We assess each application against the criteria below and may contact shortlisted applicants for more detail.",
  },
  {
    title: "If selected, we agree the scope in writing",
    body: "Responsibilities, deliverables, third-party costs, timeline and content are agreed in writing. Work begins only after that agreement is accepted.",
  },
];

const listClass = "mt-4 flex flex-col gap-2 text-sm leading-relaxed text-slate sm:text-base";
const bulletClass = "relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-teal-strong";
const h3Class = "text-lg font-semibold text-paper-foreground";
const textLinkClass =
  "inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-medium text-teal-strong underline decoration-teal-strong/40 underline-offset-4 transition-colors hover:text-link-hover hover:decoration-current";

function BulletList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`${listClass} ${className}`}>
      {items.map((item) => (
        <li key={item} className={bulletClass}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Hero status line and actions. The non-open states keep the programme's existing closed-state messages. */
function HeroActions() {
  const { status, expectedProjectStart } = impactBuildConfig;
  const checkEligibility = (
    <a href={`#${FIT_ID}`} className={textLinkClass}>
      Check eligibility
    </a>
  );

  if (status === "open") {
    return (
      <>
        <StatusLabel />
        {expectedProjectStart && (
          <p className="mt-1 text-sm text-slate">The selected project is expected to start {expectedProjectStart}.</p>
        )}
        <div className="mt-4 flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button href={APPLY_HREF} variant="accent" size="lg" className="self-start">
            Apply for Impact Build
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          {checkEligibility}
        </div>
      </>
    );
  }

  const showRecipient =
    status === "selected" &&
    impactBuildConfig.selectedApplicantPublished &&
    impactBuildConfig.selectedApplicantConsent &&
    impactBuildConfig.selectedApplicantName;

  const message: Record<Exclude<typeof status, "open">, string> = {
    draft: "Details for the next Impact Build cycle will be published here once confirmed.",
    reviewing: "The application form is closed while review is underway. Shortlisted applicants may be contacted directly.",
    closed: "The application form is closed. You can still read how the programme works below.",
    selected: "This cycle’s application window has closed.",
  };

  return (
    <>
      <StatusLabel />
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate">
        {message[status]}
        {showRecipient && <> Selected recipient: {impactBuildConfig.selectedApplicantName}.</>}
      </p>
      <div className="mt-4 flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:flex-wrap sm:items-center">
        {status === "closed" && (
          <Button enquiry variant="outline" size="md" className="self-start">
            Discuss a normally scoped project
          </Button>
        )}
        {checkEligibility}
      </div>
    </>
  );
}

/** An illustrative brief, so a visitor can see the level of detail the application asks for. */
function ExampleBrief() {
  const rows = [
    {
      term: "The problem",
      detail: "Volunteer requests come in by phone and email. Two coordinators often follow up with the same person.",
    },
    {
      term: "Who would use it",
      detail: "The coordinators who receive requests and assign volunteers.",
    },
    {
      term: "What a small build could do",
      detail: "Give them one shared list showing each request, who owns it and whether anyone has replied.",
    },
  ];

  return (
    <figure
      id="example-brief"
      aria-labelledby="example-brief-title"
      className="scroll-mt-6 rounded-2xl border border-neutral-300/80 bg-ivory p-6 shadow-card sm:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p id="example-brief-title" className="font-display text-2xl font-semibold leading-tight tracking-[-0.01em] text-paper-foreground">
          Example project brief
        </p>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-slate-muted">Illustrative</p>
      </div>
      <dl className="mt-6 flex flex-col gap-5">
        {rows.map((row) => (
          <div key={row.term}>
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-teal-strong">{row.term}</dt>
            <dd className="mt-1.5 text-base leading-relaxed text-paper-foreground">{row.detail}</dd>
          </div>
        ))}
      </dl>
      <figcaption className="mt-6 text-sm leading-relaxed text-slate-muted">
        An example, not a real application. Your own answers go in the form&rsquo;s project step, under the problem,
        who will use it and the result you want.
      </figcaption>
    </figure>
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
          __html: JSON.stringify(webPageSchema({ name: title, url: `${siteConfig.url}/impact-build`, description })),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(pageFaq)) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div aria-hidden className="bg-grid-paper absolute inset-0 opacity-40" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_50%_at_85%_30%,var(--color-teal-tint),transparent)]"
        />
        <Container className="relative py-12 sm:py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-16 xl:gap-24">
            <div>
              <Reveal immediate>
                <Eyebrow>Kipeo Impact Build</Eyebrow>
              </Reveal>
              <Reveal immediate delay={0.06}>
                <h1 className="hero-headline mt-5">
                  <Headline stacked lead="A website or small system" accent="for your community project" />
                </h1>
              </Reveal>
              <Reveal immediate delay={0.12}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
                  Each year, we may choose one organisation or purpose-led initiative to work with. If your project is
                  selected, we&rsquo;ll agree on what to build together and waive our development fee for that agreed
                  scope. You cover any third-party costs you approve, such as hosting or a domain.
                </p>
              </Reveal>
              <Reveal immediate delay={0.18}>
                <div className="mt-8">
                  <HeroActions />
                </div>
              </Reveal>
            </div>

            <Reveal immediate delay={0.14}>
              <ExampleBrief />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Is this a fit? */}
      <Section tone="elevated">
        <div className="max-w-2xl">
          <Reveal>
            <h2 id={FIT_ID} tabIndex={-1} className="section-headline scroll-mt-6 focus:outline-none">
              <Headline lead="Is this" accent="a fit?" />
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
              The Impact Build is for people doing useful work who need a digital project but can&rsquo;t currently
              fund one commercially.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.08}>
            <h3 className={h3Class}>Who can apply</h3>
            <BulletList items={eligibleApplicantTypes} />
            <p className="mt-4 text-sm leading-relaxed text-slate-muted">
              We can consider another kind of applicant where it&rsquo;s a good fit.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h3 className={h3Class}>What you&rsquo;d need to bring</h3>
            <dl className="mt-4 flex flex-col gap-4">
              {readiness.map((item) => (
                <div key={item.title}>
                  <dt className="text-base font-medium text-paper-foreground">{item.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-slate sm:text-base">{item.body}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-slate-muted">
              You&rsquo;ll also be asked to give accurate information, explain the problem and who it&rsquo;s for, and
              accept the programme terms.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* What could we build? */}
      <Section tone="paper">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="section-headline"><Headline lead="What could" accent="we build?" /></h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
              Something focused that can be finished properly. For example:
            </p>
          </Reveal>
        </div>

        <ol className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {buildExamples.map((example, index) => (
            <Reveal key={example.title} delay={0.08 + index * 0.05}>
              <li>
                <p aria-hidden className="font-mono text-xs text-teal-strong">
                  0{index + 1}
                </p>
                <h3 className={`${h3Class} mt-2`}>{example.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate sm:text-base">{example.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-slate">
            The Impact Build doesn&rsquo;t cover a large custom application, unlimited features, a large e-commerce
            catalogue, a complete enterprise system, unlimited integrations or ongoing development. The final scope
            depends on what you need and what we can deliver responsibly.
          </p>
          <details className="group mt-4 max-w-2xl">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-medium text-teal-strong [&::-webkit-details-marker]:hidden">
              <Plus className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-45" aria-hidden />
              Every project type we consider
            </summary>
            <BulletList items={eligibleProjectTypes} className="mt-2 pb-2" />
          </details>
        </Reveal>
      </Section>

      {/* What does it cost? */}
      <Section tone="elevated">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="section-headline"><Headline lead="What does" accent="it cost?" /></h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
              Kipeo&rsquo;s development fee for the final agreed scope is waived. Third-party costs stay with you, and
              only once you&rsquo;ve approved them in writing.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.08}>
            <h3 className={h3Class}>What Kipeo covers</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate sm:text-base">
              Our development fee. Depending on the agreed scope, the work can include:
            </p>
            <BulletList items={possibleIncludedWork} />
          </Reveal>
          <Reveal delay={0.12}>
            <h3 className={h3Class}>What you cover</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate sm:text-base">
              Third-party expenses you approve. These commonly include:
            </p>
            <BulletList items={separateCostItems} />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 max-w-2xl">
            <h3 className={h3Class}>How approval works</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate sm:text-base">
              Expected third-party costs are listed in the written agreement before work begins, and no third-party cost
              is incurred without your prior written approval. Defect support lasts 30 days after launch where it&rsquo;s
              part of the agreed scope; maintenance after that is yours unless separately agreed. Work outside the agreed
              scope isn&rsquo;t covered by the waiver and would be costed separately. There&rsquo;s no cash alternative
              to the waiver.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* How selection works */}
      <Section tone="paper">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="section-headline"><Headline lead="How selection" accent="works" /></h2>
          </Reveal>
        </div>

        <ol className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {selectionSteps.map((step, index) => (
            <Reveal key={step.title} delay={0.06 + index * 0.05}>
              <li>
                <p aria-hidden className="font-mono text-xs text-teal-strong">
                  Step {index + 1}
                </p>
                <h3 className={`${h3Class} mt-2`}>{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate sm:text-base">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <div className="mt-12 max-w-3xl">
            <h3 className={h3Class}>What we look for</h3>
            <BulletList items={selectionCriteria} className="sm:grid sm:grid-cols-2 sm:gap-x-8" />
            <p className="mt-6 text-sm leading-relaxed text-slate sm:text-base">
              Selection is based on suitability, not chance, and applying doesn&rsquo;t guarantee selection. We may
              decide not to select a project if no application is suitable, ready or responsibly deliverable.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* FAQ — only questions the page hasn't already answered */}
      {pageFaq.length > 0 && (
        <Section tone="elevated">
          <Reveal>
            <h2 className="section-headline"><Headline lead="Other" accent="questions" /></h2>
          </Reveal>
          <div className="mt-6 max-w-3xl divide-y divide-neutral-200">
            {pageFaq.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left [&::-webkit-details-marker]:hidden">
                  <span className="text-base font-medium text-paper-foreground">{item.question}</span>
                  <Plus
                    className="h-5 w-5 shrink-0 text-teal-strong transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">{item.answer}</p>
              </details>
            ))}
          </div>
        </Section>
      )}

      {/* Apply */}
      <Section id="status" tone="ink">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="section-headline">
              {isOpen ? (
                <Headline tone="ink" lead="Ready to describe" accent="your project?" />
              ) : (
                <Headline tone="ink" lead="Want to be ready" accent="for the next cycle?" />
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-4 flex justify-center">
              <StatusLabel tone="ink" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              {isOpen
                ? "The form has six short steps: about you, your organisation, the project, readiness, consent and a final review. You can go back and change any answer before you submit."
                : "Applications open periodically. Check back here, or get in touch about a normally scoped commercial project in the meantime."}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              {isOpen ? (
                <Button href={APPLY_HREF} variant="accent" size="lg" tone="ink">
                  Apply for Impact Build
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              ) : (
                <Button enquiry variant="accent" size="lg" tone="ink">
                  Discuss a commercial project
                </Button>
              )}
              <Link
                href={TERMS_HREF}
                className="inline-flex min-h-11 items-center text-sm font-medium text-ink-muted underline underline-offset-4 hover:text-ink-foreground"
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
