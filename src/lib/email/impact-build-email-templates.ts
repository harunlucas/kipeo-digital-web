import type { ImpactBuildApplicationValues } from "@/lib/impact-build-schema";
import { escapeHtml } from "@/lib/escape-html";
import { row, wrap } from "@/lib/email/template-helpers";
import { siteConfig } from "@/content/site-config";
import { impactBuildConfig } from "@/content/impact-build";

type EmailContent = { subject: string; html: string; text: string };

/**
 * Sent to Kipeo. Never includes Turnstile tokens, IP addresses or other
 * secrets — those never reach this function in the first place. `replyTo` on
 * the outer email is set to the applicant's own address.
 */
export function buildInternalNotificationEmail(
  data: ImpactBuildApplicationValues,
  reference: string,
  submittedAt: Date,
): EmailContent {
  const rows = [
    ["Reference", reference],
    ["Submitted", submittedAt.toISOString()],
    ["Full name", data.fullName],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone],
    ["Country", data.country],
    ["Preferred contact", data.preferredContact],
    ["Organisation / initiative", data.organisationName],
    ["Organisation type", data.organisationType],
    ["Existing website", data.existingWebsite || ""],
    ["Primary area of work", data.primaryAreaOfWork],
    ["Requested project type", data.requestedProjectType],
    ["Content currently available", data.contentAvailable],
    ["Preferred timeline", data.preferredTimeline],
    ["Decision-maker", data.decisionMakerRole],
    ["Can participate in discovery/reviews", data.canParticipateInDiscovery],
    ["Can provide content", data.canProvideContent],
    ["Can cover approved third-party costs", data.canCoverThirdPartyCosts],
    ["Can maintain after handover", data.canMaintainAfterHandover],
    ["Privacy acknowledged", data.privacyAcknowledged ? "Yes" : "No"],
    ["Programme terms accepted", data.termsAccepted ? "Yes" : "No"],
    ["Accuracy declared", data.accuracyDeclared ? "Yes" : "No"],
  ]
    .map(([label, value]) => row(label, value))
    .join("");

  const longAnswers: [string, string][] = [
    ["Organisation description", data.organisationDescription],
    ["Problem to be solved", data.problemToSolve],
    ["Who will use or benefit", data.intendedUsers],
    ["Why the project matters", data.whyItMatters],
    ["What currently exists", data.whatCurrentlyExists || "—"],
    ["Desired result", data.desiredResult],
    ["Essential features", data.essentialFeatures],
    ["Anything else", data.anythingElse || "—"],
  ];

  const longAnswersHtml = longAnswers
    .map(
      ([label, value]) =>
        `<p style="font-size:13px;color:#6b7580;margin:16px 0 4px;">${escapeHtml(label)}</p>
         <p style="font-size:14px;color:#14171a;white-space:pre-wrap;border-left:2px solid #14b8a6;padding-left:12px;margin:0;">${escapeHtml(value)}</p>`,
    )
    .join("");

  const subject = `New Kipeo Impact Build application — ${reference}`;

  const html = wrap(
    subject,
    `<table role="presentation" style="border-collapse:collapse;width:100%;margin-bottom:8px;">${rows}</table>${longAnswersHtml}`,
  );

  const text = [
    subject,
    `Submitted: ${submittedAt.toISOString()}`,
    `Full name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone}`,
    `Country: ${data.country}`,
    `Preferred contact: ${data.preferredContact}`,
    `Organisation / initiative: ${data.organisationName}`,
    `Organisation type: ${data.organisationType}`,
    `Existing website: ${data.existingWebsite || "—"}`,
    `Primary area of work: ${data.primaryAreaOfWork}`,
    `Requested project type: ${data.requestedProjectType}`,
    `Content currently available: ${data.contentAvailable}`,
    `Preferred timeline: ${data.preferredTimeline}`,
    `Decision-maker: ${data.decisionMakerRole}`,
    `Can participate in discovery/reviews: ${data.canParticipateInDiscovery}`,
    `Can provide content: ${data.canProvideContent}`,
    `Can cover approved third-party costs: ${data.canCoverThirdPartyCosts}`,
    `Can maintain after handover: ${data.canMaintainAfterHandover}`,
    `Privacy acknowledged: ${data.privacyAcknowledged ? "Yes" : "No"}`,
    `Programme terms accepted: ${data.termsAccepted ? "Yes" : "No"}`,
    `Accuracy declared: ${data.accuracyDeclared ? "Yes" : "No"}`,
    "",
    ...longAnswers.flatMap(([label, value]) => [`${label}:`, value, ""]),
  ].join("\n");

  return { subject, html, text };
}

/** Sent to the applicant. No promised decision date unless a review period is configured. No marketing-subscription language. */
export function buildConfirmationEmail(data: ImpactBuildApplicationValues, reference: string): EmailContent {
  const reviewNote = impactBuildConfig.reviewPeriod
    ? ` Applications are typically reviewed within ${impactBuildConfig.reviewPeriod}.`
    : "";

  const html = wrap(
    "Your Impact Build application has been received",
    `<p style="font-size:14px;color:#14171a;line-height:1.6;">Hello ${escapeHtml(data.fullName)},</p>
     <p style="font-size:14px;color:#14171a;line-height:1.6;">
       Thank you for explaining the problem and the work behind ${escapeHtml(data.organisationName)}. Kipeo will assess
       the application against the published Impact Build criteria.${reviewNote}
     </p>
     <table role="presentation" style="border-collapse:collapse;width:100%;margin:16px 0;">${row("Reference", reference)}</table>
     <p style="font-size:14px;color:#14171a;line-height:1.6;">
       Submitting this application does not guarantee selection. Shortlisted applicants may be contacted for further
       information. No project exists, and development does not begin, until a written Impact Build agreement is
       accepted.
     </p>
     <p style="font-size:13px;color:#6b7580;line-height:1.6;">
       If anything essential changes before a decision is made, reply to this email quoting reference ${escapeHtml(reference)}.
     </p>
     <p style="font-size:12px;color:#9aa0a6;margin-top:24px;">${escapeHtml(siteConfig.name)} · ${escapeHtml(siteConfig.location)} · ${escapeHtml(siteConfig.email)}</p>`,
  );

  const text = [
    `Hello ${data.fullName},`,
    "",
    `Thank you for explaining the problem and the work behind ${data.organisationName}. Kipeo will assess the application against the published Impact Build criteria.${reviewNote}`,
    "",
    `Reference: ${reference}`,
    "",
    "Submitting this application does not guarantee selection. Shortlisted applicants may be contacted for further information. No project exists, and development does not begin, until a written Impact Build agreement is accepted.",
    "",
    `If anything essential changes before a decision is made, reply to this email quoting reference ${reference}.`,
    "",
    `${siteConfig.name} · ${siteConfig.location} · ${siteConfig.email}`,
  ].join("\n");

  return { subject: `Kipeo Impact Build application received — ${reference}`, html, text };
}
