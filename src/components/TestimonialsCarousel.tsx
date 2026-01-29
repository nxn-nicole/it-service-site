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
      className="group shrink-0 w-[320px] p-5 rounded-[20px] border border-white/10 bg-white/5 space-y-3 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
    >
      {/* XHS Badge */}
      <div className="flex items-center gap-2">
        <Image src="/xhs.png" alt="小红书" width={16} height={16} className="rounded-sm" />
        <span className="text-[11px] font-medium text-white/40">小红书评价</span>
      </div>

      {/* Note */}
      <p className="text-white/70 leading-relaxed text-sm line-clamp-3 group-hover:text-white/90 transition-colors">
        &quot;{feedback.note}&quot;
      </p>

      {/* Footer */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <p className="text-sm font-bold text-white/90">{feedback.name}</p>
        {feedback.date && (
          <p className="text-[11px] text-white/40">{feedback.date}</p>
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
      <div className="overflow-hidden">
        <div className="flex gap-4 w-max animate-marquee-left hover:paused">
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
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFeedback(null)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5 text-white/60" />
            </button>

            <div className="space-y-6">
              {/* XHS Badge */}
              <div className="flex items-center gap-2">
                <Image src="/xhs.png" alt="小红书" width={20} height={20} className="rounded-sm" />
                <span className="text-xs font-medium text-white/50">来自小红书</span>
              </div>

              {/* Full note */}
              <p className="text-white/80 leading-relaxed text-base">
                &quot;{selectedFeedback.note}&quot;
              </p>

              {/* Author info */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <p className="text-base font-bold text-white">{selectedFeedback.name}</p>
                {selectedFeedback.date && (
                  <p className="text-xs text-white/50">{selectedFeedback.date}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
