"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import WeChatModal from "@/components/WeChatModal";
import { Mock, SceneShell, bouncy, useOnScreen, useTimeline } from "@/components/kit";
import { buttonLimeClass } from "@/components/styles";
import content from "./content.json";

// 0 the meeting is on · 1 you join · 2 someone is presenting · 3 you ask a question
const AUDIT_STEPS = [1200, 1300, 1500, 2800] as const;

const seatTones = [
  "bg-brand-lime",
  "bg-brand-purple text-white",
  "bg-brand-blue text-white",
  "bg-brand-yellow",
  "bg-brand-coral text-white",
];

/** The page's closing call to action: sit in on one weekly meeting, for free. */
export default function AuditScene() {
  const { audit } = content;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step } = useTimeline(AUDIT_STEPS, onScreen);
  const joined = step >= 1;
  const presenting = step >= 2;
  const asking = step >= 3;

  return (
    <SceneShell tone="lime" eyebrow={audit.eyebrow} title={audit.title} caption={audit.caption}>
      <Mock>
        <div ref={ref}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-black">{audit.meeting}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-brand-ink bg-white px-2.5 py-0.5 text-xs font-black">
              <motion.span
                className="h-2 w-2 rounded-full bg-brand-coral"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              LIVE
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {audit.people.map((name, i) => (
              <div
                key={name}
                className={`flex h-[84px] flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-brand-ink bg-brand-paper transition-shadow duration-300 ${
                  presenting && i === 1 ? "ring-4 ring-brand-lime" : ""
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-ink text-xs font-black ${seatTones[i % seatTones.length]}`}
                >
                  {[...name][0]}
                </span>
                <span className="text-xs font-black">{name}</span>
              </div>
            ))}

            {/* Your seat: empty until you join */}
            <div
              className={`flex h-[84px] items-center justify-center rounded-2xl border-2 transition-colors duration-300 ${
                joined ? "border-brand-ink bg-brand-yellow-soft" : "border-dashed border-brand-ink/30"
              }`}
            >
              <AnimatePresence>
                {joined && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={bouncy}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-yellow text-xs font-black">
                      {audit.you}
                    </span>
                    <span className="text-xs font-black">{audit.youLabel}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* The question you get to ask */}
          <div className="mt-4 flex h-11 items-center justify-end">
            <AnimatePresence>
              {asking && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={bouncy}
                  className="origin-right rounded-2xl rounded-tr-md border-2 border-brand-ink bg-brand-yellow-soft px-4 py-2 text-[15px] font-bold"
                >
                  {audit.question}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Mock>

      <div className="mt-8 flex justify-center">
        <WeChatModal wechatId="Azdev0189" source="blotz" note={audit.wechatNote}>
          <div className={buttonLimeClass}>
            {audit.cta} <ArrowUpRight className="h-5 w-5" />
          </div>
        </WeChatModal>
      </div>
    </SceneShell>
  );
}
