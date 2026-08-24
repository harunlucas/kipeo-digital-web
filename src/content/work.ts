import type { EngagementType, WorkStatus } from "@/content/selected-work";
import type { CapabilityVisualVariant } from "@/components/motion/capability-visual";

/**
 * /work-only content. Deliberately does not touch `selected-work.ts` (used
 * by the homepage, which this pass must not change) beyond reusing its
 * exported `featuredWork` (BushLite WiFi) by explicit instruction. The
 * internal product (HSE) and the six capability areas below are defined
 * fresh here with their own visuals so nothing on this page repeats an
 * image already shown on the homepage, Services or Studio.
 *
 * No filter state any more — there's too little verified work yet to
 * justify it, so the page always shows all three views (Verified work,
 * Internal products, Capabilities) in a fixed order with plain anchor
 * navigation between them.
 */

export type WorkSectionAnchor = { id: string; label: string };

export const workSectionAnchors: WorkSectionAnchor[] = [
  { id: "verified-work", label: "Verified work" },
  { id: "internal-products", label: "Internal products" },
  { id: "capabilities", label: "Capabilities" },
];

/** A second genuine BushLite screenshot, reserved for the Featured Project section only (never the hero). */
export const featuredSecondaryScreenshot = {
  src: "/images/projects/bushlite-wifi-login-portal.webp",
  alt: "BushLite WiFi hotspot login portal",
};

export type InternalProduct = {
  title: string;
  category: string;
  engagementType: EngagementType;
  status: WorkStatus;
  description: string;
  attribution: string;
  disclosure: string;
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
    "A developing operational platform shaped around inspections, hazard reporting, corrective actions, documentation and safety records.",
  attribution: "Internal product development associated with Kipeo Digital, informed by related HSE practice.",
  disclosure: "Concept visuals explore the intended product direction.",
};

export type WorkCapabilityArea = {
  id: string;
  title: string;
  description: string;
  examples: string[];
  ctaLabel: string;
  ctaHref: string;
  visual: CapabilityVisualVariant;
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
  },
  {
    id: "hse-compliance-software",
    title: "HSE and compliance software",
    description: "Inspection workflows, corrective-action tracking and safety records built as software, not paperwork.",
    examples: ["Inspection workflows", "Corrective-action tracking", "Document control"],
    ctaLabel: "Explore operational software",
    ctaHref: "/services#operational-and-technical-software",
    visual: "inspection",
  },
  {
    id: "engineering-maintenance-systems",
    title: "Engineering and maintenance systems",
    description: "Maintenance-management and equipment-data systems for technical operations.",
    examples: ["Maintenance planning", "Equipment-data workflows", "Monitoring dashboards"],
    ctaLabel: "Explore technical software",
    ctaHref: "/services#operational-and-technical-software",
    visual: "maintenance",
  },
  {
    id: "websites-digital-platforms",
    title: "Websites and digital platforms",
    description: "Business and agency websites designed to communicate clearly across devices.",
    examples: ["Business websites", "Content platforms", "Landing pages"],
    ctaLabel: "Explore website work",
    ctaHref: "/services#websites-and-commerce",
    visual: "website-device",
  },
  {
    id: "ecommerce-managed-platforms",
    title: "E-commerce and managed platforms",
    description: "Online stores with a manageable catalogue, checkout and day-to-day administration.",
    examples: ["WooCommerce", "Shopify", "Managed hosting"],
    ctaLabel: "Explore commerce work",
    ctaHref: "/services#websites-and-commerce",
    visual: "commerce-interface",
  },
  {
    id: "integrations-automation",
    title: "Integrations and automation",
    description: "APIs and connected workflows that keep separate tools and services in sync.",
    examples: ["API integrations", "Workflow automation", "AI-assisted automation"],
    ctaLabel: "Explore integrations",
    ctaHref: "/services#integration-deployment-and-support",
    visual: "automation-map",
  },
];
