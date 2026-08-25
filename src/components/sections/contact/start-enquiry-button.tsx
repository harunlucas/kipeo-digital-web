"use client";

import { Button } from "@/components/ui/button";

/**
 * Next's `<Link>` intercepts a same-page hash click and scrolls to it, but
 * — unlike a plain `<a href="#...">` left to the browser's native fragment
 * navigation — never moves focus to the target. That silently breaks
 * keyboard and screen-reader use of "jump to the form" links. This waits
 * for the scroll to actually finish (so focusing doesn't cut the smooth
 * scroll short) before focusing the `#enquiry-form` heading.
 */
export function StartEnquiryButton() {
  function handleClick() {
    const target = document.getElementById("enquiry-form");
    if (!target) return;

    let done = false;
    const focusTarget = () => {
      if (done) return;
      done = true;
      window.removeEventListener("scrollend", focusTarget);
      target.focus({ preventScroll: true });
    };

    window.addEventListener("scrollend", focusTarget, { once: true });
    // Safari has no `scrollend` yet — this fallback covers it either way.
    setTimeout(focusTarget, 700);
  }

  return (
    <Button href="#enquiry-form" variant="primary" size="lg" onClick={handleClick}>
      Start your enquiry
    </Button>
  );
}
