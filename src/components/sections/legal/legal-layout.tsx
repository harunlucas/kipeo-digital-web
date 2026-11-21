import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { footerLegalLinks } from "@/content/navigation";

export type LegalTocItem = { id: string; label: string };

/**
 * Shared shell for the four legal/governance pages: compact hero with a
 * visible last-updated date, an optional table of contents, a
 * ~720px reading column (matches the 680–800px brief), and a back-to-top
 * link. Anchor offset for `#top` and each `LegalSection` id comes from the
 * global `scroll-padding-top` in globals.css — no per-page override needed
 * since these pages sit under the plain sticky header only.
 */
export function LegalLayout({
  eyebrow = "Legal",
  title,
  lastUpdated,
  toc,
  currentHref,
  children,
}: {
  eyebrow?: string;
  title: string;
  lastUpdated: string;
  toc: LegalTocItem[];
  /** The page's own footer-policy href. When set, the other footer policies are listed at the end. */
  currentHref?: string;
  children: ReactNode;
}) {
  const otherPolicies = currentHref ? footerLegalLinks.filter((link) => link.href !== currentHref) : [];

  return (
    <>
      <section id="top" className="pb-2 pt-12 sm:pt-16">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="section-headline mt-4 font-display font-semibold text-paper-foreground [text-wrap:balance]">
              {title}
            </h1>
            <p className="mt-3 text-sm text-slate-muted">Last updated {lastUpdated}</p>
          </div>
        </Container>
      </section>

      <section className="pb-14 pt-8 sm:pb-20 sm:pt-10">
        <Container>
          <div className="mx-auto max-w-[760px]">
            {toc.length > 0 && (
              <nav aria-label="Table of contents" className="mb-14">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-slate-muted">On this page</p>
                <ul className="mt-3 flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="inline-block py-0.5 text-sm font-medium text-teal-strong underline underline-offset-2 hover:text-link-hover"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="flex flex-col gap-12">{children}</div>

            {otherPolicies.length > 0 && (
              <nav aria-labelledby="other-policies" className="mt-16">
                <h2 id="other-policies" className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-slate-muted">
                  Other policies
                </h2>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                  {otherPolicies.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-block py-1.5 text-sm font-medium text-teal-strong underline underline-offset-2 hover:text-link-hover"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className={otherPolicies.length > 0 ? "mt-10" : "mt-16"}>
              <a href="#top" className="text-sm font-medium text-teal-strong underline underline-offset-2 hover:text-link-hover">
                Back to top
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export function LegalSection({ id, heading, children }: { id: string; heading: string; children: ReactNode }) {
  return (
    <section id={id}>
      <h2 className="font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.01em] text-paper-foreground sm:text-[1.75rem]">
        {heading}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-slate">{children}</div>
    </section>
  );
}
