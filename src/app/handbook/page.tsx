import type { Metadata } from "next";
import content from "./content.json";
import homeContent from "../content.json";
import WeChatModal from "@/components/WeChatModal";
import PricingTabs from "@/components/PricingTabs";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import HandbookPreviewModal from "@/components/HandbookPreviewModal";
import { Band, Reveal, SectionHeading, Sticker, Title } from "@/components/kit";
import { buttonLimeClass, cardClass } from "@/components/styles";
import {
  Bookmark,
  Code2,
  Bot,
  GitPullRequest,
  ArrowUpRight,
  Check,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "全栈学习手册 | 马农不卷大厂",
  description:
    "专为零基础人群设计的系统化全栈学习手册，涵盖前端、后端、移动端与 AI 辅助开发，配合 1v1 代码审查。",
};

// content.json still names the old accent colours; these map them onto the
// site palette. `pill` is the category label, `dot` the bullet in its list.
const colorMap: Record<string, { pill: string; dot: string }> = {
  rose:   { pill: "bg-brand-coral",             dot: "bg-brand-coral" },
  cyan:   { pill: "bg-brand-blue-soft",         dot: "bg-brand-blue" },
  orange: { pill: "bg-brand-yellow",            dot: "bg-brand-yellow" },
  blue:   { pill: "bg-brand-blue text-white",   dot: "bg-brand-blue" },
  violet: { pill: "bg-brand-purple text-white", dot: "bg-brand-purple" },
  pink:   { pill: "bg-brand-lime",              dot: "bg-brand-lime-deep" },
};

// Icon tile of each "how it works" card. Cyan would land on the same blue as
// its neighbour, so it takes yellow and the four tiles stay four colours.
const pillarColorMap: Record<string, string> = {
  violet:  "bg-brand-purple text-white",
  blue:    "bg-brand-blue text-white",
  cyan:    "bg-brand-yellow",
  emerald: "bg-brand-lime",
};

const pillarIcons = [Bookmark, Code2, Bot, GitPullRequest];

/** Wraps `phrase` in [ ] so the heading draws its highlighter behind it. */
const mark = (text: string, phrase: string) => text.replace(phrase, `[${phrase}]`);

type Category = { id: string; label: string; color: string; modules: string[] };

// Tint of a curriculum card's title bar and footer.
const curriculumTones = {
  purple: "bg-brand-purple-soft",
  blue:   "bg-brand-blue-soft",
};

