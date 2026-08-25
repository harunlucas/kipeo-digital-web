import { serviceGroups } from "@/content/service-groups";

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export type ServiceMenuLink = NavItem & { description: string };

/** Short, dropdown-voice description per service group — id/href/title come from `service-groups.ts`. */
const servicesMenuDescriptions: Record<string, string> = {
  "software-and-business-systems": "Custom systems for manual, disconnected operations.",
  "operational-and-technical-software": "HSE, compliance and technical-operations software.",
  "websites-and-commerce": "Business websites, content platforms and online stores.",
  "seo-and-digital-growth": "Technical visibility, measurement and conversion support.",
  "integration-deployment-and-support": "Integrations, hosting, monitoring and ongoing support.",
};

/**
 * Shared by the desktop Services dropdown and the mobile Services accordion
 * — both should list the same destinations in the same order. Sourced from
 * the canonical `serviceGroups`, with Kipeo Studio appended as the "how we
 * work" destination (not itself a service group).
 */
export const servicesMenuLinks: ServiceMenuLink[] = [
  ...serviceGroups.map((group) => ({
    label: group.title,
    href: group.href,
    description: servicesMenuDescriptions[group.id] ?? group.problem,
  })),
  {
    label: "How We Work — Kipeo Studio",
    href: "/studio",
    description: "Our process, from discovery through to launch and support.",
  },
];

export const footerServiceLinks: NavItem[] = serviceGroups.map((group) => ({
  label: group.title,
  href: group.href,
}));

export const footerCompanyLinks: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Accessibility", href: "/accessibility" },
];
