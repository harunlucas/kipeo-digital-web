"use client";

import { useEffect } from "react";
import { startThemeSync } from "@/lib/theme";

/**
 * Mounted once in the root layout. Keeps `<html data-theme>` in step with
 * the operating system while System is selected and with choices made in
 * other tabs. See `src/lib/theme.ts`.
 */
export function ThemeSync() {
  useEffect(() => startThemeSync(), []);
  return null;
}
