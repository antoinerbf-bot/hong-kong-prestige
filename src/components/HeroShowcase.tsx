import { useEffect, useState } from "react";
import { useI18n, useLocalized } from "@/lib/i18n";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/hero-hk.jpg";

const SLIDE_MS = 4500;

/**
 * Cinematic hero background: cycles through skyline + every service visual
 * so the full offering is visible as the sequence plays.
 */
export function HeroShowcase() {
  const { t } = useI18n();
  const L = useLocalized();

  const slides = [
    {
      src: heroImg,
      label: { en: "Hong Kong · Private Concierge", zh: "香港 · 私人管家服務" },
    },
    ...services.map((s) => ({
      src: s.image,
      label: s.name,
    })),
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <img
            src={slide.src}
            alt=""
            className={cn(
              "h-full w-full object-cover",
              i === index && "ken-burns",
            )}
          />
        </div>
      ))}

      {/* Overlays for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-background/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/35 to-transparent" />

      {/* Active service caption */}
      <div className="absolute bottom-6 right-5 z-10 hidden sm:block sm:right-8">
        <p className="text-[10px] tracking-[0.28em] text-champagne/90 uppercase">
          {t("services.eyebrow")}
        </p>
        <p className="mt-1 font-display text-sm tracking-wide text-foreground/90">
          {L(slides[index]?.label ?? { en: "", zh: "" })}
        </p>
        <div className="mt-3 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1 rounded-full transition-all",
                i === index ? "w-6 bg-champagne" : "w-1.5 bg-foreground/30 hover:bg-foreground/50",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
