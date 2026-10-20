import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free PDF Editor Online — Edit PDF Text, Annotate & Sign PDF Free | Filora",
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
    "Filora PDF editor",
  ],
  alternates: {
    canonical: "https://filora.app/editor",
  },
  openGraph: {
    title: "Free PDF Editor Online — Edit PDF Text, Annotate & Sign PDF Free",
    description:
      "100% Free Online PDF Editor. Edit PDF text, draw, highlight, stamp, and electronically sign documents right in your browser.",
    url: "https://filora.app/editor",
    siteName: "Filora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Editor Online — Edit PDF Text, Annotate & Sign Free",
    description:
      "100% Free Online PDF Editor. Edit text, add shapes, signatures, and annotations directly in your browser without watermarks.",
  },
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Filora Free PDF Editor",
    alternateName: "Free PDF Editor Online",
    description:
      "100% Free Online PDF Editor. Edit original PDF text with font matching, add signatures, shapes, annotations, stamps, and watermarks without sign-up or watermarks.",
    url: "https://filora.app/editor",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    browserRequirements: "Requires modern web browser with HTML5 and WebAssembly support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Edit existing PDF text directly with matching fonts",
      "Add digital signatures by drawing, typing, or uploading",
      "Insert shapes, stamps, highlighters, and freehand drawings",
      "Multi-directional textbox expand and collapse controls",
      "100% client-side privacy protection with zero file uploads",
      "High-resolution vector export without watermarks",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
