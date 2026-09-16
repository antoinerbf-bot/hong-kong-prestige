import { CONTACT } from "./services";

/** Channels commonly used in Hong Kong for business. */
export const CHANNELS = {
  whatsapp: CONTACT.whatsapp,
  phone: CONTACT.phoneHref,
  email: CONTACT.emailHref,
  /** WeChat deep link — opens app if installed; otherwise WeChat site */
  wechat: "weixin://",
  wechatWeb: "https://www.wechat.com/",
  /** Telegram as secondary option for some expats */
  telegram: "https://t.me/",
};

export function whatsappWithService(serviceName: string) {
  const text = encodeURIComponent(
    `Hello HK Concierge & Bridge, I'd like to enquire about: ${serviceName}`,
  );
  return `https://wa.me/85295275644?text=${text}`;
}

export function whatsappCartSummary(lines: string[]) {
  const body = [
    "Hello HK Concierge & Bridge,",
    "I'd like to request the following:",
    "",
    ...lines,
  ].join("\n");
  return `https://wa.me/85295275644?text=${encodeURIComponent(body)}`;
}
