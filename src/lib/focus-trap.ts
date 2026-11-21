import type { KeyboardEvent } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

/**
 * Wraps Tab / Shift+Tab at the ends of a modal <dialog>. The native modal
 * dialog makes the page behind it inert, but Chromium still lets Tab leave
 * it for the browser's own UI; this keeps focus inside. `start` is an
 * optional programmatically-focused element (e.g. a heading with
 * tabIndex=-1) treated as the first stop for Shift+Tab.
 */
export function containTabKey(event: KeyboardEvent, container: HTMLElement | null, start?: HTMLElement | null) {
  if (event.key !== "Tab" || !container) return;
  const focusables = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.getClientRects().length > 0,
  );
  if (focusables.length === 0) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const current = document.activeElement;
  if (event.shiftKey && (current === first || current === start || current === container)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && current === last) {
    event.preventDefault();
    first.focus();
  }
}
