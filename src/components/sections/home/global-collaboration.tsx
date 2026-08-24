import { Globe, MessageSquare, Milestone, Clock } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { SchedulePanel } from "@/components/ui/schedule-panel";
import { siteConfig } from "@/content/site-config";

const commitments = [
  { icon: Globe, text: "Available to work remotely with clients worldwide" },
  { icon: MessageSquare, text: "Structured, agreed communication routines" },
  { icon: Milestone, text: "Documented milestones at every stage" },
  { icon: Clock, text: "Meeting times planned around your timezone" },
];

export function GlobalCollaboration() {
  return (
    <Section tone="paper" className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow>Working together</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-display-2 mt-4 text-paper-foreground">
              Based in Nairobi. Built for collaboration worldwide.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-md text-lg text-slate">
              {siteConfig.serviceArea}. Every engagement is structured for clear, remote
              collaboration from the first enquiry.
            </p>
          </Reveal>

          <ul className="mt-8 flex flex-col gap-4">
            {commitments.map((item, index) => (
              <Reveal key={item.text} delay={0.2 + index * 0.06}>
                <li className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 shrink-0 text-teal-strong" aria-hidden />
                  <span className="text-sm text-paper-foreground">{item.text}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <SchedulePanel />
        </Reveal>
      </div>
    </Section>
  );
}
