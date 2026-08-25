import { Cloud, Globe2, ListChecks, Lock, RefreshCw, Search, ShieldCheck, Tag, Wrench } from "lucide-react";

export type ServiceGroupVisualVariant = "systems" | "operational" | "commerce" | "seo" | "integration";

/**
 * One hand-built SVG/CSS composition per /services solution group, each
 * using a distinct visual metaphor (layered architecture / operational
 * records / device-and-catalogue / pipeline-and-health) so the four groups
 * no longer read as repeated abstract dashboards. Kept distinct from
 * `capability-visual.tsx` (/work's six panels) even where subject matter
 * overlaps, since these are separately authored components, not shared
 * image files — no two pages can end up showing the literal same asset.
 */
export function ServiceGroupVisual({ variant }: { variant: ServiceGroupVisualVariant }) {
  switch (variant) {
    // Software and business systems: layered application architecture —
    // interface, logic, data and permissions fanned out as a real card
    // stack (2D offset, not true 3D perspective, so every layer stays
    // legible instead of being occluded behind the frontmost card).
    case "systems":
      return (
        <div className="relative flex h-full w-full items-center justify-center p-6">
          <div className="relative h-36 w-52 sm:h-40 sm:w-60">
            {[
              { label: "Permissions", offset: 3, tone: "border-highlight/50 bg-highlight/85" },
              { label: "Database", offset: 2, tone: "border-white/15 bg-ink-elevated" },
              { label: "Application logic", offset: 1, tone: "border-teal/60 bg-teal/90" },
              { label: "Interface", offset: 0, tone: "border-neutral-300 bg-paper" },
            ].map((layer) => (
              <div
                key={layer.label}
                className={`absolute flex h-14 w-full items-end rounded-lg border px-3.5 pb-2 shadow-panel sm:h-16 ${layer.tone}`}
                style={{
                  top: `${layer.offset * 26}px`,
                  left: `${layer.offset * 10}px`,
                  zIndex: 4 - layer.offset,
                }}
              >
                <span
                  className={`text-[11px] font-medium ${layer.label === "Interface" ? "text-paper-foreground" : "text-white"}`}
                >
                  {layer.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    // Operational and technical software: an inspection/corrective-action
    // record and an equipment/maintenance state panel side by side, joined
    // by a document-flow connector.
    case "operational":
      return (
        <div className="grid h-full grid-cols-2 gap-3 p-6">
          <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-ink-elevated/60 p-3.5">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-teal" aria-hidden />
              <span className="text-[9px] uppercase tracking-wide text-ink-muted">Inspection record</span>
            </div>
            {["Fire exits clear", "PPE stock checked", "Corrective action logged"].map((item, i) => (
              <div key={item} className="flex items-center gap-1.5">
                <span
                  className={`h-3 w-3 shrink-0 rounded-sm ${i < 2 ? "bg-teal" : "border border-white/25"}`}
                  aria-hidden
                />
                <span className="text-[9px] leading-tight text-ink-foreground/80">{item}</span>
              </div>
            ))}
            <span className="mt-1 flex items-center gap-1 text-[9px] text-highlight">
              <RefreshCw className="h-2.5 w-2.5" aria-hidden />
              Document control
            </span>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-ink-elevated/60 p-3.5">
            <div className="flex items-center gap-1.5">
              <Wrench className="h-3.5 w-3.5 text-highlight" aria-hidden />
              <span className="text-[9px] uppercase tracking-wide text-ink-muted">Equipment state</span>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <svg viewBox="0 0 60 40" className="h-16 w-full" aria-hidden>
                <path
                  d="M2,30 L14,18 L24,24 L36,10 L48,16 L58,4"
                  stroke="var(--color-teal)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {[
                  [2, 30],
                  [24, 24],
                  [48, 16],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="2.5" fill="var(--color-teal)" />
                ))}
              </svg>
            </div>
            <span className="text-[9px] text-ink-muted">Monitored — within range</span>
          </div>
        </div>
      );

    // Websites and commerce: a responsive browser/device composition with
    // content structure, a small catalogue and an enquiry path — no
    // numeric analytics claims, just a trend line standing in for "visible".
    case "commerce":
      return (
        <div className="relative flex h-full w-full items-center gap-3 p-6">
          <div className="flex h-full w-3/5 flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-elevated/60">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
              <Globe2 className="h-2.5 w-2.5 text-ink-muted" aria-hidden />
              <span className="h-1.5 w-16 rounded-full bg-white/15" />
            </div>
            <div className="grid flex-1 grid-cols-3 gap-1.5 p-2.5">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="aspect-square rounded-md bg-teal/40" />
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-white/10 px-3 py-2">
              <span className="h-1.5 w-10 rounded-full bg-white/15" />
              <span className="rounded-full bg-teal px-2 py-0.5 text-[8px] font-medium text-teal-foreground">
                Enquire
              </span>
            </div>
          </div>
          <div className="flex h-full w-2/5 flex-col gap-2">
            <div className="flex h-2/3 flex-col justify-end rounded-xl border border-white/10 bg-ink-elevated/60 p-2.5">
              <svg viewBox="0 0 60 28" className="h-full w-full" aria-hidden>
                <path
                  d="M2,22 L14,16 L26,18 L38,8 L50,12 L58,4"
                  stroke="var(--color-highlight)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-ink-elevated/60">
              <span className="h-3 w-1.5 rounded-full bg-white/20" />
              <span className="h-3 w-1.5 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      );

    // SEO and digital growth: a small site-structure tree feeding a search-
    // discovery node, metadata and indexing chips, and a conversion path —
    // a connected technical-visibility system, not a fake ranking, traffic
    // graph or follower count. Distinct grid/flow shape from the other four.
    case "seo":
      return (
        <div className="flex h-full w-full flex-col justify-center gap-3 p-6">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 80 40" className="h-9 w-20 shrink-0" aria-hidden>
              <g stroke="var(--color-teal)" strokeOpacity="0.5" strokeWidth="1.4" fill="none">
                <path d="M12,32 L12,20 L40,20" />
                <path d="M40,20 L40,8 M40,20 L68,20 L68,8 M40,20 L40,32" />
              </g>
              {[
                [12, 32],
                [40, 8],
                [68, 8],
                [40, 32],
              ].map(([cx, cy], i) => (
                <rect
                  key={i}
                  x={cx - 5}
                  y={cy - 4}
                  width="10"
                  height="8"
                  rx="2"
                  fill="var(--color-ink-elevated)"
                  stroke="var(--color-teal)"
                  strokeOpacity="0.6"
                />
              ))}
            </svg>
            <span className="text-[9px] uppercase tracking-wide text-ink-muted">Site structure</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-teal/50 bg-teal/15 text-teal">
              <Search className="h-4 w-4" aria-hidden />
            </span>
            <div className="h-px flex-1 border-t border-dashed border-teal/40" />
            <span className="flex items-center gap-1 rounded-full border border-white/10 bg-ink-elevated/60 px-2 py-1 text-[9px] text-ink-foreground/80">
              <Tag className="h-3 w-3 text-highlight" aria-hidden />
              Metadata
            </span>
            <div className="h-px flex-1 border-t border-dashed border-teal/40" />
            <span className="flex items-center gap-1 rounded-full border border-white/10 bg-ink-elevated/60 px-2 py-1 text-[9px] text-ink-foreground/80">
              <ListChecks className="h-3 w-3 text-teal" aria-hidden />
              Indexed
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink-elevated/60 px-3.5 py-3">
            <svg viewBox="0 0 40 24" className="h-6 w-10 shrink-0" aria-hidden>
              <path
                d="M2,2 L38,2 L26,12 L26,22 L14,22 L14,12 Z"
                fill="none"
                stroke="var(--color-highlight)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-1 flex-col gap-1">
              <span className="h-1.5 w-3/4 rounded-full bg-white/15" />
              <span className="h-1.5 w-1/2 rounded-full bg-white/10" />
            </div>
            <span className="rounded-full bg-teal px-2 py-0.5 text-[8px] font-medium text-teal-foreground">
              Convert
            </span>
          </div>
        </div>
      );

    // Integration, deployment and support: connected APIs feeding into a
    // deployment pipeline, cloud environment, monitoring and backup states.
    case "integration":
      return (
        <div className="flex h-full w-full flex-col justify-center gap-3 p-6">
          <div className="flex items-center justify-between gap-2">
            {["API", "API", "API"].map((label, i) => (
              <span
                key={i}
                className="flex h-8 flex-1 items-center justify-center rounded-lg border border-teal/40 bg-teal/10 text-[9px] font-medium text-teal"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex justify-center">
            <svg viewBox="0 0 20 16" className="h-4 w-5" aria-hidden>
              <path d="M10,0 L10,16 M4,10 L10,16 L16,10" stroke="var(--color-highlight)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink-elevated/60 px-3.5 py-3">
            <Cloud className="h-5 w-5 shrink-0 text-highlight" aria-hidden />
            <div className="flex flex-1 flex-col gap-1">
              <span className="h-1.5 w-3/4 rounded-full bg-white/15" />
              <span className="h-1.5 w-1/2 rounded-full bg-white/10" />
            </div>
            <span className="flex items-center gap-1 rounded-full bg-teal/15 px-2 py-0.5 text-[8px] text-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              Healthy
            </span>
          </div>
          <div className="flex items-center justify-between text-[9px] text-ink-muted">
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3" aria-hidden />
              SSL active
            </span>
            <span>Backed up daily</span>
          </div>
        </div>
      );
  }
}
