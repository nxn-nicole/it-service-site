"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Code2, FilePenLine, Map as MapIcon, MessageCircle, Rocket, ScanSearch, Smartphone } from "lucide-react";
import { Band, Clauses, Sticker, Title, bouncy, useTimeline } from "@/components/kit";
import content from "./content.json";
import {
  A,
  DASH,
  DASH_REAL,
  LEFT_END,
  LEFT_RIBBON,
  LOOP,
  LOOP_DASHES,
  OVER_TILT,
  R,
  RIGHT_END,
  RIGHT_RIBBON,
  TOTAL,
  arrows,
  at,
  heading,
  inside,
  over,
  stops,
  type Point,
} from "./loop";
import { RoleBun } from "./RoleBun";

/*
 * The page's first screen: the whole project as a loop, the way DevOps is
 * usually drawn. Three stages of planning go round the left end, four of
 * building round the right, and a release leads straight back to feedback.
 * The stages are listed on either side of the loop, tied to it by their
 * numbers, so the picture stays wide and short and fits one screen.
 */

const { stages } = content;

const stageIcons = [MessageCircle, MapIcon, FilePenLine, Code2, Smartphone, ScanSearch, Rocket];

// One step per stage, in order, then round again.
const STAGE_STEPS = [1300, 1300, 1300, 1400, 1400, 1300, 1500] as const;

// The first stage of the development end: the cards before it go on the left, the rest on the right.
const START = 3;

// The ribbon: a stronger tint of each end's colour, so the white dashes show on it.
const TRACK = { left: "#c6baf9", right: "#c5e56f" };
// How far either side of the crossing the strand on top is redrawn.
const OVER = 46;

/*
 * Two ways of drawing the loop, by how much room there is. Sizes inside it are
 * set against the loop's own width, so the points, the numbers and the buns
 * keep their proportions whatever size it is drawn at.
 *
 * roomy   beside the cards; the bun walks round the inside of the loop
 * compact on a phone, above the list; the bun sits on top of the point it is at
 */
const looks = {
  roomy: {
    frame: { x: -(A + R) - 40, y: -R - 40, w: 2 * (A + R) + 80, h: 2 * R + 84 },
    node: "size-[clamp(26px,5.6cqw,48px)] text-[clamp(12px,2.5cqw,21px)]",
    bun: "w-[clamp(38px,9.6cqw,72px)]",
    pair: "-ml-[2.6cqw]",
    lobe: "text-[clamp(18px,4.2cqw,38px)]",
    // Each end's name sits towards the crossing, out of the way of the bun walking round the inside
    label: [A - 82, 0] as Point,
    spot: (s: number, gap: number) => inside(s, gap),
  },
  compact: {
    // The room on top is for a bun standing on a top point, chef's hat and all
    frame: { x: -(A + R) - 44, y: -R - 150, w: 2 * (A + R) + 88, h: 2 * R + 198 },
    node: "size-[clamp(26px,9.4cqw,38px)] text-[clamp(12px,4cqw,16px)]",
    bun: "w-[clamp(28px,10.4cqw,42px)]",
    pair: "-ml-[2.8cqw]",
    lobe: "text-[clamp(14px,4.8cqw,20px)]",
    // Above the middle: a bun at a lower point stands just below it, and its hat needs the room
    label: [A, -50] as Point,
    spot: (s: number): Point => {
      const [x, y] = at(s);
      return [x, y - 84];
    },
  },
};

type Look = keyof typeof looks;
type Frame = (typeof looks)[Look]["frame"];

// Rounded, so the page built on the server and the one in the browser write the very same numbers.
const place = ([x, y]: Point, frame: Frame) => ({
  left: `${(((x - frame.x) / frame.w) * 100).toFixed(2)}%`,
  top: `${(((y - frame.y) / frame.h) * 100).toFixed(2)}%`,
});

/*
 * How far inside the loop the bun stands at each stage, in the drawing's
 * units: just clear of the stage's point. Two buns side by side are wider
 * than one, and a point on the side of the loop is met by the bun's width
 * where one on top or underneath is met by its height.
 */
