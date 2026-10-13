"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Github, KanbanSquare, MessagesSquare, Play, Smartphone } from "lucide-react";
import { Band, Clauses, Reveal, SectionHeading, bouncy, useOnScreen } from "@/components/kit";
import { Bun } from "../AppIntro";
import { ClipDialog, clipForStep, type Clip } from "./Clips";
import content from "./content.json";

/*
 * One task, six steps. The list on the left says what happens; the terminal
 * on the right shows what that step looks like from where you sit: what you
 * type, what the AI answers, and which tools it handles for you.
 */

const STEP_MS = 4200;

const toolIcons = [Github, KanbanSquare, MessagesSquare, Smartphone];

type Line = { who: string; text: string; code?: boolean; done?: boolean };

export default function StepsScene() {
  const { steps, clips } = content;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<Clip | null>(null);

  // Moves on by itself while the terminal is on screen; picking a step restarts the wait from there, and it holds still while a video is open.
  useEffect(() => {
    if (!onScreen || reduced || playing) return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % steps.items.length), STEP_MS);
    return () => clearTimeout(timer);
  }, [active, onScreen, reduced, playing, steps.items.length]);

  const item = steps.items[active];
  const lines: Line[] = item.lines;
  const lit: number[] = item.tools;

  return (
    <Band tone="blue">
      <SectionHeading eyebrow={steps.eyebrow} tone="blue" title={steps.title} lead={steps.lead} center />

      <div className="mt-16 grid items-start gap-6 md:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
        {/* What it looks like from your seat */}
        <Reveal delay={0.1} className="relative lg:order-2 lg:self-center">
          <Bun className="absolute -top-9 right-9 w-16 rotate-6 md:-top-11 md:w-20 xl:-top-[52px] xl:w-24" />
          <div
            ref={ref}
            className="rounded-[28px] border-2 border-brand-ink bg-brand-ink p-5 text-white shadow-[0_6px_0_0_var(--color-brand-lime-deep)] md:p-7 xl:p-8"
            aria-hidden
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-brand-coral" />
                <span className="h-3 w-3 rounded-full bg-brand-yellow" />
                <span className="h-3 w-3 rounded-full bg-brand-lime" />
                <span className="ml-2 font-mono text-sm font-bold text-white/60 xl:text-base">terminal</span>
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-black tabular-nums xl:text-base">
                {active + 1} / {steps.items.length}
              </span>
            </div>

            {/* Below the terminal on narrow screens the list is out of sight, so name the step here */}
            <p className="mt-4 text-xl font-black text-brand-lime lg:hidden">{item.title}</p>

            <div className="mt-4 h-[172px] md:h-[150px] lg:mt-5 lg:h-[196px] xl:mt-6 xl:h-[228px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="space-y-3 xl:space-y-4"
                >
                  {lines.map((line, i) => {
                    const mine = line.who === "you";
                    return (
                      <motion.div
                        key={line.text}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.15 + i * 0.75 }}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={`flex h-8 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-black text-brand-ink xl:h-9 xl:w-11 xl:text-base ${
                            mine ? "bg-brand-yellow" : "bg-brand-lime"
                          }`}
                        >
                          {mine ? steps.you : steps.ai}
                        </span>
                        <span
                          className={`min-w-0 flex-1 text-[17px] font-bold leading-snug xl:text-[22px] ${
                            line.code ? "font-mono" : ""
                          } ${mine ? "text-white" : "text-white/85"} ${
                            // A full-width "（" carries half a character of blank on its left; pull it back so the line starts level with the others
                            line.text.startsWith("（") ? "-ml-[0.45em]" : ""
                          }`}
                        >
                          <Clauses text={line.text} />
                        </span>
                        {line.done && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ ...bouncy, delay: 0.4 + i * 0.75 }}
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-lime text-brand-ink xl:h-7 xl:w-7"
                          >
                            <Check className="h-3.5 w-3.5 xl:h-4 xl:w-4" strokeWidth={4} />
                          </motion.span>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* The tools the AI works for you, lit when this step touches them */}
            <div className="border-t-2 border-dashed border-white/20 pt-4 xl:pt-5">
              <div className="flex flex-wrap items-center gap-2 xl:gap-2.5">
                <span className="mr-1 text-sm font-black text-white/60 xl:text-base">{steps.toolsLabel}</span>
                {steps.tools.map((tool, i) => {
                  const Icon = toolIcons[i];
                  const on = lit.includes(i);
                  return (
                    <motion.span
                      key={tool}
                      initial={false}
                      animate={{ scale: on ? [1, 1.14, 1] : 1 }}
                      transition={{ duration: 0.35, delay: on ? 0.5 : 0 }}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-black transition-colors duration-300 xl:px-3.5 xl:text-base ${
                        on ? "bg-brand-lime text-brand-ink" : "bg-white/10 text-white/55"
                      }`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.5} />
                      {tool}
                    </motion.span>
                  );
                })}
              </div>
              <p className="mt-3 text-[15px] font-bold text-white/70 xl:text-lg">{steps.toolsCaption}</p>
            </div>
          </div>

        </Reveal>

        {/* The six steps */}
        <Reveal className="lg:order-1">
          <ol className="space-y-2.5 xl:space-y-3">
            {steps.items.map((s, i) => {
              const on = i === active;
              const done = i < active;
              const clip = clipForStep(i + 1);
              return (
                <li
                  key={s.title}
                  className={`relative overflow-hidden rounded-2xl border-2 transition-colors duration-200 ${
                    on
                      ? "border-brand-ink bg-white shadow-[0_5px_0_0_var(--color-brand-ink)]"
                      : "border-brand-ink/15 bg-white/50 hover:border-brand-ink/40 hover:bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={on ? "step" : undefined}
                    className="block w-full cursor-pointer px-4 py-3 text-left xl:px-5 xl:py-4"
                  >
                    {/* Only the title line makes room for the video button; the description below uses the full width */}
                    <span className={`flex items-center gap-3 xl:gap-4 ${clip ? "pr-20 sm:pr-32" : ""}`}>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-ink text-base font-black transition-colors duration-200 xl:h-11 xl:w-11 xl:text-lg ${
                          on ? "bg-brand-lime" : done ? "bg-brand-lime-soft" : "bg-white"
                        }`}
                      >
                        {done ? <Check className="h-4 w-4 xl:h-5 xl:w-5" strokeWidth={4} /> : i + 1}
                      </span>
                      <span className={`text-xl font-black leading-snug xl:text-2xl ${on ? "" : "text-brand-muted"}`}>{s.title}</span>
                    </span>

                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.span
                          key="text"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="block overflow-hidden"
                        >
                          <span className="block pl-12 pt-2 text-[17px] font-bold leading-relaxed text-brand-muted lg:min-h-[4.2em] xl:pl-[3.75rem] xl:text-xl 2xl:min-h-[3.9em]">
                            <Clauses text={s.text} />
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  {/* A step that was filmed gets a button for its video */}
                  {clip && (
                    <button
                      type="button"
                      onClick={() => setPlaying(clip)}
                      className="absolute right-3 top-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full border-2 border-brand-ink bg-brand-yellow px-3 py-1.5 text-sm font-black shadow-[0_3px_0_0_var(--color-brand-ink)] transition-transform duration-150 hover:-translate-y-0.5 xl:right-4 xl:top-4 xl:text-base"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" strokeWidth={3} />
                      <span className="sm:hidden">{clips.short}</span>
                      <span className="hidden sm:inline">{clips.label}</span>
                    </button>
                  )}

                  {/* How long this step stays up */}
                  {on && onScreen && !reduced && !playing && (
                    <motion.span
                      key={`bar-${active}`}
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1 origin-left bg-brand-lime"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>

      {playing && <ClipDialog clip={playing} onClose={() => setPlaying(null)} />}
    </Band>
  );
}
