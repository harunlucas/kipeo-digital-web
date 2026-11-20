/**
 * `/work` and `/work/[slug]` share this one list. Every entry is a real
 * project; see `docs/asset-sources.md` for image provenance and
 * `docs/work-page-sources.md` for where each claim on the Work page comes
 * from. Nothing here is a fabricated client, metric, testimonial or logo.
 *
 * Entries with `listing` appear on the /work index, in array order (the first
 * is the feature). Entries without it keep their published `/work/[slug]`
 * page and sitemap entry but are not promoted on the index, because their
 * contributor credit is not documented well enough to state on the page.
 */

export type WorkStatus = "live" | "in-development" | "maintained" | "completed";

/** A genuine product screenshot. `width`/`height` are the file's own pixels. */
export type ScreenshotMedia = {
  kind: "screenshot";
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** A workflow typeset from the project's own source code and requirements. */
export type WorkflowMedia = {
  kind: "workflow";
  title: string;
  source: string;
  steps: { stage: string; owner: string; action: string }[];
  rule: string;
};

/** A genuine input → calculation → output example produced by the project's own code. */
export type ComputationMedia = {
  kind: "computation";
  title: string;
  source: string;
  inputs: { label: string; value: string }[];
  calculations: { label: string; formula: string; result: string }[];
  outputLabel: string;
  output: string[];
  note: string;
};

export type ProjectMedia = ScreenshotMedia | WorkflowMedia | ComputationMedia;

/** One image in a Work-index image pair. Files are lossless WebP, served as-is. */
export type PairImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/**
 * Two related interface concepts shown as one composition on the Work index:
 * a large main image and a smaller companion pinned over its lower edge.
 * Placement values are read by `.work-pair` (globals.css) as custom
 * properties; the desktop values apply from `lg`, the mobile ones below it.
 */
export type ImagePair = {
  main: PairImage;
  pinned: PairImage;
  /** The story the two images tell together; follows "Interface concepts". */
  caption: string;
  pin: {
    side: "left" | "right";
    /** Horizontal inset of the companion from that side, % of the main width. */
    inset: number;
    /** Companion width, % of the main width. */
    width: number;
    /** Share of the companion's height that overlaps the main image (0–1). */
    overlap: number;
    /** Angle the companion settles at after its rock, in degrees. */
    rest: number;
    mobile: { inset: number; width: number; overlap: number };
  };
};

export type CaseStudyLink = { label: string; href: string; host: string };

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  outcomeHeadline: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  tags: string[];
  status: WorkStatus;
  /** Overrides the generic status label where the source states something more precise. */
  statusLabel?: string;
  disclosure: string;
  externalHref?: string;
  externalLabel?: string;

  /** Present only for projects shown on the /work index. */
  listing?: {
    /** Plain-language: who uses it and for what. */
    purpose: string;
    /** Who contributed what, as documented. */
    contribution: string;
    /** Genuine evidence, shown on the case-study page. */
    media: ProjectMedia;
    caption: string;
    /** Interface-concept image pair, shown on the Work index. */
    pair: ImagePair;
    /** Desktop side for the image pair on the Work index (default "left"). */
    mediaSide?: "left" | "right";
    /** Descriptive label for the link to the local case study. */
    linkLabel: string;
  };

  /** The longer account on `/work/[slug]`, for indexed projects. */
  story?: {
    /** Short "Used by" fact for the case-study summary panel. */
    audience: string;
    /** Label for the documented-evidence figure on the case-study page. */
    evidenceLabel: string;
    users: string;
    contribution: string[];
    workflowHeading: string;
    workflow: string;
    state: string;
    stateDetail?: string;
    source: CaseStudyLink;
    builtWith: string[];
  };
};

export const statusLabels: Record<WorkStatus, string> = {
  live: "Live",
  "in-development": "In development",
  maintained: "Maintained",
  completed: "Completed",
};

