import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedLink } from "@/components/sections/home/animated-link";
import { ProjectMedia } from "@/components/sections/work/project-media";
import { ProjectImagePair } from "@/components/sections/work/project-image-pair";
import { caseStudies, indexedCaseStudies, statusLabelFor, type CaseStudy } from "@/content/case-studies";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbListSchema } from "@/lib/schema";
import { siteConfig } from "@/content/site-config";

export const dynamicParams = false;

function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return buildMetadata({
    title: { absolute: `${study.title} | Kipeo Digital` },
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      url: `/work/${study.slug}`,
      title: study.title,
      description: study.summary,
    },
    twitter: {
      title: study.title,
      description: study.summary,
    },
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbListSchema([
              { name: "Home", url: siteConfig.url },
              { name: "Work", url: `${siteConfig.url}/work` },
              { name: study.title, url: `${siteConfig.url}/work/${study.slug}` },
            ]),
          ),
        }}
      />

      {study.listing && study.story ? (
        <ProjectStory study={study as StoryStudy} />
      ) : (
        <LegacyCaseStudy study={study} />
      )}
    </>
  );
}

type StoryStudy = CaseStudy & {
  listing: NonNullable<CaseStudy["listing"]>;
  story: NonNullable<CaseStudy["story"]>;
};

function StoryBlock({ id, heading, children }: { id: string; heading: string; children: React.ReactNode }) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-3 border-t border-neutral-300/70 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14"
    >
      <h2 id={id} className="font-display text-xl font-semibold tracking-[-0.01em] text-paper-foreground">
        {heading}
      </h2>
      <div className="max-w-[65ch] text-base leading-relaxed text-slate sm:text-[1.0625rem]">{children}</div>
    </section>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 py-3 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
      <dt className="text-slate-muted">{label}</dt>
      <dd className="font-medium text-paper-foreground">{children}</dd>
    </div>
  );
}

/**
 * The case-study page for a project on the Work index.
 *
 * 1. Header: name, purpose and credit, beside an at-a-glance facts panel.
 * 2. Hero: the project's interface-concept image pair, the same composition
 *    as on the index, shown larger.
 * 3. The account: who it's for, what was built, one workflow shown with
 *    documented evidence (screenshot, source workflow or engine output, kept
 *    exactly as before), and where the project stands.
 * 4. Next project, then a closing invitation.
 *
 * Every statement comes from the project's own source or write-up (see
 * `docs/work-page-sources.md`).
 */
