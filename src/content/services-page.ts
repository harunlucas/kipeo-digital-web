import type { LucideIcon } from "lucide-react";
import { Cloud, Cpu, Globe2, ShieldCheck } from "lucide-react";
import type { ServiceGroupVisualVariant } from "@/components/motion/service-group-visual";

/**
 * /services-only content. Deliberately independent of `service-pillars.ts`
 * (the homepage's four-pillar `ServiceTabs` data) and `services.ts` (the
 * flat service list) — neither is shaped for four full editorial groups
 * with their own outcomes and expandable detail, and editing either would
 * change the homepage. The "websites-and-commerce" group id intentionally
 * matches the homepage pillar id so `problemPairs`/`footerServiceLinks`
 * anchors into this page keep resolving.
 */

export type ExpertiseLink = {
  label: string;
  copy: string;
  linkLabel: string;
  href: string;
  sourceName: string;
};

export type ServiceGroupSubsection = {
  label: string;
  description: string;
  relatedExpertise: ExpertiseLink;
};

export type ServiceGroup = {
  id: string;
  number: string;
  navLabel: string;
  icon: LucideIcon;
  eyebrow: string;
  heading: string;
  intro: string;
  servicesIncluded: string[];
  typicalOutcomes: string[];
  subsections?: ServiceGroupSubsection[];
  expandableDetails: string;
  workLink: { label: string; href: string };
  visual: ServiceGroupVisualVariant;
  tone: "paper" | "ink" | "elevated";
  imageSide: "left" | "right";
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "software-and-business-systems",
    number: "01",
    navLabel: "Software & systems",
    icon: Cpu,
    eyebrow: "Software and business systems",
    heading: "For manual processes and disconnected tools that slow the business down.",
    intro:
      "Custom web applications, internal systems and workflow automation — frontend, backend and data handled as one connected build, not the interface alone.",
    servicesIncluded: [
      "Custom web applications",
      "Internal business systems",
      "Workflow automation",
      "APIs and integrations",
      "Operational dashboards",
    ],
    typicalOutcomes: [
      "One connected system instead of scattered spreadsheets and tools",
      "Faster, less error-prone day-to-day operations",
      "A platform your team can extend as the business grows",
    ],
    expandableDetails:
      "This group also covers databases and data management, and AI-assisted automation where it genuinely removes manual work. Every build includes the authentication, permissions and reporting a real operation needs — not just a working prototype.",
    workLink: { label: "See related software work", href: "/work" },
    visual: "systems",
    tone: "paper",
    imageSide: "right",
  },
  {
    id: "operational-and-technical-software",
    number: "02",
    navLabel: "Operational & technical",
    icon: ShieldCheck,
    eyebrow: "Operational and technical software",
    heading: "For safety, compliance and technical operations still tracked on paper or spreadsheets.",
    intro:
      "Software for two specialist operational workflows. Both are software-development capabilities, not consultancy, education or certification.",
    servicesIncluded: [],
    typicalOutcomes: [
      "A structured, auditable record instead of scattered paperwork",
      "Role-based access for officers, supervisors and technical staff",
      "Reporting built around your existing workflow, not a generic template",
    ],
    subsections: [
      {
        label: "HSE and compliance software",
        description:
          "Inspection workflows, hazard and incident reporting, corrective-action tracking, document control and safety records.",
        relatedExpertise: {
          label: "Related specialist expertise",
          copy: "Supported by workplace-safety and HSE workflow experience associated with the Kipeo team.",
          linkLabel: "Explore related HSE expertise",
          href: "https://cynthiamueni.com/",
          sourceName: "CynthiaMueni.com",
        },
      },
      {
        label: "Engineering, maintenance and technical systems",
        description:
          "Maintenance-management systems, monitoring dashboards, technical calculations and equipment-data workflows.",
        relatedExpertise: {
          label: "Related specialist expertise",
          copy: "Supported by applied engineering and technical-systems experience associated with the Kipeo team.",
          linkLabel: "Explore related technical work",
          href: "https://harunlucas.com/projects",
          sourceName: "HarunLucas.com",
        },
      },
    ],
    expandableDetails:
      "These are software-development capabilities for specialist workflows. Kipeo does not offer HSE consultancy, engineering consultancy, engineering education, academic research or regulatory certification.",
    workLink: { label: "See the HSE system in development", href: "/work" },
    visual: "operational",
    tone: "ink",
    imageSide: "left",
  },
  {
    id: "websites-and-commerce",
    number: "03",
    navLabel: "Websites & commerce",
    icon: Globe2,
    eyebrow: "Websites and commerce",
    heading: "For a site or store that undersells the business, or is hard to find and manage.",
    intro:
      "Business websites, content platforms and online stores, built on a clear structure with the SEO foundations and analytics to support them.",
    servicesIncluded: [
      "Business and agency websites",
      "Landing pages",
      "WooCommerce and Shopify",
      "Content platforms",
      "SEO foundations and analytics",
    ],
    typicalOutcomes: [
      "A site people trust and can navigate to a decision",
      "A store your team can manage without developer help",
      "Structured content and analytics that support visibility",
    ],
    expandableDetails:
      "Marketing and visibility — technical SEO, analytics setup and conversion support — are built in as supporting capabilities of the website itself, not offered as a separate marketing-agency service. We don't promise specific rankings, leads or sales.",
    workLink: { label: "See related website work", href: "/work" },
    visual: "commerce",
    tone: "elevated",
    imageSide: "right",
  },
  {
    id: "integration-deployment-and-support",
    number: "04",
    navLabel: "Integration & support",
    icon: Cloud,
    eyebrow: "Integration, deployment and support",
    heading: "For everything that has to connect, deploy and keep working after launch.",
    intro:
      "API integrations and automation, plus the production hosting, monitoring and support that keeps a launched system secure and current.",
    servicesIncluded: [
      "API integrations",
      "Payment and communication integrations",
      "Hosting and deployment",
      "Monitoring and backups",
      "Maintenance and technical support",
    ],
    typicalOutcomes: [
      "Systems that stay connected instead of breaking silently",
      "A monitored, backed-up production environment",
      "An agreed maintenance arrangement, not a site left to go stale",
    ],
    expandableDetails:
      "Deployment is Vercel-compatible, with domains, DNS and SSL configured as part of launch. Platform updates and technical support continue under a maintenance agreement.",
    workLink: { label: "See our deployment approach", href: "/studio" },
    visual: "integration",
    tone: "ink",
    imageSide: "left",
  },
];

