import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Compact mark only (bridge + shield) for tight headers */
  markOnly?: boolean;
  /** Inverse colors for dark backgrounds */
  onDark?: boolean;
};

/**
 * Improved brand mark based on the official HK Concierge & Bridge logo:
 * suspension bridge + central shield, refined proportions and sharper geometry.
 */
export function Logo({ className, markOnly = false, onDark = true }: Props) {
  const navy = onDark ? "#E8D5A3" : "#1B2A4A";
  const gold = onDark ? "#C9A84C" : "#B8963A";
  const cable = onDark ? "#D4C08A" : "#C4A95A";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 200 90"
        className={cn(markOnly ? "h-9 w-auto" : "h-11 w-auto sm:h-12")}
        aria-hidden="true"
      >
        {/* Towers */}
        <path
          d="M28 78 V22 L36 12 L44 22 V78 Z"
          fill={navy}
        />
        <path
          d="M156 78 V22 L164 12 L172 22 V78 Z"
          fill={navy}
        />
        {/* Tower caps */}
        <path d="M26 22 L36 8 L46 22 Z" fill={navy} />
        <path d="M154 22 L164 8 L174 22 Z" fill={navy} />

        {/* Main deck arc */}
        <path
          d="M18 72 Q100 48 182 72"
          fill="none"
          stroke={navy}
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Upper cables */}
        <path
          d="M36 20 Q100 2 164 20"
          fill="none"
          stroke={gold}
          strokeWidth="2.2"
        />

        {/* Vertical suspenders */}
        {[48, 62, 76, 90, 104, 118, 132, 146].map((x) => {
          const t = (x - 36) / (164 - 36);
          const yTop = 20 + (2 - 20) * Math.sin(t * Math.PI) * 0.35 + (t > 0.5 ? (t - 0.5) * 2 : t * 2) * 0;
          // Approximate cable height at x
          const cableY = 20 - 16 * Math.sin(t * Math.PI);
          const deckY = 72 - 12 * Math.sin(t * Math.PI);
          return (
            <line
              key={x}
              x1={x}
              y1={cableY}
              x2={x}
              y2={deckY}
              stroke={cable}
              strokeWidth="1.2"
            />
          );
        })}

        {/* Central shield */}
        <path
          d="M100 18 L112 24 L112 40 Q112 50 100 56 Q88 50 88 40 L88 24 Z"
          fill={gold}
        />
        <path
          d="M100 22 L108 26 L108 38 Q108 46 100 51 Q92 46 92 38 L92 26 Z"
          fill={onDark ? "#1B2A4A" : "#0F1A2E"}
          opacity="0.35"
        />
      </svg>

      {!markOnly && (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[13px] tracking-[0.04em] sm:text-[15px]",
              onDark ? "text-foreground" : "text-[#1B2A4A]",
            )}
          >
            HK Concierge
          </span>
          <span
            className={cn(
              "mt-0.5 text-[10px] font-medium tracking-[0.18em] uppercase sm:text-[11px]",
              onDark ? "text-champagne" : "text-[#B8963A]",
            )}
          >
            &amp; Bridge
          </span>
        </div>
      )}
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return <Logo markOnly className={className} onDark />;
}
