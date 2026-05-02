import Image from "next/image";
import {
  Code2,
  Database,
  GraduationCap,
  Users,
  BrainCircuit,
  RefreshCcw,
  Infinity as DevOpsIcon,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import content from "./content.json";
import { Timeline } from "@/components/Timeline";

export default function IntroductionPage() {
  const techLogos = [
    { name: "Azure", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg", color: "from-blue-500/40", url: "https://learn.microsoft.com/azure" },
    { name: ".NET", logo: "https://cdn.simpleicons.org/dotnet/white", color: "from-purple-600/40", url: "https://learn.microsoft.com/dotnet" },
    { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/white", color: "from-white/20", url: "https://nextjs.org/docs" },
    { name: "React", logo: "https://cdn.simpleicons.org/react/white", color: "from-cyan-500/40", url: "https://react.dev" },
    { name: "Database", icon: Database, color: "from-blue-400/40", url: "https://www.microsoft.com/sql-server" },
    { name: "Scrum", icon: RefreshCcw, color: "from-orange-400/40", url: "https://www.scrumalliance.org/about-scrum" },
    { name: "GitHub", logo: "https://cdn.simpleicons.org/github/white", color: "from-white/20", url: "https://docs.github.com" },
    { name: "DevOps", icon: DevOpsIcon, color: "from-blue-600/40", url: "https://learn.microsoft.com/azure/devops" },
    { name: "AI", icon: BrainCircuit, color: "from-emerald-500/40", url: "https://learn.microsoft.com/azure/ai-services/openai/" },
  ];

  return (
    <section className="space-y-24 pb-12">

      {/* Profile Section */}
      <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-16 px-4">
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-[40px] bg-blue-500/10 blur-3xl opacity-50 animate-pulse" />
          <Image
            src="/profile-photo.webp"
            alt="头像"
            width={180}
            height={180}
            className="relative h-36 w-36 md:h-48 md:w-48 rounded-[32px] border border-white/10 object-cover shadow-2xl transition-all duration-500 hover:scale-105"
          />
        </div>

        <div className="flex flex-col items-center space-y-6 text-center md:items-start md:text-left flex-1 relative z-10">
          <div className="space-y-4">

            <a
              href="https://www.xiaohongshu.com/user/profile/615c36cd0000000002023df7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group/name inline-block"
            >
              <h1 className="text-[clamp(2rem,7vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.04em] text-white transition-colors group-hover/name:text-white/90">
                {content.profile.title}
                <span className="inline-block ml-4 opacity-0 group-hover/name:opacity-100 transition-all transform translate-x-[-10px] group-hover/name:translate-x-0 text-sm font-medium text-white/40 tracking-wider">
                  VIEW ON XHS →
                </span>
              </h1>
            </a>
            <p className="max-w-2xl text-lg leading-relaxed md:text-xl font-medium">
              {(() => {
                const [first, ...rest] = content.profile.summary.split("。").filter(Boolean);
                return (
                  <>
                    <span className="text-white/80">{first}。</span>
                    <span className="text-white/45">{rest.join("。")}。{" "}</span>
                    <Link
                      href="/blotz"
                      className="group inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                    >
                      <span className="underline underline-offset-4 decoration-emerald-400/40 group-hover:decoration-emerald-300/60 transition-colors">企业级项目经验</span>
                      <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
                    </Link>
                  </>
                );
              })()}
            </p>

          </div>
        </div>
      </div>

      <div className="space-y-24">
        {/* Stats Section */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 px-2">
          {content.feedback.stats.map((item) => {
            const Container = item.link ? 'a' : 'div';
            return (
              <Container
                key={item.label}
                {...(item.link ? {
                  href: item.link,
                  ...(item.link.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {}),
                  className: "group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 p-8 text-center transition-all duration-500 hover:bg-white/[0.08] hover:border-white/30 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:-translate-y-2 cursor-pointer"
                } : {
                  className: "group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 p-8 text-center transition-all duration-500 hover:bg-white/[0.08] hover:border-white/30 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:-translate-y-2"
                })}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-linear-to-r ${item.gradient} opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div
                  className={`text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r ${item.gradient} tracking-tighter transition-all duration-500 group-hover:scale-110`}
                >
                  {item.value}
                </div>
                <p className="mt-3 text-sm font-bold uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors duration-500">
                  {item.label}
                  {item.link && <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>}
                </p>
              </Container>
            );
          })}
        </div>

        {/* Technical Expertise - Refined Heading */}
        <div className="space-y-12 px-2 relative">
          <div className="absolute top-0 right-0 h-64 w-64 bg-cyan-500/3 blur-[100px] rounded-full pointer-events-none" />
          <div className="space-y-4 px-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-white/20" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Expertise</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              技术专长
            </h2>
            <div className="max-w-3xl border-l border-white/10 pl-6 mt-6">
              <p className="text-base md:text-lg leading-relaxed text-white/40 font-medium">
                深耕微软生态与全栈开发，专注于高性能、可扩展的现代化系统架构。
              </p>
            </div>
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
                          className={`relative z-10 h-10 w-10 md:h-12 md:w-12 object-contain transition-all duration-500 ${tech.logo.includes('microsoftazure') ? 'brightness-0 invert scale-95' : ''} grayscale-[0.05] opacity-100 group-hover:grayscale-0 group-hover:opacity-100`} 
                        />
                      ) : Icon && (
                        <Icon 
                          size={32}
                          className="relative z-10 text-white/90 group-hover:text-white transition-all duration-500" 
                        />
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

        {/* Teaching Method - Refined Heading */}
        <div className="space-y-12 px-2 relative">
          <div className="absolute top-1/2 left-0 h-80 w-80 bg-emerald-500/3 blur-[100px] rounded-full pointer-events-none" />
          <div className="space-y-4 px-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-white/20" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Approach</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              教学方式
            </h2>
            <div className="max-w-3xl border-l border-white/10 pl-6 mt-6">
              <p className="text-base md:text-lg leading-relaxed text-white/40 font-medium">
                {content.goal.description}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {content.goal.pillars.map((item, index) => {
              const icons = [Users, Rocket, GraduationCap, Code2];
              const Icon = icons[index % icons.length] || Users;
              const color = item.color ?? "text-white";

              const cardContent = (
                <div
                  key={item.label}
                  className="group relative flex gap-8 p-8 rounded-3xl border border-white/5 bg-white/2 transition-all duration-500 hover:bg-white/6 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(255,255,255,0.03)] hover:-translate-y-2 overflow-hidden"
                >
                  <div className={`absolute -right-16 -top-16 h-48 w-48 bg-linear-to-br ${color.replace('text-', 'from-')}/10 to-transparent blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-black/40 border border-white/5 group-hover:border-white/30 group-hover:bg-black/60 transition-all duration-500 shadow-xl">
                    <Icon className={`h-8 w-8 ${color} opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`} strokeWidth={1.5} />
                  </div>
                  <div className="relative z-10 space-y-3">
                    <p className="text-xl font-bold text-white/90 tracking-tight group-hover:text-white transition-colors duration-500">
                      {item.label}
                    </p>
                    <p className="text-base leading-relaxed text-white/40 group-hover:text-white/70 transition-colors duration-500">
                      {item.note}
                    </p>
                  </div>
                </div>
              );

              const href = index === 2 ? "/handbook" : index === 3 ? "/blotz" : "/courses";
              return (
                <Link key={item.label} href={href}>
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>

        {/* About Me / Journey Section - Clean Architectural Heading */}
        <div id="journey" className="space-y-16 px-2 relative scroll-mt-32">
          {/* Section Ambient Glows */}
          <div className="absolute top-1/4 -left-20 h-96 w-96 bg-blue-500/3 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 h-96 w-96 bg-purple-500/3 blur-[120px] rounded-full pointer-events-none" />

          <div className="space-y-4 px-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-white/20" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">{content.journey.eyebrow}</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              {content.journey.title}
            </h2>
          </div>

          <div className="relative z-10">
            <Timeline items={content.journey.items} />
          </div>
        </div>
      </div>
    </section>
  );
}
