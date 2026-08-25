import type { LucideIcon } from "lucide-react";
import { serviceGroups } from "@/content/service-groups";

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
 * Reuses four of the five canonical service groups (no duplicated content) —
 * SEO and Digital Growth is left out here as it's marketing-service-oriented
 * rather than build-capability-oriented, the same reasoning this selector
 * has always used to shape which groups represent "where to start building."
 */
const studioSelectorIds = [
  "websites-and-commerce",
  "software-and-business-systems",
  "operational-and-technical-software",
  "integration-deployment-and-support",
] as const;

export const studioCapabilitySelector: CapabilitySelectorPillar[] = studioSelectorIds.map((id) => {
  const group = serviceGroups.find((candidate) => candidate.id === id)!;
  return {
    id: group.id,
    title: group.title,
    problem: group.problem,
    subservices: group.capabilities.slice(0, 4),
    icon: group.icon,
  };
});
