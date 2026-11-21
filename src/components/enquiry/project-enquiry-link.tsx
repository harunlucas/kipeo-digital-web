"use client";

import { useRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { EnquiryServiceId } from "@/content/enquiry";
import { useEnquiry } from "./enquiry-provider";

export const ENQUIRY_FORM_ANCHOR = "enquiry-form";

export function enquiryHref(service?: EnquiryServiceId): string {
  return service ? `/contact?service=${service}#${ENQUIRY_FORM_ANCHOR}` : `/contact#${ENQUIRY_FORM_ANCHOR}`;
}

/**
 * On /contact the form is already on the page: bring it into view and move
 * focus to its heading once the (possibly smooth) scroll has settled, so
 * focusing doesn't cut the scroll short. Safari lacks `scrollend`; the
 * timeout covers it.
 */
export function scrollToInlineEnquiryForm() {
  const target = document.getElementById(ENQUIRY_FORM_ANCHOR);
  if (!target) return;

  let done = false;
  const focusTarget = () => {
    if (done) return;
    done = true;
    window.removeEventListener("scrollend", focusTarget);
    target.focus({ preventScroll: true });
  };

  window.addEventListener("scrollend", focusTarget, { once: true });
  setTimeout(focusTarget, 700);
  target.scrollIntoView({ block: "start" });
}

type ProjectEnquiryLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  /** Preselects this service when the draft is untouched. Omit for the general "Start a project". */
  service?: EnquiryServiceId;
  /** Runs before the panel opens or the inline form is focused — e.g. the mobile menu closes itself so only one overlay is active. */
  onBeforeOpen?: () => void;
  /** Where focus returns when the panel closes, if not this link (e.g. the hamburger, when the link lived inside the closed menu). */
  focusReturnTarget?: () => HTMLElement | null;
  children: ReactNode;
};

/**
 * Every project CTA ("Start a project", "Discuss an operational system", …).
 *
 * It is a real link to `/contact#enquiry-form` (carrying `?service=` where
 * one applies), so it works before hydration, without JavaScript, and when
 * opened in a new tab. `onNavigate` only fires for an ordinary same-tab
 * click — Ctrl/Cmd/Shift/middle-click are left to the browser — and that is
 * where the panel opens instead. On /contact itself it scrolls to the
 * visible form rather than opening a second copy over it.
 */
export function ProjectEnquiryLink({
  service,
  onBeforeOpen,
  focusReturnTarget,
  children,
  ...rest
}: ProjectEnquiryLinkProps) {
  const pathname = usePathname();
  const { openPanel, applyCtaService } = useEnquiry();
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      href={enquiryHref(service)}
      onNavigate={(event) => {
        event.preventDefault();
        onBeforeOpen?.();
        if (pathname === "/contact") {
          applyCtaService(service);
          scrollToInlineEnquiryForm();
          return;
        }
        openPanel({ service, trigger: focusReturnTarget?.() ?? ref.current });
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
