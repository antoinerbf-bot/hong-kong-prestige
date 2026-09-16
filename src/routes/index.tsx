import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Eye, Languages, Users, ArrowRight, ChevronDown } from "lucide-react";
import { useI18n, useLocalized } from "@/lib/i18n";
import { services, featuredSlugs, CONTACT } from "@/lib/services";
import { Reveal } from "@/components/Reveal";
import { HeroShowcase } from "@/components/HeroShowcase";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title:
          "HK Concierge & Bridge — Premium Concierge & Security for Expats in Hong Kong",
      },
      {
        name: "description",
        content:
          "Your private bridge to Hong Kong. Premium concierge, relocation, lifestyle support and SGSIA-licensed close protection for expatriates.",
      },
    ],
  }),
});

function Index() {
  const { t, price } = useI18n();
  const L = useLocalized();
  const featured = services.filter((s) => featuredSlugs.includes(s.slug));

  const trust = [
    { icon: Shield, title: t("trust.sgsia"), desc: t("trust.sgsia.desc") },
    { icon: Eye, title: t("trust.discreet"), desc: t("trust.discreet.desc") },
    { icon: Languages, title: t("trust.multilingual"), desc: t("trust.multilingual.desc") },
    { icon: Users, title: t("trust.expat"), desc: t("trust.expat.desc") },
  ];

  const steps = [
    { n: "01", title: t("how.1.title"), desc: t("how.1.desc") },
    { n: "02", title: t("how.2.title"), desc: t("how.2.desc") },
    { n: "03", title: t("how.3.title"), desc: t("how.3.desc") },
    { n: "04", title: t("how.4.title"), desc: t("how.4.desc") },
  ];

  const why = [
    { title: t("why.1.title"), desc: t("why.1.desc") },
    { title: t("why.2.title"), desc: t("why.2.desc") },
    { title: t("why.3.title"), desc: t("why.3.desc") },
    { title: t("why.4.title"), desc: t("why.4.desc") },
  ];

  return (
    <>
      {/* Hero — cinematic multi-service sequence */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <HeroShowcase />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-28 sm:px-8 sm:pb-28 sm:pt-32">
          <p className="eyebrow mb-5 sm:mb-6">{t("hero.eyebrow")}</p>
          <h1 className="font-display max-w-3xl text-[2.15rem] leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.08]">
            <span className="block overflow-visible">{t("hero.title.a")}</span>
            <span className="gold-text mt-1 block overflow-visible">{t("hero.title.b")}</span>
          </h1>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-foreground/85 sm:mt-6 sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-champagne px-5 py-3 text-sm font-medium tracking-wide text-primary-foreground transition hover:bg-champagne-soft sm:px-6 sm:py-3.5"
            >
              {t("hero.cta.primary")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium tracking-wide text-foreground transition hover:border-champagne/50 hover:text-champagne sm:px-6 sm:py-3.5"
            >
              {t("hero.cta.secondary")}
            </Link>
          </div>

          <a
            href="#trust"
            className="mt-12 inline-flex items-center gap-2 text-xs tracking-[0.25em] text-muted-foreground uppercase transition hover:text-champagne sm:mt-16"
          >
            {t("hero.scroll")}
            <ChevronDown className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
          {trust.map((item, i) => (
            <Reveal key={item.title} delay={i * 80} className="px-4 py-8 sm:px-8 sm:py-10">
              <item.icon className="mb-3 h-5 w-5 text-champagne sm:mb-4" strokeWidth={1.4} />
              <h3 className="text-sm font-medium tracking-wide text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services overview */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-28">
        <Reveal>
          <p className="eyebrow">{t("services.eyebrow")}</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {t("services.title")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("services.intro")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 50}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group surface-card shadow-luxe flex h-full flex-col overflow-hidden rounded-xl transition hover:border-champagne/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={L(s.alt)}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl leading-snug tracking-wide text-foreground">
                    {L(s.name)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {L(s.tagline)}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-4">
                    <span className="text-xs tracking-wide text-champagne">
                      {t("services.from")} {price(s.fromHkd)}
                      {s.fromUnit ? ` ${L(s.fromUnit)}` : ""}
                    </span>
                    <span className="text-xs tracking-wide text-muted-foreground group-hover:text-champagne">
                      {t("services.details")} →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm tracking-wide text-champagne transition hover:text-champagne-soft"
          >
            {t("services.all")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Featured */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-28">
          <Reveal>
            <p className="eyebrow">{t("featured.eyebrow")}</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("featured.title")}
            </h2>
          </Reveal>

          <div className="mt-12 space-y-8 sm:mt-14">
            {featured.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group grid overflow-hidden rounded-xl border border-border bg-background/50 transition hover:border-champagne/30 md:grid-cols-2"
                >
                  <div
                    className={`relative aspect-[16/10] md:aspect-auto md:min-h-[280px] ${
                      i % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <img
                      src={s.image}
                      alt={L(s.alt)}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-10 md:p-12">
                    <h3 className="font-display text-2xl leading-snug tracking-wide sm:text-3xl">
                      {L(s.name)}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {L(s.intro)}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm text-champagne">
                      {t("services.learn")}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-28">
        <Reveal>
          <p className="eyebrow">{t("how.eyebrow")}</p>
          <h2 className="font-display mt-3 text-3xl leading-tight tracking-tight sm:text-4xl">
            {t("how.title")}
          </h2>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">{t("how.intro")}</p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 70}>
              <div className="relative">
                <span className="font-display text-4xl text-champagne/30">{step.n}</span>
                <h3 className="mt-3 text-base font-medium tracking-wide">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-28">
          <Reveal>
            <p className="eyebrow">{t("why.eyebrow")}</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("why.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("why.intro")}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-2">
            {why.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="surface-card rounded-xl p-6 sm:p-8">
                  <h3 className="font-display text-xl tracking-wide text-champagne">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 px-6 py-12 text-center sm:px-16 sm:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.83_0.075_84/0.08),transparent_60%)]" />
            <div className="relative">
              <p className="eyebrow">{t("cta.eyebrow")}</p>
              <h2 className="font-display mt-4 text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl">
                {t("cta.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
                {t("cta.intro")}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-champagne px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-champagne-soft"
                >
                  {t("nav.book")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition hover:border-champagne/50 hover:text-champagne"
                >
                  {t("cta.whatsapp")}
                </a>
              </div>
              <p className="mt-8 text-xs text-muted-foreground">
                {t("cta.email")}{" "}
                <a href={CONTACT.emailHref} className="text-champagne hover:underline">
                  {CONTACT.email}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
