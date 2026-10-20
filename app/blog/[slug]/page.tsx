import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog-data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { TopContentAd, BottomContentAd, InContentAd } from "@/components/ads/AdBanners";
import { Clock, Calendar, User, BookOpen } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Filora" };

  return {
    title: `${post.title} | Filora Engineering Blog`,
    description: post.excerpt,
  };
}

export default async function SingleBlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-neutral-500 font-semibold">
          <span className="text-filora font-bold uppercase tracking-wider bg-filora-50 px-2.5 py-1 rounded-full border border-filora-100">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {post.publishedAt}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed pt-2">
          {post.excerpt}
        </p>

        <div className="pt-2 flex items-center gap-2 text-xs text-neutral-500">
          <User className="w-4 h-4 text-filora" />
          <span>By {post.author}</span>
        </div>
      </div>

      <TopContentAd />

      <div className="space-y-8">
        {post.content.sections.map((sec, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-2xl font-bold text-neutral-900">{sec.heading}</h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">{sec.body}</p>
          </section>
        ))}
      </div>

      <BottomContentAd />
    </div>
  );
}
