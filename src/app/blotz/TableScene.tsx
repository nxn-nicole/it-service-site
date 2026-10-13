"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ClipboardList, Laptop, Megaphone, PenTool, Rocket, Sparkles, Sprout, Star } from "lucide-react";
import { Confetti, bouncy, useOnScreen, useTimeline } from "@/components/kit";
import content from "./content.json";

/*
 * The first-screen picture for the project page: the whole team round one
 * new feature. A phone in the middle starts empty; product, design, the
 * newcomer, the reviewers and marketing each add their part to what is on its
 * screen, one after another, and it ships.
 */

// Left column top to bottom, then the right column; the newcomer's seat is the middle one on the right.
const seatIcons = [ClipboardList, PenTool, Megaphone, Star, Sprout, Laptop];
const seatTones = [
  "bg-brand-purple text-white",
  "bg-brand-blue text-white",
  "bg-brand-coral text-white",
  "bg-brand-lime",
  "bg-brand-yellow",
  "bg-white",
];
// Which part each seat adds (an index into the parts): the two on either side of the newcomer review together.
const seatPart = [0, 1, 4, 3, 2, 3];

// 0 everyone seated · 1-5 one more part added each step · 6 shipped
const TABLE_STEPS = [900, 1150, 1150, 1150, 1150, 1150, 2800] as const;

// Sizes inside the 300px-tall picture.
const SEAT = 44;
const SEAT_TOPS = [2, 77, 152]; // top of the circle in each row; a seat with its name is 66 tall
// The two columns of seats, as shares of the width, so the dot that flies to the phone starts from a seat's middle at any size
const COLUMN = { width: 30.4, centres: [15.2, 84.8] };
const PHONE = { top: 4, width: 124, height: 200 };

const rowBars = ["bg-brand-blue", "bg-brand-purple", "bg-brand-yellow"];
const rowWidths = ["78%", "56%", "68%"];

