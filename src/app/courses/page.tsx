const courses = [
  {
    title: "React & TypeScript",
    duration: "12h",
    level: "Intermediate",
    description: "Modern frontend stacks, hooks, and type-safe patterns.",
  },
  {
    title: "Python Foundations",
    duration: "10h",
    level: "Beginner",
    description: "Clean syntax, scripting skills, and automation basics.",
  },
  {
    title: "AI-Powered Apps",
    duration: "8h",
    level: "Advanced",
    description: "Ship smart features with API-first AI integrations.",
  },
];

export default function CoursesPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Courses
        </p>
        <h1 className="text-4xl font-semibold md:text-5xl">
          Master software development, step by step.
        </h1>
        <p className="max-w-3xl text-lg text-white/70">
          Structured paths with focused lessons, hands-on practice, and clean
          explanations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {courses.map((course) => (
          <article
            key={course.title}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30"
          >
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>{course.level}</span>
              <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-white">
                {course.duration}
              </span>
            </div>
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-sm text-white/70">{course.description}</p>
            <button className="mt-auto w-fit rounded-full bg-white text-black px-4 py-2 text-sm font-semibold transition hover:bg-white/90">
              View details
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
