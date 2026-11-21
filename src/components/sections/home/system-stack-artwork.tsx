"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * The hero's isometric three-layer release stack.
 *
 * NOTE ON PROVENANCE: this is a reconstruction drawn from the written
 * description of the approved mockup — graphite and glass plates, peak-shaped
 * cutouts, mint signal paths and the three layer labels — not the supplied
 * artwork, which never reached the repository. If the original
 * `kipeo-system-stack.png` turns up, replace `<SystemStack />` in
 * `release-environment.tsx` with the `next/image` element described there.
 *
 * GEOMETRY. Every plate is the same rhombus drawn at three vertical offsets.
 * Local plate coordinates run 0–300 on a square, projected by
 * `matrix(1, 1/3, -1, 1/3, 0, 0)`, which maps that square onto a 600 × 200
 * rhombus — a flatter-than-true isometric that keeps three stacked plates
 * inside a landscape box. Screen-space corners for a plate whose top vertex
 * sits at `y`:
 *
 *        T (360, y)
 *   L (60, y+100)   R (660, y+100)
 *        B (360, y+200)        + 18px of extruded thickness below
 *
 * The signal trunk is drawn *behind* the plates and shows through the peak
 * cutouts and the gaps between layers, so it reads as one cable threading
 * down through all three decks rather than a line painted on top of them.
 *
 * LABELS LIVE IN HTML, NOT HERE. Text inside the viewBox scales with the
 * artwork: at 375px the column is 327px wide, so a label sized to look right
 * on a 1440px desktop renders at about 8px. The layer names are therefore
 * positioned alongside this SVG by `release-environment.tsx`, using the
 * `PLATES[].centre` percentages below to line each one up with its plate.
 */

/** Top-vertex Y for each plate, and the plate centre as a percentage of the
 *  viewBox height — the hook the HTML labels align themselves to. */
export const PLATES = [
  { y: 30, label: "Web platform", material: "glass", centre: 16.25, swatch: "var(--plate-glass-top)" },
  { y: 265, label: "API services", material: "graphite", centre: 45.625, swatch: "var(--plate-graphite-top)" },
  { y: 500, label: "Data layer", material: "graphite-deep", centre: 75, swatch: "var(--plate-deep-top)" },
] as const;

const THICKNESS = 18;

/** Peak-shaped aperture, in local plate coordinates, straddling the trunk. */
const PEAK = "M150,95 L205,190 L95,190 Z";

/*
 * Plate colours are CSS custom properties from `globals.css` (`--plate-*`),
 * so the diagram follows the site appearance: Light keeps the approved glass
 * and graphite; Dark lifts the graphite a step, gives it light rims instead
 * of black ones and turns the glass into a teal-tinted translucent layer, so
 * all three plates stay distinct from each other and from the graphite page.
 * The signal colours below are the same in both themes.
 */
const MATERIALS = {
  glass: {
    top: "var(--plate-glass-top)",
    topOpacity: "var(--plate-glass-opacity)",
    left: "var(--plate-glass-left)",
    right: "var(--plate-glass-right)",
    edge: "var(--plate-glass-edge)",
  },
  graphite: {
    top: "var(--plate-graphite-top)",
    topOpacity: 1,
    left: "var(--plate-graphite-left)",
    right: "var(--plate-graphite-right)",
    edge: "var(--plate-edge)",
  },
  "graphite-deep": {
    top: "var(--plate-deep-top)",
    topOpacity: 1,
    left: "var(--plate-deep-left)",
    right: "var(--plate-deep-right)",
    edge: "var(--plate-edge)",
  },
} as const;

const SIGNAL = "#0f9b8e";
const SIGNAL_NODE = "#14b8a6";
const SIGNAL_LIT = "#5eead4";
/** Pale-mint core at the heart of each lit node. */
const CORE = "#ccfbf1";
/** The glass plate's node and halo: deep teal in Light, so its light still
 *  reads against the ivory showing through the translucent surface; the
 *  standard node teal in Dark, where the page behind is graphite. */
const DEEP = "var(--plate-glass-node)";

/** Screen-space centre of a plate whose top vertex is at `y`. */
const centreY = (y: number) => y + 100;

