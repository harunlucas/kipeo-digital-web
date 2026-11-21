import type { ServiceGroupId } from "@/content/service-groups";
import { serviceNavLabels } from "@/content/navigation";

/**
 * /services content: five service families, each written around the
 * question a buyer arrives with, plus the short scoping terms.
 *
 * Ids are the anchors the header Services menu, the footer and the Insights
 * articles link to (`service-groups.ts` `href`s), so they must not change.
 * Each `title` is the family's label in the Services menu
 * (`serviceNavLabels` in `navigation.ts`), so a visitor lands on the heading
 * they just clicked. Service 02 is the exception: the page names it
 * "Operational software & engineering systems" to give engineering work a
 * visible place, while the menu label and anchor are unchanged. `scope`
 * keeps the full catalogue from the previous /services page, shown behind
 * each section's "Full service scope" disclosure.
 *
 * Every factual claim here comes from the existing catalogue, the Work case
 * studies (`case-studies.ts`) or this site's own code (the enquiry-form
 * flow in `app/api/contact/route.ts` and `lib/email/`). Images are generated
 * interface concepts, each labelled as such on the page; the audit rows and
 * the purchase-request workflow are labelled as illustrative. Image files
 * and their provenance: `docs/asset-sources.md`.
 */

/**
 * One supplied interface image. Files are lossless WebP at full resolution
 * (the "Open full size" target); the page serves resized, compressed
 * variants through `next/image`. `label` is the visible provenance tag.
 */
export type ServiceImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  caption: string;
};

export type Deliverable = { title: string; detail: string };

export type WorkflowStep = { stage: string; actor: "person" | "automated"; action: string };

export type WebsiteRoute = {
  name: string;
  suits: string;
  includes: string[];
  builtWith: string;
  image?: ServiceImage;
};

export type AuditRow = { priority: "High" | "Medium" | "Low"; finding: string; fix: string };

export type FlowStep = { label: string; detail: string };

export type ProjectLink = {
  name: string;
  status: string;
  summary: string;
  href: string;
  linkLabel: string;
};

export type OperationalExample = { heading: string; image: ServiceImage; project: ProjectLink };

export type ServiceSample =
  | {
      kind: "workflow";
      title: string;
      steps: WorkflowStep[];
      /** Shown inside the workflow, directly after the step named here. */
      figure: ServiceImage;
      figureAfterStage: string;
      note: string;
    }
  | { kind: "operational-pair"; examples: [OperationalExample, OperationalExample] }
  | { kind: "routes"; routes: WebsiteRoute[]; common: string }
  | {
      kind: "audit";
      title: string;
      figure: ServiceImage;
      rowsTitle: string;
      rows: AuditRow[];
      note: string;
    }
  | {
      kind: "build-and-support";
      build: string[];
      support: string[];
      supportNote: string;
      flowTitle: string;
      flowFigure: ServiceImage;
      flow: FlowStep[];
      flowNote: string;
    };

export type ServiceFamily = {
  id: ServiceGroupId;
  number: string;
  /** The section heading and opening-index label (the menu label, except for 02). */
  title: string;
  /** The buyer's question the section answers. */
  question: string;
  intro: string;
  /** Representative deliverables; the Websites family uses `sample.routes` instead. */
  deliverables?: Deliverable[];
  sample: ServiceSample;
  /** Run the example across both columns on desktop (detailed paired images). */
  wideSample?: boolean;
  /** Full catalogue for this family, behind the "Full service scope" disclosure. */
  scope: string[];
  scopeNote?: string;
  scopeLinks?: { label: string; href: string; host: string }[];
  cta: { label: string; href: string };
};

