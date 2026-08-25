const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export type BrevoEmailPayload = {
  sender: { email: string; name?: string };
  to: { email: string; name?: string }[];
  replyTo?: { email: string; name?: string };
  subject: string;
  htmlContent: string;
  textContent: string;
};

export class BrevoConfigError extends Error {}
export class BrevoDeliveryError extends Error {}

/**
 * Thin wrapper over Brevo's transactional email HTTP API — no SDK, so the
 * project doesn't take on a dependency for two email calls. Brevo is the
 * only transactional-email provider referenced in this project; nothing
 * else is configured, and this is the one the brief names as the example
 * to prefer.
 */
export async function sendBrevoEmail(payload: BrevoEmailPayload): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new BrevoConfigError("BREVO_API_KEY is not configured.");
  }

  const response = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new BrevoDeliveryError(`Brevo responded with status ${response.status}.`);
  }
}
