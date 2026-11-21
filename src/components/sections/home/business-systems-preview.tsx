"use client";

import { useState } from "react";
import Image from "next/image";
import { Warehouse } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * "Open a second record" is the whole point of this preview: picking
 * "Loading bay" swaps every field below together — inspection type, owner
 * role and finding — the way a real work queue would, not just the one
 * field the visitor clicked.
 */
type RecordId = "pump-station" | "loading-bay";

type InspectionRecord = {
  id: RecordId;
  label: string;
  inspectionType: string;
  owner: string;
  status: string;
  finding: string;
};

const records: InspectionRecord[] = [
  {
    id: "pump-station",
    label: "Pump station",
    inspectionType: "Routine inspection",
    owner: "M. Clarke · Field inspector",
    status: "Under review",
    finding: "Bearing housing shows early wear — flagged for next service.",
  },
  {
    id: "loading-bay",
    label: "Loading bay",
    inspectionType: "Equipment inspection",
    owner: "D. Mwangi · Warehouse supervisor",
    status: "Under review",
    finding: "Bay markings need repainting.",
  },
];

export function BusinessSystemsPreview() {
  const [recordId, setRecordId] = useState<RecordId>("pump-station");
  const record = records.find((r) => r.id === recordId) ?? records[0];

  return (
    <div>
      <p className="font-serif-display text-sm italic text-slate-muted">Interactive example</p>

      <div role="group" aria-label="Inspection record" className="mt-4 inline-flex flex-wrap gap-2">
        {records.map((option) => {
          const isSelected = option.id === recordId;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setRecordId(option.id)}
              className={cn(
                "min-h-11 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                isSelected
                  ? "border-teal-strong bg-teal-strong text-on-accent"
                  : "border-neutral-300 text-slate hover:border-neutral-400 hover:text-paper-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:items-start">
        <div>
          <h4 className="text-lg font-semibold text-paper-foreground">{record.label}</h4>
          <p className="text-sm text-slate-muted">{record.inspectionType}</p>

          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="text-slate-muted">Owner</dt>
              <dd className="mt-0.5 font-medium text-paper-foreground">{record.owner}</dd>
            </div>
            <div>
              <dt className="text-slate-muted">Status</dt>
              <dd className="mt-1 inline-flex items-center gap-1.5 font-medium text-teal-strong">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-strong" />
                {record.status}
              </dd>
            </div>
          </dl>

          <div className="mt-5 rounded-xl border border-neutral-200 bg-paper p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-muted">
              Latest finding
            </p>
            {/* key forces a remount on record change, so this reads as a
                freshly opened finding rather than text quietly swapping. */}
            <p key={record.id} className="mt-1.5 text-sm leading-relaxed text-paper-foreground">
              {record.finding}
            </p>
          </div>
        </div>

        {/* Pump station reuses the real technical drawing from the source
            screenshot, cropped to just the diagram. Loading bay has no
            matching photography, so it gets a plain line-art placeholder
            rather than invented product imagery. */}
        <div className="relative aspect-[3/2] rounded-xl bg-paper-elevated p-4 sm:p-5">
          {record.id === "pump-station" ? (
            <Image
              src="/images/services/business-systems-pump.webp"
              alt="Technical drawing of the pump station's centrifugal pump and motor assembly, with its 472 mm height and 1,284 mm length marked."
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
              className="object-contain"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <Warehouse className="h-10 w-10 text-teal-strong/70" aria-hidden />
              <p className="text-xs text-slate-muted">Loading bay record</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
