import { siteConfig } from "@/content/site-config";

/** Shared by every API route that accepts a public form submission (`/api/contact`, `/api/impact-build`, ...). */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // not every legitimate same-site request sends one
  if (process.env.NODE_ENV !== "production") return true;

  try {
    return new URL(origin).origin === new URL(siteConfig.url).origin;
  } catch {
    return false;
  }
}
