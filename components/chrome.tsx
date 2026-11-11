"use client";

import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { CallLink, LeadButton, WaLink, WhatsAppIcon } from "./actions";
import { SITE } from "@/lib/config";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex flex-col leading-none" aria-label="ماونتن فيو تشيل اوت بارك">
      <span
        className={`font-latin text-[1.35rem] font-semibold tracking-[0.14em] ${light ? "text-white" : "text-navy"}`}
      >
        CHILLOUT PARK
      </span>
      <span
        className={`mt-1 font-latin text-[0.62rem] tracking-[0.34em] ${light ? "text-white/75" : "text-blue"}`}
      >
        MOUNTAIN VIEW · OCTOBER
      </span>
    </a>
  );
}

const NAV = [
  ["#units", "الوحدات والأسعار"],
  ["#payment", "خطة السداد"],
  ["#lifestyle", "المميزات"],
  ["#location", "الموقع"],
  ["#faq", "أسئلة شائعة"],
];

export function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-cream/95 shadow-md backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Wordmark light={!solid} />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="التنقل">
          {NAV.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={`text-sm font-medium transition hover:opacity-70 ${solid ? "text-ink" : "text-white"}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CallLink
            label="اتصل بنا"
            className={`hidden items-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm font-bold sm:flex ${
              solid ? "border-navy/25 text-navy" : "border-white/50 text-white"
            }`}
          />
          <LeadButton
            source="header"
            className="rounded-lg bg-green px-4 py-2.5 text-sm font-bold text-white transition hover:bg-leaf"
          >
            سجّل اهتمامك
          </LeadButton>
        </div>
      </div>
    </header>
  );
}

/** شريط الموبايل السفلي + زر واتساب العائم للديسكتوب */
export function StickyActions() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.4fr] gap-px border-t border-ink/10 bg-ink/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_rgb(0_0_0/0.12)] md:hidden">
        <CallLink
          label="اتصال"
          className="flex items-center justify-center gap-2 bg-white py-3.5 text-sm font-bold text-navy"
        >
          <Phone className="size-4" aria-hidden />
          اتصال
        </CallLink>
        <WaLink className="flex items-center justify-center gap-2 bg-white py-3.5 text-sm font-bold text-wa">
          <WhatsAppIcon className="size-5" />
          واتساب
        </WaLink>
        <LeadButton
          source="mobile-bar"
          className="bg-green py-3.5 text-sm font-bold text-white"
        >
          اطلب الأسعار
        </LeadButton>
      </div>

      <CallLink
        label="اتصل بنا"
        className="call-pulse fixed bottom-[92px] left-6 z-40 hidden size-14 items-center justify-center rounded-full bg-blue text-white shadow-xl transition hover:bg-navy md:flex"
      >
        <Phone className="size-6" aria-hidden />
      </CallLink>

      <WaLink
        label="تواصل واتساب"
        className="wa-pulse fixed bottom-6 left-6 z-40 hidden size-14 items-center justify-center rounded-full bg-wa text-white shadow-xl md:flex"
      >
        <WhatsAppIcon className="size-7" />
      </WaLink>
    </>
  );
}

export function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem("cookie_ok")) setShow(true);
    } catch {}
  }, []);
  if (!show) return null;
  const ok = () => {
    try {
      localStorage.setItem("cookie_ok", "1");
    } catch {}
    setShow(false);
  };
  return (
    <div className="fixed inset-x-3 bottom-[68px] z-30 mx-auto flex max-w-xl items-center gap-3 rounded-xl bg-ink/95 px-4 py-3 text-xs text-white shadow-xl md:bottom-5 md:right-5 md:left-auto md:mx-0">
      <p className="flex-1 leading-relaxed">
        بنستخدم ملفات الارتباط (Cookies) لتحسين تجربتك وقياس أداء الإعلانات.
      </p>
      <button onClick={ok} className="rounded-md bg-white px-3 py-1.5 font-bold text-ink">
        موافق
      </button>
    </div>
  );
}

export function PrivacyButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        سياسة الخصوصية
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="سياسة الخصوصية"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 text-right text-sm leading-loose text-ink/80"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="إغلاق"
              className="absolute left-3 top-3 rounded-full p-2 hover:bg-ink/10"
            >
              <X className="size-5" />
            </button>
            <h2 className="mb-3 text-xl font-bold text-navy">سياسة الخصوصية</h2>
            <p>
              هذا الموقع يديره {SITE.agentName}، وهو موقع تسويقي وليس الموقع الرسمي لشركة ماونتن فيو
              للتطوير العقاري.
            </p>
            <p className="mt-3">
              <strong>البيانات التي نجمعها:</strong> الاسم ورقم الهاتف ونوع الوحدة التي تهتم بها عند
              تسجيلك في النموذج، بالإضافة لبيانات تصفح عامة عبر ملفات الارتباط.
            </p>
            <p className="mt-3">
              <strong>استخدام البيانات:</strong> للتواصل معك بخصوص طلبك وتزويدك بالأسعار والتفاصيل
              فقط. لا نبيع بياناتك ولا نشاركها مع أي طرف خارج عملية البيع.
            </p>
            <p className="mt-3">
              <strong>ملفات الارتباط:</strong> نستخدم أدوات قياس من Google لمعرفة أداء الإعلانات.
              يمكنك تعطيلها من إعدادات المتصفح.
            </p>
            <p className="mt-3">
              <strong>حقوقك:</strong> يمكنك طلب حذف بياناتك في أي وقت بالتواصل معنا على{" "}
              <span dir="ltr">{SITE.phoneDisplay}</span>.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
