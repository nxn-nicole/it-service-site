import Image from "next/image";
import {
  BadgeDollarSign,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";
import content from "./content.json";
import Gallery from "./projects/Gallery";

export default function IntroductionPage() {
  const goalIcons = [Users, BadgeDollarSign, GraduationCap, ShieldCheck];

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
        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-8 shadow-[0_15px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm transition hover:border-white/25 hover:shadow-[0_22px_70px_rgba(0,0,0,0.6)]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-70 blur-3xl bg-[radial-gradient(circle_at_10%_20%,rgba(99,102,241,0.4),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.35),transparent_32%),radial-gradient(circle_at_60%_80%,rgba(251,191,36,0.35),transparent_28%)]" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5 md:gap-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/35 to-transparent opacity-70 blur-xl transition duration-500 group-hover:opacity-100" />
              <Image
                src="/profile-photo.webp"
                alt="Profile photo"
                width={128}
                height={128}
                className="relative h-32 w-32 rounded-2xl border border-white/15 object-cover shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                Profile
              </p>
              <p className="text-2xl font-semibold leading-tight">
                {content.profile.title}
              </p>
              <p className="text-sm text-white/70">
                IT Consulting & Mentorship
              </p>
            </div>
          </div>

          <div className="relative w-full max-w-xl space-y-3 md:w-auto">
            {content.profile.bullets.map((item) => (
              <div
                key={item.text}
                className="relative flex gap-4 rounded-lg border border-white/5 bg-white/5 px-4 py-3 shadow-sm shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:border-white/20"
              >
                <span
                  className={`relative mt-1 h-2.5 w-2.5 rounded-full ring-4 ring-white/10 ${item.color}`}
                />
                <p className="text-sm leading-relaxed text-white/80">
                  {item.text}
                </p>
              </div>
            ))}
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
              const color = item.color ?? "text-white";

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

      <div className="space-y-10 rounded-2xl p-8">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60 text-center">
            {content.feedback.hero.eyebrow}
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between text-center">
            <h2 className="text-4xl font-semibold md:text-4xl">
              {content.feedback.hero.title}
            </h2>
            <p className="max-w-3xl text-base text-white/75 md:text-lg">
              {content.feedback.hero.subtitle}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 my-20">
          {content.feedback.stats.map((item) => (
            <div
              key={item.label}
              className="relative overflow-hidden rounded-2xl bg-black/40 p-5 text-center"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.gradient} opacity-80`}
              />
              <div
                className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}`}
              >
                {item.value}
              </div>
              <p className="mt-2 text-sm text-white/75">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {content.feedback.feedbacks.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-6 shadow-lg shadow-black/20"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {item.name}
                    </h3>
                    <div
                      className="flex gap-1"
                      aria-label="5-star rating"
                      role="img"
                    >
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span
                          key={idx}
                          className="flex h-5 w-5 items-center justify-center rounded-[2px] bg-emerald-500 text-[11px] text-white leading-none"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-emerald-300/90">{item.role}</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  Student
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                {item.note}
              </p>
            </article>
          ))}
        </div>

        <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              {content.feedback.wechat.eyebrow}
            </p>
            <h3 className="text-2xl font-semibold text-white">
              {content.feedback.wechat.title}
            </h3>
            <p className="text-sm text-white/70 max-w-3xl">
              {content.feedback.wechat.description}
            </p>
          </div>

          <Gallery
            items={content.feedback.wechat.gallery.map((item) => ({
              src: item.src,
              title: item.title,
              caption: item.caption,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
