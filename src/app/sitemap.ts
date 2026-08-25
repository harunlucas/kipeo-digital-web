import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";
import { getAllInsights } from "@/lib/insights";
import { impactBuildConfig } from "@/content/impact-build";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const insights = await getAllInsights();

  // Only listed once the programme is publicly visible — excluded entirely
  // while status is "draft". The apply form is additionally excluded unless
  // a cycle is actually open, since there's nothing to index otherwise.
  const impactBuildIsPublic = impactBuildConfig.status !== "draft";
  const impactBuildRoutes: MetadataRoute.Sitemap = impactBuildIsPublic
    ? [
        {
          url: `${siteConfig.url}/impact-build`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.5,
        },
        {
          url: `${siteConfig.url}/impact-build/terms`,
          lastModified: new Date(),
          changeFrequency: "yearly",
          priority: 0.3,
        },
        ...(impactBuildConfig.status === "open"
          ? [
              {
                url: `${siteConfig.url}/impact-build/apply`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.4,
              },
            ]
          : []),
      ]
    : [];

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
      url: `${siteConfig.url}/studio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
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
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/accessibility`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...impactBuildRoutes,
  ];
}
