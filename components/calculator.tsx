"use client";

import { useState } from "react";
import { PLANS, PRICING, UNITS, fmtM, type PlanKey, type UnitKey } from "@/lib/config";
import { LeadButton } from "./actions";

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

export function Calculator() {
  const [key, setKey] = useState<UnitKey>("onevilla");
  const [planKey, setPlanKey] = useState<PlanKey>("y8");
  const unit = UNITS.find((u) => u.key === key)!;
  const plan = PLANS.find((p) => p.key === planKey)!;

  const priceM = planKey === "y8" ? unit.price8 : unit.price10;
  const p = priceM * 1e6;
  const down = (p * plan.downPct) / 100;
  const rest = p - down;
  const months = plan.years * 12;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-navy/10 ring-1 ring-ink/5">
      <div role="tablist" aria-label="نوع الوحدة" className="grid grid-cols-3 gap-1 bg-sky/60 p-1.5">
        {UNITS.map((u) => (
          <button
            key={u.key}
            role="tab"
            aria-selected={key === u.key}
            onClick={() => setKey(u.key)}
            className={`rounded-xl px-1.5 py-2.5 text-xs font-bold leading-snug transition sm:text-sm ${
              key === u.key ? "bg-navy text-white shadow" : "text-navy hover:bg-white/70"
            }`}
          >
            {u.name}
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-7">
        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="نظام السداد">
          {PLANS.map((pl) => (
            <button
              key={pl.key}
              role="radio"
              aria-checked={planKey === pl.key}
              onClick={() => setPlanKey(pl.key)}
              className={`rounded-lg border px-2 py-2.5 text-xs font-bold leading-snug transition sm:text-sm ${
                planKey === pl.key
                  ? "border-green bg-green text-white"
                  : "border-ink/15 bg-white text-ink hover:border-green/60"
              }`}
            >
              {pl.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-1 text-sm text-ink/70 sm:flex-row sm:items-baseline sm:justify-between">
          <span>
            سعر {unit.name} يبدأ من
            {plan.discountPct > 0 && (
              <span className="ms-1.5 whitespace-nowrap rounded bg-green/10 px-1.5 py-0.5 text-xs font-bold text-green">
                بعد خصم {plan.discountPct}%
              </span>
            )}
          </span>
          <span className="font-display text-xl font-bold text-navy">
            <span dir="ltr">{fmtM(priceM)}</span> مليون ج.م
          </span>
        </div>
        <p className="mt-1 text-xs text-ink/50">
          {unit.bua} م² • {unit.config} • مساحات خارجية ~{unit.outdoor} م²
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-green p-4 text-white">
            <dt className="text-xs opacity-80">المقدم {plan.downPct}%</dt>
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
              {fmt(rest / (plan.years * 4))}
            </dd>
          </div>
          <div className="rounded-xl bg-cream p-4">
            <dt className="text-xs text-ink/60">مدة التقسيط</dt>
            <dd className="mt-1 font-display text-lg font-bold text-navy">{plan.years} سنوات</dd>
            <dd className="text-xs text-ink/55">الاستلام بعد {PRICING.deliveryYears} سنين</dd>
          </div>
        </dl>

        <LeadButton
          source={`calculator-${key}-${planKey}`}
          unit={unit.name}
          title={`خطة سداد ${unit.name} بالتفصيل`}
          sub="الأرقام اللي فوق تقريبية. سيب رقمك وهنبعتلك خطة السداد الفعلية والوحدات المتاحة على واتساب."
          cta="ابعتلي خطة السداد"
          className="mt-5 w-full rounded-lg bg-green px-5 py-4 text-base font-bold text-white transition hover:bg-leaf"
        >
          ابعتلي خطة السداد دي بالتفصيل
        </LeadButton>
        <p className="mt-3 text-center text-xs leading-relaxed text-ink/50">
          حساب استرشادي على سعر البداية بأقساط متساوية — الخطة النهائية تُحدَّد من المطوّر عند التعاقد.
        </p>
      </div>
    </div>
  );
}
