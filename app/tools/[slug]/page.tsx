import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS_REGISTRY, getToolBySlug } from "@/lib/tools-registry";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { getBaseUrl, SITE_CONFIG } from "@/lib/site-config";
import { 
  generateSoftwareApplicationSchema, 
  generateBreadcrumbSchema, 
  generateFaqSchema 
} from "@/lib/seo-schema";

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return TOOLS_REGISTRY.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const baseUrl = getBaseUrl();

  if (!tool) {
    return {
      title: "Tool Not Found | PDFYARA",
    };
  }

  const toolUrl = `${baseUrl}/tools/${tool.slug}`;

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: {
      canonical: toolUrl,
    },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: toolUrl,
      siteName: SITE_CONFIG.brandName,
      type: "website",
      images: ["/icon"],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seoTitle,
      description: tool.seoDescription,
      images: ["/icon"],
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  const baseUrl = getBaseUrl();

  if (!tool) {
    notFound();
  }

  // Generate valid structured data matching visible content
  const schemaGraph: any[] = [
    generateSoftwareApplicationSchema(
      baseUrl,
      `${tool.name} — PDFYARA`,
      `/tools/${tool.slug}`,
      tool.description
    ),
    generateBreadcrumbSchema(baseUrl, [
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools" },
      { name: tool.category, path: `/tools?category=${encodeURIComponent(tool.category)}` },
      { name: tool.name, path: `/tools/${tool.slug}` },
    ]),
  ];

  if (tool.faq && tool.faq.length > 0) {
    const faqSchema = generateFaqSchema(tool.faq);
    if (faqSchema) schemaGraph.push(faqSchema);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": schemaGraph,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolLayout tool={tool} />
    </>
  );
}
