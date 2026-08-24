export type CapabilityVisual = "strategy" | "frontend" | "backend" | "applications" | "commerce" | "deployment";

export type Capability = {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  confirmedTechnologies?: string[];
  visualType: CapabilityVisual;
};

/**
 * Named technologies are limited to what's confirmed by this project's own
 * configuration, the approved reference content, or a verified related
 * project (BushLite WiFi) — no invented platform or database experience.
 * Python and other tooling that appears only in HarunLucas.com's personal
 * engineering research is deliberately excluded from Kipeo's offering.
 */
export const capabilities: Capability[] = [
  {
    id: "strategy",
    title: "Strategy and experience",
    description: "We define the problem, structure the experience and design around the people who will use the result.",
    capabilities: [
      "Discovery and requirements",
      "Information architecture",
      "User flows",
      "UX and interface design",
      "Responsive design",
      "Content structure",
      "Accessibility planning",
    ],
    visualType: "strategy",
  },
  {
    id: "frontend",
    title: "Frontend development",
    description: "We build responsive, accessible interfaces that work across devices and remain practical to maintain.",
    capabilities: ["Responsive interfaces", "Accessible components", "Design-system implementation", "Content-managed pages"],
    confirmedTechnologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "WordPress", "Elementor"],
    visualType: "frontend",
  },
  {
    id: "backend",
    title: "Backend and data",
    description:
      "We build the application logic, data structures and permissions that allow systems to store information and support real workflows.",
    capabilities: [
      "Server-side application logic",
      "Databases and data modelling",
      "Authentication",
      "User roles and permissions",
      "Validation",
      "Secure form processing",
      "File and record management",
      "Reporting logic",
    ],
    visualType: "backend",
  },
  {
    id: "applications",
    title: "Applications, APIs and automation",
    description: "We connect systems, automate repeatable work and integrate the services required by the operation.",
    capabilities: [
      "Web applications",
      "REST APIs",
      "Third-party integrations",
      "Workflow automation",
      "Notifications",
      "AI-assisted features",
      "Business-system integrations",
      "External service connections",
    ],
    confirmedTechnologies: ["Node.js", "Express.js"],
    visualType: "applications",
  },
  {
    id: "commerce",
    title: "Commerce and content",
    description: "We implement commerce and content platforms that internal teams can manage after launch.",
    capabilities: ["Product catalogues", "CMS structures", "Payment integrations", "Content migration", "Administration and training"],
    confirmedTechnologies: ["WooCommerce", "Shopify", "WordPress"],
    visualType: "commerce",
  },
  {
    id: "deployment",
    title: "Deployment and ongoing operation",
    description: "We prepare systems for production and support their continued operation after launch.",
    capabilities: [
      "Hosting configuration",
      "Domains and DNS",
      "SSL",
      "Environment configuration",
      "Backups",
      "Monitoring",
      "Updates",
      "Maintenance",
      "Documentation",
      "Technical handover",
    ],
    confirmedTechnologies: ["Vercel"],
    visualType: "deployment",
  },
];
