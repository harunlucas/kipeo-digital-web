import type { ServicePillarId } from "./service-pillars";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  pillar: ServicePillarId;
};

/**
 * Complete service list, kept independent of the four homepage pillars so it
 * can power a dedicated Services page without changing the homepage summary.
 */
export const services: Service[] = [
  {
    slug: "website-design-development",
    title: "Website design and development",
    summary:
      "Business websites, landing pages and content-led sites, designed around how customers actually decide.",
    pillar: "websites-and-commerce",
  },
  {
    slug: "wordpress-elementor",
    title: "WordPress and Elementor",
    summary: "Websites built on WordPress and Elementor, handed over in a state you can manage yourself.",
    pillar: "websites-and-commerce",
  },
  {
    slug: "landing-pages",
    title: "Landing pages",
    summary: "Focused, conversion-led pages for a campaign, launch or single offer.",
    pillar: "websites-and-commerce",
  },
  {
    slug: "woocommerce-shopify",
    title: "WooCommerce and Shopify",
    summary: "Online stores built around a workable catalogue and manageable day-to-day administration.",
    pillar: "websites-and-commerce",
  },
  {
    slug: "web-applications",
    title: "Web applications",
    summary: "Portals, dashboards and booking systems with the accounts and integrations they need.",
    pillar: "software-and-systems",
  },
  {
    slug: "custom-software",
    title: "Custom software",
    summary: "Software built around a specific operational bottleneck no off-the-shelf tool solves well.",
    pillar: "software-and-systems",
  },
  {
    slug: "business-systems",
    title: "Business systems",
    summary: "Internal tools that bring scattered data and processes into one manageable place.",
    pillar: "software-and-systems",
  },
  {
    slug: "workflow-automation",
    title: "Workflow automation",
    summary: "Automation that removes repetitive manual steps between the tools you already use.",
    pillar: "software-and-systems",
  },
  {
    slug: "seo",
    title: "SEO",
    summary: "Structure, on-page detail and technical foundations that improve organic visibility.",
    pillar: "growth-and-visibility",
  },
  {
    slug: "digital-marketing",
    title: "Digital marketing",
    summary: "Content, campaigns and channels connected to one practical marketing direction.",
    pillar: "growth-and-visibility",
  },
  {
    slug: "social-media-management",
    title: "Social media management",
    summary: "Ongoing content, scheduling and account management across social platforms.",
    pillar: "growth-and-visibility",
  },
  {
    slug: "paid-advertising",
    title: "Paid advertising",
    summary: "Paid search and social campaigns managed toward a clear, measurable objective.",
    pillar: "growth-and-visibility",
  },
  {
    slug: "email-marketing",
    title: "Email marketing",
    summary: "Segmented campaigns that keep customers informed, engaged and returning.",
    pillar: "growth-and-visibility",
  },
  {
    slug: "ai-automation-chatbots",
    title: "AI automation and chatbots",
    summary: "Practical AI-assisted workflows and customer-support integrations.",
    pillar: "infrastructure-and-support",
  },
  {
    slug: "hosting-deployment",
    title: "Hosting and deployment",
    summary: "Domain, DNS, SSL and deployment set up properly, with backups and monitoring.",
    pillar: "infrastructure-and-support",
  },
  {
    slug: "maintenance-support",
    title: "Maintenance and support",
    summary: "Updates, monitoring and the small content changes that come up between projects.",
    pillar: "infrastructure-and-support",
  },
  {
    slug: "digital-consultation",
    title: "Digital consultation",
    summary: "A review of your current setup and a realistic recommendation for what comes next.",
    pillar: "infrastructure-and-support",
  },
];
