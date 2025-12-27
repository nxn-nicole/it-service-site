const courses = [
  {
    title: "Git",
    modules: [
      {
        title: "Module 0 - Git & GitHub Basics",
        duration: "3h",
        description:
          "Learn essential Git commands and collaborative workflows using GitHub.",
      },
    ],
  },
  {
    title: "Frontend",
    modules: [
      {
        title: "Module 0 - Frontend Basics",
        duration: "4h",
        description:
          "Understand core frontend concepts including HTML, CSS, and basic React fundamentals.",
      },
      {
        title: "Module 1 - Next.js",
        duration: "6h",
        description:
          "Build modern web applications using Next.js with routing, layouts, and static rendering.",
      },
      {
        title: "Module 2 - ShadCN",
        duration: "3h",
        description:
          "Create consistent and accessible UI using ShadCN and Tailwind CSS.",
      },
      {
        title: "Module 3 - React Hook Form",
        duration: "3h",
        description:
          "Handle complex forms with validation and performance optimization.",
      },
      {
        title: "Module 4 - TanStack Query",
        duration: "4h",
        description:
          "Manage server state efficiently with caching, mutations, and async data flows.",
      },
    ],
  },
  {
    title: "Mobile App",
    modules: [
      {
        title: "Module 0 - Basic React Native and Expo",
        duration: "4h",
        description:
          "Learn the fundamentals of building cross-platform mobile apps with Expo.",
      },
      {
        title: "Module 1 - Build a Mobile Todo App",
        duration: "6h",
        description:
          "Apply React Native concepts by building a complete Todo application.",
      },
    ],
  },
  {
    title: "Backend",
    modules: [
      {
        title: "Module 0 - Basic C# & .NET",
        duration: "4h",
        description:
          "Understand C# syntax and the fundamentals of the .NET ecosystem.",
      },
      {
        title: "Module 1 - EF Core & Database",
        duration: "5h",
        description:
          "Work with relational databases using Entity Framework Core.",
      },
      {
        title: "Module 2 - Database Communication",
        duration: "4h",
        description:
          "Implement data access patterns and repository-based communication.",
      },
      {
        title: "Module 3 - Frontend Communication",
        duration: "4h",
        description: "Expose APIs and handle frontend-backend data exchange.",
      },
      {
        title: "Module 4 - Domain Relation",
        duration: "4h",
        description:
          "Design clean domain models and manage entity relationships.",
      },
      {
        title: "Module 5 - CQRS",
        duration: "5h",
        description:
          "Apply CQRS to separate read and write responsibilities for scalable systems.",
      },
    ],
  },
  {
    title: "Cloud Infrastructure",
    modules: [
      {
        title: "Module 0 - Cloud Basics",
        duration: "4h",
        description:
          "Learn cloud fundamentals including deployment, environments, and scalability concepts.",
      },
    ],
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
