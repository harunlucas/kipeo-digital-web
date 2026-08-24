const monitors = [
  { x: 30, tone: "var(--color-teal)" },
  { x: 50, tone: "var(--color-highlight)" },
  { x: 70, tone: "var(--color-teal)" },
];

/**
 * Static, polished stand-in for the Kipeo Systems Studio 3D scene. Shown
 * before the WebGL canvas loads, while it's off-screen, on reduced-data
 * connections, and if WebGL fails outright — so the section never shows an
 * empty canvas or a bare spinner.
 */
export function StudioFallback({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Illustration of a low-poly digital workstation with three connected screens, a deployment status light and a small Kipeo geometric brand object, representing complete digital delivery from strategy through to support."
      className={`bg-grid-ink relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-ink-elevated bg-ink ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-teal/10 blur-[100px]"
      />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 right-8 h-48 w-48 rounded-full bg-highlight/10 blur-[90px]" />

      <svg viewBox="0 0 400 260" className="relative h-full w-full max-w-md" aria-hidden>
        {/* floor */}
        <ellipse cx="200" cy="220" rx="150" ry="18" fill="var(--color-ink-elevated)" opacity="0.6" />
        {/* desk */}
        <rect x="90" y="185" width="220" height="10" rx="3" fill="var(--color-ink-elevated)" />
        {[110, 280].map((x) => (
          <rect key={x} x={x} y="195" width="6" height="26" fill="var(--color-ink-elevated)" opacity="0.8" />
        ))}
        {/* monitors */}
        {monitors.map((m) => (
          <g key={m.x}>
            <rect x={m.x * 4 - 34} y="98" width="68" height="46" rx="4" fill="var(--color-ink)" stroke={m.tone} strokeOpacity="0.5" />
            <rect x={m.x * 4 - 28} y="104" width="56" height="34" rx="2" fill={m.tone} fillOpacity="0.18" />
            <rect x={m.x * 4 - 4} y="144" width="8" height="14" fill="var(--color-ink-elevated)" />
          </g>
        ))}
        {/* deployment status light */}
        <circle cx="330" cy="150" r="4" fill="var(--color-teal)" />
        <rect x="322" y="154" width="16" height="30" rx="3" fill="var(--color-ink-elevated)" />
        {/* lamp */}
        <line x1="80" y1="185" x2="60" y2="120" stroke="var(--color-teal-strong)" strokeWidth="2" />
        <circle cx="58" cy="112" r="9" fill="var(--color-ink-foreground)" fillOpacity="0.85" />
        {/* Kipeo brand object */}
        <polygon points="200,50 214,64 200,78 186,64" fill="var(--color-teal)" fillOpacity="0.8" />
      </svg>

      <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted backdrop-blur">
        Preview
      </span>
    </div>
  );
}
