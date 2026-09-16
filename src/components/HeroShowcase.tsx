import { useEffect, useMemo, useState } from "react";
import { useI18n, useLocalized } from "@/lib/i18n";
import { services, HERO_IMAGES } from "@/lib/services";
import { cn } from "@/lib/utils";
import { imgUrl, imgSrcSet, SIZES } from "@/lib/images";

const SLIDE_MS = 5200;

export function HeroShowcase() {
  const { t } = useI18n();
  const L = useLocalized();

  const slides = useMemo(
    () => [
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
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({ 0: false });

  // LCP preload once
  useEffect(() => {
    const href = imgUrl(slides[0]!.src, 1280, { quality: 78 });
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    link.setAttribute("fetchpriority", "high");
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [slides]);

  // Autoplay — pause when tab hidden (saves CPU / battery)
  useEffect(() => {
    let id = 0;

    const tick = () => {
      setIndex((i) => (i + 1) % slides.length);
    };

    const start = () => {
      if (id) return;
      id = window.setInterval(tick, SLIDE_MS);
    };

    const stop = () => {
      if (!id) return;
      window.clearInterval(id);
      id = 0;
    };

    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [slides.length]);

  // Preload next slide only
  useEffect(() => {
    const next = (index + 1) % slides.length;
    const img = new Image();
    img.decoding = "async";
    img.src = imgUrl(slides[next]!.src, 1100, { quality: 70 });
  }, [index, slides]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-muted">
      {slides.map((slide, i) => {
        const near = Math.abs(i - index) <= 1 || i === 0;
        if (!near && !loaded[i]) return null;

        return (
          <div
            key={`${i}-${slide.src}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out",
              i === index ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
            aria-hidden={i !== index}
          >
            <img
              src={imgUrl(slide.src, i === 0 ? 1400 : 1100, { quality: i === 0 ? 78 : 70 })}
              srcSet={imgSrcSet(slide.src, [640, 960, 1280, 1600], i === 0 ? 78 : 70)}
              sizes={SIZES.hero}
              alt=""
              className={cn("h-full w-full object-cover", i === index && "ken-burns")}
              loading={i === 0 ? "eager" : "lazy"}
              decoding={i === 0 ? "sync" : "async"}
              fetchPriority={i === 0 ? "high" : "low"}
              onLoad={() => setLoaded((m) => (m[i] ? m : { ...m, [i]: true }))}
            />
          </div>
        );
      })}

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
