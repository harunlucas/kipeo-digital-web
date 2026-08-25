import type { LucideIcon } from "lucide-react";
import { Cloud, Cpu, Globe2, ShieldCheck, TrendingUp } from "lucide-react";
import type { ServiceGroupVisualVariant } from "@/components/motion/service-group-visual";

/**
 * /services-only content. Deliberately independent of `service-groups.ts`
 * (the compact canonical identity used by nav/footer/homepage/Studio) and
 * `services.ts` (the flat service list) — neither is shaped for five full
 * editorial groups with their own outcomes and expandable detail, and
 * editing either would change those surfaces. Ids and visible titles are
 * kept in sync with `service-groups.ts` by hand rather than imported, so
 * this page's richer shape isn't forced through a generic one. The
 * "websites-and-commerce" group id intentionally stays unchanged even
 * though its visible title is now "Websites, Commerce and Digital
 * Experience", so existing anchors (`problemPairs`, `footerServiceLinks`,
 * search engines) keep resolving.
 */

export type ExpertiseStripLink = { label: string; href: string; sourceName: string };

export type ExpertiseStrip = {
  label: string;
  links: ExpertiseStripLink[];
};

export type ServiceGroup = {
  id: string;
  number: string;
  navLabel: string;
  icon: LucideIcon;
  eyebrow: string;
  heading: string;
  intro: string;
  capabilities: string[];
  typicalOutcomes: string[];
  expertiseStrip?: ExpertiseStrip;
  expandableDetails: string;
  workLink: { label: string; href: string };
  visual: ServiceGroupVisualVariant;
  tone: "paper" | "ink" | "elevated";
  imageSide: "left" | "right";
  supporting?: boolean;
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
    capabilities: [
      "Custom web applications",
      "Internal business systems",
      "Operational dashboards",
      "Workflow automation and AI-assisted automation",
      "Databases and data management",
      "APIs and integrations",
      "Authentication and role-based permissions",
      "Reporting systems",
      "Product and UI/UX design",
      "Product discovery and requirements",
      "User flows and wireframing",
      "Interactive prototyping and design systems",
    ],
    typicalOutcomes: [
      "One connected system instead of scattered spreadsheets and tools",
      "Faster, less error-prone day-to-day operations",
      "A platform your team can extend as the business grows",
    ],
    expandableDetails:
      "This group also covers AI-assisted automation where it genuinely removes manual work. Product and interface design is planned alongside the system architecture, so user flows, permissions, data and application behaviour work as one connected product. Where required, systems include authentication, role-based permissions, structured data and operational reporting.",
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
      "Software for two specialist operational workflows — HSE and compliance, and engineering and technical operations. Both are software-development capabilities, not consultancy, education or certification.",
    capabilities: [
      "HSE and compliance software",
      "Inspection workflows",
      "Hazard and incident reporting",
      "Corrective-action tracking",
      "Document control",
      "Maintenance-management systems",
      "Equipment-data workflows",
      "Monitoring dashboards",
      "Technical calculations",
      "Operational reporting",
    ],
    typicalOutcomes: [
      "A structured, auditable record instead of scattered paperwork",
      "Role-based access for officers, supervisors and technical staff",
      "Reporting built around your existing workflow, not a generic template",
    ],
    expertiseStrip: {
      label: "Related specialist expertise",
      links: [
        {
          label: "Workplace-safety and HSE workflow expertise",
          href: "https://cynthiamueni.com/",
          sourceName: "CynthiaMueni.com",
        },
        {
          label: "Applied engineering and technical-systems expertise",
          href: "https://harunlucas.com/projects",
          sourceName: "HarunLucas.com",
        },
      ],
    },
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
    eyebrow: "Websites, Commerce and Digital Experience",
    heading: "For a site or store that undersells the business, or is hard to find and manage.",
    intro:
      "Websites and commerce platforms are designed around clear content, useful journeys and day-to-day management—not appearance alone.",
    capabilities: [
      "Business and corporate websites",
      "Agency and professional websites",
      "Landing pages",
      "Content-led websites and redesigns",
      "Custom-built and WordPress websites",
      "WooCommerce and Shopify",
      "Product catalogues",
      "Responsive interface design and website UI/UX",
      "Information architecture",
      "Accessibility foundations",
      "Analytics",
      "Conversion-focused enquiry paths",
    ],
    typicalOutcomes: [
      "A site people trust and can navigate to a decision",
      "A store your team can manage without developer help",
      "A structure ready to extend with SEO and analytics when needed",
    ],
    expandableDetails:
      "Search visibility and growth support are covered by the separate SEO and Digital Growth group below, so they can be added when useful without being bundled into every website build.",
    workLink: { label: "See related website work", href: "/work" },
    visual: "commerce",
    tone: "elevated",
    imageSide: "right",
  },
  {
    id: "seo-and-digital-growth",
    number: "04",
    navLabel: "SEO & growth",
    icon: TrendingUp,
    eyebrow: "SEO and Digital Growth",
    heading: "For businesses with a useful website or platform that is still difficult to find, measure or improve.",
    intro:
      "SEO and digital-growth support connects technical visibility, useful content, measurement and conversion paths to the website or platform itself.",
    capabilities: [
      "Technical SEO audits",
      "Search-intent and keyword planning",
      "On-page SEO, titles and metadata",
      "Structured data, sitemap and robots.txt configuration",
      "Google Search Console and indexing support",
      "Content optimization",
      "Local SEO where appropriate",
      "Analytics, measurement and Core Web Vitals",
      "Conversion-path improvements",
      "Digital strategy and content-channel planning",
      "Campaign landing pages",
      "Email-marketing technical setup",
      "Paid-campaign landing-page and tracking support",
      "Social-platform setup where required",
    ],
    typicalOutcomes: [
      "A website or platform people can actually find",
      "Clear measurement of what's working and what isn't",
      "Conversion paths that turn visits into enquiries",
    ],
    expandableDetails:
      "Kipeo does not promise rankings, traffic, leads, sales or advertising performance. Recommendations and implementation are based on the website, audience, competition, available content and agreed scope.",
    workLink: { label: "See how our websites are built", href: "/work" },
    visual: "seo",
    tone: "paper",
    imageSide: "left",
    supporting: true,
  },
  {
    id: "integration-deployment-and-support",
    number: "05",
    navLabel: "Integration & support",
    icon: Cloud,
    eyebrow: "Integration, deployment and support",
    heading: "For everything that has to connect, deploy and keep working after launch.",
    intro:
      "API integrations and automation, plus the production hosting, monitoring and support that keeps a launched system secure and current.",
    capabilities: [
      "API and payment integrations",
      "Communication and email-delivery integrations",
      "Workflow connections and automation",
      "Production deployment",
      "Vercel deployment where appropriate",
      "Cloud and hosting environments",
      "Domain, DNS and SSL configuration",
      "Managed hosting",
      "Performance and uptime monitoring",
      "Backups and platform updates",
      "WordPress and application maintenance",
      "Security-update support",
      "Analytics integrations",
      "Documentation and handover",
    ],
    typicalOutcomes: [
      "Systems that stay connected instead of breaking silently",
      "A monitored, backed-up production environment",
      "An agreed maintenance arrangement, not a site left to go stale",
    ],
    expandableDetails:
      "Deployment and ongoing support cover the infrastructure, integrations, monitoring and maintenance required to keep a digital product working after launch. Maintenance agreements are scoped clearly rather than open-ended, and hosting, licences and other third-party charges are typically kept separate from the agreement itself.",
    workLink: { label: "See our deployment approach", href: "/studio" },
    visual: "integration",
    tone: "ink",
    imageSide: "left",
    supporting: true,
  },
];