const POINT = 28; // a point's radius when it is the one in turn
const BUN = { half: 40.5, pairHalf: 70, halfHeight: 39 };
// How far a chef's hat stands above the bun's own box. Only a point above the bun is in its way.
const HAT: Record<string, number> = { Senior: 25, Developer: 9 };
const gaps = stops.map((s, i) => {
  const [x, y] = at(s);
  const [cx, cy] = inside(s, 1);
  const across = Math.abs(cx - x);
  const down = Math.abs(cy - y);
  const { owners } = stages.items[i];
  const wide = owners.length > 1 ? BUN.pairHalf : BUN.half;
  const hat = cy > y ? Math.max(...owners.map((owner) => HAT[owner] ?? 0)) : 0;
  return POINT + across * wide + down * (BUN.halfHeight + hat) + 4;
});

/** The way the bun travels to reach each stage from the one before, as lists of positions. */
const routes = Object.fromEntries(
  (Object.keys(looks) as Look[]).map((look) => [
    look,
    stops.map((to, step) => {
      const before = (step + stops.length - 1) % stops.length;
      const from = stops[before];
      const distance = to > from ? to - from : to - from + TOTAL;
      const points = Array.from({ length: 25 }, (_, i) => {
        const t = i / 24;
        return place(looks[look].spot(from + distance * t, gaps[before] + (gaps[step] - gaps[before]) * t), looks[look].frame);
      });
      return { left: points.map((p) => p.left), top: points.map((p) => p.top) };
    }),
  ]),
) as Record<Look, { left: string[]; top: string[] }[]>;

/* ── who looks after what ────────────────────────────────── */

const ownerChip: Record<string, string> = {
  Senior: "bg-brand-purple text-white",
  Developer: "bg-brand-lime",
  PM: "bg-white",
};

function Owners({ owners, className = "" }: { owners: string[]; className?: string }) {
  return (
    <span className={`flex flex-wrap gap-1.5 ${className}`}>
      {owners.map((owner) => (
        <span key={owner} className={`rounded-full border-2 border-brand-ink px-2.5 py-0.5 text-[13px] font-black leading-snug ${ownerChip[owner] ?? "bg-white"}`}>
          {owner}
        </span>
      ))}
    </span>
  );
}

type Stage = (typeof stages.items)[number];

