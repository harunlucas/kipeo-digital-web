/**
 * Split out from `src/lib/insights.ts` because that module also imports
 * `node:fs`/`node:path` to read the content directory — fine for the server
 * components that call it, but any client component that shows a date
 * (as the former client-side Insights filter grid did) would pull `node:fs`
 * into a browser bundle and fail the build. This formatter has no
 * server-only dependencies.
 */
export function formatInsightDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
}
