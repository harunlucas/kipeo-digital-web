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
      "Reviews the current situation and any existing systems",
      "Identifies users and workflows",
      "Discusses goals, constraints and priorities",
    ],
    clientResponsibilities: [
      "Explains the problem and shares available information",
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
      "Defines requirements and separates essential from optional work",
      "Proposes milestones and identifies dependencies",
      "Prepares the free initial proposal",
    ],
    clientResponsibilities: ["Reviews the scope", "Confirms priorities", "Approves the proposed direction"],
    outputs: ["Written scope and stated exclusions", "Milestone plan and timeline", "Investment proposal"],
    visualType: "define",
  },
  {
    id: "design",
    number: "03",
    title: "Design",
    summary: "We shape the structure, workflows and experience before committing them to development.",
    kipeoResponsibilities: [
      "Develops information architecture and user flows",
      "Prepares wireframes and defines the visual system",
      "Reviews technical architecture where required",
    ],
    clientResponsibilities: [
      "Reviews the direction and supplies required content",
      "Provides consolidated feedback",
      "Approves the agreed design stage",
    ],
    outputs: ["Approved structure and user flows", "Design direction", "Implementation plan"],
    visualType: "design",
  },
  {
    id: "build",
    number: "04",
    title: "Build",
    summary:
      "We develop the complete solution in visible stages, including the interface, application logic, data and required integrations.",
    kipeoResponsibilities: [
      "Develops the frontend, backend and data structure",
      "Builds authentication, permissions and required integrations",
      "Tests functionality and shares milestone progress",
    ],
    clientResponsibilities: [
      "Reviews milestone demonstrations",
      "Supplies approved content and access",
      "Provides feedback and acceptance testing",
    ],
    outputs: ["Working, tested implementation", "Configured integrations", "Documented, acceptance-ready product"],
    visualType: "build",
  },
  {
    id: "launch",
    number: "05",
    title: "Launch and support",
    summary: "We deploy carefully, complete the handover and provide agreed support after launch.",
    kipeoResponsibilities: [
      "Prepares deployment and configures domains, DNS and SSL",
      "Completes final testing and provides documentation",
      "Conducts handover, monitors launch and provides agreed support",
    ],
    clientResponsibilities: [
      "Gives final approval",
      "Receives credentials, documentation and access",
      "Assigns responsible users and follows support arrangements",
    ],
    outputs: ["Production release and handover package", "Ownership and access transfer", "Support and maintenance plan where commissioned"],
    visualType: "launch",
  },
];
