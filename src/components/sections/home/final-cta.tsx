import { Mail, MessageCircle } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/content/site-config";

export function FinalCta() {
  return (
    <Section tone="ink" className="bg-grid-ink relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,color-mix(in_srgb,var(--color-teal)_14%,transparent),transparent)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 hidden -translate-x-1/2 select-none whitespace-nowrap text-[10rem] font-semibold leading-none text-ink-foreground/[0.04] sm:block sm:text-[13rem]"
      >
        KIPEO
      </span>

      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="text-display-1 text-ink-foreground">Tell us what needs to work better.</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-lg text-ink-muted">
            Share the problem or idea. We&apos;ll review it and prepare a free, no-obligation
            proposal.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" variant="accent" size="lg" tone="ink">
              Start a project
            </Button>
            <Button href={`mailto:${siteConfig.email}`} variant="outline" size="lg" tone="ink">
              <Mail className="h-4 w-4" aria-hidden />
              Email Kipeo
            </Button>
            <Button href={siteConfig.whatsappHref} variant="outline" size="lg" tone="ink">
              <MessageCircle className="h-4 w-4" aria-hidden />
              {siteConfig.whatsappLabel}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
