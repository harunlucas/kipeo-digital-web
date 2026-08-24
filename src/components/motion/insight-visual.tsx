import { Cpu, Layers, Package, Scale, Users, Workflow, Database, ShieldCheck, BarChart3, Globe2, ShoppingCart, LayoutGrid, KeyRound } from "lucide-react";

export type InsightVisualVariant =
  | "custom-vs-off-the-shelf"
  | "plan-business-system"
  | "website-vs-web-application";

/**
 * One hand-built SVG/CSS composition per launch article — distinct from
 * every Services/Work visual and from each other, so /insights never repeats
 * imagery already shown elsewhere on the site. Used at featured-article
 * scale and at grid-card scale by the same component; the container decides
 * size via its own aspect ratio.
 */
export function InsightVisual({ variant }: { variant: string }) {
  switch (variant as InsightVisualVariant) {
    // Custom vs off-the-shelf: a balance scale weighing an off-the-shelf
    // package against a custom-built stack — no numbers, just the metaphor.
    case "custom-vs-off-the-shelf":
      return (
        <div className="relative flex h-full w-full items-center justify-center p-6">
          <div className="relative flex w-full max-w-[280px] flex-col items-center">
            <Scale className="h-5 w-5 text-teal" aria-hidden />
            <div className="mt-3 h-px w-full bg-white/15" />
            <div className="mt-6 flex w-full items-end justify-between gap-4">
              <div className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-white/10 bg-ink-elevated/60 px-3 py-4">
                <Package className="h-5 w-5 text-ink-muted" aria-hidden />
                <span className="text-center text-[10px] leading-tight text-ink-muted">Off-the-shelf</span>
              </div>
              <div className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-teal/40 bg-teal/10 px-3 py-5">
                <Layers className="h-5 w-5 text-teal" aria-hidden />
                <span className="text-center text-[10px] leading-tight text-ink-foreground/85">Custom-built</span>
              </div>
            </div>
          </div>
        </div>
      );

    // Planning a business system: a discovery node branching into the
    // areas a proposal needs to cover before development starts.
    case "plan-business-system": {
      const branches = [
        { label: "Users", icon: Users },
        { label: "Workflow", icon: Workflow },
        { label: "Data", icon: Database },
        { label: "Permissions", icon: KeyRound },
      ];
      return (
        <div className="relative flex h-full w-full items-center justify-center p-6">
          <div className="relative grid w-full max-w-[300px] grid-cols-2 gap-2.5 sm:gap-3">
            {branches.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink-elevated/60 px-3 py-2.5"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-teal" aria-hidden />
                <span className="text-[10px] text-ink-muted">{label}</span>
              </div>
            ))}
            <div className="col-span-2 mt-1 flex items-center justify-center gap-2 rounded-lg border border-teal/40 bg-teal/10 px-3 py-2.5">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-teal" aria-hidden />
              <span className="text-[10px] text-ink-foreground/85">Discovery and scope</span>
            </div>
          </div>
        </div>
      );
    }

    // Website vs web application: a spectrum from informational site to
    // full application, rising in complexity left to right.
    case "website-vs-web-application": {
      const points = [
        { label: "Website", icon: Globe2, height: 24 },
        { label: "Store", icon: ShoppingCart, height: 40 },
        { label: "Portal", icon: LayoutGrid, height: 56 },
        { label: "Application", icon: Cpu, height: 72 },
      ];
      return (
        <div className="relative flex h-full w-full items-end justify-center gap-3 p-6 sm:gap-4">
          {points.map(({ label, icon: Icon, height }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className="flex w-11 items-center justify-center rounded-t-lg border border-b-0 border-teal/40 bg-teal/10 sm:w-14"
                style={{ height }}
              >
                <Icon className="h-4 w-4 text-teal" aria-hidden />
              </div>
              <span className="text-center text-[9px] leading-tight text-ink-muted">{label}</span>
            </div>
          ))}
          <BarChart3 className="absolute right-4 top-4 h-4 w-4 text-ink-muted/50" aria-hidden />
        </div>
      );
    }

    default:
      return (
        <div className="flex h-full w-full items-center justify-center p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal/40 bg-teal/10">
            <Layers className="h-6 w-6 text-teal" aria-hidden />
          </div>
        </div>
      );
  }
}
