const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileCheck = { passed: boolean; reason?: string };

/**
 * Turnstile is optional, activating only once both `TURNSTILE_SECRET_KEY`
 * (server) and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (client, read by
 * `src/components/ui/turnstile.tsx`) are configured — see
 * docs/contact-form-setup.md. When the secret key isn't set, verification is
 * skipped outright rather than "silently disabled": it was never enabled to
 * begin with, and the honeypot, rate limiter and origin check still apply.
 */
export async function verifyTurnstileToken(token: string, remoteIp: string): Promise<TurnstileCheck> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { passed: true };

  if (!token) return { passed: false, reason: "missing-token" };

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) return { passed: false, reason: "verify-request-failed" };

    const result = (await response.json()) as { success?: boolean };
    return result.success ? { passed: true } : { passed: false, reason: "verify-rejected" };
  } catch {
    return { passed: false, reason: "verify-error" };
  }
}
