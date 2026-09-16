import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { services, CONTACT } from "@/lib/services";
import { useLocalized } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const L = useLocalized();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne/40 text-[11px] font-medium tracking-[0.18em] text-champagne">
                HK
              </span>
              <span className="font-display text-lg tracking-wide">{t("brand.name")}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <p className="mt-4 text-xs tracking-wide text-muted-foreground/80">{t("footer.licence")}</p>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow">{t("footer.services")}</h3>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-sm text-foreground/75 transition hover:text-champagne"
                  >
                    {L(s.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow">{t("footer.company")}</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-foreground/75 transition hover:text-champagne">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-foreground/75 transition hover:text-champagne">
                  {t("nav.pricing")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/75 transition hover:text-champagne">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow">{t("footer.contact")}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={CONTACT.emailHref} className="text-foreground/75 transition hover:text-champagne">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className="text-foreground/75 transition hover:text-champagne">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-champagne transition hover:text-champagne-soft"
                >
                  {t("cta.whatsapp")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-14" />
        <div className="mt-6 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t("brand.name")}. {t("footer.rights")}
          </p>
          <p className="tracking-wide">{t("brand.tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
