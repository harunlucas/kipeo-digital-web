"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import type { NavItem } from "@/content/navigation";
import { servicesMenuLinks } from "@/content/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useIsClient } from "@/lib/use-is-client";
import { NavLink } from "./nav-link";

type MobileMenuProps = {
  items: NavItem[];
  phoneHref: string;
  phoneLabel: string;
};

const DEFAULT_HEADER_OFFSET = 72;

function measureHeaderOffset() {
  return document.querySelector("header")?.getBoundingClientRect().bottom ?? DEFAULT_HEADER_OFFSET;
}

export function MobileMenu({ items, phoneHref, phoneLabel }: MobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const [menuTop, setMenuTop] = useState(DEFAULT_HEADER_OFFSET);
  const isClient = useIsClient();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isServicesActive = pathname === "/services" || pathname.startsWith("/services/") || pathname === "/studio";

  function close() {
    setOpen(false);
    setServicesOpen(false);
    triggerRef.current?.focus();
  }

  // The header's own height is fixed, but its distance from the viewport top
  // varies with the (dismissible, non-sticky) announcement bar above it —
  // measured fresh at open-time rather than assumed, so the drawer always
  // starts exactly where the header ends.
  function toggle() {
    if (!open) setMenuTop(measureHeaderOffset());
    setOpen((value) => !value);
  }

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    function onResize() {
      setMenuTop(measureHeaderOffset());
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-paper-foreground"
      >
        {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
      </button>

      {isClient &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ top: menuTop }}
                className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-ink"
              >
                <nav
                  aria-label="Mobile"
                  className="flex min-h-full flex-col justify-between px-6 pb-10 pt-8 sm:px-8"
                >
                  <ul className="flex flex-col gap-1">
                    {items.map((item, index) =>
                      item.label === "Services" ? (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
                          className="border-b border-ink-elevated"
                        >
                          <button
                            type="button"
                            onClick={() => setServicesOpen((value) => !value)}
                            aria-expanded={servicesOpen}
                            aria-controls="mobile-services-panel"
                            className={cn(
                              "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 py-4 font-display text-3xl transition-colors",
                              isServicesActive ? "text-teal" : "text-ink-foreground",
                            )}
                          >
                            Services
                            <ChevronDown
                              className={cn(
                                "h-6 w-6 shrink-0 transition-transform duration-200",
                                servicesOpen && "rotate-180",
                              )}
                              aria-hidden
                            />
                          </button>

                          {servicesOpen && (
                            <ul id="mobile-services-panel" className="flex flex-col gap-1 pb-4 pl-1">
                              {servicesMenuLinks.map((link) => (
                                <li key={link.href}>
                                  <NavLink
                                    href={link.href}
                                    className="block min-h-11 rounded-lg px-3 py-2.5 text-base text-ink-muted transition-colors hover:text-ink-foreground"
                                    activeClassName="text-teal"
                                  >
                                    {link.label}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.li>
                      ) : (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <NavLink
                            href={item.href}
                            className="block min-h-11 border-b border-ink-elevated py-4 font-display text-3xl text-ink-foreground"
                            activeClassName="text-teal"
                          >
                            {item.label}
                          </NavLink>
                        </motion.li>
                      ),
                    )}
                  </ul>

                  <div className="flex flex-col gap-4">
                    <a href={phoneHref} className="text-ink-muted">
                      {phoneLabel}
                    </a>
                    <Button href="/contact" variant="accent" size="lg" className="w-full">
                      Start a project
                    </Button>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
