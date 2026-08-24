export type ProcessStage = {
  step: string;
  title: string;
  description: string;
};

export const processStages: ProcessStage[] = [
  {
    step: "01",
    title: "Discover",
    description: "We start by understanding the problem, the people involved and what success looks like.",
  },
  {
    step: "02",
    title: "Define",
    description: "Requirements, priorities and constraints are clarified before anything is proposed.",
  },
  {
    step: "03",
    title: "Design",
    description: "Scope, structure and experience are shaped and reviewed with you before development.",
  },
  {
    step: "04",
    title: "Build",
    description: "Development happens in stages, with progress visible at agreed milestones.",
  },
  {
    step: "05",
    title: "Launch and support",
    description: "We deploy carefully and stay available under your agreed support terms.",
  },
];
