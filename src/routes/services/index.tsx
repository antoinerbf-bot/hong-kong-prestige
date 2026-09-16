import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag } from "@/icons";
import { useI18n, useLocalized } from "@/lib/i18n";
import { services } from "@/lib/services";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/ParallaxImage";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Our Services — HK Concierge & Bridge" },
      {
        name: "description",
        content:
          "Seven premium concierge and close protection services for expatriates in Hong Kong.",
      },
    ],
  }),
});

function ServicesPage() {
  const { t, price } = useI18n();
  const L = useLocalized();
  const { add } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <p className="eyebrow">{t("services.eyebrow")}</p>
        <h1 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
          {t("services.page.title")}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("services.page.intro")}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 40}>
            <article className="group surface-card shadow-luxe flex h-full flex-col overflow-hidden rounded-xl transition hover:border-champagne/30">
              <Link to="/services/$slug" params={{ slug: s.slug }} className="block">
                <ParallaxImage
                  src={s.image}
                  alt={L(s.alt)}
                  className="aspect-[16/10]"
                  intensity={0.14}
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <Link to="/services/$slug" params={{ slug: s.slug }}>
                  <h2 className="font-display text-2xl tracking-wide">{L(s.name)}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {L(s.tagline)}
                  </p>
                </Link>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4">
                  <span className="text-xs tracking-wide text-champagne">
                    {t("services.from")} {price(s.fromHkd)}
                    {s.fromUnit ? ` ${L(s.fromUnit)}` : ""}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => add(s.slug, 0)}
                      className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-[11px] transition hover:border-champagne/50 hover:text-champagne"
                    >
                      <ShoppingBag className="h-3 w-3" aria-hidden />
                      {t("cart.add")}
                    </button>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="text-[11px] tracking-wide text-muted-foreground hover:text-champagne"
                    >
                      {t("services.details")} →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
