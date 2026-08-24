import { CalendarClock, CheckCircle2 } from "lucide-react";

const hours = Array.from({ length: 12 }, (_, i) => i);
const nairobiActive = [3, 4, 5, 6, 7, 8, 9]; // 09:00–17:00 EAT
const clientActive = [1, 2, 3, 4, 5, 6, 7]; // shifted overlap block
const overlap = nairobiActive.filter((h) => clientActive.includes(h));

const milestones = ["Discovery call booked", "Proposal sent", "Kickoff scheduled"];

export function SchedulePanel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-ink shadow-panel">
      <div className="flex items-center gap-2.5 border-b border-ink-elevated px-6 py-4">
        <CalendarClock className="h-4 w-4 text-teal" aria-hidden />
        <p className="text-sm font-medium text-ink-foreground">Meeting availability</p>
      </div>

      <div className="space-y-5 px-6 py-6">
        <ScheduleRow label="Nairobi · EAT (UTC+3)" active={nairobiActive} tone="teal" />
        <ScheduleRow label="Your time" active={clientActive} tone="highlight" />
        <ScheduleRow label="Meeting window" active={overlap} tone="both" />
      </div>

      <ul className="flex flex-col gap-2.5 border-t border-ink-elevated px-6 py-5">
        {milestones.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm text-ink-muted">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScheduleRow({
  label,
  active,
  tone,
}: {
  label: string;
  active: number[];
  tone: "teal" | "highlight" | "both";
}) {
  const activeClass =
    tone === "teal" ? "bg-teal" : tone === "highlight" ? "bg-highlight" : "bg-teal ring-2 ring-highlight/70";

  return (
    <div>
      <p className="text-xs text-ink-muted">{label}</p>
      <div className="mt-2 grid grid-cols-12 gap-1" role="img" aria-label={`${label} availability across the day`}>
        {hours.map((hour) => (
          <span
            key={hour}
            className={`h-2.5 rounded-sm ${active.includes(hour) ? activeClass : "bg-ink-elevated"}`}
          />
        ))}
      </div>
    </div>
  );
}
