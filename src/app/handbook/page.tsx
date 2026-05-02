import type { Metadata } from "next";
import content from "./content.json";
import homeContent from "../content.json";
import WeChatModal from "@/components/WeChatModal";
import PricingTabs from "@/components/PricingTabs";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import HandbookPreviewModal from "@/components/HandbookPreviewModal";
import {
  Bookmark,
  Code2,
  Bot,
  GitPullRequest,
  ArrowUpRight,
  Lock,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "初学者全栈开发手册 | 马农不卷大厂",
  description:
    "专为零基础人群设计的系统化全栈学习手册，涵盖前端、后端、移动端与 AI 辅助开发，配合 1v1 代码审查。",
};

const colorMap: Record<
  string,
  { text: string; bg: string; border: string; dot: string }
> = {
  rose:   { text: "text-rose-400",   bg: "bg-rose-500/10",   border: "border-rose-500/20",   dot: "bg-rose-400" },
  cyan:   { text: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-500/20",   dot: "bg-cyan-400" },
  orange: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", dot: "bg-orange-400" },
  blue:   { text: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/20",   dot: "bg-blue-400" },
  violet: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", dot: "bg-violet-400" },
  pink:   { text: "text-pink-400",   bg: "bg-pink-500/10",   border: "border-pink-500/20",   dot: "bg-pink-400" },
};

const pillarColorMap: Record<
  string,
  { icon: string; bg: string; border: string }
> = {
  violet:  { icon: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20" },
  blue:    { icon: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20" },
  cyan:    { icon: "text-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/20" },
  emerald: { icon: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
};

const pillarIcons = [Bookmark, Code2, Bot, GitPullRequest];

export default function HandbookPage() {
  return (
    <section className="space-y-20 pb-24">

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <div className="relative pt-4">
        <div className="absolute left-1/4 top-0 h-96 w-96 bg-violet-500/15 blur-[150px] rounded-full pointer-events-none -translate-x-1/2" />

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* Left: text block */}
          <div className="flex-1 space-y-6 text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">
                {content.hero.eyebrow}
              </span>
            </div>

            <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-tight text-white leading-[1.05]">
              {content.hero.title}
            </h1>

            <p className="text-xl md:text-2xl font-bold text-violet-300">
              {content.hero.tagline}
            </p>

            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-lg">
              {content.hero.subtitle}
            </p>
          </div>

          {/* Right: feature card */}
          <div className="w-full md:w-80 shrink-0 rounded-[28px] border border-white/8 bg-white/3 p-8 space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
              手册包含
            </p>
            <ul className="space-y-3">
              {content.hero.badges.map((badge) => (
                <li key={badge} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0" />
                  <span className="text-sm text-white/70">{badge}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-white/8 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">已售出 100+</span>
              <span className="text-sm text-white/40">份</span>
            </div>
            <div className="pt-4 border-t border-white/8">
              <WeChatModal wechatId="Azdev0189" source="handbook">
                <div className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[12px] bg-violet-600 hover:bg-violet-500 text-sm font-bold text-white transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(139,92,246,0.25)]">
                  立即咨询购买 <ArrowUpRight className="h-4 w-4" />
                </div>
              </WeChatModal>
            </div>
          </div>

        </div>
      </div>

      {/* ── 2. HOW IT WORKS ─────────────────────────────────── */}
      <div className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.howItWorks.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i];
            const colors =
              pillarColorMap[pillar.color] ?? pillarColorMap.violet;
            return (
              <div
                key={pillar.title}
                className="group relative flex flex-col gap-6 p-7 rounded-[28px] border border-white/5 bg-white/2 hover:border-white/10 hover:-translate-y-1 transition-all duration-500"
              >
                <div
                  className={`h-12 w-12 rounded-2xl border flex items-center justify-center ${colors.bg} ${colors.border}`}
                >
                  <Icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50">
                    {pillar.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent" />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. CURRICULUM PREVIEW ───────────────────────────── */}
      <div className="space-y-12">
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
            {content.curriculum.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {content.curriculum.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── Card 1: Fullstack ── */}
          <div className="relative overflow-hidden rounded-[28px] border border-violet-500/20 bg-[#0e0e11] flex flex-col group">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-violet-500/10 bg-violet-500/5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-500/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-violet-500/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-violet-500/30" />
              </div>
              <span className="text-[11px] font-bold text-violet-400/70 font-mono mx-auto pr-8 tracking-widest uppercase">
                全栈开发模块
              </span>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 max-h-[680px] overflow-hidden relative">
              {content.curriculum.categories.map((cat) => {
                const colors = colorMap[cat.color] ?? colorMap.violet;
                return (
                  <div key={cat.id} className="space-y-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${colors.text}`}>
                      {cat.label}
                    </span>
                    <ul className="space-y-1.5 pl-2">
                      {cat.modules.map((mod) => (
                        <li key={mod} className="flex items-center gap-2.5 text-sm text-white/45">
                          <span className={`h-1.5 w-1.5 rounded-full shrink-0 opacity-60 ${colors.dot}`} />
                          {mod}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              <div className="pl-2 space-y-1.5 pt-1">
                <p className="text-sm text-white/20 italic">更多模块持续更新中...</p>
                <p className="text-sm text-white/10 italic">· · ·</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#0e0e11] to-transparent pointer-events-none" />
            </div>

            {/* Hover preview overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0e0e11]/85 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <p className="text-sm font-semibold text-white/60">想看手册内页长什么样？</p>
              <HandbookPreviewModal />
            </div>

            <div className="flex flex-col items-center pb-6 pt-3 gap-2.5 bg-[#0e0e11] border-t border-violet-500/10">
              <div className="flex items-center justify-center h-9 w-9 rounded-full border border-white/10 bg-white/5">
                <Lock className="h-3.5 w-3.5 text-white/40" />
              </div>
              <p className="text-sm font-bold text-white/60 text-center px-4">
                {content.curriculum.lockedLabel}
              </p>
              <WeChatModal wechatId="Azdev0189" source="handbook">
                <div className="mt-1 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-sm font-bold text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/50 transition-all duration-300 cursor-pointer">
                  立即咨询 <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </WeChatModal>
            </div>
          </div>

          {/* ── Card 2: Azure ── */}
          <div className="relative overflow-hidden rounded-[28px] border border-blue-500/20 bg-[#0e0e11] flex flex-col group">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-blue-500/10 bg-blue-500/5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500/30" />
              </div>
              <span className="text-[11px] font-bold text-blue-400/70 font-mono mx-auto pr-8 tracking-widest uppercase">
                Azure 云服务模块
              </span>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 max-h-64 overflow-hidden relative">
              {content.curriculum.azureCategories.map((cat) => {
                const colors = colorMap[cat.color] ?? colorMap.blue;
                return (
                  <div key={cat.id} className="space-y-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${colors.text}`}>
                      {cat.label}
                    </span>
                    <ul className="space-y-1.5 pl-2">
                      {cat.modules.map((mod) => (
                        <li key={mod} className="flex items-center gap-2.5 text-sm text-white/45">
                          <span className={`h-1.5 w-1.5 rounded-full shrink-0 opacity-60 ${colors.dot}`} />
                          {mod}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-[#0e0e11] to-transparent pointer-events-none" />

              {/* Azure video badge */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/25 bg-blue-500/10 text-xs font-bold text-blue-300">
                  {content.curriculum.azureNote}
                </div>
              </div>
            </div>

            {/* Hover preview overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0e0e11]/85 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <p className="text-sm font-semibold text-white/60">想看手册内页长什么样？</p>
              <HandbookPreviewModal />
            </div>

            {/* Bottom CTA */}
            <div className="flex flex-col items-center pb-6 pt-3 gap-2.5 bg-[#0e0e11] border-t border-blue-500/10">
              <div className="flex items-center justify-center h-9 w-9 rounded-full border border-white/10 bg-white/5">
                <Lock className="h-3.5 w-3.5 text-white/40" />
              </div>
              <p className="text-sm font-bold text-white/60 text-center px-4">
                {content.curriculum.lockedLabel}
              </p>
              <WeChatModal wechatId="Azdev0189" source="handbook">
                <div className="mt-1 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-bold text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300 cursor-pointer">
                  立即咨询 <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </WeChatModal>
            </div>
          </div>

        </div>
      </div>


      {/* ── 5. FAQ ──────────────────────────────────────────── */}
      <div className="space-y-10 w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {content.faq.title}
          </h2>
        </div>

        <div className="space-y-3">
          {content.faq.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-[20px] border border-white/5 bg-white/2 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-8 py-6 cursor-pointer list-none hover:bg-white/2 transition-colors">
                <span className="font-bold text-white/75 group-open:text-white text-base md:text-lg transition-colors">
                  {item.question}
                </span>
                <ChevronDown className="h-5 w-5 text-white/30 group-open:rotate-180 group-open:text-violet-400 shrink-0 transition-transform duration-300" />
              </summary>
              <div className="px-8 pb-7 border-t border-white/5">
                <p className="text-base leading-relaxed text-white/55 pt-5">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* ── 5. SOCIAL PROOF ─────────────────────────────────── */}
      <div className="space-y-10">
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
            {content.socialProof.eyebrow}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {content.socialProof.title}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">小红书累计</span>
            <span className="text-sm font-bold text-white/80">
              {content.socialProof.count}
            </span>
          </div>
        </div>

        <TestimonialsCarousel feedbacks={[
          ...homeContent.feedback.feedbacks.filter((f) => (f as { featured?: boolean }).featured),
          ...homeContent.feedback.feedbacks.filter((f) => !(f as { featured?: boolean }).featured),
        ]} />
      </div>

      {/* ── 6. PRICING ────────────────────────────────────── */}
      <div className="space-y-12">
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
            {content.pricing.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {content.pricing.title}
          </h2>
          <p className="text-white/50 max-w-xl">{content.pricing.subtitle}</p>
        </div>

        <PricingTabs tiers={content.pricing.tiers} />

      </div>

    </section>
  );
}
