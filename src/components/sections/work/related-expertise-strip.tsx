import { ExternalLink } from "lucide-react";
import { Section } from "@/components/layout/section";
import type { SpecialistExpertiseLink } from "@/content/work";

/**
 * A quiet, text-only closing strip — no screenshots or logos — so
 * CynthiaMueni.com and HarunLucas.com read as brief supporting context,
 * never as Kipeo client projects or a second portfolio.
 */
export function RelatedExpertiseStrip({ links }: { links: SpecialistExpertiseLink[] }) {
  return (
    <Section tone="elevated" className="py-8 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <p className="text-sm font-semibold text-paper-foreground">Related specialist expertise</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-muted">
            Independent specialist platforms connected to members of the wider Kipeo team.
          </p>
        </div>
        <ul className="flex flex-col gap-2 sm:items-end">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-slate hover:text-paper-foreground"
              >
                {link.label}
                <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
