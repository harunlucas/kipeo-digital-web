const SAFE_PROTOCOLS = new Set(["http:", "https:"]);
const HAS_SCHEME = /^[a-zA-Z][a-zA-Z\d+.-]*:/;

/**
 * Normalizes a user-entered website URL: a bare domain like "example.com" is
 * assumed to mean "https://example.com", so it's prefixed before parsing.
 * Anything that already looks like it has a scheme is parsed as-is, which is
 * what lets this reject unsafe schemes (javascript:, data:, file:, ...)
 * instead of silently forcing them under https.
 *
 * Returns "" unchanged for an empty value (the field is optional), the
 * normalized absolute URL for a usable one, or null if the value can't be
 * parsed or resolves to anything other than http/https.
 */
export function normalizeWebsiteUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return "";

  const candidate = HAS_SCHEME.test(value) ? value : `https://${value}`;

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    return null;
  }

  if (!SAFE_PROTOCOLS.has(parsed.protocol)) return null;

  return parsed.toString();
}
