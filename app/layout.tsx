import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Analytics } from "@vercel/analytics/next";
import { getBaseUrl, getAdSenseClientId, SITE_CONFIG } from "@/lib/site-config";
import { 
  generateWebSiteSchema, 
  generateOrganizationSchema, 
  generateSoftwareApplicationSchema 
} from "@/lib/seo-schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Online PDF Editor — Free PDF Editor & PDF Tools | PDFYARA",
    template: "%s | PDFYARA",
  },
  description:
    "100% Free Online PDF Editor and complete document productivity suite. Edit PDF text directly with matching fonts, merge, split, compress, sign, and convert PDFs in your browser without watermarks or signup.",
  applicationName: "PDFYARA",
  authors: [{ name: "PDFYARA Editorial & Engineering Team" }],
  creator: "PDFYARA",
  publisher: "PDFYARA",
  keywords: [
    "free pdf editor",
    "free pdf editor online",
    "online pdf editor",
    "edit pdf free",
    "edit text in pdf",
    "pdf editor no watermark",
    "merge pdf free",
    "compress pdf free",
    "split pdf free",
    "sign pdf online free",
    "pdf to word free",
    "pdf tools free",
    "pdfyara",
  ],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Online PDF Editor — Free PDF Editor & PDF Tools | PDFYARA",
    description: "100% Free Online PDF Editor. Edit PDF text, merge, compress, split, and sign PDFs right in your browser with complete privacy.",
    url: baseUrl,
    siteName: SITE_CONFIG.brandName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon",
        width: 512,
        height: 512,
        alt: "PDFYARA — Free Online PDF Editor & Document Toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online PDF Editor — Free PDF Editor & PDF Tools | PDFYARA",
    description: "100% Free Online PDF Editor & complete document productivity suite without watermarks.",
    images: ["/icon"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentBaseUrl = getBaseUrl();
  const adsenseClientId = getAdSenseClientId();
  const rootSchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      generateWebSiteSchema(currentBaseUrl),
      generateOrganizationSchema(currentBaseUrl),
      generateSoftwareApplicationSchema(currentBaseUrl),
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchemaGraph) }}
        />
        {adsenseClientId && (
          <>
            <meta name="google-adsense-account" content={adsenseClientId} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
              crossOrigin="anonymous"
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-surface-background text-neutral-900 font-sans antialiased selection:bg-filora-100 selection:text-filora">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
