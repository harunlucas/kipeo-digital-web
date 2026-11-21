"use client";

import { useSyncExternalStore } from "react";
import {
  getServerThemeSnapshot,
  getThemeSnapshot,
  parseThemeSnapshot,
  setThemePreference,
  subscribeTheme,
} from "@/lib/theme";

/** The visitor's appearance choice, the theme it resolves to, and a setter. */
export function useTheme() {
  const snapshot = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  return { ...parseThemeSnapshot(snapshot), setPreference: setThemePreference };
}
