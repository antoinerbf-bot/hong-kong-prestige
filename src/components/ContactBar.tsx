import { MessageCircle, Phone } from "@/icons";
import { CHANNELS } from "@/lib/contact-links";
import { useI18n } from "@/lib/i18n";

export function ContactBar() {
  const { t } = useI18n();

  return (
    <div
      className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6"
      style={{ contentVisibility: "auto", containIntrinsicSize: "120px 100px" }}
    >
      <a
        href={CHANNELS.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-medium text-white shadow-lg transition hover:brightness-110"
        aria-label={t("cta.whatsapp")}
      >
        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
        <span className="hidden sm:inline">{t("cta.whatsapp")}</span>
        <span className="sm:hidden">WA</span>
      </a>
      <a
        href={CHANNELS.phone}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-md backdrop-blur-sm transition hover:border-champagne hover:text-champagne"
        aria-label={t("contact.phone")}
      >
        <Phone className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
