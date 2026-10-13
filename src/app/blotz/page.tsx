import type { Metadata } from "next";
import Link from "next/link";
import content from "./content.json";
import { Band, Reveal, SectionHeading } from "@/components/kit";
import { buttonGhostClass } from "@/components/styles";
import { AiScene, ExtrasStrip, ResumeScene, ReviewScene, TeamScene } from "../join/GetScenes";
import { Hero } from "../join/Hero";
import AuditScene from "./AuditScene";
import AppIntro from "./AppIntro";
import ArchScene from "./ArchScene";
import FeedbackWall from "./FeedbackWall";
import FitScene from "./FitScene";
import GrowScene from "./GrowScene";
import TableScene from "./TableScene";
import { ArrowRight, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "参与 Blotz 工业实战项目 | 马农不卷大厂",
  description:
    "加入 Blotz 团队，参与一个已有 3000+ 注册用户的生产级全栈项目，积累可验证的真实工程经验，打造你的技术作品集。",
};

// This is the public page for people who have not sat in on a meeting yet.
// It tells the same story as /join (the page sent after an audit) but leaves
// out the fee screens and ends on "come and audit once".

export default function BlotzPage() {
  return (
    <>
      {/* ── What the project is for ─────────────────────────── */}
      <Hero
        sticker={`Blotz ${content.hero.eyebrow}`}
        lead={content.hero.lead}
        title={content.hero.headline}
        scene={<TableScene />}
        standalone={false}
        compact
        hint=""
      />

      {/* ── What the project is: the app, real screens, where to check it ── */}
      <AppIntro />

      {/* ── How the team really builds: heading for the screens that follow ── */}
      <Band tone="lime" className="pb-0! md:pb-0!">
        <SectionHeading title={content.process.title} center />
      </Band>

      {/* ── What you get (shared with /join) ────────────────── */}
      <AiScene
        className="pt-10! md:pt-14!"
        action={
          <Link href="/blotz/ai" className={buttonGhostClass}>
            {content.aiLink} <ArrowRight className="h-5 w-5" />
          </Link>
        }
      />
      <TeamScene />
      <ReviewScene />
      <ResumeScene />
      <ExtrasStrip />

      {/* ── Where a member can go from here ─────────────────── */}
      <GrowScene />

      {/* ── Who it suits ────────────────────────────────────── */}
      <FitScene />

      {/* ── What students say: the ten best reviews, in full ── */}
      <FeedbackWall />

      {/* ── How it is built: the team's architecture drawing, redrawn ── */}
      <ArchScene />

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <Band tone="yellow">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading title={`[${content.faq.title}]`} />
          </div>

          <div className="space-y-4">
            {content.faq.items.map((item, i) => (
              <Reveal key={item.question} delay={i * 0.05}>
                <details className="group rounded-2xl border-2 border-brand-ink bg-white shadow-[0_4px_0_0_var(--color-brand-ink)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 [&::-webkit-details-marker]:hidden">
                    <span className="text-[17px] font-black leading-snug md:text-lg">{item.question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-yellow transition-transform duration-300 group-open:rotate-180">
                      <ChevronDown className="h-4 w-4" strokeWidth={3} />
                    </span>
                  </summary>
                  <div className="px-5 pb-5 md:px-6">
                    <p className="text-base leading-relaxed text-brand-muted">{item.answer}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      {/* ── Next step: sit in on one meeting ────────────────── */}
      <AuditScene />
    </>
  );
}
