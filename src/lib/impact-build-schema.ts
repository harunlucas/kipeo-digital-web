import { z } from "zod";
import { preferredContactOptions, timelineOptions } from "@/content/contact";
import {
  organisationTypeOptions,
  readinessOptions,
  requestedProjectTypeOptions,
} from "@/content/impact-build";
import { normalizeWebsiteUrl } from "@/lib/normalize-url";

/**
 * Single source of truth for the Impact Build application, used by both the
 * client stepper (for the TypeScript shape of its state) and the
 * `/api/impact-build` route (for real validation). Deliberately a separate
 * schema from `contactFormSchema` — different fields, different consent
 * model (three distinct acknowledgements, not one).
 *
 * `.strict()` rejects any field not listed here, honeypot included.
 */
export const impactBuildApplicationSchema = z
  .object({
    // Applicant
    fullName: z.string().trim().min(2, "Enter your full name.").max(120, "Full name is too long."),
    email: z.email("Enter a valid email address.").max(254, "Email address is too long."),
    phone: z
      .string()
      .trim()
      .min(5, "Enter a phone or WhatsApp number.")
      .max(40, "Phone number is too long.")
      .regex(/^[0-9+()\-\s]*$/, "Enter a valid phone number."),
    country: z.string().trim().min(2, "Enter your country.").max(120, "This field is too long."),
    preferredContact: z.enum(preferredContactOptions, { error: "Select a preferred contact method." }),

    // Organisation or initiative
    organisationName: z.string().trim().min(2, "Enter your organisation or initiative name.").max(160, "This field is too long."),
    organisationType: z.enum(organisationTypeOptions, { error: "Select an organisation type." }),
    existingWebsite: z
      .string()
      .trim()
      .max(200, "URL is too long.")
      .optional()
      .or(z.literal(""))
      .transform((value) => normalizeWebsiteUrl(value ?? ""))
      .refine((value): value is string => value !== null, {
        message: "Enter a valid website URL, e.g. example.org.",
      }),
    organisationDescription: z
      .string()
      .trim()
      .min(20, "Add a short description of the organisation or initiative.")
      .max(2000, "Description is too long."),
    primaryAreaOfWork: z.string().trim().min(2, "Enter the primary area of work.").max(200, "This field is too long."),

    // Project
    requestedProjectType: z.enum(requestedProjectTypeOptions, { error: "Select a project type." }),
    problemToSolve: z.string().trim().min(20, "Describe the problem to be solved.").max(4000, "This answer is too long."),
    intendedUsers: z.string().trim().min(10, "Describe who will use or benefit from the solution.").max(2000, "This answer is too long."),
    whyItMatters: z.string().trim().min(10, "Explain why the project matters.").max(2000, "This answer is too long."),
    whatCurrentlyExists: z.string().trim().max(2000, "This answer is too long.").optional().or(z.literal("")),
    desiredResult: z.string().trim().min(10, "Describe the desired result.").max(2000, "This answer is too long."),
    essentialFeatures: z.string().trim().min(10, "List the essential features.").max(2000, "This answer is too long."),
    contentAvailable: z.enum(readinessOptions, { error: "Select an option." }),
    preferredTimeline: z.enum(timelineOptions, { error: "Select a preferred timeline." }),

    // Readiness
    decisionMakerRole: z.string().trim().min(2, "Enter the name or role of the project decision-maker.").max(160, "This field is too long."),
    canParticipateInDiscovery: z.enum(readinessOptions, { error: "Select an option." }),
    canProvideContent: z.enum(readinessOptions, { error: "Select an option." }),
    canCoverThirdPartyCosts: z.enum(readinessOptions, { error: "Select an option." }),
    canMaintainAfterHandover: z.enum(readinessOptions, { error: "Select an option." }),
    anythingElse: z.string().trim().max(2000, "This answer is too long.").optional().or(z.literal("")),

    // Consent — three distinct acknowledgements, never combined
    privacyAcknowledged: z.literal(true, { error: "You must acknowledge the privacy notice." }),
    termsAccepted: z.literal(true, { error: "You must accept the Impact Build Terms." }),
    accuracyDeclared: z.literal(true, { error: "You must confirm the information is accurate." }),

    honeypot: z.string().max(0).optional().or(z.literal("")),
    turnstileToken: z.string().max(4000).optional().or(z.literal("")),
  })
  .strict();

export type ImpactBuildApplicationValues = z.infer<typeof impactBuildApplicationSchema>;

/**
 * The client form's state shape. The three consent fields are `boolean` (not
 * the literal `true` the schema requires), since every checkbox starts
 * unchecked and state must be able to represent that.
 */
export type ImpactBuildApplicationState = Omit<
  ImpactBuildApplicationValues,
  "privacyAcknowledged" | "termsAccepted" | "accuracyDeclared"
> & {
  privacyAcknowledged: boolean;
  termsAccepted: boolean;
  accuracyDeclared: boolean;
};

export const impactBuildApplicationDefaults: ImpactBuildApplicationState = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  preferredContact: preferredContactOptions[0],
  organisationName: "",
  organisationType: organisationTypeOptions[0],
  existingWebsite: "",
  organisationDescription: "",
  primaryAreaOfWork: "",
  requestedProjectType: requestedProjectTypeOptions[0],
  problemToSolve: "",
  intendedUsers: "",
  whyItMatters: "",
  whatCurrentlyExists: "",
  desiredResult: "",
  essentialFeatures: "",
  contentAvailable: readinessOptions[2],
  preferredTimeline: timelineOptions[0],
  decisionMakerRole: "",
  canParticipateInDiscovery: readinessOptions[2],
  canProvideContent: readinessOptions[2],
  canCoverThirdPartyCosts: readinessOptions[2],
  canMaintainAfterHandover: readinessOptions[2],
  anythingElse: "",
  privacyAcknowledged: false,
  termsAccepted: false,
  accuracyDeclared: false,
  honeypot: "",
  turnstileToken: "",
};

export type ImpactBuildStepId = "applicant" | "organisation" | "project" | "readiness" | "consent" | "review";

export const impactBuildStepFieldGroups: Record<Exclude<ImpactBuildStepId, "review">, (keyof ImpactBuildApplicationValues)[]> = {
  applicant: ["fullName", "email", "phone", "country", "preferredContact"],
  organisation: [
    "organisationName",
    "organisationType",
    "existingWebsite",
    "organisationDescription",
    "primaryAreaOfWork",
  ],
  project: [
    "requestedProjectType",
    "problemToSolve",
    "intendedUsers",
    "whyItMatters",
    "whatCurrentlyExists",
    "desiredResult",
    "essentialFeatures",
    "contentAvailable",
    "preferredTimeline",
  ],
  readiness: [
    "decisionMakerRole",
    "canParticipateInDiscovery",
    "canProvideContent",
    "canCoverThirdPartyCosts",
    "canMaintainAfterHandover",
    "anythingElse",
  ],
  consent: ["privacyAcknowledged", "termsAccepted", "accuracyDeclared"],
};
