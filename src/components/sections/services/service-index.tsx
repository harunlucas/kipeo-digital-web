import { ArrowDown } from "lucide-react";
import type { ServiceFamily } from "@/content/services-page";

/**
 * The opening service index: one row per family, each a plain in-page
 * anchor. Plain `<a href="#id">` rather than `next/link`, so the browser
 * handles the fragment natively: the URL updates, Back returns to the index,
 * the sequential-focus start point moves to the section, and the global
 * `scroll-padding-top` keeps the sticky header off the target. Smooth
 * scrolling comes from `html { scroll-behavior }` and is switched off under
 * reduced motion in globals.css.
 *
 * Hover and keyboard focus share one treatment (`.svc-index-row`): the name
 * underlines left to right, the number brightens and the arrow drops 2px.
 */
export function ServiceIndex({ families }: { families: Pick<ServiceFamily, "id" | "number" | "title">[] }) {
  return (
    <nav aria-labelledby="service-index-label">
      <p id="service-index-label" className="text-sm font-medium text-slate-muted">
        Choose a service
      </p>
      <ol className="mt-3 border-b border-neutral-300">
        {families.map((family) => (
          <li key={family.id} className="border-t border-neutral-300">
            <a
              href={`#${family.id}`}
              className="svc-index-row grid min-h-14 grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-x-3 py-3.5 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:py-4"
            >
              <span aria-hidden className="svc-index-number font-mono text-xs">
                {family.number}
              </span>
              <span className="font-display text-[1.125rem] font-medium leading-snug tracking-[-0.01em] text-paper-foreground sm:text-[1.3125rem]">
                <span className="svc-index-name home-underline">{family.title}</span>
              </span>
              <ArrowDown aria-hidden className="svc-index-arrow h-4 w-4 shrink-0 text-slate" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
