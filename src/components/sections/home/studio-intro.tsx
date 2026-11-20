"use client";

import { useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import { useEnterOnce } from "@/lib/use-enter-once";
import { AnimatedLink } from "./animated-link";

/**
 * Clean, text-led layout — no team photo, since none exists yet that's
 * cleared for use. The headline is the studio's own framing (see
 * `/studio`): one connected team across strategy, interface, application
 * logic, data and deployment, not separate departments handing work off.
 *
 * Deliberately quieter than the hero: no light sweep, just one curved teal
 * stroke under "designing and building", drawn once on entry
 * (`.studio-scribble`, in globals.css).
 *
 * The phrase is a no-wrap inline-block, so on narrow screens it moves to
 * its own line as a unit and the stroke can never be split across lines.
 * Its bottom padding makes room for the stroke below the descenders in
 * "designing"; the SVG's viewBox is roughly the phrase's own em-proportions,
 * so the stretched (`preserveAspectRatio="none"`) curve keeps an even weight
 * at every font size.
 */
export function StudioIntro() {
  const phraseRef = useRef<HTMLSpanElement>(null);
  const [isDrawn, setIsDrawn] = useState(false);

  useEnterOnce(phraseRef, () => setIsDrawn(true));

  return (
    <section className="bg-ivory py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-8 lg:px-12">
        <Eyebrow>The studio</Eyebrow>

        <h2 className="section-headline mt-4 text-balance text-paper-foreground">
          You work directly with the people{" "}
          <span
            ref={phraseRef}
            className="relative inline-block whitespace-nowrap pb-[0.32em] font-serif-display italic text-teal-strong"
          >
            designing and building
            <svg
              aria-hidden
              focusable="false"
              viewBox="0 0 370 10"
              preserveAspectRatio="none"
              className={cn(
                "studio-scribble absolute bottom-0 left-0 h-[0.25em] w-full overflow-visible",
                isDrawn && "is-drawn",
              )}
            >
              <path
                d="M3 7 C 95 2.5, 250 1.5, 367 5"
                pathLength={1}
                fill="none"
                stroke="var(--color-teal-strong)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          your project.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
          Strategy, interface design, application logic, data and deployment are handled as one connected
          process, not passed between separate teams.
        </p>

        <div className="mt-8 flex justify-center">
          <AnimatedLink href="/about">About Kipeo</AnimatedLink>
        </div>
      </div>
    </section>
  );
}
