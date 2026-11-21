"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/cn";

type ProjectId = "cnc" | "hse";

type Project = {
  id: ProjectId;
  label: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  linkHref: string;
  linkLabel: string;
  linkHost: string;
};

/**
 * Two attributed, illustrative projects — Harun Lucas's CNC learning system
 * and Cynthia Mueni's safety management system — shown as one full-width
 * screenshot each rather than reconstructed in HTML. Both source images
 * already carry their own interface chrome and an "Illustrative preview"
 * caption, so nothing here duplicates a heading or wraps them in a second
 * bordered panel; the explorer's shared preview frame (`what-we-build.tsx`)
 * is the only border these sit inside.
 */
const projects: Project[] = [
  {
    id: "cnc",
    label: "CNC learning system",
    image: "/images/automation/cnc-learning-workspace.webp",
    alt: "CNC learning workspace with pocket milling selected and its toolpath displayed.",
    width: 1536,
    height: 1024,
    linkHref: "https://harunlucas.com/projects/python-cnc-automation",
    linkLabel: "View Harun’s CNC project",
    linkHost: "harunlucas.com",
  },
  {
    id: "hse",
    label: "HSE system",
    image: "/images/automation/hse-corrective-actions.webp",
    alt: "HSE workspace tracing a loading-bay finding from reporting through repair and verification.",
    width: 1536,
    height: 1024,
    linkHref: "https://cynthiamueni.com/projects/safety-management-system",
    linkLabel: "View Cynthia’s HSE project",
    linkHost: "cynthiamueni.com",
  },
];

export function AutomationPreview() {
  const [projectId, setProjectId] = useState<ProjectId>("cnc");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const viewLargerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const project = projects.find((p) => p.id === projectId) ?? projects[0];

  useEffect(() => {
    if (!lightboxOpen) return;
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen]);

  function closeLightbox() {
    setLightboxOpen(false);
    viewLargerRef.current?.focus();
  }

  return (
    <div>
      {/* Equal-width segments, the active one filled solid teal. */}
      <div role="group" aria-label="Project" className="flex rounded-full border border-neutral-300 p-1">
        {projects.map((p) => {
          const isSelected = p.id === projectId;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setProjectId(p.id)}
              className={cn(
                "min-h-11 flex-1 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                isSelected ? "bg-teal-strong text-on-accent" : "text-slate hover:text-paper-foreground",
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* key remounts this block on tab change, so the previous project's
          image never lingers mid-swap with the new one's alt text/link. */}
      <div key={project.id} className="mt-6">
        <Image
          src={project.image}
          alt={project.alt}
          width={project.width}
          height={project.height}
          sizes="(min-width: 1024px) 65vw, 100vw"
          className="h-auto w-full rounded-lg"
        />

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={project.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-paper-foreground underline decoration-paper-foreground/30 underline-offset-4 transition-colors hover:text-teal-strong hover:decoration-teal-strong/40"
          >
            {project.linkLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">(opens {project.linkHost} in a new tab)</span>
          </a>

          {/* Desktop's 65% pane already renders the image at a readable
              size; below `lg` (where the explorer is an accordion, not a
              split pane) the same image is narrower, so this is where
              reading the interface at full size actually matters. */}
          <button
            ref={viewLargerRef}
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm text-slate transition-colors hover:text-paper-foreground lg:hidden"
          >
            <Maximize2 className="h-4 w-4" aria-hidden />
            View larger
          </button>
        </div>
      </div>

      {lightboxOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.label} preview, full size`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 lg:hidden"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div className="relative max-h-full max-w-full overflow-auto rounded-lg bg-paper p-2">
            <button
              ref={closeRef}
              type="button"
              onClick={closeLightbox}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-ink/80 text-white transition-colors hover:bg-ink"
            >
              <X className="h-5 w-5" aria-hidden />
              <span className="sr-only">Close</span>
            </button>
            <Image
              src={project.image}
              alt={project.alt}
              width={project.width}
              height={project.height}
              sizes="100vw"
              className="h-auto max-h-[85vh] w-auto"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
