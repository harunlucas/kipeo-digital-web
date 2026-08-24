import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Websites and Software for Growing Businesses`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "web design agency",
    "web development",
    "software development",
    "digital agency Nairobi",
    "WordPress development",
    "web applications",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Websites and Software for Growing Businesses`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Websites and Software for Growing Businesses`,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export function buildMetadata(overrides: Metadata): Metadata {
  return {
    ...defaultMetadata,
    ...overrides,
    alternates: {
      ...defaultMetadata.alternates,
      ...overrides.alternates,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      ...overrides.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...overrides.twitter,
    },
  };
}
