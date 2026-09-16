import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  markOnly?: boolean;
  /** true = dark UI background */
  onDark?: boolean;
};

/**
 * Improved brand mark — same idea as official logo (suspension bridge + central shield),
 * redrawn sharper for light & dark. Perfectly legible in both modes without CSS hacks.
 */
export function Logo({ className, markOnly = false, onDark = false }: Props) {
  const navy = onDark ? "#E8DCC0" : "#1A2744";
  const gold = onDark ? "#D4B56A" : "#A8892E";
  const cable = onDark ? "#C9B896" : "#B89A4A";
  const deck = onDark ? "#E8DCC0" : "#1A2744";

  return (
    <div className={cn("flex items-center gap-2.5", className)} aria-label="HK Concierge & Bridge">
      <svg
        viewBox="0 0 120 56"
        className={cn(markOnly ? "h-9 w-auto" : "h-10 w-auto sm:h-11")}
        role="img"
        aria-hidden={markOnly ? undefined : true}
      >
        <title>HK Concierge & Bridge</title>
        {/* Left tower */}
        <path d="M14 52 V18 L20 8 L26 18 V52 Z" fill={navy} />
        <path d="M12 18 L20 5 L28 18 Z" fill={navy} />
        {/* Right tower */}
        <path d="M94 52 V18 L100 8 L106 18 V52 Z" fill={navy} />
        <path d="M92 18 L100 5 L108 18 Z" fill={navy} />
        {/* Main deck */}
        <path
          d="M8 48 Q60 28 112 48"
          fill="none"
          stroke={deck}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Upper cable */}
        <path
          d="M20 16 Q60 2 100 16"
          fill="none"
          stroke={gold}
          strokeWidth="2"
        />
        {/* Suspenders */}
        {[28, 36, 44, 52, 60, 68, 76, 84, 92].map((x) => {
          const t = (x - 20) / 80;
          const y1 = 16 - 12 * Math.sin(t * Math.PI);
          const y2 = 48 - 16 * Math.sin(t * Math.PI);
          return (
            <line
              key={x}
              x1={x}
              y1={y1}
              x2={x}
              y2={y2}
              stroke={cable}
              strokeWidth="1"
              opacity={0.85}
            />
          );
        })}
        {/* Shield */}
        <path
          d="M60 10 L70 16 L70 28 Q70 36 60 42 Q50 36 50 28 L50 16 Z"
          fill={gold}
        />
        <path
          d="M60 14 L66 18 L66 27 Q66 33 60 37 Q54 33 54 27 L54 18 Z"
          fill={onDark ? "#1A2744" : "#0F1830"}
          opacity={0.28}
        />
      </svg>

      {!markOnly && (
        <div className="flex min-w-0 flex-col leading-none">
          <span
            className={cn(
              "font-display text-[13px] tracking-[0.03em] sm:text-[15px]",
              onDark ? "text-foreground" : "text-[#1A2744]",
            )}
          >
            HK Concierge
          </span>
          <span
            className={cn(
              "mt-0.5 text-[9px] font-medium tracking-[0.16em] uppercase sm:text-[10px]",
              onDark ? "text-champagne" : "text-[#A8892E]",
            )}
          >
            &amp; Bridge
          </span>
        </div>
      )}
    </div>
  );
}
