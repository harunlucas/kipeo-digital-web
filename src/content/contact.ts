import { Mail, Phone, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/content/site-config";

/**
 * /contact-only content: form option lists, contact pathways, the "what
 * happens next" steps, the trust strip and a short four-question FAQ
 * (deliberately not a repeat of `servicesFaq`).
 */

export const projectTypeOptions = [
  "Not sure — I need guidance",
  "Custom software or web application",
  "Business system or workflow automation",
  "HSE or operational software",
  "Engineering or technical software",
  "Website or landing page",
  "E-commerce platform",
  "Integration or automation",
  "Hosting, maintenance or support",
] as const;

export const projectStageOptions = [
  "Exploring an idea",
  "Requirements are being defined",
  "Ready to begin",
  "Existing system needs improvement",
  "Ongoing support needed",
] as const;

export const timelineOptions = [
  "As soon as practical",
  "Within 1–2 months",
  "Within 3–6 months",
  "More than 6 months",
  "Flexible or not sure",
] as const;

export const budgetOptions = [
  "Not sure — I need guidance",
  "Under USD 2,500",
  "USD 2,500–5,000",
  "USD 5,000–10,000",
  "USD 10,000–25,000",
  "Above USD 25,000",
] as const;

export const preferredContactOptions = ["Email", "Phone call", "WhatsApp"] as const;

const whatsappMessage = "Hello Kipeo Digital, I would like to discuss a project.";

export type ContactPathway = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  /** Slightly more prominent styling — reserved for the pathways that work best for international visitors. */
  prominent?: boolean;
};

export const contactPathways: ContactPathway[] = [
  {
    id: "email",
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    prominent: true,
  },
  {
    id: "call",
    label: "Call",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
    icon: Phone,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "Message Kipeo",
    href: `${siteConfig.whatsappHref}?text=${encodeURIComponent(whatsappMessage)}`,
    icon: MessageCircle,
    external: true,
    prominent: true,
  },
];

export type ContactProcessStep = { number: string; title: string; description: string };

export const contactProcessSteps: ContactProcessStep[] = [
  {
    number: "01",
    title: "Review",
    description: "We read the enquiry and identify any information needed before scoping.",
  },
  {
    number: "02",
    title: "Clarify",
    description: "We arrange a short conversation when the requirements need further discussion.",
  },
  {
    number: "03",
    title: "Propose",
    description:
      "Where the project is a suitable fit, you receive a written proposal covering scope, deliverables, timeline, milestones and investment.",
  },
  {
    number: "04",
    title: "Decide",
    description: "You can review the proposal without an obligation to proceed.",
  },
];

export const contactTrustPoints: string[] = [
  "Free initial consultation",
  "Written scope before development",
  "Milestone-based delivery",
  "Remote collaboration worldwide",
  "No passwords or sensitive information required",
];

export type ContactFaqItem = { question: string; answer: string };

export const contactFaq: ContactFaqItem[] = [
  {
    question: "Is the initial consultation free?",
    answer:
      "The initial consultation is free. Where the project is a suitable fit, the written proposal is also provided without obligation.",
  },
  {
    question: "Do I need complete requirements before contacting Kipeo?",
    answer:
      "No. You can contact us with an early idea or an existing problem. Discovery helps define what needs to be built.",
  },
  {
    question: "Can Kipeo improve an existing system?",
    answer:
      "Yes. We can review an existing website, application or workflow before recommending improvements, integration or rebuilding.",
  },
  {
    question: "Can Kipeo work with clients outside Kenya?",
    answer: "Yes. Kipeo is based in Nairobi and works remotely with clients worldwide.",
  },
];
