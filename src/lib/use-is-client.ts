import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * True only once mounted on the client. Lets a component render nothing
 * (matching SSR output, so hydration never mismatches) until it's safe to
 * read browser-only state such as `localStorage` or use a portal.
 */
export function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
