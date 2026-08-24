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

/**
 * Where each capability panel's CTA should go — deliberately not
 * `path.href` (which is "/work", correct for the homepage's own cards but
 * self-referencing here) and deliberately not written back onto the shared
 * `capabilityPaths` entries, since that would change the homepage CTA too.
 */
export const capabilityCtaHref: Record<string, string> = {
  engineering: "/services#software-and-systems",
  commerce: "/services#websites-and-commerce",
};

export const capabilitySectionNote =
  "Capability visuals illustrate the kinds of systems Kipeo can design and develop. They are not presented as completed client projects.";

export type AttributionLegendEntry = {
  id: string;
  label: string;
  description: string;
  tone: "teal" | "violet" | "amber" | "neutral" | "dashed";
};

export const attributionLegend: AttributionLegendEntry[] = [
  { id: "live", label: "Live project", description: "A system that's built and in real use.", tone: "teal" },
  {
    id: "related",
    label: "Related work",
    description: "Independent work referenced for its relevant expertise.",
    tone: "neutral",
  },
  {
    id: "team",
    label: "Team contribution",
    description: "Built and maintained by people on the Kipeo team.",
    tone: "violet",
  },
  {
    id: "internal",
    label: "Internal product",
    description: "A product Kipeo is developing for its own portfolio.",
    tone: "amber",
  },
  {
    id: "concept",
    label: "Capability concept",
    description: "An illustrative concept, not a delivered project.",
    tone: "dashed",
  },
];

export type HeroCollageImage = {
  id: string;
  src: string;
  alt: string;
  label: string;
  isConcept?: boolean;
};

/** The layered hero collage — three genuine screenshots plus one clearly-labelled concept render. */
export const heroCollageImages: HeroCollageImage[] = [
  {
    id: "bushlite",
    src: "/images/projects/bushlite-wifi-dashboard.webp",
    alt: "BushLite WiFi hotspot management dashboard",
    label: "BushLite WiFi",
  },
  {
    id: "cynthiamueni",
    src: "/images/projects/related-websites/cynthiamueni-home.webp",
    alt: "CynthiaMueni.com homepage",
    label: "CynthiaMueni.com",
  },
  {
    id: "harunlucas",
    src: "/images/projects/related-websites/harunlucas-home.webp",
    alt: "HarunLucas.com homepage",
    label: "HarunLucas.com",
  },
  {
    id: "hse-concept",
    src: "/images/projects/capability-photos/hse-systems-concept.webp",
    alt: "Concept render of an HSE management dashboard",
    label: "HSE Management System",
    isConcept: true,
  },
];

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
      "Independent specialist platform providing HSE domain context connected to Kipeo's operational-systems work.",
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
    attribution: "Related engineering and systems portfolio contributed by members of the team behind Kipeo Digital.",
    categories: ["live", "websites"],
    published: true,
  },
];
