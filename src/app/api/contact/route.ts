import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";
import { isRateLimited } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sendContactEmails, ContactEmailNotConfiguredError } from "@/lib/email/send-contact-emails";
import { siteConfig } from "@/content/site-config";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;
const GENERIC_ERROR_MESSAGE = `We couldn't send your enquiry. Please try again or email ${siteConfig.email}.`;

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // not every legitimate same-site request sends one
  if (process.env.NODE_ENV !== "production") return true;

  try {
    return new URL(origin).origin === new URL(siteConfig.url).origin;
  } catch {
    return false;
  }
}

function blocked(status: number, log: string): Response {
  console.warn(`Contact form: request blocked (${log})`);
  return NextResponse.json({ ok: false, kind: "blocked", message: GENERIC_ERROR_MESSAGE }, { status });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) return blocked(403, "origin mismatch");

  const ip = clientIp(request);
  if (isRateLimited(ip)) return blocked(429, "rate limited");

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return blocked(413, "payload too large");

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return blocked(413, "payload too large");
    raw = JSON.parse(text);
  } catch {
    return blocked(400, "invalid JSON");
  }

  if (typeof raw === "object" && raw !== null && "honeypot" in raw && (raw as { honeypot?: unknown }).honeypot) {
    return blocked(400, "honeypot triggered");
  }

  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, kind: "validation", fieldErrors, message: "Please check the highlighted fields." },
      { status: 422 },
    );
  }

  const data = parsed.data;

  const turnstile = await verifyTurnstileToken(data.turnstileToken ?? "", ip);
  if (!turnstile.passed) return blocked(400, `turnstile: ${turnstile.reason}`);

  try {
    const { confirmationSent } = await sendContactEmails(data, new Date());
    return NextResponse.json({ ok: true, confirmationSent });
  } catch (error) {
    if (error instanceof ContactEmailNotConfiguredError) {
      console.error("Contact form: email delivery is not configured (missing CONTACT_FROM_EMAIL/CONTACT_TO_EMAIL/BREVO_API_KEY)");
    } else {
      console.error("Contact form: email delivery failed", error instanceof Error ? error.message : "unknown error");
    }
    return NextResponse.json({ ok: false, kind: "server", message: GENERIC_ERROR_MESSAGE }, { status: 502 });
  }
}
