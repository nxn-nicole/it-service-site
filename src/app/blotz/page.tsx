import type { Metadata } from "next";
import Image from "next/image";
import content from "./content.json";
import homeContent from "../content.json";
import WeChatModal from "@/components/WeChatModal";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import XhsModal from "@/components/XhsModal";
import {
  Code2,
  GitPullRequest,
  Users2,
  Cloud,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Database,
  ExternalLink,
  BrainCircuit,
  Wifi,
  TrendingUp,
  UserRound,
  Linkedin,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "参与 Blotz 工业实战项目 | 马农不卷大厂",
  description:
    "加入 Blotz 团队，参与一个拥有 2000+ 用户的生产级全栈项目，积累可验证的真实工程经验，打造你的技术作品集。",
};

const techLogos = [
  { name: "Next.js",        logo: "https://cdn.simpleicons.org/nextdotjs/white",    color: "from-white/20",       url: "https://nextjs.org/docs",                                         invert: false },
  { name: "React Native",   logo: "https://cdn.simpleicons.org/react/white",        color: "from-cyan-500/40",    url: "https://reactnative.dev",                                         invert: false },
  { name: ".NET",           logo: "https://cdn.simpleicons.org/dotnet/white",        color: "from-purple-600/40",  url: "https://learn.microsoft.com/dotnet",                              invert: false },
  { name: "Azure",          logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg", color: "from-blue-500/40", url: "https://learn.microsoft.com/azure", invert: true },
  { name: "OpenAI",         icon: BrainCircuit,                                     color: "from-emerald-500/40", url: "https://platform.openai.com/docs",                               invert: false },
  { name: "Auth0",          logo: "https://cdn.simpleicons.org/auth0/white",         color: "from-orange-400/40",  url: "https://auth0.com/docs",                                         invert: false },
  { name: "GitHub Actions", logo: "https://cdn.simpleicons.org/github/white",       color: "from-white/20",       url: "https://docs.github.com/actions",                                invert: false },
  { name: "SQL Server",     icon: Database,                                          color: "from-blue-400/40",    url: "https://learn.microsoft.com/sql/sql-server",                     invert: false },
  { name: "WebSocket",      icon: Wifi,                                              color: "from-purple-500/40",  url: "https://developer.mozilla.org/docs/Web/API/WebSockets_API",      invert: false },
  { name: "Expo",           logo: "https://cdn.simpleicons.org/expo/white",          color: "from-white/20",       url: "https://docs.expo.dev",                                          invert: false },
  { name: "Bicep",          icon: Cloud,                                             color: "from-cyan-500/40",    url: "https://learn.microsoft.com/azure/azure-resource-manager/bicep", invert: false },
];

const pillarIcons = [Code2, GitPullRequest, Users2, Cloud, MessageSquare];
const pillarColors = [
  { icon: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { icon: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20" },
  { icon: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20" },
  { icon: "text-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/20" },
  { icon: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20" },
];

const eventBadgeColors: Record<string, string> = {
  线上: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  悉尼: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  职业: "bg-orange-500/15 text-orange-300 border-orange-500/25",
  产品: "bg-blue-500/15 text-blue-300 border-blue-500/25",
};

const featuredTestimonials = [
  ...homeContent.feedback.feedbacks.filter((f) => (f as { featured?: boolean }).featured),
  ...homeContent.feedback.feedbacks.filter((f) => !(f as { featured?: boolean }).featured),
];

export default function BlotzPage() {
  return (
    <section className="space-y-20 pb-24">

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <div className="relative pt-4">
        <div className="absolute left-1/4 top-0 h-96 w-96 bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none -translate-x-1/2" />

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* Left: text */}
          <div className="flex-1 space-y-6 text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                {content.hero.eyebrow}
              </span>
            </div>

            <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-tight text-white leading-[1.05]">
              {content.hero.title}
            </h1>

            <p className="text-xl md:text-2xl font-bold text-emerald-300">
              {content.hero.tagline}
            </p>

            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-lg">
              {content.hero.subtitle}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-emerald-400">真实产品，持续迭代中</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://blotz-website.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] border border-emerald-500/25 bg-emerald-500/8 text-sm font-bold text-emerald-300 hover:bg-emerald-500/15 hover:border-emerald-500/40 transition-all duration-300"
              >
                <ExternalLink className="h-4 w-4" />
                Blotz 官网
              </a>
              <a
                href="https://www.linkedin.com/company/blotz-app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] border border-blue-500/25 bg-blue-500/8 text-sm font-bold text-blue-300 hover:bg-blue-500/15 hover:border-blue-500/40 transition-all duration-300"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/sol-wizard/Blotz-Task-App"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] border border-white/8 bg-white/3 text-sm font-bold text-white/60 hover:bg-white/6 hover:border-white/15 hover:text-white/80 transition-all duration-300"
              >
                <ExternalLink className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://www.xiaohongshu.com/user/profile/67bc12d6000000000e01f09a"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] border border-rose-500/25 bg-rose-500/8 text-sm font-bold text-rose-300 hover:bg-rose-500/15 hover:border-rose-500/40 transition-all duration-300"
              >
                <Image src="/xhs.png" alt="小红书" width={16} height={16} className="opacity-90" />
                小红书
              </a>
            </div>
          </div>

          {/* Right: stats card */}
          <div className="w-full md:w-80 shrink-0 rounded-[28px] border border-white/8 bg-white/3 p-8 space-y-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
              项目概况
            </p>
            <ul className="space-y-4">
              {content.hero.stats.map((stat) => (
                <li key={stat.label} className="flex items-center gap-4">
                  <div className="text-left">
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/40">{stat.label}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-white/8">
              <WeChatModal wechatId="Azdev0189">
                <div className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[12px] bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-white transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(16,185,129,0.25)]">
                  了解如何加入 <ArrowUpRight className="h-4 w-4" />
                </div>
              </WeChatModal>
            </div>
          </div>

        </div>
      </div>

      {/* ── 1b. TECH STACK MARQUEE ──────────────────────────── */}
      <div className="space-y-8">
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">技术栈</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">项目用到的技术</h2>
        </div>

        <div className="relative flex overflow-x-hidden group/marquee rounded-3xl border border-white/5 bg-white/1 py-8 mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex animate-marquee whitespace-nowrap py-6">
            {[...techLogos, ...techLogos].map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <a
                  key={`${tech.name}-${idx}`}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mx-10 flex flex-col items-center gap-4 transition-all duration-500 hover:scale-110"
                >
                  <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-2xl border border-white/10 bg-white/4 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:border-white/40 group-hover:bg-white/10 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden">
                    <div className={`absolute inset-0 bg-linear-to-br ${tech.color} to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    {tech.logo ? (
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className={`relative z-10 h-10 w-10 md:h-12 md:w-12 object-contain transition-all duration-500 ${tech.invert ? "brightness-0 invert scale-95" : ""} opacity-100`}
                      />
                    ) : Icon && (
                      <Icon size={32} className="relative z-10 text-white/90 group-hover:text-white transition-all duration-500" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors duration-500">
                    {tech.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 2. PILLARS ──────────────────────────────────────── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {content.pillars.map((pillar, i) => {
          const Icon = pillarIcons[i];
          const colors = pillarColors[i];
          return (
            <div
              key={pillar.title}
              className="group relative flex flex-col gap-6 p-7 rounded-[28px] border border-white/5 bg-white/2 hover:border-white/10 hover:-translate-y-1 transition-all duration-500"
            >
              <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center ${colors.bg} ${colors.border}`}>
                <Icon className={`h-6 w-6 ${colors.icon}`} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{pillar.desc}</p>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent" />
            </div>
          );
        })}
      </div>

      {/* ── 3. GROWTH PATH ──────────────────────────────────── */}
      <div className="space-y-10">

        {/* Header */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">个人成长</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">不只学技术，学如何在团队中成长</h2>
          <p className="text-white/50 max-w-2xl">这不只是一个实战项目——它是一条真实的职业成长路径。从旁观者到 Tech Lead，优秀的成员甚至可以成为项目合伙人，免参与费、参与产品决策、培养领导力。</p>
        </div>

        {/* Growth steps — improved hover */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            {
              step: "01", title: "零基础入门",
              desc: "旁听会议，了解真实团队节奏，无需任何经验",
              color: "text-white/70", glow: "group-hover:shadow-[0_0_40px_rgba(255,255,255,0.04)]",
              border: "border-white/8 group-hover:border-white/20", dot: "bg-white/30",
            },
            {
              step: "02", title: "开发贡献者",
              desc: "领取真实任务，提交 PR，积累可验证的工程经验",
              color: "text-emerald-400", glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.12)]",
              border: "border-white/8 group-hover:border-emerald-500/40", dot: "bg-emerald-400",
            },
            {
              step: "03", title: "Tech Lead",
              desc: "主导功能模块，带领新成员，锻炼技术领导力",
              color: "text-violet-400", glow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]",
              border: "border-white/8 group-hover:border-violet-500/40", dot: "bg-violet-400",
            },
            {
              step: "04", title: "项目合伙人",
              desc: "免参与费，参与产品决策与项目管理，共同推动 Blotz 成长",
              color: "text-amber-400", glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]",
              border: "border-white/8 group-hover:border-amber-500/40", dot: "bg-amber-400",
            },
          ].map((item, i) => (
            <div key={item.step} className={`group relative flex flex-col gap-4 p-6 rounded-[24px] border bg-white/2 hover:bg-white/4 hover:-translate-y-1 transition-all duration-400 ${item.border} ${item.glow}`}>
              {i < 3 && (
                <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowUpRight className="h-4 w-4 text-white/15 group-hover:text-white/30 transition-colors duration-300" />
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
                <span className="text-[10px] font-black tracking-[0.3em] text-white/25">{item.step}</span>
              </div>
              <h3 className={`text-lg font-bold transition-colors duration-300 ${item.color}`}>{item.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed group-hover:text-white/60 transition-colors duration-300">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Student success — social proof + Nicole */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/6" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/25">真实学员成长</span>
            <div className="h-px flex-1 bg-white/6" />
          </div>

          <p className="text-sm text-white/45 text-center">
            我们有学员从<span className="text-white/70 font-semibold">零编程经验</span>加入，逐步成长为 <span className="text-white/70 font-semibold">Tech Lead</span>，最终成为<span className="text-white/70 font-semibold">项目负责人之一</span>
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-6 p-7 rounded-[28px] border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/8 hover:border-amber-500/30 transition-all duration-300">
            <div className="shrink-0 flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-500/15 border border-amber-500/25">
              <UserRound className="h-6 w-6 text-amber-400" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400/70">学员案例</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 border border-amber-500/25 text-amber-300">零经验 → Tech Lead → 项目负责人</span>
              </div>
              <h3 className="text-lg font-bold text-white">零编程经验入门，成长为 Tech Lead，晋升项目负责人之一</h3>
              <p className="text-sm text-white/55 leading-relaxed">完全没有编程基础加入 Blotz，通过真实项目的持续贡献，一步步成长为 Tech Lead，最终成为项目联合创始人，现已独立负责团队协调与产品方向。</p>
              <a
                href="https://www.linkedin.com/in/nicole-nan-501a6831b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 text-sm font-bold text-amber-300 hover:text-amber-200 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                查看 LinkedIn →
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ── 4. COMMUNITY EVENTS ─────────────────────────────── */}
      <div className="space-y-8">
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">项目运作</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">开发流程，协作方式</h2>
          <p className="text-white/50">Blotz 按照工业标准的 Scrum 流程运作。加入后你将直接与真实软件工程师并肩工作，参与每周 Sprint 规划、代码审查、产品讨论——和正式在职的工程师没有区别。</p>
        </div>

        {/* "Work with real engineers" highlight */}
        <div className="flex items-center gap-4 px-6 py-4 rounded-[18px] border border-emerald-500/20 bg-emerald-500/5">
          <Users2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <p className="text-sm font-semibold text-white/70">
            直接与<span className="text-emerald-300 font-bold"> 真实软件工程师 </span>并肩工作
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {content.events.map((event) => (
            <div
              key={event.title}
              className="flex flex-col gap-3 p-6 rounded-[24px] border border-white/5 bg-white/2 hover:border-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold text-white">{event.title}</h3>
                <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${eventBadgeColors[event.badge] ?? "bg-white/5 text-white/40 border-white/10"}`}>
                  {event.badge}
                </span>
              </div>
              <p className="text-xs font-semibold text-white/35 uppercase tracking-wider">{event.cadence}</p>
              <p className="text-sm text-white/50 leading-relaxed">{event.detail}</p>
            </div>
          ))}
        </div>
      </div>


      {/* ── 5b. XHS PROJECT SERIES ──────────────────────────── */}
      <div className="space-y-8">
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">项目记录</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">了解更多项目历史和详情</h2>
          <p className="text-white/50">项目的每一步都记录在小红书上——从组建团队、分配职责，到踩坑复盘、功能上线</p>
        </div>

        {/* Green series callout */}
        <div className="flex items-start gap-5 p-6 rounded-[22px] border border-emerald-500/20 bg-emerald-500/5">
          <div className="shrink-0 h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
            <Image src="/xhs.png" alt="小红书" width={20} height={20} />
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-bold text-white/90">
              在小红书搜寻「<span className="text-emerald-300">项目</span>」系列笔记
            </p>
            <p className="text-sm text-white/45">
              进入主页后，找到<span className="text-emerald-400 font-semibold">绿色封面主题</span>的「项目」系列——那里记录着 Blotz 从第一天至今的每一个里程碑：组队、版本发布、架构演进、踩坑复盘，一篇不落。
            </p>
          </div>
        </div>

        <XhsModal
          profileUrl="https://www.xiaohongshu.com/user/profile/615c36cd0000000002023df7"
          title="查看 Blotz 项目历史"
          subtitle="在主页找到绿色主题的「项目」系列笔记"
          steps={[
            { heading: "打开小红书主页", detail: "点击下方按钮进入「马农不卷大厂」主页" },
            { heading: "找到「项目」系列", detail: "在主页中找到绿色封面主题的「项目」系列笔记" },
            { heading: "追踪完整项目历程", detail: "从第一天到今天，Blotz 每一个里程碑都在这里" },
          ]}
          ctaText="前往小红书查看项目系列"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-rose-500/20 bg-rose-500/5 text-sm font-bold text-white/70 hover:bg-rose-500/10 hover:text-white hover:border-rose-500/40 transition-all duration-300 cursor-pointer">
            查看小红书项目记录系列 <ArrowUpRight className="h-4 w-4" />
          </div>
        </XhsModal>
      </div>

      {/* ── 6. FAQ ──────────────────────────────────────────── */}
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          {content.faq.title}
        </h2>

        <div className="space-y-2">
          {content.faq.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-[18px] border border-white/6 bg-white/2 hover:border-white/10 transition-colors duration-200 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none">
                <span className="text-base font-semibold text-white/85">{item.question}</span>
                <ChevronDown className="h-4 w-4 text-white/30 shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-5">
                <p className="text-sm leading-relaxed text-white/50">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* ── 7. SOCIAL PROOF ─────────────────────────────────── */}
      <div className="space-y-8">
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">学员评价</span>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {homeContent.feedback.hero.title}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">小红书累计</span>
            <span className="text-sm font-bold text-white/80">54+ 条真实评价</span>
          </div>
        </div>

        <TestimonialsCarousel feedbacks={featuredTestimonials} />

        <div className="flex justify-start">
          <XhsModal profileUrl="https://www.xiaohongshu.com/user/profile/615c36cd0000000002023df7">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-rose-500/20 bg-rose-500/5 text-sm font-bold text-white/70 hover:bg-rose-500/10 hover:text-white hover:border-rose-500/40 transition-all duration-300">
              查看更多小红书评价 <ArrowUpRight className="h-4 w-4" />
            </div>
          </XhsModal>
        </div>
      </div>

      {/* ── 8. PRICING ──────────────────────────────────────── */}
      <div className="space-y-8">
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
            {content.pricing.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {content.pricing.title}
          </h2>
          <p className="text-white/50 max-w-xl">{content.pricing.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl">
          {content.pricing.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-[32px] border transition-all duration-300 overflow-hidden ${
                tier.highlight
                  ? "border-emerald-500/40 bg-emerald-500/8 shadow-[0_0_60px_rgba(16,185,129,0.12)]"
                  : "border-white/8 bg-white/2"
              }`}
            >
              {tier.highlight && "badge" in tier && (
                <div className="w-full py-1.5 bg-linear-to-r from-emerald-600/80 to-teal-600/80 text-center text-[11px] font-black tracking-[0.15em] text-white/90 uppercase">
                  {(tier as { badge: string }).badge}
                </div>
              )}

              <div className={`flex flex-col gap-8 flex-1 ${tier.highlight && "badge" in tier ? "px-8 pb-8 pt-6" : "p-8"}`}>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className={`text-2xl font-bold ${tier.highlight ? "text-white" : "text-white/80"}`}>
                    {tier.name}
                  </h3>
                  {"tag" in tier && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide ${
                      tier.highlight
                        ? "bg-emerald-500/25 border border-emerald-500/40 text-emerald-300"
                        : "bg-white/6 border border-white/12 text-white/45"
                    }`}>
                      {(tier as { tag: string }).tag}
                    </span>
                  )}
                </div>

                <ul className="flex-1 space-y-3">
                  {tier.features.map((feature, fi) => {
                    const isCourseFeature = (tier as { courseFeature?: boolean }).courseFeature && fi === tier.features.length - 1;
                    return (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${isCourseFeature ? "text-amber-400" : tier.highlight ? "text-emerald-400" : "text-white/30"}`} />
                        {isCourseFeature ? (
                          <a href="/handbook" className="font-bold text-amber-300 hover:text-amber-200 underline underline-offset-2 transition-colors">
                            {feature} →
                          </a>
                        ) : (
                          <span className="text-white/60">{feature}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <WeChatModal wechatId="Azdev0189">
                  <div
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[14px] font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer ${
                      tier.highlight
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_6px_24px_rgba(16,185,129,0.3)] hover:shadow-[0_10px_32px_rgba(16,185,129,0.45)]"
                        : "border border-white/10 bg-white/5 hover:bg-white/8 text-white/70 hover:text-white"
                    }`}
                  >
                    {tier.cta} <ArrowUpRight className="h-4 w-4" />
                  </div>
                </WeChatModal>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
