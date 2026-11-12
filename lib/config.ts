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
 *  الأسعار — تحديث نوفمبر 2026 (أسعار بداية من المطوّر)
 * ---------------------------------------------------------- */
export type PlanKey = "y10" | "y8";

export const PLANS: { key: PlanKey; label: string; downPct: number; years: number; discountPct: number }[] = [
  { key: "y10", label: "3% مقدم على 10 سنوات", downPct: 3, years: 10, discountPct: 0 },
  { key: "y8", label: "10% مقدم على 8 سنوات بخصم 20%", downPct: 10, years: 8, discountPct: 20 },
];

export const PRICING = {
<<<<<<< HEAD
  /** أقل سعر في الجدول (وان فيلا — نظام 8 سنوات) */
  startFrom: 13_400_000,
  minDownPct: 3,
  maxYears: 10,
  discountPct: 20,
  deliveryYears: 3,
};

export type UnitKey = "onevilla" | "townhouse" | "greenviewC" | "greenviewB" | "chillout" | "grandchillout";
=======
  startFrom: 13_400_000,
  downPaymentPct: 10,
  years: 8,
};

export type UnitKey = "townhouse" | "penthouse" | "ivilla" | "villa";
>>>>>>> 7a698f2f989ffd99804fc16ddf628d16cadc7b12

export const UNITS: {
  key: UnitKey;
  name: string;
  en: string;
  bua: number; // المساحة المبنية م²
  config: string;
  outdoor: number; // جاردن/تراس/جراج تقريبي م²
  price10: number; // بالمليون — نظام 10 سنوات
  price8: number; // بالمليون — نظام 8 سنوات بخصم 20%
  image: string;
  blurb: string;
}[] = [
  {
<<<<<<< HEAD
    key: "onevilla",
    name: "وان فيلا",
    en: "One Villa",
    bua: 130,
    config: "3 غرف نوم",
    outdoor: 120,
    price10: 16.75,
    price8: 13.4,
=======
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
>>>>>>> 7a698f2f989ffd99804fc16ddf628d16cadc7b12
    image: "/images/unit-ivilla.webp",
    blurb: "أقل نقطة دخول لفيلا في تشيل اوت بارك — 3 غرف ومساحات خارجية خاصة حوالي 120 م².",
  },
  {
    key: "townhouse",
    name: "تاون هاوس",
    en: "Townhouse",
    bua: 185,
    config: "3 غرف نوم",
    outdoor: 110,
    price10: 21,
    price8: 16.8,
    image: "/images/unit-penthouse.webp",
    blurb: "بيت عائلي على أكتر من دور بمساحة 185 م² وجاردن خاص وسط الخضرة.",
  },
  {
    key: "greenviewC",
    name: "جرين فيو فيلا C",
    en: "Greenview Villa C",
    bua: 185,
    config: "3 غرف نوم",
    outdoor: 200,
    price10: 24.75,
    price8: 19.8,
    image: "/images/lakehouse.webp",
    blurb: "فيلا بإطلالة خضراء ومساحات خارجية حوالي 200 م² — خصوصية أعلى بنفس المساحة المبنية.",
  },
  {
    key: "greenviewB",
    name: "جرين فيو فيلا B",
    en: "Greenview Villa B",
    bua: 220,
    config: "3 غرف نوم",
    outdoor: 210,
    price10: 28.75,
    price8: 23,
    image: "/images/lakehouse-2.webp",
    blurb: "مساحة أكبر 220 م² بإطلالة خضراء ومساحات خارجية حوالي 210 م².",
  },
  {
    key: "chillout",
    name: "تشيل اوت فيلا",
    en: "Chillout Villa",
    bua: 290,
    config: "4 غرف + 2 ليفنج",
    outdoor: 280,
    price10: 39.875,
    price8: 31.9,
    image: "/images/unit-villa.webp",
    blurb: "فيلا 290 م² بـ 4 غرف وريسبشن مزدوج ومساحات خارجية حوالي 280 م².",
  },
  {
    key: "grandchillout",
    name: "جراند تشيل اوت فيلا",
    en: "Grand Chillout Villa",
    bua: 390,
    config: "5 غرف + 2 ليفنج",
    outdoor: 310,
    price10: 48.875,
    price8: 39.1,
    image: "/images/villa-pool.webp",
    blurb: "الأكبر في المشروع — 390 م² بـ 5 غرف وريسبشن مزدوج ومساحات خارجية حوالي 310 م².",
  },
];

/** تنسيق الأرقام بالمليون: 13.4 / 39.875 */
export const fmtM = (n: number) => String(Number(n.toFixed(3)));

export const UNIT_OPTIONS = [...UNITS.map((u) => u.name), "لسه بحدد"];
