import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type AnimatedLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** For an off-site link: opens in a new tab and names the host to screen readers. */
  externalHost?: string;
};

/**
 * The homepage's one text-link interaction ("Explore all services",
 * "Explore our process", "About Kipeo"): on hover or keyboard focus a fine
 * underline draws left to right and the arrow moves 2px along its own
 * diagonal. Under `prefers-reduced-motion` it is a plain underlined link
 * with a still arrow. The global `:focus-visible` ring is left untouched.
 *
 * With `externalHost` it renders a plain anchor that opens in a new tab
 * (the Work pages link out to each project's original write-up).
 */
export function AnimatedLink({ href, children, className, externalHost }: AnimatedLinkProps) {
  const classes = cn(
    "group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-paper-foreground transition-colors hover:text-teal-strong motion-reduce:underline motion-reduce:decoration-paper-foreground/40 motion-reduce:underline-offset-4 sm:text-base",
    className,
  );

  const content = (
    <>
      <span className="relative inline-block">
        {children}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:hidden"
        />
      </span>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-focus-visible:-translate-y-[2px] group-focus-visible:translate-x-[2px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-x-0 motion-reduce:group-focus-visible:translate-y-0"
        aria-hidden
      />
    </>
  );

  if (externalHost) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
        <span className="sr-only">(opens {externalHost} in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
