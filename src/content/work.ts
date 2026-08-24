import type { EngagementType, WorkStatus } from "@/content/selected-work";
import type { CapabilityVisualVariant } from "@/components/motion/capability-visual";

/**
 * /work-only content. Deliberately does not touch `selected-work.ts` (used
 * by the homepage, which this redesign must not change) beyond reusing its
 * exported `featuredWork` (BushLite WiFi) by explicit instruction. The
 * internal product (HSE) and the six capability areas below are defined
 * fresh here with their own visuals so nothing on this page repeats an
 * image already shown on the homepage, Services or Studio.
 */

export type WorkFilterId =
  | "all"
  | "live-and-related"
  | "internal-products"
  | "software-systems"
  | "websites-and-commerce"
  | "operational-and-technical-systems";

export const workFilters: { id: WorkFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "live-and-related", label: "Live and related work" },
  { id: "internal-products", label: "Internal products" },
  { id: "software-systems", label: "Software systems" },
  { id: "websites-and-commerce", label: "Websites and commerce" },
  { id: "operational-and-technical-systems", label: "Operational and technical systems" },
];

/** Category tags for `featuredWork` (BushLite WiFi), pulled from `selected-work.ts` by reference. */
export const featuredWorkCategories: WorkFilterId[] = ["live-and-related", "software-systems"];

export type HeroCollageImage = {
  id: string;
  src: string;
  alt: string;
  label: string;
};

/** Two genuine BushLite WiFi screenshots — no personal-website or AI-concept imagery in the hero. */
export const heroCollageImages: HeroCollageImage[] = [
  {
    id: "bushlite-dashboard",
    src: "/images/projects/bushlite-wifi-dashboard.webp",
    alt: "BushLite WiFi hotspot management dashboard",
    label: "BushLite WiFi — dashboard",
  },
  {
    id: "bushlite-login",
    src: "/images/projects/bushlite-wifi-login-portal.webp",
    alt: "BushLite WiFi hotspot login portal",
    label: "BushLite WiFi — login portal",
  },
];

export type InternalProduct = {
  title: string;
  category: string;
  engagementType: EngagementType;
  status: WorkStatus;
  description: string;
  attribution: string;
  disclosure: string;
  screenshots: { src: string; alt: string }[];
};

/**
 * The HSE Management System, described honestly as in-development. Uses a
 * hand-built concept visual (`HseProductVisual`) rather than the AI-generated
 * renders or the login/register screenshots already shown on the homepage —
 * this section must not repeat homepage or Services imagery.
 */
export const internalProduct: InternalProduct = {
  title: "HSE Management System",
  category: "HSE and operational software",
  engagementType: "internal-product",
  status: "in-development",
  description:
    "An operational system for managing workplace inspections, hazard reports, corrective actions, documentation and safety records — built by the Kipeo team as an internal and collaborative product.",
  attribution: "Internal product development associated with Kipeo Digital, informed by related HSE practice.",
  disclosure: "Concept visuals explore the intended product direction.",
  screenshots: [],
};

export type WorkCapabilityArea = {
  id: string;
  title: string;
  description: string;
  examples: string[];
  ctaLabel: string;
  ctaHref: string;
  visual: CapabilityVisualVariant;
  categories: WorkFilterId[];
};

export const workCapabilityAreas: WorkCapabilityArea[] = [
  {
    id: "business-workflow-systems",
    title: "Business and workflow systems",
    description: "Internal tools and dashboards that bring scattered processes into one connected system.",
    examples: ["Internal tools", "Operational dashboards", "Workflow automation"],
    ctaLabel: "Explore software and systems",
    ctaHref: "/services#software-and-business-systems",
    visual: "workflow",
    categories: ["software-systems"],
  },
  {
    id: "hse-compliance-software",
    title: "HSE and compliance software",
    description: "Inspection workflows, corrective-action tracking and safety records built as software, not paperwork.",
    examples: ["Inspection workflows", "Corrective-action tracking", "Document control"],
    ctaLabel: "Explore operational software",
    ctaHref: "/services#operational-and-technical-software",
    visual: "inspection",
    categories: ["operational-and-technical-systems"],
  },
  {
    id: "engineering-maintenance-systems",
    title: "Engineering and maintenance systems",
    description: "Maintenance-management and equipment-data systems for technical operations.",
    examples: ["Maintenance schedules", "Equipment-data workflows", "Monitoring dashboards"],
    ctaLabel: "Explore technical software",
    ctaHref: "/services#operational-and-technical-software",
    visual: "maintenance",
    categories: ["operational-and-technical-systems"],
  },
  {
    id: "websites-digital-platforms",
    title: "Websites and digital platforms",
    description: "Business and agency websites designed to communicate clearly across devices.",
    examples: ["Business websites", "Content platforms", "Landing pages"],
    ctaLabel: "Explore website work",
    ctaHref: "/services#websites-and-commerce",
    visual: "website-device",
    categories: ["websites-and-commerce"],
  },
  {
    id: "ecommerce-managed-platforms",
    title: "E-commerce and managed platforms",
    description: "Online stores with a manageable catalogue, checkout and day-to-day administration.",
    examples: ["WooCommerce", "Shopify", "Managed hosting"],
    ctaLabel: "Explore commerce work",
    ctaHref: "/services#websites-and-commerce",
    visual: "commerce-interface",
    categories: ["websites-and-commerce"],
  },
  {
    id: "integrations-automation",
    title: "Integrations and automation",
    description: "APIs and connected workflows that keep separate tools and services in sync.",
    examples: ["API integrations", "Workflow automation", "AI-assisted automation"],
    ctaLabel: "Explore integrations",
    ctaHref: "/services#integration-deployment-and-support",
    visual: "automation-map",
    categories: ["software-systems"],
  },
];

export type SpecialistExpertiseLink = {
  label: string;
  href: string;
};

export const specialistExpertiseLinks: SpecialistExpertiseLink[] = [
  { label: "HSE and workplace-safety expertise — CynthiaMueni.com", href: "https://cynthiamueni.com/" },
  { label: "Engineering and applied technical systems — HarunLucas.com", href: "https://harunlucas.com/projects" },
];
