import { indexedCaseStudies, statusLabelFor } from "@/content/case-studies";

/**
 * /about content: the people a client works with, one decision each, and
 * one illustrative example of direct collaboration.
 *
 * Sources (checked 2026-11-21):
 * - Names and the project each person is linked to: the homepage
 *   (`automation-preview.tsx`: "Harun’s CNC project", "Cynthia’s HSE
 *   project") and each project's public write-up host in
 *   `case-studies.ts`.
 * - Role lines: the repository's own descriptions of each person's
 *   practice. HarunLucas.com is "an engineering and systems-development
 *   practice"; CynthiaMueni.com is the site of "an occupational safety and
 *   EHS-systems specialist" (`case-studies.ts`, `services-page.ts`). No
 *   internal job titles are documented, so none are stated.
 * - Project credit stays with the team (site owner's instruction,
 *   2026-11-20): each profile repeats the case study's own `disclosure`.
 * - Decision copy: the CNC engine's documented demo output and the SafetyOS
 *   corrective-action workflow, both in `case-studies.ts` and
 *   `docs/work-page-sources.md`.
 */

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  /** The decision, in one line. */
  decision: string;
  /** How that decision shows up in the project. */
  detail: string;
  project: {
    title: string;
    status: string;
    credit: string;
    href: string;
    linkLabel: string;
  };
};

function projectFor(slug: string): TeamMember["project"] {
  const study = indexedCaseStudies.find((entry) => entry.slug === slug);
  if (!study) throw new Error(`about: no indexed case study "${slug}"`);
  return {
    title: study.title,
    status: statusLabelFor(study),
    credit: study.disclosure,
    href: `/work/${study.slug}`,
    linkLabel: study.listing.linkLabel,
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "harun-lucas",
    name: "Harun Lucas",
    role: "Engineering and systems development",
    decision: "Every number in the program should trace back to the input that produced it.",
    detail:
      "In the CNC learning system, a learner defines a simple milling job and the prototype shows the toolpath it plans and the G-code it writes, with the formula behind each value. On the demo task, a cutting speed of 25 m/min for an 8 mm drill becomes 994.7 rpm, and that becomes S995 in the program. Commercial CAM software hides that chain. This tool is built to show it.",
    project: projectFor("cnc-learning-system"),
  },
  {
    id: "cynthia-mueni",
    name: "Cynthia Mueni",
    role: "Occupational safety and EHS systems",
    decision: "Uploading proof of a fix and confirming the fix are two different jobs.",
    detail:
      "In SafetyOS, the person responsible for a corrective action uploads the evidence, such as an after-action photo. Closing it is a separate step: the safety officer checks that evidence, then verifies it or sends it back. Keeping the steps apart means nothing closes on the word of the person who made the fix, and a finding stays open until every action on it is verified.",
    project: projectFor("hse-management-system"),
  },
];

/** Illustrative only. The full delivery process lives on /studio. */
export const collaborationExample = {
  lead: "Before we build an approval screen, we work through one real request with your team.",
  questions: ["Who submits it?", "Who can send it back?", "What should the requester see next?"],
  close: "Those answers shape both the screen and the software behind it.",
};
