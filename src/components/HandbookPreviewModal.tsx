"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

const previews = [
  {
    src: "/preview-review-refactor.png",
    caption: "Module 5 – Review & Refactor：结课后与 Tech Lead 1v1 代码审查",
  },
  {
    src: "/preview-cqrs.png",
    caption: "Module 5 – CQRS：学习真实后端架构模式，Why + How 一步步讲清楚",
  },
  {
    src: "/preview-feature-folder.png",
    caption: "Module 2 – Feature Based Folder：工业级代码结构，直接对应 Blotz 真实项目",
  },
  {
    src: "/preview-azure-keyvault.png",
    caption: "Module 5 – Azure Key Vault：云端安全存储密钥，配套中文教学视频",
  },
];

export default function HandbookPreviewModal({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const prev = () => setIndex((i) => (i - 1 + previews.length) % previews.length);
  const next = () => setIndex((i) => (i + 1) % previews.length);

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute -top-10 right-0 text-white/50 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Browser chrome */}
        <div className="rounded-[20px] overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#e8e8e8] border-b border-black/10">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="text-[11px] text-black/30 font-mono mx-auto pr-6">
              blotztask.gitbook.io
            </span>
          </div>
          <div className="relative bg-white">
            <img
              key={index}
              src={previews[index].src}
              alt={previews[index].caption}
              className="w-full max-h-[60vh] object-cover object-top"
            />
          </div>
        </div>

        {/* Caption + navigation */}
        <div className="flex items-center justify-between mt-4 px-1">
          <p className="text-sm text-white/50">{previews[index].caption}</p>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-white/60" />
            </button>
            <span className="text-xs text-white/30">{index + 1} / {previews.length}</span>
            <button
              onClick={next}
              className="h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {children ? (
        <div onClick={() => { setOpen(true); setIndex(0); }} className="cursor-pointer">
          {children}
        </div>
      ) : (
        <button
          onClick={() => { setOpen(true); setIndex(0); }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[14px] border border-violet-500/30 bg-violet-500/10 text-sm font-bold text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/50 transition-all duration-300 cursor-pointer"
        >
          <BookOpen className="h-4 w-4" />
          查看手册内页
        </button>
      )}

      {mounted && open && createPortal(modal, document.body)}
    </>
  );
}
