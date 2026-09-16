import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "@/icons";
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
        content: "Clear, indicative pricing for premium concierge services in Hong Kong.",
      },
    ],
  }),
});

function PricingPage() {
  const { t, price } = useI18n();
  const L = useLocalized();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <p className="eyebrow">{t("pricing.eyebrow")}</p>
        <h1 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">{t("pricing.title")}</h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">{t("pricing.intro")}</p>
        <p className="mt-2 text-xs text-muted-foreground">{t("pricing.note.en")}</p>
      </Reveal>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 font-medium">{t("pricing.table.service")}</th>
              <th className="py-3 pr-4 font-medium">{t("pricing.table.option")}</th>
              <th className="py-3 font-medium">{t("pricing.table.price")}</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) =>
              s.tiers.map((tier, i) => (
                <tr key={`${s.slug}-${i}`} className="border-b border-border/60">
                  <td className="py-3 pr-4 align-top">
                    {i === 0 ? (
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="font-medium text-foreground hover:text-champagne"
                      >
                        {L(s.name)}
                      </Link>
                    ) : null}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{L(tier.label)}</td>
                  <td className="py-3 text-champagne">
                    {price(tier.hkd)}
                    {tier.unit ? ` ${L(tier.unit)}` : ""}
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>

      <Reveal className="mt-12 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-champagne px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-champagne-soft"
        >
          {t("nav.book")}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </Reveal>
    </div>
  );
}
