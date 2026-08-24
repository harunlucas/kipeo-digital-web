import type { AttributionLegendEntry } from "@/content/work";

const dotClasses: Record<AttributionLegendEntry["tone"], string> = {
  teal: "bg-teal",
  violet: "bg-highlight",
  amber: "bg-highlight-strong",
  neutral: "border border-neutral-400 bg-neutral-200",
  dashed: "border-2 border-dashed border-slate-muted bg-transparent",
};

/**
 * A one-time explanation of the five attribution terms used across the
 * page, so individual cards don't need to keep re-explaining themselves —
 * replaces the longer, repeated disclosure copy this page used to carry.
 */
export function AttributionLegend({ items }: { items: AttributionLegendEntry[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-2.5">
          <span aria-hidden className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dotClasses[item.tone]}`} />
          <div>
            <dt className="text-sm font-semibold text-paper-foreground">{item.label}</dt>
            <dd className="mt-0.5 text-xs leading-snug text-slate-muted">{item.description}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
