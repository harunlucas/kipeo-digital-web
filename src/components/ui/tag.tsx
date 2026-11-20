import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagTone = "paper" | "mist" | "ink";

type TagProps = {
  tone?: TagTone;
  className?: string;
  children: ReactNode;
};

const toneClasses: Record<TagTone, string> = {
  paper: "bg-mist text-slate",
  mist: "bg-paper text-slate",
  ink: "bg-ink-elevated text-ink-muted",
};

/** Small pill used for stack/industry tags on work cards. */
export function Tag({ tone = "paper", className = "", children }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