/** A stage's number, in the colour of whoever owns it: the same on the loop, on its card and in the list. */
function Num({ stage, n, className = "" }: { stage: Stage; n: number; className?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-brand-ink font-black leading-none ${ownerChip[stage.owners[0]] ?? "bg-white"} ${className}`}
    >
      {n}
    </span>
  );
}

/* ── the loop ────────────────────────────────────────────── */

function Loop({ look: name, step }: { look: Look; step: number }) {
  const look = looks[name];
  const { frame } = look;
  const stage = stages.items[step];
  const [fromX, fromY] = over(-30);
  const [toX, toY] = over(30);

  return (
    <div className="relative mx-auto w-full [container-type:inline-size]" style={{ aspectRatio: `${frame.w} / ${frame.h}` }}>
      <svg viewBox={`${frame.x} ${frame.y} ${frame.w} ${frame.h}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id={`loop-${name}-blend`} gradientUnits="userSpaceOnUse" x1={fromX} y1={fromY} x2={toX} y2={toY}>
            <stop offset="0" stopColor={TRACK.left} />
            <stop offset="1" stopColor={TRACK.right} />
          </linearGradient>
          <clipPath id={`loop-${name}-top`}>
            <rect x={-OVER} y={-13} width={OVER * 2} height={26} transform={`rotate(${OVER_TILT})`} />
          </clipPath>
        </defs>

        {/* Each end is filled with its own colour, so the two halves read as two areas of work */}
        <path d={LEFT_END} fill="var(--color-brand-purple-soft)" opacity="0.75" />
        <path d={RIGHT_END} fill="var(--color-brand-lime-soft)" opacity="0.85" />

        {/* The ribbon: an ink outline, then the two ends in their own colour */}
        <path d={LOOP} fill="none" stroke="var(--color-brand-ink)" strokeWidth="34" strokeLinejoin="round" />
        <path d={LEFT_RIBBON} fill="none" stroke={TRACK.left} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
        <path d={RIGHT_RIBBON} fill="none" stroke={TRACK.right} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dashes that keep moving the way the work flows */}
        <path
          d={LOOP}
          pathLength={LOOP_DASHES}
          fill="none"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`4 ${DASH - 4}`}
          className="animate-loop-flow"
        />

        {/* At the crossing, the strand going from planning into building passes over the one coming back */}
        <path d={`M ${over(-OVER).join(" ")} L ${over(OVER).join(" ")}`} fill="none" stroke="var(--color-brand-ink)" strokeWidth="34" />
        <path d={`M ${over(-OVER - 8).join(" ")} L ${over(OVER + 8).join(" ")}`} fill="none" stroke={`url(#loop-${name}-blend)`} strokeWidth="26" />
        <path
          d={`M ${over(-2 * DASH_REAL).join(" ")} L ${over(2 * DASH_REAL).join(" ")}`}
          pathLength={4 * DASH}
          fill="none"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`4 ${DASH - 4}`}
          clipPath={`url(#loop-${name}-top)`}
          className="animate-loop-flow"
        />

        {arrows.map((s) => {
          const [x, y] = at(s);
          return (
            <polygon
              key={s}
              points="-6,-7 7,0 -6,7"
              fill="var(--color-brand-ink)"
              stroke="var(--color-brand-ink)"
              strokeWidth="3"
              strokeLinejoin="round"
              transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${heading(s).toFixed(1)})`}
            />
          );
        })}
      </svg>

      {/* What each end is about */}
      {stages.lobes.map((lobe, i) => (
        <span
          key={lobe}
          className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-black text-brand-ink/30 ${look.lobe}`}
          style={place([i === 0 ? -look.label[0] : look.label[0], look.label[1]], frame)}
        >
          {lobe}
        </span>
      ))}

      {/* The seven stages, by number */}
      {stages.items.map((item, i) => (
        <div key={item.name} className="absolute" style={place(at(stops[i]), frame)}>
          <motion.span
            initial={false}
            animate={{ scale: step === i ? 1.2 : 1 }}
            transition={bouncy}
            className="absolute left-0 top-0 block -translate-x-1/2 -translate-y-1/2"
          >
            <Num stage={item} n={i + 1} className={`shadow-[0_3px_0_0_var(--color-brand-ink)] ${look.node}`} />
          </motion.span>
        </div>
      ))}

      {/* The bun goes round and round, as whoever owns the stage it is at */}
      <motion.div
        className="pointer-events-none absolute z-10"
        initial={false}
        animate={routes[name][step]}
        transition={{ duration: 1, ease: "linear" }}
        style={place(look.spot(stops[step], gaps[step]), frame)}
      >
        <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
          <AnimatePresence initial={false}>
            <motion.div
              key={stage.owners.join("+")}
              initial={{ scale: 0.3, rotate: -14 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={bouncy}
              className="flex w-max items-end"
            >
              {stage.owners.map((owner, k) => (
                <RoleBun key={owner} role={owner} className={`${look.bun} ${k ? look.pair : "relative z-10"}`} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

/* ── the stages beside the loop ──────────────────────────── */

/** One end's stages as a column of cards. Wide screens have room to say what each stage is. */
function Cards({ from, to, step, className }: { from: number; to: number; step: number; className: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {stages.items.slice(from, to).map((stage, k) => {
        const i = from + k;
        return (
          <div
            key={stage.name}
            className={`relative rounded-2xl border-2 border-brand-ink px-3 py-2 shadow-[0_3px_0_0_var(--color-brand-ink)] transition-colors duration-300 min-[900px]:py-1.5 xl:px-3.5 xl:py-2 ${
              step === i ? "bg-brand-yellow" : "bg-white"
            }`}
          >
            {/* Under the loop the cards are wide, so the owners go on the same line as the name; beside it they go underneath */}
            <div className="flex items-center justify-between gap-3 min-[900px]:block">
              <span className="flex items-center gap-2 whitespace-nowrap text-base font-black leading-tight xl:text-lg">
                <Num stage={stage} n={i + 1} className="h-6 w-6 text-xs" />
                {stage.name}
              </span>
              <Owners owners={stage.owners} className="flex-nowrap min-[900px]:mt-1.5 xl:mt-1" />
            </div>
            <span className="mt-1 hidden max-w-[13.4em] text-[15px] font-bold leading-snug text-brand-ink/70 xl:block">
              <Clauses text={stage.what} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Says what the stage the bun has reached is for. */
function Now({ step }: { step: number }) {
  const stage = stages.items[step];
  return (
    <div className="flex min-h-12 items-start justify-center min-[900px]:max-lg:min-h-[4.25rem]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="flex items-center gap-2.5 rounded-[22px] border-2 border-brand-ink bg-white px-4 py-2 text-base font-black leading-snug shadow-[0_3px_0_0_var(--color-brand-ink)] lg:text-lg lg:leading-snug"
        >
          <Num stage={stage} n={step + 1} className="h-6 w-6 text-xs" />
          <span className="text-balance">
            {stage.name}
            <span className="font-bold text-brand-muted">
              ：<Clauses text={stage.what} />
            </span>
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function StagesScene() {
  // On a phone the loop and its list are taller than the screen, so a fifth of them in view is enough to keep it going.
  const ref = useRef<HTMLDivElement | null>(null);
  const onScreen = useInView(ref, { amount: 0.2 });
  const { step } = useTimeline(STAGE_STEPS, onScreen);

  return (
    // The site menu sits above the page in its own strip; pulling this band up under it lets the colour run to the top of the window.
    <Band tone="yellow" className="-mt-20 pt-[104px]! pb-10! md:pt-[98px]! md:pb-6!">
      {/* Nothing here fades in: it is the first thing on the page, so it is there from the first paint */}
      <div className="space-y-3 text-center">
        <Sticker tone="yellow" className="-rotate-2">
          {stages.eyebrow}
        </Sticker>
        <h1 className="isolate text-[2rem] font-black leading-[1.2] tracking-tight md:text-5xl">
          <Title text={stages.title} />
        </h1>
      </div>

      <div ref={ref}>
        {/*
         * Tablets and up: the loop with its stages on either side. On a narrower
         * tablet the two columns of cards go under the loop instead.
         */}
        <div className="mt-5 hidden grid-cols-2 items-center gap-x-4 gap-y-8 [grid-template-areas:'loop_loop'_'left_right'] md:grid min-[900px]:grid-cols-[auto_minmax(0,1fr)_auto] min-[900px]:[grid-template-areas:'left_loop_right'] xl:mt-4 xl:gap-x-6">
          <Cards from={0} to={START} step={step} className="[grid-area:left] max-[899px]:self-start" />
          <div className="[grid-area:loop]">
            <Loop look="roomy" step={step} />
            {/* Below the widest screens the cards have no room to say what a stage is, so it shows here for the stage in turn */}
            <div className="mt-3 xl:hidden">
              <Now step={step} />
            </div>
          </div>
          <Cards from={START} to={stages.items.length} step={step} className="[grid-area:right] max-[899px]:self-start" />
        </div>

        {/* Phones: the loop, then the stages as a list */}
        <div className="mt-3 md:hidden">
          <Loop look="compact" step={step} />
          <ol className="mt-5 grid gap-2.5">
            {stages.items.map((stage, i) => {
              const Icon = stageIcons[i];
              const on = step === i;
              return (
                <li
                  key={stage.name}
                  className={`flex items-center gap-3 rounded-2xl border-2 border-brand-ink px-3.5 py-3 transition-colors duration-300 ${
                    on ? "bg-brand-yellow shadow-[0_5px_0_0_var(--color-brand-ink)]" : "bg-white shadow-[0_3px_0_0_var(--color-brand-ink)]"
                  }`}
                >
                  <Num stage={stage} n={i + 1} className="h-10 w-10 text-base" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-lg font-black leading-tight">
                      <Icon className="h-5 w-5 shrink-0" strokeWidth={2.4} />
                      {stage.name}
                    </span>
                    <span className="mt-0.5 block text-[15px] font-bold leading-snug text-brand-ink/70">
                      <Clauses text={stage.what} />
                    </span>
                  </span>
                  <Owners owners={stage.owners} className="shrink-0 flex-col items-end" />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Band>
  );
}
