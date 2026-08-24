import type { LucideIcon } from "lucide-react";
import { Cloud, Cpu, Globe2, Share2, ShieldCheck, TrendingUp, Wrench } from "lucide-react";

/**
 * /services-only content. Deliberately independent of `service-pillars.ts`
 * (the homepage's four-pillar `ServiceTabs` data) and `services.ts` (the
 * flat service list) — neither is shaped for seven full editorial
 * sections with their own suitability, delivery, process and scope detail,
 * and editing either would change the homepage. Three section ids below
 * intentionally match existing pillar ids so pre-existing links elsewhere
 * in the app (`footerServiceLinks`, `problemPairs`) keep resolving:
 * "websites-and-commerce", "software-and-systems", "growth-and-visibility".
 */

export type ServiceSectionVisual =
  | { kind: "screenshots"; items: { src: string; alt: string }[]; attribution: string }
  | {
      kind: "photo";
      src: string;
      alt: string;
      credit: string;
      creditHref: string;
      secondary?: { src: string; alt: string }[];
      secondaryLabel?: string;
    };

export type ServiceLink = { label: string; href: string };

export type ServiceSection = {
  id: string;
  number: string;
  navLabel: string;
  icon: LucideIcon;
  eyebrow: string;
  heading: string;
  intro: string;
  includes: string[];
  suitableFor: string;
  deliverables: string;
  howItWorks: string;
  investmentNote: string;
  disclosure?: string;
  workLink: ServiceLink;
  secondaryExpertiseLink?: ServiceLink & { sourceName: string };
  visual: ServiceSectionVisual;
  tone: "paper" | "ink" | "elevated";
  imageSide: "left" | "right";
  confirmedTechnologies?: string[];
};

