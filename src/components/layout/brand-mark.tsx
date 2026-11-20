import { cn } from "@/lib/cn";

type BrandTone = "on-light" | "on-dark";

type BrandMarkProps = {
  className?: string;
  tone?: BrandTone;
};

/**
 * The Kipeo peak ("kipeo": Kiswahili for a peak or apex). One silhouette on
 * a 32-unit square: an off-centre summit with a lower shoulder to its left,
 * and a small upright triangular opening below the summit — the same
 * apex-up aperture cut through the plates of the homepage hero diagram.
 * The opening is a hole (even-odd fill), so whatever surface the mark sits
 * on shows through it.
 *
 * Built for small sizes: straight edges only, and at least ~3 units of
 * solid material around the opening, so the summit and opening still read
 * at 16px (favicon) as well as 32px (header). Shared with the favicon
 * routes in `src/app/icon.tsx` and `src/app/apple-icon.tsx` and the
 * generated `src/app/favicon.ico`.
 */
export const PEAK_SILHOUETTE = "M1.5 28.5 L11 14 L14.5 18 L19.5 3.5 L30.5 28.5 Z";
export const PEAK_OPENING = "M19.5 14 L24.3 23.5 L14.7 23.5 Z";
export const PEAK_PATH = `${PEAK_SILHOUETTE} ${PEAK_OPENING}`;

/** `on-light`: charcoal, for ivory/paper surfaces. `on-dark`: the reversed,
 *  warm-ivory version, for the Ink footer. */
export function BrandMark({ className, tone = "on-light" }: BrandMarkProps) {
  const isDark = tone === "on-dark";

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden className={cn("shrink-0", className)}>
      <path
        d={PEAK_PATH}
        fillRule="evenodd"
        className={isDark ? "fill-ink-foreground" : "fill-paper-foreground"}
      />
    </svg>
  );
}

type WordmarkProps = {
  className?: string;
  tone?: BrandTone;
};

export function Wordmark({ className, tone = "on-light" }: WordmarkProps) {
  const isDark = tone === "on-dark";

  return (
    <span
      className={cn(
        "font-display text-lg font-semibold tracking-tight whitespace-nowrap",
        isDark ? "text-ink-foreground" : "text-paper-foreground",
        className,
      )}
    >
      Kipeo <span className={isDark ? "text-teal" : "text-teal-strong"}>Digital</span>
    </span>
  );
}

type BrandLockupProps = BrandMarkProps & {
  /** Hide the wordmark below `sm` so the mark alone carries narrow mobile headers. */
  compactOnMobile?: boolean;
};

export function BrandLockup({ className, tone = "on-light", compactOnMobile = false }: BrandLockupProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrandMark tone={tone} />
      <Wordmark tone={tone} className={compactOnMobile ? "hidden sm:inline-block" : undefined} />
    </span>
  );
}
