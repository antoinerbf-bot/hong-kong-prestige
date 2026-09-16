import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n, useLocalized } from "@/lib/i18n";
import { services } from "@/lib/services";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — HK Concierge & Bridge" },
      {
        name: "description",
        content:
          "Clear, indicative pricing for premium concierge and close protection services in Hong Kong. Transparent starting rates.",
      },
    ],
  }),
});

function PricingPage() {
  const { t, price, lang } = useI18n();
  const L = useLocalized();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <p className="eyebrow">{t("pricing.eyebrow")}</p>
        <h1 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
          {t("pricing.title")}
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">{t("pricing.intro")}</p>
        <p className="mt-3 text-xs tracking-wide text-muted-foreground/80">
          {lang === "en" ? t("pricing.note.en") : t("pricing.currency.note.en")}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 40}>
            <div className="surface-card shadow-luxe flex h-full flex-col rounded-xl p-6 sm:p-7">
              <h2 className="font-display text-xl tracking-wide">{L(s.name)}</h2>
              <p className="mt-1 text-xs text-champagne">
                {t("services.from")} {price(s.fromHkd)}
                {s.fromUnit ? ` ${L(s.fromUnit)}` : ""}
              </p>
              <p className="mt-4 text-xs tracking-wide text-muted-foreground">
                {t("pricing.indicative")}
              </p>
              <ul className="mt-4 flex-1 space-y-3">
                {s.tiers.map((tier, j) => (
                  <li
                    key={j}
                    className="flex items-baseline justify-between gap-3 border-b border-border/40 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-foreground/80">{L(tier.label)}</span>
                    <span className="shrink-0 text-sm text-champagne">
                      {price(tier.hkd)}
                      {tier.unit ? ` ${L(tier.unit)}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                search={{ service: s.slug }}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs tracking-wide transition hover:border-champagne/50 hover:text-champagne"
              >
                {t("services.request")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Comparison table — desktop */}
      <Reveal className="mt-20 hidden lg:block">
        <h2 className="font-display text-2xl tracking-wide">{t("pricing.compare")}</h2>
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-card/60">
                <th className="px-5 py-4 font-medium tracking-wide">{t("pricing.table.service")}</th>
                <th className="px-5 py-4 font-medium tracking-wide">{t("pricing.table.option")}</th>
                <th className="px-5 py-4 font-medium tracking-wide text-right">
                  {t("pricing.table.price")}
                </th>
              </tr>
            </thead>
            <tbody>
              {services.flatMap((s) =>
                s.tiers.map((tier, j) => (
                  <tr key={`${s.slug}-${j}`} className="border-b border-border/50 last:border-0">
                    <td className="px-5 py-3.5 text-foreground/90">
                      {j === 0 ? L(s.name) : ""}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{L(tier.label)}</td>
                    <td className="px-5 py-3.5 text-right text-champagne">
                      {price(tier.hkd)}
                      {tier.unit ? ` ${L(tier.unit)}` : ""}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
}
