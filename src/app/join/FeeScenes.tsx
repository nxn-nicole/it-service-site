"use client";

import { AnimatePresence, motion } from "motion/react";
import { Cloud, Sparkles, UserCheck } from "lucide-react";
import { Confetti, Mock, SceneShell, Sticker, YouToken, bouncy, spring, useOnScreen, useTimeline } from "@/components/kit";
import content from "./content.json";

function Coin({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full border-2 border-brand-ink bg-brand-yellow font-black shadow-[0_3px_0_0_var(--color-brand-ink)] ${className}`}
    >
      $
    </span>
  );
}

/* ── where the fee goes ──────────────────────────────────── */

// 0 one coin · 1 it splits three ways · 2 the coins land · 3 "not a bootcamp"
const WHY_STEPS = [1000, 900, 700, 2800] as const;

const useIcons = [UserCheck, Cloud, Sparkles];
const bucketCentre = (i: number) => `${((i + 0.5) / useIcons.length) * 100}%`;

export function WhyFeeScene() {
  const { whyFee } = content;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step, cycle } = useTimeline(WHY_STEPS, onScreen);
  const split = step >= 1;
  const landed = step >= 2;

  return (
    <SceneShell tone="yellow" eyebrow={whyFee.eyebrow} title={whyFee.title} caption={whyFee.caption}>
      <Mock>
        <div ref={ref} className="relative h-[252px]">
          {/* The one coin you pay */}
          <motion.div
            className="absolute left-1/2 top-3"
            style={{ x: "-50%" }}
            initial={false}
            animate={{ scale: split ? 0 : 1, opacity: split ? 0 : 1 }}
            transition={bouncy}
          >
            <Coin className="h-16 w-16 text-2xl" />
          </motion.div>

          {/* ...splits into three, one per bucket */}
          {useIcons.map((_, i) => (
            <motion.div
              key={`${cycle}-${i}`}
              className="absolute"
              style={{ x: "-50%" }}
              initial={{ left: "50%", top: 24, opacity: 0, scale: 0.6 }}
              animate={{
                left: split ? bucketCentre(i) : "50%",
                top: landed ? 150 : split ? 104 : 24,
                opacity: split && !landed ? 1 : 0,
                scale: landed ? 0.5 : 1,
              }}
              transition={{ ...spring, delay: split && !landed ? i * 0.08 : 0 }}
            >
              <Coin className="h-9 w-9 text-sm" />
            </motion.div>
          ))}

          <div className="absolute inset-x-0 bottom-0 grid grid-cols-3">
            {whyFee.uses.map((label, i) => {
              const Icon = useIcons[i];
              return (
                <div key={label} className="px-1.5">
                  <motion.div
                    key={landed ? "full" : "empty"}
                    initial={{ scale: 1 }}
                    animate={{ scale: landed ? [1, 1.08, 1] : 1 }}
                    transition={{ duration: 0.4, delay: landed ? i * 0.08 : 0 }}
                    className={`flex h-[104px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-brand-ink px-1 text-center transition-colors duration-300 ${
                      landed ? "bg-brand-yellow-soft" : "bg-white"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-ink transition-colors duration-300 ${
                        landed ? "bg-brand-yellow" : "bg-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[13px] font-black leading-tight">{label}</span>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 4 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={bouncy}
                className="absolute inset-x-0 top-9 flex justify-center"
              >
                <Sticker tone="lime" className="text-base">
                  {whyFee.sticker}
                </Sticker>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Mock>
    </SceneShell>
  );
}

/* ── the fee shrinks as you grow ─────────────────────────── */

// 0-2 you stand on each stage · 3 celebrate at the top
const PATH_STEPS = [1300, 1300, 1500, 2600] as const;

const stairHeights = [88, 132, 176];
const stageCoins = [2, 1, 0];

export function FeePathScene() {
  const { feePath } = content;
  const last = feePath.stages.length - 1;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step, cycle } = useTimeline(PATH_STEPS, onScreen);
  const at = Math.min(step, last);

  return (
    <SceneShell tone="lime" eyebrow={feePath.eyebrow} title={feePath.title} caption={feePath.caption} flip>
      <Mock>
        <div ref={ref} className="relative h-[252px]">
          <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 items-end border-b-2 border-brand-ink">
            {feePath.stages.map((stage, i) => {
              const reached = i <= at;
              return (
                <div key={stage} className="px-1.5">
                  <div
                    style={{ height: stairHeights[i] }}
                    className={`flex flex-col items-center justify-end gap-2 rounded-t-2xl border-2 border-b-0 border-brand-ink px-1 pb-3 transition-colors duration-300 ${
                      reached ? "bg-brand-lime" : "bg-white"
                    }`}
                  >
                    {stageCoins[i] > 0 ? (
                      <div className="flex -space-x-2">
                        {Array.from({ length: stageCoins[i] }, (_, c) => (
                          <Coin key={c} className="h-7 w-7 text-xs" />
                        ))}
                      </div>
                    ) : (
                      <motion.span
                        animate={{ scale: step === PATH_STEPS.length - 1 ? [1, 1.18, 1] : 1 }}
                        transition={{ duration: 0.5, repeat: step === PATH_STEPS.length - 1 ? 2 : 0 }}
                        className="rounded-full border-2 border-brand-ink bg-white px-2.5 py-0.5 text-sm font-black"
                      >
                        {feePath.free}
                      </motion.span>
                    )}
                    <span className="text-center text-[13px] font-black leading-tight">{stage}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            <motion.div
              key={cycle}
              className="absolute"
              style={{ x: "-50%" }}
              initial={{ opacity: 0, scale: 0.3, left: "16.667%", bottom: stairHeights[0] + 8 }}
              animate={{
                opacity: 1,
                scale: 1,
                left: `${((at + 0.5) / feePath.stages.length) * 100}%`,
                bottom: stairHeights[at] + 8,
              }}
              exit={{ opacity: 0, scale: 0.3 }}
              transition={spring}
            >
              <YouToken label={feePath.you} hopKey={at} />
            </motion.div>
          </AnimatePresence>

          {step === PATH_STEPS.length - 1 && <Confetti className="bottom-[236px] left-[83.33%]" />}
        </div>
      </Mock>
    </SceneShell>
  );
}
