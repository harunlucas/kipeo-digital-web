"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WorkFeaturedSpotlight } from "@/components/motion/work-featured-spotlight";
import { InternalProductSpotlight } from "@/components/motion/internal-product-spotlight";
import { CapabilityPanel } from "@/components/motion/capability-panel";
import type { FeaturedWork } from "@/content/selected-work";
import {
  workFilters,
  featuredWorkCategories,
  type WorkFilterId,
  type InternalProduct,
  type WorkCapabilityArea,
} from "@/content/work";

type WorkExplorerProps = {
  featured: FeaturedWork;
  internalProduct: InternalProduct;
  internalProductCategories: WorkFilterId[];
  capabilityAreas: WorkCapabilityArea[];
};

function matches(filter: WorkFilterId, categories: WorkFilterId[]) {
  return filter === "all" || categories.includes(filter);
}

export function WorkExplorer({ featured, internalProduct, internalProductCategories, capabilityAreas }: WorkExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  // Deliberately plain `useState`, not `useSearchParams` — reading the URL
  // reactively would opt this component out of static prerendering, so the
  // real content (including the default "All" view) would be a loading
  // skeleton in the static HTML for crawlers and no-JS visitors. Writing the
  // filter to the URL via `router.replace` on click keeps the URL in sync
  // without that cost.
  const [activeFilter, setActiveFilter] = useState<WorkFilterId>("all");

  function selectFilter(id: WorkFilterId) {
    setActiveFilter(id);
    router.replace(id === "all" ? pathname : `${pathname}?filter=${id}`, { scroll: false });
  }

  const showFeatured = matches(activeFilter, featuredWorkCategories);
  const showInternalProduct = matches(activeFilter, internalProductCategories);
  const visibleCapabilities = capabilityAreas.filter((area) => matches(activeFilter, area.categories));
  const hasResults = showFeatured || showInternalProduct || visibleCapabilities.length > 0;

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
              <Link href="/services" className="font-medium text-teal-strong hover:text-ink">
                Explore services
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="font-medium text-teal-strong hover:text-ink">
                start a project
              </Link>
              .
            </p>
          </div>
        </Section>
      )}

      {showFeatured && (
        <Section tone="paper">
          <Eyebrow>Featured project</Eyebrow>
          <h2 className="text-display-3 mt-2 text-paper-foreground">A verified, live project.</h2>
          <div className="mt-8">
            <WorkFeaturedSpotlight work={featured} />
          </div>
        </Section>
      )}

      {showInternalProduct && (
        <Section tone="elevated">
          <Eyebrow>Internal products</Eyebrow>
          <h2 className="text-display-3 mt-2 text-paper-foreground">Built for our own portfolio.</h2>
          <div className="mt-8">
            <InternalProductSpotlight product={internalProduct} />
          </div>
        </Section>
      )}

      {visibleCapabilities.length > 0 && (
        <Section tone="ink" className="bg-grid-ink">
          <Eyebrow tone="ink">Selected capability areas</Eyebrow>
          <h2 className="text-display-3 mt-2 text-ink-foreground">Where we can start building.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Illustrative capability areas Kipeo can design and develop — not completed client projects.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCapabilities.map((area, index) => (
              <CapabilityPanel key={area.id} area={area} index={index} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
