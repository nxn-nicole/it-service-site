import Image from "next/image";

export default function IntroductionPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Introduction
        </p>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          Build real-world skills.
        </h1>
        <p className="max-w-3xl text-lg text-white/70">
          Master software development by building real-world projects that
          prepare you for the job.
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
            <p className="text-lg font-semibold">澳洲软体工程师</p>
            <div className="space-y-3 text-sm text-white/80">
              {[
                {
                  color: "bg-pink-600",
                  text: "UTS graduate with 3+ years of IT consulting experience in Australia",
                },
                {
                  color: "bg-amber-600",
                  text: "Passionate about teaching, knowledge sharing, and collaborative project development",
                },
                {
                  color: "bg-emerald-600",
                  text: "Focused on .NET, full-stack engineering, and cloud-based solutions",
                },
                {
                  color: "bg-sky-600",
                  text: "Actively sharing insights on working in Australia, international student life, and career transitions into tech",
                },
              ].map((item) => (
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

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-8 shadow-[0_10px_50px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,0.08),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.08),transparent_32%),radial-gradient(circle_at_60%_80%,rgba(56,189,248,0.06),transparent_30%)]" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 md:max-w-xl text-center md:text-left mx-auto md:mx-0">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Goal
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Goal for my services
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              Get you closer to the way real teams work: production habits,
              collaboration patterns, and the core software concepts that make
              you confident shipping to employers.
            </p>
          </div>
          <div className="grid w-full max-w-md grid-cols-2 gap-3 rounded-xl p-4 md:w-auto">
            {[
              {
                label: "Workplace readiness",
                note: "Code, review, and ship like a team member",
              },
              {
                label: "Concept mastery",
                note: "Patterns, architecture, testing, delivery",
              },
              { label: "Collaboration", note: "PRs, design docs, async comms" },
              {
                label: "Confidence",
                note: "From first commit to production deploys",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/80"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  {item.label}
                </p>
                <p className="mt-1 leading-snug">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
