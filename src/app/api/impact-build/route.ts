import { NextResponse } from "next/server";
import { impactBuildApplicationSchema } from "@/lib/impact-build-schema";
import { isRateLimited } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { generateImpactBuildReference } from "@/lib/generate-reference";
import {
  sendImpactBuildEmails,
  ImpactBuildEmailNotConfiguredError,
} from "@/lib/email/send-impact-build-emails";
import { clientIp, isAllowedOrigin } from "@/lib/request-guards";
import { impactBuildConfig } from "@/content/impact-build";
import { siteConfig } from "@/content/site-config";

export const runtime = "nodejs";

// Larger than /api/contact's cap since this form carries more fields.
const MAX_BODY_BYTES = 40_000;
// Stricter than the ordinary contact form (5 per 10 min) — a distinct,
// namespaced rate-limit key so the two forms never share one budget.
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, maxRequests: 2 };
const GENERIC_ERROR_MESSAGE = `We couldn't send your application. Please try again or email ${siteConfig.email}.`;

function blocked(status: number, log: string): Response {
  console.warn(`Impact Build form: request blocked (${log})`);
  return NextResponse.json({ ok: false, kind: "blocked", message: GENERIC_ERROR_MESSAGE }, { status });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) return blocked(403, "origin mismatch");

  // The apply page only renders the form while status is "open", but this
  // route is directly POST-reachable regardless of what the UI shows, so it
  // must independently refuse submissions outside an open cycle.
  if (impactBuildConfig.status !== "open") return blocked(403, "applications not open");

  const ip = clientIp(request);
  if (isRateLimited(`impact-build:${ip}`, RATE_LIMIT)) return blocked(429, "rate limited");

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

  const parsed = impactBuildApplicationSchema.safeParse(raw);
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

  const reference = generateImpactBuildReference();

  try {
    const { confirmationSent } = await sendImpactBuildEmails(data, reference, new Date());
    return NextResponse.json({ ok: true, reference, confirmationSent });
  } catch (error) {
    if (error instanceof ImpactBuildEmailNotConfiguredError) {
      console.error("Impact Build form: email delivery is not configured (missing CONTACT_FROM_EMAIL/CONTACT_TO_EMAIL/BREVO_API_KEY)");
    } else {
      console.error("Impact Build form: email delivery failed", error instanceof Error ? error.message : "unknown error");
    }
    return NextResponse.json({ ok: false, kind: "server", message: GENERIC_ERROR_MESSAGE }, { status: 502 });
  }
}
