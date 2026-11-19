type Palette = { sky: [string, string]; hills: [string, string, string] };

const PALETTES: Record<string, Palette> = {
  sage: { sky: ["#f7f8f4", "#dfe6d6"], hills: ["#c3d1b5", "#93ab80", "#647f52"] },
  moss: { sky: ["#f5f6f1", "#d9e2cf"], hills: ["#b9caa8", "#86a072", "#55714a"] },
  stone: { sky: ["#f6f6f3", "#e1e2da"], hills: ["#cbcdbf", "#a2a893", "#727a63"] },
  fern: { sky: ["#f4f7f3", "#d6e3d3"], hills: ["#b3cbab", "#7fa077", "#4f6f4a"] },
};

/**
 * Soft layered hills in the hero video's palette, used as the backdrop of feature cards
 * so the section reads as a continuation of the hero instead of a separate design.
 */
export default function MistBackdrop({
  variant = "sage",
  id,
}: {
  variant?: keyof typeof PALETTES;
  id: string;
}) {
  const p = PALETTES[variant];
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.sky[0]} />
          <stop offset="100%" stopColor={p.sky[1]} />
        </linearGradient>
        <linearGradient id={`fog-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#sky-${id})`} />
      <path
        d="M0 360 C 120 300, 220 320, 330 290 S 560 250, 660 300 S 780 320, 800 310 L800 600 L0 600Z"
        fill={p.hills[0]}
        opacity="0.75"
      />
      <path
        d="M0 430 C 140 380, 250 410, 360 380 S 560 350, 700 400 S 790 420, 800 415 L800 600 L0 600Z"
        fill={p.hills[1]}
        opacity="0.8"
      />
      <path
        d="M0 510 C 160 470, 300 500, 420 475 S 640 450, 800 490 L800 600 L0 600Z"
        fill={p.hills[2]}
        opacity="0.85"
      />
      <rect width="800" height="600" fill={`url(#fog-${id})`} />
    </svg>
  );
}
