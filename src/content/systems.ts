export type SystemType = {
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  visual: "dashboard" | "app" | "commerce";
};

/**
 * Capability showcase, not case studies — no client project screenshots
 * are verified as approved Kipeo work yet. Replace with real, approved
 * project data (see src/content/projects.ts) once available.
 */
export const systemTypes: SystemType[] = [
  {
    slug: "business-systems",
    title: "Business systems & dashboards",
    category: "Software and Systems",
    description:
      "Internal tools that bring scattered operations, records and reporting into one manageable place.",
    technologies: ["Next.js", "React", "TypeScript"],
    visual: "dashboard",
  },
  {
    slug: "web-applications",
    title: "Web applications & portals",
    category: "Software and Systems",
    description:
      "Purpose-built portals with accounts, permissions and the integrations a specific process needs.",
    technologies: ["Next.js", "React"],
    visual: "app",
  },
  {
    slug: "commerce-platforms",
    title: "Commerce platforms",
    category: "Websites and Commerce",
    description: "Stores built around a workable catalogue that your own team can run day to day.",
    technologies: ["WooCommerce", "Shopify", "WordPress"],
    visual: "commerce",
  },
];
