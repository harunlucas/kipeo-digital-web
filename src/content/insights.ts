/**
 * One primary category per article, chosen by the question a reader brings
 * rather than by every topic the article touches:
 *
 * - Websites & e-commerce: web design, online stores, SEO, analytics, enquiries.
 * - Business systems & automation: approvals, internal tools, integrations,
 *   AI-assisted workflows.
 * - Engineering & safety systems: equipment, maintenance, CNC learning,
 *   inspections, corrective actions.
 * - Studio notes: practical lessons on discovery, design decisions, testing
 *   and handover.
 *
 * For an overlap, pick the reader's main concern: how a buyer selects a
 * replacement part is Websites & e-commerce; how a technician verifies it is
 * Engineering & safety systems. /insights shows a filter only for categories
 * with at least one published article.
 */
export type InsightCategory =
  | "Websites & e-commerce"
  | "Business systems & automation"
  | "Engineering & safety systems"
  | "Studio notes";

export const insightCategories: InsightCategory[] = [
  "Websites & e-commerce",
  "Business systems & automation",
  "Engineering & safety systems",
  "Studio notes",
];

/**
 * Per-article frontmatter, authored as an `export const meta` object inside
 * each `.mdx` file in `src/content/insights/` (`@next/mdx` doesn't parse
 * YAML frontmatter without an extra remark plugin, and this project already
 * favours plain typed objects over new dependencies — see `services-page.ts`
 * / `work.ts`). `slug` isn't part of this type: it's the filename, attached
 * by the loader in `src/lib/insights.ts`, so a slug can never drift from the
 * file that defines it.
 *
 * `featuredImage` intentionally isn't a file path. Every article on this
 * site — Services groups, Work capabilities — uses an original hand-built
 * SVG/CSS composition instead of stock photography or generated renders, so
 * this site never has to track image licensing. `featuredImage` is the
 * variant key `InsightVisual` (`src/components/motion/insight-visual.tsx`)
 * switches on; `featuredImageAlt` is the real accessible description shown
 * to screen readers via `role="img"`.
 */
/**
 * An image for the article on the /insights landing page (the feature or
 * its index row), set only when it genuinely illustrates the article, never
 * as decoration. Rendered with `next/image`, so `width`/`height` are the
 * file's own pixel dimensions. `caption` is optional: use it when the image
 * needs context (for example, a real project shown as an example).
 */
export type InsightListingImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type InsightMeta = {
  title: string;
  description: string;
  /**
   * Optional short excerpt for the /insights feature, taken from the
   * article's own argument. Falls back to `description`.
   */
  excerpt?: string;
  listingImage?: InsightListingImage;
  category: InsightCategory;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  featuredImage: string;
  featuredImageAlt: string;
  author: "Kipeo Digital";
  featured: boolean;
  published: boolean;
  keywords: string[];
};

export type Insight = InsightMeta & { slug: string };
