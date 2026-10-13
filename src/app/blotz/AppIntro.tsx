import Image from "next/image";
import { ExternalLink, Linkedin } from "lucide-react";
import { Band, Clauses, CountUp, Reveal, SectionHeading } from "@/components/kit";
import { cardClass, liftClass } from "@/components/styles";
import content from "./content.json";

/* The first thing a visitor wants to know: what is this project? The app
   itself, real screens from it, and where to check it for yourself. */

const pillClass =
  "inline-flex items-center gap-1.5 rounded-full border-2 border-brand-ink px-3.5 py-1.5 text-sm font-black shadow-[0_3px_0_0_var(--color-brand-ink)] xl:gap-2 xl:px-4 xl:py-2 xl:text-base";

const appStoreUrl = "https://apps.apple.com/au/app/blotztask-adhd-time-manager/id6752492404";
const appleLogo =
  "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701";

// The app's mascot, a steamed bun. The face is cut out of the shape, so whatever is behind shows through.
const bunFaces = {
  happy:
    "M41.1797 16C43.872 16.0001 46.0546 18.1833 46.0547 20.876C46.0547 22.5163 46.1907 24.3737 47.2627 25.6152C50.2142 29.0329 52 33.487 52 38.3574C51.9997 49.1279 43.2692 50.0107 32.5 50.0107C21.7308 50.0107 13.0003 49.1279 13 38.3574C13.0001 27.5865 21.7306 18.8546 32.5 18.8545C34.8428 18.8544 37.1371 17.2823 39.2979 16.377C39.8768 16.1344 40.5127 16 41.1797 16ZM38.2412 33.0176C36.081 33.0665 33.6986 33.8956 31.7012 36.2607L32.2734 36.7441L32.8467 37.2275C34.5419 35.2202 36.5051 34.5567 38.2754 34.5166C40.0761 34.4758 41.6944 35.0834 42.6094 35.6406L43.3906 34.3594C42.2689 33.6762 40.3706 32.9693 38.2412 33.0176ZM26.1729 35.3105C24.9499 33.6796 21.3404 30.8175 16.7285 32.6533L17.0049 33.3496L17.2832 34.0469C21.0002 32.5672 23.9544 34.8528 24.9727 36.2109L26.1729 35.3105Z",
  wink:
    "M41.1797 16C43.872 16.0001 46.0546 18.1833 46.0547 20.876C46.0547 22.5163 46.1907 24.3737 47.2627 25.6152C50.2142 29.0329 52 33.487 52 38.3574C51.9997 49.1279 43.2692 50.0107 32.5 50.0107C21.7308 50.0107 13.0003 49.1279 13 38.3574C13.0001 27.5865 21.7306 18.8546 32.5 18.8545C34.8428 18.8544 37.1371 17.2823 39.2979 16.377C39.8768 16.1344 40.5127 16 41.1797 16ZM31 34.9609L35.96 41.2373L37.1367 40.3066L37.5293 39.9971L33.8096 35.2891L37.3398 32.499L37.7324 32.1895L38.5166 31.5693L37.2764 30L31 34.9609ZM19.1553 28.9141L18.7588 29.2178L22.4131 33.9766L18.8438 36.7178L18.4473 37.0225L17.6543 37.6309L18.873 39.2178L25.2178 34.3447L20.3447 28L19.1553 28.9141Z",
};

export function Bun({ face = "happy", className = "" }: { face?: keyof typeof bunFaces; className?: string }) {
  return (
    <svg viewBox="11 14 43 38" className={className} aria-hidden>
      <path
        d={bunFaces[face]}
        fillRule="evenodd"
        className="fill-brand-lime stroke-brand-ink"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`w-[46%] max-w-[250px] rounded-[30px] border-2 border-brand-ink bg-brand-ink p-1.5 shadow-[0_6px_0_0_var(--color-brand-ink)] md:rounded-[38px] md:p-2 ${className}`}
    >
      <Image src={src} alt={alt} width={720} height={1561} className="h-auto w-full rounded-[24px] md:rounded-[30px]" />
    </div>
  );
}

