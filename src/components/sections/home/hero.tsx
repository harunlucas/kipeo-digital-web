import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { HeroVisual } from "@/components/motion/hero-visual";
import { siteConfig } from "@/content/site-config";

const trustPoints = ["Nairobi-based", "Working worldwide", "Free initial proposal"];

export function Hero() {
  return (
    <section className="bg-grid-paper relative overflow-hidden bg-paper pb-24 pt-16 sm:pb-32 sm:pt-20">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_0%,var(--color-teal-tint),transparent)]"
      />
      <span
        aria-hidden
        className="text-display-1 pointer-events-none absolute -left-6 top-20 select-none text-[9rem] font-semibold leading-none text-paper-foreground/[0.03] sm:text-[13rem]"
      >
        K
      </span>

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div>
            <Reveal>
              <Eyebrow>Software &amp; digital studio</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-display-1 text-sheen mt-6">
                Websites and software
                <br />
                built to run your business
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
                {siteConfig.name} designs websites, applications and digital systems that help
                organisations operate, sell and grow more effectively.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button href="/contact" variant="primary" size="lg">
                  Start a project
                </Button>
                <Button href="/work" variant="outline" size="lg">
                  Explore our work
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <ul className="mt-12 flex flex-col gap-3 border-t border-neutral-200 pt-8 sm:flex-row sm:gap-8">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-slate">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-strong" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:-mr-10 xl:-mr-16">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
