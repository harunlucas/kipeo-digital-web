import type { ReactNode } from "react";
import { Container } from "./container";

type SectionTone = "paper" | "ink" | "elevated";

const toneClasses: Record<SectionTone, string> = {
  paper: "bg-paper text-paper-foreground",
  ink: "bg-ink text-ink-foreground",
  elevated: "bg-paper-elevated text-paper-foreground",
};

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export function Section({
  id,
  tone = "paper",
  className = "",
  containerClassName = "",
  children,
}: SectionProps) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${toneClasses[tone]} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
