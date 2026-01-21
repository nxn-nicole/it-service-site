import Image from "next/image";
import content from "./content.json";
import Gallery from "./Gallery";

const projectLink = "https://blotztaskapp.webflow.io/#Home";

export default function ProjectsPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          {content.hero.eyebrow}
        </p>
        <h1 className="flex gap-3 text-4xl font-semibold md:text-5xl items-end">
          <a
            href={projectLink}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex rounded-xl transition-transform duration-300"
          >
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-[#95CFEA]/25 opacity-0 blur transition duration-300 group-hover:opacity-100" />
            <Image
              src="/blotz-icon.png"
              alt="Blotz"
              width={80}
              height={80}
              className="rounded-xl transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_#95CFEA]"
            />
          </a>
          <span>{content.hero.title}</span>
        </h1>
        <p className="max-w-3xl text-lg text-white/70">
          {content.hero.description}
        </p>
      </div>

      <div className="flex flex-col gap-6 border border-white/10 p-8 rounded-2xl">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-white/60">
              你将学到什么
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {content.learn.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-white/60">
              适合谁
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {content.audience.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.stackSummary.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-8 space-y-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            社区
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Blotz 社区固定活动
          </h2>
          <p className="text-sm text-white/70 max-w-3xl">
            我们如何保持联系、分享知识，并像真实团队一样推进项目。
            选择适合你时间的活动参与即可。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {content.communityEvents.map((event) => (
            <article
              key={event.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-sm text-white/60">{event.cadence}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                  {event.badge}
                </span>
              </div>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                {event.detail}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            图集
          </p>
          <h2 className="text-3xl font-semibold text-white">项目瞬间</h2>
          <p className="text-sm text-white/70">
            把你的活动照片放到{" "}
            <code className="rounded bg-white/10 px-1">/public</code>{" "}
            并使用下方的文件名，然后左右滑动浏览精彩瞬间。
          </p>
        </div>

        <Gallery items={content.gallery} />
      </div>
    </section>
  );
}
