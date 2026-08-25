export type ProblemVisual = "enquiry" | "operations" | "website" | "automation" | "commerce";

export type ProblemPair = {
  problem: string;
  solutionLabel: string;
  response: string;
  visual: ProblemVisual;
  linkLabel: string;
  linkHref: string;
};

/**
 * Capped at five for the homepage; any additional problem belongs on the
 * Services page instead. Link anchors match the service group ids in
 * content/service-groups.ts.
 */
export const problemPairs: ProblemPair[] = [
  {
    problem: "Enquiries trapped in manual follow-up",
    solutionLabel: "Enquiry workflow",
    response: "Capture, assign and follow up every enquiry from one structured workflow.",
    visual: "enquiry",
    linkLabel: "Explore workflow automation",
    linkHref: "/services#software-and-business-systems",
  },
  {
    problem: "Operations spread across spreadsheets",
    solutionLabel: "Business system",
    response: "Bring records, tasks and reporting into one system built around the way your team works.",
    visual: "operations",
    linkLabel: "Explore custom software",
    linkHref: "/services#software-and-business-systems",
  },
  {
    problem: "A website that does not generate qualified leads",
    solutionLabel: "Conversion-focused website",
    response: "Clarify the offer, guide the right visitors and create a deliberate path to enquiry.",
    visual: "website",
    linkLabel: "Explore website development",
    linkHref: "/services#websites-and-commerce",
  },
  {
    problem: "Repetitive work consuming staff time",
    solutionLabel: "Workflow automation",
    response: "Connect repeated steps so routine work moves forward with less manual handling.",
    visual: "automation",
    linkLabel: "Explore automation",
    linkHref: "/services#software-and-business-systems",
  },
  {
    problem: "An online store that is difficult to manage",
    solutionLabel: "Commerce platform",
    response: "Create a manageable catalogue, ordering process and administration experience.",
    visual: "commerce",
    linkLabel: "Explore e-commerce",
    linkHref: "/services#websites-and-commerce",
  },
];
