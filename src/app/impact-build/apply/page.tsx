import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ImpactBuildApplyForm } from "@/components/sections/impact-build/apply-form";
import { Headline } from "@/components/ui/headline";
import { StatusLabel } from "@/components/sections/impact-build/status-label";
import { impactBuildConfig } from "@/content/impact-build";
import { buildMetadata } from "@/lib/metadata";

const title = "Apply for Kipeo Impact Build";
const description =
  "Apply for the Kipeo Impact Build, an annual initiative through which one suitable organisation or purpose-led initiative may receive a clearly scoped digital project with Kipeo's development fee waived.";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  alternates: { canonical: "/impact-build/apply" },
  openGraph: { url: "/impact-build/apply", title, description },
  twitter: { title, description },
  // Kept out of the index regardless of status — this is a working form,
  // not a landing destination, and it's closed more often than it's open.
  robots: { index: false, follow: true },
});

const statusCopy: Record<string, { lead: string; accent: string; body: string }> = {
  draft: {
    lead: "Applications are",
    accent: "not yet open.",
    body: "Details for the next Impact Build cycle will be published on the Impact Build page once confirmed.",
  },
  reviewing: {
    lead: "Applications are",
    accent: "being reviewed.",
    body: "The application form is closed while review is underway. Shortlisted applicants may be contacted directly.",
  },
  closed: {
    lead: "Applications are",
    accent: "currently closed.",
    body: "Check the Impact Build page for the current status, or get in touch about a normally scoped commercial project.",
  },
  selected: {
    lead: "A project has",
    accent: "been selected.",
    body: "This cycle's application window has closed. Check the Impact Build page for details on the next cycle.",
  },
};

export default function ImpactBuildApplyPage() {
  const status = impactBuildConfig.status;

  if (status !== "open") {
    const copy = statusCopy[status] ?? statusCopy.draft!;
    return (
      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <Reveal immediate>
              <Eyebrow className="text-center">Kipeo Impact Build</Eyebrow>
            </Reveal>
            <Reveal immediate delay={0.06}>
              <h1 className="section-headline mt-4">
                <Headline lead={copy.lead} accent={copy.accent} />
              </h1>
            </Reveal>
            <Reveal immediate delay={0.1}>
              <div className="mt-5 flex justify-center">
                <StatusLabel />
              </div>
              <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">{copy.body}</p>
            </Reveal>
            <Reveal immediate delay={0.14}>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="/impact-build" variant="primary" size="md">
                  Learn about the initiative
                </Button>
                <Button enquiry variant="outline" size="md">
                  Discuss a normally scoped project
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-paper py-14 sm:py-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Reveal immediate>
            <Eyebrow className="text-center">Kipeo Impact Build</Eyebrow>
          </Reveal>
          <Reveal immediate delay={0.06}>
            <h1 className="section-headline mt-4 text-center">
              <Headline lead="Apply for" accent="Impact Build" />
            </h1>
          </Reveal>
          <Reveal immediate delay={0.1}>
            <div className="mt-5 flex justify-center">
              <StatusLabel />
            </div>
            <p className="mt-3 text-center text-base leading-relaxed text-slate sm:text-lg">
              Explain the problem, who it affects and what you&rsquo;d like to build. Fields marked required help us
              assess the application; everything else is optional context.
            </p>
            <p className="mt-2 text-center text-sm leading-relaxed text-slate">
              Not sure how much detail to give?{" "}
              <Link
                href="/impact-build#example-brief"
                className="font-medium text-teal-strong underline underline-offset-2 hover:text-link-hover"
              >
                See an example project brief
              </Link>
              .
            </p>
          </Reveal>

          <div className="mt-10">
            <ImpactBuildApplyForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
