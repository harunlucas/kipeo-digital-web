import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/content/projects";

export function InDevelopmentSystems() {
  const placeholders = projects.filter((project) => project.status === "placeholder");
  if (placeholders.length === 0) return null;

  return (
    <Section tone="elevated">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Also in development</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display-2 mt-4 text-paper-foreground">More systems on the way.</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-3 text-base text-slate sm:text-lg">
            A few additional systems are in active development. Details are published once there&apos;s an
            approved, verifiable case study to share.
          </p>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {placeholders.map((project) => (
          <Reveal key={project.slug} delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-dashed border-neutral-300 bg-paper p-5">
              <span className="w-fit rounded-full border border-neutral-200 px-2.5 py-0.5 text-[11px] font-medium text-slate-muted">
                {project.category}
              </span>
              <h3 className="mt-3 text-base font-semibold text-paper-foreground">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-muted">{project.problem}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
