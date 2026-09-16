import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useI18n, useLocalized } from "@/lib/i18n";
import { getService, services, CONTACT } from "@/lib/services";
import { Reveal } from "@/components/Reveal";

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
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      {/* Hero band */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={L(service.alt)}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs tracking-wide text-muted-foreground transition hover:text-champagne"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("services.back")}
          </Link>
          <h1 className="font-display mt-6 max-w-3xl text-4xl tracking-tight sm:text-5xl md:text-6xl">
            {L(service.name)}
          </h1>
          <p className="mt-4 max-w-xl text-base text-foreground/80 sm:text-lg">{L(service.tagline)}</p>
          <p className="mt-6 text-sm tracking-wide text-champagne">
            {t("services.from")} {price(service.fromHkd)}
            {service.fromUnit ? ` ${L(service.fromUnit)}` : ""}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">{L(service.intro)}</p>
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
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} />
                    {L(item)}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="font-display text-2xl tracking-wide">{t("services.benefits")}</h2>
              <ul className="mt-5 space-y-3">
                {service.benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                    {L(item)}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal>
              <div className="surface-card shadow-luxe sticky top-28 rounded-xl p-7 sm:p-8">
                <h2 className="font-display text-xl tracking-wide">{t("services.pricing")}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{t("pricing.indicative")}</p>
                <ul className="mt-6 space-y-4">
                  {service.tiers.map((tier, i) => (
                    <li
                      key={i}
                      className="flex items-baseline justify-between gap-4 border-b border-border/50 pb-4 last:border-0 last:pb-0"
                    >
                      <span className="text-sm text-foreground/85">{L(tier.label)}</span>
                      <span className="shrink-0 text-sm font-medium text-champagne">
                        {price(tier.hkd)}
                        {tier.unit ? ` ${L(tier.unit)}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  search={{ service: service.slug }}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-champagne px-5 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-champagne-soft"
                >
                  {t("services.request")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex w-full items-center justify-center rounded-full border border-border px-5 py-3 text-sm transition hover:border-champagne/40 hover:text-champagne"
                >
                  {t("cta.whatsapp")}
                </a>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* Other services */}
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
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={s.image}
                    alt={L(s.alt)}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
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
