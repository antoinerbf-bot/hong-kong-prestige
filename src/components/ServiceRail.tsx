import { Link } from "@tanstack/react-router";
import { useRef, useEffect } from "react";
import { useI18n, useLocalized } from "@/lib/i18n";
import { services } from "@/lib/services";
import { useCart } from "@/lib/cart";
import { ShoppingBag } from "lucide-react";

/**
 * Full-bleed horizontal service showcase — parallax-linked to vertical scroll.
 * Same card size on mobile & desktop (snap scroll).
 */
export function ServiceRail() {
  const { t, price } = useI18n();
  const L = useLocalized();
  const { add } = useCart();
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewH) return;
      const progress = Math.min(1, Math.max(0, (viewH - rect.top) / (viewH + rect.height)));
      const maxX = track.scrollWidth - track.clientWidth;
      track.scrollLeft = progress * maxX * 0.85;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="border-y border-border bg-card/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow">{t("services.eyebrow")}</p>
        <h2 className="font-display mt-3 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {t("services.title")}
        </h2>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">{t("services.intro")}</p>
      </div>

      <div
        ref={trackRef}
        className="mt-10 flex gap-5 overflow-x-auto px-5 pb-4 scrollbar-none sm:gap-6 sm:px-8"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {services.map((s) => (
          <article
            key={s.slug}
            className="surface-card shadow-luxe group relative w-[min(85vw,340px)] shrink-0 overflow-hidden rounded-2xl sm:w-[360px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <Link to="/services/$slug" params={{ slug: s.slug }} className="block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={L(s.alt)}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              </div>
            </Link>
            <div className="p-5 sm:p-6">
              <h3 className="font-display text-xl tracking-wide sm:text-2xl">{L(s.name)}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{L(s.tagline)}</p>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/50 pt-4">
                <span className="text-xs text-champagne">
                  {t("services.from")} {price(s.fromHkd)}
                  {s.fromUnit ? ` ${L(s.fromUnit)}` : ""}
                </span>
                <button
                  type="button"
                  onClick={() => add(s.slug, 0)}
                  className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-[11px] transition hover:border-champagne/50 hover:text-champagne"
                >
                  <ShoppingBag className="h-3 w-3" />
                  {t("cart.add")}
                </button>
              </div>
            </div>
          </article>
        ))}
        <div className="w-4 shrink-0 sm:w-8" aria-hidden />
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/services"
          className="text-sm tracking-wide text-champagne hover:text-champagne-soft"
        >
          {t("services.all")} →
        </Link>
      </div>
    </section>
  );
}

// local Link import fix
import { Link } from "@tanstack/react-router";
