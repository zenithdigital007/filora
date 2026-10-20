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
  title: "Filora — Free Online PDF & Document Toolkit | Files, made effortless.",
  description:
    "Edit, merge, split, compress, convert, sign, watermark, protect, and organize your PDF documents with simple online tools. Privacy-first, browser-powered processing.",
  keywords: [
    "PDF tools",
    "merge PDF",
    "compress PDF",
    "PDF editor",
    "sign PDF",
    "split PDF",
    "convert PDF",
    "free PDF tools",
    "Filora",
  ],
  metadataBase: new URL("https://filora.app"),
  openGraph: {
    title: "Filora — Free Online PDF & Document Toolkit",
    description: "Files, made effortless. Simple tools for every document.",
    url: "https://filora.app",
    siteName: "Filora",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
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
