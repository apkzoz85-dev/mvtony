"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { SITE, UNIT_OPTIONS, isWeb3Ready, waLink } from "@/lib/config";
import { track } from "@/lib/track";

type Props = {
  /** مكان الفورم في الصفحة — بيتبعت مع الليد عشان تعرف أنهي جزء بيحوّل */
  source: string;
  defaultUnit?: string;
  cta?: string;
  idPrefix?: string;
};

const normalizePhone = (v: string) =>
  v
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[^\d+]/g, "");

export function LeadForm({
  source,
  defaultUnit,
  cta = "ابعتلي الأسعار وخطة السداد",
  idPrefix = "f",
}: Props) {
  const router = useRouter();
  const [unit, setUnit] = useState(defaultUnit || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bot, setBot] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (bot || busy) return;
    setError("");

    const cleanPhone = normalizePhone(phone);
    if (name.trim().length < 2) return setError("اكتب اسمك من فضلك");
    if (!/^\+?\d{9,15}$/.test(cleanPhone))
      return setError("اكتب رقم موبايل صحيح عشان نقدر نتواصل معاك");

    const chosen = unit || "لسه بحدد";
    const qs = new URLSearchParams(window.location.search);
    const done = () => {
      track("form");
      try {
        sessionStorage.setItem("lead_done", "1");
      } catch {}
      router.push("/thank-you");
    };

    setBusy(true);

    // لحد ما مفتاح Web3Forms يتحط: الليد بيروح واتساب مباشرة
    if (!isWeb3Ready()) {
      window.open(
        waLink(
          `مرحباً، أنا ${name.trim()} ومهتم بـ ${chosen} في ماونتن فيو تشيل اوت بارك اكتوبر. رقمي: ${cleanPhone}`,
        ),
        "_blank",
        "noopener",
      );
      return done();
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: SITE.web3formsKey,
          subject: `ليد جديد — تشيل اوت بارك — ${chosen}`,
          from_name: "Chillout Park Landing",
          الاسم: name.trim(),
          الموبايل: cleanPhone,
          "نوع الوحدة": chosen,
          "مكان التسجيل": source,
          الصفحة: window.location.href,
          utm_source: qs.get("utm_source") || "",
          utm_campaign: qs.get("utm_campaign") || "",
          utm_term: qs.get("utm_term") || "",
          gclid: qs.get("gclid") || "",
          botcheck: "",
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      done();
    } catch {
      setBusy(false);
      setError("حصلت مشكلة في الإرسال — جرّب تاني أو كلّمنا واتساب مباشرة.");
    }
  }

  const field =
    "w-full rounded-lg border border-ink/15 bg-white px-4 py-3.5 text-base text-ink placeholder:text-ink/40 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-3.5">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-ink/80">مهتم بأنهي وحدة؟</legend>
        <div className="grid grid-cols-2 gap-2">
          {UNIT_OPTIONS.map((u) => {
            const on = unit === u;
            return (
              <button
                key={u}
                type="button"
                aria-pressed={on}
                onClick={() => setUnit(u)}
                className={`rounded-lg border px-2 py-2 text-[13px] font-semibold transition last:col-span-2 sm:text-sm ${
                  on
                    ? "border-green bg-green text-white"
                    : "border-ink/15 bg-white text-ink hover:border-green/60"
                }`}
              >
                {u}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${idPrefix}-name`} className="sr-only">
          الاسم
        </label>
        <input
          id={`${idPrefix}-name`}
          className={field}
          placeholder="الاسم"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-phone`} className="sr-only">
          رقم الموبايل
        </label>
        <input
          id={`${idPrefix}-phone`}
          className={`${field} text-right`}
          placeholder="رقم الموبايل (واتساب)"
          type="tel"
          inputMode="tel"
          dir="ltr"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        checked={bot}
        onChange={(e) => setBot(e.target.checked)}
        aria-hidden="true"
      />

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {error}{" "}
          {error.includes("واتساب") && (
            <a href={waLink()} target="_blank" rel="noopener" className="font-bold underline">
              افتح واتساب
            </a>
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-green px-5 py-4 text-base font-bold text-white shadow-lg shadow-green/25 transition hover:bg-leaf disabled:opacity-70"
      >
        {busy && <Loader2 className="size-5 animate-spin" aria-hidden />}
        {busy ? "جاري الإرسال…" : cta}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-ink/55">
        <Lock className="size-3.5" aria-hidden />
        بياناتك سرّية — هنتواصل معاك بخصوص طلبك فقط
      </p>
    </form>
  );
}