/** One handbook, drawn as a window: title bar, module list, then the two ways in. */
function CurriculumCard({
  title,
  tone,
  categories,
  fallbackColor,
  spreadModules = false,
  children,
}: {
  title: string;
  tone: keyof typeof curriculumTones;
  categories: Category[];
  fallbackColor: string;
  /** With a single category, flow its modules across the columns instead. */
  spreadModules?: boolean;
  children?: React.ReactNode;
}) {
  const tint = curriculumTones[tone];
  const columns = "sm:columns-2 lg:columns-3 sm:gap-x-10";

  return (
    <div className={`${cardClass} overflow-hidden`}>
      {/* Title bar */}
      <div className={`flex items-center gap-3 border-b-2 border-brand-ink px-5 py-3 ${tint}`}>
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full border-2 border-brand-ink bg-brand-coral" />
          <span className="h-3 w-3 rounded-full border-2 border-brand-ink bg-brand-yellow" />
          <span className="h-3 w-3 rounded-full border-2 border-brand-ink bg-brand-lime" />
        </div>
        <span className="mx-auto pr-12 text-sm font-black uppercase tracking-widest">{title}</span>
      </div>

      {/* Module list */}
      <div className="space-y-5 p-6 md:p-8">
        <div className={spreadModules ? "" : columns}>
          {categories.map((cat) => {
            const colors = colorMap[cat.color] ?? colorMap[fallbackColor];
            return (
              <div key={cat.id} className="mb-6 break-inside-avoid space-y-3 last:mb-0">
                <span
                  className={`inline-flex items-center rounded-full border-2 border-brand-ink px-3 py-0.5 text-[13px] font-black tracking-wide ${colors.pill}`}
                >
                  {cat.label}
                </span>
                <ul className={`pl-1 ${spreadModules ? columns : ""}`}>
                  {cat.modules.map((mod) => (
                    <li
                      key={mod}
                      className="flex break-inside-avoid items-start gap-2.5 pb-2 text-[15px] font-semibold leading-snug"
                    >
                      <span className={`mt-[0.4em] h-2 w-2 shrink-0 rounded-full ${colors.dot}`} />
                      {mod}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        {children}
      </div>

      {/* Peek inside · ask for someone to guide you */}
      <div className={`grid border-t-2 border-brand-ink md:grid-cols-2 ${tint}`}>
        <div className="flex flex-col items-center justify-center gap-3 px-5 py-6 text-center">
          <p className="text-base font-black">想看手册内页长什么样？</p>
          <HandbookPreviewModal />
        </div>

        <div className="flex flex-col items-center justify-center gap-3 border-t-2 border-dashed border-brand-ink/25 px-5 py-6 text-center md:border-l-2 md:border-t-0">
          <p className="text-base font-black">{content.curriculum.lockedLabel}</p>
          <WeChatModal wechatId="Azdev0189" source="handbook">
            <div className={buttonLimeClass}>
              立即咨询 <ArrowUpRight className="h-5 w-5" />
            </div>
          </WeChatModal>
        </div>
      </div>
    </div>
  );
}

export default function HandbookPage() {
  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <Band tone="paper" className="pt-10! md:pt-16!">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-12 lg:gap-16">
          {/* Left: text block */}
          <Reveal className="flex-1 space-y-5 text-center md:space-y-6 md:text-left">
            <Sticker tone="purple" className="-rotate-2">
              {content.hero.eyebrow}
            </Sticker>

            <h1 className="isolate text-[2.6rem] font-black leading-[1.15] tracking-tight md:text-5xl lg:text-7xl">
              <Title text={`[${content.hero.title}]`} />
            </h1>

            <p className="text-xl font-black text-brand-purple md:text-2xl">{content.hero.tagline}</p>

            <p className="mx-auto max-w-lg text-[17px] leading-relaxed text-brand-muted md:mx-0 md:text-lg">
              {content.hero.subtitle}
            </p>
          </Reveal>

          {/* Right: feature card */}
          <Reveal delay={0.1} className="w-full shrink-0 md:w-80">
            <div className={`${cardClass} relative flex flex-col gap-5 p-7 pt-9`}>
              <Sticker tone="yellow" className="absolute -top-4 left-6 -rotate-3">
                手册包含
              </Sticker>
              <ul className="space-y-3">
                {content.hero.badges.map((badge, i) => (
                  <li key={badge}>
                    <Reveal from="left" delay={0.25 + i * 0.08} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-lime">
                        <Check className="h-3.5 w-3.5" strokeWidth={4} />
                      </span>
                      <span className="text-base font-bold">{badge}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline gap-2 border-t-2 border-dashed border-brand-ink/15 pt-5">
                <span className="text-2xl font-black tracking-tight">已售出 100+</span>
                <span className="text-sm font-bold text-brand-muted">份</span>
              </div>
              <WeChatModal wechatId="Azdev0189" source="handbook">
                <div className={`${buttonLimeClass} w-full`}>
                  聊聊适不适合你 <ArrowUpRight className="h-5 w-5" />
                </div>
              </WeChatModal>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* ── 2. HOW IT WORKS ─────────────────────────────────── */}
      <Band tone="purple">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.howItWorks.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i];
            const tile = pillarColorMap[pillar.color] ?? pillarColorMap.violet;
            return (
              <Reveal key={pillar.title} delay={i * 0.07} className="h-full">
                <div className={`${cardClass} group flex h-full flex-col gap-5 p-6 md:p-7`}>
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-brand-ink transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${tile}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black tracking-tight">{pillar.title}</h3>
                    <p className="text-base leading-relaxed text-brand-muted">{pillar.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Band>

      {/* ── 3. CURRICULUM PREVIEW ───────────────────────────── */}
      <Band tone="paper">
        <SectionHeading
          eyebrow={content.curriculum.eyebrow}
          tone="purple"
          title={mark(content.curriculum.title, "内容一览")}
        />

        <div className="mt-10 space-y-8">
          {/* ── Card 1: Fullstack ── */}
          <Reveal>
            <CurriculumCard
              title="全栈开发模块"
              tone="purple"
              categories={content.curriculum.categories}
              fallbackColor="violet"
            >
              <div className="space-y-1 pl-1">
                <p className="text-[15px] italic text-brand-muted">更多模块持续更新中...</p>
                <p className="text-[15px] italic text-brand-muted">· · ·</p>
              </div>
            </CurriculumCard>
          </Reveal>

          {/* ── Card 2: Azure ── */}
          <Reveal>
            <CurriculumCard
              title="Azure 云服务模块"
              tone="blue"
              categories={content.curriculum.azureCategories}
              fallbackColor="blue"
            >
              {/* Azure video badge */}
              <div className="inline-flex -rotate-1 items-center gap-2 rounded-2xl border-2 border-brand-ink bg-brand-yellow px-3.5 py-2 text-[13px] font-black shadow-[0_3px_0_0_var(--color-brand-ink)] sm:px-4 sm:text-sm">
                {content.curriculum.azureNote}
              </div>
            </CurriculumCard>
          </Reveal>
        </div>
      </Band>

      {/* ── 5. FAQ ──────────────────────────────────────────── */}
      <Band tone="yellow">
        <SectionHeading title={`[${content.faq.title}]`} />

        <div className="mt-10 space-y-4">
          {content.faq.items.map((item, i) => (
            <Reveal key={item.question} delay={i * 0.05}>
              <details className={`${cardClass} group/faq overflow-hidden transition-transform duration-200 has-[summary:hover]:-translate-y-1`}>
                <summary className="group/q flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-6 [&::-webkit-details-marker]:hidden">
                  <span className="text-[17px] font-black leading-snug md:text-xl">{item.question}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-ink bg-white transition-all duration-300 group-open/faq:rotate-180 group-open/faq:bg-brand-lime group-hover/q:bg-brand-lime">
                    <ChevronDown className="h-5 w-5" strokeWidth={3} />
                  </span>
                </summary>
                <div className="animate-in fade-in slide-in-from-top-1 border-t-2 border-dashed border-brand-ink/15 px-5 pb-6 pt-4 duration-200 motion-reduce:animate-none md:px-8 md:pb-7 md:pt-5">
                  <p className="text-base leading-relaxed text-brand-muted md:text-[17px]">{item.answer}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ── 5. SOCIAL PROOF ─────────────────────────────────── */}
      <Band tone="paper">
        <SectionHeading
          eyebrow={content.socialProof.eyebrow}
          tone="blue"
          title={mark(content.socialProof.title, "真实学员")}
        />
        <Reveal className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-base font-bold text-brand-muted">小红书累计</span>
          <Sticker tone="yellow">{content.socialProof.count}</Sticker>
        </Reveal>

        <div className="mt-10">
          <TestimonialsCarousel feedbacks={[
            ...homeContent.feedback.feedbacks.filter((f) => (f as { featured?: boolean }).featured),
            ...homeContent.feedback.feedbacks.filter((f) => !(f as { featured?: boolean }).featured),
          ]} />
        </div>
      </Band>

      {/* ── 6. PRICING ────────────────────────────────────── */}
      <Band tone="blue">
        <SectionHeading
          eyebrow={content.pricing.eyebrow}
          tone="lime"
          title={mark(content.pricing.title, "适合你")}
          lead={content.pricing.subtitle}
        />

        <div className="mt-10">
          <PricingTabs tiers={content.pricing.tiers} />
        </div>
      </Band>
    </>
  );
}
