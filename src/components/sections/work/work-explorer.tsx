"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WorkFeaturedSpotlight } from "@/components/motion/work-featured-spotlight";
import { RelatedWebsiteCard } from "@/components/motion/related-website-card";
import { ProductSpotlight } from "@/components/motion/product-spotlight";
import { CapabilityPanel } from "@/components/motion/capability-panel";
import type { FeaturedWork, CapabilityPath } from "@/content/selected-work";
import {
  workFilters,
  featuredWorkCategories,
  capabilityCategoryMap,
  capabilityCtaHref,
  capabilitySectionNote,
  type WorkFilterId,
  type RelatedWebsite,
} from "@/content/work";

type WorkExplorerProps = {
  featured: FeaturedWork;
  relatedWebsites: RelatedWebsite[];
  hseSpotlightPath: CapabilityPath;
  capabilityPanels: CapabilityPath[];
};

function matches(filter: WorkFilterId, categories: WorkFilterId[]) {
  return filter === "all" || categories.includes(filter);
}

export function WorkExplorer({ featured, relatedWebsites, hseSpotlightPath, capabilityPanels }: WorkExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  // Deliberately plain `useState`, not `useSearchParams` — reading the URL
  // reactively (or syncing from it in an effect) would either opt this
  // component out of static prerendering (so the real content, including
  // the default "All" view, would be a loading skeleton in the static HTML
  // for crawlers and no-JS visitors) or read `window.location` during the
  // client's first render and mismatch the server-rendered "All" HTML.
  // Writing the filter to the URL via `router.replace` on click has neither
  // cost, so the URL still updates; a deep link like `/work?filter=live`
  // just lands on the unfiltered view until the visitor picks a filter,
  // and back/forward navigation moves through those URL states without
  // changing what's currently on screen.
  const [activeFilter, setActiveFilter] = useState<WorkFilterId>("all");

  function selectFilter(id: WorkFilterId) {
    setActiveFilter(id);
    router.replace(id === "all" ? pathname : `${pathname}?filter=${id}`, { scroll: false });
  }

  const showFeatured = matches(activeFilter, featuredWorkCategories);
  const visibleWebsites = relatedWebsites.filter((site) => site.published && matches(activeFilter, site.categories));
  const showHse = matches(activeFilter, capabilityCategoryMap[hseSpotlightPath.id] ?? []);
  const visibleCapabilities = capabilityPanels.filter((path) =>
    matches(activeFilter, capabilityCategoryMap[path.id] ?? []),
  );
  const hasResults = showFeatured || visibleWebsites.length > 0 || showHse || visibleCapabilities.length > 0;

  return (
    <>
      <div className="sticky top-[72px] z-40 border-b border-neutral-200 bg-paper/95 backdrop-blur-md">
        <Container className="py-3">
          <div
            role="group"
            aria-label="Filter work by category"
            className="flex gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {workFilters.map((filter) => {
              const isActive = filter.id === activeFilter;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => selectFilter(filter.id)}
                  className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "border-teal-strong bg-teal-strong text-white"
                      : "border-neutral-300 text-slate hover:bg-mist"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      {!hasResults && (
        <Section tone="paper">
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-neutral-300 bg-paper-elevated p-8 text-center sm:p-10">
            <p className="text-base leading-relaxed text-slate">
              We&apos;re preparing verified work for this category.{" "}
              <Link href="/studio" className="font-medium text-teal-strong hover:text-ink">
                Explore the capability
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="font-medium text-teal-strong hover:text-ink">
                discuss a similar project
              </Link>{" "}
              with us.
            </p>
          </div>
        </Section>
      )}

      {showFeatured && (
        <Section tone="paper">
          <Eyebrow>Featured work</Eyebrow>
          <h2 className="text-display-3 mt-2 text-paper-foreground">A genuine, verifiable project.</h2>
          <div className="mt-8">
            <WorkFeaturedSpotlight work={featured} />
          </div>
        </Section>
      )}

      {visibleWebsites.length > 0 && (
        <Section tone="elevated">
          <Eyebrow>Related website work</Eyebrow>
          <h2 className="text-display-3 mt-2 text-paper-foreground">Genuine sites connected to the team.</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {visibleWebsites.map((site, index) => (
              <RelatedWebsiteCard key={site.id} site={site} index={index} />
            ))}
          </div>
        </Section>
      )}

      {showHse && (
        <Section tone="paper">
          <Eyebrow>Internal product</Eyebrow>
          <h2 className="text-display-3 mt-2 text-paper-foreground">HSE Management System.</h2>
          <div className="mt-8">
            <ProductSpotlight path={hseSpotlightPath} screensLabel="Current authentication screens" />
          </div>
        </Section>
      )}

      {visibleCapabilities.length > 0 && (
        <Section tone="ink" className="bg-grid-ink">
          <Eyebrow tone="ink">Capability areas</Eyebrow>
          <h2 className="text-display-3 mt-2 text-ink-foreground">Where we can start building.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{capabilitySectionNote}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {visibleCapabilities.map((path, index) => (
              <CapabilityPanel
                key={path.id}
                path={path}
                index={index}
                ctaHref={capabilityCtaHref[path.id] ?? "/services"}
                ctaLabel={path.primaryAgencyCta}
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
