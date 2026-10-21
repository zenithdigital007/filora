/**
 * Site Configuration & Base URL Resolution
 * 
 * Official Production Domain: https://pdfyara.com
 */

export function getBaseUrl(): string {
  // 1. Explicit Custom Domain set via Environment Variable (if any override needed)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    let url = process.env.NEXT_PUBLIC_SITE_URL.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }
    return url.replace(/\/+$/, "");
  }

  // 2. Production Environment: Canonical Domain
  if (process.env.NODE_ENV === "production") {
    return "https://pdfyara.com";
  }

  // 3. Browser environment origin (for dev/preview)
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }

  // 4. Localhost fallback
  return "http://localhost:3000";
}

export function getAdSenseClientId(): string {
  return (process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "").trim();
}

export const SITE_CONFIG = {
  brandName: "PDFYARA",
  shortName: "Pdfyara",
  domain: "pdfyara.com",
  canonicalUrl: "https://pdfyara.com",
  tagline: "Free PDF Editor & Online Document Toolkit",
  description:
    "100% Free Online PDF Editor. Edit PDF text directly with matching fonts, merge, split, compress, sign, convert, and organize PDF documents in your browser with zero watermarks or signup.",
  supportEmail: "raokamlesh2803@gmail.com",
  socialCardType: "summary_large_image",
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",
} as const;