export const serviceFamilies: ServiceFamily[] = [
  {
    id: "software-and-business-systems",
    number: "01",
    title: serviceNavLabels["software-and-business-systems"],
    question: "Can you bring our spreadsheets, requests and approvals into one place?",
    intro:
      "We build custom web applications and internal systems that replace scattered spreadsheets, email threads and paper forms with one place where work is requested, owned and tracked.",
    deliverables: [
      {
        title: "Requests and records",
        detail: "Structured forms, and one record for each request, job or order with its full history attached.",
      },
      {
        title: "Owners and approvals",
        detail: "Every item has a named owner, moves through agreed stages and is approved by the right role.",
      },
      {
        title: "Access by role",
        detail: "Sign-in with role-based permissions, so each person sees and changes only what they should.",
      },
      {
        title: "Progress reporting",
        detail: "Dashboards and exports that show what is open, overdue or complete, and where work is waiting.",
      },
    ],
    sample: {
      kind: "workflow",
      title: "A purchase request, from form to report",
      steps: [
        {
          stage: "Submit",
          actor: "person",
          action: "A technician requests two pump seal kits and attaches the supplier’s quote.",
        },
        {
          stage: "Route",
          actor: "automated",
          action: "The system checks required fields and assigns the request to the maintenance lead.",
        },
        {
          stage: "Decide",
          actor: "person",
          action: "The maintenance lead reviews the request and quote, then approves it, rejects it or asks for detail.",
        },
        {
          stage: "Record",
          actor: "automated",
          action: "The decision, approver and time are logged, and the requester is notified.",
        },
        { stage: "Report", actor: "automated", action: "Managers see open, approved and overdue requests on one dashboard." },
      ],
      figureAfterStage: "Decide",
      figure: {
        src: "/images/services/purchase-request-approval-workspace.webp",
        width: 1536,
        height: 944,
        alt: "Purchase request PR-0248 awaiting the maintenance lead’s approval: two pump replacement seal kits totalling KES 18,400, with the attached Field Supply Ltd quote open below and an Approve request button.",
        label: "Interface concept",
        caption: "The maintenance lead can review the request and supplier quote before approving the purchase.",
      },
      note: "Where AI-assisted automation helps, such as reading an attached invoice to pre-fill the form, it prepares the record. A person still checks and approves it.",
    },
    scope: [
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
    scopeNote:
      "Product and interface design is planned alongside the system architecture, so user flows, permissions, data and application behaviour are designed as one product.",
    cta: { label: "Discuss a business system", href: "/contact" },
  },
  {
    id: "operational-and-technical-software",
    number: "02",
    // Page-only heading; the header menu keeps its label and this anchor.
    title: "Operational software & engineering systems",
    question: "Can you build software around how our field teams and engineers actually work?",
    intro:
      "We build software for the people inspecting sites, maintaining equipment and solving engineering problems. A field finding can become a verified corrective action. An equipment inspection can lead to a maintenance work order. A technical calculation can show the inputs and assumptions behind its result.",
    deliverables: [
      {
        title: "Inspection findings",
        detail: "Findings recorded on a phone or tablet at the location, with photo evidence attached.",
      },
      {
        title: "Corrective-action tracking",
        detail: "Each action has an owner, a due date and evidence, and cannot close until it is verified.",
      },
      {
        title: "Equipment records and work orders",
        detail: "An inspection finding on an asset can raise a maintenance work order for the responsible team.",
      },
      {
        title: "Technical calculations",
        detail: "Engineering logic turned into software that shows its inputs, assumptions and results.",
      },
    ],
    wideSample: true,
    sample: {
      kind: "operational-pair",
      examples: [
        {
          heading: "Safety operations",
          image: {
            src: "/images/services/safetyos-pallet-walkway-corrective-action.webp",
            width: 1536,
            height: 1024,
            alt: "SafetyOS corrective action for pallets in a marked walkway at Loading bay 02, awaiting verification: a Finding photo with pallets blocking the walkway beside an After action photo with it clear, and a Verify closure button.",
            label: "Interface concept",
            caption: "The safety officer compares the loading-bay photos before verifying that the walkway has been cleared.",
          },
          project: {
            name: "SafetyOS",
            status: "In development",
            summary:
              "A finding becomes a corrective action with an owner and due date, then moves through evidence and verification to closure. Built by the Kipeo Digital team, with the workflow shaped around occupational safety and EHS practice.",
            href: "/work/hse-management-system",
            linkLabel: "Read how SafetyOS tracks a corrective action",
          },
        },
        {
          heading: "Engineering systems",
          image: {
            src: "/images/services/p-204-transfer-pump-maintenance-record.webp",
            width: 1536,
            height: 1024,
            alt: "Equipment register record for the P-204 transfer pump: a drawing with the bearing housing called out, an inspection finding of early bearing wear, the next task to inspect the bearing assembly, assigned to mechanical maintenance, with a link to work order WO-218.",
            label: "Illustrative engineering interface",
            caption:
              "An inspection finding on the pump’s bearing housing links to work order WO-218 and the team responsible for the next inspection.",
          },
          project: {
            name: "CNC learning system",
            status: "Research prototype",
            summary:
              "Turns a simple milling task into a toolpath, with the spindle speed, feed rate and G-code explained step by step. Research and engineering by the Kipeo Digital team.",
            href: "/work/cnc-learning-system",
            linkLabel: "Read the CNC learning system case study",
          },
        },
      ],
    },
    scope: [
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
    scopeNote:
      "These are software-development services for specialist workflows. Kipeo does not offer HSE consultancy, engineering consultancy, engineering education, academic research or regulatory certification.",
    scopeLinks: [
      {
        label: "Workplace-safety and HSE workflow expertise",
        href: "https://cynthiamueni.com/",
        host: "cynthiamueni.com",
      },
      {
        label: "Applied engineering and technical-systems expertise",
        href: "https://harunlucas.com/projects",
        host: "harunlucas.com",
      },
    ],
    cta: { label: "Discuss an operational system", href: "/contact" },
  },
  {
    id: "websites-and-commerce",
    number: "03",
    title: serviceNavLabels["websites-and-commerce"],
    question: "Do we need an enquiry website, a content platform or an online store?",
    intro:
      "We design and build websites and online stores around the next thing a visitor needs to do: get in touch, read and come back, or buy.",
    sample: {
      kind: "routes",
      routes: [
        {
          name: "Enquiry website",
          suits: "A service business whose next step is a call, a quote or a booking.",
          includes: ["Service-page structure", "Enquiry and quote forms", "A clear next step on every page"],
          builtWith: "Custom-built or WordPress",
        },
        {
          name: "Content platform",
          suits: "An organisation that publishes regularly and needs its own team to edit and add pages.",
          includes: ["Information architecture", "Editable page and article templates", "Content-led redesigns"],
          builtWith: "WordPress or custom-built",
        },
        {
          name: "Online store",
          suits: "A business selling products directly, with stock and orders to manage day to day.",
          includes: ["Product catalogue", "Checkout and payment integration", "Store administration for your team"],
          builtWith: "WooCommerce, Shopify or custom-built",
          image: {
            src: "/images/services/forma-storefront-desktop-and-mobile.webp",
            width: 1536,
            height: 1024,
            alt: "Forma product page for a brushed-brass arc table lamp at KES 12,800, shown on a desktop browser and a phone, each with a material selector, a quantity control and an Add to bag button.",
            label: "Storefront concept",
            caption: "One product page on desktop and phone: choose the material and quantity, then add the lamp to the bag.",
          },
        },
      ],
      common: "Every route includes responsive design, accessibility foundations and analytics.",
    },
    scope: [
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
    scopeNote:
      "Search visibility and growth work is scoped separately under SEO & digital growth, so it can be added when useful rather than bundled into every build.",
    cta: { label: "Discuss a website project", href: "/contact" },
  },
  {
    id: "seo-and-digital-growth",
    number: "04",
    title: serviceNavLabels["seo-and-digital-growth"],
    question: "Can customers find the right pages, and can we see which visits lead to enquiries?",
    intro:
      "We make an existing website easier to find and easier to measure, starting with what is holding it back and fixing the highest-impact problems first.",
    deliverables: [
      {
        title: "Technical audit with prioritised fixes",
        detail: "Indexing, speed, metadata and structured-data issues, ranked by impact and effort.",
      },
      {
        title: "Search-intent mapping",
        detail: "Each important search matched to the one page that should answer it.",
      },
      {
        title: "Clearer page structure",
        detail: "Headings, titles, descriptions and internal links improved on the pages that matter most.",
      },
      {
        title: "Conversion measurement",
        detail: "Analytics events for enquiries, calls and purchases, so you can see which visits lead somewhere.",
      },
    ],
    sample: {
      kind: "audit",
      title: "Extract from an audit",
      figure: {
        src: "/images/services/search-measurement-audit-missing-enquiry-event.webp",
        width: 1536,
        height: 914,
        alt: "Sample audit finding, high priority: enquiries are missing from analytics. On /contact, submitting one valid enquiry produced no conversion event. Acceptance test: one successful submission records one enquiry event, and validation errors record none.",
        label: "Illustrative audit page",
        caption: "The lead finding, written as a test anyone can repeat once the fix is in place.",
      },
      rowsTitle: "Further findings",
      rows: [
        {
          priority: "High",
          finding: "Two service pages answer the same search and compete with each other.",
          fix: "Keep the stronger page, redirect the other and update internal links.",
        },
        {
          priority: "Medium",
          finding: "Every product page shares one generic title and description.",
          fix: "Generate unique titles and descriptions from each product’s own data.",
        },
      ],
      note: "Illustrative example of the format, not a client result.",
    },
    scope: [
      "Technical SEO audits",
      "Search-intent and keyword planning",
      "On-page SEO, titles and metadata",
      "Structured data, sitemap and robots.txt configuration",
      "Google Search Console and indexing support",
      "Content optimisation",
      "Local SEO where appropriate",
      "Analytics, measurement and Core Web Vitals",
      "Conversion-path improvements",
      "Digital strategy and content-channel planning",
      "Campaign landing pages",
      "Email-marketing technical setup",
      "Paid-campaign landing-page and tracking support",
      "Social-platform setup where required",
    ],
    scopeNote:
      "Kipeo does not promise rankings, traffic, leads, sales or advertising performance. Recommendations are based on your website, audience, competition, available content and the agreed scope.",
    cta: { label: "Discuss SEO and measurement", href: "/contact" },
  },
  {
    id: "integration-deployment-and-support",
    number: "05",
    title: serviceNavLabels["integration-deployment-and-support"],
    question: "Can you connect our tools and help us run the system after launch?",
    intro:
      "We connect the services a system depends on and deploy it to production. If you want us to, we can then keep it running under a separate support agreement.",
    sample: {
      kind: "build-and-support",
      build: [
        "API and payment integrations",
        "Email and communication delivery",
        "Production deployment, domain, DNS and SSL",
        "Documentation and handover",
      ],
      support: [
        "Uptime and performance monitoring",
        "Backups and platform updates",
        "Security updates and maintenance",
        "Technical support",
      ],
      supportNote:
        "Support is agreed as a defined arrangement, not open-ended. Hosting, licences and other third-party charges are usually kept separate from it.",
      flowTitle: "This site’s enquiry form, from trigger to result",
      flowFigure: {
        src: "/images/services/enquiry-delivery-trace.webp",
        width: 1536,
        height: 1024,
        alt: "Enquiry delivery trace for an example run: form submitted, fields validated, team email accepted and confirmation shown, with a delivery receipt recording that Brevo accepted the team notification.",
        label: "Illustrative trace",
        caption:
          "An example enquiry passes validation, the email provider accepts the team notification, and the visitor sees a confirmation.",
      },
      flow: [
        { label: "Trigger", detail: "A visitor submits the project enquiry form." },
        {
          label: "Check",
          detail: "The server confirms the request came from this site, limits repeat submissions, filters spam and validates every field.",
        },
        {
          label: "Hand over",
          detail:
            "The team notification is sent through Brevo’s transactional email API, and Brevo accepts it for delivery.",
        },
        {
          label: "Result",
          detail: "Only once Brevo has accepted it does the visitor see a confirmation. A copy is also emailed to them.",
        },
      ],
      flowNote:
        "Provider acceptance is the last event the site records. Arrival in the team’s inbox is a separate step it can’t see. If Brevo doesn’t accept the notification, the form says so and offers the email address instead.",
    },
    scope: [
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
    cta: { label: "Discuss integration or support", href: "/contact" },
  },
];

export type ScopeTerm = { title: string; detail: string };

/** Confirmed business terms, condensed from the previous pricing, FAQ and investment copy. */
export const scopeTerms: ScopeTerm[] = [
  {
    title: "A free first conversation",
    detail:
      "The initial consultation is free. Where the project is a good fit, a written proposal follows at no cost and with no obligation to proceed.",
  },
  {
    title: "What the proposal covers",
    detail:
      "Deliverables, milestones, timeline and investment, with delivery tracked against those milestones. Each project is priced on its own scope.",
  },
  {
    title: "Third-party costs",
    detail:
      "Hosting, licences, advertising spend and other third-party fees are usually separate from the development investment.",
  },
  {
    title: "Changes and ownership",
    detail:
      "Work outside the agreed scope is quoted and approved before it is built. After final payment you own the custom deliverables made for your project; third-party and open-source components stay under their own licences.",
  },
];
