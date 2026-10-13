"use client";

import { motion } from "motion/react";
import { Check, Dices, Map as MapIcon, X } from "lucide-react";
import { Clauses, Confetti, bouncy, useOnScreen, useTimeline } from "@/components/kit";
import content from "./content.json";

/*
 * The first-screen picture: the same three tries, done two ways. With vibe
 * coding each try is a roll of the dice. With orchestration you plan, the AI
 * carries it out, you decide, and every step lands.
 */

// 0 nothing yet · 1-3 one more result on each card · 4 both finished
const COMPARE_STEPS = [900, 1100, 1100, 1100, 2800] as const;

// What a roll of the dice happens to give each time.
const luck = [false, true, false];

const slotClass =
  "flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border-2 text-[15px] font-black transition-colors duration-300 xl:h-14 xl:text-lg";

export default function CompareScene() {
  const { vibe, orchestration } = content.hero;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step } = useTimeline(COMPARE_STEPS, onScreen);
  const shown = Math.min(step, luck.length);
  const complete = step >= COMPARE_STEPS.length - 1;

  return (
    <div ref={ref} className="mx-auto mt-10 w-full max-w-xl space-y-5 lg:mt-0 lg:max-w-none xl:space-y-6" aria-hidden>
      {/* Vibe coding: whatever comes out */}
      <div className="-rotate-1 rounded-3xl border-2 border-dashed border-brand-ink/40 bg-white px-5 py-5 xl:px-7 xl:py-6">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-brand-ink/30 px-3 py-1 text-sm font-black text-brand-muted xl:text-base">
            <X className="h-4 w-4 text-brand-coral" strokeWidth={4} />
            {vibe.name}
          </span>
          <motion.span
            key={shown}
            animate={{ rotate: shown ? [0, -28, 24, -10, 0] : 0 }}
            transition={{ duration: 0.5 }}
            className="text-brand-muted"
          >
            <Dices className="h-7 w-7 xl:h-8 xl:w-8" />
          </motion.span>
        </div>

        <p className="mt-3 text-lg font-black leading-snug text-brand-muted xl:text-2xl">
          <Clauses text={vibe.text} />
        </p>

        <div className="mt-4 flex gap-2.5 xl:gap-3">
          {luck.map((good, i) => {
            const on = i < shown;
            return (
              <span
                key={i}
                className={`${slotClass} ${
                  !on
                    ? "border-dashed border-brand-ink/25 text-brand-ink/30"
                    : good
                      ? "border-brand-ink/40 bg-brand-lime-soft"
                      : "border-brand-ink/40 bg-brand-coral/15"
                }`}
              >
                {!on ? (
                  "?"
                ) : (
                  <motion.span initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={bouncy}>
                    {good ? (
                      <Check className="h-5 w-5 text-brand-lime-deep xl:h-6 xl:w-6" strokeWidth={4} />
                    ) : (
                      <X className="h-5 w-5 text-brand-coral xl:h-6 xl:w-6" strokeWidth={4} />
                    )}
                  </motion.span>
                )}
              </span>
            );
          })}
        </div>
      </div>

      {/* AI orchestration: planned, carried out, decided */}
      <div className="relative rounded-3xl border-2 border-brand-ink bg-brand-lime-soft px-5 py-5 shadow-[0_6px_0_0_var(--color-brand-ink)] xl:px-7 xl:py-6">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-brand-ink bg-brand-lime px-3 py-1 text-sm font-black xl:text-base">
            <Check className="h-4 w-4" strokeWidth={4} />
            {orchestration.name}
          </span>
          <MapIcon className="h-7 w-7 xl:h-8 xl:w-8" />
        </div>

        <p className="mt-3 text-lg font-black leading-snug xl:text-2xl">
          <Clauses text={orchestration.text} />
        </p>

        <div className="mt-4 flex gap-2.5 xl:gap-3">
          {orchestration.slots.map((label, i) => {
            const on = i < shown;
            return (
              <motion.span
                key={label}
                initial={false}
                animate={{ y: on ? [0, -6, 0] : 0 }}
                transition={{ duration: 0.35 }}
                className={`${slotClass} ${
                  on ? "border-brand-ink bg-brand-lime" : "border-dashed border-brand-ink/30 bg-white/60 text-brand-muted"
                }`}
              >
                {on && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={bouncy}>
                    <Check className="h-4 w-4 xl:h-5 xl:w-5" strokeWidth={4} />
                  </motion.span>
                )}
                {label}
              </motion.span>
            );
          })}
        </div>

        {complete && <Confetti className="right-10 top-4" />}
      </div>
    </div>
  );
}
