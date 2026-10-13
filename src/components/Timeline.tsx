import React from 'react';
import { ArrowUpRight, Briefcase, Users } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/kit';
import { cardClass, liftClass } from '@/components/styles';

interface TimelineItem {
  year: string;
  category: string;
  title: string;
  desc: string;
  tags: string[];
  gradient: string;
  link?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {/* The line: down the left on phones, down the middle on wide screens */}
      <div className="absolute bottom-0 left-[11px] top-2 w-0.5 bg-brand-ink/15 lg:left-1/2 lg:-translate-x-1/2" />

      <div className="space-y-8 lg:space-y-12">
        {items.map((item, idx) => {
          const isEven = idx % 2 === 0;
          const isWork = item.category === "Work";

          return (
            <div key={idx} className="relative pl-10 lg:grid lg:grid-cols-2 lg:gap-20 lg:pl-0">
              {/* Dot on the line */}
              <span
                className={`absolute left-0 top-2 h-6 w-6 rounded-full border-2 border-brand-ink lg:left-1/2 lg:-translate-x-1/2 ${
                  isWork ? 'bg-brand-blue' : 'bg-brand-purple'
                }`}
              />

              {/* Year, on the opposite side from the card (wide screens only) */}
              <Reveal
                from={isEven ? 'left' : 'right'}
                className={`hidden lg:flex ${isEven ? 'justify-end lg:order-1' : 'justify-start lg:order-2'}`}
              >
                <span className="select-none text-8xl font-black leading-none tracking-tighter text-brand-ink/10">
                  {item.year.split('.')[0]}
                </span>
              </Reveal>

              <Reveal from={isEven ? 'right' : 'left'} className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                <div className={`relative ${cardClass} ${item.link ? liftClass : ''} p-6 md:p-7`}>
                  {item.link &&
                    (item.link.startsWith('http') ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-10 cursor-pointer rounded-3xl"
                        aria-label={`View details for ${item.title}`}
                      />
                    ) : (
                      <Link
                        href={item.link}
                        className="absolute inset-0 z-10 cursor-pointer rounded-3xl"
                        aria-label={`View details for ${item.title}`}
                      />
                    ))}

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border-2 border-brand-ink px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wide text-white ${
                          isWork ? 'bg-brand-blue' : 'bg-brand-purple'
                        }`}
                      >
                        {isWork ? <Briefcase size={12} /> : <Users size={12} />}
                        {isWork ? 'Professional Work' : 'Mentoring Experience'}
                      </span>
                      <span className="text-sm font-black tracking-wider text-brand-muted">{item.year}</span>
                      {item.link && (
                        <span className="inline-flex items-center gap-0.5 text-xs font-black underline decoration-brand-ink/30 underline-offset-4">
                          点击查看 <ArrowUpRight size={14} />
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-black leading-tight tracking-tight">{item.title}</h3>

                    <p className="text-base leading-relaxed text-brand-muted">{item.desc}</p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full border-2 border-brand-ink/15 px-3 py-0.5 text-[11px] font-black uppercase tracking-wider ${
                            isWork ? 'bg-brand-blue-soft' : 'bg-brand-purple-soft'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </div>
  );
};
