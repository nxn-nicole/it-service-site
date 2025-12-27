import Image from "next/image";

export default function IntroductionPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Introduction
        </p>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          Build real-world skills.
        </h1>
        <p className="max-w-3xl text-lg text-white/70">
          Master software development by building real-world projects that
          prepare you for the job.
        </p>
      </div>
      <a
        href="https://www.xiaohongshu.com/user/profile/615c36cd0000000002023df7?xsec_token=ABfwKVM6jH222sFPOPxFMLO4t1WgO79rOnQKRJGj4UmOE%3D&xsec_source=pc_search"
        target="_blank"
        rel="noreferrer"
        className="group block w-8/9 rounded-2xl border border-white/15 bg-white/5 p-6 transition-colors hover:border-white focus-visible:border-white active:border-white"
      >
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <Image
            src="/profile-photo.webp"
            alt="Profile photo"
            width={120}
            height={120}
            className="h-28 w-28 rounded-full object-cover border border-white/15"
          />
          <div className="space-y-3">
            <p className="text-lg font-semibold">澳洲软体工程师</p>
            <div className="space-y-3 text-sm text-white/80">
              {[
                {
                  color: "bg-pink-600",
                  text: "UTS graduate with 3+ years of IT consulting experience in Australia",
                },
                {
                  color: "bg-amber-600",
                  text: "Passionate about teaching, knowledge sharing, and collaborative project development",
                },
                {
                  color: "bg-emerald-600",
                  text: "Focused on .NET, full-stack engineering, and cloud-based solutions",
                },
                {
                  color: "bg-sky-600",
                  text: "Actively sharing insights on working in Australia, international student life, and career transitions into tech",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-3 rounded-lg"
                >
                  <span
                    className={`mt-1 h-2.5 w-2.5 rounded-full ${item.color}`}
                  />
                  <p className="leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </a>
    </section>
  );
}
