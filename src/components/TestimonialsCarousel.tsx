"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface Feedback {
  name: string;
  note: string;
  date?: string;
  link?: string;
}

interface TestimonialsCarouselProps {
  feedbacks: Feedback[];
}

function ReviewCard({ feedback, onClick }: { feedback: Feedback; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group w-[320px] shrink-0 cursor-pointer space-y-3 rounded-[20px] border-2 border-brand-ink bg-white p-5 shadow-[0_4px_0_0_var(--color-brand-ink)] transition-transform duration-200 hover:-translate-y-1"
    >
      {/* XHS Badge */}
      <div className="flex items-center gap-2">
        <Image src="/xhs.png" alt="小红书" width={16} height={16} className="rounded-sm" />
        <span className="text-[11px] font-bold text-brand-muted">小红书评价</span>
      </div>

      {/* Note */}
      <p className="line-clamp-3 text-sm leading-relaxed text-brand-ink/80">
        &quot;{feedback.note}&quot;
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between border-t-2 border-dashed border-brand-ink/15 pt-3">
        <p className="text-sm font-black">{feedback.name}</p>
        {feedback.date && (
          <p className="text-[11px] text-brand-muted">{feedback.date}</p>
        )}
      </div>
    </div>
  );
}

export default function TestimonialsCarousel({ feedbacks }: TestimonialsCarouselProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  return (
    <>
      {/* Single scrolling row */}
      <div className="overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max gap-4 animate-marquee-left hover:paused">
          {feedbacks.map((fb, i) => (
            <ReviewCard key={`a-${i}`} feedback={fb} onClick={() => setSelectedFeedback(fb)} />
          ))}
          {feedbacks.map((fb, i) => (
            <ReviewCard key={`b-${i}`} feedback={fb} onClick={() => setSelectedFeedback(fb)} />
          ))}
        </div>
      </div>

      {/* Full Text Modal */}
      {selectedFeedback && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFeedback(null)}
        >
          <div className="absolute inset-0 bg-brand-ink/60" />
          <div
            className="animate-in fade-in zoom-in-95 relative z-10 w-full max-w-lg rounded-3xl border-2 border-brand-ink bg-white p-8 text-brand-ink shadow-[0_6px_0_0_var(--color-brand-ink)] duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFeedback(null)}
              className="absolute right-4 top-4 cursor-pointer rounded-full p-2 transition-colors hover:bg-brand-ink/5"
            >
              <X className="h-5 w-5 text-brand-muted" />
            </button>

            <div className="space-y-6">
              {/* XHS Badge */}
              <div className="flex items-center gap-2">
                <Image src="/xhs.png" alt="小红书" width={20} height={20} className="rounded-sm" />
                <span className="text-xs font-bold text-brand-muted">来自小红书</span>
              </div>

              {/* Full note */}
              <p className="text-base leading-relaxed">
                &quot;{selectedFeedback.note}&quot;
              </p>

              {/* Author info */}
              <div className="flex items-center justify-between border-t-2 border-dashed border-brand-ink/15 pt-4">
                <p className="text-base font-black">{selectedFeedback.name}</p>
                {selectedFeedback.date && (
                  <p className="text-xs text-brand-muted">{selectedFeedback.date}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
