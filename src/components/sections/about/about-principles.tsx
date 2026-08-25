import { Reveal } from "@/components/motion/reveal";
import { principles } from "@/content/about";

/**
 * Five principles as a numbered editorial list rather than five identical
 * cards — a large index numeral, a title and a short line, separated by
 * rules rather than boxes. All content is static text, visible without
 * hovering; the only interaction is the shared `Reveal` scroll-in.
 */
export function AboutPrinciples() {
  return (
    <ol className="divide-y divide-neutral-200 border-y border-neutral-200">
      {principles.map((principle, index) => (
        <Reveal key={principle.number} delay={index * 0.05}>
          <li className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1.5 py-6 sm:grid-cols-[96px_1fr] sm:gap-x-8 sm:py-7">
            <span className="font-mono text-3xl font-light text-teal-strong/60 sm:text-4xl">{principle.number}</span>
            <div>
              <h3 className="text-lg font-semibold text-paper-foreground sm:text-xl">{principle.title}</h3>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate sm:text-base">
                {principle.description}
              </p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