export default function AppIntro() {
  const { app } = content;

  return (
    <Band tone="blue">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <SectionHeading title={app.title} />

          {/* One card, laid out like a store listing: icon, name, what it is, how many use it */}
          <Reveal delay={0.05} className={`${cardClass} @container mt-9 max-w-2xl p-4 min-[380px]:p-5 md:p-7`}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex min-w-0 flex-1 items-center gap-3 min-[380px]:gap-4 md:gap-5">
                <Image
                  src="/blotz/app-icon.png"
                  alt={`${app.name} App`}
                  width={160}
                  height={160}
                  className="h-14 w-14 shrink-0 rounded-[22%] border-2 border-brand-ink min-[380px]:h-[68px] min-[380px]:w-[68px] md:h-[84px] md:w-[84px]"
                />
                <div className="min-w-0">
                  <p className="text-2xl font-black leading-tight md:text-3xl">{app.name}</p>
                  <p className="mt-1 text-[15px] font-bold leading-snug text-brand-muted min-[380px]:text-base md:text-xl">{app.tagline}</p>
                </div>
              </div>

              {/* Beside the name when the card is wide enough, under it when not */}
              {app.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex basis-full items-baseline gap-2 border-t-2 border-dashed border-brand-ink/15 pt-4 @lg:block @lg:basis-auto @lg:border-l-2 @lg:border-t-0 @lg:py-1 @lg:pl-7 @lg:text-center"
                >
                  <span className="block text-base font-bold text-brand-muted @lg:mb-1.5 @lg:text-sm">{stat.before}</span>
                  <CountUp value={stat.value} className="block text-3xl font-black leading-none tracking-tight tabular-nums md:text-4xl" />
                  <span className="block text-base font-bold text-brand-muted @lg:mt-1.5">{stat.label}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 border-t-2 border-dashed border-brand-ink/15 pt-4 text-lg font-bold leading-relaxed md:mt-6 md:pt-5 md:text-xl">
              <Clauses text={app.body} />
            </p>
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-3 lg:gap-2 xl:gap-3">
            {/* Black with a white logo, the way an App Store badge usually looks */}
            <a href={appStoreUrl} target="_blank" rel="noopener noreferrer"
              className={`${pillClass} ${liftClass} bg-brand-ink text-white shadow-[0_3px_0_0_var(--color-brand-muted)]!`}>
              <svg viewBox="0 0 24 24" className="-mt-0.5 h-[18px] w-[18px] fill-current xl:h-5 xl:w-5" aria-hidden>
                <path d={appleLogo} />
              </svg>
              <span>App Store</span>
            </a>
            {/* The Chinese version of the official site */}
            <a href="https://www.blotztask.com/zh" target="_blank" rel="noopener noreferrer"
              className={`${pillClass} ${liftClass} bg-brand-lime`}>
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={3} />
              <span>{app.site}</span>
            </a>
            <a href="https://www.linkedin.com/company/blotz-app/" target="_blank" rel="noopener noreferrer"
              className={`${pillClass} ${liftClass} bg-brand-blue text-white`}>
              <Linkedin className="h-3.5 w-3.5" strokeWidth={3} />
              <span>LinkedIn</span>
            </a>
            <a href="https://www.xiaohongshu.com/user/profile/67bc12d6000000000e01f09a" target="_blank" rel="noopener noreferrer"
              className={`${pillClass} ${liftClass} bg-brand-coral`}>
              <Image src="/xhs.png" alt="小红书" width={16} height={16} className="rounded-[4px] border border-white" />
              <span>小红书</span>
            </a>
          </div>
        </div>

        {/* Two real screens from the app, with the bun looking over the top */}
        <Reveal delay={0.1} className="relative mx-auto flex w-full max-w-[560px] items-start justify-center gap-4 pt-14 md:gap-6 md:pt-16">
          <Bun className="absolute left-[16%] top-0 w-20 -rotate-6 md:w-24" />
          <Phone src="/blotz/app-calendar.jpg" alt={app.shots[0]} className="relative -rotate-3" />
          <Phone src="/blotz/app-ai-voice.jpg" alt={app.shots[1]} className="relative mt-12 rotate-3" />
          <Bun face="wink" className="absolute -bottom-5 right-[6%] w-16 rotate-12 md:w-20" />
        </Reveal>
      </div>
    </Band>
  );
}
