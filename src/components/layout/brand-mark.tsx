import { cn } from "@/lib/cn";

type BrandTone = "on-light" | "on-dark";

type BrandMarkProps = {
  className?: string;
  tone?: BrandTone;
};

/**
 * Geometric monogram: three connected nodes rising to an apex, reading as
 * both a network (connection) and an ascending line (progress) — a nod to
 * "kipeo" (Kiswahili for a peak or apex, see `siteConfig.originStory`).
 * `on-light` sits on Paper surfaces (header, favicon); `on-dark` inverts the
 * fill/glyph pairing so it still reads clearly against the Ink footer.
 */
export function BrandMark({ className, tone = "on-light" }: BrandMarkProps) {
  const isDark = tone === "on-dark";

  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden className={cn("shrink-0", className)}>
      <rect x="1" y="1" width="30" height="30" rx="9" className={isDark ? "fill-teal" : "fill-ink"} />
      <path
        d="M8.5 22.5 16 15.5 23.5 8.5"
        className={isDark ? "stroke-ink" : "stroke-teal"}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="8.5" cy="22.5" r="2.4" className={isDark ? "fill-ink" : "fill-teal"} />
      <circle cx="16" cy="15.5" r="2.4" className={isDark ? "fill-ink" : "fill-teal"} />
      <circle cx="23.5" cy="8.5" r="2.4" className={isDark ? "fill-ink" : "fill-teal"} />
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
