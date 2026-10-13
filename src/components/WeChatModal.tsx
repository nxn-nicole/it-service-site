"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

type WeChatSource = "blotz" | "handbook" | "consulting" | "general";

interface WeChatModalProps {
  children: React.ReactNode;
  wechatId?: string;
  source?: WeChatSource;
  note?: string;
}

const sourceConfig: Record<WeChatSource, { title: string; subtitle: string; note: string }> = {
  blotz:      { title: "微信咨询 Blotz 项目",  subtitle: "扫码或搜索微信号添加好友", note: "Blotz 项目" },
  handbook:   { title: "微信咨询全栈学习手册",  subtitle: "扫码或搜索微信号添加好友", note: "全栈学习手册" },
  consulting: { title: "添加微信预约咨询",      subtitle: "扫码或搜索微信号添加好友", note: "你想咨询的内容" },
  general:    { title: "添加微信预约咨询",      subtitle: "扫码或搜索微信号添加好友", note: "你想咨询的内容" },
};

export default function WeChatModal({ children, wechatId = "Azdev0189", source = "general", note: noteProp }: WeChatModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cfg = { ...sourceConfig[source], ...(noteProp ? { note: noteProp } : {}) };

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
            className="animate-in fade-in zoom-in-95 relative z-10 w-full max-w-sm rounded-3xl border-2 border-brand-ink bg-white p-8 text-brand-ink shadow-[0_6px_0_0_var(--color-brand-ink)] duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 cursor-pointer rounded-full p-2 transition-colors hover:bg-brand-ink/5"
            >
              <X className="h-5 w-5 text-brand-muted" />
            </button>

            <div className="space-y-6 text-center">
              {/* Header */}
              <div className="space-y-2">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-brand-ink bg-brand-lime">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-black">{cfg.title}</h3>
                <p className="text-sm text-brand-muted">{cfg.subtitle}</p>
              </div>

              {/* QR Code */}
              <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-2xl border-2 border-brand-ink bg-white p-3">
                <Image
                  src="/wechat-qr.png"
                  alt="WeChat QR Code"
                  fill
                  sizes="192px"
                  className="object-contain"
                />
              </div>

              {/* WeChat ID */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">微信号</p>
                <div className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-ink bg-brand-lime-soft px-4 py-2">
                  <span className="font-mono text-lg font-bold">{wechatId}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(wechatId)}
                    className="cursor-pointer text-xs font-bold text-brand-muted transition-colors hover:text-brand-ink"
                  >
                    复制
                  </button>
                </div>
              </div>

              {/* Tip */}
              <div className="space-y-1 rounded-xl bg-brand-yellow-soft px-4 py-3">
                <p className="text-xs text-brand-muted">添加时请备注</p>
                <p className="text-sm font-black">「{cfg.note}」</p>
                <p className="text-xs text-brand-muted">方便快速通过并优先回复</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