/** Local plate coordinates → screen, for anything drawn on a plate surface. */
const plateTransform = (y: number) => `translate(360, ${y}) matrix(1, 0.33333, -1, 0.33333, 0, 0)`;

/*
 * LIGHT. Each aperture is lit from below: a blurred teal halo hugging the
 * peak (under its crisp rim), a blurred glow behind the node with a pale-mint
 * core on top, and — on the two graphite plates — a faint pool of reflected
 * light on the surface around the opening. The pool is a circle in *local*
 * plate coordinates, so the plate's own projection flattens it to the
 * plate's isometric angle, and it sits inside the plate's cutout mask so it
 * never paints into the hole. Only these light layers are blurred; plates,
 * rims, grid lines and labels stay sharp.
 *
 * The blur filters use `userSpaceOnUse` with one oversized region instead of
 * the default bounding-box region: halos then can't be clipped at the box
 * edge, and the vertical pulse glow — whose bounding box has zero width, which
 * would make a bounding-box filter region empty — still renders. The region
 * is large enough to cover both screen space and the local plate space the
 * on-surface layers are drawn in.
 *
 * At rest every light layer holds a steady, subtle opacity (also the
 * reduced-motion state). During the signal sequence each one briefly rises
 * to full strength as the pulse reaches it, then returns to that resting
 * value — the keyframes only name the peak, so the start and end are each
 * element's own resting opacity or fill.
 */
const HALO_REST = 0.5;
const NODE_GLOW_REST = 0.4;

/*
 * SIGNAL SEQUENCE, played the first time the diagram scrolls into view and
 * again each time a mouse pointer re-enters it once the previous run has
 * finished. Total run ≈ 2.1s: the pulse travels the trunk from Web platform
 * to Data layer (1s), splits down both branches (0.7s), and the endpoints
 * light together. Nothing animates until `data-signal="run"` appears on the
 * root, so the server-rendered markup is the steady, lit diagram.
 *
 * The pulse is a short dash swept along a *copy* of a path the diagram
 * already draws, so it cannot drift out of alignment: `pathLength="100"`
 * normalises each path, the dash sits at path position `-stroke-dashoffset`,
 * and animating that from 0 to -100 walks it end to end. Because it all lives
 * in the viewBox, it scales with the artwork on every breakpoint.
 *
 * The trunk pulse is drawn with the static trunk, behind every plate, so it
 * is hidden by the opaque graphite decks and shows only in the apertures, in
 * the gaps between layers, and faintly through the translucent glass. Each
 * aperture's halo peaks as the pulse crosses it, which carries the signal
 * from one opening to the next.
 */
const TRUNK_MS = 1000;
const BRANCH_MS = 700;
const FLASH_MS = 400;
const SEQUENCE_MS = TRUNK_MS + BRANCH_MS + FLASH_MS;

/** When the pulse reaches plate `i`, derived from that plate's own centre so
 *  the flashes stay in step if the geometry above ever changes. */
function nodeDelayMs(index: number): number {
  const first = centreY(PLATES[0].y);
  const last = centreY(PLATES[PLATES.length - 1].y);
  return (TRUNK_MS * (centreY(PLATES[index].y) - first)) / (last - first);
}

const SIGNAL_CSS = `
.kp-pulse {
  opacity: 0;
  fill: none;
  stroke: ${SIGNAL_LIT};
  stroke-width: 7;
  stroke-linecap: round;
}
.kp-pulse-glow {
  stroke-width: 18;
  stroke-opacity: 0.5;
}
.kp-flash {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
}
[data-signal="run"] .kp-pulse-trunk {
  animation: kp-travel ${TRUNK_MS}ms linear 1 forwards;
}
[data-signal="run"] .kp-pulse-branch {
  animation: kp-travel ${BRANCH_MS}ms linear ${TRUNK_MS}ms 1 forwards;
}
[data-signal="run"] .kp-flash {
  animation: kp-flash ${FLASH_MS}ms ease-out var(--kp-delay, 0ms) 1 forwards;
}
[data-signal="run"] .kp-node {
  animation: kp-node ${FLASH_MS}ms ease-out var(--kp-delay, 0ms) 1 forwards;
}
[data-signal="run"] .kp-glow {
  animation: kp-glow 600ms ease-out calc(var(--kp-delay, 0ms) - 120ms) 1 both;
}
@keyframes kp-travel {
  0% { stroke-dashoffset: 0; opacity: 1; }
  97% { opacity: 1; }
  100% { stroke-dashoffset: -100; opacity: 0; }
}
@keyframes kp-flash {
  0% { opacity: 0.75; transform: scale(0.55); }
  100% { opacity: 0; transform: scale(1.75); }
}
@keyframes kp-node {
  35% { fill: ${SIGNAL_LIT}; }
}
@keyframes kp-glow {
  30% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  [data-signal="run"] .kp-pulse,
  [data-signal="run"] .kp-flash,
  [data-signal="run"] .kp-node,
  [data-signal="run"] .kp-glow {
    animation: none;
  }
}
`;

