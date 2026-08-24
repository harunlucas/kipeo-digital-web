"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

type Layer = {
  id: string;
  src: string;
  alt: string;
  label: string;
  /** Shown as a small pill next to the label — omitted for genuine screenshots. */
  tag?: string;
  x: number;
  y: number;
  width: number;
  z: number;
  rotate: number;
};

const layers: Layer[] = [
  {
    id: "websites",
    src: "/images/projects/related-websites/harunlucas-home.webp",
    alt: "A related website homepage",
    label: "Websites and commerce",
    x: 4,
    y: 6,
    width: 52,
    z: 40,
    rotate: -5,
  },
  {
    id: "operations",
    src: "/images/services/hse-safety-helmets.webp",
    alt: "A row of coloured industrial safety helmets hanging on a rack",
    label: "HSE and operational systems",
    tag: "Representative photo",
    x: 40,
    y: 0,
    width: 56,
    z: 90,
    rotate: 4,
  },
  {
    id: "systems",
    src: "/images/projects/bushlite-wifi-login-portal.webp",
    alt: "BushLite WiFi hotspot login portal",
    label: "Software and systems",
    x: 18,
    y: 46,
    width: 60,
    z: 65,
    rotate: -3,
  },
];

/**
 * Premium dimensional composition for the /services hero: real,
 * previously-disclosed project imagery (no invented client work) presented
 * as layered, pointer-tilted "system" panels — distinct from the abstract
 * `HeroVisual` (homepage, no imagery) and the flat overlapping
 * `WorkHeroVisual` collage (/work, no 3D perspective). Neither of those
 * components is modified here.
 */
export function ServicesHeroVisual() {
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

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
      className="relative mx-auto aspect-square w-full max-w-[480px] [perspective:1500px]"
    >
      <div aria-hidden className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-teal/20 blur-[90px]" />
      <div aria-hidden className="absolute -right-6 bottom-6 h-64 w-64 rounded-full bg-highlight/20 blur-[100px]" />

      <motion.div
        className="absolute inset-0"
        style={
          shouldReduceMotion ? { transformStyle: "preserve-3d" } : { transformStyle: "preserve-3d", rotateX, rotateY }
        }
      >
        {layers.map((layer, index) => (
          <motion.div
            key={layer.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.12 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group absolute overflow-hidden rounded-2xl border border-neutral-200/70 bg-ink shadow-panel"
            style={{
              left: `${layer.x}%`,
              top: `${layer.y}%`,
              width: `${layer.width}%`,
              transform: `translateZ(${layer.z}px) rotate(${layer.rotate}deg)`,
            }}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={layer.src}
                alt={layer.alt}
                fill
                sizes="(min-width: 1024px) 26vw, 50vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-3 pb-2 pt-6">
                <p className="flex items-center gap-1.5 text-[10px] font-medium text-ink-foreground">
                  {layer.label}
                  {layer.tag && (
                    <span className="rounded-full border border-dashed border-white/40 px-1.5 py-0.5 text-[8px] uppercase tracking-wide text-ink-muted">
                      {layer.tag}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="services-hero-path" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-teal)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M50,50 L30,32 M50,50 L68,26 M50,50 L48,72"
            stroke="url(#services-hero-path)"
            strokeWidth="0.4"
            fill="none"
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
