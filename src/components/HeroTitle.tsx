import { useI18n } from "@/lib/i18n";

/** Warmer hero headline — replaces flat "private bridge" wording. */
export function HeroTitle() {
  const { lang } = useI18n();

  if (lang === "zh") {
    return (
      <h1 className="font-display max-w-3xl text-[2.35rem] leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.1]">
        <span className="block">安然落地香港</span>
        <span className="mt-2 block text-champagne">從容 · 細心 · 妥當</span>
      </h1>
    );
  }

  return (
    <h1 className="font-display max-w-3xl text-[2.35rem] leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.1rem] lg:leading-[1.08]">
      <span className="block">Settle into Hong Kong</span>
      <span className="mt-1 block text-champagne">with calm and care</span>
    </h1>
  );
}
