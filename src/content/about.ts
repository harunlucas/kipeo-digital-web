import type { LucideIcon } from "lucide-react";
import {
  Users,
  Layout,
  Cpu,
  Database,
  Share2,
  Rocket,
  LifeBuoy,
  FileSearch,
  PenTool,
  Code2,
  Plug,
} from "lucide-react";

/**
 * /about-only content. Every visual this feeds is built fresh for this page
 * (see the `about-*` motion components) — none of it reuses a Homepage,
 * Services, Work, Insights or Studio composition, per the brief.
 */

export type StackLayer = { id: string; label: string; description: string; icon: LucideIcon };

/** Hero visual: the layers a working product is actually made of, stacked. */
export const heroStackLayers: StackLayer[] = [
  { id: "people", label: "People and roles", description: "Who defines, builds and maintains the system", icon: Users },
  { id: "interface", label: "Interface", description: "What the people using it actually see and act on", icon: Layout },
  { id: "logic", label: "Application logic", description: "The rules and workflow behind every action", icon: Cpu },
  { id: "data", label: "Data", description: "What the system records, and what it owns", icon: Database },
  { id: "integration", label: "Integration", description: "How it connects to the other tools a business runs on", icon: Share2 },
  { id: "deployment", label: "Deployment", description: "Where it runs, and how a release reaches it", icon: Rocket },
  { id: "support", label: "Support", description: "What keeps it working after launch", icon: LifeBuoy },
];

export type LifecycleStage = { id: string; label: string; description: string; icon: LucideIcon };

/** "What Kipeo is" visual: a closed loop, not a one-way pipeline. */
export const lifecycleStages: LifecycleStage[] = [
  { id: "discover", label: "Strategy and discovery", description: "The problem, users and workflow, understood first", icon: FileSearch },
  { id: "design", label: "Product and interface design", description: "Shaped around that workflow, not a template", icon: PenTool },
  { id: "build", label: "Frontend and backend development", description: "Interface and logic, built as one connected piece", icon: Code2 },
  { id: "data", label: "Databases and data structures", description: "What the system owns, modelled deliberately", icon: Database },
  { id: "integrate", label: "APIs and integrations", description: "Connected to the other systems a business runs on", icon: Plug },
  { id: "deploy", label: "Deployment, maintenance and support", description: "Live, monitored and kept current after launch", icon: Rocket },
];

export const whatKipeoIsCapabilities: string[] = [
  "Strategy and discovery",
  "Product and interface design",
  "Frontend development",
  "Backend development",
  "Databases and data structures",
  "APIs and integrations",
  "Deployment",
  "Maintenance and support",
];

export type ProblemSituation = { id: string; label: string; icon: LucideIcon };

/** "Why Kipeo exists" visual: several disconnected situations, one system. */
export const problemSituations: ProblemSituation[] = [
  { id: "spreadsheets", label: "Processes spread across spreadsheets", icon: Layout },
  { id: "repeat-entry", label: "Information entered repeatedly", icon: FileSearch },
  { id: "disconnected", label: "Tools that do not communicate", icon: Share2 },
  { id: "hard-to-manage", label: "Websites that are difficult to manage", icon: Code2 },
  { id: "hard-to-retrieve", label: "Operational records that are difficult to retrieve", icon: Database },
];

export type Principle = { number: string; title: string; description: string };

export const principles: Principle[] = [
  {
    number: "01",
    title: "Start with the problem",
    description: "Technology is selected after the workflow, users and desired outcome are understood.",
  },
  {
    number: "02",
    title: "Define the scope clearly",
    description: "Deliverables, responsibilities, milestones, timeline and investment are documented before development begins.",
  },
  {
    number: "03",
    title: "Build the whole system",
    description: "Interface, application logic, data, integrations and deployment are treated as connected parts of one product.",
  },
  {
    number: "04",
    title: "Keep progress visible",
    description: "Larger projects are delivered through reviewable stages, with decisions and progress documented.",
  },
  {
    number: "05",
    title: "Prepare for what follows launch",
    description: "Documentation, handover, maintenance and support are considered during development — not added as an afterthought.",
  },
];

export type CollaborationRole = { id: string; label: string; description: string };

/** Section 5's role-based visual — deliberately not the Studio page's TrustPath. */
export const collaborationRoles: CollaborationRole[] = [
  { id: "define", label: "Define", description: "Problem, users and outcome clarified" },
  { id: "design", label: "Design", description: "Interface shaped around the workflow" },
  { id: "build", label: "Build", description: "Frontend, backend and data developed together" },
  { id: "integrate", label: "Integrate", description: "Connected to other systems and data" },
  { id: "launch", label: "Launch", description: "Deployed and handed over" },
  { id: "support", label: "Support", description: "Maintained and improved after launch" },
];

export const collaborationPractices: string[] = [
  "Agreed communication routines",
  "Documented requirements",
  "Milestone reviews",
  "Shared project updates",
  "Planned meeting times",
  "Clear decision records",
];
