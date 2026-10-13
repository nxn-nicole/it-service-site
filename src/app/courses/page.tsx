import content from "./content.json";
import homeContent from "../content.json";
import { MessageSquare, GraduationCap, Users2, Rocket, ArrowUpRight, HeartHandshake, Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WeChatModal from "@/components/WeChatModal";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import XhsModal from "@/components/XhsModal";
import { Band, Clauses, CountUp, Reveal, SectionHeading, Sticker, Title } from "@/components/kit";
import type { Tone } from "@/components/kit";
import { buttonCoralClass, buttonGhostClass, buttonLimeClass, cardClass, cardFrameClass, liftClass } from "@/components/styles";
import { PopIcon, TickList, Wobble } from "./ServiceBits";
import PassItOnScene from "../PassItOnScene";
import CallScene from "./CallScene";

interface Service {
  title: string;
  tag: string;
  isHot?: boolean;
  description: string;
  helpPoints: string[];
  suitableFor?: string[];
}

const xhsProfile = "https://www.xiaohongshu.com/user/profile/615c36cd0000000002023df7";

// The handbook, project and 1v1 cards are hidden for now: this page is only about asking for help.
const showPaidServices = false;


const reasonIcons = [Plane, HeartHandshake, Users2];
const reasonTones = ["bg-brand-blue text-white", "bg-brand-lime", "bg-brand-purple text-white"];


// How each paid card is dressed: the recommended one is yellow, the handbook purple, the rest blue.
interface CardLook {
  card: string;
  icon: string;
  badge: Tone;
  pill: string;
  tick: string;
  button: string;
}

const hotLook: CardLook = {
  card: `${cardFrameClass} bg-brand-yellow-soft`,
  icon: "bg-brand-yellow",
  badge: "yellow",
  pill: "bg-white",
  tick: "bg-brand-yellow",
  button: buttonLimeClass,
};

const handbookLook: CardLook = {
  card: cardClass,
  icon: "bg-brand-purple text-white",
  badge: "purple",
  pill: "bg-brand-purple-soft",
  tick: "bg-brand-purple text-white",
  button: buttonGhostClass,
};

const plainLook: CardLook = {
  card: cardClass,
  icon: "bg-brand-blue text-white",
  badge: "blue",
  pill: "bg-brand-blue-soft",
  tick: "bg-brand-blue text-white",
  button: buttonGhostClass,
};

export default function ServicesPage() {
  const icons = [MessageSquare, GraduationCap, Users2, Rocket];
  const paidServices = content.services.slice(1) as Service[];

  return (
    <>
      {/* Ask for help: the problems students come with on one side, a short call on the other */}
      <Band tone="paper" className="pt-10! md:pt-16!">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <Reveal className="space-y-5">
              <h1 className="isolate text-[2.6rem] font-black leading-[1.15] tracking-tight md:text-7xl">
                <Title text={`[${content.hero.title}]`} />
              </h1>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 text-left">
              <p className="text-base font-black tracking-wider text-brand-muted md:text-lg">{content.ask.pointsTitle}</p>
              {/* One row per problem: who it is on the left, what they are stuck on beside it (below it on phones) */}
              <ul className="mt-3 grid sm:grid-cols-[auto_1fr] sm:gap-x-5">
                {content.ask.points.map((point) => (
                  <li
                    key={point.who}
                    className="grid gap-2 border-b-2 border-brand-ink/10 py-4 last:border-b-0 sm:col-span-2 sm:grid-cols-subgrid sm:items-center sm:gap-x-5"
                  >
                    <span className="justify-self-start rounded-full border-2 border-brand-ink bg-brand-lime-soft px-3.5 py-1 text-center text-base font-black leading-snug sm:justify-self-stretch">
                      {point.who}
                    </span>
                    <span className="text-xl font-bold leading-snug xl:text-[22px]">
                      <Clauses text={point.problem} />
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* The modal sits outside Reveal so its full-screen overlay is never inside a moving box. */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-4 lg:justify-start">
              <WeChatModal wechatId="Azdev0189" source="consulting">
                <div className="relative">
                  <div className={`${buttonLimeClass} md:px-8 md:py-4 md:text-xl`}>
                    {content.ask.cta} <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <Sticker tone="yellow" className="absolute -right-6 -top-4 rotate-6">
                    {content.ask.free}
                  </Sticker>
                </div>
              </WeChatModal>
            </div>
          </div>

          <Reveal delay={0.15}>
            <CallScene />
          </Reveal>
        </div>
      </Band>

      {/* Why the help is free: the reasons, and the idea of passing it on */}
      <Band tone="yellow">
        <SectionHeading title={content.why.title} />
        {/* The reasons get the wider side, so each one sits on a single line on a desktop */}
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div className="grid gap-4">
            {content.why.reasons.map((reason, index) => {
              const Icon = reasonIcons[index % reasonIcons.length];
              return (
                <Reveal key={reason} delay={index * 0.07}>
                  <div className={`${cardClass} flex items-center gap-4 p-5 md:p-6`}>
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-ink ${reasonTones[index % reasonTones.length]}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-balance text-lg font-bold leading-relaxed md:text-xl">
                      <Clauses text={reason} />
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="w-full lg:[zoom:1.15] xl:[zoom:1.35] 2xl:[zoom:1.45]">
              <PassItOnScene />
            </div>
            <p className="mt-8 text-center text-lg font-black md:text-xl">{content.why.passItOn}</p>
          </Reveal>
        </div>
      </Band>

      {/* Paid services */}
      {showPaidServices && (
      <Band tone="blue">
        <div className="grid gap-6 lg:grid-cols-3">
          {paidServices.map((service, index) => {
            const Icon = icons[index + 1];
            const isHot = service.isHot;
            const isHandbook = index === 0;
            const look = isHot ? hotLook : isHandbook ? handbookLook : plainLook;
            const wait = index * 0.08;

            const cardClassName = `group ${look.card} ${liftClass} flex h-full flex-col p-6 md:p-8`;

            const CardContent = (
              <>
                <div className="flex-1 space-y-6">
                  {/* Icon on the left, badge in the opposite corner: fits at every card width */}
                  <div className="flex items-start justify-between gap-3">
                    <PopIcon className={look.icon} delay={0.25 + wait}>
                      <Icon className="h-7 w-7" />
                    </PopIcon>
                    {isHot ? (
                      <Wobble>
                        <Sticker tone={look.badge} className="whitespace-nowrap">
                          强烈推荐
                        </Sticker>
                      </Wobble>
                    ) : isHandbook ? (
                      <Sticker tone={look.badge} className="rotate-2 whitespace-nowrap">
                        零基础入门
                      </Sticker>
                    ) : (
                      <Sticker tone={look.badge} className="rotate-2 whitespace-nowrap">
                        {service.tag}
                      </Sticker>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl font-black tracking-tight">{service.title}</h2>
                    <p className="text-base leading-relaxed text-brand-muted">{service.description}</p>
                    {service.suitableFor && service.suitableFor.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <p className="text-[13px] font-black uppercase tracking-widest text-brand-muted">适合人群</p>
                        <div className="flex flex-wrap gap-2">
                          {service.suitableFor.map((item: string) => (
                            <span
                              key={item}
                              className={`inline-flex items-center gap-1.5 rounded-xl border-2 border-brand-ink/15 px-3 py-1.5 text-sm font-bold ${look.pill}`}
                            >
                              <Users2 className="h-3.5 w-3.5 shrink-0" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <TickList
                    points={service.helpPoints}
                    tick={look.tick}
                    delay={0.45 + wait}
                    className="grid gap-3 border-t-2 border-dashed border-brand-ink/15 pt-5 md:grid-cols-2 md:gap-x-6 lg:grid-cols-1"
                  />
                </div>

                <div className={`mt-8 w-full ${look.button}`}>
                  {isHot ? "查看项目" : isHandbook ? "查看手册" : "联系咨询"}{" "}
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </>
            );

            // Hot card links to /blotz, handbook links to /handbook, others open WeChat modal
            if (isHot) {
              return (
                <Reveal key={service.title} delay={wait} className="h-full">
                  <Link href="/blotz" className={cardClassName}>
                    {CardContent}
                  </Link>
                </Reveal>
              );
            }

            if (isHandbook) {
              return (
                <Reveal key={service.title} delay={wait} className="h-full">
                  <Link href="/handbook" className={cardClassName}>
                    {CardContent}
                  </Link>
                </Reveal>
              );
            }

            return (
              <WeChatModal key={service.title} wechatId="Azdev0189">
                <Reveal delay={wait} className="h-full">
                  <div className={cardClassName}>{CardContent}</div>
                </Reveal>
              </WeChatModal>
            );
          })}
        </div>
      </Band>
      )}

      {/* XHS Free Content Banner */}
      <Band tone="paper" className="py-10! md:py-14!">
        <Reveal>
          <a
            href={xhsProfile}
            target="_blank"
            rel="noopener noreferrer"
            className={`group ${cardClass} ${liftClass} flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between md:px-8`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-ink bg-white transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110">
                  <Image src="/xhs.png" alt="小红书" width={28} height={28} className="rounded-md" />
                </span>
                <p className="text-balance text-lg font-black tracking-tight sm:text-xl">小红书上有大量免费干货</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["面试准备", "自学路线", "找工作", "留学生转码", "简历技巧", "行业经验"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border-2 border-brand-ink/15 bg-brand-coral/10 px-3 py-1 text-[13px] font-black transition-transform duration-200 odd:-rotate-2 even:rotate-2 group-hover:odd:rotate-0 group-hover:even:rotate-0"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className={`shrink-0 whitespace-nowrap ${buttonCoralClass}`}>
              免费查看{" "}
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </a>
        </Reveal>
      </Band>

      {/* Testimonials - Scrolling Reviews */}
      <Band tone="yellow" id="feedback" className="scroll-mt-24">
        <SectionHeading
          eyebrow={homeContent.feedback.hero.eyebrow}
          tone="yellow"
          title={homeContent.feedback.hero.title.replace("真实评价", "[真实评价]")}
          center
        />
        <Reveal delay={0.1} className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <span className="text-base font-bold text-brand-muted">小红书累计</span>
          <Sticker tone="paper" className="rotate-2">
            <CountUp value="56+ 条真实评价" />
          </Sticker>
        </Reveal>

        {/* On phones the row of reviews runs edge to edge */}
        <Reveal delay={0.15} className="-mx-6 mt-10 md:mx-0">
          <TestimonialsCarousel feedbacks={homeContent.feedback.feedbacks} />
        </Reveal>

        {/* CTA to XHS Profile */}
        <div className="mt-10 flex justify-center">
          <XhsModal profileUrl={xhsProfile}>
            <Reveal>
              <div className={buttonGhostClass}>
                查看更多小红书评价 <ArrowUpRight className="h-5 w-5" />
              </div>
            </Reveal>
          </XhsModal>
        </div>
      </Band>
    </>
  );
}
