import type { Metadata } from "next";
import { getBaseUrl, SITE_CONFIG } from "@/lib/site-config";
import { generateBreadcrumbSchema } from "@/lib/seo-schema";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: "All Free PDF Tools — Merge, Split, Compress, Sign & Edit | PDFYARA",
  description:
    "Explore PDFYARA's complete suite of 35+ free document tools. Merge, compress, split, sign, rotate, protect, watermark, and convert PDFs directly in your browser with zero registration.",
  keywords: [
    "all pdf tools",
    "free pdf toolkit",
    "pdf tools online",
    "merge pdf",
    "compress pdf",
    "split pdf",
    "edit pdf",
    "convert pdf free",
    "pdfyara tools",
  ],
  alternates: {
    canonical: `${baseUrl}/tools`,
  },
  openGraph: {
    title: "All Free PDF Tools — Merge, Split, Compress, Sign & Edit | PDFYARA",
    description:
      "Explore PDFYARA's complete suite of 35+ free document tools. 100% private in-browser processing.",
    url: `${baseUrl}/tools`,
    siteName: SITE_CONFIG.brandName,
    type: "website",
    images: ["/icon"],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Free PDF Tools | PDFYARA",
    description: "Explore 35+ free online PDF tools. 100% private in-browser processing.",
    images: ["/icon"],
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentBaseUrl = getBaseUrl();
  const breadcrumbSchema = generateBreadcrumbSchema(currentBaseUrl, [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
