import { Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site-config";

/**
 * There's no subscription backend behind this site, so rather than ship a
 * form that quietly goes nowhere, this prompts a direct email instead — an
 * honest mechanism that works from day one.
 */
export function InsightsUpdatePrompt() {
  return (
    <Reveal>
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-neutral-200 bg-paper-elevated p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h2 className="text-xl font-semibold text-paper-foreground">New insights, when we publish them.</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate">
            No mailing list yet — email us directly and we&apos;ll let you know when a new article is up.
          </p>
        </div>
        <Button href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Notify me about new Insights articles")}`} variant="outline">
          <Mail className="h-4 w-4" aria-hidden />
          Get notified by email
        </Button>
      </div>
    </Reveal>
  );
}
