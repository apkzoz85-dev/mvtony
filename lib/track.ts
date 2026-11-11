import { SITE } from "./config";

type Kind = "form" | "whatsapp" | "call";

/** بيبعت Conversion لجوجل ادز لو الأكواد متظبطة في lib/config.ts */
export function track(kind: Kind) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  const label = SITE.conversions[kind];
  if (!w.gtag || !label || SITE.gtagId.includes("XXXX")) return;
  w.gtag("event", "conversion", { send_to: `${SITE.gtagId}/${label}` });
}

export const gtagReady = () => !SITE.gtagId.includes("XXXX");
