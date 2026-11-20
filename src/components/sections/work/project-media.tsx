import Image from "next/image";
import type { ComputationMedia, ProjectMedia, ScreenshotMedia, WorkflowMedia } from "@/content/case-studies";
import { cn } from "@/lib/cn";

/**
 * The evidence panel for one project on the Work pages. Each project gets the
 * representation that explains it best: a genuine screenshot, a workflow
 * typeset from its own source, or a real input → output example from its own
 * code. All three sit on the same quiet mat so rows read as one system.
 *
 * Text in the two typeset kinds is real, selectable HTML at body sizes, so
 * nothing has to be zoomed to be read.
 */
export function ProjectMedia({
  media,
  preload = false,
  size = "row",
}: {
  media: ProjectMedia;
  /** LCP image on the page: preload it. */
  preload?: boolean;
  size?: "feature" | "row";
}) {
  switch (media.kind) {
    case "screenshot":
      return <ScreenshotPanel media={media} preload={preload} size={size} />;
    case "workflow":
      return <WorkflowPanel media={media} />;
    case "computation":
      return <ComputationPanel media={media} />;
  }
}

function ScreenshotPanel({
  media,
  preload,
  size,
}: {
  media: ScreenshotMedia;
  preload: boolean;
  size: "feature" | "row";
}) {
  // Capped at the file's own width so the interface is never upscaled and
  // its labels stay crisp; the mat fills the rest of the column.
  return (
    <div
      className={cn(
        "work-mat flex items-center justify-center rounded-2xl px-3 py-4 sm:px-8 sm:py-8",
        size === "feature" && "lg:px-10 lg:py-9",
      )}
    >
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        preload={preload}
        sizes={`(min-width: 1024px) ${Math.min(media.width, 500)}px, (min-width: 640px) ${Math.min(media.width, 520)}px, calc(100vw - 80px)`}
        className="h-auto w-full max-w-[500px] rounded-lg shadow-[0_18px_40px_-22px_rgba(13,17,23,0.55)]"
      />
    </div>
  );
}

function PanelHeader({ title, source }: { title: string; source: string }) {
  return (
    <div className="border-b border-neutral-300/80 pb-3">
      <p className="text-sm font-semibold text-paper-foreground">{title}</p>
      <p className="mt-0.5 text-xs text-slate-muted">{source}</p>
    </div>
  );
}

function WorkflowPanel({ media }: { media: WorkflowMedia }) {
  return (
    <div className="work-mat rounded-2xl p-5 sm:p-7">
      <PanelHeader title={media.title} source={media.source} />
      <ol className="mt-1">
        {media.steps.map((step, index) => (
          <li
            key={step.stage}
            className="grid grid-cols-[1.75rem_1fr] gap-x-3 border-b border-neutral-300/60 py-3 last:border-b-0 sm:grid-cols-[1.75rem_8.5rem_1fr] sm:gap-x-4"
          >
            <span aria-hidden className="pt-px font-mono text-xs leading-6 text-teal-strong">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="leading-6">
              <span className="block text-sm font-semibold text-paper-foreground">{step.stage}</span>
              <span className="block text-xs text-slate-muted">{step.owner}</span>
            </span>
            <span className="col-start-2 mt-1 text-sm leading-relaxed text-slate sm:col-start-3 sm:mt-0 sm:leading-6">
              {step.action}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-2 border-t border-neutral-300/80 pt-3 text-xs leading-relaxed text-slate">{media.rule}</p>
    </div>
  );
}

function ComputationPanel({ media }: { media: ComputationMedia }) {
  return (
    <div className="work-mat rounded-2xl p-5 sm:p-7">
      <PanelHeader title={media.title} source={media.source} />

      <div className="mt-4 grid gap-5 sm:grid-cols-2 sm:gap-6">
        <div>
          <p className="text-xs font-medium text-slate-muted">Input</p>
          <dl className="mt-2 space-y-1.5 text-sm">
            {media.inputs.map((input) => (
              <div key={input.label} className="flex flex-wrap gap-x-2">
                <dt className="text-slate">{input.label}</dt>
                <dd className="font-medium text-paper-foreground">{input.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-muted">Calculation</p>
          <dl className="mt-2 space-y-2.5 text-sm">
            {media.calculations.map((calc) => (
              <div key={calc.label}>
                <dt className="text-slate">{calc.label}</dt>
                <dd className="font-mono text-[0.8125rem] text-paper-foreground">
                  <span className="block">{calc.formula} =</span>
                  <span className="block whitespace-nowrap text-teal-strong">{calc.result}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-slate-muted">{media.outputLabel}</p>
        {/* Scrolls inside itself on the narrowest screens rather than
            widening the page; the longest line is the G81 cycle. */}
        <pre
          tabIndex={0}
          aria-label={`${media.outputLabel}, ${media.output.length} lines`}
          className="mt-2 overflow-x-auto rounded-lg bg-ink px-4 py-3.5 font-mono text-[0.8125rem] leading-6 text-ink-foreground"
        >
          <code>{media.output.join("\n")}</code>
        </pre>
        <p className="mt-2.5 text-xs text-slate-muted">{media.note}</p>
      </div>
    </div>
  );
}
