"use client";

import { useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { useLead } from "./lead-modal";
import { SITE, waLink } from "@/lib/config";
import { track } from "@/lib/track";

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24ZM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.29-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01Z" />
    </svg>
  );
}

type BtnProps = {
  children: React.ReactNode;
  className?: string;
  source: string;
  unit?: string;
  title?: string;
  sub?: string;
  cta?: string;
};

/** أي زرار بيفتح فورم التسجيل */
export function LeadButton({ children, className, ...opts }: BtnProps) {
  const open = useLead();
  return (
    <button type="button" className={className} onClick={() => open(opts)}>
      {children}
    </button>
  );
}

export function WaLink({
  children,
  className,
  msg,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  msg?: string;
  label?: string;
}) {
  return (
    <a
      href={waLink(msg)}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className={className}
      onClick={() => track("whatsapp")}
    >
      {children}
    </a>
  );
}

export function CallLink({
  children,
  className,
  label,
}: {
  children?: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={`tel:${SITE.phoneIntl}`}
      aria-label={label}
      className={className}
      onClick={() => track("call")}
    >
      {children ?? (
        <>
          <Phone className="size-4" aria-hidden />
          <span dir="ltr">{SITE.phoneDisplay}</span>
        </>
      )}
    </a>
  );
}

/** ظهور هادئ عند السكرول */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
