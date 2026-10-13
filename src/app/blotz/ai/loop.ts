/*
 * The shape of the DevOps loop: two round ends joined by a crossed belt. Each
 * end is a full circle, and the two straight strands that cross in the middle
 * touch the circles as tangents, so the ribbon never kinks.
 *
 * Distances are in the drawing's own units, with the crossing at (0, 0) and y
 * pointing down. Everything that reaches the page is rounded, so the page
 * built on the server and the one in the browser write the same numbers.
 */

export type Point = [number, number];

/** Radius of each round end, and how far its centre is from the crossing. */
export const R = 150;
export const A = 232;

// One straight strand, from the crossing to where it touches a circle.
const STRAND = Math.sqrt(A * A - R * R);
// Where the strands touch the circles: (±TX, ±TY).
const TX = A - (R * R) / A;
const TY = (R * STRAND) / A;
// How far round each circle the ribbon goes.
const OPEN = Math.acos(R / A);
const SWEEP = 2 * Math.PI - 2 * OPEN;
const ARC = R * SWEEP;

/** Once round the whole loop. */
export const TOTAL = 4 * STRAND + 2 * ARC;

// The way work flows, starting at the crossing: up into the right end, round it
// clockwise, back through the crossing, up into the left end, round it the other way.
const RIGHT_ARC = STRAND;
const BACK = RIGHT_ARC + ARC;
const LEFT_ARC = BACK + 2 * STRAND;
const HOME = LEFT_ARC + ARC;

const wrap = (s: number) => ((s % TOTAL) + TOTAL) % TOTAL;

/** The point `s` along the loop. */
export function at(distance: number): Point {
  const s = wrap(distance);
  if (s < RIGHT_ARC) return [(TX * s) / STRAND, (-TY * s) / STRAND];
  if (s < BACK) {
    const angle = Math.PI + OPEN + (s - RIGHT_ARC) / R;
    return [A + R * Math.cos(angle), R * Math.sin(angle)];
  }
  if (s < LEFT_ARC) {
    const t = 1 - (s - BACK) / STRAND; // 1 at the right circle, -1 at the left one
    return [TX * t, TY * t];
  }
  if (s < HOME) {
    const angle = -OPEN - (s - LEFT_ARC) / R;
    return [-A + R * Math.cos(angle), R * Math.sin(angle)];
  }
  const t = 1 - (s - HOME) / STRAND;
  return [-TX * t, TY * t];
}

/** Which way the loop is heading at `s`, in degrees. */
export function heading(s: number) {
  const [x0, y0] = at(s - 1);
  const [x1, y1] = at(s + 1);
  return (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
}

/**
 * A point just inside the loop at `s`: `gap` units from the ribbon, towards
 * the middle of whichever end that stretch belongs to. On the straight
 * strands the gap closes, so something travelling there slides through the
 * crossing instead of jumping from one end to the other.
 */
export function inside(distance: number, gap: number): Point {
  const s = wrap(distance);
  const [x, y] = at(s);
  const right = s < BACK + STRAND;
  const centre = right ? A : -A;
  // 0 at the crossing, 1 once on a circle
  const reach = s < RIGHT_ARC ? s / STRAND : s < BACK ? 1 : s < LEFT_ARC ? Math.abs(1 - (s - BACK) / STRAND) : s < HOME ? 1 : 1 - (s - HOME) / STRAND;
  const dx = centre - x;
  const length = Math.hypot(dx, y) || 1;
  const pull = gap * (1 - (1 - reach) * (1 - reach));
  return [x + (dx / length) * pull, y + (-y / length) * pull];
}

/** Where the seven stages sit: three evenly round the left end, four evenly round the right. */
export const stops = [
  LEFT_ARC + ARC / 6,
  LEFT_ARC + ARC / 2,
  LEFT_ARC + (5 * ARC) / 6,
  RIGHT_ARC + ARC / 8,
  RIGHT_ARC + (3 * ARC) / 8,
  RIGHT_ARC + (5 * ARC) / 8,
  RIGHT_ARC + (7 * ARC) / 8,
];

/** An arrowhead halfway between each pair of neighbouring stages, and one on each strand as it leaves the crossing. */
export const arrows = [
  LEFT_ARC + ARC / 3,
  LEFT_ARC + (2 * ARC) / 3,
  STRAND * 0.56,
  RIGHT_ARC + ARC / 4,
  RIGHT_ARC + ARC / 2,
  RIGHT_ARC + (3 * ARC) / 4,
  BACK + STRAND * 1.56,
];

const n = (value: number) => value.toFixed(1);

/** One end as a closed shape, for filling. */
export const RIGHT_END = `M 0 0 L ${n(TX)} ${n(-TY)} A ${R} ${R} 0 1 1 ${n(TX)} ${n(TY)} Z`;
export const LEFT_END = `M 0 0 L ${n(-TX)} ${n(-TY)} A ${R} ${R} 0 1 0 ${n(-TX)} ${n(TY)} Z`;

/** The ribbon round one end, from the crossing and back. */
export const RIGHT_RIBBON = `M 0 0 L ${n(TX)} ${n(-TY)} A ${R} ${R} 0 1 1 ${n(TX)} ${n(TY)} L 0 0`;
export const LEFT_RIBBON = `M 0 0 L ${n(-TX)} ${n(-TY)} A ${R} ${R} 0 1 0 ${n(-TX)} ${n(TY)} L 0 0`;

/** The whole loop in one stroke, in the direction work flows. */
export const LOOP = `M 0 0 L ${n(TX)} ${n(-TY)} A ${R} ${R} 0 1 1 ${n(TX)} ${n(TY)} L ${n(-TX)} ${n(-TY)} A ${R} ${R} 0 1 0 ${n(-TX)} ${n(TY)} L 0 0`;

/*
 * The moving dashes repeat every DASH units. The loop is measured as a whole
 * number of repeats, so the dashes meet themselves cleanly where it closes.
 */
export const DASH = 30;
export const LOOP_DASHES = Math.round(TOTAL / DASH) * DASH;

/*
 * At the crossing one strand passes over the other: the one that climbs from
 * the left end into the right end. `over(d)` is the point `d` units along it
 * from the crossing (negative is back towards the left end).
 */
const UX = TX / STRAND;
const UY = -TY / STRAND;
export const over = (d: number): [string, string] => [n(UX * d), n(UY * d)];
/** The same strand's tilt, for a box drawn along it. */
export const OVER_TILT = n((Math.atan2(UY, UX) * 180) / Math.PI);
/** Real units covered by one repeat of the dashes, so a second copy can be laid exactly on the first. */
export const DASH_REAL = (DASH * TOTAL) / LOOP_DASHES;
