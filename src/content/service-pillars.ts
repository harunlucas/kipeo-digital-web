import type { LucideIcon } from "lucide-react";
import { Globe2, Cpu, TrendingUp, ShieldCheck } from "lucide-react";

export type ServicePillarId =
  | "websites-and-commerce"
  | "software-and-systems"
  | "growth-and-visibility"
  | "infrastructure-and-support";

export type ServicePillar = {
  id: ServicePillarId;
  title: string;
  problem: string;
  subservices: string[];
  icon: LucideIcon;
};

export const servicePillars: ServicePillar[] = [
  {
    id: "websites-and-commerce",
    title: "Websites and Commerce",
    problem: "For a site or store that undersells the business, or is hard to manage day to day.",
    subservices: [
      "Website design and development",
      "WordPress and Elementor",
      "Landing pages",
      "WooCommerce and Shopify",
    ],
    icon: Globe2,
  },
  {
    id: "software-and-systems",
    title: "Software and Systems",
    problem: "For manual processes and disconnected tools a website alone can't fix.",
    subservices: [
      "Web applications",
      "Custom software",
      "Business systems",
      "Workflow automation",
    ],
    icon: Cpu,
  },
  {
    id: "growth-and-visibility",
    title: "Growth and Visibility",
    problem: "For a business that's hard to find, or marketing without a clear direction.",
    subservices: [
      "SEO",
      "Digital marketing",
      "Social media management",
      "Paid advertising",
      "Email marketing",
    ],
    icon: TrendingUp,
  },
  {
    id: "infrastructure-and-support",
    title: "Infrastructure and Support",
    problem: "For everything that has to keep working quietly after launch.",
    subservices: [
      "AI automation and chatbots",
      "Hosting and deployment",
      "Maintenance and support",
      "Digital consultation",
    ],
    icon: ShieldCheck,
  },
];
