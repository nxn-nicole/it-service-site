"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface WeChatModalProps {
  children: React.ReactNode;
  wechatId?: string;
}

export default function WeChatModal({ children, wechatId = "Azdev0189" }: WeChatModalProps) {
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
            className="relative z-10 w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5 text-white/60" />
            </button>

            <div className="space-y-6 text-center">
              {/* Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mx-auto">
                  <svg className="h-6 w-6 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">添加微信预约咨询</h3>
                <p className="text-sm text-white/40">扫码或搜索微信号添加好友</p>
              </div>

              {/* QR Code */}
              <div className="relative aspect-square w-48 mx-auto rounded-2xl overflow-hidden bg-white p-3">
                <Image
                  src="/wechat-qr.png"
                  alt="WeChat QR Code"
                  fill
                  className="object-contain"
                />
              </div>

              {/* WeChat ID */}
              <div className="space-y-2">
                <p className="text-xs text-white/30 uppercase tracking-widest">微信号</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-lg font-mono font-bold text-emerald-400">{wechatId}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(wechatId)}
                    className="text-xs text-white/40 hover:text-white transition-colors"
                  >
                    复制
                  </button>
                </div>
              </div>

              {/* Tip */}
              <p className="text-xs text-white/30">
                添加时请备注「咨询」，方便快速通过
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
