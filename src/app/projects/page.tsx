const projects = [
  {
    title: "Service Dashboard",
    status: "Live demo",
    description: "Ticket tracking, SLAs, and live metrics on a black UI shell.",
  },
  {
    title: "Course Catalog",
    status: "In review",
    description: "Filterable, searchable list with hover previews and tags.",
  },
  {
    title: "Portfolio Grid",
    status: "Prototype",
    description: "Responsive cards that spotlight results and impact quickly.",
  },
];

export default function ProjectsPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Projects
        </p>
        <h1 className="text-4xl font-semibold md:text-5xl">
          Explore featured builds and case studies.
        </h1>
        <p className="max-w-3xl text-lg text-white/70">
          See how the layout adapts to different use cases and content types.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30"
          >
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>{project.status}</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400/60" />
            </div>
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-sm text-white/70">{project.description}</p>
            <a
              className="mt-auto w-fit text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              href="#"
            >
              View project
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
