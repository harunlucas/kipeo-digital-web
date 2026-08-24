import { CheckCheck, Globe2, Smartphone } from "lucide-react";

export type CapabilityVisualVariant =
  | "workflow"
  | "inspection"
  | "maintenance"
  | "website-device"
  | "commerce-interface"
  | "automation-map";

/**
 * One hand-built SVG/CSS composition per /work capability area — kept
 * visually distinct from `service-group-visual.tsx` (/services' four
 * groups) even where the subject overlaps (e.g. workflow systems, HSE),
 * since these are separately authored components, not shared image files.
 */
export function CapabilityVisual({ variant }: { variant: CapabilityVisualVariant }) {
  switch (variant) {
    case "workflow":
      return (
        <div className="grid h-full grid-cols-3 gap-2 p-5">
          {["To do", "In progress", "Done"].map((col, colIndex) => (
            <div key={col} className="flex flex-col gap-2 rounded-lg border border-white/10 bg-ink-elevated/50 p-2">
              <span className="text-[9px] uppercase tracking-wide text-ink-muted">{col}</span>
              {Array.from({ length: colIndex === 2 ? 1 : 2 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-8 rounded-md ${colIndex === 2 ? "bg-teal/70" : "bg-white/10"}`}
                  style={{ opacity: 1 - i * 0.2 }}
                />
              ))}
            </div>
          ))}
        </div>
      );

    case "inspection":
      return (
        <div className="flex h-full flex-col justify-center gap-2.5 p-6">
          {[
            { label: "Fire extinguisher check", done: true },
            { label: "Emergency exits clear", done: true },
            { label: "PPE stock review", done: false },
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
          <span className="mt-1 w-fit rounded-full bg-highlight/20 px-2.5 py-1 text-[10px] text-highlight-foreground">
            2 of 3 complete
          </span>
        </div>
      );

    case "maintenance": {
      const points = [8, 14, 10, 18, 13, 20, 16];
      const max = Math.max(...points);
      return (
        <div className="flex h-full flex-col justify-center gap-3 p-6">
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-ink-elevated/50 px-3 py-2">
            <span className="text-[10px] uppercase tracking-wide text-ink-muted">Pump A — vibration</span>
            <span className="h-2 w-2 rounded-full bg-teal" />
          </div>
          <div className="flex h-16 items-end gap-1 rounded-lg border border-white/10 bg-ink-elevated/50 p-3">
            {points.map((p, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-teal"
                style={{ height: `${(p / max) * 100}%`, opacity: 0.5 + (i / points.length) * 0.5 }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-ink-elevated/50 px-3 py-2">
            <span className="text-[10px] text-ink-muted">Next service</span>
            <span className="text-[10px] font-medium text-ink-foreground">14 days</span>
          </div>
        </div>
      );
    }

    case "website-device":
      return (
        <div className="relative flex h-full items-center justify-center gap-4 p-6">
          <div className="flex h-full max-h-40 w-2/3 flex-col overflow-hidden rounded-lg border border-white/10 bg-ink-elevated/60">
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
          <div className="flex h-full max-h-36 w-8 flex-col gap-1.5 rounded-xl border border-white/10 bg-ink-elevated/60 p-1.5">
            <Smartphone className="mx-auto h-2.5 w-2.5 text-ink-muted" aria-hidden />
            <span className="h-4 rounded-sm bg-highlight/50" />
            <span className="h-1 rounded-full bg-white/15" />
            <span className="h-1 rounded-full bg-white/15" />
          </div>
        </div>
      );

    case "commerce-interface":
      return (
        <div className="grid h-full grid-cols-3 gap-2 p-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col gap-1 rounded-lg bg-ink-elevated/60 p-2">
              <span className="aspect-square w-full rounded-md bg-teal/40" />
              <span className="h-1.5 w-3/4 rounded-full bg-white/20" />
              <span className="h-1.5 w-1/2 rounded-full bg-highlight/50" />
            </div>
          ))}
        </div>
      );

    case "automation-map":
      return (
        <div className="flex h-full items-center justify-center p-6">
          <svg viewBox="0 0 160 60" className="h-auto w-full max-w-xs" aria-hidden>
            {[20, 80, 140].map((cx, i) => (
              <g key={i}>
                {i < 2 && (
                  <path d={`M${cx + 14},30 L${cx + 46},30`} stroke="var(--color-teal)" strokeOpacity="0.5" strokeWidth="1.5" />
                )}
                <rect x={cx - 14} y="16" width="28" height="28" rx="6" fill="var(--color-ink-elevated)" stroke="var(--color-teal)" strokeOpacity="0.4" />
                <circle cx={cx} cy="30" r="4" fill={i === 1 ? "var(--color-highlight)" : "var(--color-teal)"} />
              </g>
            ))}
          </svg>
        </div>
      );
  }
}
