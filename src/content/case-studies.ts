import type { WorkStatus } from "@/content/selected-work";

/**
 * Homepage "Selected work" and `/work/[slug]` share this one list — every
 * entry is a real, verified project (see `docs/asset-sources.md` for image
 * provenance). No fabricated client, metric or logo is added here; where a
 * project has no public case-study owner, `externalHref` is simply omitted.
 */
export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  outcomeHeadline: string;
  summary: string;
  image: string;
  imageAlt: string;
  tags: string[];
  status: WorkStatus;
  disclosure: string;
  externalHref?: string;
  externalLabel?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "bushlite-wifi",
    title: "BushLite WiFi",
    category: "Hotspot management system",
    outcomeHeadline: "Voucher logins, live usage and shared bandwidth, managed from one dashboard.",
    summary:
      "A hotspot management system supporting voucher authentication, internet packages, active-session monitoring and shared bandwidth allocation across multiple access points.",
    image: "/images/projects/bushlite-wifi-dashboard.webp",
    imageAlt:
      "BushLite WiFi hotspot management dashboard showing voucher login, package purchase and real-time usage analytics",
    tags: ["Node.js", "Express.js", "MikroTik integration"],
    status: "live",
    disclosure: "Related systems work contributed by the team behind Kipeo Digital.",
    externalHref: "https://harunlucas.com/projects/bushlite-wifi",
    externalLabel: "View case study on HarunLucas.com",
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
  {
    slug: "hse-management-system",
    title: "HSE Management System",
    category: "HSE and compliance system",
    outcomeHeadline: "One system for inspections, hazard reports and corrective actions — in development.",
    summary:
      "A developing digital system for managing workplace inspections, hazard reports, corrective actions, documentation and safety records.",
    image: "/images/projects/hse-management-system/hse-login.webp",
    imageAlt:
      "HSE Management System sign-in screen for SafetyOS, showing role-based demo accounts for Admin, EHS Officer, Supervisor and Worker",
    tags: ["Inspection workflows", "Corrective actions", "In development"],
    status: "in-development",
    disclosure:
      "Digital product development associated with Kipeo Digital, informed by related HSE practice documented at CynthiaMueni.com.",
  },
];
