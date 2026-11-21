import { Plus } from "lucide-react";
import { Container } from "@/components/layout/container";
import { AnimatedLink } from "@/components/sections/home/animated-link";
import type { ServiceFamily } from "@/content/services-page";
import { ServiceSampleBlock } from "./service-samples";

/**
 * One service family on /services. `.svc-family` (globals.css) places three
 * pieces with named grid areas, so each exists once in the DOM:
 *
 * - mobile: name and buyer's question → deliverables and example → enquiry link
 * - desktop: name, question and enquiry link on the left; deliverables,
 *   example and full scope on the right
 *
 * With `wideSample` (service 02's paired records) the example moves to its
 * own full-width row under both columns, so each record is wide enough to
 * read; on mobile it still comes before the enquiry link.
 *
 * The section carries the family's id, the anchor the header menu, footer
 * and Insights articles link to. `scroll-padding-top` on `html` keeps the
 * sticky header clear of the section's top rule when it is the target.
 */
export function ServiceFamilySection({ family }: { family: ServiceFamily }) {
  const headingId = `${family.id}-heading`;

  return (
    <section id={family.id} aria-labelledby={headingId} className="border-t border-neutral-300">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className={family.wideSample ? "svc-family svc-family--wide" : "svc-family"}>
          <div className="svc-family-head">
            <p aria-hidden className="font-mono text-xs text-teal-strong">
              {family.number} / 05
            </p>
            <h2
              id={headingId}
              className="mt-3 font-display text-[clamp(1.75rem,1.4rem+1.3vw,2.375rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-paper-foreground [text-wrap:balance]"
            >
              {family.title}
            </h2>
            <p className="mt-5 max-w-[26ch] font-serif-display text-[clamp(1.375rem,1.2rem+0.7vw,1.75rem)] italic leading-[1.25] text-teal-strong lg:max-w-none">
              <span className="sr-only">The question this answers: </span>
              <span aria-hidden>“</span>
              {family.question}
              <span aria-hidden>”</span>
            </p>
          </div>

          <div className="svc-family-body">
            <p className="max-w-[62ch] text-base leading-relaxed text-paper-foreground sm:text-lg">{family.intro}</p>

            {family.deliverables ? (
              <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
                {family.deliverables.map((item) => (
                  <li key={item.title} className="border-t border-neutral-300 pb-5 pt-4">
                    <h3 className="text-base font-semibold text-paper-foreground">{item.title}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate">{item.detail}</p>
                  </li>
                ))}
              </ul>
            ) : null}

            {family.wideSample ? null : (
              <div className="mt-8 sm:mt-10">
                <ServiceSampleBlock sample={family.sample} />
              </div>
            )}

            <details className="group mt-10 border-y border-neutral-300">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-medium text-paper-foreground transition-colors hover:text-teal-strong [&::-webkit-details-marker]:hidden">
                <span>
                  Full service scope
                  <span className="sr-only">: {family.title}</span>
                </span>
                <Plus
                  aria-hidden
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                />
              </summary>
              <div className="pb-6 pt-2">
                <ul className="gap-x-10 text-sm leading-relaxed text-slate sm:columns-2">
                  {family.scope.map((item) => (
                    <li key={item} className="break-inside-avoid py-1">
                      {item}
                    </li>
                  ))}
                </ul>
                {family.scopeNote ? (
                  <p className="mt-5 max-w-[62ch] text-sm leading-relaxed text-paper-foreground">{family.scopeNote}</p>
                ) : null}
                {family.scopeLinks ? (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-slate-muted">Related specialist expertise</p>
                    <ul className="mt-1">
                      {family.scopeLinks.map((link) => (
                        <li key={link.href}>
                          <AnimatedLink href={link.href} externalHost={link.host} className="text-sm sm:text-sm">
                            {link.label}
                          </AnimatedLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </details>
          </div>

          {family.wideSample ? (
            <div className="svc-family-wide">
              <ServiceSampleBlock sample={family.sample} />
            </div>
          ) : null}

          <div className="svc-family-cta">
            <AnimatedLink href={family.cta.href}>{family.cta.label}</AnimatedLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
