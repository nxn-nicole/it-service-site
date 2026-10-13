"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import XhsModal from "@/components/XhsModal";
import { Band, CountUp, Reveal, SectionHeading, Sticker } from "@/components/kit";
import { buttonGhostClass, cardClass } from "@/components/styles";
import content from "./content.json";
import joinContent from "../join/content.json";
import homeContent from "../content.json";

/*
 * What students say: real reviews in full, the most telling ones first. The
 * rest sit behind a "more" button. The sentence that carries each one is
 * marked, for people who only skim.
 */

const { feedback } = content;

// In the order they are listed in content.json: strongest first.
const reviews = feedback.picks.flatMap((pick) => {
  const found = homeContent.feedback.feedbacks.find((f) => f.name === pick.name && f.date === pick.date);
  return found ? [{ ...found, mark: pick.mark }] : [];
});

type Review = (typeof reviews)[number];

// One layout per screen width: how many columns, how many reviews before "more" is pressed, and when it is used.
const layouts = [
  { columns: 1, shown: 4, wrap: "md:hidden", label: "md:hidden" },
  { columns: 2, shown: 8, wrap: "hidden md:flex xl:hidden", label: "hidden md:inline xl:hidden" },
  { columns: 3, shown: 9, wrap: "hidden xl:flex", label: "hidden xl:inline" },
];

const avatarTones = ["bg-brand-lime", "bg-brand-yellow", "bg-brand-blue text-white", "bg-brand-purple text-white", "bg-brand-coral text-white"];

function Marked({ text, mark }: { text: string; mark: string }) {
  const at = text.indexOf(mark);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <mark className="rounded-[3px] bg-brand-lime/55 box-decoration-clone px-0.5 font-black text-brand-ink">{mark}</mark>
      {text.slice(at + mark.length)}
    </>
  );
}

function Card({ review, rank, delay }: { review: Review; rank: number; delay: number }) {
  return (
    <Reveal delay={delay}>
      <figure className={`${cardClass} p-5 md:p-6`}>
        <blockquote className="text-[17px] font-medium leading-[1.75] text-brand-ink/85 md:text-lg md:leading-[1.75]">
          <Marked text={review.note} mark={review.mark} />
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-3 border-t-2 border-dashed border-brand-ink/15 pt-4">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-ink text-sm font-black ${avatarTones[rank % avatarTones.length]}`}
          >
            {[...review.name][0]}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-base font-black leading-tight">{review.name}</span>
            <span className="block text-sm font-bold text-brand-muted">{review.date.slice(0, 7)}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand-muted">
            <Image src="/xhs.png" alt="" width={18} height={18} className="rounded-[4px]" />
            {feedback.source}
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export default function FeedbackWall() {
  const [open, setOpen] = useState(false);

  // Closing the list makes the page much shorter, so bring the reader back to the top of it.
  const toggle = () => {
    if (open) document.getElementById("feedback")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(!open);
  };

  return (
    <Band tone="paper" id="feedback" className="scroll-mt-16">
      <SectionHeading eyebrow={feedback.eyebrow} title={joinContent.proof.title} center />

      <Reveal delay={0.05} className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <span className="text-base font-bold text-brand-muted md:text-lg">{feedback.countLead}</span>
        <Sticker tone="yellow">
          <CountUp value={feedback.count} />
        </Sticker>
      </Reveal>

      {/* Dealt out across the columns in order, so the strongest reviews make up the top row */}
      {layouts.map((layout) => (
        <div key={layout.columns} className={`mt-10 gap-5 md:mt-12 xl:gap-6 ${layout.wrap}`}>
          {Array.from({ length: layout.columns }, (_, column) => (
            <div key={column} className="flex min-w-0 flex-1 flex-col gap-5 xl:gap-6">
              {reviews.map((review, rank) =>
                rank % layout.columns === column && (open || rank < layout.shown) ? (
                  <Card key={`${review.name}-${review.date}`} review={review} rank={rank} delay={column * 0.06} />
                ) : null,
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="mt-8 flex flex-col items-center gap-4 md:mt-10">
        <button type="button" onClick={toggle} aria-expanded={open} className={buttonGhostClass}>
          {open
            ? feedback.less
            : layouts.map((layout) => (
                <span key={layout.columns} className={layout.label}>
                  {feedback.more.replace("{n}", String(reviews.length - layout.shown))}
                </span>
              ))}
          <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} strokeWidth={3} />
        </button>
        <XhsModal profileUrl="https://www.xiaohongshu.com/user/profile/615c36cd0000000002023df7">
          <div className={buttonGhostClass}>
            {feedback.all} <ArrowUpRight className="h-5 w-5" />
          </div>
        </XhsModal>
      </div>
    </Band>
  );
}
