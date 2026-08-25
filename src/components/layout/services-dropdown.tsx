"use client";

import { useEffect, useId, useRef, useState, type FocusEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { servicesMenuLinks } from "@/content/navigation";
import { cn } from "@/lib/cn";

/**
 * Disclosure-pattern dropdown (button + toggled panel), not an ARIA `menu`
 * widget — this is site navigation, not an application menu, so it doesn't
 * need roving-tabindex/arrow-key semantics. A native `<button>` already
 * responds to Enter and Space. The panel only mounts while open, so its
 * links are never reachable by Tab while hidden. Hover is a progressive
 * enhancement layered on the same `open` state that click/keyboard drive —
 * the trigger and panel share one wrapper, so moving the pointer from one
 * into the other never crosses a "leave" boundary.
 */
export function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();
  const isActive = pathname === "/services" || pathname.startsWith("/services/");

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
      setOpen(false);
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "group relative inline-flex cursor-pointer items-center gap-1 py-2 text-sm font-medium text-slate transition-colors hover:text-paper-foreground",
          isActive && "text-paper-foreground",
        )}
      >
        Services
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
        <span
          className={cn(
            "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-teal-strong transition-transform duration-200 ease-out",
            open || isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          )}
        />
      </button>

      {open && (
        // `pt-3` (not a margin on the card below) keeps this panel's own hit
        // box flush against the trigger's bottom edge — a margin gap here
        // would be dead space the pointer has to cross unhandled, closing
        // the dropdown before the pointer ever reaches the card.
        <div id={panelId} className="absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-3">
          <div className="rounded-2xl border border-neutral-200 bg-paper p-2 shadow-panel">
            <ul className="flex flex-col">
              {servicesMenuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-mist"
                  >
                    <span className="block text-sm font-medium text-paper-foreground">{link.label}</span>
                    <span className="mt-0.5 block text-xs text-slate-muted">{link.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
