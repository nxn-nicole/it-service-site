import Image from "next/image";
import {
  ArrowUpRight,
  Blocks,
  BrainCircuit,
  Code2,
  Crown,
  GraduationCap,
  Rocket,
  Smartphone,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import content from "./content.json";
import { Timeline } from "@/components/Timeline";
import { Hero } from "./join/Hero";
import { RealProjectScene, SmallClassScene, TailoredScene, WhiteboardScene } from "./TeachingScenes";
import { Band, CountUp, Reveal, SectionHeading, Sticker, Title } from "@/components/kit";
import { buttonLimeClass, cardFrameClass, cardClass, liftClass } from "@/components/styles";

const xhsProfile = "https://www.xiaohongshu.com/user/profile/615c36cd0000000002023df7";

type Tech = {
  name: string;
  /** Smaller second line on the crowned cards. */
  note?: string;
  url: string;
  /** Official logo file in /public/logos. */
  logo?: string;
  /** A plain icon, for things without a logo of their own. */
  icon?: LucideIcon;
  /** Drawn in CSS instead of loaded from a file. */
  mark?: "dotnet";
};

// The three he is strongest in wear a crown; the rest are tools he also works with.
const crownedTech: Tech[] = [
  { name: "AI Agent", note: "Agentic Engineering", icon: BrainCircuit, url: "https://learn.microsoft.com/azure/ai-services/openai/" },
  { name: "Azure", logo: "/logos/azure.svg", url: "https://learn.microsoft.com/azure" },
  { name: ".NET", mark: "dotnet", url: "https://learn.microsoft.com/dotnet" },
];
const otherTech: Tech[] = [
  { name: "React", logo: "/logos/react.svg", url: "https://react.dev" },
  { name: "Next.js", logo: "/logos/nextjs.svg", url: "https://nextjs.org/docs" },
  { name: "React Native", icon: Smartphone, url: "https://reactnative.dev" },
  { name: "SQL Server", logo: "/logos/sql-server.svg", url: "https://www.microsoft.com/sql-server" },
  { name: "DevOps", logo: "/logos/azure-devops.svg", url: "https://learn.microsoft.com/azure/devops" },
  { name: "IaC", icon: Blocks, url: "https://learn.microsoft.com/azure/azure-resource-manager/bicep" },
];

/**
 * One technology's picture. `box` sizes it; `markText` sizes the lettering of
 * the .NET mark, which is the current logo: white ".NET" on the brand purple.
 */
function TechGlyph({ tech, box, markText }: { tech: Tech; box: string; markText: string }) {
  if (tech.mark === "dotnet") {
    return (
      <span
        aria-hidden
        className={`flex shrink-0 items-center justify-center rounded-[22%] bg-[#512bd4] font-black tracking-tighter text-white ${box} ${markText}`}
      >
        .NET
      </span>
    );
  }
  if (tech.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={tech.logo} alt="" className={`shrink-0 object-contain ${box}`} />;
  }
  const Icon = tech.icon;
  return Icon ? <Icon className={`shrink-0 ${box}`} strokeWidth={1.6} /> : null;
}

const crownTilts = ["-rotate-12", "rotate-6", "-rotate-6"];
// Where each of the three sits round the photo, and when its float starts.
const skillBadges = [
  { ...crownedTech[0], spot: "left-0 top-16 -rotate-6 md:left-2 md:top-20", delay: "-0.4s" },
  { ...crownedTech[1], spot: "right-0 top-20 rotate-6 md:right-2 md:top-28", delay: "-1.8s" },
  { ...crownedTech[2], spot: "bottom-12 left-3 rotate-3 md:bottom-16 md:left-10", delay: "-3s" },
];

const statTones = ["bg-brand-yellow-soft", "bg-brand-purple-soft", "bg-brand-lime-soft", "bg-brand-blue-soft"];

const pillarIcons = [Users, Rocket, GraduationCap, Code2];
const pillarTones = ["bg-brand-yellow", "bg-brand-lime", "bg-brand-blue text-white", "bg-brand-purple text-white"];
const pillarLinks = ["/courses", "/courses", "/handbook", "/blotz"];
const pillarStages = ["bg-brand-yellow-soft", "bg-brand-lime-soft", "bg-brand-blue-soft", "bg-brand-purple-soft"];
const pillarScenes = [SmallClassScene, TailoredScene, WhiteboardScene, RealProjectScene];

export default function IntroductionPage() {
  const [firstSentence, ...restSentences] = content.profile.summary.split("。").filter(Boolean);

  return (
    <>
      {/* What I am trying to do */}
      <Hero
        standalone={false}
        sticker={content.mission.sticker}
        lead={content.mission.lead}
        title={content.mission.title}
        hint={content.mission.hint}
      >
        <Reveal className="mx-auto mt-6 max-w-xl lg:mx-0">
          <p className="text-lg leading-relaxed text-brand-muted md:text-xl">
            {/* Break only after the 、 so no line starts with a stray character */}
            {content.mission.body.split("、").map((part, i, parts) => (
              <span key={part} className="inline-block">
                {part}
                {i < parts.length - 1 && "、"}
              </span>
            ))}
          </p>
        </Reveal>

        {/* The one thing to do next: ask. A speech bubble floats beside the button and opens up on hover. */}
        <Reveal delay={0.1} className="mt-8 flex justify-center lg:justify-start">
          <Link href="/courses" className="group flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6">
            <span className={`${buttonLimeClass} shrink-0`}>
              {content.help.cta} <ArrowUpRight className="h-5 w-5" />
            </span>

            {/* The invisible copy holds the bubble's place, so opening it never moves the page.
                Screens without a mouse have no hover: there the bubble is simply open. */}
            <span className="relative block">
              <span
                aria-hidden
                className="invisible block whitespace-nowrap border-2 px-4 py-3 text-base font-black md:text-lg [@media(hover:none)]:hidden"
              >
                {content.help.title}
              </span>
              <span className="animate-float absolute left-0 top-0 block w-max max-w-[86vw] rounded-2xl border-2 border-brand-ink bg-white px-4 py-3 text-left shadow-[0_4px_0_0_var(--color-brand-ink)] [@media(hover:none)]:static">
                {/* The tail points at the button: up on phones, left on wider screens */}
                <span className="absolute -top-[8px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-brand-ink bg-white sm:-left-[8px] sm:top-[18px] sm:translate-x-0 sm:border-b-2 sm:border-t-0" />
                <span className="block whitespace-nowrap text-base font-black md:text-lg">{content.help.title}</span>
                {/* Opens in both directions at once. The words sit at a fixed width, so the lines
                    are already where they will end up and nothing reflows while it opens. */}
                <span className="grid grid-cols-[0fr] grid-rows-[0fr] opacity-0 transition-[grid-template-columns,grid-template-rows,opacity] duration-300 ease-out group-hover:grid-cols-[1fr] group-hover:grid-rows-[1fr] group-hover:opacity-100 [@media(hover:none)]:grid-cols-[1fr] [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                  <span className="min-h-0 min-w-0 overflow-hidden">
                    <span className="block w-[15.5rem] max-w-[72vw] pt-1.5 text-[15px] font-bold leading-snug text-brand-muted">
                      {/* Break only after punctuation, never in the middle of a phrase */}
                      {(content.help.body.match(/[^、，。]+[、，。]?/g) ?? []).map((phrase) => (
                        <span key={phrase} className="inline-block">
                          {phrase}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </Link>
        </Reveal>
      </Hero>

      {/* Profile */}
      <Band tone="lime">
        <div>
          {/* Same two-column grid as the first screen: picture in one half, words in the other */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* A small photo in a snapshot frame, with the three crowned skills and a few shapes floating round it */}
            <Reveal className="flex justify-center">
              <div className="relative h-[340px] w-[320px] md:h-[400px] md:w-[440px]">
                <Star
                  aria-hidden
                  className="animate-float absolute right-8 top-1 h-9 w-9 rotate-12 fill-brand-yellow md:right-14 md:h-11 md:w-11"
                  style={{ animationDelay: "-1.3s" }}
                />
                <svg
                  aria-hidden
                  viewBox="0 0 96 28"
                  className="animate-float absolute bottom-10 right-0 w-20 text-brand-purple md:bottom-14 md:right-4 md:w-24"
                  style={{ animationDelay: "-2.4s" }}
                >
                  <path
                    d="M3 14c8-14 16-14 24 0s16 14 24 0 16-14 24 0 12 12 18 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  aria-hidden
                  className="absolute left-2 top-0 h-16 w-24 bg-[radial-gradient(var(--color-brand-blue)_2.5px,transparent_3px)] bg-[length:16px_16px] opacity-60 md:left-6"
                />

                {skillBadges.map((badge) => {
                  return (
                    <span
                      key={badge.name}
                      aria-hidden
                      className={`animate-float absolute flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-brand-ink bg-white shadow-[0_4px_0_0_var(--color-brand-ink)] md:h-16 md:w-16 ${badge.spot}`}
                      style={{ animationDelay: badge.delay }}
                    >
                      <TechGlyph tech={badge} box="h-8 w-8 md:h-9 md:w-9" markText="text-[9px] md:text-[10px]" />
                      <span className="absolute -right-2.5 -top-2.5 flex h-6 w-6 rotate-12 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-yellow">
                        <Crown className="h-3 w-3" />
                      </span>
                    </span>
                  );
                })}

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-3 rounded-2xl border-2 border-brand-ink bg-white p-3 shadow-[0_6px_0_0_var(--color-brand-ink)]">
                  <span
                    aria-hidden
                    className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-3 rounded-sm border border-brand-ink/20 bg-brand-yellow/85"
                  />
                  <Image
                    src="/profile-photo.webp"
                    alt="头像"
                    width={220}
                    height={220}
                    priority
                    className="h-44 w-44 rounded-xl border-2 border-brand-ink object-cover md:h-[220px] md:w-[220px]"
                  />
                  <p className="pt-2.5 text-center text-base font-black">马农不卷大厂</p>
                </div>

                <Sticker tone="yellow" className="absolute bottom-2 left-1/2 -ml-4 rotate-6 whitespace-nowrap max-[360px]:-ml-20 md:bottom-5 md:text-base">
                  {content.profile.specialize}
                </Sticker>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="space-y-6 text-center lg:text-left">
              <h2 className="isolate text-[2.3rem] font-black leading-[1.15] tracking-tight md:text-6xl">
                <Title text={`[${content.profile.title}]`} />
              </h2>
              <p className="mx-auto max-w-xl text-lg leading-relaxed md:text-xl lg:mx-0">
                <span className="font-bold">{firstSentence}。</span>
                <span className="text-brand-muted">{restSentences.join("。")}。</span>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <a href={xhsProfile} target="_blank" rel="noopener noreferrer" className={buttonLimeClass}>
                  查看小红书 <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Stats: a row of their own */}
          <div className="mt-16 grid grid-cols-2 gap-4 md:mt-24 lg:grid-cols-4">
            {content.feedback.stats.map((item, i) => {
              const body = (
                <div className={`${cardFrameClass} ${statTones[i % statTones.length]} h-full p-6 text-center md:p-8`}>
                  <CountUp value={item.value} className="block text-4xl font-black tracking-tight md:text-5xl" />
                  <p className="mt-2 text-sm font-black text-brand-muted">
                    {item.label}
                    {item.link && <ArrowUpRight className="ml-1 inline h-4 w-4" />}
                  </p>
                </div>
              );

              return (
                <Reveal key={item.label} delay={i * 0.07}>
                  {item.link ? (
                    <a
                      href={item.link}
                      {...(item.link.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`block h-full ${liftClass}`}
                    >
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </Band>

      {/* Technical expertise */}
      <Band tone="blue">
        <SectionHeading
          eyebrow="Expertise"
          tone="blue"
          title="[技术专长]"
          lead="深耕微软生态与全栈开发，专注于高性能、可扩展的现代化系统架构。"
        />

        <div className="mt-12 grid grid-cols-3 gap-3 md:gap-5">
          {crownedTech.map((tech, i) => {
            return (
              <Reveal key={tech.name} delay={i * 0.1} className="relative pt-6">
                <span
                  aria-hidden
                  className={`animate-float absolute left-1/2 top-0 z-10 -ml-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-yellow shadow-[0_3px_0_0_var(--color-brand-ink)] md:-ml-6 md:h-12 md:w-12 ${crownTilts[i % crownTilts.length]}`}
                >
                  <Crown className="h-5 w-5 md:h-6 md:w-6" />
                </span>
                <a
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClass} ${liftClass} flex h-full flex-col items-center justify-center gap-3 px-2 pb-5 pt-8 md:gap-4 md:px-6 md:pb-7 md:pt-10`}
                >
                  <TechGlyph tech={tech} box="h-11 w-11 md:h-20 md:w-20" markText="text-[13px] md:text-2xl" />
                  <span className="text-center text-xl font-black leading-tight tracking-tight md:text-4xl">{tech.name}</span>
                  {tech.note && (
                    <span className="-mt-2 text-center text-[11px] font-bold leading-tight text-brand-muted md:-mt-1 md:text-base">
                      {tech.note}
                    </span>
                  )}
                </a>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
          {otherTech.map((tech, i) => {
            return (
              <Reveal key={tech.name} delay={0.3 + i * 0.05}>
                <a
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${liftClass} inline-flex items-center gap-2.5 rounded-2xl border-2 border-brand-ink bg-white px-4 py-2.5 text-base font-black shadow-[0_4px_0_0_var(--color-brand-ink)]`}
                >
                  <TechGlyph tech={tech} box="h-6 w-6" markText="text-[7px]" />
                  {tech.name}
                </a>
              </Reveal>
            );
          })}
        </div>
      </Band>

      {/* Teaching method */}
      <Band tone="paper">
        <SectionHeading eyebrow="Approach" tone="yellow" title="[教学方式]" />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {content.goal.pillars.map((item, index) => {
            const Icon = pillarIcons[index % pillarIcons.length];
            const Scene = pillarScenes[index % pillarScenes.length];
            return (
              <Reveal key={item.label} delay={index * 0.07}>
                <Link
                  href={pillarLinks[index] ?? "/courses"}
                  className={`${cardClass} ${liftClass} flex h-full flex-col overflow-hidden`}
                >
                  {/* The idea is shown first; the line under the title only names it */}
                  <div className={`border-b-2 border-brand-ink px-4 py-8 lg:py-10 ${pillarStages[index % pillarStages.length]}`}>
                    <div className="w-full lg:[zoom:1.3]">
                      <Scene />
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 md:p-7">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-ink ${pillarTones[index % pillarTones.length]}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xl font-black tracking-tight md:text-2xl">{item.label}</p>
                      <p className="mt-1.5 text-base font-medium leading-relaxed text-brand-muted md:text-lg">{item.note}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Band>

      {/* Journey */}
      <Band tone="purple" id="journey" className="scroll-mt-24">
        <SectionHeading eyebrow={content.journey.eyebrow} tone="purple" title={`[${content.journey.title}]`} />
        <div className="mt-12">
          <Timeline items={content.journey.items} />
        </div>
      </Band>
    </>
  );
}
