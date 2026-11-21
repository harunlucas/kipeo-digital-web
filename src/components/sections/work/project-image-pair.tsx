"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ImagePair } from "@/content/case-studies";
import { cn } from "@/lib/cn";
import { useEnterOnce } from "@/lib/use-enter-once";

const FINE_HOVER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * One large interface concept with a smaller companion pinned over its lower
 * edge (see `.work-pair` in globals.css for the geometry).
 *
 * The companion is three nested wrappers, each owning one transform, so no
 * state can overwrite another's:
 *   `.work-pair-pin`     placement only (side, inset, overlap), never animated
 *   `.work-pair-rock`    rotation about the pinned corner: rests at a slight
 *                        angle, rocks once (−2° → +2° → rest, 4.5s) on entering view
 *   `.work-pair-breathe` the hover rise and scale
 * The main image has its own `.work-pair-breathe` for its hover scale.
 *
 * Hover breathing loops while a fine pointer is over the pair. On leave the
 * current cycle is allowed to finish (`animationiteration`), and every cycle
 * starts and ends at rest, so neither entering nor leaving can snap.
 * Touch devices and reduced motion get the finished static composition: the
 * rock is never armed and the breathing never starts.
 *
 * Source files are full-resolution lossless WebP. `next/image` serves a
 * resized variant for each slot (`sizes`, matching `.work-entry` and
 * `.work-pair` in globals.css) at quality 90, so the interface lettering
 * stays sharp without shipping the 1.1–1.4 MB masters. Explicit width/height
 * keep their space reserved.
 */
const MAIN_SIZES = "(min-width: 1280px) 680px, (min-width: 1024px) 52vw, calc(100vw - 48px)";
const PINNED_SIZES = "(min-width: 1280px) 260px, (min-width: 1024px) 20vw, 50vw";
export function ProjectImagePair({ pair, priority = false }: { pair: ImagePair; priority?: boolean }) {
  const figureRef = useRef<HTMLElement>(null);
  const [rocking, setRocking] = useState(false);
  const [breathing, setBreathing] = useState(false);
  const stopAfterCycle = useRef(false);

  useEnterOnce(figureRef, () => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    setRocking(true);
  });

  // If reduced motion is switched on mid-session, stop any breathing at once.
  useEffect(() => {
    const mql = window.matchMedia(REDUCED_MOTION);
    const onChange = () => mql.matches && setBreathing(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  function onPointerEnter(event: React.PointerEvent) {
    if (event.pointerType !== "mouse") return;
    if (!window.matchMedia(FINE_HOVER).matches || window.matchMedia(REDUCED_MOTION).matches) return;
    stopAfterCycle.current = false;
    setBreathing(true);
  }

  function onPointerLeave(event: React.PointerEvent) {
    if (event.pointerType !== "mouse") return;
    stopAfterCycle.current = true;
  }

  // Only the main image's own breathing animation decides when a cycle ends;
  // it and the companion share one duration, so they finish together.
  function onCycleBoundary(event: React.AnimationEvent) {
    if (event.target !== event.currentTarget) return;
    if (stopAfterCycle.current) {
      stopAfterCycle.current = false;
      setBreathing(false);
    }
  }

  const { pin } = pair;
  const style = {
    "--pin-inset": `${pin.inset}%`,
    "--pin-width": `${pin.width}%`,
    "--pin-overlap": pin.overlap,
    "--pin-inset-sm": `${pin.mobile.inset}%`,
    "--pin-width-sm": `${pin.mobile.width}%`,
    "--pin-overlap-sm": pin.mobile.overlap,
    "--pin-ratio": pair.pinned.height / pair.pinned.width,
    "--pin-rest": `${pin.rest}deg`,
  } as React.CSSProperties;

  return (
    <figure
      ref={figureRef}
      className={cn("work-pair", `work-pair--${pin.side}`, rocking && "is-rocking", breathing && "is-breathing")}
      style={style}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className="work-pair-stage">
        <div className="work-pair-breathe work-pair-breathe--main" onAnimationIteration={onCycleBoundary}>
          <Image
            src={pair.main.src}
            alt={pair.main.alt}
            width={pair.main.width}
            height={pair.main.height}
            sizes={MAIN_SIZES}
            quality={90}
            preload={priority}
            loading={priority ? undefined : "lazy"}
            className="work-pair-main"
          />
        </div>

        <div className="work-pair-pin">
          <div className="work-pair-rock">
            <div className="work-pair-breathe work-pair-breathe--pinned">
              <div className="work-pair-frame">
                <Image
                  src={pair.pinned.src}
                  alt={pair.pinned.alt}
                  width={pair.pinned.width}
                  height={pair.pinned.height}
                  sizes={PINNED_SIZES}
                  quality={90}
                  loading="lazy"
                  className="block h-auto w-full rounded-[6px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 max-w-[60ch] text-sm leading-relaxed text-slate">
        <span className="mr-2 inline-flex items-center rounded-full border border-neutral-300 px-2 py-px text-xs font-medium text-slate-muted">
          Interface concepts
        </span>
        {pair.caption}
      </figcaption>
    </figure>
  );
}
