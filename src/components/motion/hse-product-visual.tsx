import { AlertTriangle, ClipboardCheck, FileStack } from "lucide-react";

/**
 * A single, purpose-built concept mockup for the HSE Management System
 * spotlight on /work — distinct from the AI-generated photographic concept
 * renders shown on the homepage and from the small "inspection" capability
 * composition in `capability-visual.tsx`, so this section shows no image
 * already used elsewhere. Deliberately abstract, with no numeric counters
 * or statistics that could read as real product data.
 */
export function HseProductVisual() {
  return (
    <div className="flex h-full flex-col gap-3 p-6">
      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-ink-elevated/60 px-3.5 py-2.5">
        <span className="text-[10px] font-medium uppercase tracking-wide text-ink-muted">SafetyOS — overview</span>
        <span className="flex items-center gap-1.5 text-[10px] text-teal">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
          In development
        </span>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-2.5">
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-white/10 bg-ink-elevated/60 p-3">
          <ClipboardCheck className="h-5 w-5 text-teal" aria-hidden />
          <span className="text-[9px] text-ink-muted">Inspections</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-white/10 bg-ink-elevated/60 p-3">
          <AlertTriangle className="h-5 w-5 text-highlight" aria-hidden />
          <span className="text-[9px] text-ink-muted">Corrective actions</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-white/10 bg-ink-elevated/60 p-3">
          <FileStack className="h-5 w-5 text-teal" aria-hidden />
          <span className="text-[9px] text-ink-muted">Documents</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-ink-elevated/60 p-3">
        {["Admin", "EHS Officer", "Supervisor", "Worker"].map((role, i) => (
          <div key={role} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" style={{ opacity: 1 - i * 0.15 }} />
            <span className="h-1.5 flex-1 rounded-full bg-white/10" style={{ maxWidth: `${70 - i * 12}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
