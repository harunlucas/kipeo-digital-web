"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { CapabilityPath } from "@/content/selected-work";
import { Badge, BrowserFrame, engagementLabels, statusLabels } from "./capability-path-card";

/**
 * A full-width spotlight for a real, embedded in-development product (e.g.
 * the HSE Management System), rendered below the capability-card grid
 * rather than inside one card — keeps category cards equal-height and
 * gives the product room the small embedded panel couldn't.
 */
export function ProductSpotlight({ path }: { path: CapabilityPath }) {
  const shouldReduceMotion = useReducedMotion();
  const project = path.embeddedProject;
  if (!project) return null;

  const [mainVisual, supportingVisual] = project.conceptVisuals ?? [];

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-2xl border border-neutral-200 bg-paper shadow-card"
    >
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-10">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-semibold text-paper-foreground">{project.title}</h3>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge>{engagementLabels[project.engagementType]}</Badge>
            <Badge tone="amber">{statusLabels[project.status]}</Badge>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate">{project.description}</p>
          <p className="mt-3 text-xs leading-relaxed text-slate-muted">{project.attribution}</p>

          {path.relatedExpertise && (
            <div className="mt-5 border-t border-neutral-200 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wide text-slate-muted">
                {path.relatedExpertise.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate">{path.relatedExpertise.description}</p>
              <a
                href={path.relatedExpertise.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-teal-strong hover:text-ink"
              >
                {path.secondaryExpertiseLink}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                <span className="sr-only">(opens {path.relatedExpertise.sourceName} in a new tab)</span>
              </a>
            </div>
          )}
        </div>

        {mainVisual && (
          // Mobile/tablet: plain stacked flow (main, then supporting below,
          // no overlap — avoids any horizontal overflow risk). Desktop only
          // (lg+): supporting visual becomes an absolutely-positioned
          // overlap, which is why the wrapper gains right/bottom padding
          // only at lg, to reserve room for it without affecting mobile.
          <div className="relative lg:pb-10 lg:pr-10">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-dashed border-neutral-300 bg-ink">
              <Image
                src={mainVisual.src}
                alt={mainVisual.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-top"
              />
              <span className="absolute left-3 top-3 rounded-full border border-dashed border-white/40 bg-ink/60 px-2.5 py-1 text-[10px] uppercase tracking-wide text-ink-muted backdrop-blur">
                Concept visual
              </span>
            </div>

            {supportingVisual && (
              <div className="relative mt-3 w-2/3 overflow-hidden rounded-lg border border-dashed border-neutral-300 bg-ink shadow-panel sm:w-1/2 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-2/5 lg:rotate-2">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={supportingVisual.src}
                    alt={supportingVisual.alt}
                    fill
                    sizes="(min-width: 1024px) 18vw, 40vw"
                    className="object-cover object-top"
                  />
                  <span className="absolute left-1.5 top-1.5 rounded-full border border-dashed border-white/40 bg-ink/60 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-ink-muted backdrop-blur">
                    Concept
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {project.screenshots.length > 0 && (
        <div className="border-t border-neutral-200 bg-paper-elevated px-6 py-5 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-wide text-slate-muted">
            Current development screens
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {project.screenshots.slice(0, 2).map((shot, shotIndex) => (
              <div
                key={shot.src}
                className="relative aspect-[16/10] w-40 overflow-hidden rounded-lg border border-neutral-200 bg-ink sm:w-48"
              >
                {shotIndex === 0 ? (
                  <BrowserFrame>
                    <Image src={shot.src} alt={shot.alt} fill sizes="200px" className="object-cover object-top" />
                  </BrowserFrame>
                ) : (
                  <Image src={shot.src} alt={shot.alt} fill sizes="200px" className="object-cover object-top" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
