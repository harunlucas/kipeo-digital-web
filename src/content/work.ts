import type { EngagementType, WorkStatus } from "@/content/selected-work";

/**
 * /work-only content. Deliberately does not touch `selected-work.ts` (used
 * by the homepage, which this redesign must not change) — instead reuses
 * its exported `featuredWork` and specific `capabilityPaths` entries by
 * id for their already-accurate fields, and defines the "Related website
 * work" classification fresh here, since the homepage's merged two-screenshot
 * treatment doesn't carry a per-site classification.
 */

export type WorkFilterId =
  | "all"
  | "live"
  | "websites"
  | "software-systems"
  | "hse-operations"
  | "technical-systems"
  | "commerce-platforms";

export const workFilters: { id: WorkFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "live", label: "Live projects" },
  { id: "websites", label: "Websites" },
  { id: "software-systems", label: "Software and systems" },
  { id: "hse-operations", label: "HSE and operations" },
  { id: "technical-systems", label: "Technical systems" },
  { id: "commerce-platforms", label: "Commerce and managed platforms" },
];

/** Category tags for content pulled from `selected-work.ts` by id. */
export const featuredWorkCategories: WorkFilterId[] = ["live", "software-systems"];
export const capabilityCategoryMap: Record<string, WorkFilterId[]> = {
  systems: ["hse-operations"],
  engineering: ["technical-systems"],
  commerce: ["commerce-platforms"],
};

export type RelatedWebsite = {
  id: string;
  name: string;
  url: string;
  screenshot: { src: string; alt: string };
  engagementType: EngagementType;
  status: WorkStatus;
  isExternal: true;
  description: string;
  attribution: string;
  collaboration?: string;
  categories: WorkFilterId[];
  published: boolean;
};

export const relatedWebsites: RelatedWebsite[] = [
  {
    id: "cynthiamueni",
    name: "CynthiaMueni.com",
    url: "https://cynthiamueni.com",
    screenshot: {
      src: "/images/projects/related-websites/cynthiamueni-home.webp",
      alt: "CynthiaMueni.com homepage, an occupational safety and EHS-systems professional site",
    },
    engagementType: "related-work",
    status: "live",
    isExternal: true,
    description: "Professional site for an occupational safety and EHS-systems specialist.",
    attribution:
      "Independent professional site, not built or managed by Kipeo Digital — referenced here as the source of the HSE domain expertise informing Kipeo's HSE-related work.",
    categories: ["live", "websites"],
    published: true,
  },
  {
    id: "harunlucas",
    name: "HarunLucas.com",
    url: "https://harunlucas.com",
    screenshot: {
      src: "/images/projects/related-websites/harunlucas-home.webp",
      alt: "HarunLucas.com homepage, an engineering and systems-development portfolio site",
    },
    engagementType: "team-contribution",
    status: "live",
    isExternal: true,
    description: "Engineering and systems-development portfolio, including the BushLite WiFi case study.",
    attribution: "Website built and maintained by the same person behind Kipeo Digital — a team contribution, not a Kipeo Digital client project.",
    collaboration: "Same team, same builder as Kipeo Digital.",
    categories: ["live", "websites"],
    published: true,
  },
];
