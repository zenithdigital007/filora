import type { Metadata } from "next";
import { getBaseUrl, SITE_CONFIG } from "@/lib/site-config";
import { generateBreadcrumbSchema, generateSoftwareApplicationSchema } from "@/lib/seo-schema";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: "Free PDF Editor Online — Edit PDF Text, Annotate & Sign PDF Free",
  description:
    "100% Free Online PDF Editor. Edit original PDF text with exact font matching, add text annotations, digital signatures, drawings, shapes, and stamps directly in your browser. No watermarks, no sign-up required.",
  keywords: [
    "free pdf editor",
    "free pdf editor online",
    "edit pdf free",
    "online pdf editor free",
    "edit text in pdf",
    "pdf editor no watermark",
    "sign pdf online free",
    "annotate pdf free",
    "best free pdf editor",
    "pdfyara pdf editor",
  ],
  alternates: {
    canonical: `${baseUrl}/editor`,
  },
  openGraph: {
    title: "Free PDF Editor Online — Edit PDF Text, Annotate & Sign PDF Free | PDFYARA",
    description:
      "100% Free Online PDF Editor. Edit PDF text, draw, highlight, stamp, and electronically sign documents right in your browser.",
    url: `${baseUrl}/editor`,
    siteName: SITE_CONFIG.brandName,
    type: "website",
    images: ["/icon"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Editor Online — Edit PDF Text, Annotate & Sign Free",
    description:
      "100% Free Online PDF Editor. Edit text, add shapes, signatures, and annotations directly in your browser without watermarks.",
    images: ["/icon"],
  },
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentBaseUrl = getBaseUrl();
  const editorSchema = {
    "@context": "https://schema.org",
    "@graph": [
      generateSoftwareApplicationSchema(
        currentBaseUrl,
        "PDFYARA Free PDF Editor",
        "/editor",
        "100% Free Online PDF Editor. Edit original PDF text with font matching, add signatures, shapes, annotations, stamps, and watermarks without sign-up or watermarks."
      ),
      generateBreadcrumbSchema(currentBaseUrl, [
        { name: "Home", path: "/" },
        { name: "Free PDF Editor", path: "/editor" },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(editorSchema) }}
      />
      {children}
    </>
  );
}
