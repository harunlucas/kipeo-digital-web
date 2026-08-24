import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "accent" | "outline" | "ghost";
type ButtonTone = "paper" | "ink";
type ButtonSize = "md" | "lg";

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-11 px-7 py-3.5 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 ease-out disabled:opacity-50 disabled:pointer-events-none";

function variantClasses(variant: ButtonVariant, tone: ButtonTone): string {
  switch (variant) {
    case "primary":
      return "bg-teal-strong text-white hover:bg-ink";
    case "accent":
      return "bg-teal text-teal-foreground hover:brightness-95";
    case "outline":
      return tone === "ink"
        ? "border border-ink-muted text-ink-foreground hover:bg-ink-elevated"
        : "border border-neutral-300 text-paper-foreground hover:bg-paper-elevated";
    case "ghost":
      return tone === "ink"
        ? "text-teal hover:text-white"
        : "text-teal-strong hover:text-ink";
  }
}

type CommonProps = {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  tone = "paper",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(baseClasses, sizeClasses[size], variantClasses(variant, tone), className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
