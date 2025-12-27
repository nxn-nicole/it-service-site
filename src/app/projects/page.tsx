export default function ProjectsPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Projects
        </p>
        <h1 className="flex gap-3 text-4xl font-semibold md:text-5xl items-end">
          <Image
            src="/blotz-icon.png"
            alt="Blotz"
            width={80}
            height={80}
            className="rounded-xl"
          />
          <span>– A Real Full-Stack Product</span>
        </h1>
        <p className="max-w-3xl text-lg text-white/70">
          Blotz is a production-level full-stack application built from scratch
          and continuously iterated. It reflects how modern apps are structured,
          developed, and scaled in real teams.
        </p>
      </div>

      <div className="flex flex-col gap-6 border border-white/10 p-8 rounded-2xl">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-white/60">
              What you can learn
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {[
                "Real frontend architecture and state management",
                "Clean backend API design and business logic",
                "Database modeling and migrations",
                "Authentication, authorization, and user management",
                "Cloud deployment and environment configuration",
                "Debugging, monitoring, and iteration in production",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-white/60">
              Who this is for
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {[
                "Developers who want real project experience",
                "Career switchers preparing for industry roles",
                "Students who want to go beyond classroom theory",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Frontend", value: "React / React Native" },
            { label: "Backend", value: ".NET / .NET Core" },
            { label: "Database", value: "SQL-based relational" },
            { label: "Cloud", value: "Microsoft Azure" },
            { label: "Focus", value: "Production-grade, iterated" },
            { label: "Mode", value: "Full-stack, end-to-end" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
