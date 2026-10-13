"use client";

import { motion } from "motion/react";
import { Check, GraduationCap, Handshake, Laptop, Star } from "lucide-react";
import { Confetti, Mock, SceneShell, YouToken, spring, useOnScreen, useTimeline } from "@/components/kit";
import content from "./content.json";

/*
 * Where a member can go inside the project: a staircase of four levels. The
 * "you" token climbs one level per step, and each level it reaches lights up
 * with what you do there.
 */

const levelIcons = [GraduationCap, Laptop, Star, Handshake];

// One step per level, then a pause at the top.
const GROW_STEPS = [1200, 1400, 1400, 2800] as const;

// How far each level steps in from the left, so the rows climb like stairs.
const STEP_IN = 20;
const ROW = 76;

export default function GrowScene() {
  const { grow } = content;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step, cycle } = useTimeline(GROW_STEPS, onScreen);
  const top = grow.levels.length - 1;

  return (
    <SceneShell tone="purple" eyebrow={grow.eyebrow} title={grow.title} caption={grow.caption} flip>
      <Mock>
        <div ref={ref} className="relative" style={{ height: ROW * grow.levels.length + 26 }}>
          {grow.levels.map((level, i) => {
            const Icon = levelIcons[i % levelIcons.length];
            const reached = i <= step;
            const here = i === step;
            return (
              <motion.div
                key={level.name}
                className={`absolute right-0 flex items-center gap-2.5 rounded-xl border-2 px-3 py-2 transition-colors duration-300 ${
                  here ? "border-brand-ink bg-brand-lime" : reached ? "border-brand-ink bg-white" : "border-dashed border-brand-ink/30 bg-transparent"
                }`}
                style={{ left: i * STEP_IN, top: (top - i) * ROW + 26, height: ROW - 10 }}
                initial={false}
                animate={{ opacity: reached ? 1 : 0.45 }}
                transition={spring}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-brand-ink transition-colors duration-300 ${
                    reached && !here ? "bg-brand-lime" : "bg-white"
                  }`}
                >
                  {reached && !here ? <Check className="h-3.5 w-3.5" strokeWidth={4} /> : <Icon className="h-3.5 w-3.5" strokeWidth={2.6} />}
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-black leading-tight">{level.name}</span>
                  <span className={`block text-balance text-xs font-bold leading-snug ${here ? "text-brand-ink" : "text-brand-muted"}`}>{level.note}</span>
                </span>
              </motion.div>
            );
          })}

          {/* You, standing on the level you have reached */}
          <motion.div
            key={cycle}
            className="absolute z-10"
            initial={{ left: -4, top: top * ROW - 6, opacity: 0 }}
            animate={{ left: step * STEP_IN - 4, top: (top - step) * ROW - 6, opacity: 1 }}
            transition={{ ...spring, opacity: { duration: 0.2 } }}
          >
            <YouToken label={grow.you} hopKey={step} />
            {step === top && <Confetti className="left-1/2 top-1" />}
          </motion.div>
        </div>
      </Mock>
    </SceneShell>
  );
}
