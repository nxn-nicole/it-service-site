"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import { Check, GitPullRequest, Lightbulb, Pencil, Play, Rocket, User, Users, X } from "lucide-react";
import { bouncy, spring, useOnScreen, useTimeline } from "@/components/kit";

/* Four small pictures for the "how we teach" cards on the home page. Each one
   shows the idea; the card adds one short line under it. */

const stage = "relative mx-auto h-[150px] w-[300px] max-w-full";

/* ── small class, with one-to-one time ───────────────────── */

// The step is whichever student has the mentor's attention.
const CLASS_STEPS = [1300, 1300, 1300, 1300] as const;

// Seats inside a 300 × 150 picture.
const seats = [
  { x: 190, y: 42, tone: "bg-brand-blue" },
  { x: 256, y: 42, tone: "bg-brand-purple" },
  { x: 190, y: 110, tone: "bg-brand-yellow" },
  { x: 256, y: 110, tone: "bg-brand-coral" },
];
const mentor = { x: 44, y: 76 };

export function SmallClassScene() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step } = useTimeline(CLASS_STEPS, onScreen);

  return (
    <div ref={ref} className={stage} aria-hidden>
      <svg viewBox="0 0 300 150" className="absolute inset-0 h-full w-full">
        {seats.map((seat, i) => (
          <motion.line
            key={i}
            x1={mentor.x + 30}
            y1={mentor.y}
            x2={seat.x - 22}
            y2={seat.y}
            stroke="var(--color-brand-ink)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="2 8"
            initial={false}
            animate={{ opacity: step === i ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />
        ))}
      </svg>

      <span
        className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-lime text-center text-[11px] font-black leading-[1.15] shadow-[0_3px_0_0_var(--color-brand-ink)]"
        style={{ left: `${(mentor.x / 300) * 100}%`, top: mentor.y }}
      >
        Tech
        <br />
        Lead
      </span>

      {seats.map((seat, i) => (
        <div key={i} className="absolute" style={{ left: `${(seat.x / 300) * 100}%`, top: seat.y }}>
          <motion.span
            initial={false}
            animate={{ scale: step === i ? 1.25 : 1 }}
            transition={bouncy}
            className={`absolute -left-[18px] -top-[18px] flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-ink text-white ${seat.tone}`}
          >
            <User className="h-4 w-4" strokeWidth={3} />
          </motion.span>
          <AnimatePresence>
            {step === i && (
              <motion.span
                initial={{ opacity: 0, scale: 0.4, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={bouncy}
                className="absolute -top-[46px] left-0 rounded-full border-2 border-brand-ink bg-white px-2 py-0.5 text-xs font-black"
              >
                1v1
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ── a plan cut to each student's own gap ────────────────── */

// 0 everyone's weak spot shows · 1-3 one student's own gap is filled · 4 all done
const TAILOR_STEPS = [1000, 1100, 1100, 1100, 1900] as const;

const learners = [
  { bars: [70, 28, 86], weak: 1, tone: "bg-brand-blue" },
  { bars: [30, 80, 62], weak: 0, tone: "bg-brand-purple" },
  { bars: [76, 66, 26], weak: 2, tone: "bg-brand-yellow" },
];

export function TailoredScene() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step } = useTimeline(TAILOR_STEPS, onScreen);

  return (
    <div ref={ref} className={`${stage} grid grid-cols-3 gap-3`} aria-hidden>
      {learners.map((learner, j) => {
        const helped = step > j;
        return (
          <motion.div
            key={j}
            initial={false}
            animate={{ y: step === j + 1 ? -6 : 0 }}
            transition={spring}
            className={`flex flex-col items-center justify-between rounded-2xl border-2 bg-white px-2 pb-2 pt-2.5 transition-[border-color,box-shadow] duration-300 ${
              step === j + 1 ? "border-brand-ink shadow-[0_4px_0_0_var(--color-brand-ink)]" : "border-brand-ink/20"
            }`}
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-ink text-white ${learner.tone}`}>
              <User className="h-4 w-4" strokeWidth={3} />
            </span>
            <div className="flex h-[84px] items-end gap-1.5">
              {learner.bars.map((height, b) => {
                const weak = b === learner.weak;
                return (
                  <motion.span
                    key={b}
                    initial={false}
                    animate={{ height: `${weak && helped ? 92 : height}%` }}
                    transition={spring}
                    className={`w-3.5 rounded-t-md border-2 border-b-0 border-brand-ink transition-colors duration-300 ${
                      weak ? (helped ? "bg-brand-lime" : "bg-brand-coral") : "bg-brand-ink/15"
                    }`}
                  />
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── explained by drawing it on a whiteboard ─────────────── */

// 0 a phone · 1 arrow · 2 a cloud · 3 arrow · 4 a database · 5 it clicks
const DRAW_STEPS = [1500, 450, 1150, 450, 1350, 2400] as const;

const CLOUD = "M 132 85 Q 118 85 118 73 Q 118 62 130 61 Q 132 47 147 47 Q 160 47 164 58 Q 182 57 182 72 Q 182 85 168 85 Z";

// Every pen stroke of the sketch, in the units of a 300 × 150 picture, with the
// step that draws it. Pictures only: nothing on the board is written out.
const strokes = [
  // the app on a phone
  { step: 0, d: "M 44 34 H 72 Q 80 34 80 42 V 90 Q 80 98 72 98 H 44 Q 36 98 36 90 V 42 Q 36 34 44 34" },
  { step: 0, d: "M 45 47 H 71" },
  { step: 0, d: "M 45 57 H 63" },
  { step: 0, d: "M 45 69 H 71 V 82 H 45 Z" },
  { step: 1, d: "M 87 66 H 110" },
  { step: 1, d: "M 104 60 L 110 66 L 104 72" },
  // the server it talks to
  { step: 2, d: CLOUD },
  { step: 3, d: "M 189 66 H 212" },
  { step: 3, d: "M 206 60 L 212 66 L 206 72" },
  // the database behind it
  { step: 4, d: "M 220 43 A 22 7 0 1 1 264 43 A 22 7 0 1 1 220 43" },
  { step: 4, d: "M 220 43 V 89 A 22 7 0 0 0 264 89 V 43" },
  { step: 4, d: "M 220 58 A 22 7 0 0 0 264 58" },
  { step: 4, d: "M 220 74 A 22 7 0 0 0 264 74" },
];

// A wash of colour that comes in once a picture is finished.
const washes = [
  { after: 0, d: "M 45 69 H 71 V 82 H 45 Z", fill: "var(--color-brand-lime)" },
  { after: 2, d: CLOUD, fill: "var(--color-brand-blue-soft)" },
  { after: 4, d: "M 220 43 V 89 A 22 7 0 0 0 264 89 V 43 A 22 7 0 0 0 220 43 Z", fill: "var(--color-brand-yellow-soft)" },
];

const PEN_START = { x: 44, y: 34 };
const PEN_REST = { x: 262, y: 124 };

export function WhiteboardScene() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step } = useTimeline(DRAW_STEPS, onScreen);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const penRef = useRef<SVGGElement | null>(null);
  const penAt = useRef(PEN_START);
  const ink = "var(--color-brand-ink)";

  // Draw this step's strokes one after another, with the pen tip on the line.
  useEffect(() => {
    const pen = penRef.current;
    if (!pen) return;
    const place = (x: number, y: number) => {
      penAt.current = { x, y };
      pen.setAttribute("transform", `translate(${x} ${y})`);
    };

    // Strokes from earlier steps stay on the board; later ones are not there yet.
    const mine: { el: SVGPathElement; length: number }[] = [];
    strokes.forEach((stroke, i) => {
      const el = pathRefs.current[i];
      if (!el) return;
      const length = el.getTotalLength();
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = stroke.step < step ? "0" : `${length}`;
      el.style.opacity = stroke.step < step ? "1" : "0";
      if (stroke.step === step) mine.push({ el, length });
    });

    if (mine.length === 0) {
      // The sketch is done: put the pen down.
      const from = penAt.current;
      const down = animate(0, 1, {
        duration: 0.35,
        ease: "easeOut",
        onUpdate: (t) => place(from.x + (PEN_REST.x - from.x) * t, from.y + (PEN_REST.y - from.y) * t),
      });
      return () => down.stop();
    }

    const total = mine.reduce((sum, stroke) => sum + stroke.length, 0);
    const drawing = animate(0, total, {
      duration: (DRAW_STEPS[step] / 1000) * 0.85,
      ease: "linear",
      onUpdate: (drawn) => {
        let before = 0;
        for (const { el, length } of mine) {
          const local = Math.min(Math.max(drawn - before, 0), length);
          el.style.strokeDashoffset = `${length - local}`;
          el.style.opacity = local > 0 ? "1" : "0";
          if (drawn >= before && drawn <= before + length) {
            const point = el.getPointAtLength(local);
            place(point.x, point.y);
          }
          before += length;
        }
      },
    });
    return () => drawing.stop();
  }, [step]);

  return (
    <div ref={ref} className={stage} aria-hidden>
      <svg viewBox="0 0 300 150" className="absolute inset-0 h-full w-full overflow-visible">
        <rect x="3" y="3" width="294" height="128" rx="14" fill="white" stroke={ink} strokeWidth="2.5" />
        <rect x="112" y="131" width="76" height="8" rx="4" fill={ink} />

        {washes.map((wash) => (
          <path
            key={wash.d}
            d={wash.d}
            fill={wash.fill}
            className={step > wash.after ? "opacity-100 transition-opacity duration-300" : "opacity-0"}
          />
        ))}

        {strokes.map((stroke, i) => (
          <path
            key={stroke.d}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            d={stroke.d}
            fill="none"
            stroke={ink}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-0"
          />
        ))}

        {/* It clicks */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={step >= DRAW_STEPS.length - 1 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={bouncy}
        >
          <circle cx="272" cy="24" r="13" fill="var(--color-brand-yellow)" stroke={ink} strokeWidth="2.5" />
          <Lightbulb x={263.5} y={15.5} width={17} height={17} stroke={ink} strokeWidth={2.5} />
        </motion.g>

        {/* The pen: its tip is the point being drawn */}
        <g ref={penRef} transform={`translate(${PEN_START.x} ${PEN_START.y})`}>
          <Pencil x={-2.4} y={-26} width={28} height={28} fill="var(--color-brand-yellow)" stroke={ink} strokeWidth={2} />
        </g>
      </svg>
    </div>
  );
}

/* ── a real, shipped product instead of long videos ──────── */

// 0 a long video · 1 crossed out · 2 your code lands in the app · 3 the app is live · 4 real people use it · 5 it goes on the résumé
const REAL_STEPS = [1100, 900, 1100, 1000, 1000, 2600] as const;

// What makes the project real, one line per step.
const proof = [
  { icon: GitPullRequest, label: "你的代码已合并", tone: "bg-brand-purple text-white" },
  { icon: Rocket, label: "App Store 已上线", tone: "bg-brand-lime" },
  { icon: Users, label: "真实用户使用", tone: "bg-brand-yellow" },
];

export function RealProjectScene() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step } = useTimeline(REAL_STEPS, onScreen);
  const dropped = step >= 1;
  const merged = step >= 2;

  return (
    <div ref={ref} className={`${stage} flex items-center gap-2`} aria-hidden>
      {/* The long video nobody finishes */}
      <motion.div
        initial={false}
        animate={{ opacity: dropped ? 0.45 : 1, scale: dropped ? 0.92 : 1 }}
        transition={spring}
        className="relative flex h-[62px] w-[74px] shrink-0 flex-col justify-between rounded-xl border-2 border-brand-ink bg-white p-1.5"
      >
        <span className="mx-auto mt-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-brand-ink bg-white">
          <Play className="h-3 w-3 fill-brand-ink" />
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1 flex-1 rounded-full bg-brand-ink/25" />
          <span className="text-[9px] font-black leading-none">3:00:00</span>
        </span>
        <AnimatePresence>
          {dropped && (
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={bouncy}
              className="absolute -right-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-coral text-white"
            >
              <X className="h-3.5 w-3.5" strokeWidth={4} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* What happens instead: the app itself, with the piece you built going in */}
      <div className="relative flex h-[136px] w-[70px] shrink-0 flex-col gap-1.5 rounded-[18px] border-2 border-brand-ink bg-white px-1.5 pb-1.5 pt-2 shadow-[0_3px_0_0_var(--color-brand-ink)]">
        <span className="mx-auto h-1 w-5 rounded-full bg-brand-ink" />
        <span className="h-4 rounded-md border-2 border-brand-ink bg-brand-lime" />
        {[0, 1].map((row) => (
          <span key={row} className="flex h-5 items-center gap-1 rounded-md border-2 border-brand-ink/20 px-1">
            <span className="h-2 w-2 rounded-full border-2 border-brand-ink/40" />
            <span className="h-1 flex-1 rounded-full bg-brand-ink/20" />
          </span>
        ))}
        <motion.span
          initial={false}
          animate={{ opacity: merged ? 1 : 0, scale: merged ? 1 : 0.5, y: merged ? 0 : 8 }}
          transition={bouncy}
          className="flex h-6 items-center gap-1 rounded-md border-2 border-brand-ink bg-brand-purple-soft px-1"
        >
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-brand-purple text-white">
            <Check className="h-2 w-2" strokeWidth={5} />
          </span>
          <span className="h-1 flex-1 rounded-full bg-brand-purple" />
        </motion.span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {proof.map((line, i) => {
          const Icon = line.icon;
          const on = step >= i + 2;
          return (
            // The dashed outline holds the line's place until it is earned.
            <div key={line.label} className="relative h-7 rounded-full border-2 border-dashed border-brand-ink/25">
              <motion.div
                initial={false}
                animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.85 }}
                transition={bouncy}
                className="absolute -inset-0.5 flex origin-left items-center gap-1.5 rounded-full border-2 border-brand-ink bg-white pl-0.5 pr-2"
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${line.tone}`}>
                  <Icon className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="truncate text-[11px] font-black leading-none">{line.label}</span>
              </motion.div>
            </div>
          );
        })}

        {/* And so it can go on the résumé, with someone to vouch for it */}
        <motion.div
          initial={false}
          animate={step >= 5 ? { opacity: 1, scale: 1, rotate: -4 } : { opacity: 0, scale: 1.8, rotate: 6 }}
          transition={bouncy}
          className="mt-1.5 flex origin-left gap-1.5"
        >
          <span className="rounded-lg border-2 border-brand-ink bg-brand-yellow px-2 py-0.5 text-xs font-black">简历</span>
          <span className="rounded-lg border-2 border-brand-ink bg-brand-purple px-2 py-0.5 text-xs font-black text-white">Reference</span>
        </motion.div>
      </div>
    </div>
  );
}
