import content from "./content.json";

export default function ContactPage() {
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

      <div className="grid gap-4 md:grid-cols-2">
        {content.contactMethods.map((method) => (
          <div
            key={method.label}
            className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-6 shadow-lg shadow-black/25"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{method.label}</h2>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                Preferred
              </span>
            </div>
            <p className="mt-2 text-xl font-semibold text-white">
              {method.value}
            </p>
            <p className="mt-2 text-sm text-white/70">{method.hint}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
        <h2 className="text-2xl font-semibold text-white">Quick tips</h2>
        <ul className="mt-4 space-y-2 text-sm text-white/75">
          {content.tips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
