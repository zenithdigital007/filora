"use client";

import { useEffect, useRef, useState } from "react";
import { getAdSenseClientId } from "@/lib/site-config";

interface AdSlotProps {
  slotId?: string;
  format?: "horizontal" | "rectangle" | "vertical" | "auto" | "fluid";
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function AdSlot({
  slotId = "placeholder",
  format = "horizontal",
  responsive = true,
  className = "",
}: AdSlotProps) {
  const [isClient, setIsClient] = useState(false);
  const adRef = useRef<HTMLModElement | null>(null);
  const adsenseId = getAdSenseClientId();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!adsenseId || !isClient) return;

    // Small delay to ensure the DOM element is attached and sized
    const timer = setTimeout(() => {
      try {
        if (
          typeof window !== "undefined" &&
          adRef.current &&
          !adRef.current.getAttribute("data-adsbygoogle-status")
        ) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.debug("AdSense push error:", err);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [adsenseId, isClient, slotId]);

  const formatStyles: Record<string, string> = {
    horizontal: "min-h-[90px] w-full max-w-4xl",
    rectangle: "min-h-[250px] w-full max-w-[300px]",
    vertical: "min-h-[600px] w-[160px]",
    auto: "min-h-[100px] w-full",
    fluid: "min-h-[120px] w-full",
  };

  return (
    <div className={`my-6 flex flex-col items-center justify-center w-full overflow-hidden ${className}`}>
      <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-1.5 select-none">
        Advertisement
      </span>

      <div
        className={`bg-surface-subtle border border-dashed border-neutral-200 rounded-xl flex flex-col items-center justify-center p-3 text-center text-neutral-400 text-xs overflow-hidden transition-all ${formatStyles[format] || formatStyles.auto}`}
      >
        {adsenseId && isClient ? (
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: "block", width: "100%" }}
            data-ad-client={adsenseId}
            {...(slotId && slotId !== "placeholder" ? { "data-ad-slot": slotId } : {})}
            data-ad-format={format}
            data-full-width-responsive={responsive ? "true" : "false"}
          />
        ) : (
          <div className="space-y-1 py-3 px-4">
            <span className="font-semibold text-neutral-500 text-xs">
              PDFYARA Sponsored Space
            </span>
            <p className="text-[11px] text-neutral-400 max-w-sm leading-relaxed">
              Fast, privacy-friendly document tools powered by PDFYARA.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
