"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Cpu, Globe2, Layers, Share2, ShieldCheck } from "lucide-react";

type Tile = {
  id: string;
  label: string;
  icon: typeof Cpu;
  className: string;
  z: number;
};

/**
 * A bento-style index of the agency's breadth — software systems,
 * operational products, websites, integrations and managed platforms — no
 * screenshots, no fake data. Built specifically for the /work hero so
 * BushLite's genuine screenshots stay reserved for the Featured Project
 * section only. Distinct in layout (asymmetric grid) from the homepage's
 * orbiting `HeroVisual`, /services' node-graph `EcosystemVisual`, and
 * /work's own `WorkFeaturedSpotlight` imagery.
 */
const tiles: Tile[] = [
  { id: "software", label: "Software systems", icon: Cpu, className: "col-span-2 row-span-2", z: 40 },
  { id: "operational", label: "Operational products", icon: ShieldCheck, className: "col-span-1 row-span-1", z: 70 },
  { id: "websites", label: "Websites", icon: Globe2, className: "col-span-1 row-span-1", z: 60 },
  { id: "integrations", label: "Integrations", icon: Share2, className: "col-span-1 row-span-1", z: 80 },
  { id: "platforms", label: "Managed platforms", icon: Layers, className: "col-span-1 row-span-1", z: 55 },
];

export function WorkIndexVisual() {
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 130, damping: 20, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 130, damping: 20, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
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
      className="relative mx-auto aspect-square w-full max-w-[440px] [perspective:1400px]"
    >
      <div aria-hidden className="absolute -left-8 top-6 h-52 w-52 rounded-full bg-teal/20 blur-[90px]" />
      <div aria-hidden className="absolute -right-6 bottom-4 h-56 w-56 rounded-full bg-highlight/20 blur-[90px]" />

      <motion.div
        className="grid h-full w-full grid-cols-3 grid-rows-3 gap-3"
        style={
          shouldReduceMotion ? { transformStyle: "preserve-3d" } : { transformStyle: "preserve-3d", rotateX, rotateY }
        }
      >
        {tiles.map((tile, index) => {
          const Icon = tile.icon;
          return (
            <motion.div
              key={tile.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-ink p-4 shadow-panel ${tile.className}`}
              style={{ transform: `translateZ(${tile.z}px)` }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/15 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-teal-foreground">
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-xs font-medium text-ink-foreground/90 sm:text-sm">{tile.label}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
