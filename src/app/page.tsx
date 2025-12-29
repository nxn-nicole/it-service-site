import Image from "next/image";
import {
  BadgeDollarSign,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";
import content from "./content.json";

export default function IntroductionPage() {
  const goalIcons = [Users, BadgeDollarSign, GraduationCap, ShieldCheck];
  const iconColors = [
    "text-amber-300",
    "text-emerald-300",
    "text-sky-300",
    "text-pink-300",
  ];

  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          {content.hero.eyebrow}
        </p>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          {content.hero.title}
        </h1>
        <p className="max-w-3xl text-lg text-white/70">
          {content.hero.subtitle}
        </p>
      </div>

      <a
        href="https://www.xiaohongshu.com/user/profile/615c36cd0000000002023df7?xsec_token=ABfwKVM6jH222sFPOPxFMLO4t1WgO79rOnQKRJGj4UmOE%3D&xsec_source=pc_search"
        target="_blank"
        rel="noreferrer"
        className="group block w-8/9 rounded-2xl border border-white/15 bg-white/5 p-6 transition-colors hover:border-white focus-visible:border-white active:border-white"
      >
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <Image
            src="/profile-photo.webp"
            alt="Profile photo"
            width={120}
            height={120}
            className="h-28 w-28 rounded-full object-cover border border-white/15"
          />
          <div className="space-y-3">
            <p className="text-lg font-semibold">{content.profile.title}</p>
            <div className="space-y-3 text-sm text-white/80">
              {content.profile.bullets.map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-3 rounded-lg"
                >
                  <span
                    className={`mt-1 h-2.5 w-2.5 rounded-full ${item.color}`}
                  />
                  <p className="leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </a>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black px-6 py-12 shadow-[0_10px_50px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.04),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.03),transparent_32%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.04),transparent_30%)]" />
        <div className="relative mx-auto max-w-5xl space-y-10 text-center">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              {content.goal.eyebrow}
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              {content.goal.title}
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/80">
              {content.goal.description}
            </p>
          </div>

          <div className="grid gap-12 text-left md:grid-cols-2">
            {content.goal.pillars.map((item, index) => {
              const Icon = goalIcons[index % goalIcons.length];
              const color = iconColors[index % iconColors.length];

              return (
                <div key={item.label} className="flex gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                    <Icon className={`h-6 w-6 ${color}`} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-lg font-semibold text-white">
                      {item.label}
                    </p>
                    <p className="text-sm leading-relaxed text-white/80">
                      {item.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
