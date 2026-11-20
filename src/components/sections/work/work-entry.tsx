import { AnimatedLink } from "@/components/sections/home/animated-link";
import { indexedCaseStudies, statusLabelFor } from "@/content/case-studies";
import { cn } from "@/lib/cn";
import { ProjectImagePair } from "./project-image-pair";

type IndexedStudy = (typeof indexedCaseStudies)[number];

/**
 * One project on the Work index. `.work-entry` (globals.css) places four
 * pieces with named grid areas so the reading order is right at every width
 * from a single copy of each:
 *
 * - mobile: name and purpose → image pair and caption → contribution and link
 * - desktop: the image pair in the left 60%, the story in the right 40%
 *
 * The feature (`variant="feature"`) centres its story against the pair;
 * rows top-align theirs. Genuine evidence (screenshot, workflow, engine
 * output) stays on each case-study page.
 */
export function WorkEntry({ study, variant }: { study: IndexedStudy; variant: "feature" | "row" }) {
  const { listing } = study;
  const isFeature = variant === "feature";
  const Heading = isFeature ? "h2" : "h3";
  const headingId = `work-${study.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "work-entry",
        isFeature && "work-entry--feature",
        listing.mediaSide === "right" && "work-entry--media-right",
      )}
    >
      <div className="work-entry-head">
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-slate-muted">
          <span>{study.category}</span>
          <span aria-hidden className="text-neutral-300">
            ·
          </span>
          <span className="font-medium text-slate">{statusLabelFor(study)}</span>
        </p>
        <Heading
          id={headingId}
          className={cn(
            "mt-2 font-display font-semibold tracking-[-0.015em] text-paper-foreground",
            isFeature ? "text-[clamp(1.75rem,1.4rem+1.3vw,2.375rem)] leading-[1.1]" : "text-2xl leading-tight sm:text-[1.75rem]",
          )}
        >
          {study.title}
        </Heading>
        <p className={cn("mt-3 leading-relaxed text-slate", isFeature ? "text-base sm:text-lg" : "text-base")}>
          {listing.purpose}
        </p>
      </div>

      <div className="work-entry-media">
        <ProjectImagePair pair={listing.pair} priority={isFeature} />
      </div>

      <div className="work-entry-details">
        <p className="border-l border-neutral-300 pl-4 text-sm leading-relaxed text-paper-foreground sm:text-[0.9375rem]">
          {listing.contribution}
        </p>
        <AnimatedLink href={`/work/${study.slug}`} className="mt-4">
          {listing.linkLabel}
        </AnimatedLink>
      </div>
    </article>
  );
}
