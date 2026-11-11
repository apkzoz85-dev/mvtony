import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { CallLink, WaLink, WhatsAppIcon } from "@/components/actions";

export const metadata: Metadata = {
  title: "تم استلام طلبك | ماونتن فيو تشيل اوت بارك",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-navy px-4 py-16 text-center text-white">
      <div className="max-w-md">
        <CheckCircle2 className="mx-auto size-16 text-sky" aria-hidden />
        <h1 className="mt-5 text-3xl font-bold">تم استلام طلبك</h1>
        <p className="mt-3 leading-relaxed text-white/80">
          مستشار ماونتن فيو تشيل اوت بارك هيتواصل معاك بالأسعار والوحدات المتاحة. لو عايز رد أسرع،
          كلّمنا دلوقتي:
        </p>
        <div className="mt-7 grid gap-3">
          <WaLink
            msg="مرحباً، لسه مسجّل على صفحة ماونتن فيو تشيل اوت بارك وعايز التفاصيل"
            className="flex items-center justify-center gap-2 rounded-lg bg-wa px-5 py-4 font-bold text-white"
          >
            <WhatsAppIcon /> كمّل على واتساب
          </WaLink>
          <CallLink className="flex items-center justify-center gap-2 rounded-lg border border-white/40 px-5 py-4 font-bold" />
        </div>
        <Link href="/" className="mt-8 inline-block text-sm text-white/60 underline">
          الرجوع للصفحة الرئيسية
        </Link>
      </div>
    </main>
  );
}
