import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { capabilityGroups } from "@/content/capabilities";

const fragmentLines = [
  { width: "70%", tone: "text-teal" },
  { width: "45%", tone: "text-ink-muted" },
  { width: "85%", tone: "text-highlight" },
  { width: "55%", tone: "text-ink-muted" },
  { width: "38%", tone: "text-teal" },
];

export function Capabilities() {
  return (
    <Section tone="ink" className="bg-grid-ink relative overflow-hidden">
      <div
        aria-hidden
        className="animate-spotlight pointer-events-none absolute -top-40 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-teal/10 blur-[110px]"
      />

      <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="max-w-md">
          <Reveal>
            <Eyebrow tone="ink">Capability</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-display-2 mt-4 text-ink-foreground">
              Technical capability, explained plainly.
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <div
              aria-hidden
              className="mt-8 hidden w-64 rounded-xl border border-ink-elevated bg-ink-elevated/60 p-5 font-mono text-xs backdrop-blur sm:block"
            >
              {fragmentLines.map((line, index) => (
                <div key={index} className="mb-2.5 flex items-center gap-2 last:mb-0">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink-muted/50" />
                  <span className={`h-2 rounded-full bg-current opacity-70 ${line.tone}`} style={{ width: line.width }} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          {capabilityGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08}>
              <div className="border-t border-ink-elevated pt-5">
                <h3 className="text-sm font-medium text-ink-foreground">{group.title}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-ink-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
