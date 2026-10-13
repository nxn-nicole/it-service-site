"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { buttonGhostClass } from "@/components/styles";

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

const roundButtonClass =
  "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-brand-ink bg-white transition-colors";

export default function HandbookPreviewModal({ children }: { children?: React.ReactNode }) {
  // `open` only ever turns true from a click, so the portal below is never
  // reached while rendering on the server.
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + previews.length) % previews.length);
  const next = () => setIndex((i) => (i + 1) % previews.length);

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-ink/60 p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="animate-in fade-in zoom-in-95 relative w-full max-w-3xl overflow-hidden rounded-3xl border-2 border-brand-ink bg-white text-brand-ink shadow-[0_6px_0_0_var(--color-brand-ink)] duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Browser bar, with the close button on the right */}
        <div className="flex items-center gap-2 border-b-2 border-brand-ink bg-brand-purple-soft py-2 pl-4 pr-2">
          <span className="h-3 w-3 shrink-0 rounded-full border-2 border-brand-ink bg-brand-coral" />
          <span className="h-3 w-3 shrink-0 rounded-full border-2 border-brand-ink bg-brand-yellow" />
          <span className="h-3 w-3 shrink-0 rounded-full border-2 border-brand-ink bg-brand-lime" />
          <span className="mx-auto truncate rounded-full border-2 border-brand-ink bg-white px-3 py-0.5 font-mono text-[13px] font-bold">
            blotztask.gitbook.io
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="关闭"
            className={`${roundButtonClass} hover:bg-brand-coral`}
          >
            <X className="h-5 w-5" strokeWidth={3} />
          </button>
        </div>

        {/* The handbook page itself */}
        <div className="relative bg-white">
          <img
            key={index}
            src={previews[index].src}
            alt={previews[index].caption}
            className="animate-in fade-in max-h-[60vh] w-full object-cover object-top duration-300"
          />
        </div>

        {/* Caption + navigation */}
        <div className="flex flex-col gap-3 border-t-2 border-brand-ink px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-5">
          <p className="text-sm font-bold leading-relaxed text-brand-muted sm:text-[15px]">{previews[index].caption}</p>
          <div className="flex shrink-0 items-center justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="上一张"
              className={`${roundButtonClass} hover:bg-brand-lime`}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={3} />
            </button>
            <span className="min-w-10 text-center text-sm font-black tabular-nums">
              {index + 1} / {previews.length}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label="下一张"
              className={`${roundButtonClass} hover:bg-brand-lime`}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={3} />
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
        <button type="button" onClick={() => { setOpen(true); setIndex(0); }} className={buttonGhostClass}>
          <BookOpen className="h-5 w-5" />
          查看手册内页
        </button>
      )}

      {open && createPortal(modal, document.body)}
    </>
  );
}