export type InvestmentPoint = { title: string; description: string };

export const investmentPoints: InvestmentPoint[] = [
  {
    title: "Scoped individually",
    description: "Every project is scoped on its own — a landing page and a multi-role operational system aren't priced the same way.",
  },
  {
    title: "Free initial proposal",
    description: "The initial consultation and written proposal are free, with no obligation to proceed.",
  },
  {
    title: "Deliverables, milestones, timeline, investment",
    description: "Your proposal sets all four out clearly, with delivery tracked against agreed milestones.",
  },
  {
    title: "Budget ranges are guidance, not prices",
    description: "The ranges in the enquiry form help us understand likely scale — they are not Kipeo Digital's published prices.",
  },
  {
    title: "Some costs are commonly separate",
    description: "Hosting, licences, advertising spend and other third-party fees are typically separate from the development investment.",
  },
  {
    title: "Changes outside scope need approval",
    description: "Work outside the agreed scope is quoted and approved before it's built — never assumed or added silently.",
  },
];

export type ServicesFaqItem = { question: string; answer: string };

export const servicesFaq: ServicesFaqItem[] = [
  {
    question: "Can we begin with one service?",
    answer:
      "Yes. Most engagements start with a single, clearly scoped service — a system, a website, or one specific problem. Additional services can follow later as their own clearly scoped phases.",
  },
  {
    question: "Can you improve an existing website or system?",
    answer:
      "Yes. We regularly review, extend and rebuild existing websites and systems rather than starting from zero. Discovery covers what already exists before we recommend a direction.",
  },
  {
    question: "Do you handle frontend and backend development?",
    answer:
      "Yes. Kipeo is a team-led software agency covering strategy, interface design, frontend, backend, data, integrations, deployment and support — not frontend alone.",
  },
  {
    question: "Do you provide hosting and maintenance?",
    answer:
      "Yes. We offer Vercel-compatible deployment, managed hosting, monitoring, backups and maintenance agreements, either as part of a build or for an existing site or system.",
  },
  {
    question: "Who owns the finished work?",
    answer:
      "After final payment, clients receive ownership of the custom deliverables created specifically for their project. Third-party software, licensed assets, open-source components and pre-existing development tools remain subject to their respective licences. Your proposal lists exactly which components fall into each category.",
  },
  {
    question: "Can you work with clients outside Kenya, or alongside our internal team?",
    answer:
      "Yes to both. Kipeo is based in Nairobi and works remotely with clients worldwide, and regularly works alongside internal teams and other contractors — the proposal sets out where responsibilities sit on each side.",
  },
];
