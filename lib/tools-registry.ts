export interface ToolConfig {
  slug: string;
  name: string;
  category: 
    | "Edit & Sign"
    | "Merge & Split"
    | "Compress"
    | "Convert From PDF"
    | "Convert To PDF"
    | "Security"
    | "Page Management"
    | "OCR & Scanning"
    | "Forms"
    | "Document Information"
    | "Advanced PDF Tools";
  description: string;
  shortDesc: string;
  icon: string;
  route: string;
  seoTitle: string;
  seoDescription: string;
  processingMode: "browser" | "server";
  supportedFormats: string[];
  badge?: "Popular" | "Essential" | "New" | "Browser Safe" | "Secure";
  intro: string;
  howToUse: { title: string; desc: string }[];
  howItWorks: string;
  optionsExplained?: { name: string; desc: string }[];
  useCases: { title: string; desc: string }[];
  bestPractices: string[];
  commonMistakes: string[];
  limitations: string[];
  faq: { question: string; answer: string }[];
  relatedTools: string[];
  relatedGuides: string[];
}

export const TOOLS_REGISTRY: ToolConfig[] = [
  // 1. MERGE PDF
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    category: "Merge & Split",
    description: "Combine multiple PDF documents into a single cohesive file in your preferred order.",
    shortDesc: "Combine multiple PDFs into one unified file",
    icon: "Layers",
    route: "/tools/merge-pdf",
    seoTitle: "Merge PDF Online Free — Combine Multiple PDF Files | Pdfyara",
    seoDescription: "Combine multiple PDF files into one single document directly in your browser. Fast, free, reorder pages, and 100% private client-side processing.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Popular",
    intro: "Merging multiple PDF documents is one of the most common document workflows. Whether you are assembling multi-part reports, compiling invoices, preparing portfolios, or combining scanned pages, Pdfyara's Merge PDF tool allows you to seamlessly join multiple files together in the exact order you need.",
    howToUse: [
      { title: "Select or Drop Files", desc: "Drag and drop two or more PDF files into the upload area or click to select them from your device." },
      { title: "Arrange in Order", desc: "Drag the file cards up or down to arrange them in the sequence you want them to appear in the combined document." },
      { title: "Preview & Adjust", desc: "Inspect page counts and file names to verify that all necessary materials are included." },
      { title: "Merge & Download", desc: "Click 'Merge PDF' to instantly generate your joined document and download it to your device." }
    ],
    howItWorks: "Pdfyara loads the binary streams of your chosen PDF documents directly inside your browser using modern WebAssembly-accelerated PDF processing. It copies the page trees, font dictionaries, and content streams into a newly constructed PDF catalog without sending your files to an external server.",
    useCases: [
      { title: "Report Consolidation", desc: "Assemble executive summaries, financial statements, and appendix documents into a single submission." },
      { title: "Job Applications", desc: "Combine your cover letter, resume/CV, certifications, and reference letters into one polished portfolio." },
      { title: "Invoice & Receipt Bundling", desc: "Compile monthly receipts and expense vouchers for accountant or tax reviews." },
      { title: "Legal & Academic Compilations", desc: "Bundle research papers, briefs, and supporting exhibits into a cohesive binder." }
    ],
    bestPractices: [
      "Verify that all source PDFs have the same or compatible page orientations before merging.",
      "Remove unnecessary or blank pages from individual documents before combining to keep the file size compact.",
      "Give your source files meaningful names so they are easy to arrange in the visual list.",
      "Check the final page count after merging to ensure no pages were accidentally omitted."
    ],
    commonMistakes: [
      "Uploading password-protected PDFs without unlocking them first.",
      "Accidentally mixing draft versions with finalized documents.",
      "Forgetting to verify the sequence before hitting download."
    ],
    limitations: [
      "Files with proprietary digital rights management (DRM) or active encryption must have permissions granted before merging.",
      "Very large batches (e.g. hundreds of high-res image PDFs) depend on your available browser memory."
    ],
    faq: [
      { question: "Is my document uploaded to your server when merging?", answer: "No. Pdfyara merges your PDF documents locally inside your browser using client-side JavaScript. Your confidential files never leave your computer or phone." },
      { question: "Can I reorder individual pages from different files?", answer: "Yes! For granular page-level rearrangement across multiple documents, you can use Pdfyara's Organize PDF tool or the flagship PDF Editor." },
      { question: "Is there a limit on how many PDFs I can combine?", answer: "Pdfyara lets you combine dozens of PDFs at once. The only limitation is your device's memory capacity." },
      { question: "Will the hyperlinks and bookmarks be preserved?", answer: "Standard page links and content streams are preserved in the merged document." }
    ],
    relatedTools: ["split-pdf", "organize-pdf", "compress-pdf", "extract-pages"],
    relatedGuides: ["how-to-merge-pdf-files", "how-to-organize-pdf-pages", "how-to-reduce-pdf-size"]
  },

  // 2. SPLIT PDF
  {
    slug: "split-pdf",
    name: "Split PDF",
    category: "Merge & Split",
    description: "Extract specific page ranges, split by page numbers, or separate every page into individual documents.",
    shortDesc: "Separate PDF into multiple files or extracts",
    icon: "Scissors",
    route: "/tools/split-pdf",
    seoTitle: "Split PDF Online Free — Separate PDF Pages | Pdfyara",
    seoDescription: "Split large PDF files into smaller documents. Extract page ranges, separate odd/even pages, or save every page as an individual PDF locally.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Popular",
    intro: "Large multi-page PDF documents frequently contain sections, chapters, or specific exhibits that need to be shared separately. Pdfyara's Split PDF tool gives you surgical control to break apart your documents into individual pages, custom page brackets, or separate odd and even sheets.",
    howToUse: [
      { title: "Upload your PDF", desc: "Select or drag your PDF document into the splitting workspace." },
      { title: "Choose Split Mode", desc: "Select between custom page ranges (e.g. 1-3, 5, 8-12), split every single page, or separate odd/even pages." },
      { title: "Specify Ranges", desc: "Enter your target page ranges using standard comma and hyphen notation." },
      { title: "Generate & Download", desc: "Download the resulting split files directly or as an organized ZIP archive." }
    ],
    howItWorks: "The tool reads the PDF page tree and extracts the dictionary references for your selected pages into new target document streams, preserving original vector graphics, embedded fonts, and raster images.",
    useCases: [
      { title: "Chapter Separation", desc: "Break down e-books, training manuals, and syllabi into weekly modules." },
      { title: "Invoice Distribution", desc: "Split a batch invoice run into single-page customer invoices." },
      { title: "Extracting Exhibits", desc: "Isolate specific pages from large discovery or real estate bundles for targeted emailing." }
    ],
    bestPractices: [
      "Use commas to separate disjoint ranges, e.g., '1-4, 7, 10-12'.",
      "Preview page numbers to ensure your physical page indices match the PDF document numbering.",
      "Download multiple split files bundled in a single ZIP for easy file management."
    ],
    commonMistakes: [
      "Entering page numbers exceeding the total document page count.",
      "Confusing printed page numbers in a book header with the file's absolute page index."
    ],
    limitations: [
      "Document-level bookmarks pointing to removed pages are stripped in the isolated split files."
    ],
    faq: [
      { question: "Can I split a PDF into separate files for every single page?", answer: "Yes. Simply select 'Split every page' to receive an organized ZIP package containing each page as an individual PDF." },
      { question: "How do custom page ranges work?", answer: "Enter ranges like '1-3, 5, 9-12'. Pdfyara will generate discrete documents for each range specified." },
      { question: "Is split processing secure?", answer: "All splitting runs 100% locally in your web browser. No document data is sent over the network." }
    ],
    relatedTools: ["extract-pages", "delete-pdf-pages", "organize-pdf", "merge-pdf"],
    relatedGuides: ["how-to-split-a-pdf", "how-to-extract-pdf-pages"]
  },

  // 3. COMPRESS PDF
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    category: "Compress",
    description: "Reduce PDF file size while maintaining optimal visual clarity for emailing and fast web sharing.",
    shortDesc: "Reduce PDF file size efficiently",
    icon: "Minimize2",
    route: "/tools/compress-pdf",
    seoTitle: "Compress PDF Online Free — Reduce PDF File Size | Pdfyara",
    seoDescription: "Compress large PDF documents without compromising readability. Choose from balanced presets to shrink files for email and web upload.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Popular",
    intro: "High-resolution scans and graphic-rich documents frequently exceed email attachment limits and portal upload caps. Pdfyara's Compress PDF tool balances visual sharpness with file weight by re-encoding embedded bitmaps, removing redundant metadata, and optimizing stream compression.",
    howToUse: [
      { title: "Upload PDF", desc: "Drop your oversized PDF file into the compression engine." },
      { title: "Select Compression Level", desc: "Pick between Maximum Compression (smallest size), Balanced (recommended for most documents), or High Quality." },
      { title: "Review Size Estimation", desc: "Compare original file size against the optimized output preview." },
      { title: "Download Compressed PDF", desc: "Save the reduced document directly to your device." }
    ],
    howItWorks: "Pdfyara parses internal PDF stream structures, downsamples high-DPI raster images to screen-friendly resolutions (e.g., 150 DPI or 96 DPI), applies Flate compression algorithms, and purges unreferenced objects and duplicate font subsets.",
    optionsExplained: [
      { name: "Maximum Compression", desc: "Aggressive image downsampling and metadata stripping. Ideal for text-heavy documents with strict upload limits." },
      { name: "Balanced (Recommended)", desc: "Optimal balance between crisp visual reading quality and substantial file size reduction." },
      { name: "Low Compression / High Quality", desc: "Gentle stream optimization preserving high-fidelity photography and vector details." }
    ],
    useCases: [
      { title: "Email Attachments", desc: "Shrink multi-megabyte PDFs below typical 10MB or 25MB mail server thresholds." },
      { title: "Government & Job Portals", desc: "Comply with strict 2MB or 5MB file upload limits for passport, tax, or job applications." },
      { title: "Web Performance", desc: "Optimize PDFs embedded on websites for faster mobile loading times." }
    ],
    bestPractices: [
      "Test 'Balanced' first to evaluate text clarity before selecting 'Maximum Compression'.",
      "Remember that purely vector PDFs (text + shapes) are already tiny; compression yields the biggest drops on scanned photos.",
      "Check font legibility on zoom after compressing scanned contracts."
    ],
    commonMistakes: [
      "Expecting a PDF consisting entirely of text to shrink by 90% when it is already only 50KB.",
      "Compressing an already heavily compressed low-res file multiple times."
    ],
    limitations: [
      "Documents containing only vector lines and pure text have less room for raster downsampling.",
      "Actual size reduction depends directly on the ratio of high-resolution images in the source file."
    ],
    faq: [
      { question: "Will compressing my PDF make the text blurry?", answer: "No. Vector text remains mathematically sharp at any zoom level. Only embedded bitmap images are re-sampled according to your chosen preset." },
      { question: "Is there a file size limit?", answer: "Pdfyara supports documents up to 100MB directly in your browser." },
      { question: "Are my files safe?", answer: "Compression executes right inside your browser session. Your documents are never stored or seen by anyone." }
    ],
    relatedTools: ["pdf-analyzer", "grayscale-pdf", "resize-pdf", "merge-pdf"],
    relatedGuides: ["how-to-compress-a-pdf", "how-to-reduce-pdf-size"]
  },

  // 4. PDF EDITOR (FLAGSHIP)
  {
    slug: "edit-pdf",
    name: "Free PDF Editor",
    category: "Edit & Sign",
    description: "The complete 100% Free PDF Editor: edit text, add shapes, signatures, annotations, and stamps directly in your browser without watermarks.",
    shortDesc: "Free visual PDF editor with text, drawing & stamps",
    icon: "Edit3",
    route: "/editor",
    seoTitle: "Free PDF Editor Online — Edit PDF Text, Annotate & Sign PDF Free | Pdfyara",
    seoDescription: "100% Free Online PDF Editor. Edit original PDF text with exact font matching, add annotations, shapes, draw freehand, highlight, stamp, and electronically sign documents without watermarks.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Popular",
    intro: "Pdfyara's flagship PDF Editor gives you a visual studio workspace to annotate, enhance, and mark up documents. Add text annotations, insert images, highlight crucial clauses, draw freehand diagrams, place customizable stamps, and sign contracts without needing desktop software.",
    howToUse: [
      { title: "Open in Editor", desc: "Upload a PDF or select an existing document to open the visual canvas." },
      { title: "Select a Tool", desc: "Choose from Text, Highlight, Freehand Pen, Shapes, Notes, Stamp, or Signature in the left toolbar." },
      { title: "Customize Properties", desc: "Adjust font size, color, opacity, stroke thickness, or fill in the right properties inspector." },
      { title: "Save & Download", desc: "Export your annotated document as a pristine, standard-compliant PDF." }
    ],
    howItWorks: "The editor renders PDF pages onto an interactive canvas overlay. User annotations (text blocks, vector paths, images, and digital signatures) are mathematically positioned and baked into the PDF's content stream upon export.",
    optionsExplained: [
      { name: "Text Tool", desc: "Adds custom typographic overlays with selectable font sizes, colors, and weights." },
      { name: "Highlighter", desc: "Semi-transparent vector marker for emphasizing key text passages." },
      { name: "Pen & Drawing", desc: "Freehand vector sketching with adjustable stroke width and smoothing." },
      { name: "Stamps", desc: "Pre-designed business stamps like APPROVED, CONFIDENTIAL, DRAFT, and SIGN HERE." },
      { name: "Digital Signature", desc: "Draw your signature on screen, type with calligraphic styling, or upload an image." }
    ],
    useCases: [
      { title: "Contract Review & Markup", desc: "Highlight contract stipulations and insert sticky notes for team feedback." },
      { title: "Grading & Feedback", desc: "Educators can mark up student essays with red ink, stamps, and margin notes." },
      { title: "Form Annotation", desc: "Fill out non-interactive PDF forms by placing text fields and checkboxes directly over the lines." }
    ],
    bestPractices: [
      "Use zoom controls to accurately position text over form lines.",
      "Group annotations logically and use high-contrast text colors for readability.",
      "Note: visual overlay editing adds layers onto the PDF canvas without altering underlying pre-baked rasterized text."
    ],
    commonMistakes: [
      "Assuming text overlays will reflow underlying baked paragraphs like a word processor.",
      "Placing light yellow text on white document backgrounds."
    ],
    limitations: [
      "In standard PDF specifications, adding annotations creates visual overlays; it does not reflow locked third-party typography."
    ],
    faq: [
      { question: "Does this editor modify original text or add overlays?", answer: "Pdfyara provides professional visual annotation overlays (text, shapes, stamps, drawings, signatures) accurately baked into the PDF stream. For privacy and standard compliance, underlying locked vector streams are preserved." },
      { question: "Can I sign documents in the editor?", answer: "Yes! You can draw, type, or upload your signature and position it anywhere on any page." },
      { question: "Can I manage pages while editing?", answer: "Yes, the bottom thumbnail drawer lets you reorder, rotate, duplicate, or delete pages on the fly." }
    ],
    relatedTools: ["fill-sign-pdf", "annotate-pdf", "watermark-pdf", "organize-pdf"],
    relatedGuides: ["how-to-edit-a-pdf", "how-to-sign-a-pdf"]
  },

  // 5. ORGANIZE PDF
  {
    slug: "organize-pdf",
    name: "Organize PDF",
    category: "Page Management",
    description: "Visually reorder, rotate, duplicate, and delete pages with an intuitive thumbnail workspace.",
    shortDesc: "Reorder, rotate & rearrange pages visually",
    icon: "LayoutGrid",
    route: "/tools/organize-pdf",
    seoTitle: "Organize PDF Pages Online Free — Rearrange & Rotate | Pdfyara",
    seoDescription: "Visually rearrange, sort, duplicate, delete, and rotate PDF pages in an interactive thumbnail board. Fast, private, and client-side.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "When documents are assembled from multiple scans or exported in the wrong order, Pdfyara's Organize PDF visual workspace allows you to effortlessly drag and drop pages into the correct sequence, rotate upside-down sheets, duplicate key pages, and delete unnecessary blanks.",
    howToUse: [
      { title: "Upload PDF", desc: "Load your document to view high-resolution page thumbnails." },
      { title: "Drag to Rearrange", desc: "Click and drag any page thumbnail to move it to a new position in the sequence." },
      { title: "Rotate or Remove", desc: "Use hover action buttons on any thumbnail to rotate 90°, duplicate, or delete it." },
      { title: "Save New Order", desc: "Click 'Save & Download' to export your perfectly organized PDF." }
    ],
    howItWorks: "Pdfyara dynamically renders visual previews of each page using HTML5 Canvas and constructs a revised page dictionary matching your visual sequence when you save.",
    useCases: [
      { title: "Fix Scanned Books", desc: "Reorder misordered pages from auto-document feeder scans." },
      { title: "Orientation Correction", desc: "Rotate landscape charts and upside-down pages to uniform portrait view." },
      { title: "Pruning Drafts", desc: "Remove blank pages, divider sheets, or confidential appendices before publishing." }
    ],
    bestPractices: [
      "Use thumbnail zoom controls to inspect small text before deleting a page.",
      "Check the first and last page to verify overall document completeness."
    ],
    commonMistakes: [
      "Deleting a page without checking if it contains an essential index or footnote."
    ],
    limitations: [
      "Very large documents (500+ pages) may take a few seconds to render all visual thumbnails in browser memory."
    ],
    faq: [
      { question: "Can I rotate individual pages without rotating the whole document?", answer: "Yes! Each page thumbnail has independent 90° clockwise and counter-clockwise rotation controls." },
      { question: "Is my original file modified?", answer: "No, your local file remains untouched. Pdfyara generates a fresh download containing your reorganized structure." }
    ],
    relatedTools: ["merge-pdf", "split-pdf", "rotate-pdf", "delete-pdf-pages"],
    relatedGuides: ["how-to-organize-pdf-pages", "how-to-split-a-pdf"]
  },

  // 6. FILL & SIGN PDF
  {
    slug: "fill-sign-pdf",
    name: "Fill & Sign PDF",
    category: "Edit & Sign",
    description: "Complete forms, insert checkmarks, dates, and sign documents with drawn or typed electronic signatures.",
    shortDesc: "Complete forms & add electronic signatures",
    icon: "FileSignature",
    route: "/tools/fill-sign-pdf",
    seoTitle: "Fill & Sign PDF Online Free — Electronic Signatures | Pdfyara",
    seoDescription: "Easily fill out PDF forms, add text fields, checkboxes, dates, and apply your electronic signature. Free, secure, and processed in your browser.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Popular",
    intro: "Signing and filling out documents shouldn't require printing, pen-signing, and scanning. Pdfyara's Fill & Sign tool enables you to complete application forms, contracts, waivers, and leases directly on your screen with custom signatures, date stamps, and checkmarks.",
    howToUse: [
      { title: "Upload Document", desc: "Load the PDF form or contract you need to sign." },
      { title: "Add Text & Details", desc: "Click anywhere on the document to type answers, insert dates, or place checkmarks." },
      { title: "Create Signature", desc: "Draw your signature with a mouse/touchscreen, type with a stylized script font, or upload a signature image." },
      { title: "Position & Download", desc: "Resize and place your signature on the signature line, then download the finalized PDF." }
    ],
    howItWorks: "The tool overlays your electronic signature vectors and form responses onto the exact coordinate system of your PDF, encoding standard raster or vector appearance streams into the resulting PDF document.",
    useCases: [
      { title: "Employment Contracts & NDAs", desc: "Sign offer letters, confidentiality agreements, and contractor agreements swiftly." },
      { title: "Rental & Lease Agreements", desc: "Fill out tenant information and sign lease documents without printing." },
      { title: "Permission Slips & Waivers", desc: "Parents and participants can sign school forms and event liability waivers from mobile phones." }
    ],
    bestPractices: [
      "Use the 'Draw' signature tab on a mobile device or tablet for the most natural handwritten look.",
      "Double check all required date and initials fields before finalizing.",
      "Keep a copy of your downloaded signed PDF in a secure folder."
    ],
    commonMistakes: [
      "Leaving required form fields blank before downloading."
    ],
    limitations: [
      "Electronic signing functionality does not determine whether a signature satisfies the specific legal requirements of a particular document, court, or jurisdiction."
    ],
    faq: [
      { question: "Is this signature legally binding?", answer: "In many jurisdictions, electronic signatures are legally recognized for general business contracts (such as under the ESIGN Act and eIDAS). However, some official government or real estate deeds may require qualified digital certificates or wet ink." },
      { question: "Can I save my signature for next time?", answer: "You can keep your signature ready during your browser session without storing sensitive biometric data on external servers." }
    ],
    relatedTools: ["edit-pdf", "annotate-pdf", "protect-pdf", "watermark-pdf"],
    relatedGuides: ["how-to-sign-a-pdf", "how-to-fill-a-pdf-form"]
  },

  // 7. WATERMARK PDF
  {
    slug: "watermark-pdf",
    name: "Watermark PDF",
    category: "Security",
    description: "Stamp custom text or image watermarks with controllable opacity, rotation, and page positioning.",
    shortDesc: "Add text or image watermarks to all pages",
    icon: "ShieldAlert",
    route: "/tools/watermark-pdf",
    seoTitle: "Watermark PDF Online Free — Add Text & Image Stamps | Pdfyara",
    seoDescription: "Protect and brand your PDF documents with custom watermarks. Add CONFIDENTIAL, DRAFT, logos, opacity, angle, and page ranges.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Watermarking is essential for document security, copyright protection, and workflow categorization. Pdfyara allows you to apply customizable text watermarks (like CONFIDENTIAL, DRAFT, SAMPLE) or corporate logo images across your PDF pages with exact opacity, angle, and positioning.",
    howToUse: [
      { title: "Upload PDF", desc: "Select the PDF file you wish to watermark." },
      { title: "Choose Watermark Type", desc: "Select Text Watermark or Image Watermark (PNG/JPG)." },
      { title: "Adjust Appearance", desc: "Set text content, font size, color, opacity (transparency), rotation angle, and position (Center, Diagonal, Top, Bottom)." },
      { title: "Apply & Download", desc: "Process all pages or select specific pages, then download your protected PDF." }
    ],
    howItWorks: "Pdfyara calculates coordinate matrices and injects transparent vector or image XObjects into each page's content stream, ensuring the watermark appears consistently across desktop and mobile readers.",
    optionsExplained: [
      { name: "Preset Labels", desc: "Instant one-click presets for CONFIDENTIAL, DRAFT, SAMPLE, INTERNAL USE, and DO NOT COPY." },
      { name: "Opacity Slider", desc: "Adjust transparency from 10% to 100% so watermarks do not obscure underlying text." },
      { name: "Rotation", desc: "Rotate text diagonally (45°), horizontally (0°), or vertically (90°)." }
    ],
    useCases: [
      { title: "Draft Manuscripts", desc: "Mark preliminary documents with 'DRAFT - NOT FOR DISTRIBUTION'." },
      { title: "Sample Invoices & Portfolios", desc: "Overlay 'SAMPLE' across design proofs and demo invoices sent to prospective clients." },
      { title: "Brand Identity", desc: "Embed your company's transparent PNG logo in the bottom corner of sales presentations." }
    ],
    bestPractices: [
      "Keep opacity between 15% and 30% so underlying document text remains easy to read.",
      "Use 45° diagonal placement for maximum protection against unauthorized document copying."
    ],
    commonMistakes: [
      "Setting 100% opacity with solid dark colors, making underlying text illegible."
    ],
    limitations: [
      "Watermarks discourage visual copying but do not encrypt or password-lock the underlying file."
    ],
    faq: [
      { question: "Can watermarks be removed easily?", answer: "Watermarks baked into the PDF content stream become permanent graphics. However, for maximum security, combine watermarking with PDF Protection." },
      { question: "Can I use my company logo as a watermark?", answer: "Yes! Switch to the 'Image Watermark' tab and upload your transparent PNG or JPG logo." }
    ],
    relatedTools: ["protect-pdf", "page-numbers", "header-footer", "flatten-pdf"],
    relatedGuides: ["how-to-add-a-watermark", "how-to-protect-a-pdf"]
  },

  // 8. PAGE NUMBERS
  {
    slug: "page-numbers",
    name: "Page Numbers",
    category: "Page Management",
    description: "Insert customizable page numbering with prefixes, starting numbers, and position controls.",
    shortDesc: "Add custom page numbers to headers or footers",
    icon: "Hash",
    route: "/tools/page-numbers",
    seoTitle: "Add Page Numbers to PDF Online Free | Pdfyara",
    seoDescription: "Insert custom page numbers, prefixes (Page X of Y), formatting, fonts, and positions into your PDF documents quickly in your browser.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Professional reports, academic papers, and legal filings require consistent page numbering. Pdfyara's Page Numbers tool lets you insert clean numbering into headers or footers with customizable format strings (e.g. 'Page {n} of {total}', '{n}', or 'Ex. {n}'), font choices, and first-page skip rules.",
    howToUse: [
      { title: "Upload PDF", desc: "Select the document you want to number." },
      { title: "Select Position", desc: "Pick from 6 standard positions: Top Left, Top Center, Top Right, Bottom Left, Bottom Center, or Bottom Right." },
      { title: "Configure Format", desc: "Choose formatting (e.g. '1', 'Page 1 of 10'), font size, starting number, and whether to skip the cover page." },
      { title: "Apply & Download", desc: "Generate and download your numbered PDF instantly." }
    ],
    howItWorks: "The tool calculates margin offsets, computes page totals, and writes font glyphs directly to the content stream of each target page.",
    useCases: [
      { title: "Academic Theses & Essays", desc: "Number manuscript pages according to APA, MLA, or Chicago formatting guidelines." },
      { title: "Executive Binders", desc: "Ensure combined multi-document reports have unified, unbroken sequential numbering." },
      { title: "Legal Briefs", desc: "Add standard footer indices for easy reference during court proceedings." }
    ],
    bestPractices: [
      "Select 'Skip First Page' if your PDF has a title cover page.",
      "Use 'Page X of Y' for long proposals so readers know the full extent of the document."
    ],
    commonMistakes: [
      "Placing page numbers too close to the page edge where home printers might clip them off."
    ],
    limitations: [
      "If the PDF has existing hardcoded page numbers printed on the source scan, new numbers will be overlaid."
    ],
    faq: [
      { question: "Can I start numbering from a number other than 1?", answer: "Yes! You can specify any starting integer (e.g., start at page 5 for a document following an unnumbered preface)." },
      { question: "Can I skip the cover page?", answer: "Yes, check the 'Skip First Page' option to leave page 1 unnumbered and start numbering from page 2." }
    ],
    relatedTools: ["bates-numbering", "header-footer", "organize-pdf", "watermark-pdf"],
    relatedGuides: ["how-to-add-page-numbers", "how-to-organize-pdf-pages"]
  },

  // 9. ROTATE PDF
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    category: "Page Management",
    description: "Rotate PDF pages 90, 180, or 270 degrees clockwise or counter-clockwise permanently.",
    shortDesc: "Permanently rotate all or selected pages",
    icon: "RotateCw",
    route: "/tools/rotate-pdf",
    seoTitle: "Rotate PDF Online Free — 90°, 180°, 270° Orientation | Pdfyara",
    seoDescription: "Permanently rotate PDF pages clockwise or counter-clockwise. Fix upside down scans and landscape charts online for free.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Upside down or sideways scans can ruin an otherwise professional presentation. Pdfyara's Rotate PDF tool lets you permanently correct the rotation of individual pages or all pages simultaneously with 90°, 180°, and 270° angles.",
    howToUse: [
      { title: "Upload PDF", desc: "Select your PDF file to load page orientations." },
      { title: "Select Rotation Angle", desc: "Rotate 90° clockwise, 90° counter-clockwise, or 180° upside-down." },
      { title: "Choose Scope", desc: "Apply rotation to all pages, only odd pages, only even pages, or specific custom pages." },
      { title: "Download", desc: "Save the corrected PDF directly to your device." }
    ],
    howItWorks: "PDF pages contain a `/Rotate` attribute in their internal dictionary. Pdfyara updates this metadata vector permanently without lossy re-encoding of page contents.",
    useCases: [
      { title: "Fix Scanned Receipts", desc: "Turn upside down mobile scans upright." },
      { title: "Landscape Presentations", desc: "Rotate wide spreadsheet printouts into standard landscape reading view." }
    ],
    bestPractices: [
      "Use thumbnail previews to verify orientation across all pages before saving."
    ],
    commonMistakes: [
      "Rotating all pages when only one landscape chart needed adjustment."
    ],
    limitations: [
      "Rotating the viewing angle does not change the physical bounding box dimensions if a PDF viewer ignores dictionary rotation tags (rare)."
    ],
    faq: [
      { question: "Is this rotation permanent?", answer: "Yes! When you download the rotated file, the rotation is saved permanently into the PDF structure." },
      { question: "Can I rotate only landscape pages?", answer: "Yes, you can target specific pages or use the visual thumbnail selector." }
    ],
    relatedTools: ["flip-pdf", "organize-pdf", "crop-pdf", "resize-pdf"],
    relatedGuides: ["how-to-organize-pdf-pages"]
  },

  // 10. PROTECT PDF
  {
    slug: "protect-pdf",
    name: "Protect PDF",
    category: "Security",
    description: "Encrypt your PDF document with a secure password and configure permission restrictions.",
    shortDesc: "Encrypt PDF with password & permissions",
    icon: "Lock",
    route: "/tools/protect-pdf",
    seoTitle: "Protect PDF Online Free — Encrypt with Password | Pdfyara",
    seoDescription: "Set a strong password to lock and encrypt your sensitive PDF documents. Prevent unauthorized opening, copying, or printing.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Secure",
    intro: "Confidential financial statements, medical records, and legal agreements should never be transmitted unprotected. Pdfyara's Protect PDF tool lets you encrypt your PDF files with standard password encryption directly in your browser.",
    howToUse: [
      { title: "Upload Document", desc: "Select the PDF file you wish to encrypt." },
      { title: "Enter Password", desc: "Type a strong password and re-enter it to confirm." },
      { title: "Set Permissions", desc: "Optionally restrict printing, copying text, or modifying content." },
      { title: "Encrypt & Download", desc: "Download your protected PDF file." }
    ],
    howItWorks: "Pdfyara uses cryptographic algorithms to encrypt internal PDF object streams with your chosen passphrase so standard PDF viewers will require authentication to unlock.",
    useCases: [
      { title: "Financial & Tax Returns", desc: "Protect tax filings before emailing them to banks or accountants." },
      { title: "Employee Payroll & HR", desc: "Encrypt pay stubs and employee contracts sent to staff." },
      { title: "Confidential IP", desc: "Guard proprietary formulas, blueprints, and business plans." }
    ],
    bestPractices: [
      "Use a password with at least 8 characters, mixing uppercase, lowercase, numbers, and symbols.",
      "Store your password in a safe password manager; lost passwords cannot be retrieved without the key."
    ],
    commonMistakes: [
      "Using easily guessable passwords like '123456' or 'password'."
    ],
    limitations: [
      "Standard PDF encryption secures the document stream. If you forget your password, there is no master reset backdoor."
    ],
    faq: [
      { question: "Is my password sent to your server?", answer: "No. Encryption takes place locally inside your browser. Pdfyara never sees or stores your password or document." },
      { question: "Can anyone open the protected PDF without the password?", answer: "No. Standard PDF readers will prompt for the password before rendering any content." }
    ],
    relatedTools: ["unlock-pdf", "redact-pdf", "watermark-pdf"],
    relatedGuides: ["how-to-protect-a-pdf", "how-to-redact-a-pdf"]
  },

  // 11. UNLOCK PDF
  {
    slug: "unlock-pdf",
    name: "Unlock PDF",
    category: "Security",
    description: "Remove password protection from authorized PDFs so you can view, edit, and print without prompts.",
    shortDesc: "Remove password from authorized PDFs",
    icon: "Unlock",
    route: "/tools/unlock-pdf",
    seoTitle: "Unlock PDF Online Free — Remove Password from Authorized PDF | Pdfyara",
    seoDescription: "Remove password security from your authorized PDF files for unrestricted printing and editing. 100% private in-browser decryption.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Secure",
    intro: "Entering a password every time you open a recurring bank statement or manual can be inconvenient once the document is archived in a secure local vault. Pdfyara's Unlock PDF tool decrypts authorized PDFs when you provide the password, saving an unrestricted version.",
    howToUse: [
      { title: "Upload Locked PDF", desc: "Select your password-protected PDF document." },
      { title: "Enter Password", desc: "Input the known password to authorize decryption." },
      { title: "Decrypt Document", desc: "Click 'Unlock PDF' to strip the password wrapper." },
      { title: "Download Free Copy", desc: "Download the unencrypted PDF for unrestricted viewing." }
    ],
    howItWorks: "Pdfyara uses the provided credential to authenticate with the PDF crypto stream, unpacks the content objects, and writes a standard unencrypted document catalog.",
    useCases: [
      { title: "Archiving Monthly Statements", desc: "Remove passwords from bank statements before adding them to an encrypted offline archive." },
      { title: "Batch Printing", desc: "Unlock documents to enable automated printing without password popups." }
    ],
    bestPractices: [
      "Only remove passwords on trusted, personal devices.",
      "Ensure you keep an encrypted backup if the document contains sensitive personal information."
    ],
    commonMistakes: [
      "Attempting to unlock a document without knowing the authorization password."
    ],
    limitations: [
      "Pdfyara strictly supports authorized unlocking; it does not perform brute-force password cracking or unauthorized security bypass."
    ],
    faq: [
      { question: "Can Pdfyara crack a password I forgot?", answer: "No. Pdfyara does not provide password cracking or bypass tools. You must know the valid password to decrypt the file." },
      { question: "Is this secure?", answer: "Decryption happens entirely within your local browser sandbox. No credentials or files are transmitted." }
    ],
    relatedTools: ["protect-pdf", "redact-pdf", "flatten-pdf"],
    relatedGuides: ["how-to-protect-a-pdf"]
  },

  // 12. JPG TO PDF
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    category: "Convert To PDF",
    description: "Convert multiple JPG images into a single clean PDF with customizable page sizes and margins.",
    shortDesc: "Convert JPG photos into a unified PDF document",
    icon: "Image",
    route: "/tools/jpg-to-pdf",
    seoTitle: "JPG to PDF Online Free — Convert Images to PDF | Pdfyara",
    seoDescription: "Convert JPG and JPEG images to high-quality PDF documents. Reorder pictures, choose page sizes (A4, Letter), margins, and orientation.",
    processingMode: "browser",
    supportedFormats: ["JPG", "JPEG", "PNG", "WEBP"],
    badge: "Popular",
    intro: "Photos of whiteboard notes, paper receipts, or design mockups are often easier to read and distribute when bound together into a clean PDF. Pdfyara's JPG to PDF converter lets you turn single or multiple images into a professional PDF with customized page sizes, margins, and orientations.",
    howToUse: [
      { title: "Upload Images", desc: "Select or drag JPG images from your phone or computer." },
      { title: "Reorder Photos", desc: "Drag image cards to set the desired sequence." },
      { title: "Select Layout Options", desc: "Choose Page Size (A4, Letter, Fit to Image), Orientation (Portrait/Landscape), and Margins (None, Small, Big)." },
      { title: "Convert & Download", desc: "Generate your high-fidelity PDF instantly." }
    ],
    howItWorks: "Pdfyara reads the image pixel data and embeds the compressed image streams directly into PDF page dictionaries without lossy re-encoding where possible.",
    optionsExplained: [
      { name: "Page Sizes", desc: "Standard A4, US Letter, A3, A5, or 'Fit to Image' (page sized exactly to photo dimensions)." },
      { name: "Margins", desc: "Add elegant white borders around photos or choose zero margin for borderless full-bleed pages." }
    ],
    useCases: [
      { title: "Receipt & Document Scans", desc: "Combine smartphone camera snapshots of receipts into a single expense report PDF." },
      { title: "Art & Photography Portfolios", desc: "Create a downloadable PDF lookbook from high-resolution digital artwork." },
      { title: "ID Card & Certificate Uploads", desc: "Merge front and back ID photos onto a single A4 page for official portal submissions." }
    ],
    bestPractices: [
      "Select 'Fit to Image' if your photos have varied aspect ratios to avoid white letterboxing.",
      "Crop out surrounding desk space from your photos before converting."
    ],
    commonMistakes: [
      "Converting very low-resolution thumbnails instead of original camera photos."
    ],
    limitations: [
      "Converting dozens of raw 50MB camera files may consume significant browser memory."
    ],
    faq: [
      { question: "Can I convert multiple JPGs into one PDF?", answer: "Yes! You can upload multiple images, rearrange them, and combine them into a single PDF." },
      { question: "Will my image quality be degraded?", answer: "No, Pdfyara preserves high image fidelity and allows you to configure exact page dimensions." }
    ],
    relatedTools: ["png-to-pdf", "pdf-to-jpg", "compress-pdf", "merge-pdf"],
    relatedGuides: ["how-to-convert-images-to-pdf", "how-to-convert-pdf-to-jpg"]
  },

  // 13. PNG TO PDF
  {
    slug: "png-to-pdf",
    name: "PNG to PDF",
    category: "Convert To PDF",
    description: "Convert PNG graphics and transparent artwork into crisp, high-resolution PDF documents.",
    shortDesc: "Turn PNG graphics into high-resolution PDFs",
    icon: "FileImage",
    route: "/tools/png-to-pdf",
    seoTitle: "PNG to PDF Online Free — High Quality Conversion | Pdfyara",
    seoDescription: "Convert PNG images into clean PDF documents. Preserve crisp vector-like graphics and transparent graphics locally in your browser.",
    processingMode: "browser",
    supportedFormats: ["PNG", "JPG", "WEBP"],
    badge: "Essential",
    intro: "PNG images excel at preserving sharp text, screenshots, charts, and digital illustrations. Pdfyara's PNG to PDF tool binds PNG graphics into clean, standard PDF documents with full control over margins and page layouts.",
    howToUse: [
      { title: "Upload PNGs", desc: "Select one or more PNG files to convert." },
      { title: "Configure Page Setup", desc: "Choose your preferred sheet format (A4, Letter, Fit to Image) and margin spacing." },
      { title: "Generate PDF", desc: "Download the converted PDF file immediately." }
    ],
    howItWorks: "The converter encapsulates PNG raster channels and transparency alphas into standard PDF image XObjects.",
    useCases: [
      { title: "Digital Mockups & Wireframes", desc: "Compile UI design artboards into a shareable client presentation." },
      { title: "Infographics & Charts", desc: "Convert analytics charts and diagrams into printable PDF reports." }
    ],
    bestPractices: [
      "Ensure PNGs have sufficient resolution (at least 150-300 DPI) for crisp printing."
    ],
    commonMistakes: [
      "Uploading huge uncompressed screenshots without checking final file size."
    ],
    limitations: [
      "Transparent PNG backgrounds will render over standard white PDF canvas pages."
    ],
    faq: [
      { question: "Are PNG transparent backgrounds preserved?", answer: "The PDF canvas renders a clean white page behind transparent PNG elements." }
    ],
    relatedTools: ["jpg-to-pdf", "pdf-to-png", "pdf-to-jpg"],
    relatedGuides: ["how-to-convert-images-to-pdf"]
  },

  // 14. PDF TO JPG
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    category: "Convert From PDF",
    description: "Extract PDF pages into high-resolution JPG images. Download individually or as an organized ZIP package.",
    shortDesc: "Convert PDF pages into high-quality JPG photos",
    icon: "ImageDown",
    route: "/tools/pdf-to-jpg",
    seoTitle: "PDF to JPG Online Free — Convert PDF to Images | Pdfyara",
    seoDescription: "Convert PDF pages to high-resolution JPG images. Select resolution, extract single pages or all pages, and download as a ZIP file.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Popular",
    intro: "Converting PDF pages into JPG images is ideal for embedding document previews on websites, sharing slides on social media, or inserting pages into Word and PowerPoint presentations. Pdfyara's PDF to JPG tool renders each page into a crisp image with adjustable resolution.",
    howToUse: [
      { title: "Upload PDF", desc: "Select the PDF file you want to turn into images." },
      { title: "Select Resolution & Pages", desc: "Choose between Standard (150 DPI) or High (300 DPI) quality, and pick all or selected pages." },
      { title: "Render & Download", desc: "Download individual page images or grab all pages in an organized ZIP archive." }
    ],
    howItWorks: "Pdfyara utilizes client-side Canvas rasterization to render vector glyphs, embedded fonts, and raster objects at high pixel density into standard JPEG data blobs.",
    optionsExplained: [
      { name: "Standard (150 DPI)", desc: "Fast rendering and compact image file sizes, perfect for web sharing." },
      { name: "High Resolution (300 DPI)", desc: "Maximum sharpness and fine detail preservation, ideal for printing or high-DPI displays." }
    ],
    useCases: [
      { title: "Presentation Slides", desc: "Extract slide pages to insert directly into Keynote or PowerPoint." },
      { title: "Web Publishing", desc: "Turn PDF flyers and announcements into shareable social media images." },
      { title: "Document Previews", desc: "Generate thumbnail images of contracts and reports for website showcases." }
    ],
    bestPractices: [
      "Use 300 DPI if the original PDF contains small font sizes or detailed technical blueprints.",
      "Use the ZIP download option when converting documents with 5 or more pages."
    ],
    commonMistakes: [
      "Expecting vector SVG infinite scaling from a rasterized JPG file."
    ],
    limitations: [
      "Converting hundreds of pages at 300 DPI simultaneously requires sufficient browser RAM."
    ],
    faq: [
      { question: "How do I download all pages at once?", answer: "Pdfyara provides a single 'Download All as ZIP' button that packages every converted page into a neat archive." },
      { question: "Is the text still selectable in JPG format?", answer: "No, JPG is a raster image format. To keep text selectable, use Pdfyara's PDF to Text or OCR tools." }
    ],
    relatedTools: ["pdf-to-png", "jpg-to-pdf", "extract-images", "pdf-to-text"],
    relatedGuides: ["how-to-convert-pdf-to-jpg", "how-to-extract-pdf-pages"]
  },

  // 15. PDF TO PNG
  {
    slug: "pdf-to-png",
    name: "PDF to PNG",
    category: "Convert From PDF",
    description: "Convert PDF pages into lossless PNG images with razor-sharp text and graphic fidelity.",
    shortDesc: "Render PDF pages into lossless PNG graphics",
    icon: "ImagePlus",
    route: "/tools/pdf-to-png",
    seoTitle: "PDF to PNG Online Free — Lossless Image Conversion | Pdfyara",
    seoDescription: "Export PDF pages into lossless PNG images. Ideal for sharp text, charts, diagrams, and digital publishing. 100% private in-browser tool.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "When you need lossless visual fidelity without compression artifacts, converting PDF pages to PNG is the gold standard. Pdfyara renders your PDF pages into sharp PNG graphics ideal for detailed diagrams, CAD blueprints, and high-contrast typography.",
    howToUse: [
      { title: "Upload PDF", desc: "Select the PDF file you wish to render." },
      { title: "Choose Quality & Resolution", desc: "Select target DPI and specify page ranges." },
      { title: "Download PNGs", desc: "Download individual PNG files or a bundled ZIP archive." }
    ],
    howItWorks: "The engine uses HTML5 2D Canvas rendering with sub-pixel anti-aliasing to export high-definition PNG bit streams.",
    useCases: [
      { title: "Technical Schematics", desc: "Preserve fine hairline diagrams and engineering schematics without JPEG blur." },
      { title: "UI & Typography Review", desc: "Export crisp screenshots of document layouts for design analysis." }
    ],
    bestPractices: [
      "Use PNG for line art, text, and vector diagrams where JPEG compression noise would be noticeable."
    ],
    commonMistakes: [
      "Using PNG for multi-megabyte photographic catalogs where JPG would yield a much smaller file."
    ],
    limitations: [
      "PNG files can be larger in byte size than JPGs because PNG uses lossless compression."
    ],
    faq: [
      { question: "Why choose PNG over JPG?", answer: "PNG uses lossless compression, meaning text edges, charts, and sharp lines stay perfectly crisp without compression artifacts." }
    ],
    relatedTools: ["pdf-to-jpg", "png-to-pdf", "extract-images"],
    relatedGuides: ["how-to-convert-pdf-to-jpg"]
  },

  // 16. PDF TO TEXT
  {
    slug: "pdf-to-text",
    name: "PDF to Text",
    category: "Convert From PDF",
    description: "Extract all text content from your PDF document. View word counts and copy or download as TXT.",
    shortDesc: "Extract all selectable text and word counts",
    icon: "FileText",
    route: "/tools/pdf-to-text",
    seoTitle: "PDF to Text Online Free — Extract Text from PDF | Pdfyara",
    seoDescription: "Extract text from PDF documents instantly. Get word count, character count, copy to clipboard, or download as a TXT file locally.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Need to grab quotes, pull data into a spreadsheet, or analyze the vocabulary of a PDF document? Pdfyara's PDF to Text tool extracts all native selectable text streams from your PDF, calculates comprehensive word and character statistics, and lets you copy or download the plain text file.",
    howToUse: [
      { title: "Upload PDF", desc: "Select any PDF containing selectable text." },
      { title: "View Extracted Text", desc: "Inspect the parsed text in the interactive viewer." },
      { title: "Copy or Download", desc: "Click 'Copy to Clipboard' or download a `.txt` file." }
    ],
    howItWorks: "Pdfyara parses the PDF character encoding tables and text showing operators (`Tj`, `TJ`) to reconstruct words and line breaks in reading order.",
    useCases: [
      { title: "Content Repurposing", desc: "Extract text from whitepapers and eBooks for blog posts or social summaries." },
      { title: "Data Analysis", desc: "Feed clean document text into natural language processing tools or spreadsheets." },
      { title: "Accessibility Reading", desc: "Convert complex multi-column PDFs into clean linear text for screen readers." }
    ],
    bestPractices: [
      "For scanned paper PDFs containing photos of text, use Pdfyara's OCR PDF tool instead."
    ],
    commonMistakes: [
      "Attempting to extract text from a scanned bitmap image without using OCR."
    ],
    limitations: [
      "Complex multi-column layouts or tables may extract in linear stream order."
    ],
    faq: [
      { question: "Why is the extracted text blank?", answer: "If the PDF is a scanned document (consisting of photos of paper), the text is not stored as digital characters. Use Pdfyara's OCR tool to recognize scanned text." }
    ],
    relatedTools: ["ocr-pdf", "pdf-word-counter", "pdf-analyzer", "pdf-to-word"],
    relatedGuides: ["how-to-make-a-pdf-searchable", "how-ocr-works"]
  },

  // 17. OCR PDF
  {
    slug: "ocr-pdf",
    name: "OCR PDF",
    category: "OCR & Scanning",
    description: "Perform Optical Character Recognition on scanned PDFs and images to extract readable, searchable text.",
    shortDesc: "Recognize text in scanned PDFs with client OCR",
    icon: "ScanText",
    route: "/tools/ocr-pdf",
    seoTitle: "OCR PDF Online Free — Optical Character Recognition | Pdfyara",
    seoDescription: "Extract text from scanned PDF documents and images with browser-based OCR. Turn image scans into copyable, searchable text.",
    processingMode: "browser",
    supportedFormats: ["PDF", "JPG", "PNG"],
    badge: "Popular",
    intro: "Scanned documents and smartphone photos of physical paperwork are often locked in image formats where text cannot be searched or copied. Pdfyara's OCR (Optical Character Recognition) engine processes scanned pages directly on your device, identifying character shapes and converting them into real digital text.",
    howToUse: [
      { title: "Upload Scanned Document", desc: "Select your scanned PDF or photo." },
      { title: "Select Language", desc: "Choose the document language (English, etc.) for high recognition accuracy." },
      { title: "Run OCR", desc: "Watch live character recognition progress as each page is parsed." },
      { title: "Copy or Download Text", desc: "Copy the extracted text or download it as a text file." }
    ],
    howItWorks: "Pdfyara runs a neural network OCR pipeline (Tesseract WebAssembly) directly in a dedicated browser Web Worker, inspecting contrast gradients, glyph features, and dictionary lookups.",
    useCases: [
      { title: "Digitizing Paper Invoices", desc: "Turn stacks of physical paper receipts into digital text records." },
      { title: "Archived Historical Records", desc: "Convert scanned library archives into searchable text databases." },
      { title: "Contract Extraction", desc: "Copy text clauses from faxed or photocopied agreements." }
    ],
    bestPractices: [
      "Ensure scans have good contrast and are straight for the highest OCR accuracy (use Deskew PDF if crooked).",
      "High scan resolutions (300 DPI) yield far superior recognition than blurry low-light photos."
    ],
    commonMistakes: [
      "Attempting OCR on severely blurry, dark, or distorted photographs."
    ],
    limitations: [
      "OCR accuracy depends directly on image clarity, handwriting legibility, and font styling; 100% accuracy cannot be guaranteed on low-grade scans."
    ],
    faq: [
      { question: "What languages are supported?", answer: "Pdfyara supports English and major global scripts, with neural dictionary models running directly on your machine." },
      { question: "Is my scanned document uploaded anywhere?", answer: "No. The neural OCR model runs locally inside your browser's Web Worker. Your documents stay completely private." }
    ],
    relatedTools: ["pdf-to-text", "deskew-pdf", "pdf-word-counter", "pdf-analyzer"],
    relatedGuides: ["how-ocr-works", "how-to-make-a-pdf-searchable"]
  },

  // 18. REDACT PDF
  {
    slug: "redact-pdf",
    name: "Redact PDF",
    category: "Security",
    description: "Permanently blackout sensitive information, social security numbers, and private data.",
    shortDesc: "Permanently blackout confidential information",
    icon: "EyeOff",
    route: "/tools/redact-pdf",
    seoTitle: "Redact PDF Online Free — Permanent Data Blackout | Pdfyara",
    seoDescription: "Permanently blackout confidential text, account numbers, and sensitive areas in PDF documents. True permanent redaction processed privately.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Secure",
    intro: "Covering sensitive information with a simple visual black box in basic viewers does not actually delete the underlying text, leaving sensitive data vulnerable to copy-pasting. Pdfyara's Redact PDF tool provides permanent redaction by permanently rasterizing and stripping underlying confidential streams.",
    howToUse: [
      { title: "Upload PDF", desc: "Load the confidential document into the redaction canvas." },
      { title: "Draw Redaction Boxes", desc: "Drag black redaction boxes over sensitive numbers, names, or addresses." },
      { title: "Apply Permanent Redaction", desc: "Click 'Apply Redaction' to permanently burn the redactions into the document." },
      { title: "Download Clean Document", desc: "Download the safe, sanitized PDF file." }
    ],
    howItWorks: "Pdfyara burns redaction blocks directly into the rendered page raster layer and removes underlying vector text objects within the bounding box, preventing data recovery through copy-paste.",
    useCases: [
      { title: "Legal Discovery", desc: "Sanitize confidential client information and trade secrets before producing evidence." },
      { title: "Medical Records", desc: "Remove HIPAA-protected health identifiers from research case studies." },
      { title: "Public Disclosure", desc: "Black out personal phone numbers, addresses, and SSNs from public government records." }
    ],
    bestPractices: [
      "Always inspect the downloaded redacted PDF by attempting to copy text in the redacted area to ensure no data leaked.",
      "Never use a simple highlighting tool with black ink as a substitute for permanent redaction."
    ],
    commonMistakes: [
      "Assuming a black rectangle drawn in a standard viewer prevents text selection underneath."
    ],
    limitations: [
      "Visual covering is not the same as permanent redaction. Pdfyara ensures permanent destruction of underlying data in redacted sectors."
    ],
    faq: [
      { question: "Can someone highlight and copy the redacted text?", answer: "No. Pdfyara permanently removes the text vectors beneath the redaction zones so the data cannot be retrieved." }
    ],
    relatedTools: ["protect-pdf", "edit-pdf", "flatten-pdf", "remove-annotations"],
    relatedGuides: ["how-to-redact-a-pdf", "how-to-protect-a-pdf"]
  },

  // 19. BATES NUMBERING
  {
    slug: "bates-numbering",
    name: "Bates Numbering",
    category: "Advanced PDF Tools",
    description: "Apply sequential Bates stamping (e.g. ABC-000001) for legal discovery and formal documentation.",
    shortDesc: "Sequential legal Bates stamping and indexing",
    icon: "Binary",
    route: "/tools/bates-numbering",
    seoTitle: "Bates Numbering Online Free — Legal PDF Stamping | Pdfyara",
    seoDescription: "Add sequential Bates numbers to legal documents, discovery bundles, and litigation files. Custom prefix, suffix, digit padding, and position.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Bates numbering (or Bates stamping) is the universal standard used by attorneys, law firms, and corporate legal departments to assign unique, sequential identification numbers to pages during litigation, discovery, and contract negotiations. Pdfyara provides a professional Bates stamping engine with prefix, suffix, digit padding, and position controls.",
    howToUse: [
      { title: "Upload Legal Bundle", desc: "Select the PDF file requiring Bates stamping." },
      { title: "Configure Bates Settings", desc: "Enter your Prefix (e.g. 'CONF-EXP'), Starting Number (e.g. 1), Digit Count (e.g. 6 digits = '000001'), and Suffix." },
      { title: "Position Stamp", desc: "Choose stamp location (Bottom Right is standard for legal filings) and font size." },
      { title: "Apply & Download", desc: "Generate your Bates-stamped document instantly." }
    ],
    howItWorks: "The Bates engine iterates through each page, calculating zero-padded sequential IDs and injecting standard fixed-pitch typographic elements into each page coordinate space.",
    useCases: [
      { title: "Litigation & Discovery", desc: "Index evidence exhibits (e.g. 'PLAINTIFF-000142') for easy courtroom citation." },
      { title: "Regulatory Compliance", desc: "Number corporate audit binders for regulatory inspection submissions." },
      { title: "Mergers & Acquisitions", desc: "Catalog data room documents during due diligence reviews." }
    ],
    bestPractices: [
      "Use at least 6 digits of padding (e.g. '000001') to allow for document expansion without breaking column alignments.",
      "Position Bates numbers in the bottom-right corner with adequate margin clearance."
    ],
    commonMistakes: [
      "Starting Bates numbering with insufficient zero-padding on large document sets."
    ],
    limitations: [
      "If the page already has dense footer graphics, consider placing the Bates stamp in the top-right header."
    ],
    faq: [
      { question: "What is Bates Numbering used for?", answer: "Bates numbering assigns a unique sequential code to every page in a legal or corporate document bundle so specific pages can be cited precisely during depositions and court filings." },
      { question: "Can I use custom prefixes like 'EXHIBIT-A-'?", answer: "Yes! You can specify any alphanumeric prefix and suffix." }
    ],
    relatedTools: ["page-numbers", "header-footer", "protect-pdf", "watermark-pdf"],
    relatedGuides: ["how-to-add-page-numbers", "how-to-protect-a-pdf"]
  },

  // 20. CROP PDF
  {
    slug: "crop-pdf",
    name: "Crop PDF",
    category: "Page Management",
    description: "Trim page margins, remove unwanted borders, and crop PDF canvas dimensions visually.",
    shortDesc: "Trim margins and crop PDF page areas visually",
    icon: "Crop",
    route: "/tools/crop-pdf",
    seoTitle: "Crop PDF Online Free — Trim PDF Margins & Canvas | Pdfyara",
    seoDescription: "Crop PDF pages visually or enter custom margins. Trim unwanted white borders, header scraps, or print marks locally in your browser.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Documents exported with excessive white margins or scanner crop marks can be difficult to read on tablet and e-reader screens. Pdfyara's Crop PDF tool gives you an interactive visual bounding box to trim margins across all pages or selected sheets with millimeter precision.",
    howToUse: [
      { title: "Upload PDF", desc: "Select the PDF file you wish to crop." },
      { title: "Adjust Bounding Box", desc: "Drag the corner handles on the visual preview to frame the target content area." },
      { title: "Choose Page Scope", desc: "Apply the crop box to all pages, or customize for individual pages." },
      { title: "Crop & Download", desc: "Export your cropped document instantly." }
    ],
    howItWorks: "Pdfyara adjusts the `/CropBox` and `/MediaBox` coordinate arrays in the PDF dictionary, redefining the visible viewport for standard PDF viewing engines.",
    useCases: [
      { title: "E-Reader Optimization", desc: "Trim oversized margins from academic papers so text appears larger on Kindle and iPad screens." },
      { title: "Printer Mark Removal", desc: "Crop off registration marks, color bars, and bleed lines from prepress print files." }
    ],
    bestPractices: [
      "Leave a slight breathing margin around text blocks to prevent clipping on diverse screen sizes."
    ],
    commonMistakes: [
      "Cropping too tight against paragraph margins, causing characters to touch the screen edge."
    ],
    limitations: [
      "Adjusting the CropBox alters the viewing dimensions; underlying graphics outside the crop box remain in the file stream unless flattened."
    ],
    faq: [
      { question: "Does cropping reduce file size?", answer: "Standard cropping redefines the viewing frame. To reduce file size as well, run the cropped file through Pdfyara's Compress PDF tool." }
    ],
    relatedTools: ["resize-pdf", "organize-pdf", "rotate-pdf", "n-up-pdf"],
    relatedGuides: ["how-to-organize-pdf-pages"]
  },

  // 21. RESIZE PDF
  {
    slug: "resize-pdf",
    name: "Resize PDF",
    category: "Page Management",
    description: "Change PDF page size to standard formats (A4, A3, Letter, Legal) with proportional scaling.",
    shortDesc: "Standardize page dimensions (A4, Letter, etc.)",
    icon: "Scaling",
    route: "/tools/resize-pdf",
    seoTitle: "Resize PDF Online Free — Change PDF Page Size | Pdfyara",
    seoDescription: "Resize PDF document page dimensions to A4, US Letter, A3, A5, or Legal. Scale and center content proportionally in your browser.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Different countries and institutions mandate specific paper dimensions—such as US Letter in North America and ISO A4 in Europe and Asia. Pdfyara's Resize PDF tool standardizes your document dimensions while scaling and centering content proportionally.",
    howToUse: [
      { title: "Upload PDF", desc: "Load the document you need to resize." },
      { title: "Choose Target Size", desc: "Select A4, US Letter, Legal, A3, A5, or enter custom dimensions." },
      { title: "Select Content Scaling", desc: "Choose between 'Fit & Center' (preserve aspect ratio) or 'Stretch to Fill'." },
      { title: "Resize & Download", desc: "Save your standardized PDF file." }
    ],
    howItWorks: "The resize engine scales the PDF `/MediaBox` dimensions and applies transformation matrices to scale and center embedded vector and raster objects.",
    optionsExplained: [
      { name: "A4 (210 x 297 mm)", desc: "The international standard for office documents, resumes, and international correspondence." },
      { name: "US Letter (8.5 x 11 in)", desc: "Standard paper size across the United States, Canada, and Mexico." },
      { name: "Legal (8.5 x 14 in)", desc: "Extended sheet size commonly used for court filings and contracts." }
    ],
    useCases: [
      { title: "International Submissions", desc: "Convert US Letter documents to A4 for European visa or university applications." },
      { title: "Standardizing Mixed Scans", desc: "Make all pages uniform in a document compiled from different scanner sizes." }
    ],
    bestPractices: [
      "Always use 'Fit & Center' to avoid stretching typography and distortion."
    ],
    commonMistakes: [
      "Forcing a square layout onto a tall Legal sheet with 'Stretch', causing distorted photos."
    ],
    limitations: [
      "Upscaling very low-resolution raster pages to massive A1/A0 sheets may reveal pixelation in original photos."
    ],
    faq: [
      { question: "Will resizing stretch my text?", answer: "No, Pdfyara preserves the original aspect ratio and centers your content with balanced margins." }
    ],
    relatedTools: ["crop-pdf", "n-up-pdf", "pdf-page-size", "organize-pdf"],
    relatedGuides: ["how-to-organize-pdf-pages"]
  },

  // 22. GRAYSCALE PDF
  {
    slug: "grayscale-pdf",
    name: "Grayscale PDF",
    category: "Advanced PDF Tools",
    description: "Convert color PDFs to clean black-and-white / grayscale for economical printing and smaller files.",
    shortDesc: "Convert color PDFs to black & white grayscale",
    icon: "SunMoon",
    route: "/tools/grayscale-pdf",
    seoTitle: "Convert PDF to Grayscale Online Free | Pdfyara",
    seoDescription: "Convert color PDF files to black and white grayscale. Save color printer ink and reduce file size directly in your browser.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Printing color documents on office printers can consume expensive color toner. Converting PDFs to grayscale ensures sharp monochrome print output, eliminates accidental color cartridge charges, and can reduce overall file size.",
    howToUse: [
      { title: "Upload Color PDF", desc: "Select the PDF file you wish to convert." },
      { title: "Preview Monochrome", desc: "Inspect the rendered grayscale preview." },
      { title: "Convert & Download", desc: "Download your clean black and white document." }
    ],
    howItWorks: "Pdfyara calculates luminance values (`Y = 0.299R + 0.587G + 0.114B`) across all color channels and updates the color space definitions to `DeviceGray`.",
    useCases: [
      { title: "Office Printing Economy", desc: "Prepare high-volume print runs without triggering color toner usage." },
      { title: "Formal Monochrome Filings", desc: "Prepare court briefs and official documentation requiring monochrome formats." }
    ],
    bestPractices: [
      "Check color charts and pie graphs to verify that different shades of gray remain distinguishable."
    ],
    commonMistakes: [
      "Converting graphics where color was the only distinction between data series without checking gray contrast."
    ],
    limitations: [
      "Color information is permanently removed in the converted copy; keep your original if you need color later."
    ],
    faq: [
      { question: "Does grayscale reduce file size?", answer: "Yes, reducing 3-channel RGB or 4-channel CMYK images to a single monochrome channel typically lowers file weight." }
    ],
    relatedTools: ["compress-pdf", "pdf-analyzer", "flatten-pdf"],
    relatedGuides: ["how-to-reduce-pdf-size"]
  },

  // 23. N-UP PDF
  {
    slug: "n-up-pdf",
    name: "N-Up PDF",
    category: "Advanced PDF Tools",
    description: "Print multiple PDF pages onto a single sheet (2-up, 4-up, 6-up, 9-up) for handouts and booklets.",
    shortDesc: "Combine 2, 4, or more pages per sheet",
    icon: "Grid",
    route: "/tools/n-up-pdf",
    seoTitle: "N-Up PDF Online Free — Multiple Pages Per Sheet | Pdfyara",
    seoDescription: "Combine 2, 4, 6, 8, or 9 PDF pages onto a single printed sheet. Create presentation handouts, study sheets, and pocket booklets.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "When preparing lecture handouts, meeting summaries, or compact pocket booklets, printing multiple pages per sheet saves paper and gives readers an easy birds-eye overview. Pdfyara's N-Up tool arranges 2, 4, 6, 8, or 9 pages onto single sheets with customizable margins and borders.",
    howToUse: [
      { title: "Upload PDF", desc: "Select your multi-page document." },
      { title: "Select Layout Grid", desc: "Choose 2 pages per sheet (1x2), 4 pages (2x2), 6 pages (2x3), or 9 pages (3x3)." },
      { title: "Customize Margins & Borders", desc: "Optionally add thin divider borders between pages." },
      { title: "Generate & Download", desc: "Export your consolidated N-Up document." }
    ],
    howItWorks: "The N-Up engine scales and translates page transformation matrices into tiled sub-viewports on a newly created parent sheet.",
    useCases: [
      { title: "Slide Deck Handouts", desc: "Print 4 presentation slides per sheet for audience reference." },
      { title: "Study Cheat Sheets", desc: "Fit entire chapter notes onto a 2-page reference card." },
      { title: "Paper Conservation", desc: "Cut paper usage by 50% to 75% when printing draft manuscripts." }
    ],
    bestPractices: [
      "Use 2-Up or 4-Up for standard reading text so font sizes remain comfortably legible without a magnifying glass."
    ],
    commonMistakes: [
      "Using 9-Up on documents with very small footnotes, making text unreadable."
    ],
    limitations: [
      "Scaling down dense pages naturally reduces visual font height on physical paper."
    ],
    faq: [
      { question: "What does 'N-Up' mean?", answer: "'N-Up' is a printing term where 'N' represents the number of virtual pages tiled onto a single physical sheet of paper (e.g. 2-Up = 2 pages/sheet)." }
    ],
    relatedTools: ["resize-pdf", "crop-pdf", "organize-pdf"],
    relatedGuides: ["how-to-organize-pdf-pages"]
  },

  // 24. METADATA EDITOR
  {
    slug: "edit-pdf-metadata",
    name: "Edit PDF Metadata",
    category: "Document Information",
    description: "View and edit internal PDF properties: Title, Author, Subject, Keywords, Creator, and Producer.",
    shortDesc: "Modify Title, Author, Subject & Keywords",
    icon: "FileCode",
    route: "/tools/edit-pdf-metadata",
    seoTitle: "Edit PDF Metadata Online Free — Change Author & Title | Pdfyara",
    seoDescription: "View and modify PDF metadata properties: Title, Author, Subject, Keywords, Creator, and Producer. Clean hidden information for privacy.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "PDF documents carry hidden metadata tags that store the author's name, creation software, document title, and revision history. Whether you need to optimize document SEO, add cataloging keywords, or scrub personal computer usernames before public release, Pdfyara's Metadata Editor makes it effortless.",
    howToUse: [
      { title: "Upload PDF", desc: "Load the file to read existing metadata fields." },
      { title: "Edit Fields", desc: "Update Title, Author, Subject, Keywords, Creator, and Producer fields." },
      { title: "Scrub or Save", desc: "Click 'Wipe All Metadata' for privacy or 'Save Metadata' to apply your custom entries." },
      { title: "Download Updated PDF", desc: "Save the sanitized file." }
    ],
    howItWorks: "Pdfyara inspects both the classic `/Info` dictionary and modern XMP metadata XML streams, synchronizing fields across both standards.",
    useCases: [
      { title: "Privacy Scrubbing", desc: "Remove personal author names and local file paths before uploading whitepapers." },
      { title: "Academic & Library Cataloging", desc: "Assign formal Title, Subject, and Author tags for digital library indexing." },
      { title: "Corporate Branding", desc: "Ensure company whitepapers display uniform company names as Author and Producer." }
    ],
    bestPractices: [
      "Always wipe metadata before sending legal settlement offers or competitive proposals to external parties."
    ],
    commonMistakes: [
      "Assuming saving a file as PDF deletes the original Word processor author history."
    ],
    limitations: [
      "Editing metadata changes document properties; it does not alter visible text printed on the page."
    ],
    faq: [
      { question: "What is PDF metadata?", answer: "Metadata is background information embedded in the file describing who created it, what software was used, and when it was modified." }
    ],
    relatedTools: ["pdf-analyzer", "protect-pdf", "flatten-pdf"],
    relatedGuides: ["how-to-protect-a-pdf"]
  },

  // 25. FLATTEN PDF
  {
    slug: "flatten-pdf",
    name: "Flatten PDF",
    category: "Advanced PDF Tools",
    description: "Merge interactive form fields, annotations, and visual layers into a single static background layer.",
    shortDesc: "Lock form fields & annotations permanently",
    icon: "Layers2",
    route: "/tools/flatten-pdf",
    seoTitle: "Flatten PDF Online Free — Lock Form Fields & Layers | Pdfyara",
    seoDescription: "Flatten interactive PDF forms, comments, and annotations into a single locked background layer. Prevent unauthorized edits and ensure consistent printing.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Interactive form fields, digital signatures, and popup annotations can behave unpredictably on different PDF viewers or mobile devices. Flattening a PDF bakes all interactive elements into the static page background, ensuring the document prints and displays identically everywhere while locking form entries from further editing.",
    howToUse: [
      { title: "Upload PDF", desc: "Select the interactive form or annotated document." },
      { title: "Flatten Document", desc: "Click 'Flatten PDF' to merge interactive layers into the page stream." },
      { title: "Download Locked File", desc: "Save your tamper-resistant static PDF." }
    ],
    howItWorks: "Pdfyara renders form widget annotations directly into the primary content stream and removes interactive AcroForm field dictionaries.",
    useCases: [
      { title: "Completed Tax & Loan Forms", desc: "Lock completed financial amounts so values cannot be accidentally modified." },
      { title: "Commercial Printing", desc: "Ensure transparency layers and annotations don't cause visual dropouts during prepress printing." }
    ],
    bestPractices: [
      "Keep an unflattened master copy if you need to edit form field values in the future."
    ],
    commonMistakes: [
      "Confusing flattening with password encryption or file compression."
    ],
    limitations: [
      "Flattening permanently converts interactive text fields into static graphics; fields can no longer be edited by typing."
    ],
    faq: [
      { question: "Does flattening prevent text from being edited?", answer: "Flattening locks interactive form fields and annotations so they cannot be typed into or moved. It creates a static visual representation." }
    ],
    relatedTools: ["remove-annotations", "fill-sign-pdf", "protect-pdf"],
    relatedGuides: ["how-to-fill-a-pdf-form"]
  },

  // 26. REMOVE ANNOTATIONS
  {
    slug: "remove-annotations",
    name: "Remove Annotations",
    category: "Advanced PDF Tools",
    description: "Strip sticky notes, highlights, drawings, and comment markups to restore a clean document.",
    shortDesc: "Delete highlights, comments & markups",
    icon: "Eraser",
    route: "/tools/remove-annotations",
    seoTitle: "Remove Annotations from PDF Online Free | Pdfyara",
    seoDescription: "Delete sticky notes, highlights, underline markups, and drawing comments from PDF files. Clean documents for official presentation.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Draft reviews often accumulate dozens of colorful highlights, sticky notes, margin comments, and drawing scribbles. When it's time to publish the final clean document, Pdfyara's Remove Annotations tool strips away unwanted markups while keeping the underlying text and layout intact.",
    howToUse: [
      { title: "Upload Annotated PDF", desc: "Select the marked-up document." },
      { title: "Choose Annotation Types", desc: "Select whether to remove all annotations or specific types (Comments, Highlights, Drawings, Links)." },
      { title: "Clean & Download", desc: "Download your clean, distraction-free PDF." }
    ],
    howItWorks: "Pdfyara parses each page's `/Annots` array, filters out specified annotation dictionaries, and rebuilds the clean page reference graph.",
    useCases: [
      { title: "Publishing Final Drafts", desc: "Remove internal review comments before sending proposals to clients." },
      { title: "Clean Study Materials", desc: "Clear messy secondhand highlights from digital textbooks." }
    ],
    bestPractices: [
      "Review the preview to ensure you aren't accidentally removing essential interactive hyperlinks if you want to keep them."
    ],
    commonMistakes: [
      "Trying to remove text that was physically scanned onto paper rather than added as a digital PDF markup."
    ],
    limitations: [
      "Only digital annotation layers can be removed; burned-in or flattened markups become part of the page bitmap."
    ],
    faq: [
      { question: "What is the difference between Remove Annotations and Flatten PDF?", answer: "Remove Annotations deletes comments and highlights completely. Flatten PDF bakes them permanently into the page so they cannot be deleted or selected." }
    ],
    relatedTools: ["flatten-pdf", "edit-pdf", "annotate-pdf"],
    relatedGuides: ["how-to-edit-a-pdf"]
  },

  // 27. PDF ANALYZER
  {
    slug: "pdf-analyzer",
    name: "PDF Analyzer",
    category: "Document Information",
    description: "Inspect deep PDF file architecture: version, dimensions, page count, security status, fonts, and images.",
    shortDesc: "Inspect PDF architecture, fonts, images & structure",
    icon: "SearchCode",
    route: "/tools/pdf-analyzer",
    seoTitle: "PDF Analyzer Online Free — Inspect Document Properties | Pdfyara",
    seoDescription: "Deep analysis tool for PDF files. Inspect PDF version, page count, file size, dimensions, encryption status, fonts, and internal structure.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Technical professionals, prepress designers, and system administrators often need to verify internal document properties before printing or ingestion. Pdfyara's PDF Analyzer provides an x-ray view into internal PDF versions, box dimensions, security permissions, embedded fonts, and raster assets.",
    howToUse: [
      { title: "Upload PDF", desc: "Select any PDF to inspect its internal properties." },
      { title: "Review Diagnostic Report", desc: "Explore structured breakdowns of file size, PDF version, encryption, page dimensions, and metadata." },
      { title: "Export Summary", desc: "Copy diagnostic details for technical troubleshooting." }
    ],
    howItWorks: "The analyzer traverses the PDF object dictionary tree, evaluating the trailer, catalog, font descriptors, and media boxes.",
    useCases: [
      { title: "Prepress Verification", desc: "Verify that all pages match uniform trim sizes before sending to industrial printers." },
      { title: "Security Auditing", desc: "Check if incoming files have active password restrictions or JavaScript objects." }
    ],
    bestPractices: [
      "Use this tool first if a PDF fails to render in third-party software to pinpoint corrupt headers or missing fonts."
    ],
    commonMistakes: [
      "Expecting diagnostic tools to fix corrupted streams automatically."
    ],
    limitations: [
      "Deep structural analysis depends on readable file header dictionaries."
    ],
    faq: [
      { question: "What information does the analyzer reveal?", answer: "It details PDF specification version, exact millimeter/point dimensions per page, encryption flags, embedded font families, image counts, and metadata tags." }
    ],
    relatedTools: ["pdf-word-counter", "pdf-page-size", "edit-pdf-metadata", "compress-pdf"],
    relatedGuides: ["how-to-reduce-pdf-size", "how-to-protect-a-pdf"]
  },

  // 28. PDF WORD COUNTER
  {
    slug: "pdf-word-counter",
    name: "PDF Word Counter",
    category: "Document Information",
    description: "Accurately calculate word count, character count, page count, and estimated reading time.",
    shortDesc: "Count words, characters, pages & reading time",
    icon: "BarChart3",
    route: "/tools/pdf-word-counter",
    seoTitle: "PDF Word Counter Online Free — Count Words & Characters | Pdfyara",
    seoDescription: "Count words, characters (with and without spaces), page counts, and estimated reading time in any PDF document for free.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Whether you are tracking translation billing, submitting an academic paper with strict word limits, or estimating client reading time, Pdfyara's PDF Word Counter delivers fast, accurate linguistic metrics across all pages of your PDF.",
    howToUse: [
      { title: "Upload PDF", desc: "Select your PDF file to analyze." },
      { title: "View Statistics", desc: "Instantly see total words, character counts, average words per page, and reading duration." },
      { title: "Copy or Export", desc: "Copy metrics for invoicing or academic submissions." }
    ],
    howItWorks: "Pdfyara extracts text tokens across all page dictionaries and executes standardized Unicode word boundary segmentation algorithms.",
    useCases: [
      { title: "Freelance Translators & Copywriters", desc: "Calculate exact word totals for client billing quotes." },
      { title: "Academic Submissions", desc: "Ensure journal articles meet strict 5,000 or 8,000 word submission caps." }
    ],
    bestPractices: [
      "If the counter shows 0 words on a document with visible text, the file is a scanned image; use OCR PDF first."
    ],
    commonMistakes: [
      "Counting words in scanned image PDFs without OCR."
    ],
    limitations: [
      "Only digital selectable text can be counted directly; scanned image PDFs require OCR."
    ],
    faq: [
      { question: "How is reading time calculated?", answer: "Reading time is estimated using standard adult reading speeds of 200–250 words per minute." }
    ],
    relatedTools: ["pdf-to-text", "pdf-analyzer", "ocr-pdf"],
    relatedGuides: ["how-to-make-a-pdf-searchable"]
  },

  // 29. PDF PAGE SIZE
  {
    slug: "pdf-page-size",
    name: "PDF Page Size Analyzer",
    category: "Document Information",
    description: "Measure exact page dimensions in millimeters, inches, and points, and compare against ISO/US standards.",
    shortDesc: "Measure page dimensions in mm, inches & points",
    icon: "Ruler",
    route: "/tools/pdf-page-size",
    seoTitle: "PDF Page Size Analyzer Online Free | Pdfyara",
    seoDescription: "Measure PDF dimensions in millimeters, inches, and points. Compare page sizes against A4, US Letter, Legal, and A3 standards.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Knowing the exact physical dimensions of your PDF pages prevents unexpected printing cutoffs and costly paper mismatches. Pdfyara measures every page in points, millimeters, and inches, comparing dimensions directly against standard formats like A4, Letter, and Legal.",
    howToUse: [
      { title: "Upload PDF", desc: "Select the document you want to measure." },
      { title: "Inspect Dimensions", desc: "View width, height, aspect ratio, and closest standard paper format match." }
    ],
    howItWorks: "The tool extracts the `/MediaBox` and `/CropBox` arrays from the PDF dictionary and converts 72-point PostScript units into standard metric and imperial measurements.",
    useCases: [
      { title: "Print Layout Verification", desc: "Ensure your commercial print submission matches exact trim dimensions." }
    ],
    bestPractices: [
      "Verify that mixed-size documents (e.g., A4 text with A3 foldouts) are identified before sending to standard desktop printers."
    ],
    commonMistakes: [
      "Assuming all pages in a single PDF file have identical dimensions."
    ],
    limitations: [
      "Measures logical PDF boundaries defined in the file header."
    ],
    faq: [
      { question: "What is 1 PDF point in inches?", answer: "In standard PDF PostScript specifications, 72 points equals exactly 1 inch (25.4 mm)." }
    ],
    relatedTools: ["resize-pdf", "crop-pdf", "pdf-analyzer"],
    relatedGuides: ["how-to-organize-pdf-pages"]
  },

  // 30. EXTRACT PAGES
  {
    slug: "extract-pages",
    name: "Extract Pages",
    category: "Page Management",
    description: "Extract specific pages or page ranges from a PDF and save them as a fresh, standalone document.",
    shortDesc: "Save selected pages into a new PDF",
    icon: "FileOutput",
    route: "/tools/extract-pages",
    seoTitle: "Extract PDF Pages Online Free — Save Selected Pages | Pdfyara",
    seoDescription: "Extract specific pages from your PDF file. Select individual pages or custom ranges and save them into a new document instantly.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "When you only need a single chapter from a textbook, an appendix from an annual report, or a 2-page contract from a massive packet, Pdfyara's Extract Pages tool lets you pluck out exactly the pages you need and save them into a fresh, clean PDF.",
    howToUse: [
      { title: "Upload PDF", desc: "Select your source PDF file." },
      { title: "Choose Pages", desc: "Click individual thumbnail pages or type ranges like '3-7, 12'." },
      { title: "Extract & Download", desc: "Save your extracted pages as a new PDF." }
    ],
    howItWorks: "Pdfyara creates a new document catalog, copies the required page trees and font resources, and writes an optimized standalone PDF.",
    useCases: [
      { title: "Sharing Relevant Excerpts", desc: "Send just the relevant section of a large manual to a client without overwhelming them." }
    ],
    bestPractices: [
      "Use thumbnail selection to visually confirm you have selected the correct pages."
    ],
    commonMistakes: [
      "Forgetting to verify page numbers when typing manual ranges."
    ],
    limitations: [
      "Bookmarks pointing to non-extracted pages are omitted in the new isolated file."
    ],
    faq: [
      { question: "Is the original PDF modified?", answer: "No, your original file remains completely untouched. A new PDF containing only your selected pages is created." }
    ],
    relatedTools: ["split-pdf", "delete-pdf-pages", "organize-pdf"],
    relatedGuides: ["how-to-extract-pdf-pages", "how-to-split-a-pdf"]
  },

  // 31. DELETE PDF PAGES
  {
    slug: "delete-pdf-pages",
    name: "Delete PDF Pages",
    category: "Page Management",
    description: "Remove unwanted, blank, or duplicate pages from your PDF with a simple visual selector.",
    shortDesc: "Remove unwanted or blank pages easily",
    icon: "Trash2",
    route: "/tools/delete-pdf-pages",
    seoTitle: "Delete PDF Pages Online Free — Remove Unwanted Pages | Pdfyara",
    seoDescription: "Remove unwanted, blank, or sensitive pages from PDF files. Click thumbnails to delete and download your clean document in seconds.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Accidental blank pages, scanner feeder duplicates, and outdated cover sheets clutter documents and inflate file size. Pdfyara's Delete PDF Pages tool lets you visually select and discard unwanted pages in seconds.",
    howToUse: [
      { title: "Upload PDF", desc: "Load the file to display all page thumbnails." },
      { title: "Select Pages to Delete", desc: "Click any thumbnail to mark it for removal." },
      { title: "Apply & Download", desc: "Download the streamlined PDF with selected pages permanently removed." }
    ],
    howItWorks: "The tool filters the page dictionary array, omitting selected indices and relinking internal references.",
    useCases: [
      { title: "Pruning Blank Pages", desc: "Remove blank backsides generated by duplex auto-feed scanners." }
    ],
    bestPractices: [
      "Use the 'Undo' button if you accidentally mark the wrong page for deletion."
    ],
    commonMistakes: [
      "Deleting a page containing essential endnotes without checking the document preview."
    ],
    limitations: [
      "You cannot delete all pages; at least one page must remain in the document."
    ],
    faq: [
      { question: "Can I undo a deletion?", answer: "Yes, you can toggle pages on and off in the visual workspace before finalizing your download." }
    ],
    relatedTools: ["organize-pdf", "extract-pages", "split-pdf"],
    relatedGuides: ["how-to-organize-pdf-pages"]
  },

  // 32. FLIP PDF
  {
    slug: "flip-pdf",
    name: "Flip PDF",
    category: "Page Management",
    description: "Mirror PDF pages horizontally or vertically to fix mirrored scans and inverted artwork.",
    shortDesc: "Mirror PDF pages horizontally or vertically",
    icon: "FlipHorizontal",
    route: "/tools/flip-pdf",
    seoTitle: "Flip PDF Online Free — Mirror Horizontally & Vertically | Pdfyara",
    seoDescription: "Mirror PDF pages horizontally or vertically. Fix mirrored scanner outputs and invert artwork directly in your browser.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Occasionally, scanner glass reflections, transfer sheets, or inverted print drivers produce mirrored PDF pages. Pdfyara's Flip PDF tool applies transformation matrices to flip pages horizontally or vertically across your document.",
    howToUse: [
      { title: "Upload PDF", desc: "Select your mirrored or inverted PDF file." },
      { title: "Select Flip Direction", desc: "Choose Horizontal Flip (left-to-right mirror) or Vertical Flip (top-to-bottom upside-down)." },
      { title: "Save & Download", desc: "Download the corrected document." }
    ],
    howItWorks: "The tool injects affine transformation matrices (`cm`) into the content stream to invert horizontal or vertical coordinate axes.",
    useCases: [
      { title: "Fixing Mirrored Scans", desc: "Correct documents scanned backwards through transparency film." }
    ],
    bestPractices: [
      "Verify text readability on the preview before downloading."
    ],
    commonMistakes: [
      "Confusing 180° rotation with a mirror flip."
    ],
    limitations: [
      "Flipping applies geometric inversion across all objects on the selected page."
    ],
    faq: [
      { question: "How does Flip differ from Rotate?", answer: "Rotation spins the page around a pivot point (90° or 180°). Flipping creates a mirror reflection (like looking in a mirror)." }
    ],
    relatedTools: ["rotate-pdf", "crop-pdf", "organize-pdf"],
    relatedGuides: ["how-to-organize-pdf-pages"]
  },

  // 33. HEADER & FOOTER
  {
    slug: "header-footer",
    name: "Header & Footer",
    category: "Page Management",
    description: "Add customized headers, footers, dates, file titles, and custom disclaimers across all pages.",
    shortDesc: "Insert custom header and footer text",
    icon: "PanelTop",
    route: "/tools/header-footer",
    seoTitle: "Add Header & Footer to PDF Online Free | Pdfyara",
    seoDescription: "Insert custom headers and footers, company names, dates, confidentiality notices, and page references across PDF documents.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Adding uniform headers and footers elevates drafts into formal corporate presentations. Pdfyara enables you to place dynamic dates, document titles, proprietary notices, and page counts across left, center, and right header and footer slots.",
    howToUse: [
      { title: "Upload PDF", desc: "Select your document." },
      { title: "Configure Slots", desc: "Type your desired text for Left Header, Center Header, Right Header, and Footer positions." },
      { title: "Choose Typography", desc: "Select font size, color, and margin offset." },
      { title: "Apply & Download", desc: "Save your branded PDF." }
    ],
    howItWorks: "Pdfyara calculates page margins and writes text strings into the header and footer coordinate zones on each page.",
    useCases: [
      { title: "Corporate Branding", desc: "Add 'ACME Corp — Confidential' to every document header." }
    ],
    bestPractices: [
      "Keep header text concise so it doesn't collide with existing page titles."
    ],
    commonMistakes: [
      "Setting large header font sizes that overlap existing document text."
    ],
    limitations: [
      "Headers and footers are placed over existing margins; ensure your source document has adequate margin space."
    ],
    faq: [
      { question: "Can I skip headers on the cover page?", answer: "Yes, simply check the 'Skip First Page' option." }
    ],
    relatedTools: ["page-numbers", "watermark-pdf", "bates-numbering"],
    relatedGuides: ["how-to-add-page-numbers", "how-to-add-a-watermark"]
  },

  // 34. PDF TO WORD
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    category: "Convert From PDF",
    description: "Convert PDF documents into editable Word documents (.docx) for easy paragraph and table editing.",
    shortDesc: "Convert PDF into editable Word (.docx) document",
    icon: "FileEdit",
    route: "/tools/pdf-to-word",
    seoTitle: "PDF to Word Online Free — Convert PDF to DOCX | Pdfyara",
    seoDescription: "Convert PDF documents to editable Microsoft Word (.docx) files. Extract text, layout, and tables for easy editing in Word.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Popular",
    intro: "Need to update an old contract, rewrite a proposal, or extract structured paragraphs from a locked PDF? Pdfyara's PDF to Word tool analyzes layout structures and generates an editable Microsoft Word (.docx) file.",
    howToUse: [
      { title: "Upload PDF", desc: "Select the PDF file you wish to convert." },
      { title: "Process Conversion", desc: "Our engine extracts paragraphs, styling, and structural elements." },
      { title: "Download DOCX", desc: "Open and edit your converted file in Microsoft Word, Google Docs, or LibreOffice." }
    ],
    howItWorks: "The converter reconstructs text streams, font weights, and spacing into standard OpenXML (.docx) document bodies.",
    useCases: [
      { title: "Contract Re-drafting", desc: "Turn finalized PDF agreements back into editable Word documents for contract markups." }
    ],
    bestPractices: [
      "For scanned PDFs, ensure text is legible or run OCR first."
    ],
    commonMistakes: [
      "Expecting complex multi-layer vector CAD drawings to convert into native Word shapes."
    ],
    limitations: [
      "PDFs with non-standard font encodings or heavily overlapping graphic designs may require minor font adjustments in Word."
    ],
    faq: [
      { question: "Can I open the downloaded file in Google Docs?", answer: "Yes! The exported `.docx` file is fully compatible with Microsoft Word, Google Docs, and Apple Pages." }
    ],
    relatedTools: ["pdf-to-text", "pdf-to-excel", "ocr-pdf", "edit-pdf"],
    relatedGuides: ["how-to-convert-pdf-to-word", "how-to-make-a-pdf-searchable"]
  },

  // 35. PDF TO EXCEL
  {
    slug: "pdf-to-excel",
    name: "PDF to Excel",
    category: "Convert From PDF",
    description: "Extract data tables, financial statements, and tabular data from PDF into editable Excel sheets (.xlsx / .csv).",
    shortDesc: "Extract tables and financial data into Excel",
    icon: "Sheet",
    route: "/tools/pdf-to-excel",
    seoTitle: "PDF to Excel Online Free — Extract Tables to XLSX | Pdfyara",
    seoDescription: "Extract tables, invoices, and financial data from PDF to editable Excel (.xlsx / .csv) spreadsheets directly in your browser.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Popular",
    intro: "Re-typing rows of financial statements, price lists, or bank data by hand is tedious and prone to human error. Pdfyara's PDF to Excel tool detects column alignments and row boundaries to output clean, editable spreadsheet data.",
    howToUse: [
      { title: "Upload PDF", desc: "Select the PDF containing tabular data." },
      { title: "Extract Tables", desc: "Our engine parses grid structures and text columns." },
      { title: "Download Spreadsheet", desc: "Download as an Excel spreadsheet or CSV data file." }
    ],
    howItWorks: "The engine analyzes horizontal and vertical text coordinates to infer tabular cell matrices and encodes standard OpenXML spreadsheet data.",
    useCases: [
      { title: "Financial Auditing", desc: "Import PDF balance sheets and bank statements into Excel for financial modeling." }
    ],
    bestPractices: [
      "Ensure table column headers are cleanly aligned in the source document."
    ],
    commonMistakes: [
      "Attempting to extract tables from blurry photocopies without clear column separation."
    ],
    limitations: [
      "Tables with irregular merged cells or complex nested sub-tables may require slight column alignment touchups."
    ],
    faq: [
      { question: "Does this export real formulas?", answer: "The converter exports raw numerical values and table structures; dynamic formulas can then be added in Excel." }
    ],
    relatedTools: ["pdf-to-word", "pdf-to-text", "pdf-analyzer"],
    relatedGuides: ["how-to-convert-pdf-to-word"]
  },

  // 36. CREATE PDF FORMS
  {
    slug: "create-pdf-forms",
    name: "Create PDF Forms",
    category: "Forms",
    description: "Build fillable interactive PDF forms with text fields, checkboxes, radio buttons, and signature fields.",
    shortDesc: "Build fillable PDF forms with interactive fields",
    icon: "CheckSquare",
    route: "/tools/create-pdf-forms",
    seoTitle: "Create PDF Forms Online Free — Build Fillable PDFs | Pdfyara",
    seoDescription: "Create interactive fillable PDF forms with text inputs, checkboxes, radio buttons, dropdowns, and signature fields.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "New",
    intro: "Turn static documents into modern interactive forms that clients and employees can fill out and sign on any computer or mobile device without printing. Pdfyara's Form Creator lets you drag and drop text fields, checkboxes, date selectors, and signature boxes onto any PDF.",
    howToUse: [
      { title: "Upload Base PDF", desc: "Load the document template you wish to make interactive." },
      { title: "Add Form Fields", desc: "Drag Text Fields, Checkboxes, Dropdowns, and Signature Zones onto the page." },
      { title: "Configure Field Names", desc: "Set field labels, placeholder text, and required flags." },
      { title: "Save & Download", desc: "Export a standard interactive fillable PDF." }
    ],
    howItWorks: "Pdfyara constructs standard ISO-32000 compliant AcroForm field dictionaries and appearance streams.",
    useCases: [
      { title: "Customer Onboarding Forms", desc: "Create interactive new client intake sheets." },
      { title: "Surveys & Questionnaires", desc: "Distribute fillable feedback forms." }
    ],
    bestPractices: [
      "Give each field a distinct, descriptive name (e.g. 'FullName', 'BillingAddress')."
    ],
    commonMistakes: [
      "Creating duplicate field names, causing multiple fields to mirror values."
    ],
    limitations: [
      "Interactive AcroForms require standard PDF viewers to type directly into fields."
    ],
    faq: [
      { question: "Can recipients fill out this form in Adobe Reader or browser viewers?", answer: "Yes! Forms created with Pdfyara adhere to universal PDF AcroForm standards supported by all modern PDF viewers." }
    ],
    relatedTools: ["fill-sign-pdf", "edit-pdf", "flatten-pdf"],
    relatedGuides: ["how-to-fill-a-pdf-form", "how-to-sign-a-pdf"]
  },

  // 37. SIGN PDF (DIRECT TOOL & SEO LANDING)
  {
    slug: "sign-pdf",
    name: "Sign PDF Online Free",
    category: "Edit & Sign",
    description: "Sign PDF documents online with free electronic signatures. Draw, type, or upload your signature directly in your web browser.",
    shortDesc: "Add electronic signatures to contracts and forms",
    icon: "FileSignature",
    route: "/tools/sign-pdf",
    seoTitle: "Sign PDF Online Free — Electronic Signatures | PDFYARA",
    seoDescription: "Sign PDF documents online for free. Create, draw, or type electronic signatures and sign contracts, waivers, and forms with 100% private in-browser processing.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Popular",
    intro: "Signing PDF contracts, agreements, and forms shouldn't require printing and physical paper. PDFYARA's Sign PDF tool allows you to draw your signature, type with calligraphic typography, or upload a signature image and place it anywhere on your document.",
    howToUse: [
      { title: "Upload PDF", desc: "Select the PDF contract or document requiring signature." },
      { title: "Create Your Signature", desc: "Draw your signature with touch/mouse, type your initials, or upload an image." },
      { title: "Position & Download", desc: "Place the signature on the required line and download your signed document." }
    ],
    howItWorks: "Signatures are rendered as crisp vector layers and mathematically encoded directly into the PDF content stream in your browser.",
    useCases: [
      { title: "Real Estate & Leases", desc: "Sign rental agreements and lease contracts remotely." },
      { title: "Freelance Proposals", desc: "Sign client estimates and non-disclosure agreements quickly." }
    ],
    bestPractices: [
      "Use contrasting ink colors (dark blue or black) for maximum readability."
    ],
    commonMistakes: [
      "Uploading low-resolution photos of paper signatures with dark shadowy backgrounds."
    ],
    limitations: [
      "Electronic signatures provide visual signing; check statutory regulations for documents requiring cryptographic digital certificates."
    ],
    faq: [
      { question: "Is my signature saved on your servers?", answer: "No. Your signature is drawn and rendered entirely within your browser session and never sent to external servers." },
      { question: "Can I sign on mobile phones?", answer: "Yes, you can easily draw your signature using your finger or stylus on smartphones and tablets." }
    ],
    relatedTools: ["fill-sign-pdf", "edit-pdf", "protect-pdf"],
    relatedGuides: ["how-to-sign-a-pdf", "how-to-fill-a-pdf-form"]
  },

  // 38. ADD TEXT TO PDF (DIRECT TOOL & SEO LANDING)
  {
    slug: "add-text-to-pdf",
    name: "Add Text to PDF Online Free",
    category: "Edit & Sign",
    description: "Add text to PDF documents online for free. Type text boxes, customize fonts, colors, and line spacing without watermarks.",
    shortDesc: "Type text annotations directly onto PDF pages",
    icon: "FileText",
    route: "/tools/add-text-to-pdf",
    seoTitle: "Add Text to PDF Online Free — Type on PDF | PDFYARA",
    seoDescription: "Add text to PDF documents online for free. Type anywhere on your PDF, choose matching fonts, colors, and sizes with 100% private in-browser editing.",
    processingMode: "browser",
    supportedFormats: ["PDF"],
    badge: "Essential",
    intro: "Need to fill out a paper form, add missing notes, insert labels, or type responses into a PDF? PDFYARA's Add Text to PDF tool gives you customizable text boxes with font matching, color pickers, and multi-directional collapse/expand controls.",
    howToUse: [
      { title: "Open Document", desc: "Upload the PDF document you want to add text to." },
      { title: "Place Text Box", desc: "Click anywhere on the document canvas to insert a new text box." },
      { title: "Type & Style", desc: "Type your text, adjust font family, font size, color, and line wrapping." },
      { title: "Export PDF", desc: "Save your document with text baked cleanly into the PDF." }
    ],
    howItWorks: "Text annotations are rendered as interactive overlay blocks and burned into standard PDF font operators upon export.",
    useCases: [
      { title: "Filling Out Application Forms", desc: "Type answers directly onto scanned application forms and resumes." },
      { title: "Document Review", desc: "Add reviewer comments, timestamps, and revision notes to drafts." }
    ],
    bestPractices: [
      "Use zoom controls to align typed text exactly with the baseline of form lines."
    ],
    commonMistakes: [
      "Using low-contrast font colors that are hard to read over document backgrounds."
    ],
    limitations: [
      "Adding text creates an overlay; it does not reflow existing flattened background paragraphs."
    ],
    faq: [
      { question: "Can I customize the font style and size?", answer: "Yes, you can choose from dozens of standard document fonts, adjust font sizes, weights, and colors." },
      { question: "Does adding text alter original content?", answer: "No, original document vector paths and streams remain preserved; new text is cleanly layered." }
    ],
    relatedTools: ["edit-pdf", "fill-sign-pdf", "watermark-pdf"],
    relatedGuides: ["how-to-edit-a-pdf", "how-to-fill-a-pdf-form"]
  }
];

