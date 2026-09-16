import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "zh";

/** HKD -> USD reference rate. HKD prices remain the contractual reference. */
export const USD_RATE = 7.8;

const STORAGE_KEY = "hkcb-lang";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  /** Localised price string: USD in English, HKD in Traditional Chinese. */
  price: (hkd: number) => string;
};

const I18nContext = createContext<Ctx | null>(null);

function toUsd(hkd: number) {
  const raw = hkd / USD_RATE;
  return raw >= 100 ? Math.round(raw / 5) * 5 : Math.round(raw);
}

function formatPrice(hkd: number, lang: Lang) {
  if (lang === "zh") return `HKD ${hkd.toLocaleString("en-US")}`;
  return `USD ${toUsd(hkd).toLocaleString("en-US")}`;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "zh") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hant-HK" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage unavailable — language still applies for this visit */
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = dictionary[key];
      if (!entry) return key;
      return entry[lang];
    },
    [lang],
  );

  const price = useCallback((hkd: number) => formatPrice(hkd, lang), [lang]);

  const value = useMemo(() => ({ lang, setLang, t, price }), [lang, setLang, t, price]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}

/** Pick the right side of a bilingual content pair. */
export function useLocalized() {
  const { lang } = useI18n();
  return useCallback((pair: { en: string; zh: string }) => pair[lang], [lang]);
}

type Entry = { en: string; zh: string };

