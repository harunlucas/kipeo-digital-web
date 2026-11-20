"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/cn";
import { useEnterOnce } from "@/lib/use-enter-once";
import { AnimatedLink } from "./animated-link";

type Stage = {
  number: string;
  title: ReactNode;
  description: ReactNode;
  image: string;
};

const stages: Stage[] = [
  {
    number: "01",
    title: (
      <>
        Agree on the <span className="hww-row-phrase home-underline">scope</span>
      </>
    ),
    description: (
      <>
        We map who does what and where work gets stuck. You review a{" "}
        <span className="font-semibold text-paper-foreground">written scope</span> before we build.
      </>
    ),
    image: "/images/how-we-work/kipeo-project-brief.png",
  },
  {
    number: "02",
    title: (
      <>
        Test a <span className="hww-row-phrase home-underline">working version</span>
      </>
    ),
    description: (
      <>
        Try a <span className="font-semibold text-paper-foreground">real task</span> from submission to
        approval. Your feedback guides the next revision.
      </>
    ),
    image: "/images/how-we-work/kipeo-working-prototype.png",
  },
  {
    number: "03",
    title: (
      <>
        Launch and <span className="hww-row-phrase home-underline">hand over</span>
      </>
    ),
    description: (
      <>
        We check the live workflow together and walk through the{" "}
        <span className="font-semibold text-paper-foreground">handover</span> agreed for your project.
      </>
    ),
    image: "/images/how-we-work/kipeo-handover-guide.png",
  },
];

/** One stage row. Its hover response is plain CSS (`.hww-stage`, in globals.css). */
function StageRow({ stage, index }: { stage: Stage; index: number }) {
  return (
    <div
      className={cn(
        "hww-stage",
        `hww-stage-${index + 1}`,
        index > 0 && "border-t border-neutral-300/70 pt-8",
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="flex flex-1 items-start gap-3 sm:gap-4">
          <span className="hww-row-number w-7 shrink-0 font-mono text-sm sm:w-9 sm:text-base">
            {stage.number}
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-paper-foreground sm:text-xl">{stage.title}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate sm:text-base">
              {stage.description}
            </p>
          </div>
        </div>
        <div className="relative aspect-[3/2] w-[11.25rem] shrink-0 self-start sm:w-[13.5rem]">
          <Image
            src={stage.image}
            alt=""
            fill
            sizes="(min-width: 640px) 13.5rem, 11.25rem"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * "How we work" as an intro column beside three stage rows, matching "What
 * we build"'s width, gutters, ivory background and heading treatment.
 *
 * `.hww-layout` (in globals.css, next to `.wwb-layout` it's modelled on)
 * handles the one piece Tailwind utilities can't: the "Explore our process"
 * link sits under the intro in the left column on desktop, but moves to
 * after the third stage on mobile. Five grid children — intro, link, and
 * the three stages — are repositioned per breakpoint via named areas rather
 * than reordered in the DOM.
 *
 * "work" uses the homepage's shared `.phrase-sweep` (globals.css, also on
 * the hero) to sweep once it has entered the viewport (`hasEnteredView`)
 * and replay on pointer-enter via `sweepKey` remounting the span — changing
 * `key` is a plain, reliable way to restart a CSS `animation` without manual
 * class-toggle/reflow tricks. Each row's number/underline response is pure
 * CSS hover, with a static underline on touchscreens.
 */
export function HowWeWork() {
  const phraseRef = useRef<HTMLSpanElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);

  useEnterOnce(phraseRef, () => setHasEnteredView(true));

  return (
    <section className="bg-ivory pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pt-24">
      <Container>
        <div className="hww-layout">
          <div className="hww-intro">
            <h2 className="section-headline">
              <span className="block font-display font-semibold text-paper-foreground">How we</span>
              <span
                ref={phraseRef}
                key={sweepKey}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse" && hasEnteredView) {
                    setSweepKey((value) => value + 1);
                  }
                }}
                className={cn(
                  "phrase-sweep block pb-[0.05em] font-serif-display italic",
                  hasEnteredView && "is-sweeping",
                )}
              >
                work
              </span>
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-slate sm:text-lg">
              Review the scope, try a{" "}
              <span className="font-semibold text-paper-foreground">working version</span> and see exactly
              what your team takes over at launch.
            </p>
          </div>

          <div className="hww-link">
            <AnimatedLink href="/studio">Explore our process</AnimatedLink>
          </div>

          {stages.map((stage, index) => (
            <StageRow key={stage.number} stage={stage} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
