"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("filora_cookie_consent");
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("filora_cookie_consent", "accepted");
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("filora_cookie_consent", "declined");
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white border border-neutral-200 rounded-2xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-filora-100 flex items-center justify-center text-filora shrink-0">
          <Cookie className="w-4 h-4" />
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="text-sm font-bold text-neutral-900">Cookie & Privacy Preferences</h4>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Filora uses privacy-friendly cookies and local storage to remember your tool preferences and ensure optimal application performance. Read our{" "}
            <Link href="/privacy-policy" className="text-filora hover:underline font-medium">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/cookie-policy" className="text-filora hover:underline font-medium">
              Cookie Policy
            </Link>.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="px-3.5 py-1.5 bg-filora hover:bg-filora-700 active:bg-filora-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-medium transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          className="text-neutral-400 hover:text-neutral-600 p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
