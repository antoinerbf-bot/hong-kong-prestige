import welcomeImg from "@/assets/service-welcome.jpg";
import bodyguardImg from "@/assets/service-bodyguard.jpg";
import dogImg from "@/assets/service-dog.jpg";
import babysittingImg from "@/assets/service-babysitting.jpg";
import socialImg from "@/assets/service-social.jpg";
import diningImg from "@/assets/service-dining.jpg";
import adminImg from "@/assets/service-admin.jpg";

export type Pair = { en: string; zh: string };

export type Tier = {
  label: Pair;
  hkd: number;
  /** Suffix appended after the price, e.g. "/ hour". */
  unit?: Pair;
};

export type Service = {
  slug: string;
  image: string;
  alt: Pair;
  name: Pair;
  tagline: Pair;
  /** Starting price in HKD plus its unit suffix. */
  fromHkd: number;
  fromUnit?: Pair;
  intro: Pair;
  body: Pair[];
  included: Pair[];
  benefits: Pair[];
  tiers: Tier[];
};

const perHour: Pair = { en: "/ hour", zh: "/ 小時" };
const perWalk: Pair = { en: "/ walk", zh: "/ 次" };
const perSession: Pair = { en: "/ session", zh: "/ 次" };
const perRequest: Pair = { en: "/ request", zh: "/ 次" };
const perTask: Pair = { en: "/ task", zh: "/ 項" };

