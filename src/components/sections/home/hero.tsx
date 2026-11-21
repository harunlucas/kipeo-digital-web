import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ReleaseEnvironment } from "./release-environment";

/**
 * Two populated columns on one continuous ivory field: the studio message at
 * 40% and the release-environment visual at 60%. Both sit inside the same
 * `Container` the header uses, so the headline's left edge lines up with the
 * logo. The grid collapses to a single column below `lg` with the copy first.
 *
 * The section is sized by its contents rather than the viewport — a forced
 * full height would leave a dead band under the controls on short screens.
 *
 * The headline's intended desktop arrangement — "We build the / systems /
 * your business / runs on." — is set by two `<br>`s that only exist from
 * `lg` up (`hidden lg:inline` removes and restores them). Leaving it to a
 * `ch`-based max-width would make the break point depend on each face's
 * glyph metrics; below `lg` the breaks are gone and the text wraps
 * naturally. Either way the H1 stays one run of selectable text.
 */
export function Hero() {
  return (
    <section className="bg-ivory pb-16 pt-4 sm:pb-20 sm:pt-4 lg:pb-24 lg:pt-4">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[40fr_60fr] lg:items-center lg:gap-16">
          <div>
            <h1 className="hero-headline">
              <span className="block font-display font-semibold text-paper-foreground">
                We build the
                <br className="hidden lg:inline" /> systems
              </span>{" "}
              {/* `pb` leaves room for the italic descenders in "your" and "business".
                  The light sweep plays once on load (see `.phrase-sweep`). */}
              <span
                className="phrase-sweep is-sweeping block pb-[0.08em] font-serif-display italic"
                style={{ "--phrase-sweep-delay": "0.35s" } as React.CSSProperties}
              >
                your business
                <br className="hidden lg:inline" /> runs on.
              </span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-relaxed text-slate sm:text-lg">
              Web platforms, custom software and integrations, engineered together.
            </p>

            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Button enquiry variant="primary" size="lg">
                Start a project
              </Button>
              <Link
                href="#what-we-build"
                className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-slate underline decoration-slate/40 underline-offset-4 transition-colors hover:text-paper-foreground hover:decoration-paper-foreground/50"
              >
                Explore services
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <p className="mt-8 text-sm text-slate-muted">Nairobi, Kenya · Working worldwide.</p>
          </div>

          <ReleaseEnvironment />
        </div>
      </Container>
    </section>
  );
}
