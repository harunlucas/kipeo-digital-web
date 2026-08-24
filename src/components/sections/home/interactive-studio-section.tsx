import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { KipeoStudio } from "@/components/three/kipeo-studio";

export function InteractiveStudioSection() {
  return (
    <Section tone="ink" className="bg-grid-ink relative overflow-hidden">
      <div
        aria-hidden
        className="animate-spotlight pointer-events-none absolute -top-32 left-1/2 h-80 w-[34rem] -translate-x-1/2 rounded-full bg-teal/10 blur-[110px]"
      />

      <div className="relative max-w-2xl">
        <Reveal>
          <Eyebrow tone="ink">Interactive studio</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display-2 mt-4 text-ink-foreground">Step inside how digital products come together.</h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-3 text-base text-ink-muted sm:text-lg">
            Explore a browser-built workspace where strategy, interface, application logic and infrastructure
            connect.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-3 font-mono text-xs uppercase tracking-wide text-ink-muted">
            Drag to explore &middot; Scroll or pinch to zoom
          </p>
        </Reveal>
      </div>

      <p className="sr-only">
        A low-poly 3D illustration of a digital workstation named the Kipeo Systems Studio: a desk with three
        connected monitors representing website and interface work, application and backend logic, and HSE or
        business-system data; a small commerce and content-management panel; a cluster of connected nodes
        representing data and integrations; a deployment status light; a desk lamp; a small plant; and a
        geometric Kipeo brand object. Five hotspot buttons beside the scene describe each part in plain text,
        so the illustration does not need to be viewed or interacted with to understand Kipeo&apos;s services.
      </p>

      <div className="relative mt-10">
        <Reveal delay={0.24}>
          <KipeoStudio />
        </Reveal>
      </div>
    </Section>
  );
}
