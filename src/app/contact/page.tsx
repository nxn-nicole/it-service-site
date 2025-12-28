const contactMethods = [
  {
    label: "Email",
    value: "hello@example.com",
    hint: "适合发送简历、项目资料或课程合作",
  },
  {
    label: "WeChat",
    value: "wechat-id-here",
    hint: "加好友备注“课程咨询”或“项目讨论”",
  },
  {
    label: "Calendly",
    value: "15-30 min 聊天",
    hint: "用于规划学习路径或职业建议的简短会谈",
  },
];

export default function ContactPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Contact
        </p>
        <h1 className="text-4xl font-semibold md:text-5xl">
          Let&apos;s talk about your next step.
        </h1>
        <p className="max-w-3xl text-lg text-white/70">
          Courses, project mentoring, or career planning inquiries can all be
          handled through the channels below. Simply choose the option that best
          fits your situation.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {contactMethods.map((method) => (
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
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>
              When reaching out, briefly share your background and goals — it
              helps us give more relevant advice faster.
            </span>
          </li>

          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>
              If you’re looking for 1-on-1 guidance or a mock interview, feel
              free to suggest a time directly in your message.
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
