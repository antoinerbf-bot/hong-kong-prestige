import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useI18n, useLocalized } from "@/lib/i18n";
import { services, CONTACT } from "@/lib/services";
import { Reveal } from "@/components/Reveal";

type Search = { service?: string };

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  validateSearch: (search: Record<string, unknown>): Search => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a Service — HK Concierge & Bridge" },
      {
        name: "description",
        content:
          "Request a premium concierge or close protection service in Hong Kong. We reply personally, usually the same day.",
      },
    ],
  }),
});

function ContactPage() {
  const { service: preselected } = Route.useSearch();
  const { t } = useI18n();
  const L = useLocalized();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(preselected ?? "");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t("form.error.name");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t("form.error.email");
    if (!service) e.service = t("form.error.service");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const svc = services.find((s) => s.slug === service);
    const subject = encodeURIComponent(
      `Service request: ${svc ? svc.name.en : service} — ${name}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone / WhatsApp: ${phone || "—"}`,
        `Service: ${svc ? svc.name.en : service}`,
        `Preferred date: ${date || "—"}`,
        "",
        message || "(no message)",
      ].join("\n"),
    );

    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setName("");
    setEmail("");
    setPhone("");
    setService(preselected ?? "");
    setDate("");
    setMessage("");
    setErrors({});
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">{t("contact.eyebrow")}</p>
            <h1 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
              {t("contact.title")}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("contact.intro")}
            </p>
          </Reveal>

          <Reveal className="mt-12 space-y-8" delay={80}>
            <div>
              <h2 className="eyebrow">{t("contact.direct.title")}</h2>
              <dl className="mt-5 space-y-5 text-sm">
                <div>
                  <dt className="text-muted-foreground">{t("contact.phone")}</dt>
                  <dd className="mt-1">
                    <a href={CONTACT.phoneHref} className="text-foreground hover:text-champagne">
                      {CONTACT.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{t("contact.emailLabel")}</dt>
                  <dd className="mt-1">
                    <a href={CONTACT.emailHref} className="text-foreground hover:text-champagne">
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{t("contact.hours")}</dt>
                  <dd className="mt-1 text-foreground/85">{t("contact.hours.value")}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{t("contact.location")}</dt>
                  <dd className="mt-1 text-foreground/85">{t("contact.location.value")}</dd>
                </div>
              </dl>
            </div>

            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-champagne/40 px-5 py-2.5 text-sm text-champagne transition hover:bg-champagne/10"
            >
              {t("cta.whatsapp")}
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={100}>
            {sent ? (
              <div className="surface-card shadow-luxe rounded-xl p-8 sm:p-10">
                <h2 className="font-display text-2xl tracking-wide">{t("form.success.title")}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t("form.success.body")}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full border border-border px-5 py-2.5 text-sm transition hover:border-champagne/40"
                  >
                    {t("form.success.again")}
                  </button>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-champagne px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-champagne-soft"
                  >
                    {t("cta.whatsapp")}
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="surface-card shadow-luxe space-y-5 rounded-xl p-7 sm:p-9"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("form.name")} error={errors.name}>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className="field-input"
                      required
                    />
                  </Field>
                  <Field label={t("form.email")} error={errors.email}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="field-input"
                      required
                    />
                  </Field>
                </div>

                <Field label={t("form.phone")}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    className="field-input"
                  />
                </Field>

                <Field label={t("form.service")} error={errors.service}>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="field-input"
                    required
                  >
                    <option value="">{t("form.service.placeholder")}</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {L(s.name)}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label={t("form.date")}>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="field-input"
                  />
                </Field>

                <Field label={t("form.message")}>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder={t("form.message.placeholder")}
                    className="field-input resize-y"
                  />
                </Field>

                <button
                  type="submit"
                  className="w-full rounded-full bg-champagne px-6 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition hover:bg-champagne-soft"
                >
                  {t("form.submit")}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs tracking-wide text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
