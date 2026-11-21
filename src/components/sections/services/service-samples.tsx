import { AnimatedLink } from "@/components/sections/home/animated-link";
import type { AuditRow, ServiceSample } from "@/content/services-page";
import { cn } from "@/lib/cn";
import { ServiceFigure } from "./service-figure";

/**
 * One worked example per service family, each in a different form: a
 * typeset workflow, paired safety and engineering records, a three-way
 * choice, an audit extract and a real trigger-to-result flow. Each supplied
 * image sits inside the example it explains, next to the step or option it
 * illustrates.
 *
 * `sizes` strings follow the layout in `.svc-family` (globals.css): the
 * right-hand column is about 690px wide in the 1280px container, about
 * 530px at 1024px, and the full width less the page gutters below `lg`.
 * Figures inside a `.work-mat` lose its padding as well.
 */
const SIZES_IN_MAT = "(min-width: 1280px) 634px, (min-width: 1024px) 480px, calc(100vw - 96px)";
const SIZES_BODY = "(min-width: 1280px) 690px, (min-width: 1024px) 530px, calc(100vw - 48px)";
const SIZES_PAIR = "(min-width: 1280px) 572px, (min-width: 1024px) 928px, calc(100vw - 48px)";

export function ServiceSampleBlock({ sample }: { sample: ServiceSample }) {
  switch (sample.kind) {
    case "workflow":
      return <WorkflowSample sample={sample} />;
    case "operational-pair":
      return <OperationalPairSample sample={sample} />;
    case "routes":
      return <RoutesSample sample={sample} />;
    case "audit":
      return <AuditSample sample={sample} />;
    case "build-and-support":
      return <BuildAndSupportSample sample={sample} />;
  }
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-300 px-2 py-px text-xs font-medium text-slate-muted">
      {children}
    </span>
  );
}

function WorkflowSample({ sample }: { sample: Extract<ServiceSample, { kind: "workflow" }> }) {
  return (
    <figure className="work-mat m-0 rounded-xl p-5 sm:p-7">
      <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Label>Illustrative workflow</Label>
        <span className="text-sm font-medium text-paper-foreground">{sample.title}</span>
      </figcaption>
      <ol className="mt-5">
        {sample.steps.map((step, index) => (
          <li
            key={step.stage}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 border-t border-neutral-300/80 py-3.5 sm:grid-cols-[5.5rem_6.5rem_minmax(0,1fr)] sm:items-baseline"
          >
            <span className="text-sm font-semibold text-paper-foreground">
              <span aria-hidden className="mr-2 font-mono text-xs font-normal text-slate-muted">
                {index + 1}
              </span>
              {step.stage}
            </span>
            <span
              className={cn(
                "justify-self-end rounded-full px-2 py-px text-xs font-medium sm:justify-self-start",
                step.actor === "person"
                  ? "border border-neutral-300 text-paper-foreground"
                  : "bg-teal-tint text-teal-strong",
              )}
            >
              {step.actor === "person" ? "Person" : "Automated"}
            </span>
            <span className="col-span-2 text-sm leading-relaxed text-slate sm:col-span-1">{step.action}</span>
            {step.stage === sample.figureAfterStage ? (
              <ServiceFigure image={sample.figure} sizes={SIZES_IN_MAT} className="col-span-full mt-4 pb-1" />
            ) : null}
          </li>
        ))}
      </ol>
      <p className="border-t border-neutral-300/80 pt-4 text-sm leading-relaxed text-paper-foreground">{sample.note}</p>
    </figure>
  );
}

/**
 * Safety operations and engineering systems at equal weight: same width,
 * same structure (heading, record, caption, related project). Side by side
 * from `xl`, where each record is about 570px wide and its labels still
 * read; stacked full width below that.
 */
