import { useEffect, useState } from "react";
import { useI18n, useLocalized } from "@/lib/i18n";
import { services, HERO_IMAGES } from "@/lib/services";
import { cn } from "@/lib/utils";

const SLIDE_MS = 5200;

/** Hero: Hong Kong harbour only + each service — no off-city imagery. */
export function HeroShowcase() {
  const { t } = useI18n();
  const L = useLocalized();

  const slides = [
    {
      src: HERO_IMAGES[0]!,
      label: { en: "Victoria Harbour · Hong Kong", zh: "維多利亞港 · 香港" },
    },
    {
      src: HERO_IMAGES[1]!,
      label: { en: "Hong Kong at dusk", zh: "香港黃昏" },
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
    <div className="absolute inset-0 overflow-hidden bg-muted">
      {slides.map((slide, i) => (
        <div
          key={`${i}-${slide.src}`}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1500ms] ease-in-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <img
            src={slide.src}
            alt=""
            className={cn("h-full w-full object-cover", i === index && "ken-burns")}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
      <div className="absolute bottom-6 right-5 z-10 hidden sm:block sm:right-8">
        <p className="text-[10px] tracking-[0.28em] text-champagne uppercase">
          {t("services.eyebrow")}
        </p>
        <p className="mt-1 font-display text-sm tracking-wide text-foreground">
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
                i === index ? "w-6 bg-champagne" : "w-1.5 bg-foreground/25",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
