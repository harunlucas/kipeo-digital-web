"use client";

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { allServicesLink, howWeWorkLink, serviceFamilyLinks } from "@/content/navigation";
import { cn } from "@/lib/cn";

const CLOSE_DELAY_MS = 220;

type Point = { x: number; y: number };

/** Whether `p` lies inside triangle `a b c` (either winding). */
function inTriangle(p: Point, a: Point, b: Point, c: Point): boolean {
  const side = (p1: Point, p2: Point, p3: Point) => (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
  const d1 = side(p, a, b);
  const d2 = side(p, b, c);
  const d3 = side(p, c, a);
  const hasNegative = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPositive = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNegative && hasPositive);
}

/**
 * Desktop Services navigation: "Services" stays a real link to /services,
 * with an adjacent chevron button (a disclosure: `aria-expanded`, not an
 * ARIA menu) that toggles one wide panel by click, tap or keyboard. Hovering
 * the trigger opens it too.
 *
 * PLACEMENT. The panel is absolutely positioned against the sticky
 * `<header>` (its nearest positioned ancestor), so it sits directly below
 * the header, centred in the same 1280px container as the page, and
 * overlays the hero without moving anything. It follows the chevron in the
 * DOM, so Tab order runs Services → chevron → panel links → next nav item.
 * It only mounts while open, so hidden links are never tabbable.
 *
 * POINTER. Trigger and panel share one close timer: leaving either
 * schedules a close after `CLOSE_DELAY_MS`, entering either cancels it. Two
 * things keep a diagonal move from "Services" to a far link from closing
 * the panel on the way. A transparent bridge spans the panel's width across
 * the header's bottom edge. And a "menu-aim" corridor: on leaving the
 * trigger the exit point is remembered, and while the pointer keeps moving
 * inside the triangle between that point and the panel's top corners the
 * close timer is restarted, so a shallow path along the header towards the
 * top-right of the panel survives. A pointer that stops, or heads out of
 * the corridor, still closes after the delay. Only mouse pointers drive
 * hover; touch uses the chevron. The panel's outer frame ignores the
 * pointer, so the page beside the card stays clickable.
 *
 * CLOSING. Escape (returning focus to the chevron if focus was in the
 * menu), a press outside, focus moving outside, choosing a link, or a route
 * change.
 */
export function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  /** Where the pointer left the trigger: the apex of the aim corridor. */
  const exitPoint = useRef<Point | null>(null);
  const panelId = useId();

  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }
  const isActive = pathname === "/services" || pathname.startsWith("/services/");

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };
  const onEnter = (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return;
    exitPoint.current = null;
    cancelClose();
    setOpen(true);
  };
  const onTriggerLeave = (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return;
    exitPoint.current = { x: event.clientX, y: event.clientY };
    scheduleClose();
  };
  const onPanelLeave = (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return;
    exitPoint.current = null;
    scheduleClose();
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const isInside = (node: Node | null) =>
      !!node && (!!triggerRef.current?.contains(node) || !!panelRef.current?.contains(node));

    function onPointerDown(event: PointerEvent) {
      if (!isInside(event.target as Node)) setOpen(false);
    }
    function onFocusIn(event: FocusEvent) {
      if (!isInside(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const focusWasInside = isInside(document.activeElement);
      setOpen(false);
      if (focusWasInside) toggleRef.current?.focus();
    }
    // Menu aim: moving inside the corridor from the exit point to the
    // panel's top edge restarts the close timer.
    function onPointerMove(event: PointerEvent) {
      const apex = exitPoint.current;
      const panel = panelRef.current;
      if (event.pointerType !== "mouse" || !apex || !panel || isInside(event.target as Node)) return;
      const r = panel.getBoundingClientRect();
      const p = { x: event.clientX, y: event.clientY };
      if (inTriangle(p, apex, { x: r.left, y: r.top }, { x: r.right, y: r.top })) {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointermove", onPointerMove);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, [open]);

  const choose = () => setOpen(false);

  return (
    <>
      <div ref={triggerRef} className="flex items-center" onPointerEnter={onEnter} onPointerLeave={onTriggerLeave}>
        <Link
          href={allServicesLink.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "group relative inline-block py-2 text-sm font-medium transition-colors hover:text-paper-foreground",
            isActive || open ? "text-paper-foreground" : "text-slate",
          )}
        >
          Services
          <span
            aria-hidden
            className={cn(
              "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-teal-strong transition-transform duration-200 ease-out motion-reduce:transition-none",
              isActive || open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
            )}
          />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Hide services menu" : "Show services menu"}
          onClick={() => {
            cancelClose();
            setOpen((value) => !value);
          }}
          className="-mr-2 ml-0.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate transition-colors hover:bg-teal-tint/60 hover:text-teal-strong"
        >
          <ChevronDown
            aria-hidden
            className={cn(
              "h-4 w-4 transition-transform duration-200 motion-reduce:transition-none",
              open && "rotate-180",
            )}
          />
        </button>
      </div>

      {open && (
        <div id={panelId} className="pointer-events-none absolute inset-x-0 top-full z-50">
          <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
            <div
              ref={panelRef}
              className="pointer-events-auto relative mx-auto max-w-[1040px]"
              onPointerEnter={onEnter}
              onPointerLeave={onPanelLeave}
            >
              <div aria-hidden className="absolute inset-x-0 -top-5 h-5" />
              <div className="services-panel max-h-[calc(100dvh-9rem)] overflow-y-auto rounded-2xl border border-neutral-300 bg-ivory shadow-[0_24px_48px_-28px_rgba(13,17,23,0.35)]">
                <div className="flex items-center justify-between gap-6 px-8 pb-3 pt-6">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-strong">Services</p>
                  <Link
                    href={allServicesLink.href}
                    onClick={choose}
                    className="services-panel-link group inline-flex items-center gap-1.5 text-sm font-medium text-paper-foreground"
                  >
                    {allServicesLink.label}
                    <ArrowRight
                      aria-hidden
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </Link>
                </div>

                <ul className="grid grid-cols-3 gap-x-8 gap-y-1 px-5 pb-5">
                  {serviceFamilyLinks.map((family) => (
                    <li key={family.href}>
                      <Link
                        href={family.href}
                        onClick={choose}
                        className="group block h-full rounded-xl px-3 py-3 transition-colors hover:bg-teal-tint/50 focus-visible:bg-teal-tint/50 motion-reduce:transition-none"
                      >
                        <span className="block text-[0.9375rem] font-semibold leading-snug text-paper-foreground transition-colors group-hover:text-teal-strong group-focus-visible:text-teal-strong">
                          {family.label}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-slate">{family.description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-neutral-300/70 px-8 py-3.5">
                  <Link
                    href={howWeWorkLink.href}
                    onClick={choose}
                    className="services-panel-link group inline-flex items-center gap-1.5 text-sm font-medium text-paper-foreground"
                  >
                    {howWeWorkLink.label}
                    <ArrowRight
                      aria-hidden
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </Link>
                  <span className="text-sm text-slate-muted">{howWeWorkLink.description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