function ProjectStory({ study }: { study: StoryStudy }) {
  const { listing, story } = study;
  const index = indexedCaseStudies.findIndex((item) => item.slug === study.slug);
  const next = indexedCaseStudies[(index + 1) % indexedCaseStudies.length];

  return (
    <div className="bg-ivory">
      <Container className="pt-8 sm:pt-10">
        <Link
          href="/work"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-slate transition-colors hover:text-teal-strong"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Selected work
        </Link>

        <header className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <div>
            <p className="text-sm text-slate-muted">{study.category}</p>
            <h1 className="mt-3 font-display text-[clamp(2.375rem,1.6rem+2.8vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-paper-foreground">
              {study.title}
            </h1>
            <p className="mt-5 max-w-[42rem] text-lg leading-relaxed text-slate sm:text-xl">{listing.purpose}</p>
          </div>

          <dl
            aria-label="Project at a glance"
            className="divide-y divide-neutral-300/70 border-y border-neutral-300 text-sm"
          >
            <Fact label="Status">{statusLabelFor(study)}</Fact>
            <Fact label="Built by">Kipeo Digital team</Fact>
            <Fact label="Used by">{story.audience}</Fact>
            <Fact label="Built with">{story.builtWith.join(", ")}</Fact>
          </dl>
        </header>

        <div className="mt-10 sm:mt-12 lg:mt-14">
          <ProjectImagePair pair={listing.pair} priority />
        </div>
      </Container>

      <Container className="pb-20 sm:pb-24">
        <div className="mt-10 sm:mt-12">
          <StoryBlock id="users" heading="Who it’s for">
            <p>{story.users}</p>
          </StoryBlock>

          <StoryBlock id="contribution" heading="What was built">
            <ul className="space-y-3">
              {story.contribution.map((item) => (
                <li key={item} className="relative pl-5">
                  <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-2.5 bg-slate-muted" />
                  {item}
                </li>
              ))}
            </ul>
          </StoryBlock>

          <section aria-labelledby="workflow" className="border-t border-neutral-300/70 py-10 sm:py-12">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
              <h2 id="workflow" className="font-display text-xl font-semibold tracking-[-0.01em] text-paper-foreground">
                {story.workflowHeading}
              </h2>
              <p className="max-w-[65ch] text-base leading-relaxed text-slate sm:text-[1.0625rem]">{story.workflow}</p>
            </div>
            <figure className="mt-8 lg:ml-[calc((100%-3.5rem)/3+3.5rem)]">
              <ProjectMedia media={listing.media} />
              <figcaption className="mt-3 max-w-[60ch] text-sm leading-relaxed text-slate">
                <span className="mr-2 inline-flex items-center rounded-full border border-teal-strong/30 bg-teal-tint/60 px-2 py-px text-xs font-medium text-teal-strong">
                  {story.evidenceLabel}
                </span>
                {listing.caption}
              </figcaption>
            </figure>
          </section>

          <StoryBlock id="state" heading="Where it stands">
            <p>{story.state}</p>
            {story.stateDetail ? <p className="mt-4 text-[0.9375rem] text-slate-muted">{story.stateDetail}</p> : null}
            <div className="mt-6">
              <AnimatedLink href={story.source.href} externalHost={story.source.host}>
                {story.source.label}
              </AnimatedLink>
            </div>
          </StoryBlock>
        </div>

        {next && next.slug !== study.slug ? (
          <nav aria-label="Next project" className="border-t border-neutral-300 py-10 sm:py-12">
            <Link
              href={`/work/${next.slug}`}
              className="group grid items-center gap-6 rounded-2xl sm:grid-cols-[minmax(0,1fr)_14rem] lg:grid-cols-[minmax(0,1fr)_18rem]"
            >
              <span>
                <span className="block text-sm text-slate-muted">Next project</span>
                <span className="mt-2 flex items-center gap-2 font-display text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)] font-semibold leading-tight tracking-[-0.015em] text-paper-foreground transition-colors group-hover:text-teal-strong">
                  {next.title}
                  <ArrowUpRight
                    className="h-6 w-6 shrink-0 transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] motion-reduce:transition-none"
                    aria-hidden
                  />
                </span>
                <span className="mt-2 block max-w-[42rem] text-base leading-relaxed text-slate">
                  {next.listing.purpose}
                </span>
              </span>
              <Image
                src={next.listing.pair.main.src}
                alt=""
                width={next.listing.pair.main.width}
                height={next.listing.pair.main.height}
                sizes="(min-width: 1024px) 288px, (min-width: 640px) 224px, calc(100vw - 48px)"
                quality={90}
                loading="lazy"
                className="h-auto w-full rounded-xl shadow-[0_0_0_1px_rgb(13_17_23/0.06),0_16px_32px_-24px_rgb(13_17_23/0.45)] transition-transform duration-500 ease-out group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </Link>
          </nav>
        ) : null}

        <div className="border-t border-neutral-300 pt-12 sm:pt-14">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl font-display text-2xl font-semibold leading-snug tracking-[-0.01em] text-paper-foreground">
              Planning something similar?{" "}
              <span className="font-serif-display text-[1.08em] font-normal italic text-teal-strong">Let’s talk it through.</span>
            </p>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
              <Button href="/contact" variant="primary" size="lg">
                Start a project
              </Button>
              <AnimatedLink href="/work">More work</AnimatedLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

/**
 * Published case-study pages that are not promoted on the Work index. Kept
 * as they were so their URLs, metadata and sitemap entries stay valid.
 */
function LegacyCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <>
      <section className="bg-grid-paper relative overflow-hidden bg-paper pb-8 pt-10 sm:pt-12">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,var(--color-teal-tint),transparent)]"
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl">
            <Reveal immediate>
              <Link
                href="/work"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-slate hover:text-paper-foreground"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All work
              </Link>
            </Reveal>
            <Reveal immediate delay={0.06}>
              <Eyebrow className="mt-6">{study.category}</Eyebrow>
            </Reveal>
            <Reveal immediate delay={0.1}>
              <h1 className="text-display-1 mt-4 text-paper-foreground">{study.title}</h1>
            </Reveal>
            <Reveal immediate delay={0.14}>
              <p className="mt-5 text-lg leading-relaxed text-slate">{study.outcomeHeadline}</p>
            </Reveal>
            <Reveal immediate delay={0.18}>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Tag>{statusLabelFor(study)}</Tag>
                {study.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {study.image ? (
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal immediate delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-200 bg-ink shadow-panel sm:aspect-[16/10]">
                <Image
                  src={study.image}
                  alt={study.imageAlt ?? ""}
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      ) : null}

      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-paper-foreground">{study.summary}</p>
          <p className="mt-6 text-sm text-slate-muted">{study.disclosure}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {study.externalHref ? (
              <Button href={study.externalHref} variant="outline" size="md">
                {study.externalLabel ?? "View live project"}
                <ExternalLink className="h-4 w-4" aria-hidden />
              </Button>
            ) : null}
            <Button href="/contact" variant="primary" size="md">
              Start a project
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
