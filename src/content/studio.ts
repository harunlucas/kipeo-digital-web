import type { LucideIcon } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { servicePillars } from "@/content/service-pillars";

export type CapabilitySelectorPillar = {
  id: string;
  title: string;
  problem: string;
  subservices: string[];
  icon: LucideIcon;
};

export type StudioWorkspaceHotspot = {
  id: string;
  number: string;
  label: string;
  description: string;
  /** Position of the pin as a percentage of the image's width/height. */
  position: { x: number; y: number };
};

export const studioWorkspaceHotspots: StudioWorkspaceHotspot[] = [
  {
    id: "strategy",
    number: "01",
    label: "Strategy and definition",
    description: "Where the problem gets defined clearly — requirements, priorities and a scoped plan — before anything is built.",
    position: { x: 15, y: 63 },
  },
  {
    id: "interface",
    number: "02",
    label: "Interface and experience",
    description: "The screens and flows people actually use: responsive, accessible interfaces across devices.",
    position: { x: 27, y: 23 },
  },
  {
    id: "applications",
    number: "03",
    label: "Applications and data",
    description: "Application logic, databases and the business rules running behind the interface.",
    position: { x: 49, y: 43 },
  },
  {
    id: "operations",
    number: "04",
    label: "Operational systems",
    description: "HSE, inspection, reporting and other day-to-day operational workflows.",
    position: { x: 46, y: 80 },
  },
  {
    id: "integrations",
    number: "05",
    label: "Integrations and automation",
    description: "Connected services, APIs and automated workflows that keep separate systems in sync.",
    position: { x: 75, y: 24 },
  },
  {
    id: "deployment",
    number: "06",
    label: "Deployment and support",
    description: "Production hosting, monitoring, updates and ongoing support once a system is live.",
    position: { x: 84, y: 63 },
  },
];

export type StudioJourneyStage = {
  id: string;
  label: string;
  description: string;
};

export const studioJourneyStages: StudioJourneyStage[] = [
  { id: "discover", label: "Discover", description: "Understand the problem and what success should change." },
  { id: "define", label: "Define", description: "Turn discovery into a clear, written scope." },
  { id: "design", label: "Design", description: "Shape structure, workflows and interface before code." },
  { id: "build", label: "Build", description: "Develop the interface, application logic and data layer." },
  { id: "connect", label: "Connect", description: "Wire up integrations, APIs and third-party services." },
  { id: "test", label: "Test", description: "Verify functionality, accessibility and edge cases." },
  { id: "launch", label: "Launch", description: "Deploy to production with domains, SSL and monitoring." },
  { id: "support", label: "Support", description: "Ongoing maintenance, updates and technical support." },
];

export type StudioLayer = {
  id: "frontend" | "backend" | "data" | "integrations" | "infrastructure";
  title: string;
  description: string;
  confirmedTechnologies?: string[];
};

export const studioLayers: StudioLayer[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Responsive, accessible interfaces that work across devices and stay practical to maintain.",
    confirmedTechnologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Server-side application logic, authentication, permissions and validation.",
    confirmedTechnologies: ["Node.js", "Express.js"],
  },
  {
    id: "data",
    title: "Data",
    description: "Databases and data modelling — the structures that let a system reliably store and retrieve information.",
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "APIs and third-party services that connect otherwise separate tools into one workflow.",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    description: "Hosting, domains, SSL and the operational groundwork that keeps a system running after launch.",
    confirmedTechnologies: ["Vercel"],
  },
];

/**
 * Reuses three of the four homepage service pillars verbatim (no
 * duplicated content) and adds one studio-specific pillar — HSE work is
 * central to Kipeo's studio story but isn't one of the four homepage
 * pillars, which are marketing-service-oriented rather than capability-area
 * oriented.
 */
const hseAndTechnicalWorkflows: CapabilitySelectorPillar = {
  id: "hse-and-technical-workflows",
  title: "HSE and Technical Workflows",
  problem: "For safety, compliance and technical operations still running on paper or spreadsheets.",
  subservices: [
    "HSE management systems",
    "Inspection and audit workflows",
    "Corrective-action tracking",
    "Equipment and maintenance records",
  ],
  icon: ShieldCheck,
};

export const studioCapabilitySelector: CapabilitySelectorPillar[] = [
  servicePillars.find((pillar) => pillar.id === "websites-and-commerce")!,
  servicePillars.find((pillar) => pillar.id === "software-and-systems")!,
  hseAndTechnicalWorkflows,
  servicePillars.find((pillar) => pillar.id === "infrastructure-and-support")!,
];
