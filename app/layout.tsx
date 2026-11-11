import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "@fontsource-variable/alexandria";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "./globals.css";
import { SITE } from "@/lib/config";

const title = "ماونتن فيو تشيل اوت بارك اكتوبر | أسعار 2026 ومقدم 10% على 8 سنوات";
const description =
  "كمبوند ماونتن فيو تشيل اوت بارك 6 اكتوبر (Mountain View Chillout Park) — بنتهاوس وآي فيلا وفيلات مستقلة بأسعار تبدأ من 11.7 مليون جنيه، مقدم 10% وتقسيط حتى 8 سنوات. اعرف أسعار ماونتن فيو اكتوبر والوحدات المتاحة.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title,
  description,
  keywords: [
    "ماونتن فيو اكتوبر",
    "ماونتن فيو تشيل اوت بارك",
    "تشيل اوت بارك اكتوبر",
    "كمبوند ماونتن فيو تشيل اوت بارك",
    "اسعار ماونتن فيو تشيل اوت بارك",
    "ماونتن فيو 6 اكتوبر",
    "Mountain View Chillout Park",
    "Mountain View October",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "ar_EG",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#1b3850" };

const gtagOn = !SITE.gtagId.includes("XXXX");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        {/* Google Ads — بيشتغل تلقائياً أول ما تحط الـ ID في lib/config.ts */}
        {gtagOn && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gtagId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.gtagId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
