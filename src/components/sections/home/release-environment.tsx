"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";
import { PLATES, SystemStack } from "./system-stack-artwork";

/**
 * The homepage hero's right column: the isometric three-layer stack with a
 * small working release simulation under it.
 *
 * Everything here runs in the browser. "Promote release" moves two pieces of
 * local React state — nothing is fetched, and no deployment service is ever
 * contacted. The artwork already carries the layer labels ("Web platform",
 * "API services", "Data layer"), so the markup around it only supplies the
 * section title and the controls.
 */

type View = "staging" | "production";

type ReleaseState = {
  view: View;
  /** Whether the staging build has already been promoted. */
  promoted: boolean;
};

const initialState: ReleaseState = { view: "staging", promoted: false };

const views: { value: View; label: string }[] = [
  { value: "staging", label: "Staging" },
  { value: "production", label: "Production" },
];

/**
 * One status line per reachable combination, so switching views after a
 * promotion never contradicts what the other view reported.
 */
function statusFor({ view, promoted }: ReleaseState): { text: string; settled: boolean } {
  if (view === "production") {
    return promoted
      ? { text: "Release active", settled: true }
      : { text: "Awaiting release", settled: false };
  }

  return promoted
    ? { text: "Promoted to production", settled: true }
    : { text: "Checks passed", settled: true };
}

export function ReleaseEnvironment() {
  const [state, setState] = useState<ReleaseState>(initialState);
  const status = statusFor(state);

  const isInitial = state.view === initialState.view && state.promoted === initialState.promoted;

  // One release, one promotion: once it has shipped, the action is spent
  // until the demo is reset.
  function promote() {
    setState({ view: "production", promoted: true });
  }

  return (
    <div>
      {/* No visible title: the diagram leads. The heading stays for screen
          readers so the Staging / Production controls below have a name. */}
      <h2 className="sr-only">Release environment, interactive demo</h2>

      {/*
        If the supplied `public/images/kipeo-system-stack.png` is restored,
        this whole block becomes:
          <Image src="/images/kipeo-system-stack.png" alt={…} width={W} height={H}
                 sizes="(min-width: 1024px) 60vw, 100vw" priority
                 className="mt-6 h-auto w-full" />
        with W/H taken from the file's real pixel dimensions — that artwork
        carries its own labels, so the two label treatments below go with it.

        The layer names are HTML rather than SVG text so they stay at a fixed,
        readable size instead of shrinking with the artwork. From `lg` up they
        are pinned beside their plate using each plate's centre percentage;
        below `lg` the column is too narrow for side labels, so they become a
        legend underneath.
      */}
      {/* No `items-start` here: the label column is positioned-empty, so it
          only has a height to resolve each label's `top: %` against while the
          grid stretches it to match the artwork. */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-1">
        <SystemStack className="h-auto w-full" />

        <div className="relative hidden lg:block lg:w-[124px]">
          {PLATES.map((plate) => (
            <span
              key={plate.label}
              style={{ top: `${plate.centre}%` }}
              className="absolute left-0 -translate-y-1/2 text-sm font-medium text-paper-foreground"
            >
              {plate.label}
            </span>
          ))}
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 lg:hidden">
          {PLATES.map((plate) => (
            <li key={plate.label} className="flex items-center gap-2 text-sm text-slate">
              <span
                aria-hidden
                style={{ backgroundColor: plate.swatch }}
                className="h-2.5 w-2.5 shrink-0 rounded-[2px] ring-1 ring-inset ring-ink/20"
              />
              {plate.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-neutral-200 pt-5">
        <div
          role="group"
          aria-label="Environment"
          className="inline-flex rounded-full border border-neutral-300 p-1"
        >
          {views.map((option) => {
            const isSelected = state.view === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setState((current) => ({ ...current, view: option.value }))}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isSelected
                    ? "bg-teal-strong text-on-accent"
                    : "text-slate hover:text-paper-foreground",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <p
          role="status"
          className={cn(
            "flex items-center gap-2 text-sm",
            status.settled ? "text-teal-strong" : "text-slate",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "h-1.5 w-1.5 shrink-0 rounded-full",
              status.settled ? "bg-teal-strong" : "bg-amber",
            )}
          />
          {status.text}
        </p>

        {/*
          Both actions use `aria-disabled` rather than `disabled`. Each one
          turns itself off the moment it is pressed, and a real `disabled`
          would drop keyboard focus to the document body at exactly that
          point; this keeps the button focusable and lets the handler refuse.
        */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <button
            type="button"
            aria-disabled={state.promoted}
            onClick={() => {
              if (!state.promoted) promote();
            }}
            className={cn(
              "inline-flex min-h-11 items-center gap-1.5 text-sm font-medium transition-colors",
              state.promoted
                ? "cursor-default text-slate-muted"
                : "cursor-pointer text-paper-foreground underline decoration-paper-foreground/30 underline-offset-4 hover:text-teal-strong hover:decoration-teal-strong/40",
            )}
          >
            {state.promoted ? "Release promoted" : "Promote release"}
            {state.promoted ? null : <ArrowRight className="h-4 w-4" aria-hidden />}
          </button>

          <button
            type="button"
            aria-disabled={isInitial}
            onClick={() => {
              if (!isInitial) setState(initialState);
            }}
            className={cn(
              "inline-flex min-h-11 items-center gap-1.5 text-sm transition-colors",
              isInitial
                ? "cursor-default text-slate-muted/70"
                : "cursor-pointer text-slate hover:text-paper-foreground",
            )}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            Reset demo
          </button>
        </div>
      </div>
    </div>
  );
}
