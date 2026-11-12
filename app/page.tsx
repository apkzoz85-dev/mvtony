import Image from "next/image";
import {
  Bike,
  Baby,
  Building2,
  ChevronDown,
  Dumbbell,
  Flower2,
  Footprints,
  MapPin,
  Phone,
  Sparkles,
  Trees,
  Waves,
} from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { LeadModalProvider } from "@/components/lead-modal";
import { Calculator } from "@/components/calculator";
import { CallLink, LeadButton, Reveal, WaLink, WhatsAppIcon } from "@/components/actions";
import { CookieConsent, Header, PrivacyButton, StickyActions, Wordmark } from "@/components/chrome";
import { PRICING, SITE, UNITS, fmtM } from "@/lib/config";

const startM = fmtM(PRICING.startFrom / 1e6);

const FAQ = [
  {
    q: "كم تبدأ أسعار ماونتن فيو تشيل اوت بارك اكتوبر؟",
    a: `تبدأ أسعار ماونتن فيو تشيل اوت بارك من ${startM} مليون جنيه. ${UNITS.map((u) => `${u.name} ${u.bua} م² من ${fmtM(u.price8)} مليون`).join("، ")} (بنظام 8 سنوات بعد خصم 20%). الأسعار أسعار بداية وقابلة للتحديث من المطوّر.`,
  },
  {
    q: "ما هي أنظمة السداد في ماونتن فيو اكتوبر — تشيل اوت بارك؟",
    a: `نظامين: مقدم 3% وتقسيط على 10 سنوات، أو مقدم 10% وتقسيط على 8 سنوات مع خصم ${PRICING.discountPct}% على السعر. الاستلام بعد ${PRICING.deliveryYears} سنين. سجّل بياناتك وهنبعتلك خطة السداد التفصيلية لكل وحدة.`,
  },
  {
    q: "أين يقع كمبوند ماونتن فيو تشيل اوت بارك؟",
    a: "يقع تشيل اوت بارك في التوسعات الشمالية بمدينة 6 اكتوبر، على بعد دقائق من الطريق الدائري ومحور 26 يوليو، و16 دقيقة من نادي الرماية، و18 دقيقة من ميدان جهينة ومول العرب.",
  },
  {
    q: "ما أنواع الوحدات المتاحة في تشيل اوت بارك اكتوبر؟",
    a: `المتاح حالياً: ${UNITS.map((u) => `${u.name} (${u.bua} م² — ${u.config})`).join("، ")}. المساحات الخارجية تقريبية وقابلة للتغيير — اطلب المتاح من مستشار المبيعات.`,
  },
  {
    q: "من هو مطوّر مشروع تشيل اوت بارك؟",
    a: "المشروع من تطوير شركة ماونتن فيو (Mountain View)، وتم إطلاقه عام 2014 على مساحة 216 فدان في 6 اكتوبر.",
  },
  {
    q: "هل هذا الموقع الرسمي لماونتن فيو؟",
    a: `لا. هذا موقع تسويقي يديره ${SITE.agentName}، والأسعار المعروضة استرشادية. التعاقد يتم مباشرة مع المطوّر.`,
  },
];

const AMENITIES = [
  [Waves, "بحيرة قابلة للسباحة"],
  [Sparkles, "سبا فاخر وجاكوزي جانجل"],
  [Flower2, "Yoga Park وبحيرة التأمل"],
  [Footprints, "ممشى ومسارات جري"],
  [Bike, "مسار دراجات"],
  [Trees, "Forest Promenade وحديقة Rainbow"],
  [Dumbbell, "ملاعب رياضية"],
  [Baby, "حضانة أطفال"],
  [Building2, "Business Park ومسجد"],
] as const;

const DISTANCES = [
  ["دقائق", "الطريق الدائري ومحور 26 يوليو"],
  ["16 دقيقة", "نادي الرماية"],
  ["18 دقيقة", "ميدان جهينة"],
  ["18 دقيقة", "مول العرب"],
];

const NEARBY = [
  "مول مصر",
  "مستشفى دار الفؤاد",
  "أركان بلازا",
  "جاليريا 40",
  "بالم هيلز",
  "سوديك",
  "بيفرلي هيلز",
  "مدارس BISK و AIS",
];

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`mb-3 flex items-center gap-3 text-sm font-semibold ${light ? "text-sky" : "text-blue"}`}
    >
      <span className={`h-px w-8 ${light ? "bg-sky" : "bg-blue"}`} />
      {children}
    </p>
  );
}

