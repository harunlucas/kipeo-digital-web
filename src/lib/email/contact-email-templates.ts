import type { ContactFormValues } from "@/lib/contact-schema";
import { enquiryServiceLabels } from "@/content/enquiry";
import { escapeHtml } from "@/lib/escape-html";
import { row, wrap } from "@/lib/email/template-helpers";
import { siteConfig } from "@/content/site-config";

type EmailContent = { subject: string; html: string; text: string };

function serviceLabel(data: ContactFormValues): string {
  return data.service ? enquiryServiceLabels[data.service] : "";
}

/** Sent to Kipeo. `replyTo` on the outer email is set to the sender's own address so a reply goes straight to them. */
export function buildInternalNotificationEmail(data: ContactFormValues, submittedAt: Date): EmailContent {
  const rows = [
    ["Submitted", submittedAt.toISOString()],
    ["Name", data.fullName],
    ["Email", data.email],
    ["Service of interest", serviceLabel(data)],
  ]
    .map(([label, value]) => row(label, value))
    .join("");

  const subject = `New Kipeo project enquiry — ${data.fullName}`;

  const html = wrap(
    subject,
    `<table role="presentation" style="border-collapse:collapse;width:100%;margin-bottom:16px;">${rows}</table>
     <p style="font-size:13px;color:#6b7580;margin:0 0 4px;">Project details</p>
     <p style="font-size:14px;color:#14171a;white-space:pre-wrap;border-left:2px solid #14b8a6;padding-left:12px;">${escapeHtml(data.projectSummary)}</p>`,
  );

  const text = [
    subject,
    `Submitted: ${submittedAt.toISOString()}`,
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Service of interest: ${serviceLabel(data) || "—"}`,
    "",
    "Project details:",
    data.projectSummary,
  ].join("\n");

  return { subject, html, text };
}

/** Sent to the person who submitted the form. No marketing subscription language, no invented response deadline. */
export function buildConfirmationEmail(data: ContactFormValues): EmailContent {
  const summaryRows = row("Service of interest", serviceLabel(data));

  const html = wrap(
    "We've received your enquiry",
    `<p style="font-size:14px;color:#14171a;line-height:1.6;">Hello ${escapeHtml(data.fullName)},</p>
     <p style="font-size:14px;color:#14171a;line-height:1.6;">
       Thank you for contacting ${escapeHtml(siteConfig.name)}. We'll review your enquiry and reply to this email
       address.
     </p>
     <p style="font-size:14px;color:#14171a;line-height:1.6;">
       The initial consultation is free. Where the project is a suitable fit, the written proposal is also provided
       without obligation.
     </p>
     <table role="presentation" style="border-collapse:collapse;width:100%;margin:16px 0;">${summaryRows}</table>
     <p style="font-size:13px;color:#6b7580;margin:0 0 4px;">Your project details</p>
     <p style="font-size:14px;color:#14171a;white-space:pre-wrap;border-left:2px solid #14b8a6;padding-left:12px;margin:0 0 20px;">${escapeHtml(data.projectSummary)}</p>
     <p style="font-size:13px;color:#6b7580;line-height:1.6;">
       If anything changes or you'd like to add detail in the meantime, reply to this email, call
       ${escapeHtml(siteConfig.phone)}, or message us on WhatsApp.
     </p>
     <p style="font-size:12px;color:#9aa0a6;margin-top:24px;">${escapeHtml(siteConfig.name)} · ${escapeHtml(siteConfig.location)} · ${escapeHtml(siteConfig.email)}</p>`,
  );

  const text = [
    `Hello ${data.fullName},`,
    "",
    `Thank you for contacting ${siteConfig.name}. We'll review your enquiry and reply to this email address.`,
    "",
    "The initial consultation is free. Where the project is a suitable fit, the written proposal is also provided without obligation.",
    "",
    `Service of interest: ${serviceLabel(data) || "—"}`,
    "",
    "Your project details:",
    data.projectSummary,
    "",
    `If anything changes, reply to this email, call ${siteConfig.phone}, or message us on WhatsApp.`,
    "",
    `${siteConfig.name} · ${siteConfig.location} · ${siteConfig.email}`,
  ].join("\n");

  return { subject: `We've received your enquiry — ${siteConfig.name}`, html, text };
}
