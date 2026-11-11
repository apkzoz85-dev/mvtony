# ماونتن فيو تشيل اوت بارك — Landing Page

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Web3Forms — صفحة ثابتة (Static) جاهزة لـ Vercel.

## قبل الرفع — ملف واحد: `lib/config.ts`

| الإعداد | المكان |
|---|---|
| مفتاح Web3Forms | `web3formsKey` (أو متغير `NEXT_PUBLIC_WEB3FORMS_KEY` في Vercel) |
| الدومين | `siteUrl` (أو `NEXT_PUBLIC_SITE_URL`) |
| اسم الجهة المسوّقة في الإفصاح | `agentName` |
| Google Ads ID + Conversion labels | `gtagId` و `conversions` |
| لينك One Click في الفوتر | `agency.url` |
| الأسعار ومتوسطات الوحدات | `PRICING` و `UNITS` |

**Web3Forms:** ادخل web3forms.com، اكتب الإيميل اللي الليدز توصل عليه، وهيوصلك Access Key — حطه في `web3formsKey`.
لحد ما المفتاح يتحط، الفورم بيحوّل العميل على واتساب ببياناته.

## الفانل

1. فورم في الهيرو (نوع الوحدة + اسم + موبايل)
2. كروت الوحدات — كل كارت بيفتح الفورم والوحدة متحددة
3. حاسبة المقدم والقسط ← "ابعتلي خطة السداد"
4. الماستر بلان/البرشور كـ Lead magnet
5. حجز معاينة من سكشن الموقع
6. Popup بعد 16 ثانية أو 55% سكرول (مرة واحدة في الجلسة)
7. شريط موبايل ثابت: اتصال / واتساب / اطلب الأسعار
8. فورم ختامي + صفحة `/thank-you` (noindex)

كل ليد بيوصل معاه مكان التسجيل (`hero`, `unit-card-ivilla`, `calculator-villa`, …) و `utm_*` و `gclid`.

## تشغيل

```bash
npm install
npm run dev
```
