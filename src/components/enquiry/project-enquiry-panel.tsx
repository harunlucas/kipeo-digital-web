"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { enquiryCopy } from "@/content/enquiry";
import { useEnquiry } from "./enquiry-provider";
import { EnquiryForm } from "./enquiry-form";
import { acquireScrollLock } from "@/lib/scroll-lock";
import { containTabKey } from "@/lib/focus-trap";

const TRANSITION_MS = 260;
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The site-wide project enquiry panel: a right-side sheet on desktop, a
 * full-width dialog on phones.
 *
 * Built on the native modal <dialog>: it sits in the top layer (above the
 * sticky header and the mobile menu), makes everything behind it inert,
 * keeps keyboard focus inside, and reports Escape as `cancel` — intercepted
 * here so closing always runs the same animated path and restores focus to
 * the CTA that opened it.
 *
 * On phones the sheet is sized to the *visual* viewport, so with the
 * on-screen keyboard open the close button stays at the top, and the form
 * scrolls inside the sheet to the focused field and the submit button.
 */
export function ProjectEnquiryPanel() {
  const { isPanelOpen, closePanel, panelSession, triggerRef } = useEnquiry();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const unlockRef = useRef<(() => void) | null>(null);
  const lastPathnameRef = useRef(pathname);
  const restoreFocusRef = useRef(true);
  const [present, setPresent] = useState(false);

  if (isPanelOpen && !present) setPresent(true);

  // Leaving the page (browser Back, or a link inside the form such as the
  // Privacy Policy) closes the panel without pulling focus back to a CTA on
  // the previous page; the draft is kept.
  useEffect(() => {
    if (lastPathnameRef.current === pathname) return;
    lastPathnameRef.current = pathname;
    restoreFocusRef.current = false;
    closePanel();
  }, [pathname, closePanel]);

  const finishClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    unlockRef.current?.();
    unlockRef.current = null;
    setPresent(false);
    const trigger = triggerRef.current;
    if (restoreFocusRef.current && trigger?.isConnected) trigger.focus({ preventScroll: true });
    restoreFocusRef.current = true;
  }, [triggerRef]);

  // Open: show the dialog, lock scroll, then flip to the open state on the
  // next frame so the slide-in transition runs from its start position.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isPanelOpen || !present || !dialog || dialog.open) return;

    unlockRef.current = acquireScrollLock();
    dialog.showModal();
    headingRef.current?.focus({ preventScroll: true });
    const frame = requestAnimationFrame(() => {
      dialog.dataset.state = "open";
    });
    return () => cancelAnimationFrame(frame);
  }, [isPanelOpen, present]);

  // Close: slide out, then close the dialog, unlock and restore focus.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (isPanelOpen || !present || !dialog) return;

    dialog.dataset.state = "closed";
    const timeout = window.setTimeout(finishClose, prefersReducedMotion() ? 0 : TRANSITION_MS);
    return () => window.clearTimeout(timeout);
  }, [isPanelOpen, present, finishClose]);

  // Phones: track the visual viewport (it shrinks when the keyboard opens).
  useEffect(() => {
    const dialog = dialogRef.current;
    const viewport = window.visualViewport;
    if (!present || !dialog || !viewport) return;

    const update = () => {
      dialog.style.setProperty("--enquiry-vh", `${viewport.height}px`);
      dialog.style.setProperty("--enquiry-vt", `${viewport.offsetTop}px`);
    };
    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
    };
  }, [present]);

  // Safety net: if anything ever unmounts the panel while it's open.
  useEffect(() => () => unlockRef.current?.(), []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="enquiry-panel-title"
      data-state="closed"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          // Keep Escape to this dialog: the mobile menu also closes on a
          // window-level Escape, which would remove the CTA focus returns to.
          event.stopPropagation();
          return;
        }
        containTabKey(event, dialogRef.current, headingRef.current);
      }}
      onCancel={(event) => {
        event.preventDefault();
        closePanel();
      }}
      onClose={() => {
        // A close the browser forced past `cancel` (e.g. repeated Escape).
        if (isPanelOpen) closePanel();
      }}
      className="enquiry-dialog group/panel fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-paper-foreground backdrop:bg-transparent"
    >
      {present && (
        <>
          <div
            aria-hidden
            onClick={closePanel}
            className="absolute inset-0 bg-ink/35 opacity-0 dark:bg-black/60 transition-opacity duration-[260ms] ease-out group-data-[state=open]/panel:opacity-100 motion-reduce:transition-none"
          />
          <div
            className="enquiry-sheet absolute right-0 flex w-full flex-col border-neutral-300 bg-overlay shadow-panel transition-transform duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:w-[500px] sm:border-l translate-x-full group-data-[state=open]/panel:translate-x-0 motion-reduce:transition-none"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-neutral-200 px-5 pb-4 pt-5 sm:px-8 sm:pt-7">
              <h2
                id="enquiry-panel-title"
                ref={headingRef}
                tabIndex={-1}
                className="font-display text-[1.625rem] leading-tight tracking-[-0.015em] text-paper-foreground focus:outline-none sm:text-[1.875rem]"
              >
                {enquiryCopy.heading}
              </h2>
              <button
                type="button"
                onClick={closePanel}
                aria-label="Close project enquiry"
                className="-mr-2 -mt-1 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate transition-colors hover:bg-paper-elevated hover:text-paper-foreground"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-5 sm:px-8 sm:pt-6">
              <p className="text-base leading-relaxed text-slate">{enquiryCopy.intro}</p>
              <div className="mt-6">
                <EnquiryForm key={panelSession} context="panel" onClose={closePanel} />
              </div>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
