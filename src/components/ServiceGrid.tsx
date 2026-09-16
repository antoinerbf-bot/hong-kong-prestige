import { Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag } from "@/icons";
import { useI18n, useLocalized } from "@/lib/i18n";
import { services } from "@/lib/services";
import { useCart } from "@/lib/cart";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Reveal } from "@/components/Reveal";

/**
 * Clean service grid — inspired by the official site card layout,
 * with coherent photography instead of a horizontal scroll rail.
 */
export function ServiceGrid() {
  const { t, price } = useI18n();
  const L = useLocalized();
  const { add } = useCart();

  return (
    <section className="border-y border-border bg-card/20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">{t("services.eyebrow")}</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
            {t("services.title")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("services.intro")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 45}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-champagne/35 hover:shadow-luxe">
                <Link to="/services/$slug" params={{ slug: s.slug }} className="relative block aspect-[16/10] overflow-hidden bg-muted">
                  <OptimizedImage
                    src={s.image}
                    alt={L(s.alt)}
                    role="card"
                    width={720}
                    quality={78}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <Link to="/services/$slug" params={{ slug: s.slug }}>
                    <h3 className="font-display text-xl tracking-wide text-foreground sm:text-[1.35rem]">
                      {L(s.name)}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {L(s.tagline)}
                    </p>
                  </Link>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
                    <span className="text-sm font-medium text-foreground">
                      {t("services.from")}{" "}
                      <span className="text-champagne">
                        {price(s.fromHkd)}
                        {s.fromUnit ? ` ${L(s.fromUnit)}` : ""}
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => add(s.slug, 0)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition hover:border-champagne/50 hover:text-champagne"
                        aria-label={t("cart.add")}
                      >
                        <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
                      </button>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="inline-flex items-center gap-1 text-sm font-medium text-champagne transition group-hover:gap-1.5"
                      >
                        {t("services.details")}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm tracking-wide text-champagne hover:text-champagne-soft"
          >
            {t("services.all")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
