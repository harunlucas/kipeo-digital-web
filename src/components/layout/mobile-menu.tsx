"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/content/navigation";
import { Button } from "@/components/ui/button";
import { NavLink } from "./nav-link";

type MobileMenuProps = {
  items: NavItem[];
  phoneHref: string;
  phoneLabel: string;
};

const noopSubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function MobileMenu({ items, phoneHref, phoneLabel }: MobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const isClient = useIsClient();

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-11 w-11 items-center justify-center rounded-full text-paper-foreground"
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
                className="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-ink"
              >
                <nav
                  aria-label="Mobile"
                  className="flex h-full flex-col justify-between px-6 pb-10 pt-8 sm:px-8"
                >
                  <ul className="flex flex-col gap-1">
                    {items.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <NavLink
                          href={item.href}
                          className="block border-b border-ink-elevated py-4 font-display text-3xl text-ink-foreground"
                          activeClassName="text-teal"
                        >
                          {item.label}
                        </NavLink>
                      </motion.li>
                    ))}
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
