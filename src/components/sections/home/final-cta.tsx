"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useEnterOnce } from "@/lib/use-enter-once";
import { AnimatedLink } from "./animated-link";

type SignalGeometry = {
  /** Y of the grid line the signal rides, which passes through the
   *  primary button's vertical centre. */
  lineY: number;
  /** Where the signal's head stops: just short of the button's left edge. */
  stopX: number;
};

/**
 * The homepage's closing question.
 *
 * DECORATIVE LAYER. Everything behind the words — the engineering grid, the
 * ambient teal and violet light, and the one-off signal — sits in a single
 * `aria-hidden` layer (`.cta-decor`) whose mask fades it to transparent over
 * the bottom 112px. The section and the footer below are both `bg-ink`, so
 * once the layer has faded out the two meet on exactly the same colour with
 * no visible edge. The mask is on that layer only: the heading and actions
 * sit above it, unmasked and crisp. The bottom padding keeps the actions
 * clear of the fade band.
 *
 * The grid itself is masked a second time (`.cta-grid`): faint behind the
 * words, fuller towards the outer edges.
 *
 * SIGNAL. When the section first enters view, a short mint pulse runs along
 * one grid line from the left edge to the "Start a project" button, then the
 * button's edge lights briefly and settles. Played once. The grid is offset
 * so that one of its horizontal lines passes exactly through the button's
 * vertical centre (measured, and re-measured on resize), so the signal
 * genuinely rides an existing line and points straight at the button while
 * staying clear of the heading above it. Under reduced motion the sequence
 * is never armed, leaving the finished static design.
 */
export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonWrapRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<SignalGeometry | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = buttonWrapRef.current;
    if (!section || !wrap) return;

    const measure = () => {
      const button = wrap.firstElementChild as HTMLElement | null;
      if (!button) return;
      const s = section.getBoundingClientRect();
      const b = button.getBoundingClientRect();
      setGeometry({
        lineY: Math.round(b.top - s.top + b.height / 2),
        stopX: Math.max(0, Math.round(b.left - s.left - 10)),
      });
    };

    // Fires once on observe, then on any layout change of either element.
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useEnterOnce(sectionRef, () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setHasEntered(true);
  });

  const play = hasEntered && geometry !== null;

  return (
    <section
      ref={sectionRef}
      className={cn("relative overflow-hidden bg-ink text-ink-foreground", play && "cta-play")}
      style={
        geometry
          ? ({
              "--cta-line-y": `${geometry.lineY}px`,
              "--cta-stop-x": `${geometry.stopX}px`,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div aria-hidden className="cta-decor pointer-events-none absolute inset-0">
        <div className="cta-grid absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,color-mix(in_srgb,var(--color-teal)_14%,transparent),transparent)]" />
        <div className="animate-spotlight absolute -bottom-32 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-highlight/10 blur-[120px]" />
        {geometry ? (
          <div className="cta-signal-track">
            <span className="cta-signal" />
          </div>
        ) : null}
      </div>

      <Container className="relative pb-36 pt-20 sm:pb-40 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Deliberately not wrapped in `Reveal`: it server-renders its
              start state (`opacity: 0`) and, once the browser reports reduced
              motion, never animates to visible — the question vanished. */}
          <h2 className="text-balance font-display text-[clamp(2.25rem,1.4rem+3.2vw,4rem)] leading-[1.05] tracking-[-0.02em] text-ink-foreground">
            What would you like to
            <br className="hidden lg:inline" />{" "}
            <span className="font-serif-display text-[1.06em] italic tracking-normal text-teal-200">
              build or improve?
            </span>
          </h2>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <div ref={buttonWrapRef} className="flex">
              <Button
                enquiry
                variant="accent"
                size="lg"
                tone="ink"
                className="cta-primary relative"
              >
                Start a project
              </Button>
            </div>
            <AnimatedLink
              href="/work"
              className="text-ink-foreground hover:text-teal-200 motion-reduce:decoration-ink-foreground/50"
            >
              See our work
            </AnimatedLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
