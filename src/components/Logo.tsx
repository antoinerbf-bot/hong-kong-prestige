import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  markOnly?: boolean;
  onDark?: boolean;
};

/** Official logo URL (same asset as hkconciergebridge.com.hk). */
const LOGO_FULL =
  "https://www.hkconciergebridge.com.hk/brand/logo-embed.jpg";

/**
 * Official HK Concierge & Bridge logo — same mark as the live site
 * (bridge + shield + wordmark). Contrast filter adapts to light/dark mode.
 */
export function Logo({ className, markOnly = false, onDark = true }: Props) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <img
        src={LOGO_FULL}
        alt="HK Concierge & Bridge"
        className={cn(
          "object-contain object-left object-center",
          markOnly
            ? "h-9 w-auto max-w-[120px]"
            : "h-10 w-auto max-w-[min(200px,48vw)] sm:h-[3.25rem] sm:max-w-[260px]",
          /* Official logo is navy on white — lift it on dark UI */
          onDark &&
            "brightness-0 invert-[0.93] sepia-[0.4] saturate-[2.4] hue-rotate-[8deg]",
        )}
      />
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return <Logo markOnly className={className} onDark />;
}
