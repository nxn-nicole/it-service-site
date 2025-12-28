import Image from "next/image";
import content from "./content.json";

export default function ProjectsPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          {content.hero.eyebrow}
        </p>
        <h1 className="flex gap-3 text-4xl font-semibold md:text-5xl items-end">
          <Image
            src="/blotz-icon.png"
            alt="Blotz"
            width={80}
            height={80}
            className="rounded-xl"
          />
          <span>{content.hero.title}</span>
        </h1>
        <p className="max-w-3xl text-lg text-white/70">
          {content.hero.description}
        </p>
      </div>

      <div className="flex flex-col gap-6 border border-white/10 p-8 rounded-2xl">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-white/60">
              What you can learn
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {content.learn.map((item) => (
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
              {content.audience.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.stackSummary.map((item) => (
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

      <div className="rounded-2xl border border-white/10 bg-black/40 p-8 space-y-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Community
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Blotz community rituals
          </h2>
          <p className="text-sm text-white/70 max-w-3xl">
            How we stay connected, swap knowledge, and keep the project moving
            like a real team. Join the sessions that fit your schedule.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {content.communityEvents.map((event) => (
            <article
              key={event.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-sm text-white/60">{event.cadence}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                  {event.badge}
                </span>
              </div>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                {event.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
