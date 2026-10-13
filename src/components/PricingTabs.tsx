"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import WeChatModal from "@/components/WeChatModal";
import { Reveal, spring } from "@/components/kit";
import { buttonGhostClass, buttonLimeClass, cardFrameClass } from "@/components/styles";

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

// Overshoots a little before settling, so the cards land with a small pop.
const popEase = [0.34, 1.56, 0.64, 1] as const;

export default function PricingTabs({ tiers }: PricingTabsProps) {
  const [active, setActive] = useState(0);
  // Counts tab changes. The cards are keyed on it, so they pop each time.
  const [picks, setPicks] = useState(0);
  const product = products[active];

  const pick = (i: number) => {
    if (i === active) return;
    setActive(i);
    setPicks((n) => n + 1);
  };

  return (
    <div className="space-y-8">
      {/* Tab toggle: the lime thumb slides under the chosen one */}
      <div className="relative grid w-full max-w-xs grid-cols-2 rounded-full border-2 border-brand-ink bg-white p-1 shadow-[0_4px_0_0_var(--color-brand-ink)]">
        <motion.div
          aria-hidden
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full border-2 border-brand-ink bg-brand-lime"
          initial={false}
          animate={{ x: `${active * 100}%` }}
          transition={spring}
        />
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => pick(i)}
            aria-pressed={active === i}
            className="relative z-10 cursor-pointer rounded-full px-3 py-2.5 text-[15px] font-black"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Tier cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier, i) => {
          const featured = tier.highlight;

          return (
            <Reveal key={tier.name} delay={i * 0.07} className="h-full">
              <motion.div
                key={picks}
                initial={picks === 0 ? false : { scale: 0.93, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, ease: popEase, delay: i * 0.05 }}
                className={`${cardFrameClass} flex h-full flex-col overflow-hidden ${
                  featured ? "bg-brand-lime-soft" : "bg-white"
                }`}
              >
                {featured && tier.badge && (
                  <div className="border-b-2 border-brand-ink bg-brand-lime py-2 text-center text-sm font-black tracking-[0.15em]">
                    {tier.badge}
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-7 p-6 lg:p-8">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-2xl font-black tracking-tight">{tier.name}</h3>
                    {tier.tag && (
                      <span
                        className={`inline-flex items-center rounded-full border-2 border-brand-ink px-3 py-0.5 text-[13px] font-black ${
                          featured ? "bg-brand-purple text-white" : "bg-brand-yellow"
                        }`}
                      >
                        {tier.tag}
                      </span>
                    )}
                  </div>

                  <ul className="flex-1 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-base leading-snug">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-brand-ink bg-brand-lime">
                          <Check className="h-3 w-3" strokeWidth={4} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <WeChatModal wechatId="Azdev0189" source="handbook" note={product.note(tier.name)}>
                    <div className={`${featured ? buttonLimeClass : buttonGhostClass} w-full`}>
                      {tier.cta} <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </WeChatModal>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