export type ProcessPhase = { id: string; number: string; label: string; description: string };

export const processPhases: ProcessPhase[] = [
  {
    id: "discover-define",
    number: "01",
    label: "Discover and define",
    description: "Understand the problem, users, requirements, constraints and measures of success.",
  },
  {
    id: "design-plan",
    number: "02",
    label: "Design and plan",
    description: "Shape the experience, architecture, scope, delivery stages and responsibilities.",
  },
  {
    id: "build-integrate",
    number: "03",
    label: "Build and integrate",
    description: "Develop frontend, backend, data, integrations and automation through visible milestones.",
  },
  {
    id: "launch-support",
    number: "04",
    label: "Launch and support",
    description: "Test, deploy, document, hand over and provide agreed maintenance or support.",
  },
];

export type InvestmentPoint = { title: string; description: string };

export const investmentPoints: InvestmentPoint[] = [
  {
    title: "Scoped individually",
    description: "Every project is scoped on its own — a landing page and a multi-role operational system aren't priced the same way.",
  },
  {
    title: "Free initial consultation",
    description:
      "The initial consultation is free. Where the project is a suitable fit, a written proposal is also provided at no cost, with no obligation to proceed.",
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
    question: "Do you provide hosting and maintenance?",
    answer:
      "Yes. We offer production deployment across suitable cloud, hosting and platform environments, managed hosting, monitoring, backups and maintenance agreements, either as part of a build or for an existing site or system.",
  },
  {
    question: "Who owns the finished work?",
    answer:
      "After final payment, clients receive ownership of the custom deliverables created specifically for their project. Third-party software, licensed assets, open-source components and pre-existing development tools remain subject to their respective licences. Your proposal lists exactly which components fall into each category.",
  },
  {
    question: "Can you work with clients outside Kenya, or alongside our internal team?",
    answer:
      "Yes. Kipeo is based in Nairobi and works remotely with clients worldwide. Kipeo can work alongside internal teams and other contractors, with responsibilities defined clearly in the proposal.",
  },
];