/**
 * Runs the signal sequence the first time the diagram is on screen, and
 * returns `replay` for a later pointer re-entry. `run` is false until then,
 * so the first paint is always the steady diagram.
 *
 * Replaying removes `data-signal` and restores it two frames later: removing
 * it cancels every animation back to its resting value, and the second frame
 * guarantees that resting style has been applied before the restart, so the
 * browser treats it as a fresh run. A replay is ignored while a run is still
 * in progress, before the first run, and under reduced motion.
 */
function useSignal(ref: React.RefObject<SVGSVGElement | null>) {
  const [run, setRun] = useState(false);
  const busyUntil = useRef(0);
  const motionOk = useRef(false);

  const start = useCallback(() => {
    busyUntil.current = performance.now() + SEQUENCE_MS;
    setRun(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion never arms the sequence: the steady, lit diagram is the
    // whole experience.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    motionOk.current = true;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, start]);

  const replay = useCallback(() => {
    if (!motionOk.current || busyUntil.current === 0) return;
    if (performance.now() < busyUntil.current) return;
    setRun(false);
    requestAnimationFrame(() => requestAnimationFrame(start));
  }, [start]);

  return { run, replay };
}

/** Halo, glow and pulse-glow blurs; see the LIGHT note for the region. */
function LightFilters() {
  const region = { x: -400, y: -400, width: 1600, height: 1700, filterUnits: "userSpaceOnUse" } as const;
  return (
    <>
      <filter id="kp-blur-halo" {...region}>
        <feGaussianBlur stdDeviation="7" />
      </filter>
      <filter id="kp-blur-glow" {...region}>
        <feGaussianBlur stdDeviation="9" />
      </filter>
      <filter id="kp-blur-pulse" {...region}>
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <filter id="kp-blur-trail" {...region}>
        <feGaussianBlur stdDeviation="5" />
      </filter>
      <radialGradient id="kp-pool">
        <stop offset="0%" stopColor={SIGNAL_LIT} stopOpacity="0.6" />
        <stop offset="45%" stopColor={SIGNAL_NODE} stopOpacity="0.25" />
        <stop offset="100%" stopColor={SIGNAL_NODE} stopOpacity="0" />
      </radialGradient>
    </>
  );
}

export function SystemStack({ className = "" }: { className?: string }) {
  const baseCentre = centreY(PLATES[PLATES.length - 1].y);
  const topCentre = centreY(PLATES[0].y);

  const svgRef = useRef<SVGSVGElement>(null);
  const { run, replay } = useSignal(svgRef);

  /** The two branch runs, shared by the static paths, the travelling pulses
   *  and the endpoint flashes so all three trace identical geometry. */
  const branches = [210, 510].map((x) => ({
    x,
    d: `M360,${baseCentre} L${x},${baseCentre + 50} L${x},752`,
  }));

  const trunkD = `M360,${topCentre} V${baseCentre}`;
  const endpointDelay = { "--kp-delay": `${TRUNK_MS + BRANCH_MS}ms` } as CSSProperties;

  return (
    <svg
      ref={svgRef}
      data-signal={run ? "run" : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") replay();
      }}
      viewBox="0 0 720 800"
      className={className}
      role="img"
      aria-label="Isometric diagram of three stacked plates — a translucent glass layer above two graphite ones — with a mint signal path threading down through a lit peak-shaped cutout in each and branching to two endpoints below the stack. The layers are named alongside."
    >
      <style>{SIGNAL_CSS}</style>

      {/* One mask per plate, punching the peak out of the surface. */}
      <defs>
        <LightFilters />
        {PLATES.map((plate, i) => (
          <mask key={plate.label} id={`kipeo-stack-cut-${i}`}>
            <rect x="0" y="0" width="720" height="800" fill="white" />
            <g transform={plateTransform(plate.y)}>
              <path d={PEAK} fill="black" />
            </g>
          </mask>
        ))}
      </defs>

      {/* Signal trunk, behind every plate: visible through the cutouts and in
          the gaps between layers. Its travelling pulse rides here too, so the
          plates hide it the same way. */}
      {/* Dark only (`--plate-trail-opacity` is 0 in Light): a restrained teal
          glow along the signal path, so it reads on the graphite page. */}
      <line
        x1="360"
        y1="100"
        x2="360"
        y2={baseCentre}
        stroke={SIGNAL_NODE}
        strokeWidth="12"
        strokeLinecap="round"
        filter="url(#kp-blur-trail)"
        style={{ opacity: "var(--plate-trail-opacity)" }}
      />
      <line
        x1="360"
        y1="100"
        x2="360"
        y2={baseCentre}
        stroke={SIGNAL}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        className="kp-pulse kp-pulse-trunk kp-pulse-glow"
        d={trunkD}
        pathLength="100"
        strokeDasharray="5 100"
        filter="url(#kp-blur-pulse)"
      />
      <path className="kp-pulse kp-pulse-trunk" d={trunkD} pathLength="100" strokeDasharray="5 100" />

      {PLATES.map((plate, i) => {
        const m = MATERIALS[plate.material];
        const { y } = plate;
        const cy = centreY(y);
        const isGlass = plate.material === "glass";
        const light = isGlass ? DEEP : SIGNAL_NODE;
        const delay = { "--kp-delay": `${nodeDelayMs(i)}ms` } as CSSProperties;

        return (
          <g key={plate.label}>
            {/* Extruded thickness: the rhombus's two lower edges. */}
            <path
              d={`M60,${cy} L360,${y + 200} L360,${y + 200 + THICKNESS} L60,${cy + THICKNESS} Z`}
              fill={m.left}
            />
            <path
              d={`M360,${y + 200} L660,${cy} L660,${cy + THICKNESS} L360,${y + 200 + THICKNESS} Z`}
              fill={m.right}
            />

            {/* Surface, with the peak punched out. */}
            <g mask={`url(#kipeo-stack-cut-${i})`}>
              <path
                d={`M360,${y} L660,${cy} L360,${y + 200} L60,${cy} Z`}
                fill={m.top}
                style={{ fillOpacity: m.topOpacity }}
              />
              <g transform={plateTransform(y)}>
                <path
                  d="M0,75 H300 M0,150 H300 M0,225 H300 M75,0 V300 M150,0 V300 M225,0 V300"
                  stroke={isGlass ? "var(--plate-glass-grid)" : "var(--plate-grid)"}
                  strokeWidth="1"
                  strokeOpacity="0.2"
                  vectorEffect="non-scaling-stroke"
                  fill="none"
                />
                {/* Reflected light pooled on the graphite around the opening;
                    a local circle, so the projection flattens it to the plate.
                    Centred a little in front of the peak (towards the viewer),
                    where light spilling out of the opening would land. */}
                {isGlass ? null : (
                  <circle
                    className="kp-glow"
                    style={delay}
                    cx="168"
                    cy="178"
                    r="115"
                    fill="url(#kp-pool)"
                    opacity="0.6"
                  />
                )}
              </g>
            </g>

            {/* Halo hugging the aperture, under its crisp rim. */}
            <g transform={plateTransform(y)}>
              <path
                className="kp-glow"
                style={delay}
                d={PEAK}
                fill={light}
                fillOpacity="0.35"
                stroke={light}
                strokeWidth="12"
                strokeLinejoin="round"
                opacity={HALO_REST}
                filter="url(#kp-blur-halo)"
              />
            </g>

            {/* Plate outline, then the aperture rim: a dark inner edge for the
                cut material, with a mint line over it. Without the dark edge
                the hole reads as a white triangle painted on the plate. */}
            <path
              d={`M360,${y} L660,${cy} L360,${y + 200} L60,${cy} Z`}
              fill="none"
              stroke={m.edge}
              strokeOpacity={isGlass ? 0.4 : 0.55}
              strokeWidth="1.5"
            />
            <g transform={plateTransform(y)}>
              <path
                d={PEAK}
                fill="none"
                stroke={m.edge}
                strokeOpacity={isGlass ? 0.35 : 0.9}
                strokeWidth="4"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={PEAK}
                fill="none"
                stroke={SIGNAL}
                strokeOpacity="0.8"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* Node where the trunk meets this layer: a blurred glow behind a
                teal node with a pale-mint core. The node brightens, the glow
                swells and a ring expands out of it as the pulse arrives. */}
            <circle
              className="kp-glow"
              style={delay}
              cx="360"
              cy={cy}
              r="17"
              fill={light}
              opacity={NODE_GLOW_REST}
              filter="url(#kp-blur-glow)"
            />
            <circle className="kp-node" style={delay} cx="360" cy={cy} r="7" fill={light} />
            <circle cx="360" cy={cy} r="3" fill={CORE} />
            <circle
              cx="360"
              cy={cy}
              r="13"
              fill="none"
              stroke={light}
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            <circle
              className="kp-flash"
              style={delay}
              cx="360"
              cy={cy}
              r="13"
              fill="none"
              stroke={SIGNAL_NODE}
              strokeWidth="3"
            />

            {/* Leader stub out to the plate's right. Hidden below `lg`, where
                the labels move underneath and the stub would point at
                nothing. */}
            <line
              x1="672"
              y1={cy}
              x2="712"
              y2={cy}
              stroke={m.edge}
              strokeOpacity="0.45"
              strokeWidth="1.5"
              className="hidden lg:block"
            />
          </g>
        );
      })}

      {/* Two lower endpoints: the trunk branches across the base plate, drops
          past its edge and terminates. Both sit inside the viewBox, so the
          illustration is never cropped. The branches lie on top of the base
          plate, so their pulses are drawn above it. */}
      {branches.map(({ x, d }) => (
        <g key={x}>
          <path
            d={d}
            fill="none"
            stroke={SIGNAL_NODE}
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#kp-blur-trail)"
            style={{ opacity: "var(--plate-trail-opacity)" }}
          />
          <path
            d={d}
            fill="none"
            stroke={SIGNAL}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* The split: both branches carry a pulse from the moment the trunk
              run ends, over the same `d` as the static path above. The dash is
              longer than the trunk's because this run is shorter, and
              `pathLength` makes both 100 units — 3.8% of ~260 and 2.1% of 470
              are the same few pixels on screen. */}
          <path
            className="kp-pulse kp-pulse-branch kp-pulse-glow"
            d={d}
            pathLength="100"
            strokeDasharray="5.5 100"
            filter="url(#kp-blur-pulse)"
          />
          <path
            className="kp-pulse kp-pulse-branch"
            d={d}
            pathLength="100"
            strokeDasharray="5.5 100"
          />

          {/* Endpoint: lit like the plate nodes, and both light together as
              the split pulses land. */}
          <circle
            className="kp-glow"
            style={endpointDelay}
            cx={x}
            cy="760"
            r="18"
            fill={SIGNAL_NODE}
            opacity={NODE_GLOW_REST}
            filter="url(#kp-blur-glow)"
          />
          <circle className="kp-node" style={endpointDelay} cx={x} cy="760" r="8" fill={SIGNAL_NODE} />
          <circle cx={x} cy="760" r="3.5" fill={CORE} />
          <circle cx={x} cy="760" r="14" fill="none" stroke={SIGNAL_NODE} strokeOpacity="0.3" strokeWidth="2" />
          <circle
            className="kp-flash"
            style={endpointDelay}
            cx={x}
            cy="760"
            r="14"
            fill="none"
            stroke={SIGNAL_NODE}
            strokeWidth="3"
          />
        </g>
      ))}
    </svg>
  );
}
