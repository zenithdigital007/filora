export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  content: {
    sections: { heading: string; body: string }[];
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-a-pdf-and-why-is-it-universal",
    title: "What Is a PDF? The History and Engineering Behind the Universal Document Format",
    category: "Document Technology",
    author: "Pdfyara Editorial Team",
    publishedAt: "2026-03-01",
    readTime: "6 min read",
    excerpt: "Explore how the Portable Document Format transformed computing by guaranteeing identical visual presentation across any device or operating system.",
    content: {
      sections: [
        {
          heading: "The Camelot Project: The Genesis of PDF",
          body: "In 1991, Dr. John Warnock, co-founder of Adobe, launched a research initiative called 'The Camelot Project'. The goal was audacious: to enable anyone to capture documents from any application, send electronic versions anywhere, and view or print them on any machine with 100% visual fidelity."
        },
        {
          heading: "Vector vs Raster: Why PDFs Scale Infinitely",
          body: "Unlike raster images (like JPG or PNG) which store grids of colored pixels, a PDF stores mathematical descriptions of geometric paths, typography, and color coordinates. This allows PDF vector text and lines to be zoomed infinitely without pixelation or loss of crispness."
        },
        {
          heading: "From Proprietary Specification to ISO Standard",
          body: "In 2008, PDF officially became an open international standard (ISO 32000-1). Today, it is governed by the independent PDF Association, ensuring that documents archived today will remain readable for centuries to come."
        }
      ]
    }
  },
  {
    slug: "how-pdf-compression-works",
    title: "How PDF Compression Actually Works Behind the Scenes",
    category: "Technical",
    author: "Pdfyara Editorial Team",
    publishedAt: "2026-02-22",
    readTime: "7 min read",
    excerpt: "A deep dive into Flate algorithms, image downsampling matrices, and font subset optimization.",
    content: {
      sections: [
        {
          heading: "The Internal Structure of a PDF",
          body: "A PDF is structured as a directed graph of objects: dictionaries, arrays, streams, strings, and numbers. When optimizing a PDF, the compressor analyzes which objects contribute the most bytes to the total file size."
        },
        {
          heading: "Lossless vs Lossy Optimization",
          body: "Lossless optimization strips unreferenced object streams, cleans duplicate font descriptors, and applies optimal Deflate compression. Lossy optimization re-samples high-DPI photographs to screen-friendly resolutions."
        }
      ]
    }
  },
  {
    slug: "what-is-bates-numbering-in-legal-workflows",
    title: "What Is Bates Numbering? The Essential Guide for Legal and Compliance Teams",
    category: "Legal & Discovery",
    author: "Pdfyara Legal Technology Group",
    publishedAt: "2026-02-14",
    readTime: "5 min read",
    excerpt: "Understand how Bates stamping works, why courts require it, and how to configure sequential prefixes and padding.",
    content: {
      sections: [
        {
          heading: "The Origin of Bates Numbering",
          body: "Invented in the late 19th century by Edwin G. Bates, the mechanical Bates automatic numbering machine stamped sequential numbers on physical paper evidence. Today, digital Bates stamping provides the identical sequential verification on electronic PDF bundles."
        },
        {
          heading: "Best Practices for Bates Stamping",
          body: "Attorneys typically use 6-digit zero-padding (e.g. DEFENDANT-000001) in the bottom-right corner to maintain consistent alignment across thousands of pages during discovery."
        }
      ]
    }
  },
  {
    slug: "why-browser-based-pdf-processing-protects-privacy",
    title: "Why Browser-Based PDF Processing Is the Future of Document Privacy",
    category: "Privacy & Security",
    author: "Pdfyara Security Team",
    publishedAt: "2026-02-05",
    readTime: "6 min read",
    excerpt: "Learn how modern WebAssembly and client-side JavaScript allow complete document manipulation without transmitting confidential data across the internet.",
    content: {
      sections: [
        {
          heading: "The Security Risk of Traditional Cloud Converters",
          body: "Traditional online file converters upload your confidential tax returns, medical files, or contracts to remote cloud servers. Even if those servers claim to delete files after an hour, the data traverses the public internet and sits temporarily on third-party disks."
        },
        {
          heading: "How Client-Side WebAssembly Changes the Game",
          body: "Pdfyara executes PDF manipulation directly inside your local browser memory sandbox. Your CPU processes the mathematical transformations and generates the download locally. Your confidential documents never leave your device."
        }
      ]
    }
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(b => b.slug === slug);
}
