import content from "./content.json";
import homeContent from "../content.json";
import { CheckCircle2, MessageSquare, GraduationCap, Users2, Rocket, ArrowUpRight } from "lucide-react";
import WeChatModal from "@/components/WeChatModal";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import XhsModal from "@/components/XhsModal";


interface Service {
  title: string;
  tag: string;
  isHot?: boolean;
  description: string;
  helpPoints: string[];
  suitableFor?: string[];
}

export default function ServicesPage() {
  const icons = [MessageSquare, GraduationCap, Users2, Rocket];
  const freeConsultation = content.services[0] as Service;
  const paidServices = content.services.slice(1) as Service[];

  return (
    <section className="space-y-12 pb-24">
      {/* Hero Section - More Compact */}
      <div className="relative pt-12 text-center max-w-2xl mx-auto space-y-4">
        <div className="absolute left-1/2 -top-10 -translate-x-1/2 h-48 w-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          {content.hero.title}
        </h1>
        <p className="text-base md:text-lg text-white/60 font-medium">
          {content.hero.subtitle}
        </p>
      </div>

      {/* Free Consultation Bar - Redesigned for clarity & trust */}
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        <WeChatModal wechatId="Azdev0189">
          <div className="group relative flex flex-col md:flex-row items-stretch gap-0 overflow-hidden rounded-[32px] border border-emerald-500/20 bg-emerald-500/2 transition-all duration-500 hover:bg-emerald-500/4 hover:border-emerald-500/40 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          {/* Content Side */}
          <div className="flex-1 p-8 md:p-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <MessageSquare className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {freeConsultation.title}
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-[10px] font-black text-black uppercase">
                  FREE
                </span>
              </div>
            </div>
            
            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl">
              {freeConsultation.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {freeConsultation.helpPoints.map((point: string) => (
                <div key={point} className="flex items-center gap-3 text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500/60 group-hover:text-emerald-500 transition-colors shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Side */}
          <div className="md:w-72 bg-emerald-500/5 border-t md:border-t-0 md:border-l border-white/5 flex flex-col items-center justify-center p-8 md:p-10 group-hover:bg-emerald-500/10 transition-colors">
            <div className="text-center space-y-4">
              <p className="text-[11px] font-bold text-emerald-400/80 uppercase tracking-[0.2em]">
                Limited Availability
              </p>
              <div className="inline-flex items-center gap-2 text-white font-bold group-hover:text-emerald-400 transition-colors">
                立即咨询 <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>
        </div>
        </WeChatModal>
      </div>

      {/* Other Paid Services Grid - 3-column */}
      <div className="grid gap-6 md:grid-cols-3">
        {paidServices.map((service, index) => {
          const Icon = icons[index + 1];
          const isHot = service.isHot;

          const cardClassName = `group relative flex flex-col overflow-hidden rounded-[40px] border transition-all duration-700 p-8 md:p-10 hover:-translate-y-2
            ${isHot
              ? "bg-linear-to-b from-orange-500/10 to-transparent border-orange-500/40 hover:border-orange-500/60 shadow-[0_0_80px_rgba(249,115,22,0.1)] ring-1 ring-orange-500/20"
              : "bg-white/2 border-white/5 hover:bg-white/4 hover:border-white/20"
            }`;

          const CardContent = (
            <>
              {/* Special effects for Hot Card */}
              {isHot && (
                <>
                  <div className="absolute -right-20 -top-20 h-64 w-64 bg-orange-500/15 blur-[100px] pointer-events-none group-hover:bg-orange-500/25 transition-colors duration-700" />
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-orange-400 to-transparent opacity-50" />
                </>
              )}

              {/* Hot Pick Badge */}
              {isHot && (
                <div className="absolute right-6 top-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-linear-to-r from-orange-500 to-rose-600 shadow-[0_4px_16px_rgba(249,115,22,0.4)]">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white">TOP PICK</span>
                </div>
              )}

              <div className="space-y-10 flex-1 relative z-10">
                <div className="flex items-start justify-between">
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
                    ${isHot
                      ? "bg-linear-to-br from-orange-400 to-rose-500 border-orange-400/40 text-white shadow-[0_0_25px_rgba(249,115,22,0.4)]"
                      : "bg-white/5 border-white/10 text-white/60"}
                  `}>
                    <Icon className="h-7 w-7" />
                  </div>

                  {!isHot && (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border bg-white/5 border-white/10 text-white/60">
                      {service.tag}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-white/60 group-hover:text-white/80 transition-colors">
                    {service.description}
                  </p>
                  {service.suitableFor && service.suitableFor.length > 0 && (
                    <div className="pt-3 space-y-2">
                      <p className={`text-xs font-bold uppercase tracking-widest ${isHot ? 'text-orange-400/70' : 'text-white/30'}`}>
                        适合人群
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.suitableFor.map((item: string) => (
                          <span
                            key={item}
                            className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg ${
                              isHot
                                ? 'bg-orange-500/15 text-orange-200'
                                : 'bg-white/8 text-white/70'
                            }`}
                          >
                            <Users2 className="h-3.5 w-3.5 shrink-0" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <ul className="space-y-3">
                    {service.helpPoints.map((point: string) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-white/50 group-hover:text-white/70 transition-colors">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 transition-colors
                          ${isHot
                            ? "text-orange-400 group-hover:text-orange-300"
                            : "text-white/30 group-hover:text-white/50"}
                        `} />
                        <span className={isHot ? "group-hover:text-white/80" : ""}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <div className={`flex items-center justify-center gap-2 w-full py-4 rounded-[20px] text-[11px] font-black uppercase tracking-widest transition-all duration-500
                  ${isHot
                    ? "bg-linear-to-r from-orange-500 to-rose-600 text-white shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.5)] group-hover:scale-[1.02]"
                    : "bg-white/5 text-white/60 group-hover:bg-white group-hover:text-black"
                  }
                `}>
                  {isHot ? "查看项目" : "联系咨询"} <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </>
          );

          // Hot card links to Blotz website, others open WeChat modal
          if (isHot) {
            return (
              <a
                key={service.title}
                href="https://blotz-website.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={cardClassName}
              >
                {CardContent}
              </a>
            );
          }

          return (
            <WeChatModal key={service.title} wechatId="Azdev0189">
              <div className={cardClassName}>
                {CardContent}
              </div>
            </WeChatModal>
          );
        })}
      </div>

      {/* Testimonials - Scrolling Reviews */}
      <div id="feedback" className="space-y-10 scroll-mt-32">
        <div className="text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
            {homeContent.feedback.hero.eyebrow}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {homeContent.feedback.hero.title}
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm text-white/50">小红书累计</span>
            <span className="text-sm font-bold text-white/80">48+ 条真实评价</span>
          </div>
        </div>

        <TestimonialsCarousel feedbacks={homeContent.feedback.feedbacks} />

        {/* CTA to XHS Profile */}
        <div className="flex justify-center">
          <XhsModal profileUrl="https://www.xiaohongshu.com/user/profile/615c36cd0000000002023df7">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-rose-500/20 bg-rose-500/5 text-sm font-bold text-white/70 hover:bg-rose-500/10 hover:text-white hover:border-rose-500/40 transition-all duration-300">
              查看更多小红书评价 <ArrowUpRight className="h-4 w-4" />
            </div>
          </XhsModal>
        </div>
      </div>
    </section>
  );
}
