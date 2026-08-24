"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeaturedProjectCard } from "@/components/motion/featured-project-card";
import { RelatedWebsiteCard } from "@/components/motion/related-website-card";
import { ProductSpotlight } from "@/components/motion/product-spotlight";
import { CapabilityPathCard } from "@/components/motion/capability-path-card";
import type { FeaturedWork, CapabilityPath } from "@/content/selected-work";
import {
  workFilters,
  featuredWorkCategories,
  capabilityCategoryMap,
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
  // Deliberately plain `useState`, not `useSearchParams` — reading the
  // query string would opt this component out of static prerendering (Next
  // renders a Suspense fallback into the static HTML instead of real
  // content), so every filter's content — including "All" — would be
  // invisible to crawlers and no-JS visitors on first load. Writing the
  // filter to the URL via `router.replace` on click doesn't have that cost,
  // so the URL still updates; only reading it back on initial load is
  // skipped, meaning a deep link like `/work?filter=websites` lands on the
  // unfiltered view until the visitor picks a filter themselves.
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
      <div role="group" aria-label="Filter work by category" className="flex flex-wrap gap-2">
        {workFilters.map((filter) => {
          const isActive = filter.id === activeFilter;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectFilter(filter.id)}
              className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors duration-150 ${
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

      <div className="mt-10 flex flex-col gap-14">
        {!hasResults && (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-paper-elevated p-8 text-center sm:p-10">
            <p className="mx-auto max-w-md text-base leading-relaxed text-slate">
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
        )}

        {showFeatured && (
          <section>
            <Eyebrow>Featured work</Eyebrow>
            <h2 className="text-display-3 mt-2 text-paper-foreground">A genuine, verifiable project.</h2>
            <div className="mt-6">
              <FeaturedProjectCard work={featured} />
            </div>
          </section>
        )}

        {visibleWebsites.length > 0 && (
          <section>
            <Eyebrow>Related website work</Eyebrow>
            <h2 className="text-display-3 mt-2 text-paper-foreground">Genuine sites connected to the team.</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {visibleWebsites.map((site, index) => (
                <RelatedWebsiteCard key={site.id} site={site} index={index} />
              ))}
            </div>
          </section>
        )}

        {showHse && (
          <section>
            <Eyebrow>Internal product</Eyebrow>
            <h2 className="text-display-3 mt-2 text-paper-foreground">HSE Management System.</h2>
            <div className="mt-6">
              <ProductSpotlight path={hseSpotlightPath} screensLabel="Current authentication screens" />
            </div>
          </section>
        )}

        {visibleCapabilities.length > 0 && (
          <section>
            <Eyebrow>Capability areas</Eyebrow>
            <h2 className="text-display-3 mt-2 text-paper-foreground">Where we can start building.</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {visibleCapabilities.map((path, index) => (
                <CapabilityPathCard key={path.id} path={path} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
