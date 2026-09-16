import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ShoppingBag, MessageCircle } from "@/icons";
import { useI18n, useLocalized } from "@/lib/i18n";
import { getService, services, CONTACT } from "@/lib/services";
import { useCart } from "@/lib/cart";
import { whatsappWithService } from "@/lib/contact-links";
import { Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/ParallaxImage";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetail,
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return {};
    return {
      meta: [
        { title: `${s.name.en} — HK Concierge & Bridge` },
        { name: "description", content: s.intro.en },
      ],
    };
  },
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const { t, price } = useI18n();
  const L = useLocalized();
  const { add } = useCart();
  const [tierIndex, setTierIndex] = useState(0);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const selected = service.tiers[tierIndex] ?? service.tiers[0]!;

  return (
    <>
      <section className="relative border-b border-border">
        <ParallaxImage
          src={service.image}
          alt={L(service.alt)}
          className="h-[42vh] min-h-[260px] w-full sm:h-[52vh]"
          intensity={0.22}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-10 sm:px-8 sm:pb-14">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs tracking-wide text-foreground/80 transition hover:text-champagne"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            {t("services.back")}
          </Link>
          <h1 className="font-display mt-4 max-w-3xl text-3xl tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {L(service.name)}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-foreground/85 sm:text-base">{L(service.tagline)}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">{L(service.intro)}</p>
              <div className="mt-6 space-y-4">
                {service.body.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {L(p)}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="font-display text-2xl tracking-wide">{t("services.included")}</h2>
              <ul className="mt-5 space-y-3">
                {service.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} aria-hidden />
                    {L(item)}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="font-display text-2xl tracking-wide">{t("services.benefits")}</h2>
              <ul className="mt-5 space-y-3">
                {service.benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                    {L(item)}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal>
              <div className="surface-card shadow-luxe sticky top-24 rounded-xl p-6 sm:p-8">
                <h2 className="font-display text-xl tracking-wide">{t("services.pricing")}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{t("pricing.indicative")}</p>

                <ul className="mt-5 space-y-2">
                  {service.tiers.map((tier, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => setTierIndex(i)}
                        className={`flex w-full items-baseline justify-between gap-3 rounded-lg border px-3 py-3 text-left transition ${
                          i === tierIndex
                            ? "border-champagne/60 bg-champagne/5"
                            : "border-border hover:border-champagne/30"
                        }`}
                      >
                        <span className="text-sm text-foreground/90">{L(tier.label)}</span>
                        <span className="shrink-0 text-sm font-medium text-champagne">
                          {price(tier.hkd)}
                          {tier.unit ? ` ${L(tier.unit)}` : ""}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => add(service.slug, tierIndex)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-champagne px-5 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-champagne-soft"
                >
                  <ShoppingBag className="h-4 w-4" aria-hidden />
                  {t("cart.add")} — {price(selected.hkd)}
                </button>

                <a
                  href={whatsappWithService(service.name.en)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition hover:brightness-110"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {t("cta.whatsapp")}
                </a>

                <Link
                  to="/contact"
                  search={{ service: service.slug }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm transition hover:border-champagne/40 hover:text-champagne"
                >
                  {t("services.request")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>

                <a
                  href={CONTACT.phoneHref}
                  className="mt-4 block text-center text-xs text-muted-foreground hover:text-champagne"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </Reveal>
          </aside>
        </div>

        <Reveal className="mt-20">
          <h2 className="font-display text-2xl tracking-wide">{t("services.other")}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group surface-card overflow-hidden rounded-xl transition hover:border-champagne/30"
              >
                <ParallaxImage
                  src={s.image}
                  alt={L(s.alt)}
                  className="aspect-[16/10]"
                  intensity={0.12}
                />
                <div className="p-4">
                  <h3 className="font-display text-lg">{L(s.name)}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{L(s.tagline)}</p>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </>
  );
}
