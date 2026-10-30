export interface ResourceSection {
  heading: string;
  body?: string;
  paragraphs?: string[];
  bulletPoints?: string[];
  table?: { headers: string[]; rows: string[][] };
  callout?: { title: string; text: string; type?: "info" | "tip" | "warning" };
}

export interface ResourceItem {
  slug: string;
  title: string;
  category: string;
  summary: string;
  lastUpdated?: string;
  content: {
    sections: ResourceSection[];
  };
}

export const RESOURCES_DATA: ResourceItem[] = [
  {
    slug: "pdf-page-size-guide",
    title: "Complete PDF Page Size & Dimensions Guide",
    category: "Dimensions & Standards",
    summary: "Comprehensive engineering reference of ISO 216 (A-series, B-series), North American ANSI (Letter, Legal, Tabloid), and Architectural ARCH standards in mm, inches, and 72 DPI PostScript points.",
    lastUpdated: "March 2026",
    content: {
      sections: [
        {
          heading: "Understanding PDF Coordinate Units (Points)",
          paragraphs: [
            "In the Adobe PDF specification and ISO 32000 standard, physical document dimensions are measured in PostScript Points (pt). By mathematical definition, 72 PostScript points equals exactly 1 inch (25.4 millimeters).",
            "To convert physical paper sizes to digital PDF coordinates, apply the formula: Points = Inches × 72, or Points = (Millimeters / 25.4) × 72. Understanding this conversion is crucial when configuring automated document generation, custom cropping boundaries, or commercial pre-press templates."
          ],
          callout: {
            title: "Coordinate Resolution Standard",
            text: "PDF points are resolution-independent vector units. While they default to 1/72 inch, raster image rendering inside those points scales according to the target output device (e.g., 300 DPI for print, 144 DPI for Retina displays).",
            type: "info"
          }
        },
        {
          heading: "ISO 216 International Standard Sizes (A Series)",
          paragraphs: [
            "Adopted globally across Europe, Asia, Latin America, and Oceania, the ISO 216 'A' series is engineered on a geometric aspect ratio of 1:√2 (approximately 1:1.4142). This mathematical ratio guarantees that folding an A4 sheet in half produces an exact A5 sheet, while placing two A4 sheets side-by-side forms an A3 sheet without altering the proportional layout."
          ],
          table: {
            headers: ["Format", "Millimeters (mm)", "Inches (in)", "PDF Points (72 DPI)", "Common Usage"],
            rows: [
              ["A0", "841 × 1189 mm", "33.11 × 46.81 in", "2384 × 3370 pt", "Large format posters, academic conference banners, architectural plans"],
              ["A1", "594 × 841 mm", "23.39 × 33.11 in", "1684 × 2384 pt", "Engineering schematics, large technical blueprints, presentation maps"],
              ["A2", "420 × 594 mm", "16.54 × 23.39 in", "1191 × 1684 pt", "Diagrams, calendars, marketing display posters, medium blueprints"],
              ["A3", "297 × 420 mm", "11.69 × 16.54 in", "842 × 1191 pt", "Financial balance sheets, broadsheet documents, diagrams, double-page spreads"],
              ["A4", "210 × 297 mm", "8.27 × 11.69 in", "595 × 842 pt", "Universal international business correspondence, invoices, contracts, resumes"],
              ["A5", "148 × 210 mm", "5.83 × 8.27 in", "420 × 595 pt", "Booklets, leaflets, paperback books, medical prescription forms"],
              ["A6", "105 × 148 mm", "4.13 × 5.83 in", "298 × 420 pt", "Postcards, pocket notepads, shipping packaging labels"],
              ["A7", "74 × 105 mm", "2.91 × 4.13 in", "210 × 298 pt", "Instruction mini-leaflets, name tags, pocket schedules"]
            ]
          }
        },
        {
          heading: "North American Standard Sizes (ANSI / US Standards)",
          paragraphs: [
            "North America (United States, Canada, and parts of Mexico) utilizes imperial paper sizes standardized by the American National Standards Institute (ANSI/ASME Y14.1). Unlike the ISO series, ANSI aspect ratios do not scale geometrically by √2."
          ],
          table: {
            headers: ["Format", "Inches (in)", "Millimeters (mm)", "PDF Points (72 DPI)", "Common Usage"],
            rows: [
              ["US Letter", "8.5 × 11.0 in", "215.9 × 279.4 mm", "612 × 792 pt", "Standard US office printing, academic dissertations, legal documentation"],
              ["US Legal", "8.5 × 14.0 in", "215.9 × 355.6 mm", "612 × 1008 pt", "Legal contracts, court exhibits, loan covenants, real estate agreements"],
              ["Tabloid (Ledger)", "11.0 × 17.0 in", "279.4 × 431.8 mm", "792 × 1224 pt", "Corporate financial reports, newsletters, ledger sheets, architectural floorplans"],
              ["Junior Legal", "5.0 × 8.0 in", "127.0 × 203.2 mm", "360 × 576 pt", "Legal notepads, pocket checklists"],
              ["US Executive", "7.25 × 10.5 in", "184.1 × 266.7 mm", "522 × 756 pt", "Executive correspondence, personalized letterhead stationery"],
              ["ANSI C", "17.0 × 22.0 in", "431.8 × 558.8 mm", "1224 × 1584 pt", "Mechanical schematics, CAD layouts, facility planning diagrams"],
              ["ANSI D", "22.0 × 34.0 in", "558.8 × 863.6 mm", "1584 × 2448 pt", "Civil engineering project drawings, electrical distribution schematics"],
              ["ANSI E", "34.0 × 44.0 in", "863.6 × 1117.6 mm", "2448 × 3168 pt", "Full-scale manufacturing blueprints, aeronautical technical drawings"]
            ]
          }
        },
        {
          heading: "Architectural Paper Sizes (ARCH Series)",
          paragraphs: [
            "Architects and building planners frequently utilize the ARCH series because it offers aspect ratios (such as 3:2 and 4:3) that correlate cleanly with construction framing dimensions and physical drafting boards."
          ],
          table: {
            headers: ["Format", "Inches (in)", "Millimeters (mm)", "PDF Points (72 DPI)", "Primary Purpose"],
            rows: [
              ["ARCH A", "9.0 × 12.0 in", "228.6 × 304.8 mm", "648 × 864 pt", "Preliminary architectural sketches, client concept drafts"],
              ["ARCH B", "12.0 × 18.0 in", "304.8 × 457.2 mm", "864 × 1296 pt", "Small floor plan proofs, elevations, site submittals"],
              ["ARCH C", "18.0 × 24.0 in", "457.2 × 609.6 mm", "1296 × 1728 pt", "Medium construction drawings, zoning permit sets"],
              ["ARCH D", "24.0 × 36.0 in", "609.6 × 914.4 mm", "1728 × 2592 pt", "Standard commercial job-site building blueprints"],
              ["ARCH E", "36.0 × 48.0 in", "914.4 × 1219.2 mm", "2592 × 3456 pt", "Master architectural site plans, campus infrastructure schematics"]
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
    summary: "An in-depth explanation of PDF cryptographic ciphers (RC4, AES-128, AES-256), permission flags, owner passwords, and true permanent redaction.",
    lastUpdated: "March 2026",
    content: {
      sections: [
        {
          heading: "Cryptographic Encryption Standards in ISO 32000",
          paragraphs: [
            "PDF security is governed by standard cryptographic cipher suites defined across successive revisions of ISO 32000. Early PDF versions (PDF 1.1 through 1.4) relied on 40-bit and 128-bit RC4 stream ciphers. In modern cybersecurity, RC4 is critically compromised and vulnerable to brute-force key recovery in seconds.",
            "Modern secure PDF files utilize the Advanced Encryption Standard (AES) in either 128-bit or 256-bit key lengths operating in Cipher Block Chaining (CBC) or Galois/Counter Mode (GCM). In ISO 32000-2 (PDF 2.0), AES-256 with SASLprep password normalization and SHA-256/SHA-384 key derivation is the sole recommended encryption standard."
          ]
        },
        {
          heading: "Cipher Comparison Matrix",
          table: {
            headers: ["PDF Version", "Encryption Algorithm", "Key Length", "Security Status", "Vulnerabilities"],
            rows: [
              ["PDF 1.1 - 1.3", "RC4 (Standard)", "40-bit", "Insecure / Deprecated", "Brute-forced in seconds using consumer graphics cards"],
              ["PDF 1.4 - 1.5", "RC4 (Enhanced)", "128-bit", "Insecure / Deprecated", "Vulnerable to known-plaintext and stream bias attacks"],
              ["PDF 1.6", "AES-CBC", "128-bit", "Moderate Security", "Acceptable for legacy archive viewing, but superseded"],
              ["PDF 1.7 (Ext 3)", "AES-CBC", "256-bit", "Strong Security", "Industry enterprise standard; highly resistant to brute force"],
              ["PDF 2.0 (ISO 32000-2)", "AES-GCM / CBC", "256-bit", "Military Grade", "Integrates authenticated encryption and hardened SHA-384 key derivation"]
            ]
          }
        },
        {
          heading: "Owner Password vs User (Open) Password",
          paragraphs: [
            "A standard secured PDF document contains two distinct password slots defined within its Encryption Dictionary:"
          ],
          bulletPoints: [
            "User Password (Document Open Password): Encrypts the master file key. If set, no reader can decrypt, view, or render the document content without entering this password.",
            "Owner Password (Permissions Password): Governs access control flags within the PDF reader. It specifies whether users are permitted to print the document, copy text to the clipboard, extract pages, or add comments.",
            "Security Reality: The Owner Password relies on client-side software honor systems. In open-source PDF viewers, permissions flags are completely bypassed because the underlying data is already decrypted. If true confidentiality is required, always set a User (Document Open) Password."
          ],
          callout: {
            title: "Crucial Security Insight",
            text: "Restricting printing or text copying with an Owner Password does NOT provide cryptographic confidentiality. Only a Document Open Password mathematically encrypts the content stream.",
            type: "warning"
          }
        },
        {
          heading: "Visual Blackout vs Permanent Stream Redaction",
          paragraphs: [
            "Drawing a black rectangle over sensitive text in standard PDF viewers only creates an overlapping graphic layer. The underlying characters remain present in the object stream, readily accessible to anyone who selects all text (Ctrl+A) or searches the file.",
            "True redaction is an irrevocable, destructive process. The engine parses the character bounding boxes, removes the character codes and font drawing operators from the PDF stream, paints the area with solid pixels, and sanitizes document metadata."
          ]
        }
      ]
    }
  },
  {
    slug: "pdf-compression-guide",
    title: "Understanding PDF Compression & Optimization",
    category: "Optimization",
    summary: "Technical breakdown of Flate stream compression, JPEG DCT downsampling, JBIG2 monochrome encoding, and font subsetting.",
    lastUpdated: "March 2026",
    content: {
      sections: [
        {
          heading: "What Makes PDF Files Heavy?",
          paragraphs: [
            "PDF files are container formats. The primary culprits behind large PDF sizes are: 1) Uncompressed or high-DPI raster images, 2) Full embedded font sets rather than subsets, 3) Redundant metadata streams, and 4) Unreferenced ghost objects created during multiple edits.",
            "When analyzing an oversized PDF, a compressor classifies objects into compressible text/vector streams, embeddable raster assets, font programs, and cross-reference indices."
          ]
        },
        {
          heading: "Image Downsampling & Re-encoding",
          paragraphs: [
            "A 600 DPI photo scanned for printing contains 16 times more pixels than needed for screen reading. Downsampling to 150 DPI with balanced JPEG quality preserves crisp typography while reducing file size by 70% to 90%.",
            "For black-and-white scanned documents, JBIG2 encoding outperforms legacy CCITT Group 4 compression by up to 500%, identifying repeating character glyphs across scanned pages and storing single bitmap instances in an internal dictionary."
          ]
        },
        {
          heading: "Lossless vs Lossy Optimization Comparison",
          table: {
            headers: ["Technique", "Type", "Typical Size Reduction", "Visual Impact", "Target Objects"],
            rows: [
              ["Flate (Deflate)", "Lossless", "40% - 70%", "Zero change (100% bit-identical)", "Text streams, vector drawing operators, XML metadata"],
              ["Bicubic Downsampling", "Lossy", "60% - 90%", "Imperceptible on screen at 150 DPI", "High-resolution photos and scanned raster bitmaps"],
              ["Font Subsetting", "Lossless", "75% - 98%", "Zero change (preserves identical typography)", "Embedded TrueType and OpenType font dictionaries"],
              ["Object Stream Compaction", "Lossless", "10% - 25%", "Zero change", "Cross-reference (xref) tables and metadata dictionaries"]
            ]
          }
        }
      ]
    }
  },
  {
    slug: "pdf-glossary",
    title: "The Ultimate PDF Terminology Glossary",
    category: "Reference",
    summary: "Comprehensive definitions of 40+ essential PDF terms: AcroForm, CropBox, MediaBox, PostScript, Vector, Raster, OCR, Bates Stamping, Linearization, and CMaps.",
    lastUpdated: "March 2026",
    content: {
      sections: [
        {
          heading: "Core PDF Architectural Terms",
          paragraphs: [
            "A comprehensive reference defining the technical vocabulary of digital document engineering, ISO 32000 specifications, and prepress production."
          ],
          table: {
            headers: ["Term", "Definition", "Significance in Document Workflows"],
            rows: [
              ["AcroForm", "Standard interactive PDF form mechanism supporting text fields, checkboxes, radio buttons, and digital signatures.", "Enables fillable digital documents across all compliant PDF viewers."],
              ["AES-256", "Advanced Encryption Standard with a 256-bit key length.", "The military-grade cryptographic cipher standard recommended in ISO 32000-2."],
              ["ArtBox", "The boundary box defining the meaningful content extent of a page.", "Used by layout and desktop publishing applications when importing pages."],
              ["Bates Stamping", "A sequential alphanumeric numbering system stamped on legal discovery documents.", "Mandatory for evidence indexing in litigation and court filings."],
              ["BleedBox", "The boundary box defining the region to which page content should be clipped during commercial printing.", "Ensures colors extend past the final trim line to prevent white paper borders."],
              ["CIDFont", "A composite font architecture using Character Identifiers to support massive character sets.", "Essential for rendering Asian languages (Chinese, Japanese, Korean) in PDFs."],
              ["CropBox", "The rectangular region to which the page contents are clipped when displayed or printed.", "Defines the default viewing window rendered in web browsers and screen readers."],
              ["DCTDecode", "A discrete cosine transform filter used to decode standard JPEG raster images inside PDFs.", "Enables lossy photographic compression within document streams."],
              ["FlateDecode", "A lossless compression filter utilizing the zlib/Deflate algorithm.", "Compresses vector path operators, text coordinates, and metadata streams."],
              ["JBIG2", "A high-efficiency monochrome image compression standard specified in ISO/IEC 14492.", "Delivers massive file size reductions for scanned text documents."],
              ["Linearization", "Also known as 'Fast Web View', optimizes internal object order so page 1 renders before downloading.", "Critical for instant web viewing of multi-hundred-page textbooks."],
              ["MediaBox", "The mandatory boundary box defining the physical medium boundaries on which the page is printed.", "Determines the fundamental sheet coordinates (in PostScript points)."],
              ["OCR", "Optical Character Recognition: neural technology that converts pixel images into digital text.", "Transforms unsearchable photo scans into selectable, copyable text layers."],
              ["PAdES", "PDF Advanced Electronic Signatures: European telecommunications standards (ETSI) for digital signatures.", "Provides long-term cryptographic validity and timestamping for legal contracts."],
              ["PDF/A", "ISO 19005 standard constrained for long-term digital preservation.", "Mandatory for government archives, legal records, and tax filings."],
              ["PostScript", "A page description programming language developed by Adobe in 1982.", "The foundational rendering and coordinate ancestor of the PDF format."],
              ["Redaction", "The permanent and irreversible removal of confidential text and image data from a document.", "Prevents accidental leaks of classified or protected health information."],
              ["ToUnicode CMap", "A mapping table translating internal font glyph indices into standardized Unicode code points.", "Guarantees that copying and searching text returns accurate characters rather than gibberish."],
              ["TrimBox", "The boundary box defining the intended final dimensions of the page after physical cutting.", "Guides commercial bindery guillotines during paper trimming."],
              ["XFA", "XML Forms Architecture: a proprietary Adobe form specification deprecated in PDF 2.0.", "Known for causing blank page errors on modern mobile and web browser viewers."]
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
    summary: "Authoritative answers to 20+ common questions regarding PDF compatibility, editing, client-side security, format conversions, and printing.",
    lastUpdated: "March 2026",
    content: {
      sections: [
        {
          heading: "General & Architectural Questions",
          paragraphs: [
            "Detailed technical answers explaining how PDF documents behave across operating systems and web browsers."
          ],
          bulletPoints: [
            "Why do PDF documents look identical on every device? Because PDFs embed vector coordinates, explicit font glyph outlines, and color profiles directly inside the file container, ensuring the rendering engine does not rely on local system fonts or printer drivers.",
            "What is the difference between PDF 1.7 and PDF 2.0? PDF 1.7 was standardized in 2008 as ISO 32000-1. PDF 2.0 (ISO 32000-2:2020) updates encryption to native AES-256, deprecates legacy XFA and insecure ciphers, adds UTF-8 metadata support, and enhances 3D geometric modeling.",
            "Can I edit text in a PDF like a Microsoft Word document? Yes, but with architectural constraints. Word processors operate on reflowable text streams where adding a word shifts all subsequent paragraphs. In a PDF, characters are positioned at fixed (X, Y) coordinates; editing text requires recalculating line widths and character kernings.",
            "Why does my PDF show 'Please wait...' when opened in Google Chrome? The file was authored using Adobe's proprietary dynamic XFA format rather than standard AcroForms. Modern web browsers do not support dynamic XFA. Use Pdfyara's Fill & Sign tool to overlay content and convert it to a universal static format."
          ]
        },
        {
          heading: "Security & Privacy Questions",
          paragraphs: [
            "Insights into how client-side processing guarantees complete privacy for confidential records."
          ],
          bulletPoints: [
            "Does Pdfyara upload my confidential documents to remote cloud servers? For browser-based operations (including Merge, Split, Compress, Rotate, Watermark, Sign, and Client OCR), your files process 100% locally in your browser memory using WebAssembly. Your documents never traverse the internet.",
            "Is client-side browser processing compliant with HIPAA and GDPR? Yes. Because document contents are processed exclusively inside your local device's memory sandbox and never sent to our servers, Pdfyara does not act as a data processor for those files.",
            "Does drawing a black rectangle over text protect my sensitive data? No! Drawing a black box simply adds a visual graphic rectangle on top of the text. The underlying characters remain in the file stream and can be copied or searched. Always use a permanent Redaction tool.",
            "Can a password-protected PDF be opened if the password is forgotten? If the document was encrypted with modern AES-256 and a strong User Password, it cannot be decrypted without the correct password. AES-256 is mathematically invulnerable to brute-force attacks within human lifetimes."
          ]
        },
        {
          heading: "Printing & Conversion Questions",
          paragraphs: [
            "Practical solutions for high-resolution printing, conversions, and file size optimization."
          ],
          bulletPoints: [
            "Why do colors look duller when printed than on my laptop screen? Monitors emit light in RGB, which has a broad color gamut including neon hues. Commercial printers use subtractive CMYK inks, which have a narrower physical color spectrum.",
            "What resolution should I use when converting images to PDF? For high-quality commercial printing, use 300 DPI. For standard office viewing and email attachments, 150 DPI provides the ideal balance between crisp sharpness and lightweight file size.",
            "Why does text copy as weird symbols or question marks? The PDF author failed to embed a valid ToUnicode CMap table when creating the file. The reader displays the visual glyphs correctly, but cannot map them back to standard Unicode characters upon copying.",
            "What is a 'Sandwich PDF'? A Sandwich PDF is a two-layer document produced by OCR software: the original scanned photo appears in the foreground, while an invisible layer of selectable vector text is positioned directly beneath it."
          ]
        }
      ]
    }
  },
  {
    slug: "pdf-archival-conformance-matrix",
    title: "ISO 19005 PDF/A Archival Conformance Matrix",
    category: "Archival Standards",
    summary: "Complete engineering specification matrix comparing PDF/A-1, PDF/A-2, PDF/A-3, and PDF/A-4 conformance levels (Basic, Accessible, Unicode) for enterprise record retention.",
    lastUpdated: "March 2026",
    content: {
      sections: [
        {
          heading: "The Evolution of Long-Term Archiving Standards",
          paragraphs: [
            "As digital transformation replaced physical paper archives in legal, financial, and government sectors, the necessity for guaranteed long-term accessibility prompted the creation of ISO 19005. Standard PDFs frequently become unreadable over decades due to missing fonts, broken hyperlinks, and deprecated proprietary plugins.",
            "The PDF/A standard solves this by strictly banning features that jeopardize permanence while mandating self-contained assets."
          ]
        },
        {
          heading: "Comprehensive PDF/A Conformance Matrix",
          table: {
            headers: ["Standard", "ISO Year", "Conformance Levels", "Allowed Technologies", "Prohibited Features"],
            rows: [
              ["PDF/A-1", "ISO 19005-1 (2005)", "1b (Basic), 1a (Accessible)", "Device-independent colors, fully embedded fonts", "Transparency, JPEG 2000, encryption, audio/video, JavaScript"],
              ["PDF/A-2", "ISO 19005-2 (2011)", "2b (Basic), 2u (Unicode), 2a (Accessible)", "Native transparency, JPEG 2000, embedded PDF/A attachments", "Audio/video, JavaScript, external font references"],
              ["PDF/A-3", "ISO 19005-3 (2012)", "3b (Basic), 3u (Unicode), 3a (Accessible)", "Embedding of arbitrary file formats (XML, CSV, CAD drawings)", "Dynamic JavaScript, external font links"],
              ["PDF/A-4", "ISO 19005-4 (2020)", "PDF/A-4, 4e (Engineering), 4f (Attachments)", "Built on PDF 2.0; rich 3D annotations in 4e", "Obsolete ciphers, non-standard metadata"]
            ]
          }
        },
        {
          heading: "Conformance Levels Explained: b vs u vs a",
          bulletPoints: [
            "Level B (Basic): Focuses solely on visual preservation. Guarantees that the document will look visually identical when opened centuries from now.",
            "Level U (Unicode): Extends Level B by mandating that all text characters map to Unicode code points, ensuring reliable copy-pasting and full-text indexing.",
            "Level A (Accessible): The highest compliance tier. Mandates tagged logical reading structure, table header semantics, and alternative text for graphics, enabling screen reader accessibility."
          ]
        }
      ]
    }
  },
  {
    slug: "prepress-print-preparation-checklist",
    title: "Pre-Press Print Preparation Guide & Checklist",
    category: "Pre-Press & Printing",
    summary: "Essential technical checklist for commercial print preparation: bleed margins, trim boundaries, 300 DPI resolution, CMYK separations, and rich black ink limits.",
    lastUpdated: "March 2026",
    content: {
      sections: [
        {
          heading: "The Critical Rules of Commercial Pre-Press",
          paragraphs: [
            "Preparing a digital PDF for offset lithography or digital press printing requires strict adherence to physical production tolerances. Errors discovered after a print run of 10,000 brochures are financially catastrophic."
          ]
        },
        {
          heading: "The 8-Point Pre-Press Verification Checklist",
          bulletPoints: [
            "Bleed Margins: Ensure all background colors and photos extend at least 0.125 inches (3mm / 9pt) beyond the TrimBox to prevent unsightly white slivers after guillotine cutting.",
            "Image Resolution: Verify all raster photos measure at least 300 DPI at 100% placed scale. Downscaled web images (72 DPI) will print noticeably pixelated.",
            "Color Space Conversion: Convert all RGB elements to CMYK using the printer's recommended ICC Output Intent profile (e.g., GRACoL 2006 or FOGRA39).",
            "Font Embedding & Outlining: Verify 100% of fonts are subset-embedded. For small headline logos, consider converting glyphs to vector paths.",
            "Total Area Coverage (TAC): Ensure ink density does not exceed 300% to 320% in dark photographic shadows to prevent paper cockling and slow ink drying.",
            "100% K Black for Small Text: Set body typography below 14pt to 100% Key/Black (0C 0M 0Y 100K) rather than 4-color rich black to avoid registration blurring.",
            "Safety Margins: Keep all critical text, page numbers, and logos at least 0.25 inches (6mm) inside the TrimBox boundary.",
            "Crop & Registration Marks: Include standard printer marks positioned outside the BleedBox so they are completely trimmed off during bindery."
          ]
        }
      ]
    }
  },
  {
    slug: "pdf-troubleshooting-handbook",
    title: "PDF Error Diagnostics & File Repair Handbook",
    category: "Troubleshooting",
    summary: "Step-by-step diagnostic procedures for fixing corrupted PDF cross-reference tables, missing fonts, broken page structures, and linearized stream failures.",
    lastUpdated: "March 2026",
    content: {
      sections: [
        {
          heading: "Diagnosing Common PDF Failure Modes",
          paragraphs: [
            "When a PDF fails to open or displays errors like 'The file is damaged and could not be repaired', understanding the internal structure enables rapid recovery."
          ]
        },
        {
          heading: "Common Error Signatures & Repair Strategies",
          table: {
            headers: ["Error Message / Symptom", "Root Cause", "Actionable Repair Strategy"],
            rows: [
              ["Corrupt xref Table", "Damaged byte offset table at the tail of the file", "Rebuild the cross-reference table by scanning object headers sequentially with Pdfyara Repair"],
              ["Missing Font Warning", "Font was unembedded and host OS lacks the font", "Run OCR to generate an accessible vector layer or flatten the page using vector curves"],
              ["Blank Pages in Browser", "File uses Adobe dynamic XFA forms", "Load into Pdfyara Fill & Sign and export a flattened standard AcroForm"],
              ["Garbled Copy-Paste Text", "Missing ToUnicode CMap dictionary in font subset", "Extract text using Tesseract OCR rather than relying on the corrupted CMap"],
              ["Extreme Lag on Zooming", "Document contains hundreds of thousands of vector points", "Rasterize complex CAD vector paths into a 300 DPI bitmap background"]
            ]
          }
        }
      ]
    }
  },
  {
    slug: "document-compliance-gdpr-hipaa",
    title: "Enterprise Document Privacy: GDPR, HIPAA, and Client-Side Processing",
    category: "Compliance & Security",
    summary: "How client-side WebAssembly document processing enables healthcare, legal, and financial enterprises to meet strict GDPR, HIPAA, and CCPA regulatory mandates.",
    lastUpdated: "March 2026",
    content: {
      sections: [
        {
          heading: "The Regulatory Exposure of Cloud Document Processing",
          paragraphs: [
            "Under the Health Insurance Portability and Accountability Act (HIPAA) in the United States and the General Data Protection Regulation (GDPR) in the European Union, uploading protected records (ePHI or personal data) to unvetted cloud services carries severe statutory fines.",
            "Traditional cloud converters store uploaded documents on multi-tenant file servers, creating high-risk transmission, processing, and retention events that require complex Business Associate Agreements (BAAs) and security audits."
          ]
        },
        {
          heading: "Why Client-Side WebAssembly Eliminates Compliance Risk",
          paragraphs: [
            "Pdfyara solves this regulatory dilemma by executing document transformations inside your local browser memory sandbox."
          ],
          bulletPoints: [
            "Zero Data In Transit: Confidential documents are never transmitted over the public internet to our servers.",
            "Zero Server Storage: No temporary copies or residual cache files are created on remote hard drives.",
            "No Data Processor Status: Because Pdfyara never receives or accesses your document payload, no cross-border data transfer assessments are triggered.",
            "Complete Auditability: Network engineers can monitor browser HTTP traffic to verify that zero outbound bytes leave the workstation during processing."
          ]
        }
      ]
    }
  },
  {
    slug: "pdf-accessibility-ua-standard",
    title: "PDF Accessibility & ISO 14289 (PDF/UA) Standards",
    category: "Accessibility & Standards",
    summary: "A practical guide to creating universally accessible PDF documents conforming to ISO 14289 (PDF/UA), Section 508, and WCAG 2.1 Level AA standards.",
    lastUpdated: "March 2026",
    content: {
      sections: [
        {
          heading: "What Is PDF/UA (Universal Accessibility)?",
          paragraphs: [
            "Millions of people with visual, motor, or cognitive disabilities rely on assistive technologies such as screen readers (JAWS, NVDA, VoiceOver) and refreshable braille displays to access digital documents. However, an untagged PDF is merely a graphic drawing canvas without semantic meaning.",
            "Standardized in 2012 as ISO 14289-1, PDF/UA (Universal Accessibility) defines the technical specifications required to make PDF content fully accessible."
          ]
        },
        {
          heading: "Key Requirements for PDF/UA and WCAG 2.1 Compliance",
          bulletPoints: [
            "Logical Structural Tree: The document must contain a semantic tag hierarchy (Document, Part, Sect, H1, H2, P, Table) that guides the reading order independent of visual layout.",
            "Alternative Text for Non-Text Content: Every photo, chart, and diagram must have descriptive 'Alt' text explaining its educational context.",
            "Table Semantics: Tables must explicitly designate header cells (`<TH>`) and data cells (`<TD>`), enabling screen readers to announce column headers as users navigate rows.",
            "Color Contrast: Text must maintain a minimum contrast ratio of 4.5:1 against background colors to assist users with low vision or color vision deficiency.",
            "Document Language: The natural language (e.g., 'en-US' or 'es-ES') must be declared in document catalog metadata so text-to-speech synthesizers apply accurate pronunciation rules."
          ]
        }
      ]
    }
  }
];

export function getResourceBySlug(slug: string): ResourceItem | undefined {
  return RESOURCES_DATA.find((r) => r.slug === slug);
}
