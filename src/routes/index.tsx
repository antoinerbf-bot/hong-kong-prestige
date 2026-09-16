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
      <section className="relative flex min-h-[88vh] items-end overflow-hidden sm:min-h-[92vh]">
        <HeroShowcase />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-12">
          <p className="eyebrow mb-6">{t("hero.eyebrow")}</p>
          <HeroTitle />
          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-champagne px-8 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-[0_8px_30px_-8px_oklch(0.48_0.09_75/0.45)] transition hover:bg-champagne-soft hover:scale-[1.02]"
            >
              {t("hero.cta.primary")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/35 px-6 py-3.5 text-sm font-medium backdrop-blur-md transition hover:border-champagne/50 hover:text-champagne"
            >
              {t("cta.whatsapp")}
            </a>
          </div>
          <a
            href="#services"
            className="mt-14 inline-flex items-center gap-2 text-[11px] tracking-[0.28em] text-muted-foreground uppercase transition hover:text-champagne"
          >
            {t("hero.scroll")}
            <ChevronDown className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </section>

      <section id="trust" className="border-b border-border bg-card/40">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px md:grid-cols-4">
          {trust.map((item, i) => (
            <Reveal key={item.title} delay={i * 50} className="px-5 py-9 sm:px-8 sm:py-12">
              <item.icon className="mb-4 h-5 w-5 text-champagne" strokeWidth={1.35} aria-hidden />
              <h3 className="text-sm font-medium tracking-wide text-foreground">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
                {item.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <div id="services">
        <ServiceGrid />
      </div>

      <section className="cv-auto mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Reveal>
          <p className="eyebrow">{t("featured.eyebrow")}</p>
          <h2 className="font-display mt-4 max-w-3xl text-4xl leading-[0.95] tracking-tight sm:text-5xl lg:text-[3.25rem]">
            {t("featured.title")}
          </h2>
        </Reveal>
        <div className="mt-14 space-y-10 lg:space-y-14">
          {featured.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group grid overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-500 hover:border-champagne/35 hover:shadow-luxe md:grid-cols-2"
              >
                <ParallaxImage
                  src={s.image}
                  alt={L(s.alt)}
                  className={`aspect-[16/10] md:aspect-auto md:min-h-[320px] lg:min-h-[380px] ${i % 2 === 1 ? "md:order-2" : ""}`}
                  intensity={0.14}
                />
                <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
                  <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-3 text-3xl leading-snug tracking-wide sm:text-4xl">
                    {L(s.name)}
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {L(s.intro)}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-champagne">
                    {t("services.learn")}
                    <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cv-auto border-y border-border bg-card/25">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <Reveal>
            <p className="eyebrow">{t("how.eyebrow")}</p>
            <h2 className="font-display mt-4 text-4xl tracking-tight sm:text-5xl">{t("how.title")}</h2>
            <p className="mt-5 max-w-lg text-sm text-muted-foreground sm:text-base">{t("how.intro")}</p>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 50}>
                <span className="font-display text-5xl text-champagne/35 sm:text-6xl">{step.n}</span>
                <h3 className="mt-4 text-base font-medium tracking-wide">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-auto mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Reveal>
          <p className="eyebrow">{t("why.eyebrow")}</p>
          <h2 className="font-display mt-4 max-w-3xl text-4xl tracking-tight sm:text-5xl">
            {t("why.title")}
          </h2>
          <p className="mt-5 max-w-2xl text-sm text-muted-foreground sm:text-base">{t("why.intro")}</p>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {why.map((item, i) => (
            <Reveal key={item.title} delay={i * 40}>
              <div className="surface-card group rounded-2xl p-7 transition duration-300 hover:border-champagne/30 sm:p-9">
                <h3 className="font-display text-xl text-champagne sm:text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cv-auto mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-champagne/25 bg-card px-8 py-16 text-center sm:px-16 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklab, var(--champagne) 18%, transparent), transparent 70%)",
              }}
            />
            <p className="eyebrow relative">{t("cta.eyebrow")}</p>
            <h2 className="font-display relative mt-5 text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              {t("cta.title")}
            </h2>
            <p className="relative mx-auto mt-5 max-w-md text-sm text-muted-foreground sm:text-base">
              {t("cta.intro")}
            </p>
            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-champagne px-8 py-3.5 text-sm font-medium text-primary-foreground transition hover:bg-champagne-soft hover:scale-[1.02]"
              >
                {t("nav.book")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-medium text-white transition hover:brightness-110"
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
