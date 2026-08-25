import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { serviceGroups, type ServiceGroupIdentity } from "@/content/service-groups";

/**
 * Software-first hierarchy: the three primary build capabilities (bold,
 * elevated cards) read first and largest; SEO and Digital Growth and
 * Integration/Deployment/Support (flatter, more compact cards) support them
 * — visually secondary by styling weight, not by an empty grid cell.
 */
function ServicePanel({ group, size }: { group: ServiceGroupIdentity; size: "primary" | "supporting" }) {
  const Icon = group.icon;
  const isPrimary = size === "primary";

  return (
    <div
      className={
        isPrimary
          ? "flex h-full flex-col rounded-2xl border border-neutral-200 bg-paper p-6 shadow-card sm:p-7"
          : "flex h-full flex-col rounded-2xl bg-mist p-5"
      }
    >
      <span
        className={
          isPrimary
            ? "flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint text-teal-strong"
            : "flex h-9 w-9 items-center justify-center rounded-lg bg-paper text-slate"
        }
      >
        <Icon className={isPrimary ? "h-5 w-5" : "h-4 w-4"} aria-hidden />
      </span>

      <h3 className={isPrimary ? "mt-4 text-xl font-semibold text-paper-foreground" : "mt-3 text-base font-semibold text-paper-foreground"}>
        {group.title}
      </h3>
      <p className={isPrimary ? "mt-2 text-sm leading-relaxed text-slate" : "mt-1.5 text-sm leading-relaxed text-slate"}>
        {group.description}
      </p>

      <ul className={isPrimary ? "mt-4 flex flex-wrap gap-1.5" : "mt-3 flex flex-wrap gap-1.5"}>
        {group.capabilities.slice(0, isPrimary ? 5 : 3).map((capability) => (
          <li
            key={capability}
            className={
              isPrimary
                ? "rounded-full bg-mist px-2.5 py-1 text-[11px] text-slate"
                : "rounded-full bg-paper px-2.5 py-1 text-[11px] text-slate"
            }
          >
            {capability}
          </li>
        ))}
      </ul>

      <Link
        href={group.href}
        className="group/cta mt-5 inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-medium text-teal-strong hover:text-ink"
      >
        Explore {group.shortTitle}
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
          aria-hidden
        />
      </Link>
    </div>
  );
}

export function ServicesIntro() {
  const primaryGroups = serviceGroups.filter((group) => !group.supporting);
  const supportingGroups = serviceGroups.filter((group) => group.supporting);

  return (
    <Section tone="paper">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display-2 mt-4 text-paper-foreground">
            Digital capability, organised around your business.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 text-lg text-slate">
            Start with one service or combine several in a single, clearly scoped project.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {primaryGroups.map((group, index) => (
          <Reveal key={group.id} delay={0.06 + index * 0.05}>
            <ServicePanel group={group} size="primary" />
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {supportingGroups.map((group, index) => (
          <Reveal key={group.id} delay={0.24 + index * 0.05}>
            <ServicePanel group={group} size="supporting" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
