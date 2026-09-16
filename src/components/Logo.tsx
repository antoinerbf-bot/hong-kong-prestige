import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Show wordmark image larger */
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
};

/** Official logo asset from the live site. */
const LOGO_SRC = "https://www.hkconciergebridge.com.hk/brand/logo-embed.jpg";

/**
 * Official brand logo — always on a light plate so it stays perfectly visible
 * in both light and dark modes (no broken invert filters).
 */
export function Logo({ className, size = "md", onDark = false }: Props) {
  const heights = {
    sm: "h-9 sm:h-10",
    md: "h-11 sm:h-12",
    lg: "h-14 sm:h-16",
  }[size];

  return (
    <div
      className={cn(
        "flex items-center rounded-lg bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-black/5",
        onDark && "ring-white/10",
        className,
      )}
    >
      <img
        src={LOGO_SRC}
        alt="HK Concierge & Bridge"
        className={cn(
          "w-auto object-contain object-left",
          heights,
          "max-w-[min(240px,55vw)] sm:max-w-[280px]",
        )}
      />
    </div>
  );
}
