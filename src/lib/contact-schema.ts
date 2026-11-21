import { z } from "zod";
import { enquiryServiceIds, type EnquiryServiceId } from "@/content/enquiry";

/**
 * Single source of truth for the project enquiry form — the site-wide panel
 * and the inline form on /contact share it. The client runs it for instant
 * field-level feedback; `/api/contact` runs it again as the real check.
 *
 * Deliberately short: name, email, an optional service and the project
 * details. Visitors can describe an early idea without knowing their
 * requirements, budget or timeline.
 *
 * `.strict()` rejects any field not listed here — a request carrying an
 * unexpected key fails validation the same way a scripted extra field would.
 */
export const contactFormSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your name.").max(120, "Name is too long — 120 characters at most."),
    email: z
      .string()
      .trim()
      .min(1, "Enter your email address.")
      .max(254, "Email address is too long.")
      .pipe(z.email("Enter a valid email address, like name@example.com.")),
    service: z.enum(enquiryServiceIds).optional().or(z.literal("")),
    projectSummary: z
      .string()
      .trim()
      .min(20, "Tell us a little more — a sentence or two is enough.")
      .max(4000, "Project details are too long — 4,000 characters at most."),
    honeypot: z.string().max(0).optional().or(z.literal("")),
    turnstileToken: z.string().max(4000).optional().or(z.literal("")),
  })
  .strict();

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** The visitor-entered part of the form — what the in-memory draft holds. */
export type EnquiryDraft = {
  fullName: string;
  email: string;
  service: EnquiryServiceId | "";
  projectSummary: string;
};

export const emptyEnquiryDraft: EnquiryDraft = {
  fullName: "",
  email: "",
  service: "",
  projectSummary: "",
};

/** Field order on screen — used to move focus to the first invalid field. */
export const enquiryFieldOrder = ["fullName", "email", "service", "projectSummary"] as const;
