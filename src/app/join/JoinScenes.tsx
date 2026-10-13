"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Rocket, Users } from "lucide-react";
import WeChatModal from "@/components/WeChatModal";
import { Mock, SceneShell, bouncy, spring, useOnScreen, useTimeline } from "@/components/kit";
import content from "./content.json";

/* ── two ways to join ────────────────────────────────────── */

// Flips between the two answers until the visitor picks one themselves.
const WAYS_STEPS = [3200, 3200] as const;

const wayIcons = [Rocket, Users];
const feeTones = ["bg-brand-lime", "bg-brand-yellow"];

export function WaysScene() {
  const { ways } = content;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const [picked, setPicked] = useState<number | null>(null);
  const { step } = useTimeline(WAYS_STEPS, onScreen && picked === null);
  const choice = picked ?? step;
  const option = ways.options[choice];
  const Icon = wayIcons[choice];

  return (
    <SceneShell tone="blue" eyebrow={ways.eyebrow} title={ways.title} caption={ways.caption}>
      <Mock>
        <div ref={ref}>
          <div className="relative grid grid-cols-2 rounded-full border-2 border-brand-ink bg-white p-1">
            <motion.div
              aria-hidden
              className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full border-2 border-brand-ink bg-brand-lime"
              initial={false}
              animate={{ x: choice === 0 ? "0%" : "100%" }}
              transition={spring}
            />
            {ways.options.map((o, i) => (
              <button
                key={o.tab}
                type="button"
                onClick={() => setPicked(i)}
                aria-pressed={choice === i}
                className="relative z-10 cursor-pointer rounded-full px-2 py-2.5 text-[15px] font-black"
              >
                {o.tab}
              </button>
            ))}
          </div>

          <div className="relative mt-4 h-[178px] overflow-hidden rounded-3xl border-2 border-brand-ink bg-brand-paper">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={choice}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex flex-col justify-center gap-2 p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-brand-ink bg-white">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-2xl font-black">{option.how}</p>
                <p className="text-[15px] font-semibold text-brand-muted">{option.detail}</p>
                <motion.span
                  initial={{ opacity: 0, scale: 2, rotate: 6 }}
                  animate={{ opacity: 1, scale: 1, rotate: -6 }}
                  transition={{ ...bouncy, delay: 0.2 }}
                  className={`absolute right-4 top-4 rounded-xl border-2 border-brand-ink px-3 py-1.5 text-base font-black shadow-[0_3px_0_0_var(--color-brand-ink)] ${feeTones[choice]}`}
                >
                  {option.fee}
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Mock>
    </SceneShell>
  );
}

/* ── next step ───────────────────────────────────────────── */

const voiceBars = [0.5, 0.9, 0.65, 1, 0.55];

function VoiceBars({ flip = false }: { flip?: boolean }) {
  const bars = flip ? [...voiceBars].reverse() : voiceBars;

  return (
    <div className="flex h-12 items-center gap-1.5" aria-hidden>
      {bars.map((peak, i) => (
        <motion.span
          key={i}
          className="h-full w-1.5 origin-center rounded-full bg-brand-ink"
          animate={{ scaleY: [0.25, peak, 0.25] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: i * 0.11 }}
        />
      ))}
    </div>
  );
}

export function NextScene() {
  const { next } = content;

  return (
    <SceneShell tone="lime" eyebrow={next.eyebrow} title={next.title} caption={next.caption} flip>
      <div className="flex flex-col items-center gap-8 md:[zoom:1.3]">
        <div className="flex items-center gap-5">
          <VoiceBars />
          <Image
            src="/profile-photo.webp"
            alt="Tech Lead"
            width={128}
            height={128}
            className="h-28 w-28 rounded-full border-2 border-brand-ink object-cover shadow-[0_6px_0_0_var(--color-brand-ink)]"
          />
          <VoiceBars flip />
        </div>

        <WeChatModal wechatId="Azdev0189" source="blotz" note={next.wechatNote}>
          <div className="inline-flex items-center gap-2 rounded-2xl border-2 border-brand-ink bg-brand-ink px-8 py-4 text-lg font-black text-white shadow-[0_6px_0_0_var(--color-brand-lime-deep)] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_0_var(--color-brand-lime-deep)]">
            {next.cta} <ArrowUpRight className="h-5 w-5" />
          </div>
        </WeChatModal>
      </div>
    </SceneShell>
  );
}