export const dictionary: Record<string, Entry> = {
  // Brand
  "brand.name": { en: "HK Concierge & Bridge", zh: "HK Concierge & Bridge" },
  "brand.short": { en: "Hong Kong", zh: "香港" },
  "brand.tagline": {
    en: "Private concierge & close protection · Hong Kong",
    zh: "私人管家服務及貼身保護 · 香港",
  },

  // Nav
  "nav.home": { en: "Home", zh: "首頁" },
  "nav.services": { en: "Services", zh: "服務" },
  "nav.pricing": { en: "Pricing", zh: "價目" },
  "nav.about": { en: "About", zh: "關於我們" },
  "nav.contact": { en: "Contact", zh: "聯絡我們" },
  "nav.book": { en: "Book a Service", zh: "預約服務" },
  "nav.menu": { en: "Menu", zh: "選單" },
  "nav.close": { en: "Close", zh: "關閉" },
  "nav.language": { en: "Language", zh: "語言" },

  // Hero
  "hero.eyebrow": { en: "Hong Kong · Est. for expatriates", zh: "香港 · 專為外籍人士而設" },
  "hero.title.a": { en: "Your private", zh: "您在香港的" },
  "hero.title.b": { en: "bridge to Hong Kong", zh: "私人橋樑" },
  "hero.subtitle": {
    en: "Premium concierge, relocation, lifestyle support and discreet close protection for expatriates and international clients in Hong Kong.",
    zh: "為在港外籍及國際客戶提供高端管家服務、搬遷安頓、生活支援，以及低調謹慎的貼身保護。",
  },
  "hero.cta.primary": { en: "Book a Service", zh: "預約服務" },
  "hero.cta.secondary": { en: "Contact Us", zh: "聯絡我們" },
  "hero.scroll": { en: "Discover", zh: "向下瀏覽" },

  // Trust
  "trust.sgsia": { en: "SGSIA Licensed", zh: "SGSIA 持牌" },
  "trust.sgsia.desc": { en: "Professional close protection", zh: "專業貼身保護" },
  "trust.discreet": { en: "Discreet & Reliable", zh: "謹慎可靠" },
  "trust.discreet.desc": { en: "Privacy and judgement, always", zh: "始終尊重隱私、審慎行事" },
  "trust.multilingual": { en: "Multilingual", zh: "多語支援" },
  "trust.multilingual.desc": { en: "English · Français · 中文", zh: "英語 · 法語 · 中文" },
  "trust.expat": { en: "Expat-Focused", zh: "外籍人士專屬" },
  "trust.expat.desc": { en: "Built around the needs of newcomers", zh: "為初到香港者而設" },

  // Services overview
  "services.eyebrow": { en: "What we do", zh: "服務範圍" },
  "services.title": {
    en: "A complete concierge for life in Hong Kong",
    zh: "全方位打理您的香港生活",
  },
  "services.intro": {
    en: "From your first week to everyday life and personal security — one trusted team, handled with discretion.",
    zh: "由抵港第一周到日常生活與個人安全，由同一支值得信賴的團隊謹慎處理。",
  },
  "services.all": { en: "View all services", zh: "瀏覽所有服務" },
  "services.details": { en: "Details", zh: "詳情" },
  "services.from": { en: "From", zh: "起價" },
  "services.learn": { en: "Learn more", zh: "了解更多" },
  "services.back": { en: "All services", zh: "所有服務" },
  "services.included": { en: "What's included", zh: "服務內容" },
  "services.benefits": { en: "Why clients choose it", zh: "客戶選擇的理由" },
  "services.pricing": { en: "Pricing", zh: "收費" },
  "services.request": { en: "Request this service", zh: "預約此服務" },
  "services.other": { en: "Other services", zh: "其他服務" },
  "services.page.title": { en: "Our services", zh: "我們的服務" },
  "services.page.intro": {
    en: "Seven considered services, delivered by one discreet team. Each request is confirmed personally before anything proceeds.",
    zh: "七項精心設計的服務，由同一支低調團隊執行。每項請求均會親自確認後才安排。",
  },

  // Featured
  "featured.eyebrow": { en: "Featured", zh: "重點服務" },
  "featured.title": {
    en: "Where we make the biggest difference",
    zh: "我們最能為您帶來改變之處",
  },

  // How it works
  "how.eyebrow": { en: "How it works", zh: "服務流程" },
  "how.title": { en: "Four simple steps", zh: "四個簡單步驟" },
  "how.intro": {
    en: "A calm, low-friction process from first request to reliable support.",
    zh: "由首次聯絡到穩定支援，過程從容而順暢。",
  },
  "how.1.title": { en: "Choose your service", zh: "選擇服務" },
  "how.1.desc": {
    en: "Browse our services and select the support you need.",
    zh: "瀏覽服務內容，選擇您所需的支援。",
  },
  "how.2.title": { en: "Submit your request", zh: "提交請求" },
  "how.2.desc": {
    en: "Share your preferred date, time and details in a few steps.",
    zh: "填寫理想日期、時間及細節，只需數個步驟。",
  },
  "how.3.title": { en: "Get confirmation", zh: "收到確認" },
  "how.3.desc": {
    en: "We review availability and confirm your request personally.",
    zh: "我們核對時間安排，並親自確認您的請求。",
  },
  "how.4.title": { en: "Enjoy reliable support", zh: "享受可靠支援" },
  "how.4.desc": {
    en: "Your dedicated contact handles everything with discretion.",
    zh: "專屬聯絡人會謹慎周全地處理一切。",
  },

  // Why us
  "why.eyebrow": { en: "Why HK Concierge & Bridge", zh: "為何選擇我們" },
  "why.title": { en: "Two disciplines, one trusted team", zh: "兩種專業，同一支團隊" },
  "why.intro": {
    en: "Premium concierge and licensed close protection under one roof — so the people who organise your week are the same people you trust with your safety.",
    zh: "高端管家服務與持牌貼身保護同屬一家，安排您日常事務的團隊，正是您安全上信賴的團隊。",
  },
  "why.1.title": { en: "Discretion", zh: "謹慎" },
  "why.1.desc": {
    en: "Your privacy is the foundation of everything we do. We work quietly and protect your information.",
    zh: "隱私是我們一切工作的基礎。我們低調行事，妥善保護您的資料。",
  },
  "why.2.title": { en: "Professionalism", zh: "專業" },
  "why.2.desc": {
    en: "Licensed, vetted and experienced. We hold ourselves to a high standard on every request.",
    zh: "持牌、經審核且經驗豐富。每項請求我們都以高標準要求自己。",
  },
  "why.3.title": { en: "Reliability", zh: "可靠" },
  "why.3.desc": {
    en: "We do what we say, on time. A single trusted point of contact you can depend on.",
    zh: "言出必行、準時到位。一位值得依靠的專屬聯絡人。",
  },
  "why.4.title": { en: "Care for newcomers", zh: "體貼新來港人士" },
  "why.4.desc": {
    en: "We understand the expat experience and meet you where you are — in your language where we can.",
    zh: "我們理解外籍人士的處境，並盡可能以您的語言與您溝通。",
  },

  // About
  "about.eyebrow": { en: "About us", zh: "關於我們" },
  "about.title": { en: "A trusted bridge to life in Hong Kong", zh: "通往香港生活的可靠橋樑" },
  "about.lede": {
    en: "We help expatriates settle, live well and stay safe — combining premium concierge with licensed close protection under one roof.",
    zh: "我們協助外籍人士安頓、生活得宜並保持安全，將高端管家服務與持牌貼身保護結合於一家。",
  },
  "about.story.eyebrow": { en: "Our story", zh: "我們的故事" },
  "about.story.title": {
    en: "Built for expats, by people who know Hong Kong",
    zh: "由熟悉香港的人，為外籍人士而建立",
  },
  "about.story.p1": {
    en: "Moving to Hong Kong is exciting — and demanding. Housing, banking, schools, daily errands and, for some, personal security all need attention at once, often in an unfamiliar system.",
    zh: "移居香港既令人期待，也充滿挑戰。住屋、銀行、學校、日常事務，以至部分客戶的個人安全，往往需要在陌生制度下同時處理。",
  },
  "about.story.p2": {
    en: "HK Concierge & Bridge was created to be the dependable bridge between newcomers and the city: a single, discreet team that handles relocation, everyday life and professional close protection with equal care.",
    zh: "HK Concierge & Bridge 的成立，正是要成為新來港人士與這座城市之間可靠的橋樑：由一支低調的團隊，同樣細心地處理搬遷安頓、日常生活及專業貼身保護。",
  },
  "about.story.p3": {
    en: "Our close protection is SGSIA-licensed, and every member of our team is selected for judgement, reliability and respect for your privacy. The result is calm, capable support you can trust — whatever you need.",
    zh: "我們的貼身保護服務持有 SGSIA 牌照，團隊成員均以判斷力、可靠性及對客戶隱私的尊重為選拔標準。結果是從容、專業且值得信賴的支援。",
  },
  "about.values.eyebrow": { en: "What we stand for", zh: "我們的信念" },
  "about.values.title": { en: "Our values", zh: "核心價值" },

  // Pricing
  "pricing.eyebrow": { en: "Pricing", zh: "價目" },
  "pricing.title": { en: "Clear, indicative pricing", zh: "清晰的參考價格" },
  "pricing.intro": {
    en: "Transparent starting prices. Every request is confirmed personally before anything proceeds.",
    zh: "價格透明公開。每項請求均會親自確認後才安排。",
  },
  "pricing.indicative": { en: "Indicative pricing", zh: "參考價格" },
  "pricing.note.en": {
    en: "Prices are shown in USD, converted from our Hong Kong dollar rates for convenience. Invoicing is in HKD.",
    zh: "價格以港幣顯示及結算。",
  },
  "pricing.compare": { en: "Compare all services", zh: "服務價格比較" },
  "pricing.table.service": { en: "Service", zh: "服務" },
  "pricing.table.option": { en: "Option", zh: "選項" },
  "pricing.table.price": { en: "Price", zh: "價格" },
  "pricing.currency.note.en": { en: "Showing prices in USD", zh: "價格以港幣顯示" },

  // CTA
  "cta.eyebrow": { en: "Speak with us", zh: "與我們聯絡" },
  "cta.title": {
    en: "Tell us what you need. We'll handle the rest.",
    zh: "告訴我們您的需要，其餘交給我們。",
  },
  "cta.intro": {
    en: "Whether it's a single request or ongoing support, our team responds promptly and in confidence.",
    zh: "無論是單次請求或長期支援，我們均會迅速且保密地回覆。",
  },
  "cta.email": { en: "Or email us directly at", zh: "亦可直接電郵至" },
  "cta.whatsapp": { en: "Chat on WhatsApp", zh: "WhatsApp 聯絡" },

  // Contact / booking
  "contact.eyebrow": { en: "Book a service", zh: "預約服務" },
  "contact.title": { en: "Request your service", zh: "提交服務請求" },
  "contact.intro": {
    en: "Share a few details and we will come back to you personally to confirm availability.",
    zh: "請填寫基本資料，我們會親自回覆並確認安排。",
  },
  "form.name": { en: "Name", zh: "姓名" },
  "form.email": { en: "Email", zh: "電子郵箱" },
  "form.phone": { en: "Phone / WhatsApp", zh: "電話 / WhatsApp" },
  "form.service": { en: "Service", zh: "服務項目" },
  "form.service.placeholder": { en: "Select a service", zh: "請選擇服務" },
  "form.date": { en: "Preferred date", zh: "理想日期" },
  "form.message": { en: "Message", zh: "備註" },
  "form.message.placeholder": {
    en: "Tell us briefly what you need.",
    zh: "請簡述您的需要。",
  },
  "form.submit": { en: "Send request", zh: "提交請求" },
  "form.sending": { en: "Preparing…", zh: "處理中…" },
  "form.required": { en: "Required", zh: "必填" },
  "form.success.title": { en: "Your request is ready to send", zh: "您的請求已準備就緒" },
  "form.success.body": {
    en: "We have opened your email with the details filled in. Send it and we will reply personally. Prefer WhatsApp? Use the button below.",
    zh: "我們已為您開啟預填內容的電郵。傳送後我們會親自回覆。亦可使用下方 WhatsApp 按鈕。",
  },
  "form.success.again": { en: "Send another request", zh: "再提交一次請求" },
  "form.error.name": { en: "Please enter your name.", zh: "請輸入姓名。" },
  "form.error.email": { en: "Please enter a valid email.", zh: "請輸入有效的電子郵箱。" },
  "form.error.service": { en: "Please choose a service.", zh: "請選擇服務項目。" },

  "contact.direct.title": { en: "Direct lines", zh: "直接聯絡" },
  "contact.phone": { en: "Phone / WhatsApp", zh: "電話 / WhatsApp" },
  "contact.emailLabel": { en: "Email", zh: "電子郵箱" },
  "contact.hours": { en: "Response time", zh: "回覆時間" },
  "contact.hours.value": {
    en: "We reply to every enquiry personally, usually the same day.",
    zh: "我們會親自回覆每項查詢，通常於當日內回覆。",
  },
  "contact.location": { en: "Coverage", zh: "服務範圍" },
  "contact.location.value": {
    en: "Hong Kong Island, Kowloon and the New Territories.",
    zh: "香港島、九龍及新界。",
  },

  // Footer
  "footer.services": { en: "Services", zh: "服務" },
  "footer.company": { en: "Company", zh: "公司" },
  "footer.contact": { en: "Contact", zh: "聯絡" },
  "footer.rights": { en: "All rights reserved.", zh: "版權所有。" },
  "footer.licence": {
    en: "Close protection provided under SGSIA licence.",
    zh: "貼身保護服務由 SGSIA 持牌人員提供。",
  },
};
