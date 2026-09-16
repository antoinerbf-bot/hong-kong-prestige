import { Link } from "@tanstack/react-router";
import { useI18n, useLocalized } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { services, CONTACT } from "@/lib/services";
import { Logo } from "@/components/Logo";

export function Footer() {
  const { t } = useI18n();
  const L = useLocalized();
  const { theme } = useTheme();

  return (
    <footer className="border-t border-border bg-background transition-colors">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo onDark={theme === "dark"} />
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
