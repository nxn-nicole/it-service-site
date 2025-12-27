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
        title: "Azure Fundamentals - Overview",
        duration: "1h",
        description:
          "Get a high-level overview of Azure services and cloud architecture concepts.",
      },
      {
        title: "Module 0 - Azure Setup",
        duration: "2h",
        description:
          "Set up an Azure account and configure the development environment.",
      },
      {
        title: "Module 1 - Azure Introduction",
        duration: "3h",
        description:
          "Understand core Azure services and how they fit into real-world applications.",
      },
      {
        title: "Module 2 - Deploy to Web App",
        duration: "4h",
        description:
          "Deploy a web application to Azure App Service using best practices.",
      },
      {
        title: "Module 3 - Deploy to SQL Database",
        duration: "4h",
        description:
          "Provision and connect an Azure SQL Database for production workloads.",
      },
      {
        title: "Module 4 - Automate Web App Deployment (CI/CD)",
        duration: "5h",
        description:
          "Automate build and deployment pipelines using Azure CI/CD workflows.",
      },
      {
        title: "Module 5 - Azure Key Vault",
        duration: "3h",
        description: "Secure secrets and configuration using Azure Key Vault.",
      },
    ],
  },
];

const moduleColors = [
  "bg-pink-400",
  "bg-emerald-400",
  "bg-amber-400",
  "bg-sky-400",
  "bg-purple-400",
  "bg-rose-400",
];

export default function CoursesPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Courses
        </p>
        <h1 className="text-4xl font-semibold md:text-5xl">
          Track-based learning, module by module.
        </h1>
        <p className="max-w-3xl text-lg text-white/70">
          Each track is broken down into focused modules with clear outcomes and
          time guidance.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {courses.map((course, courseIndex) => (
          <article
            key={course.title}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-6 shadow-lg shadow-black/30"
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
