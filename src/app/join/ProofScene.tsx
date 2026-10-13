"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Mock, SceneShell, bouncy, spring, useOnScreen, useTimeline } from "@/components/kit";
import content from "./content.json";
import homeContent from "../content.json";

// The four shortest real reviews: this page is meant to be watched, not read.
const reviews = [...homeContent.feedback.feedbacks].sort((a, b) => a.note.length - b.note.length).slice(0, 4);

// One step per review; each stays on top for a moment.
const PROOF_STEPS = reviews.map(() => 2600);

const SLOT = 140;
const avatarTones = ["bg-brand-lime", "bg-brand-yellow", "bg-brand-blue text-white", "bg-brand-purple text-white"];
const journeyTones = ["bg-brand-yellow", "bg-brand-blue text-white"];

export function ProofScene() {
  const { proof } = content;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step } = useTimeline(PROOF_STEPS, onScreen);

  return (
    <SceneShell tone="paper" eyebrow={proof.eyebrow} title={proof.title}>
      <Mock>
        <div ref={ref}>
          <div className="space-y-2.5">
            {proof.journeys.map((journey, j) => (
              <div key={journey.join("-")} className="flex items-center justify-center gap-1">
                {journey.map((stop, i) => (
                  <motion.div
                    key={stop}
                    className="flex items-center gap-1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 1 }}
                    transition={{ ...bouncy, delay: 0.2 + j * 0.25 + i * 0.18 }}
                  >
                    {i > 0 && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand-muted" strokeWidth={3} />}
                    <span
                      className={`whitespace-nowrap rounded-full border-2 border-brand-ink px-2 py-1 text-xs font-black md:px-3 md:text-sm ${
                        i === journey.length - 1 ? journeyTones[j % journeyTones.length] : "bg-white"
                      }`}
                    >
                      {stop}
                    </span>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          {/* Two reviews on screen at a time; the feed moves up one slot per step. */}
          <div className="relative mt-5 overflow-hidden" style={{ height: SLOT * 2 }}>
            {reviews.map((review, i) => {
              const slot = (i - step + reviews.length) % reviews.length;
              const visible = slot <= 1;
              // slot 0/1 are on screen, the last slot has just left through the top, the rest wait below.
              const y = slot === reviews.length - 1 ? -SLOT : Math.min(slot, 2) * SLOT;
              return (
                <motion.div
                  key={review.name}
                  className="absolute inset-x-0 top-0 pb-3"
                  style={{ height: SLOT }}
                  initial={false}
                  animate={{ y, opacity: visible ? 1 : 0 }}
                  transition={{ y: spring, opacity: { duration: 0.25 } }}
                >
                  <div className="flex h-full flex-col justify-between rounded-2xl border-2 border-brand-ink bg-brand-paper px-3.5 py-3">
                    <p className="line-clamp-3 text-[15px] font-semibold leading-6">{review.note}</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-brand-ink text-[11px] font-black ${avatarTones[i % avatarTones.length]}`}
                      >
                        {[...review.name][0]}
                      </span>
                      <span className="truncate text-xs font-bold text-brand-muted">
                        {review.name} · {proof.source}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Mock>
    </SceneShell>
  );
}
