const feedbacks = [
  {
    name: "Alice L.",
    role: "Frontend Developer",
    note: "Landed a React role after shipping the capstone project and polishing the portfolio.",
  },
  {
    name: "David Z.",
    role: "Full-stack Engineer",
    note: "Understood end-to-end flows from API to UI and can now scope features confidently.",
  },
  {
    name: "Mandy C.",
    role: "Mobile Developer",
    note: "Expo + React Native stack finally clicked after pairing sessions and code reviews.",
  },
  {
    name: "Leo W.",
    role: "Cloud Engineer",
    note: "Deploying to Azure with CI/CD went from mystery to a checklist I can repeat at work.",
  },
];

const stats = [
  {
    value: "100+",
    label: "Students taught",
    gradient: "from-violet-400 to-fuchsia-400",
  },
  {
    value: "1000+",
    label: "XHS fans",
    gradient: "from-teal-300 to-emerald-400",
  },
  {
    value: "4+",
    label: "Years Of experience",
    gradient: "from-pink-400 to-rose-400",
  },
  {
    value: "5",
    label: "Tracks Of coding courses",
    gradient: "from-amber-300 to-orange-400",
  },
];

export default function FeedbackPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Feedback
        </p>
        <h1 className="text-4xl font-semibold md:text-5xl">
          Why Learners Trust Our IT Programs
        </h1>
        <p className="max-w-3xl text-lg text-white/70">
          From first lines of code to real job offers — hear directly from
          learners who turned practical IT skills into confidence, portfolios,
          and career opportunities.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
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
        {feedbacks.map((item) => (
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
            WeChat
          </p>
          <h2 className="text-2xl font-semibold text-white">微信截图预留区</h2>
          <p className="text-sm text-white/70 max-w-3xl">
            把聊天反馈截图放到{" "}
            <code className="rounded bg-white/10 px-1">/public</code>{" "}
            目录，命名为{" "}
            <code className="rounded bg-white/10 px-1">
              wechat-feedback.png
            </code>{" "}
            或者你喜欢的文件名，然后用{" "}
            <code className="rounded bg-white/10 px-1">&lt;Image&gt;</code>{" "}
            替换下面的占位。
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-dashed border-emerald-400/60 bg-emerald-500/5 p-4">
          <div className="flex items-center justify-between gap-3 text-sm text-emerald-100">
            <span>Screenshot placeholder</span>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold">
              Drop-in ready
            </span>
          </div>
          <div className="flex h-64 items-center justify-center rounded-lg border border-white/10 bg-black/60 text-sm text-white/50">
            在这里放微信截图
          </div>
        </div>
      </div>
    </section>
  );
}
