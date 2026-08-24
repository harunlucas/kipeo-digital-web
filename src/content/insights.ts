export type InsightCategory =
  | "Software Strategy"
  | "Business Systems"
  | "Websites and Commerce"
  | "Automation and Integration"
  | "Delivery and Maintenance";

export const insightCategories: InsightCategory[] = [
  "Software Strategy",
  "Business Systems",
  "Websites and Commerce",
  "Automation and Integration",
  "Delivery and Maintenance",
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
export type InsightMeta = {
  title: string;
  description: string;
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
