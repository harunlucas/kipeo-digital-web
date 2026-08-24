import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { investmentPoints } from "@/content/services-page";

export function InvestmentSection() {
  return (
    <Section id="investment" tone="elevated">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Investment and scope</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display-2 mt-4 text-paper-foreground">Priced against the problem, not a price list.</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-3 text-base text-slate sm:text-lg">
            We don&apos;t publish fixed prices, because no two projects on this page are actually the same size. Here&apos;s
            how scoping and investment work instead.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {investmentPoints.map((point, index) => (
          <Reveal key={point.title} delay={0.06 + index * 0.04}>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-strong" aria-hidden />
              <div>
                <p className="font-medium text-paper-foreground">{point.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate">{point.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
