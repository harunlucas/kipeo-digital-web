"use client";

import { useCallback, useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import type { NavItem } from "@/content/navigation";
import { allServicesLink, howWeWorkLink, serviceFamilyLinks } from "@/content/navigation";
import { buttonClassName } from "@/components/ui/button";
import { ProjectEnquiryLink } from "@/components/enquiry/project-enquiry-link";
import { AppearanceOptions } from "@/components/theme/appearance-control";
import { cn } from "@/lib/cn";
import { useIsClient } from "@/lib/use-is-client";
import { acquireScrollLock } from "@/lib/scroll-lock";
import { containTabKey } from "@/lib/focus-trap";
import { BrandMark, Wordmark } from "./brand-mark";
import { Container } from "./container";

type MobileMenuProps = {
  items: NavItem[];
  phoneHref: string;
  phoneLabel: string;
};

/** Repeated literally from header.tsx: the desktop navigation takes over from here. */
const DESKTOP_QUERY = "(min-width: 1200px)";
const MENU_ID = "mobile-menu";
const FADE_MS = 180;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Leave Ctrl/Cmd/Shift/middle clicks (new tab or window) alone. */
function isPlainClick(event: MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

type CloseOptions = { restoreFocus?: boolean; animate?: boolean };

const rowClass =
  "group flex min-h-14 w-full items-center justify-between gap-4 py-3.5 text-left font-display text-xl font-medium leading-snug tracking-[-0.01em] text-paper-foreground";
const childClass =
  "-ml-px flex min-h-11 items-center gap-2 border-l-2 py-2 pl-4 text-[0.9375rem] leading-snug transition-colors hover:text-teal-strong focus-visible:text-teal-strong motion-reduce:transition-none";

/**
 * A primary row's label with the desktop nav's interaction: a fine teal
 * underline draws left to right on hover or keyboard focus, and stays drawn
 * for the current destination. (`hover:` only applies on devices that can
 * hover, so taps never leave it stuck.)
 */
function RowLabel({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <span className="relative">
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 -bottom-1 h-px origin-left bg-teal-strong transition-transform duration-200 ease-out motion-reduce:transition-none",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100",
        )}
      />
    </span>
  );
}

/**
 * Phone and tablet navigation (below the 1200px desktop breakpoint).
 *
 * Two states of one component. Closed, it is the hamburger in the header.
 * Open, it is a full-height modal <dialog> on the overlay surface whose top row redraws
 * the header at exactly the same position — same container, same 72px row,
 * logo left — with a close button where the hamburger was, so nothing jumps
 * when switching states. The page above the header (the announcement bar)
 * stays visible but inert.
 *
 * The native modal dialog makes the page inert and reports Escape as
 * `cancel`; Tab is wrapped so focus stays inside. Focus moves to the close
 * button on open and back to the hamburger on dismissal.
 *
 * The link list scrolls on its own between the header row and a footer that
 * holds the one "Start a project" button, and the Appearance choice sits
 * after the links, usable without closing the menu, so every service stays reachable
 * on short screens. "Start a project" closes the menu *before* the shared
 * enquiry trigger runs (one overlay at a time), and the enquiry panel then
 * returns focus to this hamburger when it closes. The scroll lock is the
 * shared, counted one, so the handoff never unlocks the page underneath.
 *
 * Closes on: the close button, Escape, choosing any link (same-page anchors
 * included), a route change, or the viewport reaching the desktop breakpoint.
 */
