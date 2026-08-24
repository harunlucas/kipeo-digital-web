import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import type { Insight, InsightCategory, InsightMeta } from "@/content/insights";
import { insightCategories } from "@/content/insights";

const contentDir = path.join(process.cwd(), "src/content/insights");

type InsightModule = {
  default: ComponentType;
  meta: InsightMeta;
};

/**
 * Publishing a new article is: add `src/content/insights/<slug>.mdx` with an
 * `export const meta = {...}` block. Nothing here — or in any page/component
 * — needs to change; the slug list is read straight off disk at request/
 * build time, and `[slug]/page.tsx`'s `generateStaticParams` reads it from
 * `getAllSlugs` below.
 */
function slugsFromDisk(): string[] {
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

async function loadInsightModule(slug: string): Promise<InsightModule | undefined> {
  if (!slugsFromDisk().includes(slug)) return undefined;
  return import(`@/content/insights/${slug}.mdx`);
}

/** All published insights, newest first. */
export async function getAllInsights(): Promise<Insight[]> {
  const modules = await Promise.all(
    slugsFromDisk().map(async (slug) => {
      const mod = await loadInsightModule(slug);
      return mod ? { slug, ...mod.meta } : undefined;
    }),
  );

  return modules
    .filter((insight): insight is Insight => Boolean(insight?.published))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/** The article marked `featured: true`, falling back to the most recent. */
export async function getFeaturedInsight(): Promise<Insight | undefined> {
  const all = await getAllInsights();
  return all.find((insight) => insight.featured) ?? all[0];
}

/** Published insights other than the featured one, newest first. */
export async function getLatestInsights(excludeSlug?: string): Promise<Insight[]> {
  const all = await getAllInsights();
  return all.filter((insight) => insight.slug !== excludeSlug);
}

/** Only categories with at least one published article — never an empty filter. */
export async function getAvailableCategories(): Promise<InsightCategory[]> {
  const all = await getAllInsights();
  const present = new Set(all.map((insight) => insight.category));
  return insightCategories.filter((category) => present.has(category));
}

export async function getAllSlugs(): Promise<string[]> {
  const all = await getAllInsights();
  return all.map((insight) => insight.slug);
}

export async function getInsightBySlug(
  slug: string,
): Promise<{ Content: ComponentType; insight: Insight } | undefined> {
  const mod = await loadInsightModule(slug);
  if (!mod || !mod.meta.published) return undefined;
  return { Content: mod.default, insight: { slug, ...mod.meta } };
}
