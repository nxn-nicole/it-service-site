"use client";

import { useState } from "react";
import { X, ArrowUpRight, Search } from "lucide-react";
import Image from "next/image";

interface XhsModalProps {
  children: React.ReactNode;
  profileUrl: string;
}

export default function XhsModal({ children, profileUrl }: XhsModalProps) {
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
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5 text-white/60" />
            </button>

            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 mx-auto">
                  <Image src="/xhs.png" alt="小红书" width={24} height={24} />
                </div>
                <h3 className="text-xl font-bold text-white">查看小红书真实评价</h3>
                <p className="text-sm text-white/50">48 条学员真实反馈</p>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="h-8 w-8 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 text-sm font-bold text-rose-400">
                    1
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">打开小红书主页</p>
                    <p className="text-xs text-white/40">点击下方按钮进入「马农不卷大厂」主页</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="h-8 w-8 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 text-sm font-bold text-rose-400">
                    2
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">找到评价帖子</p>
                    <p className="text-xs text-white/40">
                      在主页中找到标题为
                      <span className="text-rose-400 font-bold">「学生真实反馈大公开」</span>
                      的帖子
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="h-8 w-8 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 text-sm font-bold text-rose-400">
                    3
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">查看评论区</p>
                    <p className="text-xs text-white/40">滑到评论区即可看到所有学员的真实评价</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-bold hover:opacity-90 transition-opacity"
              >
                前往小红书主页 <ArrowUpRight className="h-4 w-4" />
              </a>

              <p className="text-[11px] text-white/25 text-center">
                打开后在 App 内浏览体验更佳
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
