"use client";

import { PLATES, SystemStack } from "./system-stack-artwork";

/**
 * The homepage hero's right column: the isometric three-layer stack and its
 * layer labels ("Web platform", "API services", "Data layer").
 *
 * Stays a client component: `PLATES` is plain data exported from a
 * `"use client"` module, which a server component can't read.
 */
export function ReleaseEnvironment() {
  return (
    <div>
      {/*
        If the supplied `public/images/kipeo-system-stack.png` is restored,
        this whole block becomes:
          <Image src="/images/kipeo-system-stack.png" alt={…} width={W} height={H}
                 sizes="(min-width: 1024px) 60vw, 100vw" priority
                 className="h-auto w-full" />
        with W/H taken from the file's real pixel dimensions — that artwork
        carries its own labels, so the two label treatments below go with it.

        The layer names are HTML rather than SVG text so they stay at a fixed,
        readable size instead of shrinking with the artwork. From `lg` up they
        are pinned beside their plate using each plate's centre percentage;
        below `lg` the column is too narrow for side labels, so they become a
        legend underneath.
      */}
      {/* No `items-start` here: the label column is positioned-empty, so it
          only has a height to resolve each label's `top: %` against while the
          grid stretches it to match the artwork. */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-1">
        <SystemStack className="h-auto w-full" />

        <div className="relative hidden lg:block lg:w-[124px]">
          {PLATES.map((plate) => (
            <span
              key={plate.label}
              style={{ top: `${plate.centre}%` }}
              className="absolute left-0 -translate-y-1/2 text-sm font-medium text-paper-foreground"
            >
              {plate.label}
            </span>
          ))}
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 lg:hidden">
          {PLATES.map((plate) => (
            <li key={plate.label} className="flex items-center gap-2 text-sm text-slate">
              <span
                aria-hidden
                style={{ backgroundColor: plate.swatch }}
                className="h-2.5 w-2.5 shrink-0 rounded-[2px] ring-1 ring-inset ring-ink/20"
              />
              {plate.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
