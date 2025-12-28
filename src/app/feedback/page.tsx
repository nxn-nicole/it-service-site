import content from "./content.json";

export default function FeedbackPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          {content.hero.eyebrow}
        </p>
        <h1 className="text-4xl font-semibold md:text-5xl">
          {content.hero.title}
        </h1>
        <p className="max-w-3xl text-lg text-white/70">
          {content.hero.subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {content.stats.map((item) => (
          <div
            key={item.label}
            className="relative overflow-hidden rounded-2xl border-t p-6 text-center"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.gradient} opacity-70`}
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
        {content.feedbacks.map((item) => (
          <article
            key={item.name}
            className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-6 shadow-lg shadow-black/20"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {item.name}
                </h3>
                <p className="text-sm text-emerald-300/90">{item.role}</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                Student
              </span>
            </div>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              {item.note}
            </p>
          </article>
        ))}
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            {content.wechat.eyebrow}
          </p>
          <h2 className="text-2xl font-semibold text-white">
            {content.wechat.title}
          </h2>
          <p className="text-sm text-white/70 max-w-3xl">
            {content.wechat.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-dashed border-emerald-400/60 bg-emerald-500/5 p-4">
          <div className="flex items-center justify-between gap-3 text-sm text-emerald-100">
            <span>Screenshot placeholder</span>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold">Drop-in ready</span>
          </div>
          <div className="flex h-64 items-center justify-center rounded-lg border border-white/10 bg-black/60 text-sm text-white/50">
            {content.wechat.placeholder}
          </div>
        </div>
      </div>
    </section>
  );
}