export const services: Service[] = [
  {
    slug: "welcome-package",
    image: welcomeImg,
    alt: {
      en: "Concierge presenting apartment keys in a luxury Hong Kong residence",
      zh: "管家在香港豪華住宅內奉上住所鑰匙",
    },
    name: { en: "Welcome Package", zh: "抵港安頓套餐" },
    tagline: { en: "A settled start to life in Hong Kong.", zh: "為您的香港生活打好基礎。" },
    fromHkd: 4000,
    intro: {
      en: "End-to-end relocation support so your move into Hong Kong is calm, organised and handled by people who know the city.",
      zh: "全程搬遷安頓支援，由熟悉香港的團隊安排，讓您的遷居從容有序。",
    },
    body: [
      {
        en: "Arriving in a new city involves dozens of small, unfamiliar tasks — often in a language and system you do not yet know. Our Welcome Package brings them together under one trusted point of contact.",
        zh: "初到新城市，往往要面對數十項陌生瑣事，而且身處不熟悉的語言與制度之中。抵港安頓套餐把這一切交由同一位可靠聯絡人統籌。",
      },
      {
        en: "We accompany you through housing, banking, identity documents, schooling and domestic help, coordinating appointments and paperwork so you can focus on settling your family in.",
        zh: "我們陪同您處理住屋、銀行、身份證明文件、學校及家庭傭工事宜，協調預約與文件手續，讓您專心安頓家人。",
      },
    ],
    included: [
      { en: "Housing search & viewing support", zh: "尋找住所及陪同看樓" },
      { en: "Bank account opening assistance", zh: "協助開立銀行帳戶" },
      { en: "HKID application guidance", zh: "香港身份證申請指引" },
      { en: "School search & introductions", zh: "尋找學校及引薦" },
      { en: "Domestic helper search", zh: "尋找家庭傭工" },
    ],
    benefits: [
      { en: "One point of contact for every arrival task", zh: "所有抵港事務只需一位聯絡人" },
      { en: "Local knowledge of districts, schools and landlords", zh: "熟悉各區、學校及業主情況" },
      { en: "Appointments and paperwork coordinated for you", zh: "預約與文件手續由我們統籌" },
    ],
    tiers: [
      { label: { en: "Essential Welcome", zh: "基本安頓套餐" }, hkd: 4000 },
      { label: { en: "Complete Welcome", zh: "全面安頓套餐" }, hkd: 8000 },
    ],
  },
  {
    slug: "bodyguard-service",
    image: bodyguardImg,
    alt: {
      en: "Close protection officer beside a black luxury sedan at night in Hong Kong",
      zh: "貼身保護人員夜間於香港黑色豪華轎車旁待命",
    },
    name: { en: "Bodyguard Service", zh: "貼身保護服務" },
    tagline: {
      en: "SGSIA-licensed close protection, discreetly delivered.",
      zh: "SGSIA 持牌貼身保護，低調執行。",
    },
    fromHkd: 800,
    fromUnit: perHour,
    intro: {
      en: "Professional, licensed close protection for individuals, families and events — calm, low-profile and reassuringly competent.",
      zh: "為個人、家庭及活動提供專業持牌貼身保護，從容低調，令人安心。",
    },
    body: [
      {
        en: "Our protection is provided by SGSIA-licensed close protection officers with experience in executive and family security. The emphasis is on prevention, discretion and good judgement rather than visible force.",
        zh: "我們的保護服務由具備行政及家庭安全經驗的 SGSIA 持牌貼身保護人員提供，重點在於預防、謹慎與良好判斷，而非展示武力。",
      },
      {
        en: "Whether you need cover for a single sensitive appointment, ongoing executive protection, or security for a private event, we plan around your routine and keep your profile low.",
        zh: "無論是單次敏感行程、持續的行政保護，或私人活動保安，我們均會配合您的日常安排，並保持低調。",
      },
    ],
    included: [
      { en: "SGSIA-licensed close protection", zh: "SGSIA 持牌貼身保護" },
      { en: "Executive protection", zh: "行政人員保護" },
      { en: "Family protection", zh: "家庭保護" },
      { en: "Event & venue security", zh: "活動及場地保安" },
    ],
    benefits: [
      { en: "Licensed officers, vetted and experienced", zh: "持牌人員，經審核且經驗豐富" },
      { en: "Low-profile presence that fits your routine", zh: "低調存在，融入您的日常安排" },
      { en: "Prevention and planning before presence", zh: "以預防與規劃為先" },
    ],
    tiers: [
      { label: { en: "Per hour", zh: "每小時" }, hkd: 800, unit: perHour },
      { label: { en: "Half day (4 hours)", zh: "半日（4 小時）" }, hkd: 3200 },
      { label: { en: "Full day (8 hours)", zh: "全日（8 小時）" }, hkd: 6400 },
      { label: { en: "Event security", zh: "活動保安" }, hkd: 4000 },
    ],
  },
  {
    slug: "dog-walking",
    image: dogImg,
    alt: {
      en: "Dog on a leather leash on a tree-lined Hong Kong street at golden hour",
      zh: "黃昏時分，狗隻在香港林蔭街道上散步",
    },
    name: { en: "Dog Walking", zh: "寵物散步服務" },
    tagline: { en: "Reliable, caring walks for your dog.", zh: "細心可靠的愛犬散步服務。" },
    fromHkd: 150,
    fromUnit: { en: "/ 30 min", zh: "/ 30 分鐘" },
    intro: {
      en: "Punctual, attentive dog walking by someone you can trust with your home keys and your companion.",
      zh: "準時細心的散步服務，值得您託付家門鑰匙與愛犬。",
    },
    body: [
      {
        en: "A dependable walking routine keeps your dog happy while you are at work or travelling. We arrive on time, follow your instructions, and send a quick note after each walk.",
        zh: "穩定的散步習慣，讓您上班或出行期間，愛犬依然開心。我們準時到達、依照指示，並於每次散步後簡短匯報。",
      },
      {
        en: "Choose a quick 30-minute outing or a full hour of exercise. Regular weekly schedules are welcome.",
        zh: "可選 30 分鐘輕快散步或一小時充分運動，亦歡迎安排每周固定時間。",
      },
    ],
    included: [
      { en: "Punctual, vetted walkers", zh: "準時且經審核的散步員" },
      { en: "Flexible weekly schedules", zh: "靈活的每周時間安排" },
      { en: "Post-walk update on request", zh: "可要求散步後匯報" },
      { en: "Keys handled with care", zh: "妥善保管門匙" },
    ],
    benefits: [
      { en: "Same trusted walker wherever possible", zh: "盡可能由同一位散步員負責" },
      { en: "Instructions followed to the letter", zh: "嚴格依照您的指示" },
      { en: "Discreet handling of home access", zh: "謹慎處理住所出入" },
    ],
    tiers: [
      { label: { en: "30 minutes", zh: "30 分鐘" }, hkd: 150, unit: perWalk },
      { label: { en: "1 hour", zh: "1 小時" }, hkd: 250, unit: perWalk },
    ],
  },
  {
    slug: "babysitting-pickup",
    image: babysittingImg,
    alt: {
      en: "Carer walking a child home from school on a Hong Kong street",
      zh: "看護人員接送小童放學走在香港街道上",
    },
    name: { en: "Babysitting & After-School Pickup", zh: "保姆及放學接送" },
    tagline: { en: "Trusted care and safe school pickups.", zh: "可信的照顧與安全的放學接送。" },
    fromHkd: 120,
    fromUnit: perHour,
    intro: {
      en: "Attentive babysitting and reliable after-school pickup, giving parents confidence and flexibility.",
      zh: "細心的保姆服務及可靠的放學接送，讓家長安心而靈活。",
    },
    body: [
      {
        en: "Our carers are experienced with children and briefed on your family's routine, allergies and preferences. We prioritise safety, punctuality and clear communication.",
        zh: "我們的看護人員具備照顧兒童經驗，並會就您家庭的作息、過敏及喜好接受詳細說明。安全、守時與清晰溝通是我們的首要考慮。",
      },
      {
        en: "Use us for evening babysitting, school pickups, or bridging the gap between school hours and a parent's return.",
        zh: "可用於晚間保姆、放學接送，或銜接放學至家長回家之間的時段。",
      },
    ],
    included: [
      { en: "Experienced, vetted carers", zh: "經驗豐富且經審核的看護人員" },
      { en: "On-time after-school pickup", zh: "準時放學接送" },
      { en: "Routine & allergy briefing", zh: "作息及過敏事項說明" },
      { en: "Clear parent communication", zh: "與家長清晰溝通" },
    ],
    benefits: [
      { en: "Safety and punctuality come first", zh: "安全與守時為先" },
      { en: "Carers briefed on your family's routine", zh: "看護人員熟悉您家庭的作息" },
      { en: "Flexible evening and weekday cover", zh: "靈活的晚間及平日安排" },
    ],
    tiers: [
      { label: { en: "Babysitting", zh: "保姆服務" }, hkd: 120, unit: perHour },
      { label: { en: "After-school pickup", zh: "放學接送" }, hkd: 150, unit: perSession },
    ],
  },
  {
    slug: "social-accompaniment",
    image: socialImg,
    alt: {
      en: "Two elegantly dressed people walking the Hong Kong harbour promenade at sunset",
      zh: "衣著優雅的二人於日落時分漫步香港海濱長廊",
    },
    name: { en: "Social Accompaniment", zh: "社交陪伴服務" },
    tagline: { en: "Friendly company for newcomers.", zh: "為初來港者提供友善陪伴。" },
    fromHkd: 250,
    fromUnit: perHour,
    intro: {
      en: "Warm, reliable companionship for walks, coffee, and cultural outings — easing the first months in a new city.",
      zh: "溫暖可靠的陪伴，一同散步、喝咖啡、體驗文化，讓初到新城市的頭幾個月更輕鬆。",
    },
    body: [
      {
        en: "Settling into Hong Kong is easier with company. Our accompaniment service offers genuine, considerate companionship for those finding their feet — whether a newcomer, a visiting parent, or anyone who would value a friendly presence.",
        zh: "有人相伴，適應香港更容易。我們的陪伴服務為正在適應的客戶提供真誠體貼的陪伴，無論是新來港人士、來訪的父母，或任何希望有人相伴的客戶。",
      },
      {
        en: "Enjoy a harbour walk, a coffee meetup, or a guided cultural outing, at a pace that suits you.",
        zh: "可選海濱漫步、咖啡聚會或文化導賞，節奏由您決定。",
      },
    ],
    included: [
      { en: "Walks & harbour outings", zh: "散步及海濱行程" },
      { en: "Coffee meetups", zh: "咖啡聚會" },
      { en: "Cultural & neighbourhood tours", zh: "文化及社區導賞" },
      { en: "Companionship for newcomers", zh: "為新來港者提供陪伴" },
    ],
    benefits: [
      { en: "Considerate, genuinely friendly company", zh: "體貼真誠的陪伴" },
      { en: "Local insight into neighbourhoods", zh: "了解各區生活的在地視角" },
      { en: "A pace and programme that suits you", zh: "節奏與行程完全配合您" },
    ],
    tiers: [
      { label: { en: "Per hour", zh: "每小時" }, hkd: 250, unit: perHour },
      { label: { en: "Half day (4 hours)", zh: "半日（4 小時）" }, hkd: 900 },
    ],
  },
  {
    slug: "gastronomic-reservations",
    image: diningImg,
    alt: {
      en: "Private fine dining table set with crystal glassware overlooking the Hong Kong skyline",
      zh: "私人餐室內佈置精緻的餐桌，可俯瞰香港夜景",
    },
    name: { en: "Gastronomic Reservations", zh: "名廚餐廳訂座" },
    tagline: {
      en: "A table at Hong Kong's hardest-to-book restaurants.",
      zh: "為您安排香港最難訂的餐桌。",
    },
    fromHkd: 500,
    fromUnit: perRequest,
    intro: {
      en: "Access to sought-after tables, private dining and special-occasion arrangements across Hong Kong's finest restaurants.",
      zh: "為您安排香港頂級餐廳的熱門座位、私人宴客及特別場合。",
    },
    body: [
      {
        en: "Some of the city's best tables are difficult to secure without the right relationships. We handle the requests, timing and details so your evening is effortless.",
        zh: "城中部分最佳餐桌，若沒有適當人脈難以訂到。我們處理訂座、時間與細節，讓您的晚宴輕鬆自在。",
      },
      {
        en: "From a hard-to-get reservation to a fully arranged private dinner for a special occasion, we manage it discreetly on your behalf.",
        zh: "由一席難求的訂座，到為特別場合全程安排的私人晚宴，我們均會低調代您處理。",
      },
    ],
    included: [
      { en: "Hard-to-get reservations", zh: "熱門餐廳訂座" },
      { en: "Private dining arrangements", zh: "私人宴客安排" },
      { en: "Special-occasion planning", zh: "特別場合策劃" },
      { en: "Dietary & seating preferences handled", zh: "飲食及座位要求代為安排" },
    ],
    benefits: [
      { en: "Relationships with sought-after venues", zh: "與熱門餐廳保持良好關係" },
      { en: "Every detail arranged in advance", zh: "所有細節事先安排妥當" },
      { en: "Discreet handling on your behalf", zh: "低調代您處理" },
    ],
    tiers: [
      { label: { en: "Reservation request", zh: "訂座服務" }, hkd: 500, unit: perRequest },
      { label: { en: "Private dining", zh: "私人宴客" }, hkd: 1500 },
    ],
  },
  {
    slug: "administrative-concierge",
    image: adminImg,
    alt: {
      en: "Executive desk with leather folder and pen overlooking the Hong Kong skyline at night",
      zh: "行政書桌上的皮革文件夾與筆，窗外是香港夜景",
    },
    name: { en: "Administrative Concierge", zh: "行政事務助理" },
    tagline: { en: "Your errands and paperwork, handled.", zh: "您的瑣事與文書，交由我們處理。" },
    fromHkd: 300,
    fromUnit: perHour,
    intro: {
      en: "Day-to-day administrative support — errands, parcels, appointments and basic paperwork — to give you back your time.",
      zh: "日常行政支援：跑腿、收件、預約及基本文書處理，為您節省時間。",
    },
    body: [
      {
        en: "The small administrative tasks of daily life add up. We take them off your plate: collecting parcels, running errands, booking appointments and helping with straightforward paperwork.",
        zh: "生活中的行政瑣事日積月累。我們代您處理：收取包裹、外出辦事、代訂預約，並協助簡單文書。",
      },
      {
        en: "Engage us on demand or on a regular basis, with the same trusted point of contact each time.",
        zh: "可按需要或定期委託，每次均由同一位可靠聯絡人跟進。",
      },
    ],
    included: [
      { en: "Errands & personal shopping", zh: "跑腿及代購" },
      { en: "Parcel reception & delivery", zh: "代收及送遞包裹" },
      { en: "Appointment booking", zh: "代訂預約" },
      { en: "Basic paperwork support", zh: "基本文書支援" },
    ],
    benefits: [
      { en: "Hours returned to your week", zh: "為您每周省下時間" },
      { en: "On-demand or regular support", zh: "可按需或定期支援" },
      { en: "The same trusted contact each time", zh: "每次均由同一位聯絡人跟進" },
    ],
    tiers: [
      { label: { en: "Hourly support", zh: "按小時支援" }, hkd: 300, unit: perHour },
      { label: { en: "Single errand / parcel", zh: "單次跑腿 / 收件" }, hkd: 250, unit: perTask },
    ],
  },
];

export const featuredSlugs = [
  "welcome-package",
  "bodyguard-service",
  "gastronomic-reservations",
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const CONTACT = {
  phone: "+852 9527 5644",
  phoneHref: "tel:+85295275644",
  whatsapp:
    "https://wa.me/85295275644?text=Hello%20HK%20Concierge%20%26%20Bridge%2C%20I%27d%20like%20to%20enquire%20about%20your%20services.",
  email: "conciergebridge@gmail.com",
  emailHref: "mailto:conciergebridge@gmail.com",
};
