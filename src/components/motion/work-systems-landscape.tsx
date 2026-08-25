"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Database, LayoutGrid, Plug, Radio, Rocket } from "lucide-react";

const interfaceRows = [
  { id: "overview", label: "Overview" },
  { id: "records", label: "Records" },
  { id: "reports", label: "Reports" },
];

const workflowSteps = ["Capture", "Process", "Complete"];

/**
 * /work hero visual: one connected "software systems landscape" — an
 * interface window with integration, workflow, data and deployment planes
 * stacked around it, connected by short drawn lines rather than five
 * separate category cards. No fake metrics or dashboard data; every label
 * names a layer of a real system, not a result. Built fresh for this page —
 * not the Homepage's orbiting hero, Services' node-graph, Studio's
 * isometric workspace, About's stacked deck, or Contact's intake panel.
 *
 * Deliberately normal-flow (not absolutely-positioned overlapping planes):
 * an earlier version placed the integration nodes with percentage-based
 * absolute coordinates, and they ended up geometrically hidden behind the
 * interface window's higher translateZ plane. Stacking each layer in
 * document order avoids that entirely while keeping the per-block
 * translateZ depth for the "layered planes" feel.
 */
export function WorkSystemsLandscape() {
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 130, damping: 20, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 130, damping: 20, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const shiftX = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const shiftY = useTransform(springY, [-0.5, 0.5], [-4, 4]);

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || event.pointerType !== "mouse" || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto w-full max-w-[460px] [perspective:1600px]"
    >
      <p className="sr-only">
        A diagram of one connected Kipeo software system: an integrations layer linking external services, an
        interface layer, a workflow layer showing tasks moving from capture through processing to completion, a
        structured data layer, and a deployment layer showing the system live and monitored.
      </p>

      <div aria-hidden className="pointer-events-none absolute -right-8 -top-4 h-56 w-56 rounded-full bg-teal/20 blur-[95px]" />
      <div aria-hidden className="pointer-events-none absolute -left-6 top-1/3 h-40 w-40 rounded-full bg-highlight/16 blur-[80px]" />

      <motion.div
        aria-hidden
        className="relative"
        style={
          shouldReduceMotion
            ? { transformStyle: "preserve-3d" }
            : { transformStyle: "preserve-3d", rotateX, rotateY, x: shiftX, y: shiftY }
        }
      >
        {/* Integrations */}
        <div className="flex items-center justify-center gap-8" style={{ transform: "translateZ(20px)" }}>
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-teal/40 bg-ink-elevated text-teal shadow-card"
          >
            <Plug className="h-4 w-4" aria-hidden />
          </motion.span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-muted">Integrations</span>
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-teal/40 bg-ink-elevated text-teal shadow-card"
          >
            <Plug className="h-4 w-4" aria-hidden />
          </motion.span>
        </div>

        {/* Connector: integrations down into the interface window */}
        <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="mx-auto h-6 w-full max-w-[220px] overflow-visible">
          <motion.path
            d="M14,0 C14,16 50,10 50,26"
            stroke="var(--color-teal)"
            strokeOpacity="0.45"
            strokeWidth="1"
            fill="none"
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M86,0 C86,16 50,10 50,26"
            stroke="var(--color-teal)"
            strokeOpacity="0.45"
            strokeWidth="1"
            fill="none"
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
          {!shouldReduceMotion && (
            <motion.circle
              r="1.6"
              fill="var(--color-teal)"
              animate={{ cx: [14, 50], cy: [0, 26], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
            />
          )}
        </svg>

        {/* Interface window */}
        <div
          className="relative mx-auto w-[92%] rounded-2xl border border-neutral-200 bg-ink p-3.5 shadow-panel sm:p-4"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="bg-grid-ink pointer-events-none absolute inset-0 rounded-2xl opacity-25" />
          <div className="relative flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="ml-2 h-3 flex-1 rounded-full bg-white/[0.06]" />
          </div>
          <div className="relative mt-3 flex gap-2.5">
            <div className="flex w-7 shrink-0 flex-col gap-1.5 rounded-lg bg-white/[0.04] p-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-teal/25 text-teal">
                <LayoutGrid className="h-2.5 w-2.5" aria-hidden />
              </span>
              <span className="h-4 w-4 rounded bg-white/[0.06]" />
              <span className="h-4 w-4 rounded bg-white/[0.06]" />
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              {interfaceRows.map((row, index) => (
                <div
                  key={row.id}
                  className={`flex items-center justify-between rounded-md px-2 py-1.5 ${
                    index === 0 ? "border border-teal/25 bg-teal/12" : "bg-white/[0.03]"
                  }`}
                >
                  <span className="text-[9px] font-medium text-ink-foreground/85">{row.label}</span>
                  <span className="h-1.5 w-6 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <span className="mt-2 block text-center font-mono text-[9px] uppercase tracking-[0.16em] text-slate-muted">
          Interface
        </span>

        {/* Workflow + Data planes */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-neutral-200 bg-paper-elevated p-3 shadow-card" style={{ transform: "translateZ(35px)" }}>
            <div className="flex flex-wrap items-center gap-1">
              {workflowSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-1">
                  <span className="rounded-full bg-mist px-1.5 py-0.5 text-[8px] font-medium whitespace-nowrap text-slate">
                    {step}
                  </span>
                  {index < workflowSteps.length - 1 && <span className="h-px w-2 shrink-0 bg-neutral-300" />}
                </div>
              ))}
            </div>
            <span className="mt-2.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-muted">
              Workflow
            </span>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-paper-elevated p-3 shadow-card" style={{ transform: "translateZ(35px)" }}>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-highlight/15 text-highlight-strong">
                <Database className="h-3.5 w-3.5" aria-hidden />
              </span>
              <div className="flex flex-col gap-1">
                <span className="h-1 w-9 rounded-full bg-neutral-300" />
                <span className="h-1 w-6 rounded-full bg-neutral-200" />
              </div>
            </div>
            <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-muted">Data</span>
          </div>
        </div>

        {/* Deployment plane */}
        <div
          className="mx-auto mt-3 flex w-[72%] items-center justify-center gap-2 rounded-full border border-teal-strong/30 bg-teal-tint px-3.5 py-2 shadow-card"
          style={{ transform: "translateZ(45px)" }}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            {!shouldReduceMotion && (
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-teal-strong"
                animate={{ opacity: [0.6, 0], scale: [1, 2.1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-strong" />
          </span>
          <Rocket className="h-3.5 w-3.5 text-teal-strong" aria-hidden />
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-teal-strong">Deployment · Live</span>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          <Radio className="h-3 w-3 text-slate-muted" aria-hidden />
          <span className="rounded-full border border-neutral-300 bg-paper px-3 py-1 font-mono text-[10px] font-medium text-slate">
            Kipeo software system
          </span>
        </div>
      </motion.div>
    </div>
  );
}
