/**
 * SEO & Schema.org JSON-LD Generators
 * Strictly follows Schema.org and Google Search specifications.
 * All schemas only represent visible, factual content without fake claims.
 */

import { SITE_CONFIG } from "./site-config";

export function generateWebSiteSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: SITE_CONFIG.brandName,
    alternateName: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: SITE_CONFIG.brandName,
    url: baseUrl,
    logo: `${baseUrl}/icon`,
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_CONFIG.supportEmail,
      contactType: "Customer Support",
    },
  };
}

export function generateSoftwareApplicationSchema(
  baseUrl: string,
  appName = "Pdfyara Free PDF Editor",
  appPath = "/editor",
  description = "100% Free Online PDF Editor. Edit original text, add annotations, draw, stamp, and electronically sign PDF documents in your browser."
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: appName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    browserRequirements: "Requires modern web browser with HTML5 and WebAssembly support",
    url: `${baseUrl}${appPath}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Client-side private PDF editing",
      "Exact font matching & text replacement",
      "Freehand vector pen and annotations",
      "Visual document signature and stamp tools",
      "No mandatory account or registration",
      "Zero watermarks added",
    ],
    description,
  };
}

export function generateBreadcrumbSchema(
  baseUrl: string,
  items: { name: string; path?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${baseUrl}${item.path}` } : {}),
    })),
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
