"use client";

import { motion, type Variants } from "motion/react";
import {
  Bell,
  Check,
  CircleCheck,
  Database,
  FileText,
  Mail,
  Package,
  Settings,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import type { ProblemVisual } from "@/content/problems";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
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

function Chip({
  children,
  tone = "teal",
}: {
  children: React.ReactNode;
  tone?: "teal" | "violet" | "neutral";
}) {
  const toneClasses =
    tone === "teal"
      ? "border-teal/30 bg-teal/10 text-teal"
      : tone === "violet"
        ? "border-highlight/30 bg-highlight/10 text-highlight"
        : "border-white/10 bg-white/5 text-ink-muted";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide ${toneClasses}`}
    >
      {children}
    </span>
  );
}

export function ProblemSolutionVisual({
  visual,
  reduceMotion,
}: {
  visual: ProblemVisual;
  reduceMotion: boolean;
}) {
  const motionProps = reduceMotion
    ? {}
    : { variants: containerVariants, initial: "hidden", animate: "visible" };

  const Component = visualMap[visual];

  return (
    <motion.div {...motionProps} className="flex h-full flex-col gap-3">
      <Component reduceMotion={reduceMotion} />
    </motion.div>
  );
}

type VisualProps = { reduceMotion: boolean };

function Item({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* 1. Enquiry workflow                                               */
/* ---------------------------------------------------------------- */

function EnquiryVisual({ reduceMotion }: VisualProps) {
  const stages = ["New enquiry", "Assigned", "Follow-up", "Responded"];

  return (
    <>
      <Item className="relative flex items-center gap-1.5 pb-1">
        {stages.map((stage, index) => (
          <div key={stage} className="flex flex-1 items-center gap-1.5">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                index <= 2 ? "bg-teal" : "border border-white/20 bg-transparent"
              }`}
            />
            {index < stages.length - 1 && (
              <span className="relative h-px flex-1 overflow-hidden bg-white/10">
                {!reduceMotion && index === 1 && (
                  <motion.span
                    className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-transparent via-teal to-transparent"
                    animate={{ x: ["-1.5rem", "6rem"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </span>
            )}
          </div>
        ))}
      </Item>

      <Item className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stages.map((stage, index) => (
          <div key={stage} className="flex min-w-0 flex-col gap-1.5">
            <span className="truncate font-mono text-[9px] uppercase tracking-wide text-ink-muted">
              {stage}
            </span>
            <Frame className="flex min-h-[3.75rem] flex-col justify-center gap-1 p-2">
              {index === 0 && (
                <>
                  <span className="truncate text-[11px] font-medium text-ink-foreground">Website form</span>
                  <Chip tone="neutral">New</Chip>
                </>
              )}
              {index === 1 && (
                <>
                  <span className="truncate text-[11px] font-medium text-ink-foreground">Phone call</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-ink-muted">
                    <UserRound className="h-3 w-3" aria-hidden />
                    Assigned
                  </span>
                </>
              )}
              {index === 2 && (
                <>
                  <span className="truncate text-[11px] font-medium text-ink-foreground">Live chat</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-teal">
                    <Bell className="h-3 w-3" aria-hidden />
                    Due today
                  </span>
                </>
              )}
              {index === 3 && (
                <span className="inline-flex items-center gap-1 text-[10px] text-ink-muted/60">
                  <Check className="h-3 w-3" aria-hidden />
                  Awaiting
                </span>
              )}
            </Frame>
          </div>
        ))}
      </Item>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 2. Business system                                                */
/* ---------------------------------------------------------------- */

function OperationsVisual() {
  const records = ["Record 01", "Record 02", "Record 03"];
  const tasks = [
    { label: "Update record", done: true },
    { label: "Confirm order", done: false },
    { label: "Send summary", done: false },
  ];
  const bars = [40, 70, 55, 90, 62];
  const updates = ["Record updated", "Task completed", "New entry added"];

  return (
    <>
      <Item className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wide text-ink-muted">Operations</span>
        <Chip tone="teal">Connected data</Chip>
      </Item>

      <Item className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Frame className="flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wide text-ink-muted">
            <Database className="h-3 w-3" aria-hidden />
            Records
          </span>
          {records.map((record) => (
            <div key={record} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal/70" />
              <span className="truncate text-[10px] text-ink-foreground/90">{record}</span>
            </div>
          ))}
        </Frame>

        <Frame className="hidden flex-col gap-1.5 sm:flex">
          <span className="font-mono text-[9px] uppercase tracking-wide text-ink-muted">Pending tasks</span>
          {tasks.map((task) => (
            <div key={task.label} className="flex items-center gap-1.5">
              <span
                className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-[3px] border ${
                  task.done ? "border-teal bg-teal" : "border-white/25"
                }`}
              >
                {task.done && <Check className="h-2 w-2 text-teal-foreground" aria-hidden />}
              </span>
              <span
                className={`truncate text-[10px] ${task.done ? "text-ink-muted/70 line-through" : "text-ink-foreground/90"}`}
              >
                {task.label}
              </span>
            </div>
          ))}
        </Frame>

        <Frame className="hidden flex-col gap-1.5 sm:flex">
          <span className="font-mono text-[9px] uppercase tracking-wide text-ink-muted">Reporting</span>
          <div className="flex h-10 items-end gap-1">
            {bars.map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-sm"
                style={{
                  height: `${height}%`,
                  background: index % 2 === 0 ? "var(--color-teal)" : "var(--color-highlight)",
                  opacity: 0.75,
                }}
              />
            ))}
          </div>
        </Frame>
      </Item>

      <Item>
        <Frame className="flex flex-col gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-wide text-ink-muted">Recent updates</span>
          {updates.map((update) => (
            <div key={update} className="flex items-center gap-1.5 text-[10px] text-ink-foreground/80">
              <span className="h-1 w-1 shrink-0 rounded-full bg-highlight" />
              {update}
            </div>
          ))}
        </Frame>
      </Item>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 3. Conversion-focused website                                     */
/* ---------------------------------------------------------------- */

function WebsiteVisual() {
  const steps = ["Landing page", "Service detail", "Qualification", "Enquiry"];

  return (
    <>
      <Item className="flex items-center gap-1.5">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-1 items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                index === steps.length - 1 ? "bg-teal" : "bg-white/25"
              }`}
            />
            <span className="hidden truncate font-mono text-[8px] uppercase tracking-wide text-ink-muted sm:inline">
              {step}
            </span>
            {index < steps.length - 1 && <span className="h-px flex-1 bg-white/10" />}
          </div>
        ))}
      </Item>

      <Item>
        <Frame className="flex flex-col gap-2 p-2.5">
          <div className="flex items-center gap-1.5 border-b border-white/10 pb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="ml-1.5 truncate rounded-full bg-white/5 px-2 py-0.5 font-mono text-[9px] text-ink-muted">
              kipeo.digital
            </span>
          </div>

          <div className="flex items-center gap-3 text-[9px] text-ink-muted">
            <span className="text-ink-foreground/90">Home</span>
            <span className="border-b border-teal pb-0.5 font-medium text-teal">Services</span>
            <span className="hidden sm:inline">Work</span>
            <span className="hidden sm:inline">Contact</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="h-2.5 w-2/3 rounded-sm bg-ink-foreground/25" />
            <span className="h-1.5 w-4/5 rounded-sm bg-white/10" />
          </div>

          <span className="inline-flex w-fit items-center rounded-full bg-teal px-3 py-1 text-[10px] font-medium text-teal-foreground">
            Get started
          </span>

          <div className="mt-1 flex flex-col gap-1.5 rounded-md border border-white/10 bg-white/5 p-2">
            <span className="font-mono text-[8px] uppercase tracking-wide text-ink-muted">Enquiry</span>
            <span className="h-4 rounded-sm border border-white/10 bg-ink/60" />
            <span className="h-4 rounded-sm border border-white/10 bg-ink/60" />
            <span className="inline-flex w-fit items-center rounded-full bg-highlight px-2.5 py-0.5 text-[9px] font-medium text-highlight-foreground">
              Submit
            </span>
          </div>
        </Frame>
      </Item>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* 4. Workflow automation                                            */
/* ---------------------------------------------------------------- */

function AutomationVisual({ reduceMotion }: VisualProps) {
  const nodes = [
    { label: "Form submitted", icon: FileText, complete: true },
    { label: "Data checked", icon: CircleCheck, complete: true },
    { label: "Record created", icon: Database, complete: true },
    { label: "Team notified", icon: Bell, complete: false },
  ];

  return (
    <Item className="flex flex-1 flex-col justify-center gap-2">
      <div className="flex items-center gap-1">
        {nodes.map((node, index) => (
          <div key={node.label} className="flex flex-1 items-center gap-1">
            <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center">
              <span
                className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                  node.complete ? "border-teal/40 bg-teal/10 text-teal" : "border-highlight/40 bg-highlight/10 text-highlight"
                }`}
              >
                <node.icon className="h-3.5 w-3.5" aria-hidden />
                {node.complete && (
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-teal">
                    <Check className="h-2 w-2 text-teal-foreground" aria-hidden />
                  </span>
                )}
                {!node.complete && !reduceMotion && (
                  <motion.span
                    className="absolute inset-0 rounded-full border border-highlight"
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </span>
              <span className="hidden truncate font-mono text-[8px] uppercase tracking-wide text-ink-muted sm:block">
                {node.label}
              </span>
            </div>
            {index < nodes.length - 1 && (
              <span className="relative -mt-4 h-px flex-1 overflow-hidden bg-white/10 sm:mt-0">
                {!reduceMotion && (
                  <motion.span
                    className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-transparent via-teal to-transparent"
                    animate={{ x: ["-1rem", "4rem"] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: index * 0.3 }}
                  />
                )}
              </span>
            )}
          </div>
        ))}
      </div>
      <span className="text-center font-mono text-[8px] uppercase tracking-wide text-ink-muted sm:hidden">
        Form submitted &rarr; Team notified
      </span>
    </Item>
  );
}

/* ---------------------------------------------------------------- */
/* 5. Commerce platform                                              */
/* ---------------------------------------------------------------- */

function CommerceVisual() {
  const products = [
    { name: "Canvas tote", status: "In stock" },
    { name: "Ceramic mug", status: "Low stock" },
    { name: "Wall print", status: "In stock" },
    { name: "Desk lamp", status: "In stock" },
  ];
  const fulfilment = ["Pending", "Packed", "Shipped"];

  return (
    <>
      <Item className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wide text-ink-muted">Catalogue</span>
        <span className="inline-flex items-center gap-1 rounded-full border border-teal/30 bg-teal/10 px-2 py-0.5 text-[9px] text-teal">
          <Bell className="h-2.5 w-2.5" aria-hidden />
          New order received
        </span>
      </Item>

      <Item className="grid grid-cols-4 gap-1.5">
        {products.map((product) => (
          <Frame key={product.name} className="flex flex-col gap-1 p-1.5">
            <span className="flex h-6 items-center justify-center rounded-sm bg-white/5">
              <ShoppingBag className="h-3 w-3 text-ink-muted" aria-hidden />
            </span>
            <span className="hidden truncate text-[9px] text-ink-foreground/85 sm:block">{product.name}</span>
            <span
              className={`hidden truncate font-mono text-[7px] uppercase tracking-wide sm:block ${
                product.status === "Low stock" ? "text-highlight" : "text-teal"
              }`}
            >
              {product.status}
            </span>
          </Frame>
        ))}
      </Item>

      <Item className="flex items-center gap-1.5">
        {fulfilment.map((stage, index) => (
          <div key={stage} className="flex flex-1 items-center gap-1.5">
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[7px] ${
                index === 1
                  ? "bg-teal text-teal-foreground"
                  : "border border-white/20 text-ink-muted"
              }`}
            >
              {index + 1}
            </span>
            <span className="truncate font-mono text-[8px] uppercase tracking-wide text-ink-muted">{stage}</span>
            {index < fulfilment.length - 1 && <span className="h-px flex-1 bg-white/10" />}
          </div>
        ))}
      </Item>

      <Item className="mt-auto flex items-center gap-3 border-t border-white/10 pt-2">
        <span className="inline-flex items-center gap-1 text-[9px] font-medium text-teal">
          <Package className="h-3 w-3" aria-hidden />
          Catalogue
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] text-ink-muted">
          <Mail className="h-3 w-3" aria-hidden />
          Orders
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] text-ink-muted">
          <Settings className="h-3 w-3" aria-hidden />
          Settings
        </span>
      </Item>
    </>
  );
}

const visualMap: Record<ProblemVisual, (props: VisualProps) => React.ReactElement> = {
  enquiry: EnquiryVisual,
  operations: OperationsVisual,
  website: WebsiteVisual,
  automation: AutomationVisual,
  commerce: CommerceVisual,
};
