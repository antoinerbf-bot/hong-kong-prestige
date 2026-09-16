import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us — HK Concierge & Bridge" },
      {
        name: "description",
        content:
          "HK Concierge & Bridge helps expatriates settle, live well and stay safe in Hong Kong — premium concierge with SGSIA-licensed close protection.",
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
        <h1 className="font-display mt-3 max-w-3xl text-4xl tracking-tight sm:text-5xl md:text-6xl">
          {t("about.title")}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
          {t("about.lede")}
        </p>
      </Reveal>

      <div className="hairline my-16" />

      <Reveal>
        <p className="eyebrow">{t("about.story.eyebrow")}</p>
        <h2 className="font-display mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl">
          {t("about.story.title")}
        </h2>
        <div className="mt-8 max-w-2xl space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>{t("about.story.p1")}</p>
          <p>{t("about.story.p2")}</p>
          <p>{t("about.story.p3")}</p>
        </div>
      </Reveal>

      <section className="mt-20">
        <Reveal>
          <p className="eyebrow">{t("about.values.eyebrow")}</p>
          <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">
            {t("about.values.title")}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 60}>
              <div className="surface-card rounded-xl p-7 sm:p-8">
                <h3 className="font-display text-xl tracking-wide text-champagne">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="mt-20">
        <div className="rounded-2xl border border-border bg-card/40 px-8 py-12 text-center sm:px-16">
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">{t("cta.title")}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{t("cta.intro")}</p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-champagne px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-champagne-soft"
          >
            {t("nav.book")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
