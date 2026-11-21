import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { AnimatedLink } from "@/components/sections/home/animated-link";
import { teamMembers, collaborationExample } from "@/content/about";
import { siteConfig } from "@/content/site-config";
import { buildMetadata } from "@/lib/metadata";
import { organizationSchema, aboutPageSchema } from "@/lib/schema";

const title = "About Kipeo Digital | The People Behind the Systems";
const description =
  "Kipeo Digital is a Nairobi-based design and engineering studio. Meet the people who map your workflow, design the interface and build the software.";

export const metadata: Metadata = buildMetadata({
  title: { absolute: title },
  description,
  keywords: ["about Kipeo Digital", "software studio Nairobi", "design and engineering studio", "custom software team"],
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title, description },
  twitter: { title, description },
});

/**
 * One grid for the whole page: a narrower left column for each section's
 * heading and a wider right column for its content, so the team names in
 * the hero, the profiles below and their case-study links share one edge.
 * There are no genuine team photos in the repository, so the hero's right
 * column introduces the team in type rather than an image.
 */
const grid = "grid gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-x-20";

export default function AboutPage() {
  return (
    <div className="bg-ivory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema()) }} />

      <section aria-labelledby="about-title" className="pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-14">
        <Container>
          <div className={grid}>
            <div className="lg:self-end">
              <Eyebrow>About Kipeo</Eyebrow>
              <h1 id="about-title" className="hero-headline mt-5">
                <span className="font-display font-semibold text-paper-foreground">Meet the people</span>{" "}
                <span className="pb-[0.08em] font-serif-display italic text-teal-strong">behind the systems.</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate sm:text-lg">
                Kipeo Digital is a Nairobi-based design and engineering studio. You work directly with the people who
                map your workflow, design the interface and build the software.
              </p>
            </div>

            <div className="lg:self-end">
              <h2 className="text-sm font-medium text-slate-muted">The team</h2>
              <ul className="mt-4 border-b border-neutral-300">
                {teamMembers.map((member) => (
                  <li key={member.id} className="border-t border-neutral-300 py-5 sm:py-6">
                    <a
                      href={`#${member.id}`}
                      className="group block rounded-sm focus-visible:outline-offset-4"
                    >
                      <span className="block break-words font-display text-[clamp(1.75rem,1.35rem+1.4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-paper-foreground transition-colors group-hover:text-teal-strong">
                        {member.name}
                      </span>
                      <span className="mt-1.5 block text-sm text-slate sm:text-base">{member.role}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-muted">
                {siteConfig.location} · {siteConfig.serviceArea}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-decisions" className="border-t border-neutral-300 py-16 sm:py-20 lg:py-24">
        <Container>
          <div className={grid}>
            <div>
              <h2 id="about-decisions" className="section-headline">
                <span className="font-display font-semibold text-paper-foreground">How we think</span>{" "}
                <span className="font-serif-display italic text-teal-strong">through a problem</span>
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-slate">
                One decision from each of us, taken from work you can read in full.
              </p>
            </div>

            <div className="divide-y divide-neutral-300 border-y border-neutral-300">
              {teamMembers.map((member) => (
                <article
                  key={member.id}
                  id={member.id}
                  aria-labelledby={`${member.id}-name`}
                  className="py-8 sm:py-10"
                >
                  <h3
                    id={`${member.id}-name`}
                    className="break-words font-display text-2xl font-semibold leading-tight tracking-[-0.01em] text-paper-foreground sm:text-[1.75rem]"
                  >
                    {member.name}
                  </h3>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-slate-muted">
                    <span>{member.project.title}</span>
                    <span aria-hidden className="text-neutral-300">
                      ·
                    </span>
                    <span className="font-medium text-slate">{member.project.status}</span>
                  </p>
                  <p className="mt-5 text-lg font-medium leading-snug text-paper-foreground sm:text-xl">
                    {member.decision}
                  </p>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-slate">{member.detail}</p>
                  <p className="mt-4 text-sm text-slate-muted">{member.project.credit}</p>
                  <AnimatedLink href={member.project.href} className="mt-3">
                    {member.project.linkLabel}
                  </AnimatedLink>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-collaboration" className="pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <div className={grid}>
            <div>
              <h2 id="about-collaboration" className="section-headline">
                <span className="font-display font-semibold text-paper-foreground">What working with us</span>{" "}
                <span className="font-serif-display italic text-teal-strong">looks like</span>
              </h2>
              <AnimatedLink href="/studio" className="mt-5">
                See how we work
              </AnimatedLink>
            </div>

            <figure className="border-l border-teal-strong/40 pl-5 sm:pl-7">
              <figcaption className="font-mono text-xs uppercase tracking-[0.2em] text-teal-strong">
                For example
              </figcaption>
              <p className="mt-4 text-lg leading-relaxed text-paper-foreground sm:text-xl">
                {collaborationExample.lead}
              </p>
              <ol className="mt-5 space-y-2.5">
                {collaborationExample.questions.map((question, index) => (
                  <li key={question} className="flex items-baseline gap-4 text-base text-paper-foreground sm:text-lg">
                    <span aria-hidden className="font-mono text-sm text-teal-strong/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {question}
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-base leading-relaxed text-slate sm:text-lg">{collaborationExample.close}</p>
            </figure>
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-next" className="border-t border-neutral-300 pb-24 pt-16 sm:pb-28 sm:pt-20">
        <Container>
          <div className="max-w-2xl">
            <h2 id="about-next" className="section-headline">
              <span className="font-display font-semibold text-paper-foreground">What does your team need</span>{" "}
              <span className="font-serif-display italic text-teal-strong">to do better?</span>
            </h2>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg">
                Start a project
              </Button>
            </div>
            <p className="mt-8 text-sm text-slate-muted">
              Or email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-paper-foreground underline decoration-paper-foreground/30 underline-offset-4 transition-colors hover:text-teal-strong hover:decoration-teal-strong/50"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
