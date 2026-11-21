"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { THEME_OPTIONS, type ThemePreference } from "@/lib/theme";
import { cn } from "@/lib/cn";
import { useTheme } from "./use-theme";

const ICONS: Record<ThemePreference, LucideIcon> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

type OptionsProps = {
  /** `row`: the three choices side by side (mobile menu). `column`: a list (header popover). */
  layout: "row" | "column";
  legendClassName?: string;
  /** Focus the selected choice when mounted (the header popover opening). */
  autoFocus?: boolean;
};

/**
 * The three appearance choices as a native radio group, so arrow keys move
 * between them and select as they go, Tab enters at the selected one, and
 * screen readers announce "Appearance, radio group, Dark, selected, 2 of 3".
 * The choice applies the moment it is selected.
 */
export function AppearanceOptions({ layout, legendClassName, autoFocus = false }: OptionsProps) {
  const name = useId();
  const { preference, setPreference } = useTheme();
  const selectedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) selectedRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  return (
    <fieldset className="min-w-0">
      <legend className={cn("text-sm font-medium text-fg", legendClassName)}>Appearance</legend>
      <div
        className={cn(
          layout === "row"
            ? "mt-2.5 grid grid-cols-3 gap-1 rounded-full border border-line bg-surface/60 p-1"
            : "mt-2 flex flex-col gap-0.5",
        )}
      >
        {THEME_OPTIONS.map((option) => {
          const Icon = ICONS[option.value];
          const checked = preference === option.value;
          return (
            <label key={option.value} className="relative block cursor-pointer">
              <input
                ref={checked ? selectedRef : undefined}
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => setPreference(option.value)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex min-h-11 items-center gap-2 text-sm font-medium transition-colors motion-reduce:transition-none",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus",
                  layout === "row"
                    ? "justify-center rounded-full px-2 text-fg-secondary hover:text-fg peer-checked:bg-button peer-checked:text-button-fg peer-checked:shadow-sm"
                    : "rounded-lg px-3 text-fg-secondary hover:bg-surface hover:text-fg peer-checked:bg-teal-tint peer-checked:text-link",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {option.label}
                {layout === "column" && checked ? (
                  <span className="ml-auto text-xs font-normal text-fg-muted">Selected</span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * Desktop header control: a compact button showing the current choice's
 * icon, opening a small panel with the labelled Light / Dark / System
 * choices. Escape, a click outside or tabbing away closes it; Escape returns
 * focus to the button. Choosing doesn't close it, so the visitor can compare.
 */
export function AppearanceMenu({ className }: { className?: string }) {
  const panelId = useId();
  const { preference } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const Icon = ICONS[preference];
  const label = THEME_OPTIONS.find((option) => option.value === preference)?.label ?? "System";

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        // `preventScroll`: the header is sticky, and `scroll-padding-top`
        // would otherwise make the browser scroll the page to "reveal" it.
        buttonRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={cn("relative", className)}
      onBlur={(event) => {
        // Only focus moving to another element outside (Tab) closes it here.
        // Clicking a choice's label blurs the focused radio with no
        // `relatedTarget`; outside clicks are handled by `pointerdown` above.
        const next = event.relatedTarget as Node | null;
        if (open && next && !rootRef.current?.contains(next)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Appearance: ${label}`}
        title={`Appearance: ${label}`}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border text-fg-secondary transition-colors hover:border-line hover:bg-surface hover:text-fg",
          open ? "border-line bg-surface text-fg" : "border-transparent",
        )}
      >
        <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="services-panel absolute right-0 top-[calc(100%+0.75rem)] z-50 w-56 rounded-2xl border border-line bg-overlay p-3 shadow-[0_24px_48px_-28px_rgba(13,17,23,0.35)] dark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.8)]"
      >
        {open ? <AppearanceOptions layout="column" legendClassName="px-3 pt-1 text-xs uppercase tracking-[0.14em] text-fg-muted" autoFocus /> : null}
      </div>
    </div>
  );
}
