import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", key: "nav.home" },
  { to: "/services", key: "nav.services" },
  { to: "/pricing", key: "nav.pricing" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Header() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);

  const switchLang = (l: Lang) => {
    setLang(l);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne/40 text-[11px] font-medium tracking-[0.18em] text-champagne">
            HK
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[15px] tracking-wide text-foreground">
              {t("brand.name")}
            </span>
            <span className="text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
              {t("brand.tagline").split("·")[0]?.trim()}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-underline text-[13px] font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="hidden items-center gap-1 rounded-full border border-border px-1 py-1 text-[11px] tracking-wider sm:flex"
            role="group"
            aria-label={t("nav.language")}
          >
            <button
              type="button"
              onClick={() => switchLang("en")}
              className={cn(
                "rounded-full px-2.5 py-1 transition-colors",
                lang === "en"
                  ? "bg-champagne text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => switchLang("zh")}
              className={cn(
                "rounded-full px-2.5 py-1 transition-colors",
                lang === "zh"
                  ? "bg-champagne text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              繁
            </button>
          </div>

          <Link
            to="/contact"
            className="hidden rounded-full bg-champagne px-4 py-2 text-[12px] font-medium tracking-wide text-primary-foreground transition hover:bg-champagne-soft sm:inline-flex"
          >
            {t("nav.book")}
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            aria-label={open ? t("nav.close") : t("nav.menu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm tracking-wide text-foreground/90 hover:bg-accent"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2 px-3">
              <button
                type="button"
                onClick={() => switchLang("en")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs tracking-wider",
                  lang === "en" ? "bg-champagne text-primary-foreground" : "border border-border",
                )}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => switchLang("zh")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs tracking-wider",
                  lang === "zh" ? "bg-champagne text-primary-foreground" : "border border-border",
                )}
              >
                繁中
              </button>
            </div>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-champagne px-4 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              {t("nav.book")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
