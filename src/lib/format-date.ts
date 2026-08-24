/**
 * Split out from `src/lib/insights.ts` because that module also imports
 * `node:fs`/`node:path` to read the content directory — fine for the server
 * components that call it, but `InsightCard` is rendered directly by the
 * client-side `InsightsGrid`, and pulling `node:fs` into a browser bundle
 * fails the build. This formatter has no server-only dependencies.
 */
export function formatInsightDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
