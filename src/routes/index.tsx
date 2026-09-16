import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Eye, Languages, Users, ArrowRight, ChevronDown } from "lucide-react";
import { useI18n, useLocalized } from "@/lib/i18n";
import { services, featuredSlugs, CONTACT } from "@/lib/services";
import { Reveal } from "@/components/Reveal";
import { HeroShowcase } from "@/components/HeroShowcase";
import { ServiceRail } from "@/components/ServiceRail";
import { ParallaxImage } from "@/components/ParallaxImage";

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
          "Settle into Hong Kong with calm, discretion and care. Premium concierge and SGSIA-licensed close protection.",
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
      <section className="relative flex min-h-[88vh] items-end overflow-hidden sm:min-h-[92vh]">
        <HeroShowcase />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-32">
          <p className="eyebrow mb-5">{t("hero.eyebrow")}</p>
          <h1 className="font-display max-w-3xl text-[2.35rem] leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.1rem] lg:leading-[1.08]">
            <span className="block">{t("hero.title.a")}</span>
            <span className="mt-1 block text-champagne">{t("hero.title.b")}</span>
          </h1>
          <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-foreground/85 sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-champagne px-6 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-champagne-soft"
            >
              {t("hero.cta.primary")}
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
          <a
            href="#trust"
            className="mt-14 inline-flex items-center gap-2 text-xs tracking-[0.22em] text-muted-foreground uppercase transition hover:text-champagne"
          >
            {t("hero.scroll")}
            <ChevronDown className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <section id="trust" className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
          {trust.map((item, i) => (
            <Reveal key={item.title} delay={i * 70} className="px-4 py-8 sm:px-8 sm:py-10">
              <item.icon className="mb-3 h-5 w-5 text-champagne" strokeWidth={1.4} />
              <h3 className="text-sm font-medium tracking-wide">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <ServiceRail />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="eyebrow">{t("featured.eyebrow")}</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl leading-tight tracking-tight sm:text-4xl">
            {t("featured.title")}
          </h2>
        </Reveal>
        <div className="mt-12 space-y-10">
          {featured.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group grid overflow-hidden rounded-2xl border border-border bg-card/40 transition hover:border-champagne/30 md:grid-cols-2"
              >
                <ParallaxImage
                  src={s.image}
                  alt={L(s.alt)}
                  className={`aspect-[16/10] md:aspect-auto md:min-h-[300px] ${i % 2 === 1 ? "md:order-2" : ""}`}
                  intensity={0.16}
                />
                <div className="flex flex-col justify-center p-7 sm:p-12">
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
      </section>

      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow">{t("how.eyebrow")}</p>
            <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl">{t("how.title")}</h2>
            <p className="mt-4 max-w-lg text-sm text-muted-foreground">{t("how.intro")}</p>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 60}>
                <span className="font-display text-4xl text-champagne/35">{step.n}</span>
                <h3 className="mt-3 text-base font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="eyebrow">{t("why.eyebrow")}</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl">
            {t("why.title")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">{t("why.intro")}</p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {why.map((item, i) => (
            <Reveal key={item.title} delay={i * 50}>
              <div className="surface-card rounded-xl p-6 sm:p-8">
                <h3 className="font-display text-xl text-champagne">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
        <Reveal>
          <div className="rounded-2xl border border-border bg-card/50 px-6 py-14 text-center sm:px-16">
            <p className="eyebrow">{t("cta.eyebrow")}</p>
            <h2 className="font-display mt-4 text-3xl tracking-tight sm:text-4xl">{t("cta.title")}</h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">{t("cta.intro")}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
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
