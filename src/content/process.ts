export type ProcessVisual = "discover" | "define" | "design" | "build" | "launch";

export type ProcessStage = {
  id: string;
  number: string;
  title: string;
  summary: string;
  kipeoResponsibilities: string[];
  clientResponsibilities: string[];
  outputs: string[];
  visualType: ProcessVisual;
};

export const processStages: ProcessStage[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    summary: "We understand the business problem, the people affected and what a successful result should change.",
    kipeoResponsibilities: [
      "Reviews the current situation",
      "Identifies users and workflows",
      "Discusses goals, constraints and priorities",
      "Reviews relevant existing systems or content",
    ],
    clientResponsibilities: [
      "Explains the problem",
      "Shares available information",
      "Identifies decision-makers",
      "Clarifies essential priorities",
    ],
    outputs: ["Discovery summary", "Initial recommendations", "Agreed next step"],
    visualType: "discover",
  },
  {
    id: "define",
    number: "02",
    title: "Define",
    summary: "We turn the discovery into a clear, practical scope before development begins.",
    kipeoResponsibilities: [
      "Defines requirements",
      "Separates essential and optional work",
      "Proposes milestones",
      "Identifies dependencies and exclusions",
      "Prepares the free initial proposal",
    ],
    clientResponsibilities: ["Reviews the scope", "Confirms priorities", "Approves the proposed direction"],
    outputs: ["Written scope", "Proposed timeline", "Milestone plan", "Investment proposal", "Stated exclusions"],
    visualType: "define",
  },
  {
    id: "design",
    number: "03",
    title: "Design",
    summary: "We shape the structure, workflows and experience before committing them to development.",
    kipeoResponsibilities: [
      "Develops information architecture",
      "Maps user flows",
      "Prepares wireframes or interface direction",
      "Defines the visual system",
      "Reviews technical architecture where required",
    ],
    clientResponsibilities: [
      "Reviews the direction",
      "Supplies required content",
      "Provides consolidated feedback",
      "Approves the agreed design stage",
    ],
    outputs: ["Approved structure", "User flows", "Design direction", "Implementation plan"],
    visualType: "design",
  },
  {
    id: "build",
    number: "04",
    title: "Build",
    summary:
      "We develop the complete solution in visible stages, including the interface, application logic, data and required integrations.",
    kipeoResponsibilities: [
      "Develops the frontend",
      "Implements backend functionality where required",
      "Structures data and content",
      "Builds authentication and permissions where required",
      "Integrates APIs and services",
      "Configures CMS or commerce tools",
      "Tests functionality and responsiveness",
      "Shares milestone progress",
    ],
    clientResponsibilities: [
      "Reviews milestone demonstrations",
      "Supplies approved content and access",
      "Provides consolidated feedback",
      "Performs acceptance testing where appropriate",
    ],
    outputs: ["Working implementation", "Tested milestone releases", "Configured integrations", "Documented decisions", "Acceptance-ready product"],
    visualType: "build",
  },
  {
    id: "launch",
    number: "05",
    title: "Launch and support",
    summary: "We deploy carefully, complete the handover and provide agreed support after launch.",
    kipeoResponsibilities: [
      "Prepares production deployment",
      "Configures domains, DNS and SSL where included",
      "Completes final testing",
      "Provides documentation",
      "Conducts handover or training where included",
      "Monitors the launch",
      "Provides agreed maintenance or support",
    ],
    clientResponsibilities: [
      "Gives final approval",
      "Receives credentials and documentation",
      "Assigns responsible internal users",
      "Follows agreed support arrangements",
    ],
    outputs: ["Production release", "Handover package", "Ownership and access transfer", "Support plan", "Maintenance arrangement where commissioned"],
    visualType: "launch",
  },
];