export function MobileMenu({ items, phoneHref, phoneLabel }: MobileMenuProps) {
  const pathname = usePathname();
  const isClient = useIsClient();
  const servicesPanelId = useId();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [menuTop, setMenuTop] = useState(0);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const unlockRef = useRef<(() => void) | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const lastPathnameRef = useRef(pathname);

  const inServicesSection =
    pathname === allServicesLink.href || pathname.startsWith(`${allServicesLink.href}/`) || pathname === howWeWorkLink.href;

  function openMenu() {
    // The header's distance from the top varies with the dismissible
    // announcement bar; the open menu starts exactly where the header does.
    const header = hamburgerRef.current?.closest("header");
    setMenuTop(Math.max(0, Math.round(header?.getBoundingClientRect().top ?? 0)));
    setHash(window.location.hash);
    // On /services (or the process page) Services starts expanded.
    setServicesOpen(inServicesSection);
    setOpen(true);
  }

  const closeMenu = useCallback(({ restoreFocus = true, animate = true }: CloseOptions = {}) => {
    const dialog = dialogRef.current;
    // Release the lock straight away, so a same-page anchor or the enquiry
    // panel taking over sees the page as it should.
    unlockRef.current?.();
    unlockRef.current = null;
    setOpen(false);
    if (!dialog?.open) return;

    dialog.dataset.state = "closed";
    const finish = () => {
      if (dialog.open) dialog.close();
      if (restoreFocus) hamburgerRef.current?.focus({ preventScroll: true });
    };
    window.clearTimeout(closeTimer.current);
    if (animate && !prefersReducedMotion()) closeTimer.current = window.setTimeout(finish, FADE_MS);
    else finish();
  }, []);

  // Open: show the modal, lock scroll, focus the close button (same spot as
  // the hamburger), then fade the list in on the next frame.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    window.clearTimeout(closeTimer.current);
    unlockRef.current ??= acquireScrollLock();
    if (!dialog.open) dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });
    const frame = requestAnimationFrame(() => {
      dialog.dataset.state = "open";
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  // Route change (Back/Forward included).
  useEffect(() => {
    if (lastPathnameRef.current === pathname) return;
    lastPathnameRef.current = pathname;
    closeMenu({ restoreFocus: false, animate: false });
  }, [pathname, closeMenu]);

  // Reaching the desktop breakpoint: close and unlock; the desktop nav takes over.
  useEffect(() => {
    if (!open) return;
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (query.matches) closeMenu({ restoreFocus: false, animate: false });
    };
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [open, closeMenu]);

  useEffect(
    () => () => {
      window.clearTimeout(closeTimer.current);
      unlockRef.current?.();
    },
    [],
  );

  const onLinkClick = (event: MouseEvent) => {
    if (isPlainClick(event)) closeMenu({ restoreFocus: false });
  };

  const isCurrent = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const familyCurrent = (href: string) => {
    const [path, fragment] = href.split("#");
    return pathname === path && !!fragment && hash === `#${fragment}`;
  };
  const anyFamilyCurrent = serviceFamilyLinks.some((family) => familyCurrent(family.href));
  const allServicesCurrent = pathname === allServicesLink.href && !anyFamilyCurrent;

  return (
    // Shown below the header's measured 1200px desktop breakpoint (see header.tsx).
    <div className="min-[1200px]:hidden">
      <button
        ref={hamburgerRef}
        type="button"
        onClick={openMenu}
        aria-expanded={open}
        aria-controls={MENU_ID}
        aria-label="Open menu"
        className="-mr-2.5 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-paper-foreground transition-colors hover:bg-paper-elevated"
      >
        <Menu className="h-6 w-6" aria-hidden />
      </button>

      {isClient &&
        createPortal(
          <dialog
            ref={dialogRef}
            id={MENU_ID}
            aria-label="Site menu"
            data-state="closed"
            onKeyDown={(event) => {
              if (event.key === "Escape") event.stopPropagation();
              containTabKey(event, dialogRef.current);
            }}
            onCancel={(event) => {
              event.preventDefault();
              closeMenu();
            }}
            onClose={() => {
              // A close the browser forced past `cancel`.
              if (open) closeMenu({ animate: false });
            }}
            style={{ top: menuTop, height: `calc(100dvh - ${menuTop}px)` }}
            className="group/menu fixed inset-x-0 m-0 max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-paper-foreground backdrop:bg-transparent min-[1200px]:hidden"
          >
            <div className="flex h-full flex-col">
              {/* The header, redrawn in place: logo left, close where the hamburger was. Never animates. */}
              <div className="h-[72px] shrink-0 border-b border-neutral-200 bg-ivory">
                <Container className="flex h-full items-center justify-between gap-6">
                  <Link
                    href="/"
                    aria-label="Kipeo Digital — Home"
                    onClick={onLinkClick}
                    className="flex min-w-0 items-center gap-2.5 overflow-hidden rounded-md"
                  >
                    <BrandMark className="h-8 w-8" />
                    <Wordmark />
                  </Link>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => closeMenu()}
                    aria-label="Close menu"
                    className="-mr-2.5 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-paper-foreground transition-colors hover:bg-paper-elevated"
                  >
                    <X className="h-6 w-6" aria-hidden />
                  </button>
                </Container>
              </div>

              <div className="flex min-h-0 flex-1 flex-col bg-overlay opacity-0 transition-opacity duration-200 ease-out group-data-[state=open]/menu:opacity-100 motion-reduce:transition-none">
                <nav
                  aria-label="Mobile"
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
                >
                  <Container className="pb-10 pt-3 transition-transform duration-200 ease-out translate-y-1 group-data-[state=open]/menu:translate-y-0 motion-reduce:transition-none motion-reduce:translate-y-0">
                    <ul className="divide-y divide-neutral-200 border-b border-neutral-200">
                      {items.map((item) =>
                        item.label === "Services" ? (
                          <li key={item.href}>
                            <button
                              type="button"
                              onClick={() => setServicesOpen((value) => !value)}
                              aria-expanded={servicesOpen}
                              aria-controls={servicesPanelId}
                              className={cn(rowClass, "cursor-pointer")}
                            >
                              <RowLabel active={inServicesSection || servicesOpen}>{item.label}</RowLabel>
                              <span className="flex items-center gap-3">
                                <ChevronDown
                                  aria-hidden
                                  className={cn(
                                    "h-4 w-4 shrink-0 text-teal-strong transition-transform duration-200 motion-reduce:transition-none",
                                    servicesOpen && "rotate-180",
                                  )}
                                />
                              </span>
                            </button>

                            <div id={servicesPanelId} hidden={!servicesOpen}>
                              <ul className="mb-4 ml-0.5 border-l border-neutral-300">
                                <li>
                                  <Link
                                    href={allServicesLink.href}
                                    onClick={onLinkClick}
                                    aria-current={allServicesCurrent ? "page" : undefined}
                                    className={cn(
                                      childClass,
                                      "group font-medium text-teal-strong hover:text-link-hover focus-visible:text-link-hover",
                                      allServicesCurrent ? "border-teal-strong" : "border-transparent",
                                    )}
                                  >
                                    Explore all services
                                    <ArrowRight
                                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none"
                                      aria-hidden
                                    />
                                  </Link>
                                </li>
                                {serviceFamilyLinks.map((family) => {
                                  const current = familyCurrent(family.href);
                                  return (
                                    <li key={family.href}>
                                      <Link
                                        href={family.href}
                                        onClick={onLinkClick}
                                        aria-current={current ? "location" : undefined}
                                        className={cn(
                                          childClass,
                                          current
                                            ? "border-teal-strong font-medium text-paper-foreground"
                                            : "border-transparent text-slate",
                                        )}
                                      >
                                        {family.label}
                                      </Link>
                                    </li>
                                  );
                                })}
                                <li>
                                  <Link
                                    href={howWeWorkLink.href}
                                    onClick={onLinkClick}
                                    aria-current={isCurrent(howWeWorkLink.href) ? "page" : undefined}
                                    className={cn(
                                      childClass,
                                      isCurrent(howWeWorkLink.href)
                                        ? "border-teal-strong font-medium text-paper-foreground"
                                        : "border-transparent text-slate",
                                    )}
                                  >
                                    {howWeWorkLink.label}
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </li>
                        ) : (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={onLinkClick}
                              aria-current={isCurrent(item.href) ? "page" : undefined}
                              className={rowClass}
                            >
                              <RowLabel active={isCurrent(item.href)}>{item.label}</RowLabel>
                            </Link>
                          </li>
                        ),
                      )}
                    </ul>

                    {/* Applies immediately; the menu stays open so the change can be seen and undone. */}
                    <div className="mt-7">
                      <AppearanceOptions layout="row" />
                    </div>
                  </Container>
                </nav>

                <div className="shrink-0 border-t border-neutral-200 bg-overlay shadow-[0_-12px_24px_-20px_rgba(13,17,23,0.25)] dark:shadow-[0_-12px_24px_-20px_rgba(0,0,0,0.7)]">
                  <Container className="flex flex-col gap-1 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
                    <ProjectEnquiryLink
                      onBeforeOpen={() => closeMenu({ restoreFocus: false, animate: false })}
                      focusReturnTarget={() => hamburgerRef.current}
                      className={buttonClassName({ variant: "primary", size: "lg", className: "w-full" })}
                    >
                      Start a project
                    </ProjectEnquiryLink>
                    <a
                      href={phoneHref}
                      className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-slate transition-colors hover:text-paper-foreground"
                    >
                      <Phone className="h-4 w-4" aria-hidden />
                      {phoneLabel}
                    </a>
                  </Container>
                </div>
              </div>
            </div>
          </dialog>,
          document.body,
        )}
    </div>
  );
}
