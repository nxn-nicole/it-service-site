"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Code2, MessagesSquare, Rocket, Smile, Sparkles, Users } from "lucide-react";
import { Confetti, Sticker, Title, bouncy, spring, useOnScreen, useTimeline } from "@/components/kit";
import content from "./content.json";

/*
 * The first-screen picture: a software engineer is not reached one rung at a
 * time. Six things a student builds up fly in and join into one person, and
 * only when all six are there does the 大学生 in the middle turn into 软件工程师.
 */

const skillIcons = [MessagesSquare, Code2, Smile, Users, Rocket, Sparkles];

// Where each skill waits before it joins: in a ring around the person,
// as an offset in px from the centre, clockwise from the top.
const skillSpots = [
  { x: 0, y: -118 },
  { x: 102, y: -59 },
  { x: 102, y: 59 },
  { x: 0, y: 118 },
  { x: -102, y: 59 },
  { x: -102, y: -59 },
];

// 0 all six waiting · 1-6 one more joins each step · 7 complete, celebrate
const ASSEMBLE_STEPS = [1000, 1100, 1100, 1100, 1100, 1100, 1100, 2800] as const;

const RING_RADIUS = 54;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;
const RING_SEGMENT = RING_LENGTH / skillIcons.length - 8;

function Assemble() {
  const { hero } = content;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step, cycle } = useTimeline(ASSEMBLE_STEPS, onScreen);
  const joined = Math.min(step, skillIcons.length);
  const complete = step >= ASSEMBLE_STEPS.length - 1;

  return (
    <div
      ref={ref}
      className="relative mx-auto mt-10 h-[300px] w-full max-w-[342px] lg:mt-0 lg:[zoom:1.15] xl:[zoom:1.45] 2xl:[zoom:1.7]"
    >
      {/* The person in the middle, with one ring segment per skill */}
      <div className="absolute left-1/2 top-[140px] h-32 w-32 -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 128 128" className="absolute inset-0 rotate-[-120deg]" aria-hidden>
          {skillIcons.map((_, i) => (
            <circle
              key={i}
              cx="64"
              cy="64"
              r={RING_RADIUS}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${RING_SEGMENT} ${RING_LENGTH - RING_SEGMENT}`}
              strokeDashoffset={-(RING_LENGTH / skillIcons.length) * i - 4}
              className={`transition-colors delay-700 duration-300 ${i < joined ? "stroke-brand-lime" : "stroke-brand-ink/10"}`}
            />
          ))}
        </svg>
        <motion.div
          initial={false}
          animate={{ scale: complete ? [1, 1.18, 1] : 1 + joined * 0.02 }}
          transition={complete ? { duration: 0.5 } : spring}
          className={`absolute inset-5 flex items-center justify-center rounded-full border-2 border-brand-ink text-xl font-black shadow-[0_4px_0_0_var(--color-brand-ink)] transition-colors duration-300 ${
            complete ? "bg-brand-lime" : "bg-brand-yellow"
          }`}
        >
          {complete ? <Check className="h-9 w-9" strokeWidth={3.5} /> : hero.person}
        </motion.div>
        {complete && <Confetti className="left-1/2 top-2" />}
      </div>

      {/* The six skills. When its turn comes, a skill lights up, then travels into the middle. */}
      {hero.skills.map((label, i) => {
        const Icon = skillIcons[i];
        const spot = skillSpots[i];
        const merged = i < joined;
        return (
          <motion.div
            key={`${cycle}-${label}`}
            className="absolute left-1/2 top-[140px]"
            initial={{ opacity: 0, scale: 0.6, x: spot.x, y: spot.y }}
            animate={{
              opacity: merged ? 0 : 1,
              scale: merged ? 0.45 : 1,
              x: merged ? 0 : spot.x,
              y: merged ? 0 : spot.y,
            }}
            transition={
              merged
                ? {
                    x: { duration: 0.7, delay: 0.25, ease: "easeInOut" },
                    y: { duration: 0.7, delay: 0.25, ease: "easeInOut" },
                    scale: { duration: 0.7, delay: 0.25, ease: "easeInOut" },
                    opacity: { duration: 0.2, delay: 0.8 },
                  }
                : spring
            }
          >
            <span
              className={`inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-brand-ink px-3 py-2 text-[15px] font-black shadow-[0_3px_0_0_var(--color-brand-ink)] transition-colors duration-200 ${
                merged ? "bg-brand-lime" : "bg-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </span>
          </motion.div>
        );
      })}

      {/* What all six add up to */}
      <div className="absolute inset-x-0 bottom-0 flex h-10 justify-center">
        <AnimatePresence>
          {complete && (
            <motion.span
              initial={{ opacity: 0, scale: 0.4, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={bouncy}
              className="inline-flex items-center rounded-full border-2 border-brand-ink bg-brand-lime px-4 py-1.5 text-base font-black shadow-[0_3px_0_0_var(--color-brand-ink)]"
            >
              {hero.goal}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Hero({
  sticker,
  lead,
  title,
  hint,
  standalone = true,
  scene,
  compact = false,
  children,
}: {
  /** Replaces the sticker above the headline; pass "" for none. */
  sticker?: string;
  /** Replaces the small line above the headline; pass "" for none. */
  lead?: string;
  /** Replaces the headline ("\n" breaks the line, "[...]" gets the highlighter). */
  title?: string;
  /** Replaces the scroll hint at the bottom; pass "" to show only the arrow. */
  hint?: string;
  /** The join page has no site menu, so it shows its own brand line and a "done" tick. */
  standalone?: boolean;
  /** Less space above and below, for a page whose next section should show early. */
  compact?: boolean;
  /** Replaces the picture beside the headline. */
  scene?: React.ReactNode;
  /** Extra content under the headline. */
  children?: React.ReactNode;
} = {}) {
  const { hero, brand } = content;

  return (
    <header className={`bg-brand-paper px-6 pt-6 ${compact ? "pb-10 md:pb-12" : "pb-14 md:pb-24"}`}>
      {standalone && (
        <div className="mx-auto flex max-w-[min(1320px,90vw)] items-center gap-2">
          <span className="h-3 w-3 rounded-full border-2 border-brand-ink bg-brand-lime" />
          <span className="text-lg font-black">{brand}</span>
        </div>
      )}

      <div
        className={`mx-auto grid max-w-[min(1320px,90vw)] items-center lg:grid-cols-2 lg:gap-16 ${compact ? "pt-8 md:pt-10" : "pt-10 md:pt-16"}`}
      >
        <div className="text-center lg:text-left">
          {(sticker ?? hero.sticker) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={bouncy}
              className="mb-6 inline-block"
            >
              <Sticker tone="lime">
                {standalone && <Check className="h-4 w-4" strokeWidth={3} />}
                {sticker ?? hero.sticker}
              </Sticker>
            </motion.div>
          )}

          {(lead ?? hero.lead) && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-lg font-bold text-brand-muted md:text-2xl"
            >
              {lead ?? hero.lead}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="isolate mt-2 text-[clamp(1.8rem,9.2vw,2.4rem)] font-black leading-[1.2] tracking-tight md:text-6xl md:leading-[1.15] lg:text-[2.9rem] xl:text-6xl 2xl:text-[4.2rem]"
          >
            <Title text={title ?? hero.title} />
          </motion.h1>

          {children}
        </div>

        {scene ?? <Assemble />}
      </div>

      <div className={`flex flex-col items-center gap-1 text-brand-muted ${compact ? "mt-8 md:mt-10" : "mt-10 md:mt-16"}`}>
        {(hint ?? hero.hint) && <span className="text-base font-bold">{hint ?? hero.hint}</span>}
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-6 w-6" />
        </motion.span>
      </div>
    </header>
  );
}
