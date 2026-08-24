import { Database, Globe2, ShieldCheck, Wrench } from "lucide-react";

export type ServiceGroupVisualVariant = "systems" | "operational" | "commerce" | "integration";

/**
 * One hand-built SVG/CSS composition per /services solution group — kept
 * distinct from `capability-visual.tsx` (/work's six panels) even where
 * the subject matter overlaps, since these are separately authored
 * components rather than shared image files, so no two pages can end up
 * showing the literal same asset.
 */
export function ServiceGroupVisual({ variant }: { variant: ServiceGroupVisualVariant }) {
  switch (variant) {
    case "systems":
      return (
        <div className="relative h-full w-full p-6">
          <div className="grid h-full grid-cols-3 gap-3">
            <div className="col-span-2 flex flex-col gap-2 rounded-xl border border-white/10 bg-ink-elevated/60 p-3">
              <div className="flex items-center justify-between">
                <span className="h-2 w-16 rounded-full bg-teal/70" />
                <span className="h-2 w-2 rounded-full bg-teal" />
              </div>
              {[70, 45, 85, 30].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="h-5 w-5 shrink-0 rounded-md bg-white/10" />
                  <span className="h-2 rounded-full bg-white/15" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex-1 rounded-xl border border-white/10 bg-ink-elevated/60 p-3">
                <Database className="h-4 w-4 text-teal" aria-hidden />
                <div className="mt-2 flex flex-col gap-1">
                  {[1, 2, 3].map((i) => (
                    <span key={i} className="h-1.5 rounded-full bg-white/15" />
                  ))}
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center rounded-xl border border-highlight/30 bg-highlight/15 p-3">
                <span className="text-[10px] font-medium text-highlight-foreground/90">API</span>
              </div>
            </div>
          </div>
          <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
            <path d="M63,30 L78,50 L63,68" stroke="var(--color-teal)" strokeOpacity="0.4" strokeWidth="0.6" fill="none" />
          </svg>
        </div>
      );

    case "operational":
      return (
        <div className="grid h-full grid-cols-2 gap-3 p-6">
          <div className="flex flex-col gap-2.5 rounded-xl border border-white/10 bg-ink-elevated/60 p-3.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal text-teal-foreground">
              <ShieldCheck className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-[10px] uppercase tracking-wide text-ink-muted">HSE</span>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="h-3 w-3 shrink-0 rounded-sm border border-teal/60" />
                <span className="h-1.5 flex-1 rounded-full bg-white/15" />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2.5 rounded-xl border border-white/10 bg-ink-elevated/60 p-3.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-highlight text-highlight-foreground">
              <Wrench className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-[10px] uppercase tracking-wide text-ink-muted">Technical</span>
            <div className="mt-1 flex h-10 items-end gap-1">
              {[40, 65, 50, 80, 60].map((h, i) => (
                <span key={i} className="flex-1 rounded-sm bg-highlight/70" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      );

    case "commerce":
      return (
        <div className="relative h-full w-full p-6">
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-elevated/60">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              <span className="ml-2 flex items-center gap-1 text-[9px] text-ink-muted">
                <Globe2 className="h-2.5 w-2.5" aria-hidden />
              </span>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-2 p-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col gap-1 rounded-lg bg-white/5 p-2">
                  <span className="aspect-square w-full rounded-md bg-teal/40" />
                  <span className="h-1.5 w-3/4 rounded-full bg-white/20" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 flex h-16 w-11 flex-col rounded-lg border border-white/10 bg-ink-elevated shadow-panel sm:h-20 sm:w-14">
            <span className="mx-auto mt-2 h-1 w-4 rounded-full bg-white/20" />
            <span className="mx-2 mt-2 flex-1 rounded-md bg-highlight/50" />
          </div>
        </div>
      );

    case "integration":
      return (
        <div className="relative flex h-full w-full items-center justify-center p-6">
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
            <g stroke="var(--color-teal)" strokeOpacity="0.45" strokeWidth="0.8">
              <path d="M50,50 L20,25" />
              <path d="M50,50 L80,25" />
              <path d="M50,50 L20,75" />
              <path d="M50,50 L80,75" />
              <path d="M50,50 L50,15" />
            </g>
            {[
              [20, 25],
              [80, 25],
              [20, 75],
              [80, 75],
              [50, 15],
            ].map(([cx, cy], i) => (
              <rect
                key={i}
                x={cx - 8}
                y={cy - 6}
                width="16"
                height="12"
                rx="3"
                fill="var(--color-ink-elevated)"
                stroke="var(--color-highlight)"
                strokeOpacity="0.4"
              />
            ))}
            <circle cx="50" cy="50" r="10" fill="var(--color-teal)" fillOpacity="0.9" />
            <path d="M46,50 l3,3 l6,-7" stroke="var(--color-teal-foreground)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
  }
}
