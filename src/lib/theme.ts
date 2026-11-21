/**
 * Site appearance: Light, Dark or System.
 *
 * The visitor's choice is stored in `localStorage` under `STORAGE_KEY`
 * ("light" | "dark"; no entry means "system"). The resolved theme is written
 * to `<html data-theme>`, which `globals.css` keys every colour from, and
 * `color-scheme` follows it so native controls, scrollbars and autofill
 * match.
 *
 * Three things keep that attribute right:
 *  - `THEME_INIT_SCRIPT`, inlined in `<head>` by `layout.tsx`, runs while the
 *    HTML is parsed — before first paint — so a dark visit never flashes
 *    light. The server always renders without `data-theme`, so the markup
 *    React hydrates is identical whatever the visitor chose.
 *  - `ThemeSync` (mounted once in the layout) re-applies it after hydration,
 *    follows the operating system while System is selected, and picks up a
 *    change made in another tab.
 *  - `setThemePreference`, called by the appearance controls.
 *
 * Changing theme only touches attributes on `<html>`; nothing re-mounts, so
 * scroll position, open menus and the enquiry draft are untouched.
 */

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const STORAGE_KEY = "kipeo-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

export const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

/**
 * Kept dependency-free and in ES5 so it can run inline before anything
 * else. Mirrors `readPreference` + `applyTheme` below.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var d=document.documentElement,p=localStorage.getItem("${STORAGE_KEY}");if(p!=="light"&&p!=="dark")p="system";var t=p==="system"?(window.matchMedia("${DARK_QUERY}").matches?"dark":"light"):p;d.setAttribute("data-theme",t);d.setAttribute("data-theme-preference",p);d.style.colorScheme=t}catch(e){}})()`;

function readPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

/** Used only when `localStorage` refuses writes. */
let memoryPreference: ThemePreference | null = null;

function currentPreference(): ThemePreference {
  return memoryPreference ?? readPreference();
}

function systemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function resolve(preference: ThemePreference): ResolvedTheme {
  return preference === "system" ? systemTheme() : preference;
}

/**
 * Writes the resolved theme to `<html>`. With `instant`, colour transitions
 * are suspended for the frame of the swap (see `[data-theme-switching]` in
 * `globals.css`).
 */
function applyTheme(preference: ThemePreference, { instant = false } = {}) {
  const root = document.documentElement;
  const theme = resolve(preference);
  if (
    root.getAttribute("data-theme") === theme &&
    root.getAttribute("data-theme-preference") === preference
  ) {
    return;
  }

  if (instant) root.setAttribute("data-theme-switching", "");
  root.setAttribute("data-theme", theme);
  root.setAttribute("data-theme-preference", preference);
  root.style.colorScheme = theme;

  if (instant) {
    // Force the new colours to compute before transitions come back.
    void root.offsetWidth;
    requestAnimationFrame(() => root.removeAttribute("data-theme-switching"));
  }
}

/* ---- A tiny external store, read with `useSyncExternalStore`. ---- */

type Snapshot = `${ThemePreference}:${ResolvedTheme}`;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getThemeSnapshot(): Snapshot {
  const preference = currentPreference();
  return `${preference}:${resolve(preference)}`;
}

/** The server can't know the choice; controls render "system" until hydrated. */
export function getServerThemeSnapshot(): Snapshot {
  return "system:light";
}

export function parseThemeSnapshot(snapshot: Snapshot) {
  const [preference, resolved] = snapshot.split(":") as [ThemePreference, ResolvedTheme];
  return { preference, resolved };
}

export function setThemePreference(preference: ThemePreference) {
  try {
    if (preference === "system") window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, preference);
    memoryPreference = null;
  } catch {
    // Storage blocked (private mode, policy): the choice still applies to
    // this page view.
    memoryPreference = preference;
  }
  applyTheme(preference, { instant: true });
  emit();
}

/**
 * Starts the listeners `ThemeSync` owns. Returns the cleanup.
 */
export function startThemeSync() {
  // Re-apply once hydrated: in development React's Strict Mode remount
  // resets `<html>` attributes it doesn't manage; in production this is a
  // no-op because the inline script already set them.
  applyTheme(currentPreference());

  const media = window.matchMedia(DARK_QUERY);
  const onSystemChange = () => {
    if (currentPreference() === "system") {
      applyTheme("system", { instant: true });
      emit();
    }
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    applyTheme(currentPreference(), { instant: true });
    emit();
  };

  media.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);
  return () => {
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}
