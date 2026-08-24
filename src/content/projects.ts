export type ProjectLinkType = "internal" | "external";

export type Project = {
  slug: string;
  status: "placeholder" | "published";
  title: string;
  category: string;
  problem: string;
  solution: string;
  technologies: string[];
  image: string | null;
  url?: string;
  linkType: ProjectLinkType;
  collaboration?: string;
  contribution?: string;
  outcome?: string;
};

/**
 * No case study has verified problem/solution/technology/image details yet,
 * so these are explicitly labelled development placeholders rather than
 * real project claims. Replace each with approved project details —
 * including any collaboration credit — before publishing.
 */
export const projects: Project[] = [
  {
    slug: "placeholder-one",
    status: "placeholder",
    title: "Selected system — in development",
    category: "Business System",
    problem: "Case study pending approved project details.",
    solution: "Case study pending approved project details.",
    technologies: [],
    image: null,
    linkType: "internal",
  },
  {
    slug: "placeholder-two",
    status: "placeholder",
    title: "Selected system — in development",
    category: "Web Application",
    problem: "Case study pending approved project details.",
    solution: "Case study pending approved project details.",
    technologies: [],
    image: null,
    linkType: "internal",
  },
  {
    slug: "placeholder-three",
    status: "placeholder",
    title: "Selected system — in development",
    category: "Commerce Platform",
    problem: "Case study pending approved project details.",
    solution: "Case study pending approved project details.",
    technologies: [],
    image: null,
    linkType: "internal",
  },
];
