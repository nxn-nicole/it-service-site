/*
 * The bun that goes round the loop, dressed as whoever owns the stage it has
 * reached. The two who cook wear chef's hats, a tall one for the Senior and a
 * short one for the Developer; the PM is the boss, in sunglasses. Each one
 * takes the colour of that role's chip.
 *
 * A hat stands above the picture's own box, so the bun's body stays the same
 * size and in the same place whoever it is; whatever lays buns out leaves
 * room above (see HAT in StagesScene).
 */

// The mascot's outline and its two smiling eyes, as drawn for the app.
const BODY =
  "M41.1797 16C43.872 16.0001 46.0546 18.1833 46.0547 20.876C46.0547 22.5163 46.1907 24.3737 47.2627 25.6152C50.2142 29.0329 52 33.487 52 38.3574C51.9997 49.1279 43.2692 50.0107 32.5 50.0107C21.7308 50.0107 13.0003 49.1279 13 38.3574C13.0001 27.5865 21.7306 18.8546 32.5 18.8545C34.8428 18.8544 37.1371 17.2823 39.2979 16.377C39.8768 16.1344 40.5127 16 41.1797 16Z";
const EYES =
  "M38.2412 33.0176C36.081 33.0665 33.6986 33.8956 31.7012 36.2607L32.2734 36.7441L32.8467 37.2275C34.5419 35.2202 36.5051 34.5567 38.2754 34.5166C40.0761 34.4758 41.6944 35.0834 42.6094 35.6406L43.3906 34.3594C42.2689 33.6762 40.3706 32.9693 38.2412 33.0176ZM26.1729 35.3105C24.9499 33.6796 21.3404 30.8175 16.7285 32.6533L17.0049 33.3496L17.2832 34.0469C21.0002 32.5672 23.9544 34.8528 24.9727 36.2109L26.1729 35.3105Z";

const bodyFill: Record<string, string> = {
  Senior: "fill-brand-purple",
  Developer: "fill-brand-lime",
  PM: "fill-white",
};

// The hats are drawn upright around the middle of the band's lower edge, then set on the head at a tilt.
const TALL_HAT =
  "M-7.8 -5L-8.4 -13.5C-13 -14.5 -13.2 -21.5 -7.6 -21.4C-6.4 -25.6 .6 -26 2.2 -22.6C5.8 -25.4 12.6 -22.4 10.6 -17.2C12 -15.6 10.4 -13.6 8.4 -13.5L7.8 -5Z";
const SHORT_HAT = "M-7.6 -5C-12.6 -5.6 -12.6 -11.8 -7.2 -11.6C-5.8 -14.8 1.4 -15 2.8 -12.2C7 -14.2 12.6 -9.6 7.6 -5Z";

function ChefHat({ tall }: { tall: boolean }) {
  return (
    <g transform="translate(25.4 22.6) rotate(-17)" className="fill-white stroke-brand-ink" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
      <path d={tall ? TALL_HAT : SHORT_HAT} />
      {tall && <path d="M-3 -6.6V-12.4M2.6 -6.6V-12.4" className="fill-none" strokeWidth="1.2" />}
      <rect x="-9.4" y="-5.4" width="18.8" height="5.6" rx="1.6" />
    </g>
  );
}

export function RoleBun({ role, className = "" }: { role: string; className?: string }) {
  return (
    <svg viewBox="10 13 46 44" className={`overflow-visible ${className}`} aria-hidden>
      <path d={BODY} className={`stroke-brand-ink ${bodyFill[role] ?? "fill-white"}`} strokeWidth="1.5" strokeLinejoin="round" />

      {role === "PM" ? (
        // Sunglasses in place of the eyes: the bridge and arms, the two lenses, a glint on each
        <g className="stroke-brand-ink" strokeLinejoin="round" strokeLinecap="round">
          <path d="M26.6 33.6Q29.2 32.4 31.6 33.9M16.4 32.6L13.9 31.9M43.8 33.9L50.4 32.2" className="fill-none" strokeWidth="1.5" />
          <path d="M16.2 31.6Q21.6 30.2 26.8 32Q27.6 38.4 22.6 39.2Q16.6 39.6 16.2 31.6Z" className="fill-brand-ink" strokeWidth="1.2" />
          <path d="M31.4 32.3Q37.8 30.6 44 32.6Q44.6 39.8 38.6 40.4Q31.6 40.6 31.4 32.3Z" className="fill-brand-ink" strokeWidth="1.2" />
          <path d="M18.6 33.6L21 33.2M34 34.4L37 33.9" className="fill-none stroke-white" strokeWidth="1.1" />
        </g>
      ) : (
        <path d={EYES} className="fill-brand-ink" />
      )}

      {role === "Senior" && <ChefHat tall />}
      {role === "Developer" && <ChefHat tall={false} />}
    </svg>
  );
}
