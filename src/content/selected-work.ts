export type EngagementType =
  | "client"
  | "collaboration"
  | "internal-product"
  | "team-contribution"
  | "managed-platform"
  | "related-work";

export type WorkStatus = "live" | "in-development" | "maintained" | "completed";

export type RelatedExpertise = {
  label: string;
  description: string;
  sourceName: "CynthiaMueni.com" | "HarunLucas.com";
  href: string;
  isExternal: true;
};

export type FeaturedWork = {
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  technologies: string[];
  url: string;
  disclosure: string;
  engagementType: EngagementType;
  status: WorkStatus;
  contribution?: string;
  externalCaseStudyOwner?: string;
};

export type CapabilityPath = {
  id: string;
  title: string;
  description: string;
  examples: string[];
  primaryAgencyCta: string;
  href: string;
  visual: "websites" | "systems" | "engineering" | "commerce";
  engagementType: EngagementType;
  status?: WorkStatus;
  domainExpertise?: string;
  relatedExpertise?: RelatedExpertise;
  secondaryExpertiseLink?: string;
};

/**
 * The only project with verified name, contribution, technologies and a
 * public case-study link (harunlucas.com/projects/bushlite-wifi). It is
 * related systems work contributed by the team behind Kipeo Digital, not
 * a Kipeo Digital client project — the disclosure line and outbound link
 * make that explicit. See docs/asset-sources.md for image provenance.
 */
export const featuredWork: FeaturedWork = {
  title: "BushLite WiFi",
  category: "Hotspot Management System",
  description:
    "A hotspot management system supporting voucher authentication, internet packages, active-session monitoring and shared bandwidth allocation across multiple access points.",
  image: "/images/projects/bushlite-wifi-dashboard.webp",
  imageAlt: "BushLite WiFi hotspot management dashboard showing voucher login, package purchase and real-time usage analytics",
  technologies: ["Node.js", "Express.js", "JavaScript", "MikroTik integration", "Responsive web design"],
  url: "https://harunlucas.com/projects/bushlite-wifi",
  disclosure: "Related systems work contributed by the team behind Kipeo Digital.",
  engagementType: "team-contribution",
  status: "live",
  contribution: "Related systems work",
  externalCaseStudyOwner: "HarunLucas.com",
};

export const capabilityPaths: CapabilityPath[] = [
  {
    id: "websites",
    title: "Websites and digital presence",
    description:
      "Business websites, company platforms, professional portfolios and focused landing pages designed to communicate clearly and generate useful enquiries.",
    examples: ["Business websites", "Agency websites", "Professional portfolios", "Landing pages", "Content-led websites"],
    primaryAgencyCta: "Explore website work",
    href: "/work",
    visual: "websites",
    engagementType: "client",
  },
  {
    id: "systems",
    title: "Business and HSE systems",
    description:
      "Operational software for managing records, inspections, actions, reporting and everyday workplace processes.",
    examples: ["HSE management systems", "Inspection workflows", "Corrective-action tracking", "Operational dashboards", "Reporting systems"],
    primaryAgencyCta: "Explore operational systems",
    href: "/work",
    visual: "systems",
    engagementType: "client",
    domainExpertise: "HSE domain expertise associated with the Kipeo Digital team.",
    relatedExpertise: {
      label: "Related specialist expertise",
      description: "Informed by workplace-safety practice, inspection workflows and HSE compliance experience.",
      sourceName: "CynthiaMueni.com",
      href: "https://cynthiamueni.com/expertise",
      isExternal: true,
    },
    secondaryExpertiseLink: "Explore related HSE expertise",
  },
  {
    id: "engineering",
    title: "Engineering and technical systems",
    description:
      "Software, data tools and automation interfaces designed around engineering, maintenance and technical operations.",
    examples: ["Maintenance-management systems", "Equipment-monitoring dashboards", "Technical calculations", "Automation interfaces", "Equipment-data workflows", "Engineering reporting tools"],
    primaryAgencyCta: "Explore technical systems",
    href: "/work",
    visual: "engineering",
    engagementType: "client",
    domainExpertise: "Related engineering and systems expertise associated with the Kipeo Digital team.",
    relatedExpertise: {
      label: "Related specialist expertise",
      description: "Supported by applied engineering, technical-workflow and systems-development experience.",
      sourceName: "HarunLucas.com",
      href: "https://harunlucas.com/projects",
      isExternal: true,
    },
    secondaryExpertiseLink: "Explore related engineering work",
  },
  {
    id: "commerce",
    title: "E-commerce and managed platforms",
    description:
      "Online stores and business platforms supported after launch through hosting, maintenance, updates and practical technical assistance.",
    examples: ["WooCommerce", "Shopify", "Product catalogues", "Content management", "Managed hosting", "Website maintenance", "Platform updates"],
    primaryAgencyCta: "Explore commerce work",
    href: "/work",
    visual: "commerce",
    engagementType: "client",
  },
];
