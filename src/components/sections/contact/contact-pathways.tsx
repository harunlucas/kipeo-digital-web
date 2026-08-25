import { contactPathways } from "@/content/contact";
import { Reveal } from "@/components/motion/reveal";

export function ContactPathways() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {contactPathways.map((pathway, index) => {
        const Icon = pathway.icon;
        return (
          <Reveal key={pathway.id} delay={0.04 + index * 0.04}>
            <a
              href={pathway.href}
              {...(pathway.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`flex min-h-11 items-center gap-3 rounded-xl border px-4 py-3 transition-colors duration-150 ${
                pathway.prominent
                  ? "border-teal-strong/35 bg-teal-tint hover:border-teal-strong/60"
                  : "border-neutral-200 bg-paper hover:border-teal-strong/40 hover:bg-paper-elevated"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  pathway.prominent ? "bg-teal-strong text-white" : "bg-teal-tint text-teal-strong"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-muted">{pathway.label}</span>
                <span className="text-sm font-medium text-paper-foreground">{pathway.value}</span>
              </span>
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}
