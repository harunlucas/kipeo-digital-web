"use client";

import { Fragment, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/cn";
import { AnimatedLink } from "./animated-link";
import { BusinessSystemsPreview } from "./business-systems-preview";
import { EcommercePreview } from "./ecommerce-preview";
import { AutomationPreview } from "./automation-preview";

/**
 * "What we build" as an explorer: three services a visitor can open, each
 * with its own small working demo, rather than three static cards.
 *
 * Layout is `.wwb-layout` (unchanged — heading, "Explore all services" and
 * this explorer reflow between breakpoints from one copy of each, see that
 * rule in globals.css) wrapping `.wwb-explorer`, which does the same job one
 * level down: on mobile each preview opens directly under its own selector
 * (an accordion); on desktop all three selectors move into a 35% left
 * column and whichever preview is active fills one shared 65% pane on the
 * right. See `.wwb-explorer` in globals.css for why that's CSS and not
 * Tailwind utilities.
 *
 * All three preview components stay mounted at every breakpoint — only
 * `.wwb-preview-inactive` toggles on the inactive ones (out of layout on
 * mobile; kept in layout but invisible on desktop so the shared pane never
 * changes height) — which is what keeps each preview's
 * own demo state (the selected record, the bag count, the approved invoice)
 * alive across both switching services and resizing the viewport, per "one
 * shared set of content and demo state across screen sizes."
 *
 * No `scroll-mt` here: `html` already carries `scroll-padding-top: 88px`,
 * which clears the 72px sticky header, and the section's own top padding
 * puts the heading comfortably below it when the hero's "Explore services"
 * link jumps to `#what-we-build`.
 */

type ServiceId = "business-systems" | "ecommerce" | "automation";

type Service = {
  id: ServiceId;
  title: string;
  description: string;
  Preview: () => React.ReactElement;
};

const services: Service[] = [
  {
    id: "business-systems",
    title: "Custom software & business systems",
    description:
      "Give inspectors and supervisors a shared record of what was checked, who owns the next step and what still needs attention.",
    Preview: BusinessSystemsPreview,
  },
  {
    id: "ecommerce",
    title: "Websites & e-commerce",
    description:
      "Help a shopper discover a product, inspect the details and add it to their bag from a phone.",
    Preview: EcommercePreview,
  },
  {
    id: "automation",
    title: "Automation, AI & integrations",
    description:
      "Explore how a CNC toolpath is built, or follow a workplace hazard from reporting to verification.",
    Preview: AutomationPreview,
  },
];

/*
 * AUTO-ROTATION. The services advance every `ROTATE_MS`, in list order,
 * looping, from the moment the page loads. Only the "Switch to manual"
 * control stops it; clicking a service jumps to it and the count restarts
 * from there, still in auto.
 *
 * - `autoplay`: derived from `choice`. By default it is on for desktop
 *   without reduced motion. Mobile starts manual, because each change there
 *   opens a different accordion panel and would move the page under a
 *   reader; reduced motion starts manual too. Either can opt in with the
 *   control. Shrinking to mobile width ends an explicit auto.
 * - `inView` / `tabVisible`: the clock is suspended while the section is
 *   fully off-screen or the browser tab is hidden, so nobody returns to find
 *   it mid-way through a service they never saw.
 *
 * There is only ever one `setTimeout`, owned by one effect. Its cleanup
 * runs on every suspension, click and advance, so a stale timer can never
 * fire a late switch after a rapid click. On a suspension the cleanup banks
 * the time already served, so resuming finishes the same segment. The
 * selector's progress line is a CSS animation whose duration comes from
 * `ROTATE_MS` (the `--wwb-rotate` custom property), paused and resumed with
 * the timer and restarted per segment by a key change. The timer only ever
 * changes `activeId`; it never moves focus.
 */
const ROTATE_MS = 4000;

const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** `null` during server render and hydration, so both start manual. */
function useMediaQuery(query: string): boolean | null {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => null,
  );
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function useTabVisible(): boolean {
  return useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => true,
  );
}

/**
 * "default" follows the starting rule (rotate on desktop without reduced
 * motion); "play" and "stopped" are the visitor's explicit choices.
 */
type RotationChoice = "default" | "play" | "stopped";

