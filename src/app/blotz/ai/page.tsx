import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Band, Reveal, Title } from "@/components/kit";
import { buttonGhostClass } from "@/components/styles";
import content from "./content.json";
import CompareScene from "./CompareScene";
import StagesScene from "./StagesScene";
import StepsScene from "./StepsScene";

export const metadata: Metadata = {
  title: "Blotz 团队怎么用 AI 开发 | 马农不卷大厂",
  description: "AI orchestration，不是 vibe coding：一个任务从拿到手到开 PR 的 6 步，和整个项目七个阶段谁负责。",
};

// How the Blotz team builds with AI. Reached from the "AI Orchestration 开发模式" screen on /blotz.

export default function BlotzAiPage() {
  // "hero" is the orchestration-versus-vibe-coding part; it opened the page before the loop moved to the top.
  const { hero, end } = content;

  return (
    <>
      {/* ── First screen: the whole project as a loop, and who owns each stage ── */}
      <StagesScene />

      {/* ── The idea: you direct, the AI carries out ────────── */}
      <Band tone="paper" className="py-14! md:py-20!">
        <div className="grid items-center lg:grid-cols-2 lg:gap-16">
          <Reveal className="text-center lg:text-left">
            <p className="text-lg font-bold text-brand-muted md:text-2xl">{hero.lead}</p>
            <h2 className="isolate mt-2 text-[clamp(1.8rem,9.2vw,2.4rem)] font-black leading-[1.2] tracking-tight md:text-6xl md:leading-[1.15] lg:text-[2.9rem] xl:text-6xl 2xl:text-[4.2rem]">
              <Title text={hero.title} />
            </h2>
          </Reveal>
          <CompareScene />
        </div>
      </Band>

      {/* ── One task, six steps ─────────────────────────────── */}
      <StepsScene />

      {/* ── The way back to the project page ────────────────── */}
      <Band tone="paper" className="py-12! md:py-14!">
        <div className="flex justify-center">
          <Link href="/blotz" className={buttonGhostClass}>
            <ArrowLeft className="h-5 w-5" /> {end.back}
          </Link>
        </div>
      </Band>
    </>
  );
}
