"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { StudioFallback } from "./studio-fallback";
import { StudioHotspots, type HotspotId } from "./studio-hotspots";
import { StudioErrorBoundary } from "./studio-error-boundary";

const KipeoStudioCanvas = dynamic(
  () => import("./kipeo-studio-scene").then((mod) => mod.KipeoStudioCanvas),
  { ssr: false, loading: () => null },
);

type ConnectionLike = { saveData?: boolean; effectiveType?: string };

function isDataSaverConnection() {
  if (typeof navigator === "undefined") return false;
  const connection = (navigator as unknown as { connection?: ConnectionLike }).connection;
  if (!connection) return false;
  return Boolean(connection.saveData) || connection.effectiveType === "slow-2g" || connection.effectiveType === "2g";
}

function isWebglSupported() {
  if (typeof window === "undefined" || !("WebGLRenderingContext" in window)) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function subscribeToMobileQuery(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(max-width: 767px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
const getIsMobileSnapshot = () => (typeof window === "undefined" ? false : window.matchMedia("(max-width: 767px)").matches);
const getIsMobileServerSnapshot = () => false;

// One-time, non-changing environment reads: no real subscription needed,
// but useSyncExternalStore keeps them SSR-safe without setState-in-effect.
const noopSubscribe = () => () => {};
const getDataSaverServerSnapshot = () => false;
const getWebglSupportedServerSnapshot = () => true;

export function KipeoStudio() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [runtimeError, setRuntimeError] = useState(false);
  const [active, setActive] = useState<HotspotId | null>(null);

  const isMobile = useSyncExternalStore(subscribeToMobileQuery, getIsMobileSnapshot, getIsMobileServerSnapshot);
  const dataSaver = useSyncExternalStore(noopSubscribe, isDataSaverConnection, getDataSaverServerSnapshot);
  const webglSupported = useSyncExternalStore(noopSubscribe, isWebglSupported, getWebglSupportedServerSnapshot);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
        // Also track a tighter "actually visible" flag to pause rendering
        // once the section has fully scrolled past, without unmounting.
        setIsVisible(entry.intersectionRatio > 0.05);
      },
      { rootMargin: "250px 0px", threshold: [0, 0.05, 0.5] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const canRender = isNearViewport && !dataSaver && webglSupported && !runtimeError;
  // Desktop auto-enables once near viewport; mobile requires an explicit tap
  // so the heavier scene is never downloaded before the visitor opts in.
  const shouldMount = canRender && (enabled || !isMobile);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-start lg:gap-8">
      <div ref={containerRef} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/10]">
        <div className="absolute inset-0">
          <StudioFallback />
        </div>

        {shouldMount && (
          <div className="absolute inset-0">
            <StudioErrorBoundary onError={() => setRuntimeError(true)}>
              <KipeoStudioCanvas
                active={active}
                onSelect={setActive}
                reduceMotion={!!shouldReduceMotion}
                simplified={isMobile}
                paused={!isVisible}
              />
            </StudioErrorBoundary>
          </div>
        )}

        {canRender && isMobile && !enabled && (
          <button
            type="button"
            onClick={() => setEnabled(true)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-teal px-4 py-2.5 text-sm font-medium text-teal-foreground shadow-panel"
          >
            Enable 3D interaction
          </button>
        )}

        {shouldMount && !shouldReduceMotion && (
          <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted backdrop-blur">
            Drag to explore &middot; Scroll or pinch to zoom
          </span>
        )}
      </div>

      <StudioHotspots active={active} onSelect={setActive} />
    </div>
  );
}
