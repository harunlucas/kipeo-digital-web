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

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === "true";
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
    window.localStorage.setItem(STORAGE_KEY, "true");
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return (
    <div className="relative bg-ink text-ink-foreground">
      <Container className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-2.5 pr-12 text-center sm:pr-14">
        {isImpactBuildOpen ? (
          <>
            <p className="text-xs sm:hidden">Impact Build applications open</p>
            <p className="hidden text-sm sm:block">
              Applications open · Kipeo Impact Build — one clearly scoped digital project supported this year.
            </p>
            <Link
              href="/impact-build"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-teal px-4 py-2 text-xs font-medium text-teal-foreground transition-colors hover:brightness-95 sm:text-sm"
            >
              Learn more and apply
            </Link>
          </>
        ) : (
          <>
            <p className="text-xs sm:text-sm">
              Planning software, a business system or a new website? Your initial consultation is free.
            </p>
            <Link
              href="/contact"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-teal px-4 py-2 text-xs font-medium text-teal-foreground transition-colors hover:brightness-95 sm:text-sm"
            >
              Start your enquiry
            </Link>
          </>
        )}
      </Container>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center text-ink-muted transition-colors hover:text-ink-foreground sm:right-4"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
