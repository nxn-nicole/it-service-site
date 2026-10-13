"use client";

import { motion, useReducedMotion } from "motion/react";
import { User } from "lucide-react";
import { Mock, useOnScreen, useTimeline } from "@/components/kit";
import content from "./content.json";

// 0 you are talking · 1 the Tech Lead is talking
const CALL_STEPS = [2400, 2800] as const;

// How tall each little sound bar gets, in px.
const BARS = [9, 16, 11, 14];

/** One person in the call. Rings go out and the sound bars move while they talk. */
function Person({
  name,
  panel,
  face,
  talking,
  still,
}: {
  name: string;
  panel: string;
  face: string;
  talking: boolean;
  still: boolean;
}) {
  return (
    <div className={`flex h-[148px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-brand-ink ${panel}`}>
      <div className="relative flex h-16 w-16 items-center justify-center">
        {talking &&
          !still &&
          [0, 1].map((ring) => (
            <motion.span
              key={ring}
              className="absolute inset-0 rounded-full border-2 border-brand-ink"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.45], opacity: [0.55, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: ring * 0.6, ease: "easeOut" }}
            />
          ))}
        <motion.span
          initial={false}
          animate={{ scale: talking ? 1.06 : 1 }}
          transition={{ duration: 0.25 }}
          className={`relative flex h-full w-full items-center justify-center rounded-full border-2 border-brand-ink shadow-[0_4px_0_0_var(--color-brand-ink)] ${face}`}
        >
          <User className="h-7 w-7" strokeWidth={2.5} />
        </motion.span>
      </div>

      <span className="flex items-center gap-2 rounded-full border-2 border-brand-ink bg-white px-3 py-0.5 text-sm font-black">
        {name}
        <span className="flex h-4 items-center gap-[3px]">
          {BARS.map((peak, bar) => (
            <motion.span
              key={bar}
              className="w-1 rounded-full bg-brand-ink"
              initial={false}
              animate={
                talking && !still
                  ? { height: [4, peak, 6, peak * 0.7, 4], opacity: 1 }
                  : { height: talking ? peak : 4, opacity: talking ? 1 : 0.25 }
              }
              transition={
                talking && !still
                  ? {
                      height: { duration: 0.9, repeat: Infinity, delay: bar * 0.12, ease: "easeInOut" },
                      opacity: { duration: 0.2 },
                    }
                  : { duration: 0.2 }
              }
            />
          ))}
        </span>
      </span>
    </div>
  );
}

/** What asking for help looks like: two people on a call, taking turns to talk. */
export default function CallScene() {
  const { call } = content;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step } = useTimeline(CALL_STEPS, onScreen);
  const still = Boolean(useReducedMotion());

  return (
    <Mock>
      <div ref={ref} className="relative grid gap-3" aria-hidden>
        <Person name={call.lead} panel="bg-brand-lime-soft" face="bg-brand-lime" talking={step === 1} still={still} />
        <Person name={call.you} panel="bg-brand-blue-soft" face="bg-white" talking={step === 0} still={still} />

        {/* Sits on the seam between the two, so they read as one call */}
        <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border-2 border-brand-ink bg-white px-3 py-1 text-xs font-black">
          <span className="h-2 w-2 rounded-full bg-brand-lime-deep" />
          {call.status}
        </span>
      </div>
    </Mock>
  );
}
