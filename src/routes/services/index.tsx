import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n, useLocalized } from "@/lib/i18n";
import { services } from "@/lib/services";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Our Services — HK Concierge & Bridge" },
      {
        name: "description",
        content:
          "Seven premium concierge and close protection services for expatriates in Hong Kong. Welcome Package, bodyguard, lifestyle support and more.",
      },
    ],
  }),
});

function ServicesPage() {
  const { t, price } = useI18n();
  const L = useLocalized();

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
            <Link
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group surface-card shadow-luxe flex h-full flex-col overflow-hidden rounded-xl transition hover:border-champagne/30"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={s.image}
                  alt={L(s.alt)}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-2xl tracking-wide">{L(s.name)}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {L(s.tagline)}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="text-xs tracking-wide text-champagne">
                    {t("services.from")} {price(s.fromHkd)}
                    {s.fromUnit ? ` ${L(s.fromUnit)}` : ""}
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:text-champagne">
                    {t("services.details")} →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
