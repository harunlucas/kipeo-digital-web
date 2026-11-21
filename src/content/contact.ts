import { siteConfig } from "@/content/site-config";

/**
 * /contact content: the WhatsApp link and a short four-question FAQ
 * (deliberately not a repeat of `servicesFaq`). The project enquiry form's
 * own options live in `enquiry.ts`. `timelineOptions` and
 * `preferredContactOptions` are used by the Impact Build application form.
 */

export const timelineOptions = [
  "As soon as practical",
  "Within 1–2 months",
  "Within 3–6 months",
  "More than 6 months",
  "Flexible or not sure",
] as const;

export const preferredContactOptions = ["Email", "Phone call", "WhatsApp"] as const;

const whatsappMessage = "Hello Kipeo Digital, I would like to discuss a project.";

export const whatsappHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent(whatsappMessage)}`;

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
