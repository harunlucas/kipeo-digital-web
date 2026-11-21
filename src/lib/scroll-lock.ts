/**
 * One shared, reference-counted background scroll lock for the site's
 * overlays (the mobile menu and the project enquiry panel). Counting
 * matters during a handoff — menu → enquiry panel — so whichever overlay
 * releases first can never unlock the page under the one still open.
 *
 * Hiding the scrollbar would widen the page, so the body is padded by the
 * scrollbar's width while locked (no layout shift). `overflow: hidden` on
 * <html> keeps the current scroll position.
 *
 * While any overlay is open, `<html data-overlay-open>` is set: a future
 * bottom-left chat launcher can hide itself with
 * `html[data-overlay-open] .chat-launcher { display: none }` and reappears
 * automatically once every overlay has closed.
 */

let count = 0;
let saved: { overflow: string; paddingRight: string } | null = null;

export function acquireScrollLock(): () => void {
  if (count === 0) {
    const html = document.documentElement;
    const body = document.body;
    const scrollbar = window.innerWidth - html.clientWidth;
    saved = { overflow: html.style.overflow, paddingRight: body.style.paddingRight };
    html.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    html.dataset.overlayOpen = "";
  }
  count += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    count -= 1;
    if (count === 0 && saved) {
      document.documentElement.style.overflow = saved.overflow;
      document.body.style.paddingRight = saved.paddingRight;
      delete document.documentElement.dataset.overlayOpen;
      saved = null;
    }
  };
}
