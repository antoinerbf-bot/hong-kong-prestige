import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Eye, Languages, Users, ArrowRight, ChevronDown } from "@/icons";
import { useI18n, useLocalized } from "@/lib/i18n";
import { services, featuredSlugs, CONTACT } from "@/lib/services";
import { Reveal } from "@/components/Reveal";
import { HeroShowcase } from "@/components/HeroShowcase";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ParallaxImage } from "@/components/ParallaxImage";
import { HeroTitle } from "@/components/HeroTitle";

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
          "Premium concierge, relocation, lifestyle support and SGSIA-licensed close protection for expatriates in Hong Kong. Handled with discretion and professionalism.",
      },
    ],
  }),
});

function Index() {
  const { t } = useI18n();
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
      {/* Hero — official messaging, cinematic media */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden sm:min-h-[90vh]">
        <HeroShowcase />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
          <p className="eyebrow mb-6">{t("hero.eyebrow")}</p>
          <HeroTitle />
          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-champagne px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition hover:bg-champagne-soft"
            >
              {t("hero.cta.primary")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/40 px-6 py-3.5 text-sm font-medium backdrop-blur-sm transition hover:border-champagne/50 hover:text-champagne"
            >
              {t("cta.whatsapp")}
            </a>
          </div>
          <a
            href="#services"
            className="mt-12 inline-flex items-center gap-2 text-[11px] tracking-[0.24em] text-muted-foreground uppercase transition hover:text-champagne"
          >
            {t("hero.scroll")}
            <ChevronDown className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </section>

      {/* Trust strip — like official site */}
      <section id="trust" className="border-b border-border bg-card/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
          {trust.map((item, i) => (
            <Reveal key={item.title} delay={i * 50} className="px-5 py-8 sm:px-8 sm:py-10">
              <item.icon className="mb-3 h-5 w-5 text-champagne" strokeWidth={1.35} aria-hidden />
              <h3 className="text-sm font-medium tracking-wide text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services — grid, not horizontal rail */}
      <div id="services">
        <ServiceGrid />
      </div>

      {/* Featured deep-dive */}
      <section className="cv-auto mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="eyebrow">{t("featured.eyebrow")}</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl">
            {t("featured.title")}
          </h2>
        </Reveal>
        <div className="mt-12 space-y-8">
          {featured.map((s, i) => (
            <Reveal key={s.slug} delay={i * 50}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group grid overflow-hidden rounded-2xl border border-border bg-card transition hover:border-champagne/30 md:grid-cols-2"
              >
                <ParallaxImage
                  src={s.image}
                  alt={L(s.alt)}
                  className={`aspect-[16/10] md:aspect-auto md:min-h-[280px] ${i % 2 === 1 ? "md:order-2" : ""}`}
                  intensity={0.12}
                />
                <div className="flex flex-col justify-center p-7 sm:p-11">
                  <h3 className="font-display text-2xl leading-snug tracking-wide sm:text-3xl">
                    {L(s.name)}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {L(s.intro)}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-champagne">
                    {t("services.learn")}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cv-auto border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow">{t("how.eyebrow")}</p>
            <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">{t("how.title")}</h2>
            <p className="mt-4 max-w-lg text-sm text-muted-foreground">{t("how.intro")}</p>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 50}>
                <span className="font-display text-4xl text-champagne/40">{step.n}</span>
                <h3 className="mt-3 text-base font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-auto mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="eyebrow">{t("why.eyebrow")}</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl">
            {t("why.title")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">{t("why.intro")}</p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {why.map((item, i) => (
            <Reveal key={item.title} delay={i * 40}>
              <div className="surface-card rounded-xl p-6 sm:p-8">
                <h3 className="font-display text-xl text-champagne">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cv-auto mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
        <Reveal>
          <div className="rounded-2xl border border-border bg-card px-6 py-14 text-center sm:px-16">
            <p className="eyebrow">{t("cta.eyebrow")}</p>
            <h2 className="font-display mt-4 text-3xl tracking-tight sm:text-4xl">{t("cta.title")}</h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">{t("cta.intro")}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-champagne px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-champagne-soft"
              >
                {t("nav.book")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-white transition hover:brightness-110"
              >
                {t("cta.whatsapp")}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
