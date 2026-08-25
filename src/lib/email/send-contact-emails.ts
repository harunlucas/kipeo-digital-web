import { sendBrevoEmail, BrevoConfigError } from "@/lib/email/brevo-client";
import { buildConfirmationEmail, buildInternalNotificationEmail } from "@/lib/email/contact-email-templates";
import type { ContactFormValues } from "@/lib/contact-schema";
import { siteConfig } from "@/content/site-config";

export class ContactEmailNotConfiguredError extends Error {}

/**
 * The internal notification (to Kipeo) is what actually delivers the lead,
 * so its failure fails the whole submission — the API route must not report
 * success unless Kipeo will actually see the enquiry. The confirmation
 * email (to the sender) is attempted afterwards but doesn't block success;
 * its failure is the caller's problem to log, not the sender's to see.
 */
export async function sendContactEmails(data: ContactFormValues, submittedAt: Date): Promise<{ confirmationSent: boolean }> {
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!fromEmail || !toEmail) {
    throw new ContactEmailNotConfiguredError(
      "CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL must both be configured to send contact-form email.",
    );
  }

  const internal = buildInternalNotificationEmail(data, submittedAt);
  await sendBrevoEmail({
    sender: { email: fromEmail, name: siteConfig.name },
    to: [{ email: toEmail }],
    replyTo: { email: data.email, name: data.fullName },
    subject: internal.subject,
    htmlContent: internal.html,
    textContent: internal.text,
  });

  let confirmationSent = false;
  try {
    const confirmation = buildConfirmationEmail(data);
    await sendBrevoEmail({
      sender: { email: fromEmail, name: siteConfig.name },
      to: [{ email: data.email, name: data.fullName }],
      subject: confirmation.subject,
      htmlContent: confirmation.html,
      textContent: confirmation.text,
    });
    confirmationSent = true;
  } catch (error) {
    console.error("Contact form: confirmation email failed to send", error instanceof Error ? error.message : error);
  }

  return { confirmationSent };
}

export { BrevoConfigError };
