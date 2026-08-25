import { CheckCircle2 } from "lucide-react";
import { contactTrustPoints } from "@/content/contact";

export function ContactTrustStrip() {
  return (
    <ul className="flex flex-col gap-2.5 rounded-xl border border-neutral-200 bg-paper-elevated p-5">
      {contactTrustPoints.map((point) => (
        <li key={point} className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-strong" aria-hidden />
          <span className="text-sm leading-relaxed text-slate">{point}</span>
        </li>
      ))}
    </ul>
  );
}
