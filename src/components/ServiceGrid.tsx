import { Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag } from "@/icons";
import { useI18n, useLocalized } from "@/lib/i18n";
import { services } from "@/lib/services";
import { useCart } from "@/lib/cart";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * Editorial service gallery — large visuals, varied rhythm, luxury hotel language.
 * Not a uniform SaaS card grid.
 */
export function ServiceGrid() {
  const { t, price } = useI18n();
  const L = useLocalized();
  const { add } = useCart();

  return (
    <section className="border-y border-border bg-card/20 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">{t("services.eyebrow")}</p>
              <h2 className="font-display mt-4 max-w-3xl text-4xl leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
                {t("services.title")}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base lg:justify-self-end">
              {t("services.intro")}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {services.map((s, i) => {
            const isFeature = i === 0 || i === 3;
            const span = isFeature
              ? "sm:col-span-2 lg:col-span-7"
              : i % 3 === 1
                ? "lg:col-span-5"
                : "lg:col-span-4";
            const aspect = isFeature
              ? "aspect-[16/10] sm:aspect-[16/9]"
              : "aspect-[16/11]";

            return (
              <Reveal key={s.slug} delay={Math.min(i * 40, 200)}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-500 ease-out",
                    "hover:-translate-y-1.5 hover:border-champagne/40 hover:shadow-luxe",
                    span,
                  )}
                >
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className={cn("relative block overflow-hidden bg-muted", aspect)}
                  >
                    <OptimizedImage
                      src={s.image}
                      alt={L(s.alt)}
                      role="card"
                      width={isFeature ? 1100 : 720}
                      quality={80}
                      loading={i < 3 ? "eager" : "lazy"}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-90" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <Link to="/services/$slug" params={{ slug: s.slug }}>
                      <h3
                        className={cn(
                          "font-display tracking-wide text-foreground transition-colors group-hover:text-champagne",
                          isFeature ? "text-2xl sm:text-3xl" : "text-xl sm:text-[1.35rem]",
                        )}
                      >
                        {L(s.name)}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {L(s.tagline)}
                      </p>
                    </Link>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4 mt-5">
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
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition hover:border-champagne/50 hover:text-champagne"
                          aria-label={t("cart.add")}
                        >
                          <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
                        </button>
                        <Link
                          to="/services/$slug"
                          params={{ slug: s.slug }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-medium uppercase tracking-[0.12em] text-foreground transition group-hover:border-champagne/50 group-hover:text-champagne"
                        >
                          {t("services.details")}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-champagne/10 px-6 py-3 text-sm font-medium tracking-wide text-champagne transition hover:bg-champagne hover:text-primary-foreground"
          >
            {t("services.all")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
