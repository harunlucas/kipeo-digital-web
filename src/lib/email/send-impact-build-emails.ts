import { sendBrevoEmail, BrevoConfigError } from "@/lib/email/brevo-client";
import { buildConfirmationEmail, buildInternalNotificationEmail } from "@/lib/email/impact-build-email-templates";
import type { ImpactBuildApplicationValues } from "@/lib/impact-build-schema";
import { siteConfig } from "@/content/site-config";

export class ImpactBuildEmailNotConfiguredError extends Error {}

/**
 * Same asymmetry as `sendContactEmails`: the internal notification is what
 * actually delivers the application to Kipeo, so its failure fails the whole
 * submission. The confirmation email to the applicant is best-effort.
 * Reuses the contact form's `CONTACT_FROM_EMAIL`/`CONTACT_TO_EMAIL` — the
 * Impact Build has no dedicated inbox of its own.
 */
export async function sendImpactBuildEmails(
  data: ImpactBuildApplicationValues,
  reference: string,
  submittedAt: Date,
): Promise<{ confirmationSent: boolean }> {
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!fromEmail || !toEmail) {
    throw new ImpactBuildEmailNotConfiguredError(
      "CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL must both be configured to send Impact Build application email.",
    );
  }

  // CONTACT_FROM_NAME is the display name Brevo shows for the sender; falls
  // back to the site name if not yet configured, rather than failing.
  const fromName = process.env.CONTACT_FROM_NAME || siteConfig.name;

  const internal = buildInternalNotificationEmail(data, reference, submittedAt);
  await sendBrevoEmail({
    sender: { email: fromEmail, name: fromName },
    to: [{ email: toEmail }],
    replyTo: { email: data.email, name: data.fullName },
    subject: internal.subject,
    htmlContent: internal.html,
    textContent: internal.text,
  });

  let confirmationSent = false;
  try {
    const confirmation = buildConfirmationEmail(data, reference);
    await sendBrevoEmail({
      sender: { email: fromEmail, name: fromName },
      to: [{ email: data.email, name: data.fullName }],
      subject: confirmation.subject,
      htmlContent: confirmation.html,
      textContent: confirmation.text,
    });
    confirmationSent = true;
  } catch (error) {
    console.error("Impact Build form: confirmation email failed to send", error instanceof Error ? error.message : error);
  }

  return { confirmationSent };
}

export { BrevoConfigError };
