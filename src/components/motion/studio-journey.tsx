import type { StudioJourneyStage } from "@/content/studio";

/**
 * A compact, static 8-step journey strip — deliberately no per-item motion
 * or client-side state, just a connecting line and numbered stages, kept
 * light next to the interactive workspace above it.
 */
export function StudioJourney({ stages }: { stages: StudioJourneyStage[] }) {
  return (
    <ol className="relative grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 lg:grid-cols-8 lg:gap-x-3">
      <div
        aria-hidden
        className="absolute left-[6%] right-[6%] top-[18px] hidden h-px bg-neutral-300 lg:block"
      />
      {stages.map((stage, index) => (
        <li key={stage.id} className="relative flex flex-col items-start gap-2 lg:items-center lg:text-center">
          <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-teal-strong bg-teal-tint font-display text-sm text-teal-strong">
            {index + 1}
          </span>
          <div>
            <p className="text-sm font-semibold text-paper-foreground">{stage.label}</p>
            <p className="mt-0.5 text-xs leading-snug text-slate-muted">{stage.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
