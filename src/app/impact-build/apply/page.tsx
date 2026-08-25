import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ImpactBuildApplyForm } from "@/components/sections/impact-build/apply-form";
import { impactBuildConfig } from "@/content/impact-build";
import { buildMetadata } from "@/lib/metadata";

const title = "Apply for the Kipeo Impact Build";
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

const statusCopy: Record<string, { heading: string; body: string }> = {
  draft: {
    heading: "Applications are not yet open.",
    body: "Details for the next Impact Build cycle will be published on the Impact Build page once confirmed.",
  },
  reviewing: {
    heading: "Applications for the current Impact Build are being reviewed.",
    body: "The application form is closed while review is underway. Shortlisted applicants may be contacted directly.",
  },
  closed: {
    heading: "Applications are currently closed.",
    body: "Check the Impact Build page for the current status, or get in touch about a normally scoped commercial project.",
  },
  selected: {
    heading: "A project has been selected for the current Impact Build.",
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
              <h1 className="text-display-2 mt-4 text-paper-foreground">{copy.heading}</h1>
            </Reveal>
            <Reveal immediate delay={0.1}>
              <p className="mt-4 text-base leading-relaxed text-slate">{copy.body}</p>
            </Reveal>
            <Reveal immediate delay={0.14}>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="/impact-build" variant="primary" size="md">
                  Learn about the initiative
                </Button>
                <Button href="/contact" variant="outline" size="md">
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
            <h1 className="text-display-2 mt-4 text-center text-paper-foreground">Apply for the Impact Build</h1>
          </Reveal>
          <Reveal immediate delay={0.1}>
            <p className="mt-4 text-center text-sm leading-relaxed text-slate sm:text-base">
              Explain the problem, who it affects and what you&rsquo;d like to build. Fields marked required help us
              assess the application; everything else is optional context.
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