export const serviceSections: ServiceSection[] = [
  {
    id: "websites-and-commerce",
    number: "01",
    navLabel: "Websites and commerce",
    icon: Globe2,
    eyebrow: "Websites and commerce",
    heading: "For a website or store that undersells the business, or is hard to manage day to day.",
    intro:
      "A site built around how customers actually decide — clear, fast, responsive, and manageable by your own team once it's live.",
    includes: [
      "Business websites",
      "Agency websites",
      "Professional portfolios",
      "Landing pages",
      "WordPress and Elementor",
      "WooCommerce",
      "Shopify",
      "Content-managed websites",
      "Accessibility and responsive design",
    ],
    suitableFor:
      "Businesses, agencies, professionals and campaigns that need a site people can trust — and that someone on your team can update afterwards.",
    deliverables:
      "A fully responsive, accessible, content-managed website, handed over with the access and documentation to run it yourself.",
    howItWorks:
      "Scoped as design and build in fixed milestones — structure and content first, then visual design, then development and launch.",
    investmentNote:
      "Depends mainly on page count, custom functionality, content volume and platform — WordPress and Elementor, WooCommerce or Shopify, or a custom build — confirmed in your proposal.",
    workLink: { label: "See related website work", href: "/work" },
    visual: {
      kind: "screenshots",
      items: [
        {
          src: "/images/projects/related-websites/cynthiamueni-home.webp",
          alt: "CynthiaMueni.com homepage, an occupational safety and EHS-systems professional site",
        },
        {
          src: "/images/projects/related-websites/harunlucas-home.webp",
          alt: "HarunLucas.com homepage, an engineering and systems-development portfolio site",
        },
      ],
      attribution: "Related website work associated with the Kipeo Digital team.",
    },
    tone: "paper",
    imageSide: "right",
  },
  {
    id: "software-and-systems",
    number: "02",
    navLabel: "Software and systems",
    icon: Cpu,
    eyebrow: "Software and systems",
    heading: "For manual processes and disconnected tools a website alone can't fix.",
    intro:
      "Kipeo handles frontend, backend and data as one connected build — not the interface alone — so the system that comes out the other end can actually run your operation.",
    includes: [
      "Custom web applications",
      "Business systems",
      "Internal tools",
      "Dashboards",
      "Workflow systems",
      "Authentication and permissions",
      "Databases",
      "APIs",
      "Reporting tools",
    ],
    suitableFor:
      "Teams tracking work across spreadsheets, chasing approvals by message, or needing one internal tool no off-the-shelf product quite matches.",
    deliverables: "A working application with the accounts, permissions and data structure it needs — not a prototype.",
    howItWorks:
      "Scoped around the specific workflow first, then built in visible milestones: data model, core screens, permissions, then integrations and testing.",
    investmentNote:
      "Depends on the number of user roles, data complexity and how much of the workflow needs automating — confirmed in your proposal.",
    workLink: { label: "Explore software and systems work", href: "/work" },
    visual: {
      kind: "photo",
      src: "/images/services/software-systems-code.webp",
      alt: "Close-up of colourful application source code on a dark screen",
      credit: "Photo by Markus Spiske",
      creditHref: "https://www.pexels.com/photo/coding-script-965345/",
    },
    tone: "elevated",
    imageSide: "left",
  },
  {
    id: "hse-and-operational-systems",
    number: "03",
    navLabel: "HSE and operational systems",
    icon: ShieldCheck,
    eyebrow: "HSE and operational systems",
    heading: "For safety, compliance and operational records still running on paper or spreadsheets.",
    intro:
      "Operational software for inspections, hazard and incident reporting, corrective actions, document control and safety records, informed by direct HSE domain expertise.",
    includes: [
      "Inspection workflows",
      "Hazard and incident reporting",
      "Corrective-action tracking",
      "Document control",
      "Safety records",
      "Operational dashboards",
      "Reporting systems",
    ],
    disclosure:
      "The HSE Management System shown here is an internal, in-development product built by the Kipeo team — shown as evidence of capability, not offered as a finished off-the-shelf product. A client HSE system is scoped and built individually.",
    suitableFor:
      "HSE, EHS and operations teams that need a structured, auditable record of inspections, incidents and corrective actions.",
    deliverables:
      "An operational system shaped around your existing inspection and reporting process, with role-based access for officers, supervisors and workers.",
    howItWorks:
      "Built the same way as other software: workflow mapping first, then data structure, screens and reporting, reviewed against real HSE practice throughout.",
    investmentNote: "Depends on the number of workflows, user roles and reporting requirements — confirmed in your proposal.",
    workLink: { label: "See the HSE system in development", href: "/work" },
    secondaryExpertiseLink: {
      label: "Explore related HSE expertise",
      href: "https://cynthiamueni.com/expertise",
      sourceName: "CynthiaMueni.com",
    },
    visual: {
      kind: "photo",
      src: "/images/services/hse-safety-helmets.webp",
      alt: "A row of coloured industrial safety helmets hanging on a rack",
      credit: "Photo by ClickerHappy",
      creditHref: "https://www.pexels.com/photo/collection-of-construction-safety-helmet-38070/",
      secondary: [
        {
          src: "/images/projects/hse-management-system/hse-login.webp",
          alt: "HSE Management System sign-in screen for SafetyOS, showing role-based demo accounts for Admin, EHS Officer, Supervisor and Worker",
        },
        {
          src: "/images/projects/hse-management-system/hse-create-account.webp",
          alt: "HSE Management System account-creation screen for SafetyOS",
        },
      ],
      secondaryLabel: "Real in-development screens",
    },
    tone: "ink",
    imageSide: "right",
  },
  {
    id: "engineering-and-technical-software",
    number: "04",
    navLabel: "Engineering and technical software",
    icon: Wrench,
    eyebrow: "Engineering and technical software",
    heading: "For technical operations still tracked across spreadsheets, notebooks and separate tools.",
    intro:
      "Software for technical operations — maintenance, monitoring and equipment data — not engineering consultancy, education or academic research.",
    includes: [
      "Maintenance-management systems",
      "Monitoring dashboards",
      "Technical calculations",
      "Equipment-data workflows",
      "Automation interfaces",
      "Engineering reporting tools",
    ],
    suitableFor: "Technical and operations teams managing equipment, maintenance schedules or recurring technical calculations.",
    deliverables:
      "An interface and data layer built around your actual equipment records and reporting format — not a generic template.",
    howItWorks:
      "Scoped around your existing data sources and calculation methods first, then built as a connected dashboard or reporting tool.",
    investmentNote:
      "Depends on data volume, integration complexity and the number of calculation or reporting workflows — confirmed in your proposal.",
    workLink: { label: "Explore technical systems work", href: "/work" },
    secondaryExpertiseLink: {
      label: "Explore related engineering work",
      href: "https://harunlucas.com/projects",
      sourceName: "HarunLucas.com",
    },
    visual: {
      kind: "photo",
      src: "/images/services/engineering-equipment-gauge.webp",
      alt: "Close-up of an industrial pressure gauge mounted on steel pipework",
      credit: "Photo by Pavel Danilyuk",
      creditHref: "https://www.pexels.com/photo/steel-pipes-with-pressure-gauge-7937300/",
    },
    tone: "paper",
    imageSide: "left",
  },
  {
    id: "growth-and-visibility",
    number: "05",
    navLabel: "Growth and visibility",
    icon: TrendingUp,
    eyebrow: "Growth and visibility",
    heading: "For a business that's hard to find, or marketing running without a clear direction.",
    intro:
      "Technical foundations and ongoing management for visibility and marketing: search, content structure, analytics and the channels that support them.",
    includes: [
      "Technical SEO",
      "Content structure",
      "Analytics setup",
      "Search visibility",
      "Digital marketing strategy",
      "Social media management",
      "Paid advertising support",
      "Email marketing",
    ],
    suitableFor: "Businesses with a website already live that now needs to be found, understood and acted on.",
    deliverables:
      "The technical foundations in place — structured content, working analytics and a documented approach — plus ongoing management where agreed. We do not promise specific rankings, leads or sales; results depend on market, competition and budget.",
    howItWorks:
      "Usually starts with a technical and content audit, then a prioritised plan covering structure, analytics and the channels worth investing in.",
    investmentNote:
      "Depends on scope — a one-off audit versus ongoing management — the channels involved, and any paid advertising spend, which is budgeted separately.",
    workLink: { label: "See how our own systems are structured", href: "/studio" },
    visual: {
      kind: "photo",
      src: "/images/services/growth-market-chart.webp",
      alt: "Close-up of a candlestick trend chart on a monitor",
      credit: "Photo by energepic.com",
      creditHref: "https://www.pexels.com/photo/close-up-photo-of-monitor-159888/",
    },
    tone: "elevated",
    imageSide: "right",
  },
  {
    id: "integrations-and-automation",
    number: "06",
    navLabel: "Integrations and automation",
    icon: Share2,
    eyebrow: "Integrations and automation",
    heading: "For repetitive manual work between tools that should already talk to each other.",
    intro:
      "Connected workflows between the tools you already use: APIs, notifications, payments and AI-assisted automation that remove repeated manual steps.",
    includes: [
      "API integrations",
      "Workflow automation",
      "Email and notification systems",
      "Payment integrations",
      "Third-party platforms",
      "AI-assisted automation and chatbots",
      "Data synchronisation",
    ],
    suitableFor:
      "Teams re-entering the same data twice, manually notifying people of updates, or wanting a chatbot or assistant wired into a real workflow.",
    deliverables: "A working, tested connection between the systems involved, documented so your team knows what depends on what.",
    howItWorks: "Scoped around the specific tools and data involved, then built and tested against real data before going live.",
    investmentNote:
      "Depends on the number of systems connected, data complexity and any third-party API or platform fees, which may be separate.",
    workLink: { label: "See our connected-systems approach", href: "/studio" },
    visual: {
      kind: "photo",
      src: "/images/services/integrations-connected-cables.webp",
      alt: "Close-up of cables plugged into a rack of connected equipment",
      credit: "Photo by Josh Sorenson",
      creditHref: "https://www.pexels.com/photo/ethernet-cables-plugged-on-a-server-rack-1054397/",
    },
    tone: "paper",
    imageSide: "left",
  },
  {
    id: "hosting-maintenance-support",
    number: "07",
    navLabel: "Hosting, maintenance and support",
    icon: Cloud,
    eyebrow: "Hosting, maintenance and support",
    heading: "For everything that has to keep working quietly after launch.",
    intro: "Production hosting, monitoring, backups, updates and support, so a launched system stays secure, current and running.",
    includes: [
      "Vercel-compatible deployment",
      "Managed hosting",
      "Domains, DNS and SSL",
      "Monitoring",
      "Backups",
      "Security updates",
      "Content and platform updates",
      "Maintenance agreements",
      "Technical support",
    ],
    suitableFor: "Anything Kipeo has built, and existing sites or systems that now need a reliable home and someone to maintain them.",
    deliverables:
      "A monitored, backed-up production environment and an agreed maintenance arrangement — not a site left to quietly go out of date.",
    howItWorks: "Set up as part of launch, then run on a maintenance agreement covering the update and support frequency you agree to.",
    investmentNote:
      "Depends on hosting tier, update frequency and support response time; hosting and licence costs may be separate from the maintenance fee.",
    workLink: { label: "See our deployment approach", href: "/studio" },
    visual: {
      kind: "photo",
      src: "/images/services/hosting-data-center.webp",
      alt: "Rows of server racks in a data center aisle",
      credit: "Photo by Brett Sayles",
      creditHref: "https://www.pexels.com/photo/black-hardwares-on-data-server-room-4597280/",
    },
    tone: "ink",
    imageSide: "right",
    confirmedTechnologies: ["Vercel"],
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
    description: "Your proposal sets all four out clearly before any development begins.",
  },
  {
    title: "Budget ranges are guidance, not prices",
    description: "The ranges in the enquiry form help us understand likely scale — they are not Kipeo Digital's published prices.",
  },
  {
    title: "Third-party costs may be separate",
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
    question: "Why don't you publish fixed prices?",
    answer:
      "Every project is different — a landing page and a multi-role operational system need very different scope. A single price list would either overstate simple work or understate complex work. We scope and price every project individually and set it out in a free written proposal before anything begins.",
  },
  {
    question: "Is the initial proposal free?",
    answer:
      "Yes. The initial consultation and written proposal are free, with no obligation to proceed. Development only begins after you approve the proposal and agreed terms.",
  },
  {
    question: "Can we begin with one service?",
    answer:
      "Yes. Most engagements start with a single, clearly scoped service — a website, a system, or one specific problem. Additional services can follow later as their own clearly scoped phases.",
  },
  {
    question: "Can you improve an existing website or system?",
    answer:
      "Yes. We regularly review, extend and rebuild existing websites and systems rather than starting from zero. Discovery covers what already exists before we recommend a direction.",
  },
  {
    question: "Do you handle frontend and backend development?",
    answer:
      "Yes. Kipeo is a team-led, full-service studio covering strategy, interface design, frontend, backend, data, integrations, deployment and support — not frontend alone.",
  },
  {
    question: "Do you provide hosting and maintenance?",
    answer:
      "Yes. We offer Vercel-compatible deployment, managed hosting, monitoring, backups and maintenance agreements, either as part of a build or for an existing site or system.",
  },
  {
    question: "Can you work with clients outside Kenya?",
    answer: "Yes. Kipeo is based in Nairobi, Kenya, and works remotely with clients worldwide.",
  },
  {
    question: "Who owns the finished work?",
    answer:
      "After final payment, clients receive ownership of the custom deliverables created specifically for their project. Third-party software, licensed assets, open-source components and pre-existing development tools remain subject to their respective licences. Your proposal lists exactly which components fall into each category.",
  },
  {
    question: "Are third-party fees included?",
    answer:
      "No. Hosting, domains, licences, advertising spend and other third-party fees are typically separate from the development investment, and are identified in your proposal.",
  },
  {
    question: "Can you work with our internal team?",
    answer:
      "Yes. We regularly work alongside internal teams and other contractors. The proposal sets out where responsibilities sit on each side.",
  },
];
