import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";
import { getAllInsights } from "@/lib/insights";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const insights = await getAllInsights();

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...insights.map((insight) => ({
      url: `${siteConfig.url}/insights/${insight.slug}`,
      lastModified: new Date(insight.updatedAt ?? insight.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
