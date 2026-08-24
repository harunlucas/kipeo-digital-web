import { CheckCheck, FileStack, Globe2, Smartphone, Zap } from "lucide-react";

export type CapabilityVisualVariant =
  | "workflow"
  | "inspection"
  | "maintenance"
  | "website-device"
  | "commerce-interface"
  | "automation-map";

/**
 * One hand-built SVG/CSS composition per /work capability area, each using
 * a distinct visual metaphor matched to that specific workflow — no shared
 * dashboard frame, no bar charts, no fabricated statistics. Kept visually
 * distinct from `service-group-visual.tsx` (/services' four groups) even
 * where the subject overlaps, since these are separately authored
 * components, not shared image files.
 */
export function CapabilityVisual({ variant }: { variant: CapabilityVisualVariant }) {
  switch (variant) {
    // Business and workflow systems: a process canvas — a task moving
    // through an approval gate into a record.
    case "workflow":
      return (
        <div className="flex h-full items-center justify-center gap-3 p-6">
          <div className="flex h-14 w-16 flex-col justify-center gap-1 rounded-lg border border-white/10 bg-ink-elevated/60 p-2.5">
            <span className="h-1.5 w-3/4 rounded-full bg-white/20" />
            <span className="h-1.5 w-1/2 rounded-full bg-white/15" />
          </div>
          <svg viewBox="0 0 24 12" className="h-3 w-6 shrink-0" aria-hidden>
            <path d="M0,6 H22 M16,1 L22,6 L16,11" stroke="var(--color-teal)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex h-16 w-14 flex-col items-center justify-center gap-1.5 rounded-lg border border-teal/40 bg-teal/10 p-2">
            <CheckCheck className="h-4 w-4 text-teal" aria-hidden />
            <span className="text-[8px] text-teal">Approved</span>
          </div>
          <svg viewBox="0 0 24 12" className="h-3 w-6 shrink-0" aria-hidden>
            <path d="M0,6 H22 M16,1 L22,6 L16,11" stroke="var(--color-highlight)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex h-14 w-12 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-ink-elevated/60 p-2">
            <FileStack className="h-4 w-4 text-highlight" aria-hidden />
            <span className="text-[8px] text-ink-muted">Record</span>
          </div>
        </div>
      );

    // HSE and compliance software: an inspection checklist moving hazards
    // into corrective actions, with document control noted.
    case "inspection":
      return (
        <div className="flex h-full flex-col justify-center gap-2 p-6">
          {[
            { label: "Hazard identified", done: true },
            { label: "Corrective action assigned", done: true },
            { label: "Closed and documented", done: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-ink-elevated/50 px-3 py-2.5">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${item.done ? "bg-teal text-teal-foreground" : "border border-white/25"}`}
              >
                {item.done && <CheckCheck className="h-3 w-3" aria-hidden />}
              </span>
              <span className="text-xs text-ink-foreground/85">{item.label}</span>
            </div>
          ))}
          <span className="mt-1 flex w-fit items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-ink-muted">
            <FileStack className="h-3 w-3" aria-hidden />
            Document control
          </span>
        </div>
      );

    // Engineering and maintenance systems: equipment states and a
    // maintenance-planning record list.
    case "maintenance":
      return (
        <div className="flex h-full flex-col justify-center gap-2 p-6">
          {[
            { label: "Pump A", state: "Operating" },
            { label: "Compressor 2", state: "Due for service" },
            { label: "Motor 3", state: "Operating" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-ink-elevated/50 px-3 py-2.5"
            >
              <span className="text-xs text-ink-foreground/85">{item.label}</span>
              <span
                className={`flex items-center gap-1.5 text-[10px] ${item.state === "Operating" ? "text-teal" : "text-highlight"}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${item.state === "Operating" ? "bg-teal" : "bg-highlight"}`} />
                {item.state}
              </span>
            </div>
          ))}
        </div>
      );

    // Websites and digital platforms: structured content on a responsive
    // browser and device, with a short enquiry path between them.
    case "website-device":
      return (
        <div className="relative flex h-full items-center justify-center gap-4 p-6">
          <div className="flex h-full max-h-40 w-1/2 flex-col overflow-hidden rounded-lg border border-white/10 bg-ink-elevated/60">
            <div className="flex items-center gap-1 border-b border-white/10 px-2 py-1.5">
              <Globe2 className="h-2.5 w-2.5 text-ink-muted" aria-hidden />
              <span className="h-1.5 flex-1 rounded-full bg-white/10" />
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-2.5">
              <span className="h-6 rounded-md bg-teal/40" />
              <span className="h-1.5 w-3/4 rounded-full bg-white/15" />
              <span className="h-1.5 w-1/2 rounded-full bg-white/15" />
            </div>
          </div>
          <svg viewBox="0 0 24 12" className="h-3 w-6 shrink-0" aria-hidden>
            <path d="M0,6 H22 M16,1 L22,6 L16,11" stroke="var(--color-highlight)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex h-full max-h-36 w-9 flex-col gap-1.5 rounded-xl border border-white/10 bg-ink-elevated/60 p-1.5">
            <Smartphone className="mx-auto h-2.5 w-2.5 text-ink-muted" aria-hidden />
            <span className="h-4 rounded-sm bg-highlight/50" />
            <span className="rounded-full bg-teal px-1 py-0.5 text-center text-[6px] font-medium text-teal-foreground">
              Enquire
            </span>
          </div>
        </div>
      );

    // E-commerce and managed platforms: catalogue, orders and platform
    // status alongside an inventory indicator.
    case "commerce-interface":
      return (
        <div className="grid h-full grid-cols-2 gap-3 p-6">
          <div className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-ink-elevated/60 p-2.5">
            <span className="text-[9px] uppercase tracking-wide text-ink-muted">Catalogue</span>
            <div className="grid grid-cols-2 gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="aspect-square rounded-md bg-teal/40" />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-1 flex-col justify-center gap-1.5 rounded-lg border border-white/10 bg-ink-elevated/60 p-2.5">
              <span className="text-[9px] uppercase tracking-wide text-ink-muted">Orders</span>
              {[1, 2].map((i) => (
                <span key={i} className="h-1.5 rounded-full bg-white/15" />
              ))}
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-teal/30 bg-teal/10 px-2.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              <span className="text-[9px] text-teal">Platform up to date</span>
            </div>
          </div>
        </div>
      );

    // Integrations and automation: connected tools around an automation
    // trigger, with data moving between them.
    case "automation-map":
      return (
        <div className="relative flex h-full items-center justify-center p-6">
          <svg viewBox="0 0 140 100" className="h-auto w-full max-w-[220px]" aria-hidden>
            <g stroke="var(--color-teal)" strokeOpacity="0.5" strokeWidth="1.4">
              <path d="M30,20 L70,50" />
              <path d="M110,20 L70,50" />
              <path d="M30,80 L70,50" />
              <path d="M110,80 L70,50" />
            </g>
            {[
              [30, 20],
              [110, 20],
              [30, 80],
              [110, 80],
            ].map(([cx, cy], i) => (
              <rect key={i} x={cx - 12} y={cy - 10} width="24" height="20" rx="5" fill="var(--color-ink-elevated)" stroke="var(--color-highlight)" strokeOpacity="0.4" />
            ))}
            <circle cx="70" cy="50" r="14" fill="var(--color-teal)" fillOpacity="0.9" />
          </svg>
          <span className="sr-only">Connected tools synchronising data through an automation trigger</span>
          <Zap
            className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-teal-foreground"
            aria-hidden
          />
        </div>
      );
  }
}
