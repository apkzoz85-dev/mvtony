"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { LeadForm } from "./lead-form";
import { PRICING, fmtM } from "@/lib/config";

type Opts = { title?: string; sub?: string; unit?: string; source: string; cta?: string };
const Ctx = createContext<(o: Opts) => void>(() => {});
export const useLead = () => useContext(Ctx);

const flag = (k: string, set?: boolean) => {
  try {
    if (set) sessionStorage.setItem(k, "1");
    return sessionStorage.getItem(k) === "1";
  } catch {
    return false;
  }
};

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [opts, setOpts] = useState<Opts | null>(null);
  const openRef = useRef(false);
  openRef.current = !!opts;

  const open = useCallback((o: Opts) => setOpts(o), []);
  const close = useCallback(() => setOpts(null), []);

  // Popup تلقائي: بعد 16 ثانية أو عند 55% سكرول — مرة واحدة في الجلسة
  useEffect(() => {
    const fire = () => {
      if (openRef.current || flag("popup_seen") || flag("lead_done")) return;
      // لو العميل بيكتب في فورم دلوقتي متقاطعوش
      const a = document.activeElement?.tagName;
      if (a === "INPUT" || a === "TEXTAREA") return;
      flag("popup_seen", true);
      setOpts({
        source: "popup-auto",
        title: "قبل ما تمشي — استلم الأسعار كاملة",
        sub: `أسعار تبدأ من ${fmtM(PRICING.startFrom / 1e6)} مليون • مقدم من ${PRICING.minDownPct}% • تقسيط حتى ${PRICING.maxYears} سنوات • خصم ${PRICING.discountPct}%. سيب رقمك وهنبعتلك المتاح حالياً على واتساب.`,
      });
      cleanup();
    };
    const onScroll = () => {
      const h = document.documentElement;
      if (h.scrollTop / (h.scrollHeight - h.clientHeight) >= 0.55) fire();
    };
    const t = window.setTimeout(fire, 16000);
    window.addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
    return cleanup;
  }, []);

  useEffect(() => {
    if (!opts) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [opts, close]);

  return (
    <Ctx.Provider value={open}>
      {children}
      {opts && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="pop relative max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-cream p-6 shadow-2xl sm:rounded-2xl sm:p-7"
          >
            <button
              onClick={close}
              aria-label="إغلاق"
              className="absolute left-3 top-3 rounded-full p-2 text-ink/60 hover:bg-ink/10"
            >
              <X className="size-5" />
            </button>
            <p className="font-latin text-sm tracking-[0.2em] text-blue">CHILLOUT PARK</p>
            <h2 id="lead-modal-title" className="mt-1 text-2xl font-bold leading-snug text-navy">
              {opts.title || "استلم الأسعار وخطة السداد"}
            </h2>
            <p className="mb-5 mt-2 text-sm leading-relaxed text-ink/70">
              {opts.sub ||
                "سيب بياناتك وهيتواصل معاك مستشار ماونتن فيو اكتوبر بالتفاصيل الكاملة والوحدات المتاحة."}
            </p>
            <LeadForm
              key={opts.source + (opts.unit || "")}
              source={opts.source}
              defaultUnit={opts.unit}
              cta={opts.cta}
              idPrefix="m"
            />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
