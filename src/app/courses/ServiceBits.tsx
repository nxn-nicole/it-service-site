"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check } from "lucide-react";
import { bouncy } from "@/components/kit";

/**
 * Icon tile that pops in the first time it is seen. It also tilts when the
 * card around it (marked `group`) is hovered.
 */
export function PopIcon({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });

  return (
    // The outer span stays put so "is it on screen" is measured on a full-size box.
    <span ref={ref} className="inline-flex shrink-0">
      <motion.span
        className="inline-flex"
        initial={false}
        animate={seen ? { scale: 1, rotate: 0 } : { scale: 0.3, rotate: -18 }}
        transition={{ ...bouncy, delay: seen ? delay : 0 }}
      >
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-brand-ink shadow-[0_4px_0_0_var(--color-brand-ink)] transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110 ${className}`}
        >
          {children}
        </span>
      </motion.span>
    </span>
  );
}

/**
 * A checklist that ticks itself off, one line after another, the first time
 * it is seen. `tick` is the fill of a ticked circle, e.g. "bg-brand-lime".
 */
export function TickList({
  points,
  tick = "bg-brand-lime",
  delay = 0.3,
  className = "",
}: {
  points: string[];
  tick?: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLUListElement | null>(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });

  return (
    <ul ref={ref} className={className}>
      {points.map((point, i) => {
        // Rounded so the server and the browser print the same number.
        const wait = Math.round((delay + i * 0.14) * 100) / 100;
        return (
          <li key={point} className="flex items-start gap-3 text-base font-semibold leading-snug">
            <span
              className={`mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-brand-ink transition-colors duration-300 ${
                seen ? tick : "bg-white"
              }`}
              style={{ transitionDelay: `${wait}s` }}
            >
              <motion.span
                className="flex"
                initial={false}
                animate={{ scale: seen ? 1 : 0 }}
                transition={{ ...bouncy, delay: seen ? wait : 0 }}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={4} />
              </motion.span>
            </span>
            <span>{point}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** Rocks its child gently from side to side, like a sticker that will not sit still. */
export function Wobble({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="inline-flex"
      initial={{ rotate: -4 }}
      animate={{ rotate: [-4, 4, -4] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}
