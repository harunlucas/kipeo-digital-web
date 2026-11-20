import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

type SectionHeadingSize = "display-1" | "display-2" | "display-3";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "paper" | "ink";
  size?: SectionHeadingSize;
  maxWidth?: string;
  immediate?: boolean;
  className?: string;
};

const sizeClasses: Record<SectionHeadingSize, string> = {
  "display-1": "text-display-1",
  "display-2": "text-display-2",
  "display-3": "text-display-3",
};

/**
 * Eyebrow + title + optional intro, used by every homepage section so the
 * entrance animation (Reveal, staggered) and heading rhythm stay identical
 * across sections instead of being hand-rolled per section.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "paper",
  size = "display-2",
  maxWidth = "max-w-2xl",
  immediate = false,
  className = "",
}: SectionHeadingProps) {
  const titleColor = tone === "ink" ? "text-ink-foreground" : "text-paper-foreground";
  const introColor = tone === "ink" ? "text-ink-muted" : "text-slate";

  return (
    <div className={cn(maxWidth, className)}>
      <Reveal immediate={immediate}>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal immediate={immediate} delay={0.08}>
        <h2 className={cn(sizeClasses[size], "mt-4", titleColor)}>{title}</h2>
      </Reveal>
      {intro ? (
        <Reveal immediate={immediate} delay={0.14}>
          <p className={cn("mt-3 text-base sm:text-lg", introColor)}>{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
