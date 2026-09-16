import { cn } from "@/lib/utils";

/**
 * Refined wordmark: same identity (shield + bridge idea),
 * clearer calligraphy, dual-mode plate for perfect visibility.
 */
export function Logo({
  onDark,
  className,
  compact,
}: {
  onDark?: boolean;
  className?: string;
  compact?: boolean;
}) {
  const ink = onDark ? "#F5F0E8" : "#1A1F2E";
  const gold = onDark ? "#D4B896" : "#9A7B4F";

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-md",
        !compact && "px-1.5 py-1",
        className,
      )}
    >
      {/* Mark: shield + bridge arch */}
      <svg
        width={compact ? 28 : 36}
        height={compact ? 32 : 40}
        viewBox="0 0 36 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M18 1.5C18 1.5 4 6 4 6v14.5c0 9.5 6.8 15.8 14 18.5 7.2-2.7 14-9 14-18.5V6S18 1.5 18 1.5z"
          stroke={gold}
          strokeWidth="1.4"
          fill={onDark ? "rgba(212,184,150,0.08)" : "rgba(154,123,79,0.06)"}
        />
        {/* Bridge arch */}
        <path
          d="M9 22.5c2.8-4 5.6-6 9-6s6.2 2 9 6"
          stroke={gold}
          strokeWidth="1.35"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M11 22.5h14"
          stroke={gold}
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Pillars */}
        <path d="M13.5 22.5v4.5M18 16.5v10.5M22.5 22.5v4.5" stroke={gold} strokeWidth="1.1" strokeLinecap="round" />
      </svg>

      <div className="min-w-0 leading-none">
        <p
          className="font-display text-[15px] font-medium tracking-[0.04em] sm:text-[17px]"
          style={{ color: ink }}
        >
          HK Concierge
        </p>
        <p
          className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.28em] sm:text-[10px]"
          style={{ color: gold }}
        >
          &amp; Bridge
        </p>
      </div>
    </div>
  );
}
