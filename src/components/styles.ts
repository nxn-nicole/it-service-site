// Shared class names, so every page uses the same card and button.
// Kept out of kit.tsx on purpose: that file is a client module, and server
// components can only read plain strings from a module that is not.

/** White sticker card: ink outline with a solid drop. */
export const cardClass =
  "rounded-3xl border-2 border-brand-ink bg-white shadow-[0_5px_0_0_var(--color-brand-ink)]";

/** Same card without the white fill, for when you set your own background. */
export const cardFrameClass =
  "rounded-3xl border-2 border-brand-ink shadow-[0_5px_0_0_var(--color-brand-ink)]";

/** Add to a card or tile that is a link, so it lifts on hover. */
export const liftClass = "transition-transform duration-200 hover:-translate-y-1";

const buttonBase =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-brand-ink px-6 py-3 text-base font-black transition-all duration-150 hover:-translate-y-0.5 active:translate-y-1";

/** Main call to action: dark button. */
export const buttonClass = `${buttonBase} bg-brand-ink text-white shadow-[0_5px_0_0_var(--color-brand-lime-deep)] active:shadow-[0_1px_0_0_var(--color-brand-lime-deep)]`;

/** Lime button, for the one thing you most want clicked. */
export const buttonLimeClass = `${buttonBase} bg-brand-lime text-brand-ink shadow-[0_5px_0_0_var(--color-brand-ink)] active:shadow-[0_1px_0_0_var(--color-brand-ink)]`;

/** Quiet white button, for secondary links. */
export const buttonGhostClass = `${buttonBase} bg-white text-brand-ink shadow-[0_5px_0_0_var(--color-brand-ink)] active:shadow-[0_1px_0_0_var(--color-brand-ink)]`;

/** Coral button, for links out to 小红书. */
export const buttonCoralClass = `${buttonBase} bg-brand-coral text-white shadow-[0_5px_0_0_var(--color-brand-ink)] active:shadow-[0_1px_0_0_var(--color-brand-ink)]`;
