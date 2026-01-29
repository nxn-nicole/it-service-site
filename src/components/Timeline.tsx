import React from 'react';
import { Briefcase, Users, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    <div className="relative max-w-6xl mx-auto px-4 py-8">
      {/* The Center Line (Only visible on desktop) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

      <div className="space-y-12 lg:space-y-0">
        {items.map((item, idx) => {
          const isEven = idx % 2 === 0;
          const isWork = item.category === "Work";

          return (
            <div key={idx} className="relative lg:min-h-[200px] group/item">
              {/* Desktop: Center Dot & Connector */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 hidden lg:flex flex-col items-center z-10">
                <div className={`relative h-4 w-4 rounded-full border-2 bg-black flex items-center justify-center transition-all duration-700 group-hover/item:scale-150 shadow-2xl ${isWork ? 'border-blue-500/60 group-hover/item:border-blue-400 shadow-blue-500/20' : 'border-violet-500/60 group-hover/item:border-violet-400 shadow-violet-500/20'}`}>
                  <div className={`absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 bg-linear-to-br ${item.gradient}`} />
                  <div className={`h-1 w-1 rounded-full z-10 ${isWork ? 'bg-blue-400 group-hover/item:bg-blue-300' : 'bg-violet-400 group-hover/item:bg-violet-300'}`} />
                </div>
              </div>

              {/* Responsive Layout */}
              <div className={`flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 lg:gap-0`}>
                
                {/* Year Side (Sticky on Mobile, Static on Desktop) */}
                <div className={`w-full lg:w-1/2 flex ${isEven ? 'lg:justify-end lg:pr-12' : 'lg:justify-start lg:pl-12'} items-center relative group/year`}>
                  <div className={`flex items-center gap-4 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <span className={`text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter transition-all duration-700 whitespace-nowrap select-none pointer-events-none ${isEven ? 'text-right' : 'text-left'} text-white/5 group-hover/item:scale-105 ${isWork ? 'group-hover/item:text-blue-500/20' : 'group-hover/item:text-violet-500/20'}`}>
                      {item.year.split('.')[0]}
                    </span>
                    <div className={`h-px w-8 hidden lg:block transition-colors duration-700 ${isWork ? 'bg-blue-500/20 group-hover/item:bg-blue-500/50' : 'bg-violet-500/20 group-hover/item:bg-violet-500/50'}`} />
                  </div>
                </div>

                {/* Content Side */}
                <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pl-12' : 'lg:pr-12'} relative z-20`}>
                  <div className="relative">
                    {item.link && (
                      item.link.startsWith('http') ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-30 cursor-pointer"
                          aria-label={`View details for ${item.title}`}
                        />
                      ) : (
                        <Link
                          href={item.link}
                          className="absolute inset-0 z-30 cursor-pointer"
                          aria-label={`View details for ${item.title}`}
                        />
                      )
                    )}
                    <div className={`group relative p-8 rounded-[32px] border backdrop-blur-xl transition-all duration-700 hover:-translate-y-2 overflow-hidden shadow-2xl ${
                      isWork 
                        ? 'border-blue-500/30 bg-blue-500/[0.04] hover:border-blue-500/50 shadow-blue-500/5' 
                        : 'border-violet-500/30 bg-violet-500/[0.04] hover:border-violet-500/50 shadow-violet-500/5'
                    } ${item.link ? 'hover:scale-[1.02] cursor-pointer active:scale-[0.98]' : ''}`}>
                      {/* Left Accent Line */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-700 group-hover:w-1.5 ${isWork ? 'bg-blue-500/50' : 'bg-violet-500/50'}`} />

                      {/* Background Pattern - subtle stardust */}
                      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] group-hover:opacity-[0.04] transition-opacity" />
                      
                      {/* Ambient Glow - More Obvious on Hover */}
                      <div className={`absolute -right-20 -top-20 h-64 w-64 bg-linear-to-br ${item.gradient} to-transparent blur-[90px] opacity-0 group-hover:opacity-100 transition-all duration-1000`} />
                      
                      <div className="flex flex-col gap-4 relative z-10">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            {/* Enhanced Category Badge */}
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                              isWork 
                                ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20' 
                                : 'bg-violet-500/10 border-violet-500/20 text-violet-400 group-hover:bg-violet-500/20'
                            }`}>
                              {isWork ? <Briefcase size={10} /> : <Users size={10} />}
                              {isWork ? 'Professional Work' : 'Mentoring Experience'}
                            </div>
                            
                            <div className={`h-1 w-1 rounded-full ${isWork ? 'bg-blue-500/40' : 'bg-violet-500/40'}`} />
                          <span className={`text-xs font-bold tracking-[0.2em] transition-colors duration-700 ${isWork ? 'text-blue-400/40 group-hover:text-blue-400/80' : 'text-violet-400/40 group-hover:text-violet-400/80'}`}>
                            {item.year}
                          </span>

                          {item.link && (
                            <>
                              <div className={`h-1 w-1 rounded-full ${isWork ? 'bg-blue-500/40' : 'bg-violet-500/40'}`} />
                              <div className="inline-flex items-center gap-1.5 overflow-hidden">
                                <span className={`text-[10px] font-black uppercase tracking-widest transition-all duration-500 underline decoration-white/20 underline-offset-4 ${isWork ? 'text-blue-400 group-hover:text-white' : 'text-violet-400 group-hover:text-white'}`}>
                                  点击查看
                                </span>
                                <span className={`text-sm transition-all duration-500 transform translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 ${isWork ? 'text-blue-300' : 'text-violet-300'}`}>
                                  ↗
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white group-hover:text-white transition-colors duration-500 leading-tight tracking-tight">
                        {item.title}
                      </h3>
                      
                      <p className="text-base leading-relaxed text-white/40 group-hover:text-white/70 transition-colors duration-700">
                        {item.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.tags.map(tag => (
                          <span key={tag} className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border transition-all duration-500 bg-white/5 border-white/10 text-white/30 group-hover:text-white group-hover:border-white/40 bg-linear-to-br ${item.gradient.replace('/20', '/15')} group-hover:${item.gradient.replace('/20', '/40')} shadow-inner`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              </div>
              
              {/* Spacing for desktop */}
              <div className="hidden lg:block h-12" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
