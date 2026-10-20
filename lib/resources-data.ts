export interface ResourceItem {
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: {
    sections: { heading: string; body: string; table?: { headers: string[]; rows: string[][] } }[];
  };
}

export const RESOURCES_DATA: ResourceItem[] = [
  {
    slug: "pdf-page-size-guide",
    title: "Complete PDF Page Size & Dimensions Guide",
    category: "Dimensions & Standards",
    summary: "Comprehensive reference of ISO 216 (A4, A3, A5) and North American (Letter, Legal, Tabloid) page dimensions in mm, inches, and PDF points.",
    content: {
      sections: [
        {
          heading: "Understanding PDF Coordinate Units (Points)",
          body: "In the Adobe PDF and PostScript specification (ISO 32000-1), document dimensions are measured in PostScript Points (pt). By definition, 72 points equals exactly 1 inch (25.4 mm). Therefore, standardizing document sizes requires understanding the mathematical conversion between physical paper units and digital PDF points."
        },
        {
          heading: "ISO 216 International Standard Sizes",
          body: "The ISO 216 standard defines the 'A' series of paper sizes based on the geometric ratio of 1:√2. This ensures that halving or doubling a sheet preserves the identical aspect ratio.",
          table: {
            headers: ["Format", "Millimeters (mm)", "Inches (in)", "PDF Points (72 DPI)", "Common Usage"],
            rows: [
              ["A4", "210 × 297 mm", "8.27 × 11.69 in", "595 × 842 pt", "Standard international office paper, resumes, letters"],
              ["A3", "297 × 420 mm", "11.69 × 16.54 in", "842 × 1191 pt", "Diagrams, spreadsheets, blueprints, posters"],
              ["A5", "148 × 210 mm", "5.83 × 8.27 in", "420 × 595 pt", "Booklets, leaflets, notebooks, flyers"],
              ["A2", "420 × 594 mm", "16.54 × 23.39 in", "1191 × 1684 pt", "Architectural drawings, posters, charts"],
              ["A1", "594 × 841 mm", "23.39 × 33.11 in", "1684 × 2384 pt", "Engineering schematics, large maps"]
            ]
          }
        },
        {
          heading: "North American Standard Sizes",
          body: "North America (United States, Canada, Mexico) relies on ANSI paper standards rather than the metric ISO series.",
          table: {
            headers: ["Format", "Inches (in)", "Millimeters (mm)", "PDF Points (72 DPI)", "Common Usage"],
            rows: [
              ["US Letter", "8.5 × 11.0 in", "215.9 × 279.4 mm", "612 × 792 pt", "Standard US office printing, academic papers, invoices"],
              ["US Legal", "8.5 × 14.0 in", "215.9 × 355.6 mm", "612 × 1008 pt", "Legal contracts, court filings, real estate agreements"],
              ["Tabloid / Ledger", "11.0 × 17.0 in", "279.4 × 431.8 mm", "792 × 1224 pt", "Financial balance sheets, newspapers, newsletters"],
              ["Executive", "7.25 × 10.5 in", "184.1 × 266.7 mm", "522 × 756 pt", "Personal stationery, executive memos"]
            ]
          }
        }
      ]
    }
  },
  {
    slug: "pdf-security-guide",
    title: "PDF Security & Encryption Architecture Guide",
    category: "Security",
    summary: "An in-depth explanation of PDF encryption algorithms (RC4 vs AES-128 vs AES-256), permission flags, and true permanent redaction.",
    content: {
      sections: [
        {
          heading: "PDF Encryption Standards",
          body: "PDF security is governed by standard cryptographic cipher suites defined in ISO 32000. Early PDF versions (Acrobat 3.0-5.0) utilized 40-bit and 128-bit RC4 stream ciphers, which are now obsolete. Modern secure PDF files utilize AES (Advanced Encryption Standard) with 128-bit or 256-bit key lengths in CBC or GCM cipher modes."
        },
        {
          heading: "Owner Password vs User (Open) Password",
          body: "A PDF document can have two distinct passwords: the User Password (required to decrypt and open the file) and the Owner Password (used to configure permissions such as printing, copying text, or editing annotations)."
        },
        {
          heading: "Visual Blackout vs Permanent Redaction",
          body: "A dangerous mistake in document security is drawing a black shape over confidential text in basic PDF viewers. In standard PDF streams, text characters exist as vector strings independent of graphic layers. To ensure true redaction, the text string must be permanently removed from the content stream."
        }
      ]
    }
  },
  {
    slug: "pdf-compression-guide",
    title: "Understanding PDF Compression & Optimization",
    category: "Optimization",
    summary: "Technical breakdown of Flate stream compression, JPEG DCT downsampling, JBIG2 monochrome encoding, and font subsetting.",
    content: {
      sections: [
        {
          heading: "What Makes PDF Files Heavy?",
          body: "PDF files are container formats. The primary culprits behind large PDF sizes are: 1) Uncompressed or high-DPI raster images, 2) Full embedded font sets rather than subsets, 3) Redundant metadata streams, and 4) Unreferenced ghost objects created during multiple edits."
        },
        {
          heading: "Image Downsampling & Re-encoding",
          body: "A 600 DPI photo scanned for printing contains 16 times more pixels than needed for screen reading. Downsampling to 150 DPI with balanced JPEG quality preserves crisp typography while reducing file size by 70% to 90%."
        }
      ]
    }
  },
  {
    slug: "pdf-glossary",
    title: "The Ultimate PDF Terminology Glossary",
    category: "Reference",
    summary: "Definitions of essential PDF terms: AcroForm, CropBox, MediaBox, PostScript, Vector, Raster, OCR, Bates Stamping, and Linearization.",
    content: {
      sections: [
        {
          heading: "Core PDF Terminology",
          body: "Explore definitions of the most critical concepts in digital document engineering.",
          table: {
            headers: ["Term", "Definition", "Significance"],
            rows: [
              ["AcroForm", "Standard interactive PDF form mechanism supporting text boxes, checkboxes, radio buttons, and dropdowns.", "Enables digital form filling in any standard viewer."],
              ["MediaBox", "The boundary box defining the physical medium boundaries on which the page is intended to be printed.", "Determines the fundamental sheet dimensions in points."],
              ["CropBox", "The region to which the contents of the page are clipped when displayed or printed.", "Used by cropping tools to hide margins without destroying graphics."],
              ["OCR", "Optical Character Recognition: neural technology that converts pixel images of text into digital characters.", "Makes scanned photocopies searchable and copyable."],
              ["Bates Stamping", "A legal sequential indexing method stamping unique alphanumeric codes on document pages.", "Mandatory for litigation and discovery evidence."],
              ["Linearization", "Also known as 'Fast Web View', optimizes internal object order so page 1 loads before downloading the entire file.", "Essential for fast web previewing of large eBooks."]
            ]
          }
        }
      ]
    }
  },
  {
    slug: "pdf-faq",
    title: "Frequently Asked Questions About PDF Technology",
    category: "FAQ",
    summary: "Answers to common questions regarding PDF compatibility, editing, conversions, security, and browser processing.",
    content: {
      sections: [
        {
          heading: "General PDF Questions",
          body: "Common inquiries about standard PDF behaviors across devices, browsers, and operating systems."
        },
        {
          heading: "Privacy and Security",
          body: "Filora performs core document transformations (merging, splitting, watermarking, page numbers, encryption, client OCR) locally inside your browser using WebAssembly. Your files are not uploaded to our servers for browser-based operations."
        }
      ]
    }
  }
];

export function getResourceBySlug(slug: string): ResourceItem | undefined {
  return RESOURCES_DATA.find(r => r.slug === slug);
}
