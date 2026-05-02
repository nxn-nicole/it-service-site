"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import WeChatModal from "@/components/WeChatModal";

interface Tier {
  name: string;
  tag?: string;
  highlight: boolean;
  badge?: string;
  features: string[];
  cta: string;
}

interface PricingTabsProps {
  tiers: Tier[];
}

const products = [
  { id: "fullstack", label: "全栈手册", note: (tier: string) => `全栈手册 - ${tier}` },
  { id: "cloud",     label: "云服务手册", note: (tier: string) => `云服务手册 - ${tier}` },
];

export default function PricingTabs({ tiers }: PricingTabsProps) {
  const [active, setActive] = useState(0);
  const product = products[active];

  return (
    <div className="space-y-8">
      {/* Tab toggle */}
      <div className="flex items-center gap-2 p-1 rounded-full bg-white/4 border border-white/8 w-fit">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              active === i
                ? "bg-violet-600 text-white shadow-[0_2px_12px_rgba(139,92,246,0.4)]"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Tier cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col gap-8 rounded-[32px] border transition-all duration-300 overflow-hidden ${
              tier.highlight
                ? "border-violet-500/40 bg-violet-500/8 shadow-[0_0_60px_rgba(139,92,246,0.15)]"
                : "border-white/8 bg-white/2"
            }`}
          >
            {tier.highlight && tier.badge && (
              <div className="w-full py-1.5 bg-linear-to-r from-violet-600/80 to-indigo-600/80 text-center text-[11px] font-black tracking-[0.15em] text-white/90 uppercase">
                {tier.badge}
              </div>
            )}

            <div className={`flex flex-col gap-8 flex-1 ${tier.highlight && tier.badge ? "px-8 pb-8" : "p-8"}`}>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className={`text-2xl font-bold ${tier.highlight ? "text-white" : "text-white/80"}`}>
                  {tier.name}
                </h3>
                {tier.tag && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide ${
                    tier.highlight
                      ? "bg-violet-500/25 border border-violet-500/40 text-violet-300"
                      : "bg-white/6 border border-white/12 text-white/45"
                  }`}>
                    {tier.tag}
                  </span>
                )}
              </div>

              <ul className="flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/60">
                    <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <WeChatModal wechatId="Azdev0189" source="handbook" note={product.note(tier.name)}>
                <div
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[14px] font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer ${
                    tier.highlight
                      ? "bg-violet-600 hover:bg-violet-500 text-white shadow-[0_6px_24px_rgba(139,92,246,0.35)] hover:shadow-[0_10px_32px_rgba(139,92,246,0.5)]"
                      : "border border-white/10 bg-white/5 hover:bg-white/8 text-white/70 hover:text-white"
                  }`}
                >
                  {tier.cta} <ArrowUpRight className="h-4 w-4" />
                </div>
              </WeChatModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
