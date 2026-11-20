"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Container } from "./container";
import { impactBuildConfig } from "@/content/impact-build";

const isImpactBuildOpen = impactBuildConfig.status === "open";

// Two independent dismissal keys: dismissing one banner should never
// suppress the other, and a visitor who dismissed the default bar should
// still see the Impact Build announcement once applications open.
const STORAGE_KEY = isImpactBuildOpen ? "kipeo-impact-build-announcement-dismissed" : "kipeo-announcement-dismissed";
const CHANGE_EVENT = isImpactBuildOpen
  ? "kipeo-impact-build-announcement-dismissed-change"
  : "kipeo-announcement-dismissed-change";

const DISMISSAL_TTL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days — the banner returns automatically after this

const barLinkClass =
  "inline-flex h-6 shrink-0 items-center gap-1 rounded-sm font-medium text-teal underline decoration-teal/40 underline-offset-2 transition-colors hover:text-ink-foreground hover:decoration-ink-foreground/50";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

/**
 * Stores the dismissal timestamp (not a plain boolean) so it expires on its
 * own after `DISMISSAL_TTL_MS` — no separate cleanup job needed, and a
 * corrupt or pre-existing non-numeric value is treated as "not dismissed"
 * rather than crashing. localStorage only, so dismissal is scoped to this
 * browser and never touches the server or any other device.
 */
function getSnapshot() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return false;
  const dismissedAt = Number(stored);
  if (!Number.isFinite(dismissedAt)) return false;
  return Date.now() - dismissedAt < DISMISSAL_TTL_MS;
}

function getServerSnapshot() {
  return false;
}

/**
 * `useSyncExternalStore`'s server snapshot always reports "not dismissed",
 * matching SSR output exactly, so hydration never mismatches; React then
 * reconciles against the real client snapshot itself right after — no
 * manual effect/setState needed, and a returning dismissed visitor never
 * sees the bar flash in. It's plain page flow (not sticky) above the sticky
 * `<Header>`, so scrolling past it is what "sticks" the header at the top;
 * no manual offset math needed.
 */
export function AnnouncementBar() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (dismissed) return null;

  function handleDismiss() {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return (
    <div className="relative bg-ink text-ink-foreground">
      {/* A thin 28px strip: small type and an underlined text link instead of
          a button. The link and dismiss control keep at least the 24px
          minimum target height. Copy shortens with the width so everything
          stays on one line. */}
      <Container className="flex flex-wrap items-center justify-center gap-x-3 py-0.5 pr-10 text-center text-xs sm:pr-12">
        {isImpactBuildOpen ? (
          <>
            <p className="sm:hidden">Impact Build applications open</p>
            <p className="hidden sm:block lg:hidden">Applications open · Kipeo Impact Build</p>
            <p className="hidden lg:block">
              Applications open · Kipeo Impact Build — one clearly scoped digital project supported this year.
            </p>
            <Link href="/impact-build" className={barLinkClass}>
              <span className="sm:hidden">Apply</span>
              <span className="hidden sm:inline">Learn more and apply</span>
              <span aria-hidden>→</span>
            </Link>
          </>
        ) : (
          <>
            <p className="sm:hidden">Your initial consultation is free.</p>
            <p className="hidden sm:block">
              Planning software, a business system or a new website? Your initial consultation is free.
            </p>
            <Link href="/contact" className={barLinkClass}>
              Start your enquiry
              <span aria-hidden>→</span>
            </Link>
          </>
        )}
      </Container>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink-foreground sm:right-4"
      >
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}
