"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Clauses } from "@/components/kit";
import content from "./content.json";

/*
 * Short videos of a real task, one for each step that has one. A step shows
 * a small button for its video; pressing it plays the video large, with the
 * sound off unless the viewer turns it on.
 */

const { clips, steps } = content;

export type Clip = (typeof clips.items)[number];

/** The video for step number `step` (1 to 6), if there is one. */
export const clipForStep = (step: number) => clips.items.find((clip) => clip.step === step);

const stepLabel = (clip: Clip) => `${clips.stepPrefix.replace("{n}", String(clip.step))} · ${steps.items[clip.step - 1].title}`;

export function ClipDialog({ clip, onClose }: { clip: Clip; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={stepLabel(clip)}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-brand-ink/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={clips.close}
        className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-brand-ink bg-white"
      >
        <X className="h-5 w-5" strokeWidth={3} />
      </button>
      <video
        src={clip.src}
        poster={clip.poster}
        controls
        autoPlay
        muted
        loop
        playsInline
        onClick={(e) => e.stopPropagation()}
        className="max-h-[78vh] w-auto max-w-[min(1280px,94vw)] rounded-2xl border-2 border-white bg-brand-ink"
      />
      <p className="max-w-3xl text-center text-base font-bold leading-relaxed text-white md:text-lg" onClick={(e) => e.stopPropagation()}>
        <span className="mr-2 rounded-full bg-brand-lime px-2.5 py-0.5 text-sm font-black text-brand-ink">{stepLabel(clip)}</span>
        <Clauses text={clip.caption} />
      </p>
    </div>
  );
}
