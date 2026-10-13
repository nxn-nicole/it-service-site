"use client";

import { AnimatePresence, motion } from "motion/react";
import { Briefcase, Check, Code2, GraduationCap, Shuffle } from "lucide-react";
import { Mock, SceneShell, bouncy, spring, useOnScreen, useTimeline } from "@/components/kit";
import content from "./content.json";

// From the earliest stage to the latest, the same order as the rows.
const rowIcons = [GraduationCap, Shuffle, Code2, Briefcase];

// 0 nothing ticked · then one kind of person per step · last step: "beginners welcome"
const FIT_STEPS = [600, 750, 750, 750, 750, 2600] as const;

/** Who the project suits: one row per stage someone is at, each led by its name, ticked off one at a time. */
export default function FitScene() {
  const { fit } = content;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step } = useTimeline(FIT_STEPS, onScreen);

  return (
    <SceneShell tone="blue" eyebrow={fit.eyebrow} title={fit.title}>
      <Mock>
        <div ref={ref} className="relative">
          <div className="space-y-2.5">
            {fit.rows.map((row, i) => {
              const Icon = rowIcons[i % rowIcons.length];
              const on = step > i;
              return (
                <motion.div
                  key={row.tag}
                  initial={false}
                  animate={{ x: on ? 0 : 10, opacity: on ? 1 : 0.35 }}
                  transition={spring}
                  className={`flex items-center gap-3 rounded-xl border-2 px-3 py-2.5 transition-colors duration-300 ${
                    on ? "border-brand-ink bg-white" : "border-dashed border-brand-ink/30 bg-transparent"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-brand-ink transition-colors duration-300 ${
                      on ? "bg-brand-lime" : "bg-white"
                    }`}
                  >
                    {on ? (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={bouncy}>
                        <Check className="h-3.5 w-3.5" strokeWidth={4} />
                      </motion.span>
                    ) : (
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.6} />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-black leading-tight">{row.tag}</span>
                    <span className="mt-0.5 block text-balance text-[13px] font-bold leading-snug text-brand-muted">{row.text}</span>
                  </span>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {step >= FIT_STEPS.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 2.4, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 6 }}
                exit={{ opacity: 0 }}
                transition={bouncy}
                className="absolute -right-3 -top-10 rounded-xl border-2 border-brand-ink bg-brand-yellow px-3 py-1.5 text-base font-black shadow-[0_3px_0_0_var(--color-brand-ink)]"
              >
                {fit.stamp}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Mock>
    </SceneShell>
  );
}
