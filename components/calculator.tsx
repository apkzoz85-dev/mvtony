"use client";

import { useState } from "react";
import { PRICING, UNITS, type UnitKey } from "@/lib/config";
import { LeadButton } from "./actions";

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

export function Calculator() {
  const [key, setKey] = useState<UnitKey>("ivilla");
  const unit = UNITS.find((u) => u.key === key)!;
  const [price, setPrice] = useState<Record<UnitKey, number>>({
    penthouse: 13,
    ivilla: 20,
    villa: 45,
  });
  const p = price[key] * 1e6;
  const down = (p * PRICING.downPaymentPct) / 100;
  const rest = p - down;
  const months = PRICING.years * 12;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-navy/10 ring-1 ring-ink/5">
      <div role="tablist" aria-label="نوع الوحدة" className="grid grid-cols-3 bg-sky/60 p-1.5">
        {UNITS.map((u) => (
          <button
            key={u.key}
            role="tab"
            aria-selected={key === u.key}
            onClick={() => setKey(u.key)}
            className={`rounded-xl px-2 py-3 text-sm font-bold transition sm:text-base ${
              key === u.key ? "bg-navy text-white shadow" : "text-navy hover:bg-white/70"
            }`}
          >
            {u.name}
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-7">
        <label htmlFor="calc-price" className="flex items-baseline justify-between text-sm text-ink/70">
          <span>سعر الوحدة (متوسط استرشادي)</span>
          <span className="font-display text-xl font-bold text-navy">
            <span dir="ltr">{price[key].toFixed(1)}</span> مليون ج.م
          </span>
        </label>
        <input
          id="calc-price"
          type="range"
          dir="ltr"
          min={unit.min}
          max={unit.max}
          step={0.5}
          value={price[key]}
          onChange={(e) => setPrice({ ...price, [key]: Number(e.target.value) })}
          className="mt-3 w-full"
        />
        <div className="mt-1 flex justify-between text-xs text-ink/50" dir="ltr">
          <span>{unit.min}M</span>
          <span>{unit.max}M</span>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-green p-4 text-white">
            <dt className="text-xs opacity-80">المقدم {PRICING.downPaymentPct}%</dt>
            <dd className="mt-1 font-display text-xl font-bold sm:text-2xl" dir="ltr">
              {fmt(down)}
            </dd>
          </div>
          <div className="rounded-xl bg-cream p-4">
            <dt className="text-xs text-ink/60">قسط شهري تقريبي</dt>
            <dd className="mt-1 font-display text-xl font-bold text-navy sm:text-2xl" dir="ltr">
              {fmt(rest / months)}
            </dd>
          </div>
          <div className="rounded-xl bg-cream p-4">
            <dt className="text-xs text-ink/60">أو ربع سنوي تقريبي</dt>
            <dd className="mt-1 font-display text-lg font-bold text-navy" dir="ltr">
              {fmt(rest / (PRICING.years * 4))}
            </dd>
          </div>
          <div className="rounded-xl bg-cream p-4">
            <dt className="text-xs text-ink/60">مدة التقسيط</dt>
            <dd className="mt-1 font-display text-lg font-bold text-navy">{PRICING.years} سنوات</dd>
          </div>
        </dl>

        <LeadButton
          source={`calculator-${key}`}
          unit={unit.name}
          title={`خطة سداد ${unit.name} بالتفصيل`}
          sub="الأرقام اللي فوق تقريبية. سيب رقمك وهنبعتلك خطة السداد الفعلية والوحدات المتاحة على واتساب."
          cta="ابعتلي خطة السداد"
          className="mt-5 w-full rounded-lg bg-green px-5 py-4 text-base font-bold text-white transition hover:bg-leaf"
        >
          ابعتلي خطة السداد دي بالتفصيل
        </LeadButton>
        <p className="mt-3 text-center text-xs leading-relaxed text-ink/50">
          حساب استرشادي بأقساط متساوية — الخطة النهائية تُحدَّد من المطوّر عند التعاقد.
        </p>
      </div>
    </div>
  );
}
