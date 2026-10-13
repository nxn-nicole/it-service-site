import { ArrowUpRight, Heart } from "lucide-react";
import Image from "next/image";
import WeChatModal from "@/components/WeChatModal";
import XhsModal from "@/components/XhsModal";
import { Band, Reveal, Title } from "@/components/kit";
import { buttonCoralClass, buttonLimeClass, cardClass, liftClass } from "@/components/styles";


const xhsMessageSteps = [
  { heading: "打开小红书主页", detail: "点击下方按钮进入「马农不卷大厂」主页" },
  { heading: "发私信", detail: "在主页点「私信」，说说你的情况和想问的" },
];

const contactCardClass = `group ${cardClass} ${liftClass} flex h-full flex-col gap-5 p-6 md:p-8`;

const iconTileClass =
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-ink shadow-[0_4px_0_0_var(--color-brand-ink)] transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110";

// The little speech bubble in the corner of each card. Decoration only.
const bubbleClass =
  "flex h-10 items-center rounded-2xl rounded-tr-md border-2 border-brand-ink px-3";

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <Band tone="paper" className="pb-10! pt-10! md:pb-14! md:pt-16!">
        <Reveal className="mx-auto max-w-2xl space-y-4 text-center">
          <h1 className="isolate text-[2.6rem] font-black leading-[1.15] tracking-tight md:text-7xl">
            <Title text="[联系我]" />
          </h1>
          <p className="text-balance text-lg leading-relaxed text-brand-muted md:text-xl">
            选择你最方便的方式，随时联系咨询
          </p>
        </Reveal>
      </Band>

      {/* Contact Cards */}
      <Band tone="purple">
        {/* Each modal sits outside Reveal so its full-screen overlay is never inside a moving box. */}
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {/* WeChat Card */}
          <WeChatModal wechatId="Azdev0189">
            <Reveal from="left" className="h-full">
              <div className={contactCardClass}>
                <div className="flex items-start justify-between">
                  <div className={`${iconTileClass} bg-brand-lime`}>
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"/>
                    </svg>
                  </div>
                  {/* "Typing…" dots. Each dot rides in a taller box so the hop is big enough to see. */}
                  <span aria-hidden className={`${bubbleClass} gap-1 bg-brand-lime-soft`}>
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="flex h-4 items-center motion-safe:animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      >
                        <span className="h-2 w-2 rounded-full bg-brand-ink/60" />
                      </span>
                    ))}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-black tracking-tight">微信咨询</h2>
                  <p className="text-base leading-relaxed text-brand-muted">扫码或搜索微信号添加好友</p>
                </div>
                <div className={`mt-auto w-full ${buttonLimeClass}`}>
                  打开微信二维码{" "}
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Reveal>
          </WeChatModal>

          {/* XHS Card */}
          <XhsModal
            profileUrl="https://www.xiaohongshu.com/user/profile/615c36cd0000000002023df7"
            title="去小红书找我"
            subtitle="「马农不卷大厂」"
            steps={xhsMessageSteps}
          >
            <Reveal from="right" delay={0.08} className="h-full">
              <div className={contactCardClass}>
                <div className="flex items-start justify-between">
                  <div className={`${iconTileClass} bg-white`}>
                    <Image src="/xhs.png" alt="小红书" width={32} height={32} className="rounded-lg" />
                  </div>
                  {/* A "like" that keeps landing */}
                  <span aria-hidden className={`${bubbleClass} bg-white`}>
                    <span className="relative flex h-5 w-5">
                      <Heart className="absolute inset-0 h-5 w-5 fill-brand-coral text-brand-coral opacity-60 motion-safe:animate-ping" />
                      <Heart className="relative h-5 w-5 fill-brand-coral" />
                    </span>
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-2xl font-black tracking-tight">小红书私信</h2>
                  <p className="text-base leading-relaxed text-brand-muted">搜索「马农不卷大厂」找到我</p>
                </div>
                <div className={`mt-auto w-full ${buttonCoralClass}`}>
                  查看小红书主页{" "}
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Reveal>
          </XhsModal>
        </div>

        {/* Tip */}
        <Reveal delay={0.16} className="mt-10 flex justify-center">
          <p className="max-w-md -rotate-1 text-balance rounded-2xl border-2 border-brand-ink bg-brand-yellow-soft px-5 py-3 text-center text-[15px] font-bold shadow-[0_4px_0_0_var(--color-brand-ink)]">
            添加微信时请备注「咨询」，方便快速通过
          </p>
        </Reveal>
      </Band>
    </>
  );
}
