export type EngagementType =
  | "client"
  | "collaboration"
  | "internal-product"
  | "team-contribution"
  | "managed-platform"
  | "related-work";

export type WorkStatus = "live" | "in-development" | "maintained" | "completed";

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

