export type CapabilityGroup = {
  title: string;
  items: string[];
};

/**
 * Named technologies are limited to what's confirmed by this project's own
 * configuration or the approved reference content — no invented platform
 * experience.
 */
export const capabilityGroups: CapabilityGroup[] = [
  {
    title: "Frontend and experience",
    items: ["Next.js and React", "TypeScript", "Tailwind CSS", "WordPress and Elementor"],
  },
  {
    title: "Applications and integrations",
    items: [
      "Web application development",
      "Business system design",
      "Workflow and API integrations",
      "AI-assisted automation",
    ],
  },
  {
    title: "Commerce and content",
    items: ["WooCommerce", "Shopify", "WordPress content structures", "CMS handover and training"],
  },
  {
    title: "Deployment and ongoing operation",
    items: ["Vercel-compatible deployment", "Domain, DNS and SSL setup", "Backups and monitoring", "Maintenance support"],
  },
];
