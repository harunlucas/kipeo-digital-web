import type { ReactNode } from "react";

/**
 * Three small isometric illustrations for the "What we build" rows, drawn
 * with the same technique as the hero's release stack: local square
 * coordinates projected by `matrix(1, 1/3, -1, 1/3, 0, 0)`, which maps a
 * w x h rect onto a flattened isometric parallelogram, plus two hand-built
 * polygons for the extruded thickness.
 *
 * Palette shared with `system-stack-artwork.tsx` through the `--plate-*` CSS
 * custom properties rather than imported: that
 * module is a client component, and these are static server-rendered SVGs
 * with no interactivity. If the hero's materials change, change them here
 * too — the two sets are meant to stay identical.
 *
 * Every illustration is drawn in the same unit system and every viewBox is
 * the same 200 units wide, so all three render at one consistent scale
 * whatever the column measures. Only the viewBox *height* is per
 * illustration, cropped to that drawing's own vertical extent plus even
 * padding — a shared tall box would leave each one floating in empty space
 * and drawn smaller than the column allows.
 *
 * Every illustration is `aria-hidden`: the service title and description
 * beside it already say what it depicts.
 */

/* The `--plate-*` custom properties in `globals.css`, shared with the hero
   diagram so both follow the site appearance. */
const GRAPHITE = {
  top: "var(--plate-graphite-top)",
  left: "var(--plate-graphite-left)",
  right: "var(--plate-graphite-right)",
  edge: "var(--plate-edge)",
};
const GRAPHITE_DEEP = {
  top: "var(--plate-deep-top)",
  left: "var(--plate-deep-left)",
  right: "var(--plate-deep-right)",
  edge: "var(--plate-edge)",
};
const GLASS = {
  top: "var(--plate-glass-top)",
  left: "var(--plate-glass-left)",
  right: "var(--plate-glass-right)",
  edge: "var(--plate-glass-edge)",
};

const SIGNAL = "#0f9b8e";
const SIGNAL_NODE = "#14b8a6";
const GRID = "var(--plate-grid)";

const ISO = "matrix(1, 0.33333, -1, 0.33333, 0, 0)";

/** Project local plate coordinates to screen, given where local (0,0) sits. */
function project(x: number, y: number, u: number, v: number): [number, number] {
  return [x + u - v, y + (u + v) / 3];
}

/** Screen position of the centre of a w x h plate whose local origin is (x, y). */
function plateCentre(x: number, y: number, w: number, h: number): [number, number] {
  return project(x, y, w / 2, h / 2);
}

/** Local origin that puts a w x h plate's centre at (cx, cy). */
function originForCentre(cx: number, cy: number, w: number, h: number): [number, number] {
  return [cx + (h - w) / 2, cy - (w + h) / 6];
}

type Material = { top: string; left: string; right: string; edge: string };

type SlabProps = {
  /** Screen position of the plate's local (0,0) corner — its top vertex. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Extruded depth, in screen pixels straight down. */
  t?: number;
  material: Material;
  topOpacity?: number;
  /** Surface detail, drawn in local (un-projected) coordinates. */
  children?: ReactNode;
};

/**
 * One isometric plate: two extrusion faces in screen space, then the surface
 * and any detail inside the projection transform.
 */
function Slab({ x, y, w, h, t = 8, material, topOpacity = 1, children }: SlabProps) {
  const right = project(x, y, w, 0);
  const bottom = project(x, y, w, h);
  const left = project(x, y, 0, h);

  return (
    <g>
      <polygon
        points={`${left[0]},${left[1]} ${bottom[0]},${bottom[1]} ${bottom[0]},${bottom[1] + t} ${left[0]},${left[1] + t}`}
        fill={material.left}
      />
      <polygon
        points={`${bottom[0]},${bottom[1]} ${right[0]},${right[1]} ${right[0]},${right[1] + t} ${bottom[0]},${bottom[1] + t}`}
        fill={material.right}
      />
      <g transform={`translate(${x}, ${y}) ${ISO}`}>
        <rect width={w} height={h} fill={material.top} fillOpacity={topOpacity} />
        <rect
          width={w}
          height={h}
          fill="none"
          stroke={material.edge}
          strokeOpacity="0.55"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        {children}
      </g>
    </g>
  );
}

/**
 * `viewBox` is always "0 y 240 h" — width fixed at 240 for every
 * illustration, so pixels-per-unit (and therefore scale) is identical across
 * all three; only `y`/`h` move, cropping each one to its own content height
 * instead of sharing one frame tall enough for the biggest drawing.
 */
function Frame({ viewBox, children }: { viewBox: string; children: ReactNode }) {
  return (
    <svg viewBox={viewBox} className="h-auto w-full" aria-hidden focusable="false">
      {children}
    </svg>
  );
}

