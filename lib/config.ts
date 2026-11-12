/**
 * ============================================================
 *  إعدادات الصفحة — كل اللي محتاج تغيّره موجود هنا
 * ============================================================
 */

export const SITE = {
  /** رقم الاتصال والواتساب */
  phoneDisplay: "01206757616",
  phoneIntl: "+201206757616",
  whatsapp: "201206757616",

  /**
   * Web3Forms
   * 1) ادخل https://web3forms.com واكتب الإيميل اللي عايز الليدز توصل عليه
   * 2) هيوصلك Access Key على الإيميل — حطه هنا مكان النص ده
   *    (أو في Vercel كمتغير NEXT_PUBLIC_WEB3FORMS_KEY)
   * لحد ما تحط المفتاح: الفورم بيحوّل العميل على واتساب ببياناته عشان مفيش ليد يضيع.
   */
  web3formsKey:
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "9761f756-c0d5-426c-bb31-85068658a3a5",

  /** الدومين النهائي (للـ SEO و OpenGraph) */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mountainviewpropertie.com",

  /** اسم الجهة المسوّقة — بيظهر في الإفصاح أسفل الصفحة وسياسة الخصوصية */
  agentName: "وكيل مبيعات معتمد لمشروعات ماونتن فيو",

  /** Google Ads — سيب القيم زي ما هي لحد ما تجهز الأكواد */
  gtagId: "AW-XXXXXXXXXX",
  conversions: {
    form: "", // Conversion label للفورم
    whatsapp: "", // Conversion label لضغطة الواتساب
    call: "", // Conversion label لضغطة الاتصال
  },

  /** كريديت الوكالة في الفوتر — حط اللينك وهيتحول للينك nofollow تلقائياً */
  agency: { name: "One Click", url: "" },
};

export const WA_DEFAULT_MSG =
  "مرحباً، مهتم بمعرفة أسعار وتفاصيل ماونتن فيو تشيل اوت بارك اكتوبر";

export function waLink(msg: string = WA_DEFAULT_MSG) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export const isWeb3Ready = () =>
  !!SITE.web3formsKey && !SITE.web3formsKey.startsWith("YOUR_");

/* ------------------------------------------------------------
 *  الأسعار — استرشادية لحين التأكيد
 * ---------------------------------------------------------- */
export const PRICING = {
  startFrom: 13_400_000,
  downPaymentPct: 10,
  years: 8,
};

export type UnitKey = "townhouse" | "penthouse" | "ivilla" | "villa";

export const UNITS: {
  key: UnitKey;
  name: string;
  en: string;
  min: number; // بالمليون
  max: number;
  image: string;
  blurb: string;
  points: string[];
}[] = [
  {
    key: "townhouse",
    name: "تاون هاوس",
    en: "Townhouse",
    min: 13,
    max: 16,
    image: "/images/unit-penthouse.webp",
    blurb: "أقرب طريق لبيت بجاردن في ماونتن فيو اكتوبر — مساحات على أكتر من دور وحديقة خاصة وسط الخضرة.",
    points: ["جاردن خاص", "أكتر من دور", "خصوصية عائلية"],
  },
  {
    key: "ivilla",
    name: "آي فيلا",
    en: "iVilla",
    min: 20,
    max: 24,
    image: "/images/unit-ivilla.webp",
    blurb: "ابتكار ماونتن فيو: خصوصية الفيلا بحديقة أو روف خاص وبسعر أقل من الفيلا المستقلة.",
    points: ["جاردن أو روف خاص", "خصوصية أعلى", "تصميم ماونتن فيو"],
  },
  {
    key: "villa",
    name: "فيلا مستقلة",
    en: "Standalone Villa",
    min: 45,
    max: 50,
    image: "/images/unit-villa.webp",
    blurb: "فيلا مستقلة بحديقة خاصة وسط البحيرات والمساحات الخضراء في تشيل اوت بارك.",
    points: ["حديقة خاصة", "مستقلة بالكامل", "خصوصية كاملة"],
  },
];

export const UNIT_OPTIONS = [...UNITS.map((u) => u.name), "لسه بحدد"];
