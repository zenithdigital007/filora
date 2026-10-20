"use client";

import { useEffect, useState } from "react";

interface AdSlotProps {
  slotId?: string;
  format?: "horizontal" | "rectangle" | "vertical" | "auto";
  className?: string;
}

export function AdSlot({ slotId = "placeholder", format = "horizontal", className = "" }: AdSlotProps) {
  const [isClient, setIsClient] = useState(false);
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatStyles = {
    horizontal: "min-h-[90px] w-full max-w-4xl",
    rectangle: "min-h-[250px] w-full max-w-[300px]",
    vertical: "min-h-[600px] w-[160px]",
    auto: "min-h-[100px] w-full",
  };

  return (
    <div className={`my-6 flex flex-col items-center justify-center ${className}`}>
      <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-1.5">
        Advertisement
      </span>
      <div
        className={`bg-surface-subtle border border-dashed border-neutral-200 rounded-xl flex flex-col items-center justify-center p-4 text-center text-neutral-400 text-xs ${formatStyles[format]}`}
      >
        {adsenseId && isClient ? (
          <div className="text-neutral-400 text-xs">
            {/* Google AdSense unit mounts here */}
            <span>Ad Slot ({format})</span>
          </div>
        ) : (
          <div className="space-y-1">
            <span className="font-medium text-neutral-400">Filora Sponsored Space</span>
            <p className="text-[11px] text-neutral-400 max-w-xs">
              Fast, privacy-friendly document tools powered by Filora
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
