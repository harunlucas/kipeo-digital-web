import { contactProcessSteps } from "@/content/contact";
import { Reveal } from "@/components/motion/reveal";

export function ContactProcess() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-paper-foreground">What happens next</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-slate">
        Not every enquiry automatically receives a proposal — some need clarification first, and some may not fit
        what Kipeo builds.
      </p>
      <ol className="mt-5 flex flex-col gap-4">
        {contactProcessSteps.map((step, index) => (
          <Reveal key={step.number} delay={0.04 + index * 0.04}>
            <li className="flex gap-3.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-teal-strong/30 bg-teal-tint font-mono text-xs font-medium text-teal-strong">
                {step.number}
              </span>
              <div>
                <p className="text-sm font-semibold text-paper-foreground">{step.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-slate">{step.description}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
