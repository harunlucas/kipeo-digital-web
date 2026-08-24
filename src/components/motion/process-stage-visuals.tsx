"use client";

import { motion, type Variants } from "motion/react";
import {
  AlertCircle,
  Target,
  Users,
  ListChecks,
  FileText,
  LayoutGrid,
  GitBranch,
  Palette,
  Layout,
  Cpu,
  Database,
  Share2,
  Cloud,
  Globe,
  Activity,
  BookOpen,
  LifeBuoy,
  CheckCircle2,
} from "lucide-react";
import type { ProcessVisual } from "@/content/process";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg border border-white/10 bg-ink-elevated/70 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

function Item({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function ProcessStageVisual({
  visual,
  reduceMotion,
}: {
  visual: ProcessVisual;
  reduceMotion: boolean;
}) {
  const motionProps = reduceMotion ? {} : { variants: containerVariants, initial: "hidden", animate: "visible" };
  const Component = visualMap[visual];

  return (
    <motion.div {...motionProps} className="flex h-full flex-col justify-center gap-3">
      <Component reduceMotion={reduceMotion} />
    </motion.div>
  );
}

type VisualProps = { reduceMotion: boolean };

/* ---------------------------------------------------------------- */
/* Discover                                                          */
/* ---------------------------------------------------------------- */

function DiscoverVisual({ reduceMotion }: VisualProps) {
  const nodes = [
    { label: "Problem", icon: AlertCircle },
    { label: "Users", icon: Users },
    { label: "Goal", icon: Target },
  ];

  return (
    <Item className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-6 sm:gap-10">
        {nodes.map((node) => (
          <div key={node.label} className="flex flex-col items-center gap-1.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
              <node.icon className="h-4 w-4" aria-hidden />
              {!reduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-teal"
                  animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wide text-ink-muted">{node.label}</span>
          </div>
        ))}
      </div>
      <div className="h-6 w-px bg-white/15" aria-hidden />
      <span className="inline-flex items-center gap-1.5 rounded-full border border-highlight/30 bg-highlight/10 px-3 py-1 text-[10px] uppercase tracking-wide text-highlight">
        Shared understanding
      </span>
    </Item>
  );
}

/* ---------------------------------------------------------------- */
/* Define                                                            */
/* ---------------------------------------------------------------- */

function DefineVisual() {
  const scopeItems = ["Requirements", "Milestones", "Exclusions"];
  const milestones = ["Scope", "Timeline", "Proposal"];

  return (
    <>
      <Item>
        <Frame className="flex flex-col gap-1.5 p-3">
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wide text-ink-muted">
            <FileText className="h-3 w-3" aria-hidden />
            Written scope
          </span>
          {scopeItems.map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <ListChecks className="h-3 w-3 shrink-0 text-teal" aria-hidden />
              <span className="text-[11px] text-ink-foreground/85">{item}</span>
            </div>
          ))}
        </Frame>
      </Item>

      <Item className="flex items-center gap-1.5">
        {milestones.map((stage, index) => (
          <div key={stage} className="flex flex-1 items-center gap-1.5">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[7px] ${
                index === 0 ? "bg-teal text-teal-foreground" : "border border-white/20 text-ink-muted"
              }`}
            >
              {index + 1}
            </span>
            <span className="truncate font-mono text-[8px] uppercase tracking-wide text-ink-muted">{stage}</span>
            {index < milestones.length - 1 && <span className="h-px flex-1 bg-white/10" />}
          </div>
        ))}
      </Item>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Design                                                            */
/* ---------------------------------------------------------------- */

function DesignVisual() {
  const swatches = ["var(--color-teal)", "var(--color-highlight)", "var(--color-ink-foreground)"];

  return (
    <>
      <Item className="grid grid-cols-2 gap-2">
        <Frame className="flex flex-col gap-1.5 p-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wide text-ink-muted">
            <LayoutGrid className="h-3 w-3" aria-hidden />
            Structure
          </span>
          <div className="grid grid-cols-3 gap-1">
            {[0, 1, 2, 3, 4, 5].map((cell) => (
              <span key={cell} className="h-4 rounded-sm bg-white/10" />
            ))}
          </div>
        </Frame>
        <Frame className="flex flex-col gap-1.5 p-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wide text-ink-muted">
            <GitBranch className="h-3 w-3" aria-hidden />
            User flow
          </span>
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((step, i) => (
              <span key={step} className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-sm border border-teal/50 bg-teal/10" />
                {i < 2 && <span className="h-px w-2 bg-white/15" />}
              </span>
            ))}
          </div>
        </Frame>
      </Item>

      <Item className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wide text-ink-muted">
          <Palette className="h-3 w-3" aria-hidden />
          Design system
        </span>
        <div className="flex items-center gap-1">
          {swatches.map((color) => (
            <span key={color} className="h-3 w-3 rounded-full" style={{ background: color }} />
          ))}
        </div>
      </Item>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Build — full-stack chain                                          */
/* ---------------------------------------------------------------- */

function BuildVisual({ reduceMotion }: VisualProps) {
  const layers = [
    { label: "Interface", icon: Layout },
    { label: "App logic", icon: Cpu },
    { label: "Data", icon: Database },
    { label: "Integrations", icon: Share2 },
    { label: "Deployment", icon: Cloud },
  ];

  return (
    <Item className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {layers.map((layer, index) => (
          <div key={layer.label} className="flex flex-1 items-center gap-1">
            <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
                <layer.icon className="h-3.5 w-3.5" aria-hidden />
              </span>
              <span className="hidden truncate font-mono text-[8px] uppercase tracking-wide text-ink-muted sm:block">
                {layer.label}
              </span>
            </div>
            {index < layers.length - 1 && (
              <span className="relative -mt-4 h-px flex-1 overflow-hidden bg-white/10 sm:mt-0">
                {!reduceMotion && (
                  <motion.span
                    className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-transparent via-teal to-transparent"
                    animate={{ x: ["-1rem", "4rem"] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: index * 0.25 }}
                  />
                )}
              </span>
            )}
          </div>
        ))}
      </div>
      <span className="text-center font-mono text-[8px] uppercase tracking-wide text-ink-muted sm:hidden">
        Interface &rarr; App logic &rarr; Data &rarr; Integrations &rarr; Deployment
      </span>
    </Item>
  );
}

/* ---------------------------------------------------------------- */
/* Launch and support                                                */
/* ---------------------------------------------------------------- */

function LaunchVisual() {
  return (
    <>
      <Item className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-2.5 py-1 text-[10px] uppercase tracking-wide text-teal">
          <Globe className="h-3 w-3" aria-hidden />
          Deployed
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-highlight/30 bg-highlight/10 px-2.5 py-1 text-[10px] uppercase tracking-wide text-highlight">
          <Activity className="h-3 w-3" aria-hidden />
          Monitoring
        </span>
      </Item>

      <Item className="grid grid-cols-2 gap-2">
        <Frame className="flex items-center gap-1.5 p-2.5">
          <BookOpen className="h-3.5 w-3.5 text-ink-muted" aria-hidden />
          <span className="text-[11px] text-ink-foreground/85">Documentation</span>
        </Frame>
        <Frame className="flex items-center gap-1.5 p-2.5">
          <LifeBuoy className="h-3.5 w-3.5 text-teal" aria-hidden />
          <span className="text-[11px] text-ink-foreground/85">Support active</span>
        </Frame>
      </Item>

      <Item className="flex items-center gap-1.5 text-[10px] text-ink-muted">
        <CheckCircle2 className="h-3.5 w-3.5 text-teal" aria-hidden />
        Handover complete
      </Item>
    </>
  );
}

const visualMap: Record<ProcessVisual, (props: VisualProps) => React.ReactElement> = {
  discover: DiscoverVisual,
  define: DefineVisual,
  design: DesignVisual,
  build: BuildVisual,
  launch: LaunchVisual,
};
