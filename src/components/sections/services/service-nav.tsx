"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type ServiceNavItem = { id: string; navLabel: string; icon: ReactNode };

/**
 * Sticky in-page navigator for the seven /services sections. Links are
 * plain anchors so it's fully usable with JavaScript disabled; the
 * IntersectionObserver only adds the active-state highlight on top. Icons
 * arrive pre-rendered as `ReactNode` (not the raw `LucideIcon` component
 * reference) because this is a Client Component and functions can't cross
 * the server/client boundary as props — the same pattern already used by
 * `ServiceTabs`.
 */
export function ServiceNav({ sections }: { sections: ServiceNavItem[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Service sections"
      className="sticky top-[72px] z-40 border-b border-neutral-200 bg-paper/95 backdrop-blur-md"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
        <ul className="flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id} className="shrink-0">
                <Link
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
                    isActive ? "bg-teal-tint text-teal-strong" : "text-slate hover:bg-mist hover:text-paper-foreground",
                  )}
                >
                  {section.icon}
                  {section.navLabel}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
