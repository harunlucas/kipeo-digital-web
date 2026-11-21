import type { ServiceGroupId } from "@/content/service-groups";
import { serviceNavLabels } from "@/content/navigation";

/**
 * "Service of interest" choices for the project enquiry form, shared by the
 * site-wide panel and the inline form on /contact. The five service ids are
 * the same as the /services section anchors, so a service-specific CTA
 * (e.g. "Discuss an operational system") can preselect its own family, and
 * the same id travels in the `/contact?service=…` fallback link.
 */
export const enquiryServiceIds = [
  "software-and-business-systems",
  "operational-and-technical-software",
  "websites-and-commerce",
  "seo-and-digital-growth",
  "integration-deployment-and-support",
  "not-sure",
] as const satisfies readonly (ServiceGroupId | "not-sure")[];

export type EnquiryServiceId = (typeof enquiryServiceIds)[number];

export const enquiryServiceLabels: Record<EnquiryServiceId, string> = {
  ...serviceNavLabels,
  "not-sure": "I’m not sure yet",
};

export const enquiryServiceOptions = enquiryServiceIds.map((id) => ({ id, label: enquiryServiceLabels[id] }));

export function isEnquiryServiceId(value: unknown): value is EnquiryServiceId {
  return typeof value === "string" && (enquiryServiceIds as readonly string[]).includes(value);
}

export const enquiryCopy = {
  heading: "Tell us about your project",
  intro: "What would you like to build or improve, and who will use it?",
  submit: "Send project enquiry",
  submitting: "Sending…",
  success: "Thanks, we’ve received your enquiry.",
} as const;
