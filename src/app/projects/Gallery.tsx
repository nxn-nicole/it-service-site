"use client";

import Image from "next/image";
import { useRef } from "react";

type GalleryItem = {
  src: string;
  title: string;
  caption: string;
};

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 300;
    const delta = direction === "left" ? -cardWidth : cardWidth;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent" />
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto pb-4 pl-12 pr-12 snap-x snap-mandatory"
          >
            {items.map((item) => (
              <div
                key={item.title}
                className="w-72 flex-shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-white/5"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-300 hover:scale-105"
                  />
                </div>
                <div className="space-y-1 p-4">
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-white/70">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
        <button
          type="button"
          onClick={() => scrollByCard("left")}
          className="pointer-events-auto flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg shadow-black/40 transition hover:border-white/40 hover:bg-white/10"
          aria-label="Scroll left"
        >
          ←
        </button>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <button
          type="button"
          onClick={() => scrollByCard("right")}
          className="pointer-events-auto flex h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg shadow-black/40 transition hover:border-white/40 hover:bg-white/10"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>
  );
}
