import { useI18n } from "@/lib/i18n";

export function HeroTitle() {
  const { lang } = useI18n();

  if (lang === "zh") {
    return (
      <h1 className="hero-title max-w-5xl">
        <span className="hero-line block font-display text-[2.4rem] leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.08]">
          香港外籍人士專屬
        </span>
        <span className="hero-line block font-display text-[2.4rem] leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.08]">
          高端禮賓與保安服務
        </span>
        <span className="hero-rule mt-6 block h-px w-16 bg-champagne sm:w-24" aria-hidden />
        <span className="hero-line-delay mt-6 block max-w-xl text-base font-normal leading-relaxed tracking-wide text-foreground/75 sm:text-lg">
          搬遷安頓、生活支援、家庭協助與持牌貼身保護 — 低調、專業、一站完成。
        </span>
      </h1>
    );
  }

  return (
    <h1 className="hero-title max-w-5xl">
      <span className="hero-line block font-display text-[2.5rem] leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.25rem] md:text-6xl lg:text-[4.5rem] lg:leading-[1.05]">
        Premium Concierge &amp; Security
      </span>
      <span className="hero-line block font-display text-[2.5rem] leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.25rem] md:text-6xl lg:text-[4.5rem] lg:leading-[1.05]">
        for Expats in <span className="text-champagne">Hong Kong</span>
      </span>
      <span className="hero-rule mt-6 block h-px w-16 bg-champagne sm:w-24" aria-hidden />
      <span className="hero-line-delay mt-6 block max-w-xl text-base font-normal leading-relaxed tracking-[0.01em] text-foreground/75 sm:text-lg">
        Relocation, lifestyle support, family assistance and SGSIA-licensed close protection —
        handled with discretion and professionalism.
      </span>
    </h1>
  );
}
