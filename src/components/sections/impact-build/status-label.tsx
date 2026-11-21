import { impactBuildConfig, impactBuildStatusLabels } from "@/content/impact-build";

/** The live programme status from `impactBuildConfig`. A closing date renders only once it's confirmed there. */
export function StatusLabel({ tone = "paper" }: { tone?: "paper" | "ink" }) {
  const { status, closingDate } = impactBuildConfig;
  const isOpen = status === "open";
  const dotClass = isOpen ? (tone === "ink" ? "bg-teal" : "bg-teal-strong") : "bg-neutral-500";
  const textClass = tone === "ink" ? "text-ink-foreground" : "text-paper-foreground";

  return (
    <p className={`inline-flex items-center gap-2 text-sm font-medium ${textClass}`}>
      <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${dotClass}`} />
      <span>
        <span className="sr-only">Status: </span>
        {impactBuildStatusLabels[status]}
        {isOpen && closingDate && <span className="font-normal"> · closes {closingDate}</span>}
      </span>
    </p>
  );
}
