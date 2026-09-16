import { useI18n } from "@/lib/i18n";
import { HeroVideo } from "@/components/HeroVideo";

/**
 * Hero media layer — cinematic video (immersive).
 * Service stills remain on service pages / rail.
 */
export function HeroShowcase() {
  const { t } = useI18n();

  return (
    <div className="absolute inset-0">
      <HeroVideo />
      <div className="absolute bottom-6 right-5 z-10 hidden sm:block sm:right-8">
        <p className="text-[10px] tracking-[0.28em] text-champagne uppercase">
          {t("services.eyebrow")}
        </p>
        <p className="mt-1 font-display text-sm tracking-wide text-foreground/90">
          Hong Kong · Victoria Harbour
        </p>
      </div>
    </div>
  );
}