export default function TableScene() {
  const { table } = content.hero;
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step, cycle } = useTimeline(TABLE_STEPS, onScreen);
  const added = Math.min(step, table.parts.length);
  const complete = step >= TABLE_STEPS.length - 1;

  // What each part leaves on the phone's screen.
  const outlined = added >= 1; // the requirements: what goes where, as dashed boxes
  const designed = added >= 2; // the design: the boxes take their real look
  const built = added >= 3; // the code: it works, so the list ticks and the button lights up
  const reviewed = added >= 4;
  const announced = added >= 5;

  // A box on the screen goes from nothing, to a dashed outline, to its designed look.
  const box = (look: string) => (designed ? `border-brand-ink ${look}` : outlined ? "border-dashed border-brand-ink/40" : "border-transparent");

  return (
    <div
      className="mx-auto mt-10 w-full max-w-md rounded-[32px] border-2 border-brand-ink bg-brand-lime-soft px-3 py-6 shadow-[0_6px_0_0_var(--color-brand-ink)] lg:mt-0 lg:max-w-none xl:py-8"
      aria-hidden
    >
      {/* Shrunk a little on the narrowest phones so the seats stay inside the panel */}
      <div
        ref={ref}
        className="relative mx-auto h-[300px] w-full max-w-[342px] [zoom:0.8] min-[380px]:[zoom:0.95] lg:max-w-[400px] xl:[zoom:1.05] 2xl:[zoom:1.2]"
      >
        {/* Six seats: three down each side of the phone */}
        {table.seats.map((name, i) => {
          const Icon = seatIcons[i];
          const acting = !complete && added > 0 && seatPart[i] === added - 1;
          const acted = complete || seatPart[i] < added - 1;
          return (
            <div
              key={name}
              className="absolute flex flex-col items-center gap-1"
              style={{ top: SEAT_TOPS[i % 3], width: `${COLUMN.width}%`, [i < 3 ? "left" : "right"]: 0 }}
            >
              <motion.span
                initial={false}
                animate={{ scale: acting ? [1, 1.22, 1] : 1 }}
                transition={{ duration: 0.45 }}
                className={`relative flex items-center justify-center rounded-full border-2 border-brand-ink text-[15px] font-black shadow-[0_3px_0_0_var(--color-brand-ink)] transition-shadow duration-200 ${seatTones[i]} ${
                  acting ? "ring-4 ring-brand-lime" : ""
                }`}
                style={{ height: SEAT, width: SEAT }}
              >
                <Icon className="h-5 w-5" strokeWidth={2.5} />
                {acted && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={bouncy}
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-lime text-brand-ink"
                  >
                    <Check className="h-3 w-3" strokeWidth={4} />
                  </motion.span>
                )}
              </motion.span>
              <span className="whitespace-nowrap text-sm font-black leading-[18px]">{name}</span>
            </div>
          );
        })}

        {/* The phone, with the feature everyone is working on taking shape on its screen */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 rounded-[26px] border-2 border-brand-ink bg-brand-ink p-1.5 shadow-[0_4px_0_0_var(--color-brand-ink)] transition-shadow duration-300 ${
            complete ? "ring-4 ring-brand-lime" : ""
          }`}
          style={{ top: PHONE.top, width: PHONE.width, height: PHONE.height }}
        >
          <div className="relative flex h-full flex-col gap-1.5 overflow-hidden rounded-[18px] bg-white px-2 pb-2 pt-[18px]">
            <span className="absolute left-1/2 top-1.5 h-1.5 w-8 -translate-x-1/2 rounded-full bg-brand-ink/15" />

            {/* Before anyone has added a part there is only the idea */}
            <span
              className={`absolute inset-0 flex items-center justify-center text-base font-black text-brand-ink/35 transition-opacity duration-200 ${
                outlined ? "opacity-0" : ""
              }`}
            >
              {table.task}
            </span>

            {/* A title bar */}
            <span
              className={`flex h-5 shrink-0 items-center gap-1 rounded-md border-2 px-1.5 transition-colors duration-300 ${box(
                complete ? "bg-brand-lime" : "bg-brand-purple-soft",
              )}`}
            >
              <span className={`h-2 w-2 rounded-full transition-colors duration-300 ${designed ? "bg-brand-purple" : "bg-transparent"}`} />
              <span className={`h-1.5 w-9 rounded-full transition-colors duration-300 ${designed ? "bg-brand-ink/25" : "bg-transparent"}`} />
            </span>

            {/* A list of three */}
            {rowBars.map((bar, i) => (
              <span key={bar} className={`flex h-[22px] shrink-0 items-center gap-1.5 rounded-md border-2 px-1.5 transition-colors duration-300 ${box("bg-white")}`}>
                <span
                  className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-[4px] border-2 transition-colors duration-200 ${
                    built ? "border-brand-ink bg-brand-lime" : designed ? "border-brand-ink bg-white" : "border-transparent"
                  }`}
                  style={{ transitionDelay: built ? `${400 + i * 140}ms` : "0ms" }}
                >
                  {built && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...bouncy, delay: 0.4 + i * 0.14 }}>
                      <Check className="h-2 w-2" strokeWidth={5} />
                    </motion.span>
                  )}
                </span>
                <span className={`h-1.5 rounded-full transition-colors duration-300 ${designed ? bar : "bg-transparent"}`} style={{ width: rowWidths[i] }} />
              </span>
            ))}

            {/* A button */}
            <span
              className={`mt-auto flex h-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${box(
                built ? "bg-brand-lime delay-[400ms]" : "bg-brand-yellow-soft",
              )}`}
            >
              {built && (
                <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ ...bouncy, delay: 0.45 }}>
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2.6} />
                </motion.span>
              )}
            </span>

            {/* Reviewed: a stamp on the work */}
            {reviewed && (
              <motion.span
                initial={{ scale: 2, opacity: 0, rotate: -24 }}
                animate={{ scale: 1, opacity: 1, rotate: -10 }}
                transition={{ ...bouncy, delay: 0.4 }}
                className="absolute bottom-9 right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-purple text-white shadow-[0_2px_0_0_var(--color-brand-ink)]"
              >
                <Check className="h-4 w-4" strokeWidth={4} />
              </motion.span>
            )}
          </div>

          {/* Announced: the word is out */}
          {announced && (
            <motion.span
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 12 }}
              transition={{ ...bouncy, delay: complete ? 0 : 0.4 }}
              className="absolute -right-5 top-3 rounded-full border-2 border-brand-ink bg-brand-coral px-2 py-0.5 text-xs font-black text-white shadow-[0_2px_0_0_var(--color-brand-ink)]"
            >
              {table.fresh}
            </motion.span>
          )}

          {complete && <Confetti className="left-1/2 top-6" />}
        </div>

        {/* Each part travels from the seat that made it to the phone */}
        {!complete &&
          added > 0 &&
          table.seats.map((name, i) =>
            seatPart[i] === added - 1 ? (
              <motion.span
                key={`${cycle}-${added}-${name}`}
                className="absolute z-10 -ml-2 -mt-2 h-4 w-4 rounded-full border-2 border-brand-ink bg-brand-lime"
                initial={{ left: `${COLUMN.centres[i < 3 ? 0 : 1]}%`, top: SEAT_TOPS[i % 3] + SEAT / 2, opacity: 0, scale: 0.6 }}
                animate={{ left: "50%", top: PHONE.top + PHONE.height / 2, opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.5] }}
                transition={{ duration: 0.55, delay: 0.12, ease: "easeInOut", times: [0, 0.15, 0.8, 1] }}
              />
            ) : null,
          )}

        {/* What was just added, then the result */}
        <div className="absolute inset-x-0 flex h-6 justify-center" style={{ top: PHONE.top + PHONE.height + 14 }}>
          <AnimatePresence initial={false}>
            {added > 0 && (
              <motion.span
                key={complete ? "done" : added}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.18, delay: complete ? 0.1 : 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="absolute inset-y-0 inline-flex items-center gap-1.5 whitespace-nowrap text-base font-black leading-none"
              >
                {complete ? <Rocket className="h-4 w-4" strokeWidth={2.6} /> : <Check className="h-4 w-4 text-brand-lime-deep" strokeWidth={4} />}
                {complete ? table.done : table.parts[added - 1]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* What the shipped feature adds up to for you: outlined from the start, filled in at the end */}
        <div className="absolute inset-x-0 bottom-0 flex h-10 items-end justify-center">
          <span
            className={`absolute inline-flex items-center rounded-full border-2 border-dashed border-brand-ink/30 px-4 py-1.5 text-base font-black text-brand-ink/40 transition-opacity duration-150 ${
              complete ? "opacity-0" : ""
            }`}
          >
            {table.goal}
          </span>
          <AnimatePresence>
            {complete && (
              <motion.span
                initial={{ opacity: 0, scale: 0.4, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={bouncy}
                className="relative inline-flex items-center rounded-full border-2 border-brand-ink bg-brand-lime px-4 py-1.5 text-base font-black shadow-[0_3px_0_0_var(--color-brand-ink)]"
              >
                {table.goal}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