export function statusLabelFor(study: CaseStudy): string {
  return study.statusLabel ?? statusLabels[study.status];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "bushlite-wifi",
    title: "BushLite WiFi",
    category: "Hotspot management system",
    outcomeHeadline:
      "Voucher sign-in, internet packages and live session monitoring for shared Wi-Fi, managed from one system.",
    summary:
      "A hotspot management system for shared Wi-Fi: voucher authentication, internet packages, active-session monitoring and shared bandwidth allocation across multiple access points.",
    image: "/images/projects/bushlite-wifi-portal-voucher.webp",
    imageAlt:
      "BushLite captive portal with the Voucher Login tab open, a voucher code field, a Connect Now button and four access points showing 8, 5, 3 and 6 users.",
    tags: ["Node.js", "Express.js", "JavaScript"],
    status: "completed",
    statusLabel: "Version 1.0",
    disclosure: "Systems work by the Kipeo Digital team. Not a Kipeo Digital client project.",
    externalHref: "https://harunlucas.com/projects/bushlite-wifi",
    externalLabel: "Read the full BushLite write-up on HarunLucas.com",
    listing: {
      purpose:
        "BushLite gives hotspot operators one place to manage vouchers and internet packages, and to monitor active sessions across their access points.",
      contribution:
        "Built by the Kipeo Digital team: the Node.js and Express backend, the voucher and package logic, and the guest portal and monitoring dashboard.",
      pair: {
        main: {
          src: "/images/projects/bushlite-wifi/bushlite-voucher-management.webp",
          width: 1536,
          height: 1024,
          alt: "Laptop showing BushLite’s voucher management screen for a hotspot operator: a list of voucher codes with Active, Redeemed and Expired statuses, and an Issue voucher panel set to a Day pass.",
        },
        pinned: {
          src: "/images/projects/bushlite-wifi/bushlite-customer-portal.webp",
          width: 1536,
          height: 1024,
          alt: "A customer’s phone on the BushLite Connect to WiFi screen, with a voucher code entered above the Connect button.",
        },
        caption: "An operator issues a voucher; a customer enters it on their phone to get online.",
        pin: {
          side: "left",
          inset: -3,
          width: 38,
          overlap: 0.5,
          rest: -1.4,
          mobile: { inset: -2, width: 50, overlap: 0.3 },
        },
      },
      media: {
        kind: "screenshot",
        src: "/images/projects/bushlite-wifi-portal-voucher.webp",
        width: 552,
        height: 590,
        alt: "BushLite captive portal with the Voucher Login tab open, a voucher code field, a Connect Now button and four access points showing 8, 5, 3 and 6 users.",
      },
      caption:
        "What a guest sees: enter a voucher code to connect, or open the packages to buy time. The panel below shows how many people are on each access point.",
      linkLabel: "Read the BushLite WiFi case study",
    },
    story: {
      audience: "Hotspot operators and the guests who connect",
      evidenceLabel: "Screenshot from the published case study",
      users:
        "Shared wireless access points in community and small-business settings often have no structured way to sign people in, sell time-limited access or see how bandwidth is being used. BushLite is for the operator running those access points, and for the guests who connect to them.",
      contribution: [
        "A Node.js and Express backend that handles authentication, package logic and session data.",
        "A voucher and package system: guests redeem a code or choose a package to get online.",
        "A responsive web dashboard for monitoring active sessions and usage across access points.",
      ],
      workflowHeading: "A guest gets online with a voucher",
      workflow:
        "On the captive portal, a guest types the voucher code they were given and presses Connect Now, or switches to Buy Package to choose time instead. Before connecting, they can see how many people are already on each access point.",
      state:
        "The published case study describes BushLite as a completed, working Version 1.0, tested with voucher redemption, concurrent sessions and bandwidth sharing across multiple access points.",
      stateDetail:
        "The portal screenshot shown here comes from a build labelled on screen as a simulation, with MikroTik router integration marked “coming soon”. Planned work includes expanded usage analytics, more package configurations and continued hardening of the MikroTik integration layer.",
      source: {
        label: "Read the full BushLite write-up on HarunLucas.com",
        href: "https://harunlucas.com/projects/bushlite-wifi",
        host: "harunlucas.com",
      },
      builtWith: ["Node.js", "Express.js", "JavaScript", "Responsive web design"],
    },
  },
  {
    slug: "hse-management-system",
    title: "SafetyOS",
    category: "Safety management system",
    outcomeHeadline:
      "Hazard reports, inspection findings and corrective actions tracked from first report to verified closure.",
    summary:
      "SafetyOS is an occupational safety and health management system in development: hazard reporting, inspections, and corrective actions tracked through evidence and verification to closure.",
    image: "/images/projects/hse-management-system/hse-login.webp",
    imageAlt: "SafetyOS sign-in screen",
    tags: ["React", "TypeScript", "Node.js", "In development"],
    status: "in-development",
    disclosure: "Product development by the Kipeo Digital team. Not a Kipeo Digital client project.",
    externalHref: "https://cynthiamueni.com/projects/safety-management-system",
    externalLabel: "Read more about SafetyOS on CynthiaMueni.com",
    listing: {
      purpose:
        "SafetyOS lets a safety officer turn an inspection finding into a corrective action with a named owner and a due date, then follow it through evidence and verification to closure.",
      contribution:
        "Built by the Kipeo Digital team, with the workflow shaped around occupational safety and EHS practice.",
      mediaSide: "right",
      pair: {
        main: {
          src: "/images/projects/hse-management-system/safetyos-corrective-action-review.webp",
          width: 1536,
          height: 1024,
          alt: "Desktop showing SafetyOS’s corrective action review for “Pallets in marked walkway” at Loading bay 02, owned by the warehouse supervisor and awaiting verification, with Finding and After action photos side by side above a Verify closure button.",
        },
        pinned: {
          src: "/images/projects/hse-management-system/safetyos-field-inspection.webp",
          width: 1536,
          height: 1024,
          alt: "An inspector at a loading bay holding a rugged tablet with a SafetyOS inspection finding: location Loading bay 02, finding Pallets in marked walkway, one evidence photo and a Submit finding button.",
        },
        caption: "A finding recorded on a tablet at the loading bay is followed through to review and verified closure.",
        pin: {
          side: "left",
          inset: 7,
          width: 38,
          overlap: 0.2,
          rest: -1.2,
          mobile: { inset: 4, width: 50, overlap: 0.14 },
        },
      },
      media: {
        kind: "workflow",
        title: "Corrective-action workflow",
        source: "Stages and owners from the SafetyOS source and requirements",
        steps: [
          { stage: "Identified", owner: "Safety officer", action: "Records a finding from an inspection or hazard report." },
          { stage: "Assigned", owner: "Safety officer", action: "Assigns a corrective action to a responsible person, with a due date and priority." },
          { stage: "In progress", owner: "Responsible person", action: "Works on the fix and responds in the record." },
          { stage: "Evidence", owner: "Responsible person", action: "Uploads a photo, document or note showing the work is done." },
          { stage: "Verification", owner: "Safety officer", action: "Checks the evidence, then verifies it or sends it back." },
          { stage: "Closure", owner: "System", action: "The finding closes once every corrective action on it is verified." },
        ],
        rule: "A corrective action cannot close without verification, and a finding cannot close while any of its actions is still open.",
      },
      caption:
        "One finding, six stages. Each stage has an owner, and the system enforces the order: nothing closes on a promise alone.",
      linkLabel: "Read how SafetyOS tracks a corrective action",
    },
    story: {
      audience: "Safety officers, supervisors and workers",
      evidenceLabel: "From the SafetyOS source",
      users:
        "SafetyOS is for organisations that need to show a workplace hazard was actually dealt with. Safety officers review reports and run inspections; supervisors, maintenance leads and other responsible people own the fixes; workers report what they see. Without one system, findings and follow-ups scatter across paper forms, spreadsheets and messages, and it is hard to prove anything was closed properly.",
      contribution: [
        "The Kipeo Digital team designed and built SafetyOS around occupational safety and EHS-systems practice.",
        "Role-based access for administrators, EHS officers, supervisors and workers.",
        "Hazard reporting with photo evidence, inspection findings, and corrective actions with owners, due dates, evidence and verification.",
        "An activity history on each record, in-app notifications and a dashboard that flags overdue actions.",
      ],
      workflowHeading: "An inspection finding becomes a verified fix",
      workflow:
        "A safety officer records a finding, then raises one or more corrective actions against it, each assigned to a responsible person with a due date and priority. That person responds and uploads evidence. The safety officer verifies the evidence or sends it back. Only when every action is verified does the finding close.",
      state:
        "In development. The core workflow (hazard reports, findings, corrective actions and evidence) is built, and the project has been prepared for deployment.",
      stateDetail:
        "Product screens beyond sign-in have not been captured for this site yet, so the workflow is shown from the project’s own source rather than as screenshots.",
      source: {
        label: "Read more about SafetyOS on CynthiaMueni.com",
        href: "https://cynthiamueni.com/projects/safety-management-system",
        host: "cynthiamueni.com",
      },
      builtWith: ["React", "TypeScript", "Express", "PostgreSQL"],
    },
  },
  {
    slug: "cnc-learning-system",
    title: "CNC learning system",
    category: "Engineering education software",
    outcomeHeadline:
      "A transparent CNC planning tool that shows students every calculation between a part drawing and its G-code.",
    summary:
      "A Python-based CNC learning system for mechanical engineering students: it plans a simple milling job, calculates spindle speed and feed rate, and generates explained, educational G-code.",
    tags: ["Python", "FastAPI", "Next.js", "Research prototype"],
    status: "in-development",
    statusLabel: "Research prototype",
    disclosure: "Research and engineering by the Kipeo Digital team.",
    externalHref: "https://harunlucas.com/projects/python-cnc-automation",
    externalLabel: "Read more about the CNC project on HarunLucas.com",
    listing: {
      purpose:
        "Engineering students enter a simple milling task and see how each tool choice, spindle speed, feed rate and line of G-code is worked out, with the formula behind every number.",
      contribution:
        "Research and engineering by the Kipeo Digital team: the Python planning engine, its API and the student and instructor interface.",
      pair: {
        main: {
          src: "/images/projects/cnc-learning-system/cnc-pocket-toolpath-simulation.webp",
          width: 1536,
          height: 1024,
          alt: "Monitor showing the CNC Learning System’s toolpath simulation: an end mill cutting a rounded rectangular pocket in an aluminium block, with the teal machining path spiralling inside the pocket and Pocket milling selected.",
        },
        pinned: {
          src: "/images/projects/cnc-learning-system/cnc-part-definition.webp",
          width: 1536,
          height: 1024,
          alt: "A learner holding a machined aluminium sample with a rectangular pocket beside a monitor showing the CNC Learning System’s Define the part screen, set to Aluminium and Rectangular pocket.",
        },
        caption: "A learner matches a real machined pocket to its drawing, then explores the toolpath that cuts it.",
        pin: {
          side: "right",
          inset: -3,
          width: 38,
          overlap: 0.42,
          rest: 1.4,
          mobile: { inset: -2, width: 50, overlap: 0.28 },
        },
      },
      media: {
        kind: "computation",
        title: "Drilling one hole",
        source: "Output of the system’s own engine, run on its documented demo task",
        inputs: [
          { label: "Hole", value: "Ø8 mm, 10 mm deep, at X75 Y45" },
          { label: "Tool", value: "T2 · 8 mm HSS twist drill" },
          { label: "Cutting speed", value: "25 m/min" },
          { label: "Feed per rev", value: "0.15 mm" },
        ],
        calculations: [
          { label: "Spindle speed", formula: "(25 × 1000) ÷ (π × 8)", result: "994.7 rpm → S995" },
          { label: "Feed rate", formula: "994.7 × 0.15", result: "149.2 mm/min → F149.2" },
        ],
        outputLabel: "Generated G-code",
        output: [
          "T2 M06",
          "S995 M03",
          "G00 Z25.000",
          "G00 X75.000 Y45.000",
          "G81 X75.000 Y45.000 Z-10.000 R3.000 F149.2",
          "G80",
          "G00 Z25.000",
          "M05",
        ],
        note: "Teaching values and educational G-code, not machine-ready output.",
      },
      caption:
        "Every S and F word in the program traces back to a formula the student can read, which is the point of the tool.",
      linkLabel: "Read the CNC learning system case study",
    },
    story: {
      audience: "Engineering students and instructors",
      evidenceLabel: "Output from the system’s engine",
      users:
        "CNC machining is usually taught in separate pieces: a lecture on cutting speeds, a CAM lab, a G-code handout. Commercial CAM software automates the whole chain but hides the reasoning. This system is for undergraduate mechanical engineering students, their instructors and self-learners who need to see how a G-code program is derived, step by step.",
      contribution: [
        "The Kipeo Digital team researched and built the system: the Python CNC engine, a FastAPI service and a Next.js interface.",
        "The engine validates the task, selects tools, calculates spindle speed and feed rate, sequences operations, generates toolpaths and FANUC-style G-code, and checks the program.",
        "Every result carries a plain-language explanation, and the engineering calculations are covered by automated tests.",
        "Student and instructor accounts, with an instructor workspace for reviewing students’ work, plus consent-based research participation for evaluating the tool.",
      ],
      workflowHeading: "From a drilled hole to G-code",
      workflow:
        "The documented demo task is a 100 × 60 × 20 mm aluminium block with one pocket and one 8 mm hole. For the hole, the engine selects an 8 mm twist drill, works out the spindle speed and feed rate from the teaching data, and writes a G81 drilling cycle. Each line of the program is explained to the student, including why the drill returns to a safe height before moving.",
      state:
        "Research prototype in active development. Version 1 covers three-axis milling of one pocket and one drilled hole, end to end, from task entry to verified, explained G-code.",
      stateDetail:
        "The cutting data is labelled illustrative teaching data, and the G-code is educational: it is not meant to be run on a physical machine without qualified review.",
      source: {
        label: "Read more about the CNC project on HarunLucas.com",
        href: "https://harunlucas.com/projects/python-cnc-automation",
        host: "harunlucas.com",
      },
      builtWith: ["Python", "FastAPI", "Next.js", "TypeScript", "SQLAlchemy"],
    },
  },
  {
    slug: "cynthiamueni",
    title: "CynthiaMueni.com",
    category: "Professional portfolio website",
    outcomeHeadline: "A clear, credential-led site for an HSE and EHS-systems professional.",
    summary:
      "A professional website for an occupational safety and EHS-systems specialist, built to present expertise and credentials clearly to an international audience.",
    image: "/images/projects/related-websites/cynthiamueni-home.webp",
    imageAlt: "CynthiaMueni.com homepage, an occupational safety and EHS-systems professional site",
    tags: ["Professional portfolio", "HSE & safety"],
    status: "live",
    disclosure: "Related website work associated with the Kipeo Digital team.",
    externalHref: "https://cynthiamueni.com",
    externalLabel: "Visit CynthiaMueni.com",
  },
  {
    slug: "harunlucas",
    title: "HarunLucas.com",
    category: "Engineering and systems-development portfolio",
    outcomeHeadline: "An engineering portfolio built to make technical project work easy to review.",
    summary:
      "A portfolio website for an engineering and systems-development practice, structured around clear project write-ups rather than a generic template.",
    image: "/images/projects/related-websites/harunlucas-home.webp",
    imageAlt: "HarunLucas.com homepage, an engineering and systems-development portfolio site",
    tags: ["Portfolio website", "Engineering"],
    status: "live",
    disclosure: "Related website work associated with the Kipeo Digital team.",
    externalHref: "https://harunlucas.com",
    externalLabel: "Visit HarunLucas.com",
  },
];

export const indexedCaseStudies = caseStudies.filter(
  (study): study is CaseStudy & { listing: NonNullable<CaseStudy["listing"]> } => Boolean(study.listing),
);
