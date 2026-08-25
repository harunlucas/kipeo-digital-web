"use client";

import { useEffect, useRef } from "react";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Turnstile"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Renders only when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is configured — see
 * `src/lib/turnstile.ts` and docs/contact-form-setup.md for how server-side
 * verification and the unconfigured case are handled together.
 */
export function Turnstile({ onVerify, onExpire }: { onVerify: (token: string) => void; onExpire: () => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const callbacksRef = useRef({ onVerify, onExpire });

  useEffect(() => {
    callbacksRef.current = { onVerify, onExpire };
  });

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;
    let cancelled = false;
    const node = containerRef.current;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !window.turnstile) return;
        widgetId.current = window.turnstile.render(node, {
          sitekey: siteKey,
          callback: (token: string) => callbacksRef.current.onVerify(token),
          "expired-callback": () => callbacksRef.current.onExpire(),
        });
      })
      .catch(() => {
        // No network access to Cloudflare — the form still submits; the
        // server simply skips verification only if it was never configured.
      });

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
    };
  }, [siteKey]);

  if (!siteKey) return null;

  return <div ref={containerRef} />;
}
