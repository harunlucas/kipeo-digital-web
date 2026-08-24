"use client";

import { Globe2, Cpu, ShieldCheck, Share2, Cloud } from "lucide-react";

export type HotspotId = "interface" | "backend" | "operations" | "data" | "deployment";

export type Hotspot = {
  id: HotspotId;
  label: string;
  description: string;
  icon: typeof Globe2;
};

export const studioHotspots: Hotspot[] = [
  {
    id: "interface",
    label: "Websites and experience",
    description: "The interface screen — the part customers and staff actually see and use.",
    icon: Globe2,
  },
  {
    id: "backend",
    label: "Applications and backend",
    description: "The application logic screen — where data is processed and business rules live.",
    icon: Cpu,
  },
  {
    id: "operations",
    label: "HSE and business systems",
    description: "The operations dashboard — records, inspections and reporting for day-to-day work.",
    icon: ShieldCheck,
  },
  {
    id: "data",
    label: "Data and integrations",
    description: "The connected node cluster — how separate systems and services stay in sync.",
    icon: Share2,
  },
  {
    id: "deployment",
    label: "Hosting and support",
    description: "The status light — production hosting, monitoring and ongoing support once live.",
    icon: Cloud,
  },
];

export function StudioHotspots({
  active,
  onSelect,
}: {
  active: HotspotId | null;
  onSelect: (id: HotspotId) => void;
}) {
  const activeHotspot = studioHotspots.find((h) => h.id === active) ?? null;

  return (
    <div className="flex flex-col gap-4">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1">
        {studioHotspots.map((hotspot) => {
          const isActive = hotspot.id === active;
          return (
            <li key={hotspot.id}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(hotspot.id)}
                className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                  isActive
                    ? "border-teal/60 bg-teal/10 text-ink-foreground"
                    : "border-white/10 bg-ink-elevated/50 text-ink-foreground/70 hover:border-white/25 hover:bg-ink-elevated"
                }`}
              >
                <hotspot.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-teal" : "text-ink-muted"}`} aria-hidden />
                {hotspot.label}
              </button>
            </li>
          );
        })}
      </ul>

      <div
        aria-live="polite"
        className="min-h-[4.5rem] rounded-xl border border-white/10 bg-ink-elevated/40 p-4 text-sm leading-relaxed text-ink-muted"
      >
        {activeHotspot ? (
          <>
            <p className="font-medium text-ink-foreground">{activeHotspot.label}</p>
            <p className="mt-1">{activeHotspot.description}</p>
          </>
        ) : (
          <p>Select a hotspot to see what that part of the studio represents.</p>
        )}
      </div>
    </div>
  );
}
