import { useI18n } from "@/lib/i18n";

/**
 * Hero headline with refined calligraphy feel:
 * display serif, gold hairline, soft stagger, never flat.
 */
export function HeroTitle() {
  const { lang } = useI18n();

  if (lang === "zh") {
    return (
      <h1 className="hero-title max-w-3xl">
        <span className="hero-line block font-display text-[2.4rem] leading-[1.18] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem]">
          安然落地香港
        </span>
        <span className="hero-rule mt-4 block h-px w-16 bg-champagne/80 sm:w-20" aria-hidden />
        <span className="hero-line-delay mt-4 block font-display text-[1.35rem] italic leading-snug tracking-[0.04em] text-champagne sm:text-2xl md:text-3xl">
          從容 · 細心 · 妥當
        </span>
      </h1>
    );
  }

  return (
    <h1 className="hero-title max-w-3xl">
      <span className="hero-line block font-display text-[2.4rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl lg:text-[4.15rem] lg:leading-[1.06]">
        Settle into
        <span className="block sm:inline"> Hong Kong</span>
      </span>
      <span className="hero-rule mt-4 block h-px w-16 bg-champagne/80 sm:mt-5 sm:w-24" aria-hidden />
      <span className="hero-line-delay mt-4 block font-display text-[1.45rem] italic leading-snug tracking-[0.02em] text-champagne sm:text-2xl md:text-[1.85rem]">
        with calm, discretion &amp; care
      </span>
    </h1>
  );
}
