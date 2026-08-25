import { Plus } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { contactFaq } from "@/content/contact";

export function ContactFaq() {
  return (
    <Section id="faq" tone="elevated">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display-3 mt-3 text-paper-foreground">A few common questions.</h2>
        </Reveal>
      </div>

      <div className="mt-8 divide-y divide-neutral-200 border-t border-neutral-200">
        {contactFaq.map((item, index) => (
          <Reveal key={item.question} delay={Math.min(index * 0.03, 0.24)}>
            <details className="group py-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span className="text-base font-medium text-paper-foreground">{item.question}</span>
                <Plus
                  className="h-5 w-5 shrink-0 text-teal-strong transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate">{item.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
