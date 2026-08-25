import type { LucideIcon } from "lucide-react";
import { Cpu, ShieldCheck, Globe2, TrendingUp, Cloud } from "lucide-react";

export type ServiceGroupId =
  | "software-and-business-systems"
  | "operational-and-technical-software"
  | "websites-and-commerce"
  | "seo-and-digital-growth"
  | "integration-deployment-and-support";

/**
 * Canonical service identity — one typed source of truth for the five
 * service groups, consumed by the header dropdown, mobile menu, shared
 * footer, homepage service panels and the Studio capability selector.
 * `/services` itself uses the richer, page-specific `serviceGroups` array in
 * `services-page.ts` (full intro copy, outcomes, expandable detail) — that
 * array shares these same ids and titles rather than importing this one, so
 * the full-detail page isn't forced through a generic shape. `capabilities`
 * here is the short, representative list for compact contexts (homepage
 * panels, the Studio selector), not the exhaustive per-group list.
 */
export type ServiceGroupIdentity = {
  id: ServiceGroupId;
  number: string;
  title: string;
  shortTitle: string;
  problem: string;
  description: string;
  capabilities: string[];
  supporting: boolean;
  href: string;
  visualType: string;
  published: boolean;
  icon: LucideIcon;
};

export const serviceGroups: ServiceGroupIdentity[] = [
  {
    id: "software-and-business-systems",
    number: "01",
    title: "Software and Business Systems",
    shortTitle: "Software & systems",
    problem: "For manual processes, disconnected tools and operational work that needs a purpose-built system.",
    description: "For manual processes, disconnected tools and operational work that needs a purpose-built system.",
    capabilities: [
      "Custom web applications",
      "Internal business systems",
      "Product and UI/UX design",
      "Workflow automation",
      "APIs and integrations",
    ],
    supporting: false,
    href: "/services#software-and-business-systems",
    visualType: "systems",
    published: true,
    icon: Cpu,
  },
  {
    id: "operational-and-technical-software",
    number: "02",
    title: "Operational and Technical Software",
    shortTitle: "Operational & technical",
    problem: "For safety, compliance, maintenance and technical workflows that need structured digital management.",
    description:
      "For safety, compliance, maintenance and technical workflows that need structured digital management.",
    capabilities: [
      "Inspection workflows",
      "Hazard and incident reporting",
      "Corrective-action tracking",
      "Maintenance-management systems",
      "Equipment-data workflows",
    ],
    supporting: false,
    href: "/services#operational-and-technical-software",
    visualType: "operational",
    published: true,
    icon: ShieldCheck,
  },
  {
    id: "websites-and-commerce",
    number: "03",
    title: "Websites, Commerce and Digital Experience",
    shortTitle: "Websites & commerce",
    problem:
      "For websites and stores that need clearer journeys, better management and stronger customer-facing experiences.",
    description:
      "For websites and stores that need clearer journeys, better management and stronger customer-facing experiences.",
    capabilities: [
      "Business and corporate websites",
      "WordPress development",
      "WooCommerce and Shopify",
      "Responsive interface design",
      "Conversion-focused enquiry paths",
    ],
    supporting: false,
    href: "/services#websites-and-commerce",
    visualType: "commerce",
    published: true,
    icon: Globe2,
  },
  {
    id: "seo-and-digital-growth",
    number: "04",
    title: "SEO and Digital Growth",
    shortTitle: "SEO & growth",
    problem: "For useful websites and platforms that remain difficult to find, measure or improve.",
    description: "For useful websites and platforms that remain difficult to find, measure or improve.",
    capabilities: [
      "Technical SEO audits",
      "On-page SEO and metadata",
      "Analytics and measurement",
      "Core Web Vitals",
      "Conversion-path improvements",
    ],
    supporting: true,
    href: "/services#seo-and-digital-growth",
    visualType: "seo",
    published: true,
    icon: TrendingUp,
  },
  {
    id: "integration-deployment-and-support",
    number: "05",
    title: "Integration, Deployment and Support",
    shortTitle: "Integration & support",
    problem: "For systems that need to connect, launch reliably and remain supported after release.",
    description: "For systems that need to connect, launch reliably and remain supported after release.",
    capabilities: [
      "API and payment integrations",
      "Production deployment",
      "Managed hosting and monitoring",
      "Backups and platform updates",
      "Technical support",
    ],
    supporting: true,
    href: "/services#integration-deployment-and-support",
    visualType: "integration",
    published: true,
    icon: Cloud,
  },
];
