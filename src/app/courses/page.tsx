import Image from "next/image";
import content from "./content.json";

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

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {content.courses.map((course) => (
          <article
            key={course.title}
            className="group overflow-hidden rounded-[20px] border border-white/10 bg-[#0d0f18] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition hover:-translate-y-1 hover:border-white/20"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
              />
            </div>

            <div className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">
                  {course.title}
                </h2>
                {course.duration && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    {course.duration}
                  </span>
                )}
              </div>
              <p className="text-sm text-white/75">{course.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
