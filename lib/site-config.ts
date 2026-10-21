/**
 * Site Configuration & Base URL Resolution
 * 
 * Prepares PDFYARA for any future custom domain without hardcoding.
 * 
 * Dynamic URL Resolution Priority:
 * 1. NEXT_PUBLIC_SITE_URL (custom domain set by user in Vercel / environment, e.g. https://pdfyara.com)
 * 2. NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL (automatically provided by Vercel in production)
 * 3. VERCEL_PROJECT_PRODUCTION_URL
 * 4. NEXT_PUBLIC_VERCEL_URL / VERCEL_URL (preview deployment fallback)
 * 5. Window origin (client-side fallback)
 * 6. http://localhost:3000 (local development)
 */

export function getBaseUrl(): string {
  // 1. Explicit Custom Domain set via Environment Variable
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    let url = process.env.NEXT_PUBLIC_SITE_URL.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }
    return url.replace(/\/+$/, "");
  }

  // 2. Vercel Production URL (automatic when deployed on Vercel)
  const vercelProd =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) {
    return `https://${vercelProd}`.replace(/\/+$/, "");
  }

  // 3. Vercel Preview / Branch URL
  const vercelUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}`.replace(/\/+$/, "");
  }

  // 4. Browser environment origin
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }

  // 5. Localhost fallback
  return "http://localhost:3000";
}

export const SITE_CONFIG = {
  brandName: "PDFYARA",
  shortName: "Pdfyara",
  tagline: "Free PDF Editor & Online Document Toolkit",
  description:
    "100% Free Online PDF Editor. Edit PDF text directly with matching fonts, merge, split, compress, sign, convert, and organize PDF documents in your browser with zero watermarks or signup.",
  supportEmail: "raokamlesh2803@gmail.com",
  socialCardType: "summary_large_image",
} as const;
