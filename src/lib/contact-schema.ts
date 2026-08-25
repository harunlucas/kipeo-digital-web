import { z } from "zod";
import {
  budgetOptions,
  preferredContactOptions,
  projectStageOptions,
  projectTypeOptions,
  timelineOptions,
} from "@/content/contact";

/**
 * Single source of truth for the enquiry form, used by both the client
 * component (for the TypeScript shape of its state) and the `/api/contact`
 * route (for real validation — the client only does lightweight HTML5
 * checks, since the requirement is server-side validation).
 *
 * `.strict()` rejects any field not listed here, honeypot included — a
 * request carrying an unexpected key fails validation the same way a bot
 * filling every visible input plus a scripted extra field would.
 */
export const contactFormSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name.").max(120, "Full name is too long."),
    email: z.email("Enter a valid email address.").max(254, "Email address is too long."),
    company: z.string().trim().max(160, "Company name is too long.").optional().or(z.literal("")),
    phone: z
      .string()
      .trim()
      .max(40, "Phone number is too long.")
      .regex(/^[0-9+()\-\s]*$/, "Enter a valid phone number.")
      .optional()
      .or(z.literal("")),
    countryOrTimezone: z.string().trim().max(120, "This field is too long.").optional().or(z.literal("")),
    websiteUrl: z.string().trim().max(200, "URL is too long.").optional().or(z.literal("")),
    preferredContact: z.enum(preferredContactOptions).optional().or(z.literal("")),
    projectType: z.enum(projectTypeOptions, "Select a project type."),
    projectStage: z.enum(projectStageOptions, "Select a project stage."),
    timeline: z.enum(timelineOptions, "Select a timeline."),
    budget: z.enum(budgetOptions, "Select a budget range."),
    projectSummary: z
      .string()
      .trim()
      .min(20, "Add a little more detail about the project.")
      .max(4000, "Project summary is too long."),
    privacyAcknowledged: z.literal(true, { error: "You must acknowledge the privacy notice." }),
    honeypot: z.string().max(0).optional().or(z.literal("")),
    turnstileToken: z.string().max(4000).optional().or(z.literal("")),
  })
  .strict();

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * The client form's state shape. Distinct from `ContactFormValues` only in
 * `privacyAcknowledged`: the schema requires the literal `true` for a
 * request to validate, but the checkbox starts unchecked (per "do not use a
 * preselected checkbox") and state must be able to represent that.
 */
export type ContactFormState = Omit<ContactFormValues, "privacyAcknowledged"> & {
  privacyAcknowledged: boolean;
};

export const contactFormDefaults: ContactFormState = {
  fullName: "",
  email: "",
  company: "",
  phone: "",
  countryOrTimezone: "",
  websiteUrl: "",
  preferredContact: "",
  projectType: projectTypeOptions[0],
  projectStage: projectStageOptions[0],
  timeline: timelineOptions[timelineOptions.length - 1],
  budget: budgetOptions[0],
  projectSummary: "",
  privacyAcknowledged: false,
  honeypot: "",
  turnstileToken: "",
};
