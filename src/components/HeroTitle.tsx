import { useI18n } from "@/lib/i18n";

/**
 * Aligns with official site messaging:
 * "Premium Concierge & Security Services for Expats in Hong Kong"
 * Display serif + gold accent line — not flat marketing copy.
 */
export function HeroTitle() {
  const { lang } = useI18n();

  if (lang === "zh") {
    return (
      <h1 className="hero-title max-w-4xl">
        <span className="hero-line block font-display text-[2.15rem] leading-[1.2] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.35rem] lg:leading-[1.15]">
          香港外籍人士專屬
        </span>
        <span className="hero-line block font-display text-[2.15rem] leading-[1.2] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.35rem] lg:leading-[1.15]">
          高端禮賓與保安服務
        </span>
        <span className="hero-rule mt-5 block h-px w-14 bg-champagne sm:w-20" aria-hidden />
        <span className="hero-line-delay mt-5 block max-w-xl text-[0.95rem] font-normal leading-relaxed tracking-wide text-foreground/75 sm:text-lg">
          搬遷安頓、生活支援、家庭協助與持牌貼身保護 — 低調、專業、一站完成。
        </span>
      </h1>
    );
  }

  return (
    <h1 className="hero-title max-w-4xl">
      <span className="hero-line block font-display text-[2.2rem] leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[2.75rem] md:text-5xl lg:text-[3.4rem] lg:leading-[1.12]">
        Premium Concierge &amp; Security
      </span>
      <span className="hero-line block font-display text-[2.2rem] leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[2.75rem] md:text-5xl lg:text-[3.4rem] lg:leading-[1.12]">
        for Expats in <span className="text-champagne">Hong Kong</span>
      </span>
      <span className="hero-rule mt-5 block h-px w-14 bg-champagne sm:w-20" aria-hidden />
      <span className="hero-line-delay mt-5 block max-w-xl text-[0.95rem] font-normal leading-relaxed tracking-[0.01em] text-foreground/75 sm:text-lg">
        Relocation, lifestyle support, family assistance and SGSIA-licensed close protection — handled with discretion and professionalism.
      </span>
    </h1>
  );
}
