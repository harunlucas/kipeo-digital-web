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

export type ProjectScreenshot = {
  src: string;
  alt: string;
};

/**
 * A real, verified in-development or related project shown inside a
 * capability card (e.g. the HSE Management System inside "Business and
 * HSE systems"). Distinct from `featuredWork` because it's presented at
 * card scale, not as the homepage's single large featured project.
 */
export type EmbeddedProject = {
  title: string;
  category: string;
  engagementType: EngagementType;
  status: WorkStatus;
  description: string;
  attribution: string;
  screenshots: ProjectScreenshot[];
  /**
   * AI-generated concept renders shown alongside the real screenshots
   * above — never mixed into `screenshots`, always rendered in their own
   * clearly-labeled "Concept visual" row, since `screenshots` here are a
   * real, disclosed, in-development product.
   */
  conceptVisuals?: ProjectScreenshot[];
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
  /** Real screenshots shown in place of the generic SVG artwork. */
  screenshots?: ProjectScreenshot[];
  screenshotAttribution?: string;
  /** A confirmed, embedded real project (e.g. HSE Management System). */
  embeddedProject?: EmbeddedProject;
  /** Shown when the visual is an admitted fictional illustration, never real work. */
  illustrationLabel?: string;
  /**
   * Generic capability context imagery — never a Kipeo project, client or
   * screenshot. Takes priority over `screenshots`/the SVG artwork when
   * present. "photo" is a real, freely-licensed stock photo (credited);
   * "concept" is an AI-generated illustrative render (no real photographer
   * to credit, disclosed as generated). Source recorded in
   * docs/asset-sources.md.
   */
  capabilityVisual?: {
    src: string;
    alt: string;
    kind: "photo" | "concept";
    credit?: string;
    creditHref?: string;
  };
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
    screenshots: [
      {
        src: "/images/projects/related-websites/cynthiamueni-home.webp",
        alt: "CynthiaMueni.com homepage, an occupational safety and EHS-systems professional site",
      },
      {
        src: "/images/projects/related-websites/harunlucas-home.webp",
        alt: "HarunLucas.com homepage, an engineering and systems-development portfolio site",
      },
    ],
    screenshotAttribution: "Related website work associated with the Kipeo Digital team.",
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
    capabilityVisual: {
      src: "/images/projects/capability-photos/hse-systems-concept.webp",
      alt: "Concept render of an HSE management dashboard on a laptop beside a hard hat and safety clipboard, showing inspection checklists, an incident-status chart and a document library",
      kind: "concept",
    },
    domainExpertise: "HSE domain expertise associated with the Kipeo Digital team.",
    relatedExpertise: {
      label: "Related specialist expertise",
      description: "Informed by workplace-safety practice, inspection workflows and HSE compliance experience.",
      sourceName: "CynthiaMueni.com",
      href: "https://cynthiamueni.com/expertise",
      isExternal: true,
    },
    secondaryExpertiseLink: "Explore related HSE expertise",
    embeddedProject: {
      title: "HSE Management System",
      category: "HSE and compliance system",
      engagementType: "internal-product",
      status: "in-development",
      description:
        "A developing digital system for managing workplace inspections, hazard reports, corrective actions, documentation and safety records.",
      attribution:
        "Digital product development associated with Kipeo Digital, informed by related HSE practice documented at CynthiaMueni.com.",
      screenshots: [
        {
          src: "/images/projects/hse-management-system/hse-login.webp",
          alt: "HSE Management System sign-in screen for SafetyOS, showing role-based demo accounts for Admin, EHS Officer, Supervisor and Worker",
        },
        {
          src: "/images/projects/hse-management-system/hse-create-account.webp",
          alt: "HSE Management System account-creation screen for SafetyOS",
        },
      ],
      conceptVisuals: [
        {
          src: "/images/projects/capability-photos/hse-app-multidevice-concept.webp",
          alt: "AI-generated concept render of an HSE management app shown across desktop and tablet, with inspection, alert and document panels",
        },
        {
          src: "/images/projects/capability-photos/hse-mobile-capture-concept.webp",
          alt: "AI-generated concept render of a mobile hazard-reporting flow, showing photo evidence capture and a review checklist",
        },
      ],
    },
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
    capabilityVisual: {
      src: "/images/projects/capability-photos/engineering-systems-concept.webp",
      alt: "Concept render of an equipment-monitoring interface on a laptop showing a 3D pump/motor assembly with diagnostic overlays, sensor graphs and status readouts",
      kind: "concept",
    },
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
    capabilityVisual: {
      src: "/images/projects/capability-photos/commerce-platform-concept.webp",
      alt: "Concept render of an online store's multi-monitor commerce dashboard showing a product catalogue, inventory, orders, hosting and deployment, uptime monitoring, and security panels",
      kind: "concept",
    },
  },
];
