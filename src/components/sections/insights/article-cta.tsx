import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * The single contextual CTA each launch article ends with, used directly
 * inside its `.mdx` body via `<ArticleCta />` (registered in
 * `src/mdx-components.tsx`). Kept out of the educational content itself —
 * articles answer the title first, this is the one commercial note at the end.
 */
export function ArticleCta({ heading, body, href, label }: { heading: string; body: string; href: string; label: string }) {
  return (
    <div className="mt-10 rounded-2xl border border-teal-strong/25 bg-teal-tint p-6 sm:p-7">
      <h3 className="text-lg font-semibold text-paper-foreground">{heading}</h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate">{body}</p>
      <Button href={href} variant="primary" className="mt-5">
        {label}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </Button>
    </div>
  );
}
