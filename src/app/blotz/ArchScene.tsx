import {
  Activity,
  ArrowRight,
  Bot,
  Cloud,
  Database,
  FlaskConical,
  KeyRound,
  Radio,
  Rocket,
  Server,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Band, SectionHeading } from "@/components/kit";
import content from "./content.json";

/*
 * What the project is built with, drawn as a stack: one row per layer, the
 * layer's name on a coloured plate and what it is built with beside it. Each
 * row is filled edge to edge by equal tiles, so at no width does anything
 * wrap unevenly or leave a hole. Nothing moves here: it is a picture to read.
 */

const icon = (name: string) => `https://cdn.simpleicons.org/${name}/1e2140`;
const oldIcon = (name: string) => `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${name}.svg`;

// The mark shown beside each technology: its logo where there is one, a plain icon where not.
const marks: Record<string, string | LucideIcon> = {
  Expo: icon("expo"),
  "React Native": icon("react"),
  NativeWind: icon("tailwindcss"),
  "TanStack Query": icon("reactquery"),
  "React Hook Form": icon("reacthookform"),
  ".NET 10": icon("dotnet"),
  "ASP.NET Core": icon("dotnet"),
  SignalR: Radio,
  "Microsoft Agent Framework": Bot,
  "EF Core": Database,
  Auth0: icon("auth0"),
  "Azure OpenAI": oldIcon("openai"),
  "Azure SQL": oldIcon("microsoftsqlserver"),
  "Azure App Service": oldIcon("microsoftazure"),
  "Key Vault": KeyRound,
  "Application Insights": Activity,
  PostHog: icon("posthog"),
  "GitHub Actions": icon("githubactions"),
  Staging: FlaskConical,
  Production: Rocket,
};

function Mark({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const mark = marks[name];
  if (!mark) return null;
  if (typeof mark === "string") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={mark} alt="" className={`${className} shrink-0 object-contain`} />;
  }
  const Icon = mark;
  return <Icon className={`${className} shrink-0`} strokeWidth={2.5} />;
}

const hard = "border-2 border-brand-ink shadow-[0_3px_0_0_var(--color-brand-ink)]";

/** One technology: its mark over its name. `tag` says what it is used for, where the name alone does not. */
function Tile({ name, tag, className = "" }: { name: string; tag?: string; className?: string }) {
  return (
    <div
      className={`relative flex min-h-[5.5rem] flex-col items-center justify-center gap-1.5 rounded-2xl bg-white px-1.5 py-2.5 text-center max-[359px]:px-0.5 xl:min-h-[6.25rem] xl:gap-2 ${hard} ${className}`}
    >
      {tag && (
        <span className="absolute -top-3 left-3 rounded-full bg-brand-ink px-2.5 py-0.5 text-xs font-black text-white xl:text-sm">
          {tag}
        </span>
      )}
      <Mark name={name} className="h-6 w-6 xl:h-7 xl:w-7" />
      <span className="text-balance text-sm font-black leading-tight max-[359px]:text-xs xl:text-base">{name}</span>
    </div>
  );
}

const tiles = "grid gap-x-2.5 gap-y-3 xl:gap-x-3 xl:gap-y-3.5";

/** One layer of the stack: its name plate, then its tiles. The plate lies above the tiles until there is room for it beside them. */
function Layer({
  icon: Icon,
  name,
  note,
  tone,
  children,
}: {
  icon: LucideIcon;
  name: string;
  note?: string;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-x-2.5 gap-y-3 min-[60rem]:grid-cols-[9.5rem_minmax(0,1fr)] xl:grid-cols-[11.5rem_minmax(0,1fr)] xl:gap-x-3">
      <div
        className={`flex items-center justify-between gap-x-3 rounded-2xl px-4 py-2.5 min-[60rem]:flex-col min-[60rem]:items-start min-[60rem]:justify-center min-[60rem]:gap-y-1 ${hard} ${tone}`}
      >
        <span className="flex items-center gap-2 text-lg font-black leading-tight xl:text-xl">
          <Icon className="h-5 w-5 shrink-0 xl:h-6 xl:w-6" strokeWidth={2.5} />
          {name}
        </span>
        {/* The note may only break at its dots, never inside a word */}
        {note && (
          <span className="text-xs font-bold opacity-80 xl:text-sm">
            {note.split(" · ").map((part, i) => (
              <span key={part} className="inline-block whitespace-pre">
                {i > 0 && " · "}
                {part}
              </span>
            ))}
          </span>
        )}
      </div>
      <div className={tiles}>{children}</div>
    </div>
  );
}

/** Five tiles: one row where there is room, three over two on a phone, both rows filled. */
function Five({ tech }: { tech: string[] }) {
  return (
    <div className={`${tiles} grid-cols-6 md:grid-cols-5`}>
      {tech.map((t, i) => (
        <Tile key={t} name={t} className={`${i < 3 ? "col-span-2" : "col-span-3"} md:col-span-1`} />
      ))}
    </div>
  );
}

export default function ArchScene() {
  const { arch } = content;

  return (
    <Band tone="blue">
      <SectionHeading eyebrow={arch.eyebrow} tone="blue" title={arch.title} center />

      <div className="mt-10 space-y-5 md:mt-14 min-[60rem]:space-y-3.5">
        <Layer icon={Smartphone} name={arch.app.name} note={arch.app.note} tone="bg-brand-lime">
          <Five tech={arch.app.tech} />
        </Layer>

        <Layer icon={Server} name={arch.api.name} note={arch.api.note} tone="bg-brand-blue text-white">
          <Five tech={arch.api.tech} />
          {/* The three services the backend leans on, each tagged with what it is for */}
          <div className={`${tiles} grid-cols-3 pt-2`}>
            {arch.services.map((service) => (
              <Tile key={service.name} name={service.tech} tag={service.name} />
            ))}
          </div>
        </Layer>

        <Layer icon={Cloud} name={arch.cloud.label} tone="bg-brand-yellow">
          <div className={`${tiles} grid-cols-2 md:grid-cols-4`}>
            {arch.cloud.tech.map((t) => (
              <Tile key={t} name={t} />
            ))}
          </div>
        </Layer>

        <Layer icon={Workflow} name={arch.ship.label} tone="bg-brand-purple text-white">
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-1 md:gap-x-2.5">
            {arch.ship.steps.map((step, i) => (
              <span key={step} className="contents">
                {i > 0 && <ArrowRight className="h-3.5 w-3.5 self-center text-brand-ink md:h-5 md:w-5" strokeWidth={3} />}
                <Tile name={step} />
              </span>
            ))}
          </div>
        </Layer>
      </div>
    </Band>
  );
}
