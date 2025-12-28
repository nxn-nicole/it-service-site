import content from "./content.json";

const moduleColors = [
  "bg-pink-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-sky-600",
  "bg-purple-600",
  "bg-rose-600",
];

export default function CoursesPage() {
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

      <div className="columns-1 gap-6 space-y-6 lg:columns-2">
        {content.courses.map((course, courseIndex) => (
          <article
            key={course.title}
            className="mb-6 inline-block w-full break-inside-avoid rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-6 shadow-lg shadow-black/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-sm text-white/60">
                  {course.modules.length} module
                  {course.modules.length > 1 ? "s" : ""} · Practical exercises
                  and demos
                </p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                Track {courseIndex + 1}
              </span>
            </div>

            <div className="space-y-4">
              {course.modules.map((module, moduleIndex) => (
                <div
                  key={module.title}
                  className="flex gap-3 rounded-xl border border-white/5 bg-black/40 p-4"
                >
                  <span
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                      moduleColors[moduleIndex % moduleColors.length]
                    }`}
                  />
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">{module.title}</p>
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/80">
                        {module.duration}
                      </span>
                    </div>
                    <p className="text-sm text-white/70">
                      {module.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
