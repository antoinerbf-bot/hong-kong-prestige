import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "@/icons";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — HK Concierge & Bridge" },
      {
        name: "description",
        content:
          "Premium concierge and SGSIA-licensed close protection for expatriates in Hong Kong.",
      },
    ],
  }),
});

function AboutPage() {
  const { t } = useI18n();

  const values = [
    { title: t("why.1.title"), desc: t("why.1.desc") },
    { title: t("why.2.title"), desc: t("why.2.desc") },
    { title: t("why.3.title"), desc: t("why.3.desc") },
    { title: t("why.4.title"), desc: t("why.4.desc") },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <p className="eyebrow">{t("about.eyebrow")}</p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl tracking-tight sm:text-5xl">
          {t("about.title")}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("about.lede")}
        </p>
      </Reveal>

      <Reveal className="mt-16 max-w-3xl">
        <p className="eyebrow">{t("about.story.eyebrow")}</p>
        <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">
          {t("about.story.title")}
        </h2>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>{t("about.story.p1")}</p>
          <p>{t("about.story.p2")}</p>
          <p>{t("about.story.p3")}</p>
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <p className="eyebrow">{t("about.values.eyebrow")}</p>
        <h2 className="font-display mt-3 text-3xl tracking-tight">{t("about.values.title")}</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="surface-card rounded-xl p-6 sm:p-8">
              <h3 className="font-display text-xl text-champagne">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-16 text-center">
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
