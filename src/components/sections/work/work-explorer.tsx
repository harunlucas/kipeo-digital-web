import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WorkFeaturedSpotlight } from "@/components/motion/work-featured-spotlight";
import { InternalProductSpotlight } from "@/components/motion/internal-product-spotlight";
import { CapabilityPanel } from "@/components/motion/capability-panel";
import type { FeaturedWork } from "@/content/selected-work";
import type { InternalProduct, WorkCapabilityArea, WorkSectionAnchor } from "@/content/work";

type WorkExplorerProps = {
  featured: FeaturedWork;
  featuredSecondaryScreenshot?: { src: string; alt: string };
  internalProduct: InternalProduct;
  capabilityAreas: WorkCapabilityArea[];
  sectionAnchors: WorkSectionAnchor[];
};

/**
 * There's too little verified work yet to justify a filter UI, so this is
 * a plain server component: three always-visible views (Verified work,
 * Internal products, Capabilities) in a fixed order, with simple anchor
 * navigation between them instead of client-side filtering.
 */
export function WorkExplorer({
  featured,
  featuredSecondaryScreenshot,
  internalProduct,
  capabilityAreas,
  sectionAnchors,
}: WorkExplorerProps) {
  return (
    <>
      <div className="border-b border-neutral-200 bg-paper/95">
        <Container className="py-3">
          <nav aria-label="Jump to a section" className="flex gap-2 overflow-x-auto px-1 py-1">
            {sectionAnchors.map((anchor) => (
              <Link
                key={anchor.id}
                href={`#${anchor.id}`}
                className="flex min-h-11 shrink-0 items-center rounded-full border border-neutral-300 px-4 text-sm font-medium text-slate transition-colors duration-150 hover:bg-mist"
              >
                {anchor.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      <Section id="verified-work" tone="paper">
        <Eyebrow>Verified work</Eyebrow>
        <h2 className="text-display-3 mt-2 text-paper-foreground">A verified, live project.</h2>
        <div className="mt-8">
          <WorkFeaturedSpotlight work={featured} secondaryScreenshot={featuredSecondaryScreenshot} />
        </div>
      </Section>

      <Section id="internal-products" tone="elevated">
        <Eyebrow>Internal products</Eyebrow>
        <h2 className="text-display-3 mt-2 text-paper-foreground">An internal product in active development.</h2>
        <div className="mt-8">
          <InternalProductSpotlight product={internalProduct} />
        </div>
      </Section>

      <Section id="capabilities" tone="ink" className="bg-grid-ink">
        <Eyebrow tone="ink">Capability illustrations</Eyebrow>
        <h2 className="text-display-3 mt-2 text-ink-foreground">Where we can start building.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
          Illustrative capability areas Kipeo can design and develop — not completed client projects.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityAreas.map((area, index) => (
            <CapabilityPanel key={area.id} area={area} index={index} />
          ))}
        </div>
      </Section>
    </>
  );
}
