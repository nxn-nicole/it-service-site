"use client";

import { AnimatePresence, motion } from "motion/react";
import { BookOpen, Bot, CalendarClock, Check, FileText, GitPullRequest, ListTodo, MapPin, Rocket, ScanSearch, Smartphone, Sparkles, Users } from "lucide-react";
import { Confetti, Mock, SceneShell, bouncy, spring, useOnScreen, useTimeline, type Tone } from "@/components/kit";
import content from "./content.json";

/* ── 1/4 · directing AI ──────────────────────────────────── */

const stationIcons = [ListTodo, Bot, ScanSearch, Rocket];
const lastStation = stationIcons.length - 1;

// 0-3 the ticket sits at each station · 4 it has shipped
const AI_STEPS = [1150, 1150, 1150, 1150, 1900] as const;

const sparkleSpots = [
  { className: "-left-1 -top-2", delay: 0 },
  { className: "-right-2 top-1", delay: 0.12 },
  { className: "-bottom-1 left-1", delay: 0.24 },
];

export function AiScene({
  tone = "lime",
  eyebrow,
  title,
  caption,
  action,
  className,
}: {
  tone?: Tone;
  eyebrow?: string;
  title?: string;
  caption?: string;
  /** A link under the caption, for pages that have somewhere to send people for more. */
  action?: React.ReactNode;
  /** Extra classes for the section. */
  className?: string;
} = {}) {
  const { ai } = content;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step, cycle } = useTimeline(AI_STEPS, onScreen);
  const at = Math.min(step, lastStation);
  const shipped = step > lastStation;

  return (
    <SceneShell tone={tone} eyebrow={eyebrow ?? ai.eyebrow} title={title ?? ai.title} caption={caption ?? ai.caption} action={action} className={className}>
      <Mock>
        <div ref={ref}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="relative rounded-full border-2 border-brand-ink/20 px-3 py-1 text-sm font-bold text-brand-muted">
              {ai.no}
              <motion.span
                aria-hidden
                className="absolute left-2 right-2 top-1/2 h-0.5 origin-left rounded-full bg-brand-coral"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ delay: 0.5, duration: 0.35 }}
              />
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border-2 border-brand-ink bg-brand-lime px-3 py-1 text-sm font-black">
              <Check className="h-4 w-4" strokeWidth={3} />
              {ai.yes}
            </span>
          </div>

          <div className="relative mt-4 pt-16">
            {/* The ticket that travels along the stations */}
            <AnimatePresence>
              <motion.div
                key={cycle}
                className="absolute top-1"
                style={{ x: "-50%" }}
                initial={{ opacity: 0, scale: 0.3, left: "12.5%", y: 0 }}
                animate={{
                  opacity: shipped ? 0 : 1,
                  scale: shipped ? 0.5 : 1,
                  y: shipped ? -24 : 0,
                  left: `${at * 25 + 12.5}%`,
                }}
                exit={{ opacity: 0 }}
                transition={spring}
              >
                <motion.div
                  key={at}
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative flex h-12 w-10 flex-col justify-center gap-1.5 rounded-lg border-2 border-brand-ink bg-white px-1.5 shadow-[0_3px_0_0_var(--color-brand-ink)]"
                >
                  <span className={`h-1 w-full rounded-full transition-colors duration-300 ${at >= 1 ? "bg-brand-blue" : "bg-brand-ink/20"}`} />
                  <span className={`h-1 w-3/4 rounded-full transition-colors duration-300 ${at >= 1 ? "bg-brand-purple" : "bg-brand-ink/20"}`} />
                  <span className={`h-1 w-1/2 rounded-full transition-colors duration-300 ${at >= 1 ? "bg-brand-blue" : "bg-brand-ink/20"}`} />
                  {at >= 2 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={bouncy}
                      className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-lime"
                    >
                      <Check className="h-3 w-3" strokeWidth={4} />
                    </motion.span>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute left-[12.5%] right-[12.5%] top-24 border-t-2 border-dashed border-brand-ink/20" />

            <div className="relative grid grid-cols-4">
              {ai.stations.map((label, i) => {
                const Icon = stationIcons[i];
                const active = at === i;
                const done = i < at;
                return (
                  <div key={label} className="flex flex-col items-center gap-2.5">
                    <div className="relative">
                      <motion.div
                        animate={{ scale: active ? 1.1 : 1 }}
                        transition={bouncy}
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-brand-ink shadow-[0_4px_0_0_var(--color-brand-ink)] transition-colors duration-300 ${
                          active ? "bg-brand-lime" : done ? "bg-brand-lime-soft" : "bg-white"
                        }`}
                      >
                        <Icon className="h-7 w-7" />
                      </motion.div>

                      <AnimatePresence>
                        {i === 1 &&
                          active &&
                          sparkleSpots.map((spot) => (
                            <motion.span
                              key={spot.className}
                              className={`absolute text-brand-yellow ${spot.className}`}
                              initial={{ scale: 0, rotate: -40, opacity: 0 }}
                              animate={{ scale: 1, rotate: 0, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ ...bouncy, delay: spot.delay }}
                            >
                              <Sparkles className="h-5 w-5 fill-brand-yellow" />
                            </motion.span>
                          ))}
                      </AnimatePresence>

                      {i === lastStation && shipped && <Confetti className="left-1/2 top-0" />}
                    </div>
                    <span className={`text-sm font-black transition-colors duration-300 ${active ? "text-brand-ink" : "text-brand-muted"}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex h-11 items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={at}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18 }}
                className={`rounded-full border-2 border-brand-ink px-4 py-1.5 text-base font-black ${
                  at === lastStation ? "bg-brand-lime" : "bg-white"
                }`}
              >
                {ai.status[at]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Mock>
    </SceneShell>
  );
}

/* ── 2/4 · working like a company ────────────────────────── */

// 0 everything in To do, then one move per step until all three are Done
const TEAM_STEPS = [1000, 1000, 1000, 1000, 2300] as const;

// Column of each card (first, second, third) at each step.
const boardSteps = [
  [0, 0, 0],
  [1, 0, 0],
  [2, 1, 0],
  [2, 2, 1],
  [2, 2, 2],
];

const cardBars = ["bg-brand-blue", "bg-brand-purple", "bg-brand-yellow"];

export function TeamScene() {
  const { team } = content;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step, cycle } = useTimeline(TEAM_STEPS, onScreen);
  const columns = boardSteps[step];
  const allDone = step === boardSteps.length - 1;

  return (
    <SceneShell tone="blue" eyebrow={team.eyebrow} title={team.title} caption={team.caption} flip>
      <Mock>
        <div ref={ref}>
          <div className="flex h-9 items-center justify-between">
            <span className="rounded-full bg-brand-ink px-3 py-1 text-sm font-black text-white">
              {team.sprint} {Math.max(cycle, 1)}
            </span>
            <div className="relative">
              <AnimatePresence>
                {allDone && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.4, rotate: -14 }}
                    animate={{ opacity: 1, scale: 1, rotate: 3 }}
                    exit={{ opacity: 0, scale: 0.4 }}
                    transition={bouncy}
                    className="inline-flex items-center gap-1 rounded-full border-2 border-brand-ink bg-brand-lime px-3 py-1 text-sm font-black"
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                    {team.done}
                  </motion.span>
                )}
              </AnimatePresence>
              {allDone && <Confetti className="left-1/2 top-0" />}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3">
            {team.columns.map((name, col) => (
              <span key={name} className="px-1 text-center text-xs font-black uppercase tracking-wide text-brand-muted">
                {name} · {columns.filter((c) => c === col).length}
              </span>
            ))}
          </div>

          <div className="relative mt-2 h-[176px]">
            <div className="absolute inset-0 grid grid-cols-3">
              {team.columns.map((name) => (
                <div key={name} className="px-1">
                  <div className="h-full rounded-2xl bg-brand-ink/[0.06]" />
                </div>
              ))}
            </div>

            {team.cards.map((label, i) => {
              const col = columns[i];
              // Row = how many earlier cards share this column.
              const row = columns.slice(0, i).filter((c) => c === col).length;
              return (
                <motion.div
                  key={label}
                  className="absolute left-0 top-0 w-1/3 px-2 pt-2.5"
                  initial={false}
                  animate={{ x: `${col * 100}%`, y: row * 54 }}
                  transition={spring}
                >
                  <div
                    className={`flex h-11 items-center gap-1.5 rounded-xl border-2 border-brand-ink px-1.5 shadow-[0_3px_0_0_var(--color-brand-ink)] transition-colors duration-300 ${
                      col === 2 ? "bg-brand-lime-soft" : "bg-white"
                    }`}
                  >
                    <span className={`h-5 w-1.5 shrink-0 rounded-full ${cardBars[i]}`} />
                    <span className="whitespace-nowrap text-[13px] font-black">{label}</span>
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

/* ── 3/4 · a Tech Lead reviews your work ─────────────────── */

// 0 your code · 1 the reviewer is typing · 2 the comment · 3 the line gets fixed · 4 approved
const REVIEW_STEPS = [900, 1000, 1400, 1300, 2400] as const;

const codeBefore = [
  { width: "62%", tone: "bg-brand-purple" },
  { width: "80%", tone: "bg-white/30" },
];
const codeAfter = [
  { width: "48%", tone: "bg-brand-blue" },
  { width: "30%", tone: "bg-white/30" },
];

export function ReviewScene() {
  const { review } = content;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step } = useTimeline(REVIEW_STEPS, onScreen);
  const fixed = step >= 3;
  const approved = step >= 4;

  return (
    <SceneShell tone="purple" eyebrow={review.eyebrow} title={review.title} caption={review.caption}>
      <Mock>
        <div ref={ref}>
          <div className="relative rounded-2xl bg-brand-ink p-4">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-coral" />
              <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow" />
              <span className="h-2.5 w-2.5 rounded-full bg-brand-lime" />
              <span className="ml-2 text-xs font-bold text-white/50">{review.file}</span>
            </div>

            <div className="space-y-2.5">
              {codeBefore.map((line) => (
                <div key={line.width} className={`h-2.5 rounded-full ${line.tone}`} style={{ width: line.width }} />
              ))}

              {/* The line under review */}
              <div
                className={`-mx-1.5 flex h-7 items-center gap-2 rounded-lg px-1.5 transition-colors duration-300 ${
                  fixed ? "bg-brand-lime/25" : "bg-brand-coral/25"
                } ${step === 1 || step === 2 ? "ring-2 ring-brand-yellow" : ""}`}
              >
                <span className={`w-3 text-center text-sm font-black ${fixed ? "text-brand-lime" : "text-brand-coral"}`}>
                  {fixed ? "+" : "−"}
                </span>
                <motion.div
                  initial={false}
                  animate={{ width: fixed ? "44%" : "84%" }}
                  transition={spring}
                  className={`h-2.5 rounded-full transition-colors duration-300 ${fixed ? "bg-brand-lime" : "bg-brand-coral"}`}
                />
              </div>

              {codeAfter.map((line) => (
                <div key={line.width} className={`h-2.5 rounded-full ${line.tone}`} style={{ width: line.width }} />
              ))}
            </div>

            <AnimatePresence>
              {approved && (
                <motion.div
                  initial={{ opacity: 0, scale: 2.4, rotate: 8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -8 }}
                  exit={{ opacity: 0 }}
                  transition={bouncy}
                  className="absolute right-3 top-9 inline-flex items-center gap-1 rounded-xl border-2 border-brand-ink bg-brand-lime px-3 py-1.5 text-base font-black text-brand-ink shadow-[0_3px_0_0_rgba(0,0,0,0.35)]"
                >
                  <Check className="h-4 w-4" strokeWidth={4} />
                  {review.approved}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reviewer's comment */}
          <div className="mt-4 flex h-12 items-start justify-end gap-2.5">
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  key="bubble"
                  initial={{ opacity: 0, scale: 0.6, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={bouncy}
                  className="flex h-11 origin-right items-center rounded-2xl rounded-tr-md border-2 border-brand-ink bg-brand-yellow-soft px-4 text-[15px] font-bold"
                >
                  {step === 1 ? (
                    <span className="flex items-center gap-1">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          className="h-2 w-2 rounded-full bg-brand-ink/50"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.12 }}
                        />
                      ))}
                    </span>
                  ) : (
                    review.comment
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-purple text-sm font-black text-white">
              {review.reviewer}
            </span>
          </div>
        </div>
      </Mock>
    </SceneShell>
  );
}

/* ── 4/4 · something real for the résumé ─────────────────── */

// 0 empty · 1-3 one line gets ticked per step · 4 the reference stamp
const RESUME_STEPS = [700, 850, 850, 850, 2400] as const;

const rowIcons = [Smartphone, GitPullRequest, Users];

export function ResumeScene() {
  const { resume, hero } = content;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step } = useTimeline(RESUME_STEPS, onScreen);

  return (
    <SceneShell tone="yellow" eyebrow={resume.eyebrow} title={resume.title} caption={resume.caption} flip>
      <Mock>
        <div ref={ref} className="relative">
          <div className="flex items-center gap-3 border-b-2 border-dashed border-brand-ink/15 pb-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-yellow text-base font-black">
              {hero.you}
            </span>
            <div className="space-y-2">
              <div className="h-3 w-28 rounded-full bg-brand-ink" />
              <div className="h-2 w-20 rounded-full bg-brand-ink/20" />
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            {resume.rows.map((label, i) => {
              const Icon = rowIcons[i];
              const on = step > i;
              return (
                <motion.div
                  key={label}
                  initial={false}
                  animate={{ x: on ? 0 : 10, opacity: on ? 1 : 0.35 }}
                  transition={spring}
                  className={`flex items-center gap-3 rounded-xl border-2 px-3 py-2.5 transition-colors duration-300 ${
                    on ? "border-brand-ink bg-white" : "border-dashed border-brand-ink/30 bg-transparent"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-brand-ink transition-colors duration-300 ${
                      on ? "bg-brand-lime" : "bg-white"
                    }`}
                  >
                    {on && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={bouncy}>
                        <Check className="h-3.5 w-3.5" strokeWidth={4} />
                      </motion.span>
                    )}
                  </span>
                  <span className="flex-1 text-base font-black">{label}</span>
                  <Icon className="h-5 w-5 text-brand-muted" />
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 2.4, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 7 }}
                exit={{ opacity: 0 }}
                transition={bouncy}
                className="absolute -right-2 -top-3 inline-flex items-center gap-1 rounded-xl border-2 border-brand-ink bg-brand-purple px-3 py-1.5 text-base font-black text-white shadow-[0_3px_0_0_var(--color-brand-ink)]"
              >
                <Check className="h-4 w-4" strokeWidth={4} />
                {resume.stamp}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Mock>
    </SceneShell>
  );
}

/* ── a few more things members get ───────────────────────── */

const extraIcons = [MapPin, FileText, BookOpen, CalendarClock];

/** Short strip that closes the four scenes above; it shares the last scene's band colour. */
export function ExtrasStrip() {
  const { extras } = content;

  return (
    <section className="bg-brand-yellow-soft px-6 pb-16 md:pb-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <span className="text-base font-black text-brand-muted md:text-lg">{extras.label}</span>
        <div className="flex flex-wrap justify-center gap-3">
          {extras.items.map((item, i) => {
            const Icon = extraIcons[i % extraIcons.length];
            return (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.5, rotate: -6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: i % 2 ? 2 : -2 }}
                // Not "fully in view": a tilted pill never quite counts as that, and then it never shows.
                viewport={{ once: true, amount: 0.4 }}
                transition={{ ...bouncy, delay: i * 0.12 }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-ink bg-white px-4 py-2 text-[15px] font-black shadow-[0_3px_0_0_var(--color-brand-ink)] md:text-base"
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
