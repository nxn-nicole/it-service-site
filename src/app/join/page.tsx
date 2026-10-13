import type { Metadata } from "next";
import { FeePathScene, WhyFeeScene } from "./FeeScenes";
import { AiScene, ExtrasStrip, ResumeScene, ReviewScene, TeamScene } from "./GetScenes";
import { Hero } from "./Hero";
import { NextScene, WaysScene } from "./JoinScenes";
import { ProofScene } from "./ProofScene";

export const metadata: Metadata = {
  title: "旁听之后，怎么加入 | 马农不卷大厂",
  description: "旁听完 Blotz 的项目会议之后：你能得到什么、为什么有费用、怎么加入。",
};

export default function JoinPage() {
  return (
    <>
      <Hero />
      <AiScene />
      <TeamScene />
      <ReviewScene />
      <ResumeScene />
      <ExtrasStrip />
      <ProofScene />
      <WhyFeeScene />
      <FeePathScene />
      <WaysScene />
      <NextScene />
    </>
  );
}
