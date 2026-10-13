"use client";

import { motion } from "motion/react";
import { User } from "lucide-react";
import { bouncy, useOnScreen, useTimeline } from "@/components/kit";

/* The idea behind the free help: a student who has been helped grows, then
   helps the next ones. One becomes two, two become four. */

// 0 one person helping · 1 two students are helped and grow · 2 they help four more · 3 it keeps going
const STEPS = [1000, 1500, 1700, 2600] as const;

// Places inside a 300 × 180 picture. `grown` is the step at which that person has grown.
const people = [
  { x: 150, y: 26, size: 44, grown: 0 },
  { x: 86, y: 88, size: 36, grown: 1, from: 0 },
  { x: 214, y: 88, size: 36, grown: 1, from: 0 },
  { x: 38, y: 148, size: 30, grown: 2, from: 1 },
  { x: 118, y: 148, size: 30, grown: 2, from: 1 },
  { x: 182, y: 148, size: 30, grown: 2, from: 2 },
  { x: 262, y: 148, size: 30, grown: 2, from: 2 },
];

export default function PassItOnScene() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>();
  const { step } = useTimeline(STEPS, onScreen);

  return (
    <div ref={ref} className="relative mx-auto h-[180px] w-[300px] max-w-full" aria-hidden>
      <svg viewBox="0 0 300 180" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        {/* A hand reaching from each person to the ones they help */}
        {people.map((person, i) => {
          if (person.from === undefined) return null;
          const helper = people[person.from];
          const reached = step >= person.grown;
          return (
            <motion.line
              key={i}
              x1={helper.x}
              y1={helper.y + helper.size / 2 + 3}
              x2={person.x}
              y2={person.y - person.size / 2 - 3}
              stroke="var(--color-brand-ink)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: reached ? 1 : 0, opacity: reached ? 1 : 0 }}
              transition={{ pathLength: { duration: reached ? 0.45 : 0 }, opacity: { duration: 0.01 } }}
            />
          );
        })}

        {/* And on it goes */}
        {people
          .filter((person) => person.grown === 2)
          .map((person, i) => (
            <motion.line
              key={i}
              x1={person.x}
              y1={person.y + person.size / 2 + 4}
              x2={person.x}
              y2={person.y + person.size / 2 + 15}
              stroke="var(--color-brand-ink)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 6"
              initial={false}
              animate={{ opacity: step >= 3 ? 0.6 : 0 }}
              transition={{ duration: 0.3, delay: step >= 3 ? i * 0.06 : 0 }}
            />
          ))}
      </svg>

      {people.map((person, i) => {
        const grown = step >= person.grown;
        // New students show up once the people who will help them have grown.
        const here = step >= person.grown - 1;
        return (
          <motion.span
            key={i}
            initial={false}
            animate={{ opacity: here ? 1 : 0, scale: grown ? [1, 1.25, 1] : here ? 1 : 0.6 }}
            transition={grown ? { duration: 0.45, delay: person.grown === 0 ? 0 : 0.42 } : bouncy}
            className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
              grown ? "border-brand-ink bg-brand-lime" : "border-dashed border-brand-ink/40 bg-white text-brand-ink/40"
            }`}
            style={{
              left: `${(person.x / 300) * 100}%`,
              top: person.y,
              width: person.size,
              height: person.size,
              transitionDelay: grown && person.grown > 0 ? "420ms" : "0ms",
            }}
          >
            <User style={{ width: person.size * 0.45, height: person.size * 0.45 }} strokeWidth={3} />
          </motion.span>
        );
      })}
    </div>
  );
}
