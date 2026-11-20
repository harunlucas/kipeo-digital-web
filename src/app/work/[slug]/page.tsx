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
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbListSchema } from "@/lib/schema";
import { siteConfig } from "@/content/site-config";

export const dynamicParams = false;

const statusLabels: Record<CaseStudy["status"], string> = {
  live: "Live",
  "in-development": "In development",
  maintained: "Maintained",
  completed: "Completed",
};

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
                <Tag>{statusLabels[study.status]}</Tag>
                {study.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal immediate delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-200 bg-ink shadow-panel sm:aspect-[16/10]">
              <Image
                src={study.image}
                alt={study.imageAlt}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>
        </div>
      </Container>

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
