"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { RelatedWebsite } from "@/content/work";
import { Badge, BrowserFrame, engagementLabels, statusLabels } from "./capability-path-card";

export function RelatedWebsiteCard({ site, index }: { site: RelatedWebsite; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-paper shadow-card transition-shadow duration-300 hover:shadow-panel"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        <BrowserFrame>
          <Image
            src={site.screenshot.src}
            alt={site.screenshot.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-top grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
          />
        </BrowserFrame>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-paper-foreground">{site.name}</h3>
          <ExternalLink
            className="h-4 w-4 shrink-0 text-slate-muted transition-colors group-hover:text-teal-strong"
            aria-hidden
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge>{engagementLabels[site.engagementType]}</Badge>
          <Badge>{statusLabels[site.status]}</Badge>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate">{site.description}</p>
        <p className="mt-2 text-xs leading-relaxed text-slate-muted">{site.attribution}</p>
        {site.collaboration && <p className="mt-1 text-xs leading-relaxed text-slate-muted">{site.collaboration}</p>}
        <span className="sr-only">(opens {site.name} in a new tab)</span>
      </div>
    </motion.a>
  );
}
