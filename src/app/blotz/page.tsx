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

        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">

          {/* Left: text */}
          <div className="flex-1 space-y-6 text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                  {content.hero.eyebrow}
                </span>
              </div>

            <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-tight text-white leading-[1.1]">
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

            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://blotz-website.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-[10px] border border-emerald-500/25 bg-emerald-500/8 hover:bg-emerald-500/15 hover:border-emerald-500/40 transition-all duration-300"
              >
                <ExternalLink className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span className="text-sm font-bold text-emerald-300">Blotz 官网</span>
              </a>
              <a
                href="https://www.linkedin.com/company/blotz-app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-[10px] border border-blue-500/25 bg-blue-500/8 hover:bg-blue-500/15 hover:border-blue-500/40 transition-all duration-300"
              >
                <Linkedin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <span className="text-sm font-bold text-blue-300">LinkedIn</span>
              </a>
              <a
                href="https://github.com/sol-wizard/Blotz-Task-App"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-[10px] border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all duration-300"
              >
                <ExternalLink className="h-3.5 w-3.5 text-white/50 shrink-0" />
                <span className="text-sm font-bold text-white/65">GitHub</span>
              </a>
              <a
                href="https://www.xiaohongshu.com/user/profile/67bc12d6000000000e01f09a"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-[10px] border border-rose-500/25 bg-rose-500/8 hover:bg-rose-500/15 hover:border-rose-500/40 transition-all duration-300"
              >
                <Image src="/xhs.png" alt="小红书" width={14} height={14} className="opacity-90 shrink-0" />
                <span className="text-sm font-bold text-rose-300">小红书</span>
              </a>
            </div>
          </div>

          {/* Right: stats card */}
          <div className="w-full md:w-80 shrink-0 self-stretch rounded-[28px] border border-white/8 bg-white/3 p-8 flex flex-col justify-between gap-6">

            {/* Hero number */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 mb-3">项目概况</p>
              <div className="text-5xl font-black text-white leading-none tracking-tight">70+</div>
              <div className="text-sm text-white/50 mt-2">学员已参与获得实战经验</div>
            </div>

            {/* Enrollment status */}
            <div className="border-t border-white/8 pt-5 space-y-4">
              {content.enrollment.status === "open" && (
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-xl font-bold text-emerald-300">{content.enrollment.spots} 个名额开放中</span>
                </div>
              )}
              {content.enrollment.status === "limited" && (
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                  </span>
                  <span className="text-xl font-bold text-amber-300">{content.enrollment.spots} 个名额开放中</span>
                </div>
              )}
              {content.enrollment.status === "closed" && (
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-400 shrink-0" />
                    <span className="text-xl font-bold text-red-300">当前已满员</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">微信联系预约下一期</p>
                </div>
              )}
              {content.enrollment.status === "soon" && (
                <WeChatModal wechatId="Azdev0189" source="blotz">
                  <div className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-400 shrink-0" />
                      <span className="text-xl font-bold text-blue-300">{content.enrollment.date} 开放</span>
                    </div>
                    <p className="text-xs text-white/40 mt-1">点击预约通知</p>
                  </div>
                </WeChatModal>
              )}

              <WeChatModal wechatId="Azdev0189" source="blotz">
                <div className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-[16px] bg-emerald-600 hover:bg-emerald-500 text-base font-bold text-white transition-all duration-300 cursor-pointer shadow-[0_6px_30px_rgba(16,185,129,0.35)] hover:shadow-[0_10px_40px_rgba(16,185,129,0.5)] hover:-translate-y-0.5">
                  了解如何加入 <ArrowUpRight className="h-5 w-5" />
                </div>
              </WeChatModal>
            </div>
          </div>

        </div>
      </div>

      {/* ── 2. GROWTH PATH ──────────────────────────────────── */}
      <div className="space-y-12">

        {/* Header — centered */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/30">个人成长</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">6个月，从零基础到具备求职能力</h2>
          <p className="text-white/50 text-lg leading-relaxed">这不是一个普通的练习项目。你会加入一个真实的开发团队，一边学习，一边参与真实任务。在这个过程中，你会慢慢积累项目经验、GitHub 记录和工程协作经验。</p>
          <p className="text-white/25 text-sm">以上时间只是预计，实际进度取决于你的投入程度、学习节奏和参与表现。</p>
        </div>

        {/* Growth steps — centered timeline */}
        <div className="max-w-3xl mx-auto">
          {([
            {
              num: "01", title: "加入团队，先旁听",
              desc: "不需要任何基础。先了解产品目标、团队怎么开会、任务怎么分配、工程师之间如何协作——感受真实软件团队的日常节奏。",
              timeMain: "第 1 天", timeSub: "入门旁听",
              timeMainCls: "text-white/50", timeSubCls: "text-white/25",
              lineCls: "from-white/15 to-white/8",
              circle: "border-white/20 bg-white/[0.03]", numColor: "text-white/40", titleColor: "text-white/70",
              badge: "免费", badgeCls: "bg-white/8 text-white/50 border-white/15", docLink: { text: "查看旁听方案 →", href: "#pricing" },
            },
            {
              num: "02", title: "跟着文档学，边看边做",
              desc: "有一份专为新手设计的系统学习文档，内容清晰、结构完整，学习路径已经帮你规划好了。",
              timeMain: "第 1 个月", timeSub: "第 2–3 周",
              timeMainCls: "text-white/50", timeSubCls: "text-white/25",
              lineCls: "from-white/15 to-white/8",
              circle: "border-white/20 bg-white/[0.03]", numColor: "text-white/40", titleColor: "text-white/70",
              badge: "", badgeCls: "", docLink: { text: "查看学习手册 →", href: "/handbook" },
            },
            {
              num: "03", title: "提交代码，等待审核",
              desc: "完成练习任务后提交代码，Tech Lead 会逐行 review。达到团队标准后，才正式进入下一阶段。",
              timeMain: "第 1 个月", timeSub: "第 4 周",
              timeMainCls: "text-white/50", timeSubCls: "text-white/25",
              lineCls: "from-white/15 to-emerald-500/20",
              circle: "border-white/20 bg-white/[0.03]", numColor: "text-white/40", titleColor: "text-white/70",
              badge: "", badgeCls: "", docLink: null,
            },
            {
              num: "04", title: "进入项目，开始提 PR",
              desc: "领取真实任务，参与产品讨论，提交 Pull Request，代码被 review 后真正合并上线。",
              timeMain: "第 2–3 个月", timeSub: "约 2 个月",
              timeMainCls: "text-emerald-400", timeSubCls: "text-emerald-400/40",
              lineCls: "from-emerald-500/30 to-violet-500/20",
              circle: "border-emerald-500/50 bg-emerald-500/10", numColor: "text-emerald-400", titleColor: "text-emerald-300",
              badge: "开始贡献", badgeCls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25", docLink: null,
            },
            {
              num: "05", title: "晋升 Tech Lead，带新人",
              desc: "对整个项目越来越熟悉之后，开始接更复杂的任务，主导功能模块，带带新人，慢慢承担起 Tech Lead 的角色。",
              timeMain: "第 4–6 个月", timeSub: "约 3 个月",
              timeMainCls: "text-violet-400", timeSubCls: "text-violet-400/40",
              lineCls: "from-violet-500/30 to-amber-500/20",
              circle: "border-violet-500/50 bg-violet-500/10", numColor: "text-violet-400", titleColor: "text-violet-300",
              badge: "Tech Lead", badgeCls: "bg-violet-500/15 text-violet-400 border-violet-500/25", docLink: null,
            },
            {
              num: "06", title: "整理经历，准备求职",
              desc: "真实 PR 记录、上线功能、团队经历都齐了。Tech Lead 会全力支持——分享求职技巧、推荐资源、帮你看简历，一起冲刺。",
              timeMain: "第 6 个月+", timeSub: "求职就绪",
              timeMainCls: "text-amber-400", timeSubCls: "text-amber-400/40",
              lineCls: "from-amber-500/30 to-yellow-500/20",
              circle: "border-amber-500/50 bg-amber-500/10", numColor: "text-amber-400", titleColor: "text-amber-300",
              badge: "冲刺", badgeCls: "bg-amber-500/15 text-amber-400 border-amber-500/25", docLink: null,
            },
            {
              num: "07", title: "拿到全栈工程师工作",
              desc: "凭着真实的项目经历和 GitHub 贡献记录，在澳洲本地找到一份全栈工程师工作。",
              timeMain: "目标达成", timeSub: "全栈工程师",
              timeMainCls: "text-yellow-300", timeSubCls: "text-yellow-400/40",
              lineCls: "",
              circle: "border-yellow-400/70 bg-yellow-500/15 shadow-[0_0_32px_rgba(234,179,8,0.3)]", numColor: "text-yellow-300", titleColor: "text-yellow-100",
              badge: "目标达成", badgeCls: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25", docLink: null,
            },
          ] as Array<{
            num: string; title: string; desc: string;
            timeMain: string; timeSub: string; timeMainCls: string; timeSubCls: string;
            lineCls: string; circle: string; numColor: string; titleColor: string;
            badge: string; badgeCls: string; docLink: { text: string; href: string } | null;
          }>).map((step, i, arr) => (
            <div key={step.num} className="flex items-start">

              {/* Left: time display */}
              <div className="w-36 shrink-0 text-right pr-6 pt-3">
                <p className={`text-lg font-black leading-none tracking-tight ${step.timeMainCls}`}>{step.timeMain}</p>
                <p className={`text-xs mt-1 font-medium ${step.timeSubCls}`}>{step.timeSub}</p>
              </div>

              {/* Center: circle + connecting line */}
              <div className="flex flex-col items-center shrink-0">
                <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 ${step.circle}`}>
                  <span className={`text-sm font-black ${step.numColor}`}>{step.num}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className={`w-0.5 flex-1 min-h-[4rem] bg-gradient-to-b ${step.lineCls}`} />
                )}
              </div>

              {/* Right: content */}
              <div className={`flex-1 pl-6 pt-3 ${i < arr.length - 1 ? "pb-10" : ""}`}>
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <span className={`text-xl font-bold leading-snug ${step.titleColor}`}>{step.title}</span>
                  {step.badge && (
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border ${step.badgeCls}`}>
                      {step.badge}
                    </span>
                  )}
                </div>
                <p className="text-base text-white/45 leading-relaxed">
                  {step.desc}
                  {step.docLink && (
                    <a href={step.docLink.href} className="ml-2 text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors underline underline-offset-2 whitespace-nowrap">
                      {step.docLink.text}
                    </a>
                  )}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Student success */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">学员成长</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">学生成功案例</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Card 1 — anonymous */}
            <div className="relative flex flex-col gap-5 p-8 rounded-[28px] border border-amber-500/20 bg-linear-to-br from-amber-500/6 via-transparent to-transparent overflow-hidden">
              <div className="absolute -bottom-4 -right-2 text-[140px] font-black text-amber-500/5 leading-none select-none pointer-events-none">01</div>

              <span className="inline-flex self-start items-center px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-300">
                零经验 → Tech Lead → 项目联合创始人
              </span>

              <p className="text-lg font-bold text-white leading-snug flex-1">
                完全零基础加入，一步步成长为 Tech Lead，现在已经是项目联合创始人，独立负责团队协调与产品方向。
              </p>

              <div className="h-px bg-amber-500/10" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white/80">匿名学员</p>
                  <p className="text-xs text-white/35 mt-0.5">Blotz 联合创始人 · Tech Lead</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/nicole-nan-501a6831b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Card 2 — anonymous, XHS story coming */}
            <div className="relative flex flex-col gap-5 p-8 rounded-[28px] border border-sky-500/20 bg-linear-to-br from-sky-500/6 via-transparent to-transparent overflow-hidden">
              <div className="absolute -bottom-4 -right-2 text-[140px] font-black text-sky-500/5 leading-none select-none pointer-events-none">02</div>

              <span className="inline-flex self-start items-center px-3 py-1 rounded-full text-[11px] font-bold bg-sky-500/10 border border-sky-500/20 text-sky-300">
                UNSW 在读 → 学 .NET → Tech Lead → 拿到 offer
              </span>

              <p className="text-lg font-bold text-white leading-snug flex-1">
                加入之后 .NET 进步很快，也慢慢搞懂了怎么在团队里配合——开会、沟通、汇报都练到了。简历加上真实项目经验之后，得到了好几个面试，最后拿到了 offer。
              </p>

              <div className="h-px bg-sky-500/10" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white/80">匿名学员</p>
                </div>
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-rose-500/25 bg-rose-500/10">
                  <Image src="/xhs.png" alt="小红书" width={14} height={14} />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ── 3. TECH STACK MARQUEE ──────────────────────────── */}
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

      {/* ── 4. PILLARS ──────────────────────────────────────── */}
      <div className="space-y-8">
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">项目运作</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">开发流程，协作方式</h2>
          <p className="text-white/50">Blotz 按照工业标准的 Scrum 流程运作。加入后你将直接与真实软件工程师并肩工作，参与每周 Sprint 规划、代码审查、产品讨论——和正式在职的工程师没有区别。</p>
        </div>

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
            <span className="text-sm font-bold text-white/80">56+ 条真实评价</span>
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
      <div id="pricing" className="space-y-8">
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

                <WeChatModal wechatId="Azdev0189" source="blotz">
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
