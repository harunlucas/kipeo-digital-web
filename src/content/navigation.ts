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

/**
 * Shared by the desktop Services dropdown and the mobile Services accordion
 * — both should list the same five destinations in the same order.
 */
export const servicesMenuLinks: ServiceMenuLink[] = [
  {
    label: "Software and Business Systems",
    href: "/services#software-and-business-systems",
    description: "Custom systems for manual, disconnected operations.",
  },
  {
    label: "Operational and Technical Software",
    href: "/services#operational-and-technical-software",
    description: "HSE, compliance and technical-operations software.",
  },
  {
    label: "Websites and Commerce",
    href: "/services#websites-and-commerce",
    description: "Business websites, content platforms and online stores.",
  },
  {
    label: "Integration, Deployment and Support",
    href: "/services#integration-deployment-and-support",
    description: "Integrations, hosting, monitoring and ongoing support.",
  },
  {
    label: "How We Work — Kipeo Studio",
    href: "/studio",
    description: "Our process, from discovery through to launch and support.",
  },
];

export const footerServiceLinks: NavItem[] = [
  { label: "Software and Business Systems", href: "/services#software-and-business-systems" },
  { label: "Operational and Technical Software", href: "/services#operational-and-technical-software" },
  { label: "Websites and Commerce", href: "/services#websites-and-commerce" },
  { label: "Integration, Deployment and Support", href: "/services#integration-deployment-and-support" },
];

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
