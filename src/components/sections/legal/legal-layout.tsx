import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";

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
  children,
}: {
  eyebrow?: string;
  title: string;
  lastUpdated: string;
  toc: LegalTocItem[];
  children: ReactNode;
}) {
  return (
    <>
      <section id="top" className="border-b border-neutral-200 bg-paper-elevated py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="text-display-2 mt-4 text-paper-foreground">{title}</h1>
            <p className="mt-3 text-sm text-slate-muted">Last updated {lastUpdated}</p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-[760px]">
            {toc.length > 0 && (
              <nav aria-label="Table of contents" className="mb-12 rounded-2xl border border-neutral-200 bg-mist/60 p-5 sm:p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-muted">On this page</p>
                <ul className="mt-3 flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm font-medium text-teal-strong underline underline-offset-2 hover:text-ink"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="flex flex-col gap-10">{children}</div>

            <div className="mt-14 border-t border-neutral-200 pt-6">
              <a href="#top" className="text-sm font-medium text-teal-strong underline underline-offset-2 hover:text-ink">
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
      <h2 className="text-display-3 text-paper-foreground">{heading}</h2>
      <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-slate sm:text-base">{children}</div>
    </section>
  );
}
