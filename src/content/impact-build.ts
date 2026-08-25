import { siteConfig } from "@/content/site-config";

/**
 * Kipeo Impact Build — annual pro-bono initiative. This file is the single
 * source of truth for the programme's status and copy content, consumed by
 * the announcement bar, the homepage teaser, /impact-build, /impact-build/apply
 * and the sitemap. See docs/impact-build-operations.md for how to run a cycle.
 */

export type ImpactBuildStatus = "draft" | "open" | "reviewing" | "closed" | "selected";

export type ImpactBuildConfig = {
  status: ImpactBuildStatus;
  cycleLabel: string;
  applicationsOpen: boolean;
  openingDate: string | null;
  closingDate: string | null;
  reviewPeriod: string | null;
  expectedProjectStart: string | null;
  selectedApplicantPublished: boolean;
  selectedApplicantName: string | null;
  selectedApplicantConsent: boolean;
  applicationEmail: string;
};

/**
 * EDIT HERE when a cycle's dates are confirmed. Leave a field `null` rather
 * than inventing a date — the pages only render what's set here. Flip
 * `status` to "open" to go live: the announcement bar, homepage teaser and
 * /impact-build/apply all respond to this one value automatically.
 */
export const impactBuildConfig: ImpactBuildConfig = {
  status: "draft",
  cycleLabel: "Annual Cycle",
  applicationsOpen: false,
  openingDate: null,
  closingDate: null,
  reviewPeriod: null,
  expectedProjectStart: null,
  selectedApplicantPublished: false,
  selectedApplicantName: null,
  selectedApplicantConsent: false,
  applicationEmail: siteConfig.email,
};

export const eligibleProjectTypes = [
  "A focused organisational website",
  "A business or service website of up to five core pages",
  "An information or campaign platform",
  "A focused landing page",
  "Redesign of an existing small website",
  "A small operational workflow",
  "A proof of concept for a useful digital product",
] as const;

export const possibleIncludedWork = [
  "Discovery and requirements definition",
  "Information architecture",
  "UI/UX design",
  "Responsive development",
  "Content-management setup",
  "Accessibility foundations",
  "Technical SEO foundations",
  "Analytics setup",
  "Deployment support",
  "Practical documentation",
  "Handover",
  "30 days of defect support after launch",
] as const;

export const separateCostItems = [
  "Domain registration",
  "Hosting",
  "Premium licences",
  "Payment-provider fees",
  "Professional photography",
  "Extensive copywriting",
  "Advertising expenditure",
  "Large-scale data entry",
  "Large product-catalogue population",
  "Ongoing maintenance after the support period",
  "Work outside the agreed scope",
] as const;

export const eligibleApplicantTypes = [
  "Nonprofit organisations",
  "Community organisations",
  "Social-impact initiatives",
  "Early-stage purpose-led organisations",
  "Small organisations addressing a genuine operational problem",
  "Individuals developing a clearly defined public-benefit initiative",
] as const;

export const applicantRequirements = [
  "Provide accurate information",
  "Explain the problem and intended users",
  "Appoint one project decision-maker",
  "Provide required content",
  "Own or have permission to use submitted content",
  "Participate in discovery and reviews",
  "Be able to maintain the result after handover",
  "Accept the programme terms",
] as const;

export const selectionCriteria = [
  "Clarity of the problem",
  "Potential practical benefit",
  "Suitability for a digital solution",
  "Alignment with Kipeo's capabilities",
  "Achievable scope",
  "Applicant readiness",
  "Availability of content",
  "Availability of a decision-maker",
  "Realistic long-term ownership",
  "Kipeo's available capacity",
] as const;

export type SelectionStage = { title: string; description: string };

export const selectionStages: SelectionStage[] = [
  {
    title: "Apply",
    description: "The applicant explains the problem, intended users and desired result.",
  },
  {
    title: "Review",
    description: "Kipeo reviews eligibility, likely impact, readiness and scope.",
  },
  {
    title: "Clarify",
    description: "Shortlisted applicants may be contacted for further information.",
  },
  {
    title: "Select and scope",
    description: "One suitable application may be selected, subject to a written and achievable project scope.",
  },
  {
    title: "Agree",
    description:
      "Responsibilities, deliverables, third-party costs, timeline and content requirements are agreed in writing.",
  },
  {
    title: "Build",
    description: "Development begins only after the written Impact Build agreement is accepted.",
  },
];

export const organisationTypeOptions = [
  "Nonprofit organisation",
  "Community organisation",
  "Social-impact initiative",
  "Early-stage purpose-led organisation",
  "Small organisation",
  "Individual / public-benefit initiative",
  "Other",
] as const;

export const requestedProjectTypeOptions = [...eligibleProjectTypes, "Not sure — need guidance"] as const;

export const readinessOptions = ["Yes", "No", "Need to discuss"] as const;

export type ImpactBuildFaqItem = { question: string; answer: string };

export const impactBuildFaq: ImpactBuildFaqItem[] = [
  {
    question: "What is the Kipeo Impact Build?",
    answer:
      "An annual initiative through which Kipeo Digital may select one suitable organisation or purpose-led initiative for a clearly scoped digital project with Kipeo's development fee waived.",
  },
  {
    question: "Is the entire project free?",
    answer:
      "Kipeo's development fee for the final agreed scope is waived. The recipient remains responsible for approved third-party expenses such as domain registration, hosting or premium licences.",
  },
  {
    question: "What kinds of projects are eligible?",
    answer:
      "Focused websites, small operational workflows and proofs of concept are typical. The final solution depends on the applicant's needs, Kipeo's capabilities and what can be delivered responsibly through the initiative.",
  },
  {
    question: "Who may apply?",
    answer:
      "Nonprofits, community organisations, social-impact initiatives, early-stage purpose-led organisations and individuals developing a clearly defined public-benefit initiative.",
  },
  {
    question: "How is the project selected?",
    answer:
      "Applications are assessed against published criteria, including problem clarity, potential impact, digital suitability, achievable scope and applicant readiness.",
  },
  {
    question: "Does applying guarantee selection?",
    answer:
      "No. Selection is based on suitability and potential practical impact, not chance, and Kipeo may choose not to select a project if no application is suitable, sufficiently prepared or responsibly deliverable.",
  },
  {
    question: "What costs remain separate?",
    answer:
      "Items such as domain registration, hosting, premium licences, payment-provider fees, professional photography and ongoing maintenance after the support period remain the recipient's responsibility. No third-party cost is incurred without prior written approval.",
  },
  {
    question: "Can an existing Kipeo client apply?",
    answer:
      "The Impact Build is intended for organisations that need a project but do not currently have the resources to commission one commercially. Ordinary commercial projects should be raised through the regular Contact form.",
  },
  {
    question: "What happens after selection?",
    answer:
      "Responsibilities, deliverables, third-party costs, timeline and content requirements are agreed in writing. No project exists, and development does not begin, until that written Impact Build agreement is accepted.",
  },
  {
    question: "Will applicant information be published?",
    answer:
      "No. Kipeo does not publicly identify applicants or the selected recipient without separate written consent.",
  },
];