/** Three connected modules sharing a common base. */
export function BusinessSystemsIllustration() {
  const base = { x: 120, y: 44, w: 84, h: 84 };

  // Module seats, in the base plate's own local coordinates, so the
  // connectors drawn on the surface and the modules stacked on top of them
  // cannot drift apart.
  const seats: [number, number][] = [
    [22, 22],
    [60, 22],
    [22, 60],
  ];
  const moduleSize = { w: 16, h: 16 };

  const placed = seats
    .map(([u, v]) => {
      const [cx, cy] = project(base.x, base.y, u, v);
      const [x, y] = originForCentre(cx, cy, moduleSize.w, moduleSize.h);
      return { x, y, cy };
    })
    // Back to front, so a nearer module overlaps the one behind it.
    .sort((a, b) => a.cy - b.cy);

  return (
    <Frame viewBox="0 36 240 81">
      <Slab {...base} t={9} material={GRAPHITE_DEEP}>
        <path
          d="M0,28 H84 M0,56 H84 M28,0 V84 M56,0 V84"
          stroke={GRID}
          strokeOpacity="0.2"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          fill="none"
        />
        {/* Connectors between the three seats, lying on the base surface. */}
        <path
          d="M22,22 L60,22 M22,22 L22,60 M60,22 L22,60"
          stroke={SIGNAL}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          fill="none"
        />
      </Slab>

      {placed.map((seat) => (
        <Slab key={`${seat.x},${seat.y}`} x={seat.x} y={seat.y} {...moduleSize} t={10} material={GLASS} />
      ))}
    </Frame>
  );
}

/** A browser window paired with a mobile storefront. */
export function CommerceIllustration() {
  const browser = { x: 86, y: 50, w: 60, h: 60 };
  const phone = { x: 196, y: 74, w: 18, h: 40 };

  // Both link points sit on the ground plane, so the straight line between
  // them projects as a straight line.
  const fromBrowser = project(browser.x, browser.y, browser.w, 30);
  const toPhone = project(phone.x, phone.y, 0, 20);

  return (
    <Frame viewBox="0 42 240 66">
      <Slab {...browser} t={9} material={GRAPHITE}>
        {/* Chrome bar, then the viewport and two product tiles. */}
        <rect x="5" y="5" width="50" height="9" fill="var(--plate-graphite-right)" />
        {[10, 16, 22].map((cx) => (
          <circle key={cx} cx={cx} cy="9.5" r="1.9" fill={SIGNAL} fillOpacity="0.8" />
        ))}
        <rect x="5" y="16" width="50" height="39" fill={GLASS.top} />
        <rect x="10" y="21" width="18" height="14" fill="none" stroke={SIGNAL} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <rect x="32" y="21" width="18" height="14" fill="none" stroke={SIGNAL} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <path d="M10,42 H50 M10,47 H36" stroke={SIGNAL} strokeOpacity="0.55" strokeWidth="1.5" vectorEffect="non-scaling-stroke" fill="none" />
      </Slab>

      <line
        x1={fromBrowser[0]}
        y1={fromBrowser[1]}
        x2={toPhone[0]}
        y2={toPhone[1]}
        stroke={SIGNAL}
        strokeWidth="1.5"
      />
      <circle cx={fromBrowser[0]} cy={fromBrowser[1]} r="2.6" fill={SIGNAL_NODE} />
      <circle cx={toPhone[0]} cy={toPhone[1]} r="2.6" fill={SIGNAL_NODE} />

      <Slab {...phone} t={7} material={GRAPHITE}>
        <rect x="2.5" y="4" width="13" height="32" fill={GLASS.top} />
        <rect x="4.5" y="7" width="9" height="9" fill="none" stroke={SIGNAL} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <path d="M4.5,20 H13.5 M4.5,24 H10.5" stroke={SIGNAL} strokeOpacity="0.55" strokeWidth="1.5" vectorEffect="non-scaling-stroke" fill="none" />
      </Slab>
    </Frame>
  );
}

/** A processing node connecting a data source to a destination. */
export function AutomationIllustration() {
  const source = { x: 58, y: 68, w: 26, h: 26 };
  const node = { x: 120, y: 56, w: 32, h: 32 };
  const destination = { x: 182, y: 68, w: 26, h: 26 };

  const sourceCentre = plateCentre(source.x, source.y, source.w, source.h);
  const nodeCentre = plateCentre(node.x, node.y, node.w, node.h);
  const destinationCentre = plateCentre(destination.x, destination.y, destination.w, destination.h);

  return (
    <Frame viewBox="0 48 240 53">
      {/* Routed behind the plates, as the hero's trunk is: the run shows in
          the gaps and terminates in a node on each surface. */}
      <path
        d={`M${sourceCentre[0]},${sourceCentre[1]} L${nodeCentre[0]},${nodeCentre[1]} L${destinationCentre[0]},${destinationCentre[1]}`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth="1.5"
      />

      <Slab {...source} t={8} material={GRAPHITE}>
        <path
          d="M0,8.6 H26 M0,17.3 H26"
          stroke={GRID}
          strokeOpacity="0.25"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          fill="none"
        />
      </Slab>

      {/* Raised, and the only pale face: the processing step. */}
      <Slab {...node} t={14} material={GLASS}>
        <circle cx="16" cy="16" r="6.5" fill="none" stroke={SIGNAL} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <circle cx="16" cy="16" r="2.4" fill={SIGNAL} />
      </Slab>

      <Slab {...destination} t={8} material={GRAPHITE}>
        <path
          d="M0,8.6 H26 M0,17.3 H26"
          stroke={GRID}
          strokeOpacity="0.25"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          fill="none"
        />
      </Slab>

      {[sourceCentre, nodeCentre, destinationCentre].map(([cx, cy]) => (
        <circle key={`${cx},${cy}`} cx={cx} cy={cy} r="3" fill={SIGNAL_NODE} />
      ))}
    </Frame>
  );
}
