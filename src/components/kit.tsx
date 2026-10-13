"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll } from "motion/react";

export const spring = { type: "spring", stiffness: 380, damping: 28 } as const;
export const bouncy = { type: "spring", stiffness: 520, damping: 17 } as const;

export type Tone = "paper" | "lime" | "blue" | "purple" | "yellow";

const toneBand: Record<Tone, string> = {
  paper: "bg-brand-paper",
  lime: "bg-brand-lime-soft",
  blue: "bg-brand-blue-soft",
  purple: "bg-brand-purple-soft",
  yellow: "bg-brand-yellow-soft",
};

const toneSticker: Record<Tone, string> = {
  paper: "bg-white",
  lime: "bg-brand-lime",
  blue: "bg-brand-blue text-white",
  purple: "bg-brand-purple text-white",
  yellow: "bg-brand-yellow",
};

/**
 * Walks through `durations` (ms spent on each step) while `active`, then loops.
 * It always restarts from step 0 when it becomes active, and `cycle` ticks on
 * every restart so travelling elements can re-enter instead of snapping back.
 * `durations` must be a stable (module-level) array.
 */
export function useTimeline(durations: readonly number[], active: boolean) {
  const reduced = useReducedMotion();
  const [state, setState] = useState({ step: 0, cycle: 0 });

  useEffect(() => {
    if (!active || reduced) return;
    let step = -1;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      step = (step + 1) % durations.length;
      const next = step;
      setState((s) => ({ step: next, cycle: next === 0 ? s.cycle + 1 : s.cycle }));
      timer = setTimeout(tick, durations[next]);
    };
    timer = setTimeout(tick, 0);
    return () => clearTimeout(timer);
  }, [active, reduced, durations]);

  // With reduced motion, rest on the finished picture.
  return reduced ? { step: durations.length - 1, cycle: 0 } : state;
}

/** True while at least half of the element is on screen. */
export function useOnScreen<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const onScreen = useInView(ref, { amount: 0.5 });
  return { ref, onScreen };
}

/**
 * A sentence that wraps after a comma where it can, instead of in the middle
 * of a phrase. A phrase too long for the line still wraps inside itself.
 */
export function Clauses({ text }: { text: string }) {
  const parts = text.match(/[^，、；。]+[，、；。]*/g) ?? [text];
  return (
    <>
      {parts.map((part, i) => (
        <span key={i} className="inline-block max-w-full">
          {part}
        </span>
      ))}
    </>
  );
}

/**
 * Renders "普通文字[高亮]普通文字" with a highlighter swipe behind the bracketed
 * part. A "\n" in the text starts a new line.
 */