export const TOOL_CATEGORIES = [
  { id: "all", name: "All Tools", count: TOOLS_REGISTRY.length },
  { id: "Edit & Sign", name: "Edit & Sign", count: TOOLS_REGISTRY.filter(t => t.category === "Edit & Sign").length },
  { id: "Merge & Split", name: "Merge & Split", count: TOOLS_REGISTRY.filter(t => t.category === "Merge & Split").length },
  { id: "Compress", name: "Compress", count: TOOLS_REGISTRY.filter(t => t.category === "Compress").length },
  { id: "Convert From PDF", name: "Convert From PDF", count: TOOLS_REGISTRY.filter(t => t.category === "Convert From PDF").length },
  { id: "Convert To PDF", name: "Convert To PDF", count: TOOLS_REGISTRY.filter(t => t.category === "Convert To PDF").length },
  { id: "Security", name: "Security", count: TOOLS_REGISTRY.filter(t => t.category === "Security").length },
  { id: "Page Management", name: "Page Management", count: TOOLS_REGISTRY.filter(t => t.category === "Page Management").length },
  { id: "OCR & Scanning", name: "OCR & Scanning", count: TOOLS_REGISTRY.filter(t => t.category === "OCR & Scanning").length },
  { id: "Forms", name: "Forms", count: TOOLS_REGISTRY.filter(t => t.category === "Forms").length },
  { id: "Document Information", name: "Document Information", count: TOOLS_REGISTRY.filter(t => t.category === "Document Information").length },
  { id: "Advanced PDF Tools", name: "Advanced PDF Tools", count: TOOLS_REGISTRY.filter(t => t.category === "Advanced PDF Tools").length },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return TOOLS_REGISTRY.find(t => t.slug === slug);
}
