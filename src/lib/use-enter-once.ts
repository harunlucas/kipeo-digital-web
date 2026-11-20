"use client";

import { useEffect, type RefObject } from "react";

/** Fires `onEnter` once, the first time `ref`'s element enters the viewport. */
export function useEnterOnce(ref: RefObject<HTMLElement | null>, onEnter: () => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onEnter();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