export function Title({ text }: { text: string }) {
  const lines = text.split("\n");
  if (lines.length > 1) {
    return (
      <>
        {lines.map((line) => (
          <span key={line} className="block whitespace-nowrap">
            <Title text={line} />
          </span>
        ))}
      </>
    );
  }

  const parts = text.split(/\[|\]/);

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="relative inline-block whitespace-nowrap px-1">
            <motion.span
              aria-hidden
              className="absolute inset-x-0 bottom-[0.06em] top-[48%] -z-10 origin-left rounded-md bg-brand-lime"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
            />
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function Sticker({
  children,
  tone = "paper",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border-2 border-brand-ink px-3.5 py-1 text-sm font-black shadow-[0_3px_0_0_var(--color-brand-ink)] ${toneSticker[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * The white "screen" every animated illustration sits on. It is drawn at phone
 * size and simply magnified on wide screens, so the motion inside stays in step.
 * The magnifying waits until the column is wide enough to hold it: on a tablet
 * the two-column layout leaves about 300px, which is already phone size. The
 * narrowest phones get it slightly shrunk instead.
 */
export function Mock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-md rounded-[28px] border-2 border-brand-ink bg-white p-5 shadow-[0_6px_0_0_var(--color-brand-ink)] max-[359px]:[zoom:0.88] md:max-w-[25rem] min-[860px]:[zoom:1.15] min-[960px]:[zoom:1.3] 2xl:[zoom:1.6] ${className}`}
    >
      {children}
    </div>
  );
}

/** One screen: sticker + headline + caption on one side, the animated mock on the other. */
export function SceneShell({
  tone,
  eyebrow,
  title,
  caption,
  flip = false,
  action,
  className = "",
  children,
}: {
  tone: Tone;
  eyebrow: string;
  title: string;
  caption?: string;
  flip?: boolean;
  /** A link or button under the caption. */
  action?: React.ReactNode;
  /** Extra classes for the section, e.g. less space on top when a heading sits right above. */
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${toneBand[tone]} px-6 py-16 md:py-28 ${className}`}>
      <div className="mx-auto grid max-w-[min(1320px,90vw)] items-center gap-9 md:grid-cols-2 md:gap-20">
        <motion.div
          className={`space-y-4 text-center md:space-y-6 md:text-left ${flip ? "md:order-2" : ""}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Sticker tone={tone === "paper" ? "lime" : tone} className="-rotate-2">
            {eyebrow}
          </Sticker>
          <h2 className="isolate text-[2.1rem] font-black leading-[1.2] tracking-tight md:text-[2.5rem] md:leading-[1.15] lg:text-[3.5rem] xl:text-6xl">
            <Title text={title} />
          </h2>
          {caption && (
            <p className="hidden text-xl leading-relaxed text-brand-muted md:block">
              <Clauses text={caption} />
            </p>
          )}
          {action && <div className="hidden pt-2 md:block">{action}</div>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
          {caption && (
            <p className="mx-auto mt-7 max-w-sm text-center text-[17px] leading-relaxed text-brand-muted md:hidden">
              <Clauses text={caption} />
            </p>
          )}
          {action && <div className="mt-6 flex justify-center md:hidden">{action}</div>}
        </motion.div>
      </div>
    </section>
  );
}

/** The little "you" token that hops around several scenes. */
export function YouToken({ label, hopKey }: { label: string; hopKey: number }) {
  return (
    <motion.div
      key={hopKey}
      initial={{ y: 0 }}
      animate={{ y: [0, -22, 0] }}
      transition={{ duration: 0.45, times: [0, 0.45, 1], ease: "easeOut" }}
      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-yellow text-sm font-black shadow-[0_3px_0_0_var(--color-brand-ink)]"
    >
      {label}
    </motion.div>
  );
}

const confettiBits = [
  { x: -46, y: -38, c: "bg-brand-lime", r: -30 },
  { x: -22, y: -58, c: "bg-brand-blue", r: 40 },
  { x: 6, y: -66, c: "bg-brand-yellow", r: 10 },
  { x: 30, y: -52, c: "bg-brand-purple", r: -50 },
  { x: 50, y: -30, c: "bg-brand-coral", r: 25 },
  { x: -58, y: -10, c: "bg-brand-yellow", r: 60 },
  { x: 60, y: -6, c: "bg-brand-lime", r: -15 },
];

/** A small burst of paper bits; mount it to fire once. */
export function Confetti({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute h-0 w-0 ${className}`} aria-hidden>
      {confettiBits.map((bit, i) => (
        <motion.span
          key={i}
          className={`absolute h-2.5 w-2.5 rounded-[3px] ${bit.c}`}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
          animate={{ x: bit.x, y: [0, bit.y, bit.y + 26], opacity: [1, 1, 0], scale: 1, rotate: bit.r * 4 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            y: { duration: 1, times: [0, 0.55, 1], ease: "easeOut" },
            opacity: { duration: 1, times: [0, 0.6, 1] },
          }}
        />
      ))}
    </div>
  );
}

/* ── site-wide building blocks ───────────────────────────── */

/** Thin bar along the top that fills as the page scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-1.5 origin-left bg-brand-lime"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/** Full-bleed coloured band with a centred container. */
export function Band({
  tone = "paper",
  id,
  className = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`${toneBand[tone]} px-6 py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-[min(1320px,90vw)]">{children}</div>
    </section>
  );
}

const revealOffsets = {
  up: { x: 0, y: 24 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
};

/** Fades its children in from below (or from one side) when they scroll into view. */
export function Reveal({
  children,
  from = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  from?: keyof typeof revealOffsets;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...revealOffsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/** Sticker eyebrow + big headline ("[...]" gets the highlighter) + optional lead line. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "lime",
  center = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: Tone;
  center?: boolean;
}) {
  return (
    <Reveal className={`space-y-4 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <Sticker tone={tone} className="-rotate-2">
          {eyebrow}
        </Sticker>
      )}
      <h2 className="isolate text-balance text-[2rem] font-black leading-[1.2] tracking-tight md:text-5xl">
        <Title text={title} />
      </h2>
      {lead && (
        <p className={`max-w-3xl text-[17px] leading-relaxed text-brand-muted md:text-xl ${center ? "mx-auto" : ""}`}>
          <Clauses text={lead} />
        </p>
      )}
    </Reveal>
  );
}

/** Counts up to a figure such as "150+" or "100%" the first time it is seen. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  const reduced = useReducedMotion();
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  const target = match ? Number(match[1].replace(/,/g, "")) : null;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (target === null || !inView) return;
    const controls = animate(0, target, {
      duration: reduced ? 0 : 1.1,
      ease: "easeOut",
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduced]);

  if (!match || target === null) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {match[1].includes(",") ? shown.toLocaleString("en-US") : shown}
      {match[2]}
    </span>
  );
}
