"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/**
 * Homepage Kipeo Studio invitation image: a restrained, mouse-only pointer
 * tilt (max 2deg) plus a CSS hover-scale, matching the pointer-responsive
 * pattern already used in hero-visual.tsx but far more subtle. Disabled
 * entirely for touch/pen input and for prefers-reduced-motion.
 */
export function StudioTeaserVisual({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 150, damping: 20, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 150, damping: 20, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-2, 2]);

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
    <div className="group relative aspect-[4/3] w-full sm:aspect-[16/10] [perspective:1400px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-teal/10 blur-[70px] transition-opacity duration-500 group-hover:opacity-80"
      />
      <motion.div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative h-full w-full overflow-hidden rounded-2xl border border-ink-elevated transition-transform duration-300 ease-out group-hover:scale-[1.015]"
        style={
          shouldReduceMotion
            ? { transformStyle: "preserve-3d" }
            : { transformStyle: "preserve-3d", rotateX, rotateY }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          priority={priority}
        />
        <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" />
      </motion.div>
    </div>
  );
}
