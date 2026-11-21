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
    description: "Requirements, priorities and a scoped plan, agreed before anything is built.",
    position: { x: 15, y: 63 },
  },
  {
    id: "interface",
    number: "02",
    label: "Interface and experience",
    description: "The screens and flows people use: responsive, accessible interfaces across devices.",
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

/**
 * The eight project stages on /studio, each answering "what will you do, what
 * do you need from me, and what will I get to review?". Every review item is
 * grounded in a commitment Kipeo already publishes: the free consultation and
 * written proposal (`scopeTerms` in services-page.ts), the written scope,
 * working version and handover from the homepage "How we work" summary, and
 * the change-approval rule. Don't add a deliverable here that isn't offered.
 */
export type StudioJourneyStage = {
  id: string;
  label: string;
  summary: string;
  kipeo: string;
  client: string;
  review: string;
};

export const studioJourneyStages: StudioJourneyStage[] = [
  {
    id: "discover",
    label: "Discover",
    summary: "Understand the problem and what success should change.",
    kipeo: "Learn how the work happens today, who is involved and where it gets stuck.",
    client: "Time for a first conversation, and examples of the spreadsheets, forms or tools you use now.",
    review: "A free first consultation and a straight answer on whether the project is a good fit.",
  },
  {
    id: "define",
    label: "Define",
    summary: "Turn discovery into a clear, written scope.",
    kipeo: "Write up what will be built, in what order and why.",
    client: "Agree the priorities and name the person who makes decisions on your side.",
    review:
      "A written proposal covering deliverables, milestones, timeline and investment, agreed before anything is built.",
  },
  {
    id: "design",
    label: "Design",
    summary: "Shape structure, workflows and interface before code.",
    kipeo: "Plan the structure, the workflow and the key screens.",
    client: "Feedback on whether the flow matches how your team really works.",
    review: "The planned structure and screens, while changes are still cheap to make.",
  },
  {
    id: "build",
    label: "Build",
    summary: "Develop the interface, application logic and data layer.",
    kipeo: "Build milestone by milestone, so progress is visible as it happens.",
    client: "Content, sample data and quick answers when questions come up.",
    review: "A working version you can try with a real task. Your feedback guides the next revision.",
  },
  {
    id: "connect",
    label: "Connect",
    summary: "Wire up integrations, APIs and third-party services.",
    kipeo: "Connect the services and tools included in the scope.",
    client: "Access to the accounts and services that need connecting.",
    review: "The connected services working together in the test version.",
  },
  {
    id: "test",
    label: "Test",
    summary: "Verify functionality, accessibility and edge cases.",
    kipeo: "Check how it behaves, including accessibility and the awkward cases.",
    client: "Try your own everyday tasks and tell us what doesn't fit.",
    review: "Fixes for what you and we found, before anything goes live.",
  },
  {
    id: "launch",
    label: "Launch",
    summary: "Deploy to production with domains, SSL and monitoring.",
    kipeo: "Deploy to production with the domain, SSL and monitoring in place.",
    client: "Domain and hosting accounts (third-party costs are usually separate) and final sign-off.",
    review: "The live system, checked together, and a documented handover guide for your team.",
  },
  {
    id: "support",
    label: "Support",
    summary: "Ongoing maintenance, updates and technical support.",
    kipeo: "Maintenance, updates and technical support, as agreed.",
    client: "Tell us about issues and plan changes with us.",
    review: "A quote to approve before any work outside the agreed scope is built.",
  },
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
    description: "Databases and data models that let a system store and retrieve information reliably.",
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
