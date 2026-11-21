import { serviceGroups, type ServiceGroupId } from "@/content/service-groups";

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
 * Compact labels for the service families, used by the header menus. The
 * /services section headings reuse them (service 02 has a longer page-only
 * heading, see `services-page.ts`); the footer keeps the full catalogue titles.
 */
export const serviceNavLabels: Record<ServiceGroupId, string> = {
  "software-and-business-systems": "Software & business systems",
  "operational-and-technical-software": "Operational & technical software",
  "websites-and-commerce": "Websites & e-commerce",
  "seo-and-digital-growth": "SEO & digital growth",
  "integration-deployment-and-support": "Integration, deployment & support",
};

/**
 * The service families, in catalogue order, shared by the desktop Services
 * panel and the mobile Services group so both list the same destinations.
 * Each family is a single destination (its section on /services), so each
 * carries one short descriptive line rather than sub-links.
 */
export const serviceFamilyLinks: ServiceMenuLink[] = serviceGroups
  .filter((group) => group.published)
  .map((group) => ({
    label: serviceNavLabels[group.id] ?? group.title,
    href: group.href,
    description: servicesMenuDescriptions[group.id] ?? group.problem,
  }));

export const allServicesLink: NavItem = { label: "View all services", href: "/services" };

/** The process page: listed apart from the families (it isn't one). */
export const howWeWorkLink: ServiceMenuLink = {
  label: "How we work",
  href: "/studio",
  description: "Our process, from discovery through to launch and support.",
};

export const footerServiceLinks: NavItem[] = serviceGroups.map((group) => ({
  label: group.title,
  href: group.href,
}));

export const footerCompanyLinks: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
  { label: "Impact Build", href: "/impact-build" },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Accessibility", href: "/accessibility" },
];
