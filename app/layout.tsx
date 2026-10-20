import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";

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

export const metadata: Metadata = {
  title: "Filora — Free PDF Editor & Online Document Toolkit | Files, made effortless.",
  description:
    "100% Free Online PDF Editor and document productivity suite. Edit PDF text, merge, split, compress, convert, sign, watermark, protect, and organize PDFs right in your browser without watermarks or registration.",
  keywords: [
    "free PDF editor",
    "free pdf editor online",
    "edit PDF free",
    "online PDF editor",
    "free PDF tools",
    "merge PDF free",
    "compress PDF free",
    "sign PDF free",
    "split PDF",
    "PDF to Word",
    "convert PDF free",
    "Filora",
  ],
  metadataBase: new URL("https://filora.app"),
  alternates: {
    canonical: "https://filora.app",
  },
  openGraph: {
    title: "Filora — Free PDF Editor & Online Document Toolkit",
    description: "Files, made effortless. 100% Free Online PDF Editor and tools for every document.",
    url: "https://filora.app",
    siteName: "Filora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filora — Free PDF Editor & Online Document Toolkit",
    description: "Free Online PDF Editor & complete document productivity suite.",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://filora.app/#website",
        url: "https://filora.app",
        name: "Filora",
        description: "Free Online PDF Editor & Document Processing Platform",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://filora.app/tools?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://filora.app/#organization",
        name: "Filora",
        url: "https://filora.app",
        logo: "https://filora.app/icon",
        sameAs: ["https://github.com/zenithdigital007/filora"],
      },
      {
        "@type": "SoftwareApplication",
        name: "Filora Free PDF Editor",
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        url: "https://filora.app/editor",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Cinzel:wght@400..700&family=Cormorant+Garamond:ital,wght@0,400..700;1,400..700&family=Dancing+Script:wght@400..700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Inconsolata:wght@300..800&family=JetBrains+Mono:ital,wght@0,300..800;1,300..800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Nunito:ital,wght@0,300..800;1,300..800&family=Oswald:wght@300..700&family=PT+Sans:ital,wght@0,400;0,700;1,400&family=PT+Serif:ital,wght@0,400;0,700;1,400&family=Pacifico&family=Quicksand:wght@400..700&family=Raleway:ital,wght@0,300..800;1,300..800&family=Rubik:ital,wght@0,300..800;1,300..800&family=Satisfy&family=Source+Code+Pro:ital,wght@0,300..800;1,300..800&family=Source+Sans+3:ital,wght@0,300..800;1,300..800&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Ubuntu:ital,wght@0,300..700;1,300..700&family=Work+Sans:ital,wght@0,300..800;1,300..800&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-neutral-900 antialiased selection:bg-filora-100 selection:text-filora">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
