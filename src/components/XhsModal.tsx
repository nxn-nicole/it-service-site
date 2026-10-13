"use client";

import { useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface XhsStep {
  heading: string;
  detail: string;
}

interface XhsModalProps {
  children: React.ReactNode;
  profileUrl: string;
  title?: string;
  subtitle?: string;
  steps?: XhsStep[];
  ctaText?: string;
}

const DEFAULT_STEPS: XhsStep[] = [
  { heading: "打开小红书主页", detail: "点击下方按钮进入「马农不卷大厂」主页" },
  { heading: "找到评价帖子", detail: "在主页中找到标题为「学生真实反馈大公开」的帖子" },
  { heading: "查看评论区", detail: "滑到评论区即可看到所有学员的真实评价" },
];

export default function XhsModal({
  children,
  profileUrl,
  title = "查看小红书真实评价",
  subtitle = "56+ 条学员真实反馈",
  steps = DEFAULT_STEPS,
  ctaText = "前往小红书主页",
}: XhsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-brand-ink/60" />

          {/* Modal */}
          <div
            className="animate-in fade-in zoom-in-95 relative z-10 w-full max-w-md rounded-3xl border-2 border-brand-ink bg-white p-8 text-brand-ink shadow-[0_6px_0_0_var(--color-brand-ink)] duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 cursor-pointer rounded-full p-2 transition-colors hover:bg-brand-ink/5"
            >
              <X className="h-5 w-5 text-brand-muted" />
            </button>

            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2 text-center">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-brand-ink bg-white">
                  <Image src="/xhs.png" alt="小红书" width={24} height={24} />
                </div>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="text-sm text-brand-muted">{subtitle}</p>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border-2 border-brand-ink/10 bg-brand-paper p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-yellow text-sm font-black">
                      {i + 1}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-black">{step.heading}</p>
                      <p className="text-xs text-brand-muted">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-brand-ink bg-brand-coral py-4 text-sm font-black text-white shadow-[0_5px_0_0_var(--color-brand-ink)] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_0_var(--color-brand-ink)]"
              >
                {ctaText} <ArrowUpRight className="h-4 w-4" />
              </a>

              <p className="text-center text-[11px] text-brand-muted">
                打开后在 App 内浏览体验更佳
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
