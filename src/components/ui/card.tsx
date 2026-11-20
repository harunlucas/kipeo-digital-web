import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardTone = "paper" | "mist" | "ink";
type CardPadding = "sm" | "md" | "lg";

type CardProps = {
  tone?: CardTone;
  padding?: CardPadding;
  href?: string;
  className?: string;
  children: ReactNode;
};

const toneClasses: Record<CardTone, string> = {
  paper: "border border-neutral-200 bg-paper shadow-card",
  mist: "bg-mist",
  ink: "border border-ink-elevated bg-ink-elevated",
};

const paddingClasses: Record<CardPadding, string> = {
  sm: "p-5",
  md: "p-6 sm:p-7",
  lg: "p-8 sm:p-10",
};

/** Base surface used by work, service, team and testimonial cards. */
export function Card({ tone = "paper", padding = "md", href, className = "", children }: CardProps) {
  const classes = cn("rounded-2xl", toneClasses[tone], paddingClasses[padding], className);

  if (href) {
    return (
      <Link href={href} className={cn(classes, "block transition-shadow duration-200 hover:shadow-panel")}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