export function WhatWeBuild() {
  const [activeId, setActiveId] = useState<ServiceId>("business-systems");

  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const tabVisible = useTabVisible();
  const [choice, setChoice] = useState<RotationChoice>("default");
  const [inView, setInView] = useState(false);
  /** Bumped by a click or a switch to auto, so the current service gets a
   *  fresh, full segment. */
  const [segmentKey, setSegmentKey] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const segment = useRef({ id: activeId, key: segmentKey, remaining: ROTATE_MS });

  const autoplay =
    choice === "play" ||
    (choice === "default" && isDesktop === true && prefersReducedMotion === false);

  // Dropping to the mobile accordion layout ends an explicit Play, so an
  // expanded panel can't start switching under a reader. ("default" needs no
  // handling: it only ever rotates on desktop.)
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (!mql.matches) setChoice((current) => (current === "play" ? "stopped" : current));
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const running = autoplay && inView && tabVisible;

  useEffect(() => {
    if (segment.current.id !== activeId || segment.current.key !== segmentKey) {
      segment.current = { id: activeId, key: segmentKey, remaining: ROTATE_MS };
    }
    if (!running) return;

    const current = segment.current;
    const startedAt = performance.now();
    const timer = window.setTimeout(() => {
      setActiveId((id) => {
        const index = services.findIndex((service) => service.id === id);
        return services[(index + 1) % services.length].id;
      });
    }, current.remaining);

    return () => {
      window.clearTimeout(timer);
      current.remaining = Math.max(0, current.remaining - (performance.now() - startedAt));
    };
  }, [running, activeId, segmentKey]);

  function toggleAutoplay() {
    if (autoplay) {
      setChoice("stopped");
    } else {
      setSegmentKey((key) => key + 1);
      setChoice("play");
    }
  }

  return (
    <section
      ref={sectionRef}
      id="what-we-build"
      className="bg-ivory pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pt-20"
      style={{ "--wwb-rotate": `${ROTATE_MS}ms` } as React.CSSProperties}
    >
      <Container>
        <div className="wwb-layout">
          <h2 className="wwb-heading section-headline">
            <span className="font-display font-semibold text-paper-foreground">What we</span>{" "}
            <span className="font-serif-display italic text-teal-strong">build</span>
          </h2>

          <AnimatedLink href="/services" className="wwb-link">
            Explore all services
          </AnimatedLink>

          <div className="wwb-grid">
            {/* The one control that stops the rotation. While auto runs, its
                light glows and pulses (`.wwb-mode-light`) so it's easy to
                spot; in manual it goes still and grey. */}
            <div className="mb-5 flex lg:mb-6">
              <button
                type="button"
                onClick={toggleAutoplay}
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border px-4 text-sm font-medium transition-colors",
                  autoplay
                    ? "border-teal-strong/40 bg-teal-tint/70 text-teal-foreground hover:border-teal-strong dark:text-fg"
                    : "border-neutral-300 text-slate hover:border-teal-strong/50 hover:text-paper-foreground",
                )}
              >
                <span aria-hidden className={cn("wwb-mode-light", autoplay && "is-on")} />
                {autoplay ? (
                  <>
                    <span className="text-teal-strong">Auto</span>
                    <span aria-hidden className="text-teal-strong/40">
                      ·
                    </span>
                    Switch to manual
                    <Pause className="h-3.5 w-3.5" aria-hidden />
                  </>
                ) : (
                  <>
                    <span>Manual</span>
                    <span aria-hidden className="text-neutral-300">
                      ·
                    </span>
                    Switch to auto
                    <Play className="h-3.5 w-3.5" aria-hidden />
                  </>
                )}
              </button>
            </div>

            <div className="wwb-explorer">
              {services.map(({ id, title, description, Preview }, index) => {
                const isActive = id === activeId;
                const n = index + 1;
                const previewId = `wwb-preview-${id}`;

                // `.wwb-explorer`'s grid-area placement only works on its
                // *direct* children, so the selector and its preview are
                // siblings here (via Fragment), not parent/child — nesting
                // the preview inside the selector's own div would trap it
                // there, and `grid-area` on a non-grid-child is a no-op,
                // silently breaking the desktop split-pane reflow.
                return (
                  <Fragment key={id}>
                    <div
                      className={cn(
                        `wwb-explorer-sel-${n}`,
                        index > 0 && "border-t border-neutral-300/70 pt-6 lg:border-t-0 lg:pt-0",
                      )}
                    >
                      <button
                        type="button"
                        aria-expanded={isActive}
                        aria-controls={previewId}
                        onClick={() => {
                          setActiveId(id);
                          setSegmentKey((key) => key + 1);
                        }}
                        className="group flex w-full cursor-pointer items-start gap-4 text-left"
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "mt-1 w-[3px] shrink-0 self-stretch rounded-full transition-colors duration-200",
                            isActive ? "bg-teal-strong" : "bg-transparent",
                          )}
                        />
                        <span className="flex-1 pb-1">
                          <span
                            className={cn(
                              "block text-lg font-semibold leading-snug transition-colors duration-200 sm:text-xl",
                              isActive
                                ? "text-paper-foreground"
                                : "text-slate group-hover:text-paper-foreground",
                            )}
                          >
                            {/* While rotating, the active underline is a
                                progress line filling over the segment;
                                otherwise it's the static drawn underline. */}
                            <span
                              key={isActive && autoplay ? `${id}-${segmentKey}` : id}
                              className={cn(
                                "home-underline",
                                isActive && (autoplay ? "wwb-progress" : "is-active"),
                              )}
                              style={
                                isActive && autoplay
                                  ? { animationPlayState: running ? "running" : "paused" }
                                  : undefined
                              }
                            >
                              {title}
                            </span>
                          </span>
                          {isActive ? (
                            <span className="mt-2 block max-w-md text-sm leading-relaxed text-slate sm:text-base">
                              {description}
                            </span>
                          ) : null}
                        </span>
                      </button>
                    </div>

                    {/* Mobile: this sits directly under its own selector
                        (next named area in the stack). Desktop: all three
                        share the one 65% pane via the media-query override
                        in globals.css, so only the active one is ever
                        visible regardless of where it is in the DOM. The
                        border/rounding lives here rather than per-preview
                        since it's one shared frame all three sit inside, not
                        a property of any single preview's own content. */}
                    <div
                      id={previewId}
                      className={cn(
                        `wwb-explorer-prev-${n}`,
                        "mt-6 rounded-2xl border border-neutral-300 bg-paper p-6 sm:p-7 lg:mt-0 lg:p-8",
                        isActive ? "wwb-preview-enter" : "wwb-preview-inactive",
                      )}
                    >
                      <Preview />
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
