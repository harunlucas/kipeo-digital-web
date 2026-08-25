/**
 * In-memory, fixed-window rate limiter — deliberately simple since the
 * project has no Redis/KV store configured. Good enough as a defense layer
 * on a single serverless instance; on Vercel each cold instance starts its
 * own counter, so this isn't a hard guarantee under scale-out. It sits
 * alongside the honeypot, origin check and Turnstile (when configured), not
 * as the only line of defense. See docs/contact-form-setup.md.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

/** Evicts stale entries so the map doesn't grow unbounded between requests. */
function sweep(now: number) {
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key);
  }
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  sweep(now);

  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}
