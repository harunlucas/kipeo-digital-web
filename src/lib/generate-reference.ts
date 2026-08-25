import { randomInt } from "node:crypto";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // excludes ambiguous 0/O/1/I

/**
 * Generates a non-sequential `KIB-XXXXXX` application reference. Drawn from
 * `crypto.randomInt`, not derived from any counter or applicant count, so it
 * never reveals how many applications exist.
 */
export function generateImpactBuildReference(): string {
  let suffix = "";
  for (let i = 0; i < 6; i += 1) {
    suffix += CHARS[randomInt(CHARS.length)];
  }
  return `KIB-${suffix}`;
}