export default function Page() {
  return (
    <LeadModalProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <Header />

      <main id="top" className="pb-[58px] md:pb-0">
        {/* ============ HERO ============ */}
        <section className="relative isolate overflow-hidden bg-navy text-white">
          <Image
            src="/images/hero.webp"
            alt="ماونتن فيو تشيل اوت بارك اكتوبر — البحيرة والفيلات"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/85 via-navy/55 to-navy/90 lg:bg-gradient-to-l lg:from-navy/90 lg:via-navy/60 lg:to-navy/30" />

          <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-28 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-36">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
                <MapPin className="size-4" aria-hidden />
                ماونتن فيو اكتوبر · التوسعات الشمالية
              </p>
              <h1 className="text-[2.5rem] font-extrabold leading-[1.2] sm:text-6xl lg:text-[4.2rem]">
                ماونتن فيو
                <br />
                <span className="text-sky">تشيل اوت بارك</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
                بيتك وسط البحيرات والخُضرة على 216 فدان في قلب 6 اكتوبر — وان فيلا، تاون هاوس، جرين فيو
                وتشيل اوت فيلا. استلام بعد {PRICING.deliveryYears} سنين.
              </p>

              <dl className="mt-7 grid max-w-xl grid-cols-3 rounded-xl [&>div+div]:border-s [&>div+div]:border-white/20 border border-white/20 bg-white/10 text-center backdrop-blur">
                <div className="px-2 py-4">
                  <dt className="text-xs text-white/70">تبدأ من</dt>
                  <dd className="mt-1 font-display text-xl font-bold sm:text-2xl">
                    <span dir="ltr">{startM}</span> مليون
                  </dd>
                </div>
                <div className="px-2 py-4">
                  <dt className="text-xs text-white/70">مقدم من</dt>
                  <dd className="mt-1 font-display text-xl font-bold sm:text-2xl" dir="ltr">
                    {PRICING.minDownPct}%
                  </dd>
                </div>
                <div className="px-2 py-4">
                  <dt className="text-xs text-white/70">تقسيط حتى</dt>
                  <dd className="mt-1 font-display text-xl font-bold sm:text-2xl">
                    {PRICING.maxYears} سنوات
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-sm text-white/75">
                أو مقدم 10% على 8 سنوات مع <strong className="text-sky">خصم {PRICING.discountPct}%</strong>
              </p>

              <div className="mt-6 hidden items-center gap-3 lg:flex">
                <WaLink className="flex items-center gap-2 rounded-lg bg-wa px-5 py-3.5 font-bold text-white transition hover:brightness-110">
                  <WhatsAppIcon /> اسأل على واتساب
                </WaLink>
                <CallLink className="flex items-center gap-2 rounded-lg border border-white/50 px-5 py-3.5 font-bold" />
              </div>
            </div>

            <div id="register" className="cut rounded-2xl bg-cream p-5 text-ink shadow-2xl sm:p-7">
              <h2 className="text-2xl font-bold text-navy">اعرف الأسعار والوحدات المتاحة</h2>
              <p className="mb-5 mt-1.5 text-sm text-ink/65">
                سجّل في 20 ثانية وهنبعتلك تفاصيل ماونتن فيو تشيل اوت بارك على واتساب.
              </p>
              <LeadForm source="hero" idPrefix="h" />
            </div>
          </div>
        </section>

        {/* ============ INTRO ============ */}
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <Reveal>
            <Eyebrow>عن المشروع</Eyebrow>
            <h2 className="text-3xl font-bold leading-snug text-navy sm:text-4xl">
              كمبوند ماونتن فيو تشيل اوت بارك 6 اكتوبر
            </h2>
            <p className="mt-5 text-lg leading-loose text-ink/75">
              في 2014 أطلقت ماونتن فيو مشروع تشيل اوت بارك على 216 فدان في اكتوبر، وحوّلتها لمجتمع
              هادي مبني حوالين البحيرات والمساحات الخضراء. النهارده أكثر من 500 أسرة اختارت
              المشروع عشان أسلوب حياة مختلف: خصوصية، هدوء، ومجتمع شبهك.
            </p>
            <ul className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                ["216", "فدان"],
                ["+500", "أسرة"],
                ["2014", "سنة الإطلاق"],
              ].map(([n, l]) => (
                <li key={l} className="rounded-xl bg-white p-4 ring-1 ring-ink/5">
                  <span className="block font-display text-2xl font-bold text-green" dir="ltr">
                    {n}
                  </span>
                  <span className="text-sm text-ink/60">{l}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="relative">
            <div className="cut-lg relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/community.webp"
                alt="المساحات الخضراء داخل تشيل اوت بارك اكتوبر"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 right-5 rounded-xl bg-blue px-5 py-3 text-white shadow-lg">
              <p className="font-latin text-lg tracking-wider">Mountain View October</p>
            </div>
          </Reveal>
        </section>

        {/* ============ UNITS ============ */}
        <section id="units" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="max-w-2xl">
              <Eyebrow>الوحدات والأسعار</Eyebrow>
              <h2 className="text-3xl font-bold leading-snug text-navy sm:text-4xl">
                أسعار ماونتن فيو تشيل اوت بارك
              </h2>
              <p className="mt-3 text-lg text-ink/70">
                تبدأ من <span dir="ltr">{startM}</span> مليون جنيه — مقدم 3% على 10 سنوات، أو مقدم
                10% على 8 سنوات بخصم {PRICING.discountPct}%. استلام بعد {PRICING.deliveryYears} سنين.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {UNITS.map((u, i) => (
                <Reveal key={u.key} delay={(i % 3) * 100}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/5 transition hover:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={u.image}
                        alt={`${u.name} في ماونتن فيو تشيل اوت بارك اكتوبر`}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <span className="absolute right-3 top-3 rounded-md bg-navy/85 px-3 py-1 font-latin text-sm tracking-wider text-white">
                        {u.en}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-2xl font-bold text-navy">{u.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/70">{u.blurb}</p>
                      <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                        {[
                          ["المساحة", `${u.bua} م²`],
                          ["الغرف", u.config],
                          ["مساحات خارجية", `~${u.outdoor} م²`],
                        ].map(([t, v]) => (
                          <div key={t} className="rounded-lg bg-sky/70 px-1.5 py-2">
                            <dt className="text-[11px] text-ink/55">{t}</dt>
                            <dd className="mt-0.5 text-xs font-bold text-navy sm:text-sm">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="mt-auto pt-5">
                        <div className="border-t border-ink/10 pt-4">
                          <p className="text-xs text-ink/55">يبدأ من (8 سنوات • خصم {PRICING.discountPct}%)</p>
                          <p className="font-display text-2xl font-bold text-green">
                            <span dir="ltr">{fmtM(u.price8)}</span>{" "}
                            <span className="text-base">مليون ج.م</span>
                          </p>
                          <p className="mt-1 text-sm text-ink/65">
                            أو <strong dir="ltr">{fmtM(u.price10)}</strong> مليون بمقدم 3% على 10 سنوات
                          </p>
                        </div>
                      </div>
                      <LeadButton
                        source={`unit-card-${u.key}`}
                        unit={u.name}
                        title={`المتاح من ${u.name} في تشيل اوت بارك`}
                        sub="هنبعتلك المساحات المتاحة، الأسعار الحالية وخطة السداد على واتساب."
                        className="mt-5 w-full rounded-lg bg-navy px-4 py-3.5 font-bold text-white transition hover:bg-green"
                      >
                        اعرف المساحات والمتاح
                      </LeadButton>
                      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                        <WaLink
                          msg={`مرحباً، عايز أعرف المساحات والأسعار المتاحة لـ ${u.name} في ماونتن فيو تشيل اوت بارك اكتوبر`}
                          label={`واتساب — ${u.name}`}
                          className="flex items-center justify-center gap-2 rounded-lg bg-wa px-3 py-3 text-sm font-bold text-white transition hover:brightness-110"
                        >
                          <WhatsAppIcon className="size-5" /> واتساب
                        </WaLink>
                        <CallLink
                          label={`اتصال — ${u.name}`}
                          className="flex items-center justify-center gap-2 rounded-lg border border-navy/25 bg-white px-3 py-3 text-sm font-bold text-navy transition hover:border-navy"
                        >
                          <Phone className="size-4" aria-hidden /> اتصل الآن
                        </CallLink>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-ink/50">
              * أسعار بداية حسب آخر تحديث من المطوّر، والمساحات الخارجية تقريبية وقابلة للتغيير دون إشعار مسبق.
              الصور توضيحية من برشور المشروع.
            </p>
          </div>
        </section>

        {/* ============ PAYMENT ============ */}
        <section id="payment" className="relative overflow-hidden bg-navy py-16 text-white lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <Eyebrow light>خطة السداد</Eyebrow>
              <h2 className="text-3xl font-bold leading-snug sm:text-4xl">
                مقدم من {PRICING.minDownPct}% وقسّط حتى {PRICING.maxYears} سنوات في ماونتن فيو اكتوبر
              </h2>
              <p className="mt-4 text-lg leading-loose text-white/75">
                نظامين سداد: مقدم 3% على 10 سنوات، أو مقدم 10% على 8 سنوات مع خصم {PRICING.discountPct}%
                على السعر. احسب المقدم والقسط التقريبي لوحدتك وبعدها اطلب الخطة الفعلية.
              </p>
              <ol className="mt-8 space-y-4">
                {[
                  ["سجّل بياناتك", "اسم ورقم موبايل بس."],
                  ["استلم المتاح والأسعار", "مستشار المبيعات يبعتلك الوحدات وخطط السداد على واتساب."],
                  ["اختار وحدتك", "معاينة الموقع ومقارنة النماذج."],
                  [`تعاقد بمقدم من ${PRICING.minDownPct}%`, `مباشرة مع ماونتن فيو — والاستلام بعد ${PRICING.deliveryYears} سنين.`],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue font-display font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold">{t}</p>
                      <p className="text-sm text-white/65">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={120} className="text-ink">
              <Calculator />
            </Reveal>
          </div>
        </section>

        {/* ============ LIFESTYLE ============ */}
        <section id="lifestyle" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal className="max-w-2xl">
            <Eyebrow>أسلوب الحياة</Eyebrow>
            <h2 className="text-3xl font-bold leading-snug text-navy sm:text-4xl">
              ليه تشيل اوت بارك اكتوبر مختلف؟
            </h2>
            <p className="mt-3 text-lg text-ink/70">
              المشروع متصمم على فكرة واحدة: إن كل لحظة في البيت تبقى لحظة راحة.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              ["/images/lake-night.webp", "بحيرة قابلة للسباحة", "بحيرة في قلب المشروع والفيلات حواليها — منظر بتصحى وتنام عليه."],
              ["/images/jacuzzi.webp", "Jacuzzi Jungle", "جاكوزي وسط الخُضرة على بعد خطوات من بيتك، لحياة من غير ضغط."],
              ["/images/family.webp", "مساحات للعيلة", "جلسات خارجية ومساحات مفتوحة متصممة عشان العيلة تتجمع."],
              ["/images/walk-bridge.webp", "ممشى وسط الطبيعة", "مسارات مشي آمنة بين البحيرات والكباري والحدائق."],
            ].map(([src, t, d], i) => (
              <Reveal key={t} delay={(i % 2) * 100}>
                <figure className="group relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src={src}
                    alt={`${t} — ماونتن فيو تشيل اوت بارك`}
                    fill
                    sizes="(min-width:768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-16 text-white">
                    <h3 className="text-xl font-bold">{t}</h3>
                    <p className="mt-1 text-sm text-white/80">{d}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {AMENITIES.map(([Icon, label]) => (
                <li key={label} className="flex items-center gap-3 rounded-xl bg-white p-4 ring-1 ring-ink/5">
                  <Icon className="size-6 shrink-0 text-blue" aria-hidden />
                  <span className="text-sm font-semibold text-navy">{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ============ MID CTA ============ */}
        <section className="relative isolate overflow-hidden bg-green text-white">
          <Image
            src="/images/lakehouse.webp"
            alt="فيلات على البحيرة في تشيل اوت بارك"
            fill
            sizes="100vw"
            className="-z-10 object-cover opacity-30"
          />
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                عايز تعرف المتاح حالياً في ماونتن فيو تشيل اوت بارك؟
              </h2>
              <p className="mt-2 text-white/80">الوحدات والأسعار بتتحدث باستمرار — اطلب آخر تحديث.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <LeadButton
                source="mid-cta"
                className="rounded-lg bg-white px-6 py-4 font-bold text-green transition hover:bg-cream"
              >
                اطلب آخر الأسعار
              </LeadButton>
              <WaLink className="flex items-center justify-center gap-2 rounded-lg bg-wa px-6 py-4 font-bold text-white">
                <WhatsAppIcon /> واتساب
              </WaLink>
            </div>
          </div>
        </section>

        {/* ============ LOCATION ============ */}
        <section id="location" className="bg-white py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <Eyebrow>الموقع</Eyebrow>
              <h2 className="text-3xl font-bold leading-snug text-navy sm:text-4xl">
                موقع ماونتن فيو تشيل اوت بارك في 6 اكتوبر
              </h2>
              <p className="mt-4 text-lg leading-loose text-ink/75">
                في التوسعات الشمالية لمدينة 6 اكتوبر، على بعد دقائق من الطريق الدائري ومحور 26
                يوليو — يعني وصول سهل للشيخ زايد وباقي القاهرة.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {DISTANCES.map(([t, p]) => (
                  <li key={p} className="rounded-xl bg-cream p-4">
                    <span className="block font-display text-xl font-bold text-green">{t}</span>
                    <span className="text-sm text-ink/65">{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-semibold text-navy">بالقرب من:</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {NEARBY.map((n) => (
                  <li key={n} className="rounded-full border border-ink/10 px-3 py-1.5 text-sm text-ink/75">
                    {n}
                  </li>
                ))}
              </ul>
              <LeadButton
                source="location"
                title="اللوكيشن ومعاد المعاينة"
                sub="سيب رقمك وهنبعتلك اللوكيشن على واتساب وننسّق معاك معاد زيارة الموقع."
                cta="ابعتلي اللوكيشن"
                className="mt-7 rounded-lg bg-green px-6 py-4 font-bold text-white transition hover:bg-leaf"
              >
                احجز معاينة للموقع
              </LeadButton>
            </Reveal>
            <Reveal delay={120}>
              <div className="cut-lg overflow-hidden rounded-2xl bg-sky">
                <iframe
                  title="موقع ماونتن فيو تشيل اوت بارك اكتوبر على الخريطة"
                  src="https://www.google.com/maps?q=Mountain+View+Chillout+Park+6th+of+October&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[4/3] w-full border-0"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ MASTER PLAN (lead magnet) ============ */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-3xl bg-navy">
              <Image
                src="/images/masterplan.webp"
                alt="ماستر بلان ماونتن فيو تشيل اوت بارك"
                fill
                sizes="100vw"
                className="-z-10 object-cover opacity-45 blur-[2px]"
              />
              <div className="flex min-h-[380px] flex-col items-center justify-center px-5 py-14 text-center text-white">
                <p className="font-latin text-sm tracking-[0.3em] text-sky">MASTER PLAN</p>
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                  ماستر بلان وبرشور تشيل اوت بارك
                </h2>
                <p className="mt-3 max-w-lg text-white/80">
                  استلم الماستر بلان بجودة عالية، برشور المشروع ونماذج الوحدات على واتساب.
                </p>
                <LeadButton
                  source="masterplan"
                  title="استلم البرشور والماستر بلان"
                  sub="اكتب رقم الواتساب وهنبعتلك برشور ماونتن فيو تشيل اوت بارك والماستر بلان."
                  cta="ابعتلي البرشور"
                  className="mt-7 rounded-lg bg-white px-8 py-4 font-bold text-navy transition hover:bg-cream"
                >
                  ابعتلي البرشور والماستر بلان
                </LeadButton>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============ GALLERY ============ */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <Eyebrow>معرض الصور</Eyebrow>
              <h2 className="text-3xl font-bold text-navy sm:text-4xl">
                صور ماونتن فيو تشيل اوت بارك
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
              {[
                ["/images/villa-cover.webp", "واجهة فيلا في تشيل اوت بارك", "md:col-span-2 md:row-span-2"],
                ["/images/lake-heights.webp", "البحيرات داخل المشروع", "md:col-span-2"],
                ["/images/villa-pool.webp", "فيلا بحمام سباحة خاص", ""],
                ["/images/lake-deck.webp", "جلسات على البحيرة", ""],
              ].map(([src, alt, span]) => (
                <div
                  key={src}
                  className={`relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-auto md:min-h-[200px] ${span}`}
                >
                  <Image
                    src={src}
                    alt={`${alt} — ماونتن فيو اكتوبر`}
                    fill
                    sizes="(min-width:768px) 50vw, 50vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ DEVELOPER ============ */}
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
          <Reveal>
            <div className="cut-lg relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image
                src="/images/lakehouse-2.webp"
                alt="فيلات ماونتن فيو على البحيرة"
                fill
                sizes="(min-width:1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>المطوّر</Eyebrow>
            <h2 className="text-3xl font-bold leading-snug text-navy sm:text-4xl">
              ماونتن فيو — Mountain View
            </h2>
            <p className="mt-4 text-lg leading-loose text-ink/75">
              ماونتن فيو من أكبر المطوّرين العقاريين في مصر، ومعروفة بالطراز المعماري المميز
              والأسقف الزرقاء في كل مشاريعها. في تشيل اوت بارك اشتغلت مع بيوت خبرة عالمية زي
              CallisonRTKL و DMA في التصميم والتخطيط.
            </p>
            <p className="mt-4 leading-loose text-ink/70">
              مرحلة Lakeside داخل المشروع ممتدة على 50 فدان بأرض متدرجة توصل لارتفاع 14 متر،
              وبتمر فيها بحيرات ومجاري مائية على طول المحور الرئيسي.
            </p>
          </Reveal>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <Eyebrow>أسئلة شائعة</Eyebrow>
              <h2 className="text-3xl font-bold text-navy sm:text-4xl">
                كل اللي محتاج تعرفه عن ماونتن فيو اكتوبر
              </h2>
            </Reveal>
            <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold text-navy [&::-webkit-details-marker]:hidden">
                    <h3 className="font-sans text-base font-bold sm:text-lg">{f.q}</h3>
                    <ChevronDown className="size-5 shrink-0 transition group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="pb-5 leading-loose text-ink/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="relative isolate overflow-hidden bg-navy text-white">
          <Image
            src="/images/lake-night.webp"
            alt="تشيل اوت بارك ليلاً"
            fill
            sizes="100vw"
            className="-z-10 object-cover opacity-35"
          />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div>
              <Eyebrow light>ابدأ دلوقتي</Eyebrow>
              <h2 className="text-3xl font-bold leading-snug sm:text-5xl">
                احجز وحدتك في ماونتن فيو تشيل اوت بارك
              </h2>
              <p className="mt-4 text-lg text-white/80">
                من <span dir="ltr">{startM}</span> مليون جنيه • مقدم من {PRICING.minDownPct}% •
                تقسيط حتى {PRICING.maxYears} سنوات • خصم {PRICING.discountPct}%
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <WaLink className="flex items-center gap-2 rounded-lg bg-wa px-5 py-3.5 font-bold text-white">
                  <WhatsAppIcon /> واتساب
                </WaLink>
                <CallLink className="flex items-center gap-2 rounded-lg border border-white/50 px-5 py-3.5 font-bold" />
              </div>
            </div>
            <div className="cut rounded-2xl bg-cream p-5 text-ink shadow-2xl sm:p-7">
              <h3 className="text-2xl font-bold text-navy">سجّل وهنتواصل معاك</h3>
              <p className="mb-5 mt-1.5 text-sm text-ink/65">
                مستشار متخصص في ماونتن فيو اكتوبر هيرد على كل أسئلتك.
              </p>
              <LeadForm source="footer-form" idPrefix="b" cta="سجّل اهتمامك الآن" />
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="bg-ink pb-24 pt-12 text-white/70 md:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Wordmark light />
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <CallLink className="flex items-center gap-2 font-bold text-white" />
              <WaLink className="flex items-center gap-2 font-bold text-white">
                <WhatsAppIcon className="size-4" /> واتساب
              </WaLink>
              <PrivacyButton className="underline underline-offset-4 hover:text-white" />
            </div>
          </div>
          <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/55">
            <p>
              <strong className="text-white/80">إفصاح:</strong> هذا الموقع يديره {SITE.agentName}{" "}
              وهو موقع تسويقي مستقل وليس الموقع الرسمي لشركة ماونتن فيو للتطوير العقاري. جميع
              العلامات التجارية وأسماء المشروعات ملك لأصحابها.
            </p>
            <p>
              <strong className="text-white/80">الأسعار استرشادية:</strong> الأسعار والمساحات
              وأنظمة السداد المذكورة تقريبية حسب آخر تحديث وقابلة للتغيير دون إشعار مسبق. الصور
              والتصميمات للتوضيح فقط وقد تختلف عن التنفيذ النهائي.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-2 text-xs text-white/40 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} ماونتن فيو تشيل اوت بارك اكتوبر — صفحة تسويقية.</p>
            <p dir="ltr">
              Designed &amp; Managed by{" "}
              {SITE.agency.url ? (
                <a href={SITE.agency.url} target="_blank" rel="nofollow noopener" className="hover:text-white">
                  {SITE.agency.name}
                </a>
              ) : (
                SITE.agency.name
              )}
            </p>
          </div>
        </div>
      </footer>

      <StickyActions />
      <CookieConsent />
    </LeadModalProvider>
  );
}
