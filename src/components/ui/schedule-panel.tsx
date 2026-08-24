import { CalendarClock, CheckCircle2 } from "lucide-react";

const hours = Array.from({ length: 12 }, (_, i) => i);
const nairobiActive = [3, 4, 5, 6, 7, 8, 9]; // 09:00–16:00 EAT
const clientActive = [1, 2, 3, 4, 5, 6, 7]; // example shifted overlap block
const overlap = nairobiActive.filter((h) => clientActive.includes(h));

const milestones = ["Discovery arranged", "Proposal reviewed", "Kickoff agreed"];

export function SchedulePanel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-ink shadow-panel">
      <div className="flex items-center gap-2.5 border-b border-ink-elevated px-6 py-4">
        <CalendarClock className="h-4 w-4 text-teal" aria-hidden />
        <div>
          <p className="text-sm font-medium text-ink-foreground">Meeting availability</p>
          <p className="text-[11px] text-ink-muted">Illustrative example, not a live schedule</p>
        </div>
      </div>

      <div className="space-y-5 px-6 py-6">
        <ScheduleRow label="Nairobi · EAT (UTC+3)" hint="09:00–16:00" active={nairobiActive} tone="teal" />
        <ScheduleRow label="Your time (example)" hint="11:00–18:00" active={clientActive} tone="highlight" />
        <ScheduleRow label="Meeting window" hint="overlap hours" active={overlap} tone="both" />
      </div>

      <div className="border-t border-ink-elevated px-6 py-5">
        <p className="font-mono text-[10px] uppercase tracking-wide text-ink-muted">
          Illustrative remote-delivery timeline
        </p>
        <ul className="mt-2.5 flex flex-col gap-2.5">
          {milestones.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-ink-muted">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ScheduleRow({
  label,
  hint,
  active,
  tone,
}: {
  label: string;
  hint: string;
  active: number[];
  tone: "teal" | "highlight" | "both";
}) {
  const activeClass =
    tone === "teal"
      ? "bg-teal"
      : tone === "highlight"
        ? "bg-highlight"
        : "bg-teal ring-2 ring-highlight/70";

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xs text-ink-muted">{label}</p>
        <p className="font-mono text-[10px] text-ink-muted/80">{hint}</p>
      </div>
      <div className="mt-2 grid grid-cols-12 gap-1" role="img" aria-label={`${label}, example active hours ${hint}`}>
        {hours.map((hour) => {
          const isActive = active.includes(hour);
          return (
            <span
              key={hour}
              className={`h-2.5 rounded-sm border ${
                isActive ? `${activeClass} border-transparent` : "border-white/10 bg-transparent"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
