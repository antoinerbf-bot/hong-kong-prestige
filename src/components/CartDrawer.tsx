import { Link } from "@tanstack/react-router";
import { X, ShoppingBag } from "@/icons";
import { useCart } from "@/lib/cart";
import { getService } from "@/lib/services";
import { useI18n, useLocalized } from "@/lib/i18n";
import { whatsappCartSummary } from "@/lib/contact-links";

export function CartDrawer() {
  const { items, open, setOpen, remove, clear, count } = useCart();
  const { t, price } = useI18n();
  const L = useLocalized();

  if (!open) return null;

  const lines = items.map((item) => {
    const s = getService(item.serviceSlug);
    if (!s) return "";
    const tier = s.tiers[item.tierIndex] ?? s.tiers[0]!;
    return `• ${s.name.en} — ${tier.label.en} ×${item.qty} (${price(tier.hkd * item.qty)})`;
  });

  const totalHkd = items.reduce((sum, item) => {
    const s = getService(item.serviceSlug);
    if (!s) return sum;
    const tier = s.tiers[item.tierIndex] ?? s.tiers[0]!;
    return sum + tier.hkd * item.qty;
  }, 0);

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={() => setOpen(false)}
      />
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-champagne" aria-hidden />
            <h2 className="font-display text-lg tracking-wide">
              {t("cart.title")} ({count})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-accent"
            aria-label={t("nav.close")}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("cart.empty")}</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const s = getService(item.serviceSlug);
                if (!s) return null;
                const tier = s.tiers[item.tierIndex] ?? s.tiers[0]!;
                return (
                  <li
                    key={`${item.serviceSlug}-${item.tierIndex}`}
                    className="flex gap-3 border-b border-border/60 pb-4"
                  >
                    <img
                      src={s.image}
                      alt=""
                      className="h-16 w-16 rounded-lg object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{L(s.name)}</p>
                      <p className="text-xs text-muted-foreground">{L(tier.label)}</p>
                      <p className="mt-1 text-xs text-champagne">
                        {price(tier.hkd)} × {item.qty}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(item.serviceSlug, item.tierIndex)}
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      {t("cart.remove")}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-3 border-t border-border px-5 py-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("cart.total")}</span>
              <span className="font-medium text-champagne">{price(totalHkd)}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">{t("cart.note")}</p>
            <a
              href={whatsappCartSummary(lines.filter(Boolean))}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white transition hover:brightness-110"
            >
              {t("cart.checkout.wa")}
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-full border border-border px-4 py-3 text-sm transition hover:border-champagne/50"
            >
              {t("cart.checkout.form")}
            </Link>
            <button
              type="button"
              onClick={clear}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              {t("cart.clear")}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