function OperationalPairSample({ sample }: { sample: Extract<ServiceSample, { kind: "operational-pair" }> }) {
  return (
    <div className="grid gap-12 xl:grid-cols-2 xl:gap-10">
      {sample.examples.map((example) => (
        <div key={example.heading} className="border-t border-neutral-300 pt-5">
          <h3 className="font-display text-xl font-semibold leading-tight text-paper-foreground">{example.heading}</h3>
          <ServiceFigure image={example.image} sizes={SIZES_PAIR} className="mt-4" />
          <div className="mt-6 border-l border-neutral-300 pl-4">
            <p className="flex flex-wrap items-baseline gap-x-2.5 text-sm">
              <span className="font-display text-base font-semibold text-paper-foreground">{example.project.name}</span>
              <span aria-hidden className="text-neutral-300">
                ·
              </span>
              <span className="font-medium text-slate">{example.project.status}</span>
            </p>
            <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-slate">{example.project.summary}</p>
            <AnimatedLink href={example.project.href} className="mt-2">
              {example.project.linkLabel}
            </AnimatedLink>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * The three website routes as rows, so all three stay visible and the
 * online store can carry its storefront concept at a readable width.
 */
function RoutesSample({ sample }: { sample: Extract<ServiceSample, { kind: "routes" }> }) {
  return (
    <div>
      <ul>
        {sample.routes.map((route) => (
          <li
            key={route.name}
            className="grid gap-x-8 gap-y-3 border-t border-neutral-300 pb-7 pt-5 sm:grid-cols-[10rem_minmax(0,1fr)]"
          >
            <h3 className="font-display text-lg font-semibold leading-tight text-paper-foreground">{route.name}</h3>
            <div>
              <p className="text-sm leading-relaxed text-slate">
                <span className="font-medium text-paper-foreground">Suits </span>
                {route.suits.charAt(0).toLowerCase() + route.suits.slice(1)}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-paper-foreground">
                {route.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-teal-strong" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs font-medium text-slate-muted">{route.builtWith}</p>
            </div>
            {route.image ? <ServiceFigure image={route.image} sizes={SIZES_BODY} className="mt-3 sm:col-span-2" /> : null}
          </li>
        ))}
      </ul>
      <p className="border-t border-neutral-300 pt-5 text-sm leading-relaxed text-slate">{sample.common}</p>
    </div>
  );
}

const priorityClasses: Record<AuditRow["priority"], string> = {
  High: "bg-paper-foreground text-ivory",
  Medium: "border border-paper-foreground/40 text-paper-foreground",
  Low: "border border-neutral-300 text-slate",
};

function AuditSample({ sample }: { sample: Extract<ServiceSample, { kind: "audit" }> }) {
  return (
    <figure className="work-mat m-0 rounded-xl p-5 sm:p-7">
      <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Label>Sample deliverable</Label>
        <span className="text-sm font-medium text-paper-foreground">{sample.title}</span>
      </figcaption>
      <ServiceFigure image={sample.figure} sizes={SIZES_IN_MAT} className="mt-5" />
      <table className="mt-7 w-full border-collapse text-left text-sm max-sm:block">
        <caption className="pb-3 text-left text-sm font-medium text-paper-foreground max-sm:block">
          {sample.rowsTitle}
        </caption>
        <thead className="max-sm:sr-only">
          <tr className="text-xs font-medium text-slate-muted">
            <th scope="col" className="w-[5.5rem] pb-2 pr-4 font-medium">
              Priority
            </th>
            <th scope="col" className="pb-2 pr-6 font-medium">
              Finding
            </th>
            <th scope="col" className="pb-2 font-medium">
              Recommended fix
            </th>
          </tr>
        </thead>
        <tbody className="max-sm:block">
          {sample.rows.map((row) => (
            <tr key={row.finding} className="border-t border-neutral-300/80 align-top max-sm:block max-sm:py-3.5">
              <td className="pr-4 pt-3.5 max-sm:block max-sm:p-0 sm:pb-3.5">
                <span className={cn("inline-block rounded-full px-2 py-px text-xs font-medium", priorityClasses[row.priority])}>
                  {row.priority}
                </span>
              </td>
              <td className="pr-6 pt-3.5 leading-relaxed text-paper-foreground max-sm:block max-sm:p-0 max-sm:pt-2 sm:pb-3.5">
                {row.finding}
              </td>
              <td className="pt-3.5 leading-relaxed text-slate max-sm:block max-sm:p-0 max-sm:pt-1.5 sm:pb-3.5">
                <span className="font-medium text-paper-foreground sm:hidden">Fix: </span>
                {row.fix}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-neutral-300/80 pt-4 text-xs text-slate-muted">{sample.note}</p>
    </figure>
  );
}

function BuildAndSupportSample({ sample }: { sample: Extract<ServiceSample, { kind: "build-and-support" }> }) {
  return (
    <div>
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
        <div className="border-t border-neutral-300 pt-4">
          <h3 className="text-base font-semibold text-paper-foreground">During the build</h3>
          <p className="mt-1 text-sm text-slate-muted">Part of the project scope.</p>
          <ScopeList items={sample.build} />
        </div>
        <div className="border-t border-neutral-300 pt-4">
          <h3 className="text-base font-semibold text-paper-foreground">After launch</h3>
          <p className="mt-1 text-sm text-slate-muted">Scoped as a separate support agreement.</p>
          <ScopeList items={sample.support} />
        </div>
      </div>
      <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-slate">{sample.supportNote}</p>

      <figure className="work-mat m-0 mt-10 rounded-xl p-5 sm:p-7">
        <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Label>Representative integration</Label>
          <span className="text-sm font-medium text-paper-foreground">{sample.flowTitle}</span>
        </figcaption>
        <ServiceFigure image={sample.flowFigure} sizes={SIZES_IN_MAT} className="mt-5" />
        <ol className="mt-6">
          {sample.flow.map((step) => (
            <li
              key={step.label}
              className="grid gap-x-4 gap-y-1 border-t border-neutral-300/80 py-3.5 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:items-baseline"
            >
              <span className="font-mono text-xs font-medium uppercase tracking-wide text-teal-strong">{step.label}</span>
              <span className="text-sm leading-relaxed text-paper-foreground">{step.detail}</span>
            </li>
          ))}
        </ol>
        <p className="border-t border-neutral-300/80 pt-4 text-sm leading-relaxed text-slate">{sample.flowNote}</p>
      </figure>
    </div>
  );
}

function ScopeList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-paper-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-teal-strong" />
          {item}
        </li>
      ))}
    </ul>
  );
}
