import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  markOnly?: boolean;
  onDark?: boolean;
};

const LOGO_FULL =
  "https://www.hkconciergebridge.com.hk/brand/logo-embed.jpg";

/**
 * Official logo from the live site (bridge + shield + wordmark).
 * Natural on light; subtle lift on dark backgrounds.
 */
export function Logo({ className, markOnly = false, onDark = false }: Props) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <img
        src={LOGO_FULL}
        alt="HK Concierge & Bridge"
        className={cn(
          "object-contain object-left",
          markOnly
            ? "h-9 w-auto max-w-[120px]"
            : "h-10 w-auto max-w-[min(200px,48vw)] sm:h-[3.25rem] sm:max-w-[260px]",
          onDark &&
            "brightness-0 invert-[0.93] sepia-[0.25] saturate-[1.8] hue-rotate-[8deg]",
        )}
      />
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return <Logo markOnly className={className} onDark={false} />;
}
