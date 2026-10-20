export interface GuideItem {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  lastUpdated: string;
  summary: string;
  content: {
    intro: string;
    steps: { stepNumber: number; title: string; description: string; tip?: string }[];
    proTips: string[];
    commonMistakes: string[];
    faq: { q: string; a: string }[];
  };
  relatedTools: string[];
}

export const GUIDES_DATA: GuideItem[] = [
  {
    slug: "how-to-merge-pdf-files",
    title: "How to Merge Multiple PDF Files into One",
    category: "Organization",
    readTime: "4 min read",
    lastUpdated: "2026-03-15",
    summary: "A step-by-step guide to combining separate PDF documents into a single organized file without losing formatting or quality.",
    content: {
      intro: "Combining multiple PDF files is one of the most essential document management tasks for students, freelancers, and business professionals. Whether you are assembling financial reports, submitting multi-part job applications, or consolidating lecture notes, this guide demonstrates how to merge PDFs quickly and securely directly within your browser.",
      steps: [
        { stepNumber: 1, title: "Gather your source documents", description: "Collect all the PDF documents you want to combine. Ensure they are not locked with passwords that prevent merging.", tip: "Rename your source files with numbering (e.g. 01_Cover, 02_Resume) to easily spot their order." },
        { stepNumber: 2, title: "Upload your PDFs to Filora", description: "Open Filora's Merge PDF tool and drag all files into the upload area or click browse." },
        { stepNumber: 3, title: "Arrange the sequence", description: "Drag and drop the thumbnail cards to order your documents exactly as you want them to appear in the combined output." },
        { stepNumber: 4, title: "Click Merge & Download", description: "Click the Merge button. Filora joins the PDF streams client-side and generates your download link immediately." }
      ],
      proTips: [
        "Verify that all merged documents share consistent page orientations before sending to external clients.",
        "Run the merged document through the Compress PDF tool if the combined file size is too large for email attachments.",
        "Use the Organize PDF tool if you need to reorder individual pages within the merged files."
      ],
      commonMistakes: [
        "Uploading scanned image files without verifying text legibility.",
        "Forgetting to verify the final page count after merging."
      ],
      faq: [
        { q: "Does merging PDFs reduce image quality?", a: "No, Filora preserves the exact vector paths and raster resolution of your source documents." },
        { q: "Can I combine PDFs of different page sizes (e.g. A4 and US Letter)?", a: "Yes, Filora smoothly merges pages of varying dimensions into a single unified file." }
      ]
    },
    relatedTools: ["merge-pdf", "organize-pdf", "split-pdf", "compress-pdf"]
  },
  {
    slug: "how-to-compress-a-pdf",
    title: "How to Compress a PDF to Reduce File Size",
    category: "Optimization",
    readTime: "5 min read",
    lastUpdated: "2026-03-12",
    summary: "Learn how to optimize PDF files for email attachments and web upload portals while maintaining high text sharpness.",
    content: {
      intro: "PDF file sizes can easily balloon when they contain high-resolution scans, uncompressed photos, or redundant font dictionaries. Discover how PDF compression works and how to achieve the best balance between small file size and clear visual reading quality.",
      steps: [
        { stepNumber: 1, title: "Analyze the document content", description: "Determine whether your PDF contains mostly vector text or heavy scanned images. Scanned image PDFs will achieve the largest reduction." },
        { stepNumber: 2, title: "Upload to Filora Compress Tool", description: "Drag your file into Filora's Compress PDF tool." },
        { stepNumber: 3, title: "Select your compression preset", description: "Choose 'Balanced' for general documents or 'Maximum Compression' if facing strict portal upload limits (e.g. under 2MB)." },
        { stepNumber: 4, title: "Download optimized file", description: "Compare the before and after file sizes and download your compressed PDF." }
      ],
      proTips: [
        "Always inspect scanned contracts at 100% zoom after aggressive compression to verify numbers and signatures remain sharp.",
        "Converting color scans to Grayscale before compressing can reduce file sizes by an extra 30% to 50%."
      ],
      commonMistakes: [
        "Compressing an already low-resolution file multiple times.",
        "Expecting pure text vector PDFs to shrink by 90% when they are already lightweight."
      ],
      faq: [
        { q: "Will compression make text unreadable?", a: "No. Vector text remains mathematically sharp regardless of compression level; only raster photos are downsampled." }
      ]
    },
    relatedTools: ["compress-pdf", "grayscale-pdf", "pdf-analyzer", "resize-pdf"]
  },
  {
    slug: "how-to-split-a-pdf",
    title: "How to Split a PDF into Separate Documents",
    category: "Organization",
    readTime: "4 min read",
    lastUpdated: "2026-03-10",
    summary: "Extract specific chapters, isolate single pages, or split large documents into equal sections.",
    content: {
      intro: "Large multi-page PDF documents frequently need to be divided into individual sections for client distribution or privacy reasons. Learn how to use range syntax to split documents precisely.",
      steps: [
        { stepNumber: 1, title: "Upload the target document", description: "Drop your PDF into Filora's Split PDF workspace." },
        { stepNumber: 2, title: "Choose splitting method", description: "Select 'Split by page ranges', 'Extract every page', or 'Split odd/even pages'." },
        { stepNumber: 3, title: "Enter page ranges", description: "Specify ranges using standard format: e.g. 1-3, 5, 8-10." },
        { stepNumber: 4, title: "Download split files", description: "Download individual split PDFs or a convenient ZIP package." }
      ],
      proTips: [
        "Use 'Extract Pages' if you only need a single specific page rather than creating multiple separate files.",
        "Double-check page numbers against the physical PDF page index."
      ],
      commonMistakes: [
        "Entering page numbers that exceed the total page count of the document."
      ],
      faq: [
        { q: "Can I extract only odd or even pages for double-sided printing?", a: "Yes, Filora provides one-click options to isolate odd or even pages." }
      ]
    },
    relatedTools: ["split-pdf", "extract-pages", "delete-pdf-pages", "organize-pdf"]
  },
  {
    slug: "how-to-edit-a-pdf",
    title: "How to Annotate and Edit PDF Documents Online",
    category: "Editing",
    readTime: "6 min read",
    lastUpdated: "2026-03-08",
    summary: "A practical guide to adding text overlays, notes, stamps, drawings, and highlights to PDF files.",
    content: {
      intro: "Reviewing drafts, grading assignments, and providing feedback requires versatile annotation tools. Learn how to use Filora's full visual PDF Editor to mark up documents.",
      steps: [
        { stepNumber: 1, title: "Open the Filora PDF Editor", description: "Navigate to /editor and upload your document." },
        { stepNumber: 2, title: "Select an annotation tool", description: "Use the left toolbar to choose Text, Pen, Highlight, Shapes, Sticky Notes, or Stamps." },
        { stepNumber: 3, title: "Customize visual properties", description: "Adjust colors, font sizes, stroke thickness, and opacity in the right properties inspector." },
        { stepNumber: 4, title: "Save and Export", description: "Click Save to burn your annotations into a fresh, standard PDF." }
      ],
      proTips: [
        "Use high-contrast text colors to ensure annotations stand out clearly against colored backgrounds.",
        "Use the Page Thumbnails drawer at the bottom to jump between pages quickly."
      ],
      commonMistakes: [
        "Assuming visual annotations will automatically reflow underlying locked paragraph typography."
      ],
      faq: [
        { q: "Can other people see my annotations in Adobe Reader?", a: "Yes, exported PDFs comply with standard ISO PDF specifications and display identically in all PDF viewers." }
      ]
    },
    relatedTools: ["edit-pdf", "fill-sign-pdf", "annotate-pdf", "watermark-pdf"]
  },
  {
    slug: "how-to-sign-a-pdf",
    title: "How to Electronically Sign a PDF Online",
    category: "Security & Sign",
    readTime: "4 min read",
    lastUpdated: "2026-03-05",
    summary: "Create and apply electronic signatures to contracts, agreements, and waivers without printing.",
    content: {
      intro: "Signing documents digitally saves paper, time, and shipping costs. Discover how to draw, type, or upload an electronic signature and position it on any PDF.",
      steps: [
        { stepNumber: 1, title: "Open Fill & Sign PDF", description: "Select the document you need to sign." },
        { stepNumber: 2, title: "Create your signature", description: "Draw your signature using your mouse or touchscreen, type your name in script font, or upload a photo of your handwritten signature." },
        { stepNumber: 3, title: "Position signature on page", description: "Drag and resize your signature over the designated signature line." },
        { stepNumber: 4, title: "Add date and initials", description: "Add text boxes for the current date, printed name, and title if required." },
        { stepNumber: 5, title: "Download signed PDF", description: "Save the completed, signed document." }
      ],
      proTips: [
        "Drawing your signature on a touchscreen mobile device yields the most natural handwritten curve.",
        "Always keep a backup copy of your signed agreements in an encrypted local archive."
      ],
      commonMistakes: [
        "Forgetting to fill in required date fields alongside the signature."
      ],
      faq: [
        { q: "Is an electronic signature legal?", a: "Yes, electronic signatures are legally valid for most commercial agreements under laws such as the US ESIGN Act and EU eIDAS regulation." }
      ]
    },
    relatedTools: ["fill-sign-pdf", "edit-pdf", "protect-pdf", "flatten-pdf"]
  },
  {
    slug: "how-to-convert-pdf-to-word",
    title: "How to Convert PDF to Editable Microsoft Word",
    category: "Conversion",
    readTime: "5 min read",
    lastUpdated: "2026-03-02",
    summary: "Transform locked PDF documents back into editable Word (.docx) files for easy editing and formatting.",
    content: {
      intro: "When you need to rewrite a contract, update a resume, or repurpose a whitepaper, converting PDF to Word gives you full word processing capabilities.",
      steps: [
        { stepNumber: 1, title: "Upload your PDF", description: "Select the PDF file on Filora's PDF to Word tool." },
        { stepNumber: 2, title: "Execute conversion", description: "The engine parses layout structures, paragraphs, and tables." },
        { stepNumber: 3, title: "Download DOCX file", description: "Open and edit the resulting .docx file in Microsoft Word, Google Docs, or Pages." }
      ],
      proTips: [
        "If your PDF is a scan of paper, ensure the text is clear so characters can be recognized accurately."
      ],
      commonMistakes: [
        "Expecting complex CAD drawings or nested multi-layered graphic designs to convert into native Word shapes."
      ],
      faq: [
        { q: "Can I open the converted file in Google Docs?", a: "Yes, standard .docx files open seamlessly in Google Docs." }
      ]
    },
    relatedTools: ["pdf-to-word", "pdf-to-excel", "pdf-to-text", "ocr-pdf"]
  },
  {
    slug: "how-to-convert-pdf-to-jpg",
    title: "How to Convert PDF Pages into High-Res JPG Images",
    category: "Conversion",
    readTime: "4 min read",
    lastUpdated: "2026-02-28",
    summary: "Export PDF pages as crystal-clear JPG photos for social sharing, website embeds, and presentations.",
    content: {
      intro: "Converting PDF pages into JPG images makes it simple to embed document proofs into presentations, share flyers on social media, or insert pages into graphic software.",
      steps: [
        { stepNumber: 1, title: "Select PDF file", description: "Drop your PDF into the PDF to JPG converter." },
        { stepNumber: 2, title: "Choose image resolution", description: "Select Standard (150 DPI) for web use or High Resolution (300 DPI) for print clarity." },
        { stepNumber: 3, title: "Download individual images or ZIP", description: "Download specific pages or click 'Download All as ZIP' to grab the entire bundle." }
      ],
      proTips: [
        "Choose 300 DPI if your document features small tabular fonts or detailed blueprints."
      ],
      commonMistakes: [
        "Expecting raster JPG files to allow text selection without OCR."
      ],
      faq: [
        { q: "Can I convert just one page of a 50-page PDF?", a: "Yes! You can preview and download individual pages directly." }
      ]
    },
    relatedTools: ["pdf-to-jpg", "pdf-to-png", "jpg-to-pdf", "extract-images"]
  },
  {
    slug: "how-to-convert-images-to-pdf",
    title: "How to Convert Photos and Images to a Single PDF",
    category: "Conversion",
    readTime: "4 min read",
    lastUpdated: "2026-02-25",
    summary: "Turn collections of JPG, PNG, and camera photos into a neat, unified PDF document.",
    content: {
      intro: "Receipts, whiteboard notes, and portfolio illustrations are easier to distribute and archive when bound together into a clean PDF booklet.",
      steps: [
        { stepNumber: 1, title: "Select your images", description: "Upload one or multiple JPG or PNG images." },
        { stepNumber: 2, title: "Arrange and rotate", description: "Drag photo cards into your preferred reading sequence and rotate sideways photos." },
        { stepNumber: 3, title: "Set page size & margins", description: "Choose A4, US Letter, or 'Fit to Image', and configure white margin borders." },
        { stepNumber: 4, title: "Generate PDF", description: "Click Convert and download your unified PDF document." }
      ],
      proTips: [
        "Use 'Fit to Image' if your photos have non-standard dimensions to avoid white letterboxing bars."
      ],
      commonMistakes: [
        "Converting dark or blurry photos without cropping background desk clutter first."
      ],
      faq: [
        { q: "Can I reorder photos after uploading?", a: "Yes, you can freely drag and rearrange photos in the workspace." }
      ]
    },
    relatedTools: ["jpg-to-pdf", "png-to-pdf", "compress-pdf", "merge-pdf"]
  },
  {
    slug: "how-ocr-works",
    title: "How OCR Works: Making Scanned PDFs Searchable",
    category: "OCR & Tech",
    readTime: "7 min read",
    lastUpdated: "2026-02-20",
    summary: "An in-depth explanation of Optical Character Recognition technology and how to extract text from scanned paperwork.",
    content: {
      intro: "Optical Character Recognition (OCR) bridges the physical and digital document worlds by recognizing glyph contours in photographs and converting them into machine-readable digital characters.",
      steps: [
        { stepNumber: 1, title: "Image Preprocessing", description: "The OCR engine converts the image to monochrome, corrects skew, and cleans background noise." },
        { stepNumber: 2, title: "Character Segmentation", description: "Algorithms identify lines, words, and individual character boundary boxes." },
        { stepNumber: 3, title: "Feature Extraction & Neural Classification", description: "Neural models evaluate strokes, curves, and angles to match glyphs against language dictionaries." },
        { stepNumber: 4, title: "Text Output & Search Layer", description: "Extracted text is compiled into a copyable string or embedded as an invisible search layer over the PDF." }
      ],
      proTips: [
        "Higher scan contrast and 300 DPI resolutions dramatically improve OCR accuracy.",
        "Straightening crooked scans with Deskew tools boosts word recognition rates."
      ],
      commonMistakes: [
        "Expecting OCR to reliably read decorative cursive handwriting on low-res photocopies."
      ],
      faq: [
        { q: "Is OCR 100% accurate?", a: "While modern neural models exceed 98% accuracy on clean typography, degraded photocopies may require manual proofreading." }
      ]
    },
    relatedTools: ["ocr-pdf", "pdf-to-text", "pdf-word-counter", "pdf-analyzer"]
  },
  {
    slug: "how-to-make-a-pdf-searchable",
    title: "How to Make a Scanned PDF Searchable",
    category: "OCR & Tech",
    readTime: "5 min read",
    lastUpdated: "2026-02-18",
    summary: "Turn locked image scans into searchable, indexable documents you can search with Ctrl+F.",
    content: {
      intro: "When you open a scanned PDF and pressing Ctrl+F (or Cmd+F) finds zero results, the file is purely an image. Learn how to make it searchable.",
      steps: [
        { stepNumber: 1, title: "Upload scan to OCR PDF", description: "Drop your scanned PDF into Filora's OCR tool." },
        { stepNumber: 2, title: "Select language", description: "Ensure the document language matches your source material." },
        { stepNumber: 3, title: "Process text recognition", description: "Let the in-browser neural engine recognize text on all pages." },
        { stepNumber: 4, title: "Export searchable text", description: "Download your searchable document." }
      ],
      proTips: [
        "Run the Word Counter tool on your result to verify full text extraction."
      ],
      commonMistakes: [
        "Selecting the wrong language dictionary during OCR."
      ],
      faq: [
        { q: "Can I copy text from the result?", a: "Yes, the resulting text can be copied, edited, and searched." }
      ]
    },
    relatedTools: ["ocr-pdf", "pdf-to-text", "pdf-word-counter"]
  },
  {
    slug: "how-to-protect-a-pdf",
    title: "How to Protect a PDF with Password Encryption",
    category: "Security",
    readTime: "5 min read",
    lastUpdated: "2026-02-15",
    summary: "Secure sensitive personal, legal, and financial documents with strong encryption.",
    content: {
      intro: "Emailing tax records, salary reports, or confidential contracts without encryption exposes sensitive data to interception. Learn how to encrypt your PDF with a password.",
      steps: [
        { stepNumber: 1, title: "Select your PDF", description: "Upload the document to Filora's Protect PDF tool." },
        { stepNumber: 2, title: "Set a strong password", description: "Choose a passphrase containing letters, numbers, and symbols." },
        { stepNumber: 3, title: "Configure permissions", description: "Optionally restrict printing or copying." },
        { stepNumber: 4, title: "Download encrypted file", description: "Save your password-protected PDF." }
      ],
      proTips: [
        "Store your password in a trusted password manager; encrypted files cannot be opened without the password."
      ],
      commonMistakes: [
        "Using simple passwords like '123456' or birth years."
      ],
      faq: [
        { q: "Is the password transmitted over the web?", a: "No, Filora encrypts the PDF entirely in your browser. Your password never touches our servers." }
      ]
    },
    relatedTools: ["protect-pdf", "unlock-pdf", "redact-pdf", "watermark-pdf"]
  },
  {
    slug: "how-to-redact-a-pdf",
    title: "How to Permanently Redact Sensitive Info from a PDF",
    category: "Security",
    readTime: "6 min read",
    lastUpdated: "2026-02-12",
    summary: "Understand why visual black boxes fail and how to permanently sanitize confidential text and numbers.",
    content: {
      intro: "Placing a black shape over text in simple viewers does not delete the text underneath. Anyone can highlight and copy the hidden text. Learn how permanent redaction works.",
      steps: [
        { stepNumber: 1, title: "Open Redact PDF tool", description: "Load the document containing sensitive information." },
        { stepNumber: 2, title: "Mark redaction zones", description: "Draw boxes over account numbers, SSNs, medical codes, or names." },
        { stepNumber: 3, title: "Execute permanent redaction", description: "Filora destroys the underlying vector characters and bakes the blackout layer." },
        { stepNumber: 4, title: "Download and verify", description: "Open the file and verify text cannot be copied from redacted sectors." }
      ],
      proTips: [
        "Always test the downloaded PDF by trying to select text in the blacked-out area."
      ],
      commonMistakes: [
        "Using black highlighter ink instead of true redaction."
      ],
      faq: [
        { q: "Can someone reverse the redaction?", a: "No. Permanent redaction permanently destroys the underlying byte stream." }
      ]
    },
    relatedTools: ["redact-pdf", "protect-pdf", "flatten-pdf", "remove-annotations"]
  },
  {
    slug: "how-to-add-a-watermark",
    title: "How to Add Text or Logo Watermarks to a PDF",
    category: "Security & Branding",
    readTime: "4 min read",
    lastUpdated: "2026-02-10",
    summary: "Brand documents and prevent unauthorized distribution with custom transparent watermarks.",
    content: {
      intro: "Watermarks act as visual deterrents against document leaks and clarify document status like DRAFT, CONFIDENTIAL, or SAMPLE.",
      steps: [
        { stepNumber: 1, title: "Upload PDF", description: "Select the file you want to watermark." },
        { stepNumber: 2, title: "Choose watermark type", description: "Select Text Watermark or Image Logo (PNG/JPG)." },
        { stepNumber: 3, title: "Adjust opacity & rotation", description: "Set opacity between 20%–30% so underlying text remains legible, and choose diagonal 45° angle." },
        { stepNumber: 4, title: "Apply & Download", description: "Stamp across all pages and download the watermarked PDF." }
      ],
      proTips: [
        "Use 45° diagonal placement across the center for maximum protection against screenshotting."
      ],
      commonMistakes: [
        "Using 100% opacity which covers and obscures document text."
      ],
      faq: [
        { q: "Can I use my transparent PNG company logo?", a: "Yes, upload your logo in the Image Watermark tab." }
      ]
    },
    relatedTools: ["watermark-pdf", "page-numbers", "header-footer", "protect-pdf"]
  },
  {
    slug: "how-to-add-page-numbers",
    title: "How to Add Page Numbers to PDF Documents",
    category: "Organization",
    readTime: "4 min read",
    lastUpdated: "2026-02-08",
    summary: "Insert clean header or footer numbering with custom prefixes, starting counts, and first-page skip.",
    content: {
      intro: "Organize large reports and theses with sequential page numbers.",
      steps: [
        { stepNumber: 1, title: "Upload document", description: "Select your PDF file on the Page Numbers tool." },
        { stepNumber: 2, title: "Choose position", description: "Pick Bottom Right, Bottom Center, or Top Right." },
        { stepNumber: 3, title: "Configure format", description: "Choose 'Page {n} of {total}' or simple numbers, and check 'Skip First Page' if you have a cover sheet." },
        { stepNumber: 4, title: "Apply & Download", description: "Save your numbered document." }
      ],
      proTips: [
        "Use 'Skip First Page' whenever your document starts with an unnumbered title or cover page."
      ],
      commonMistakes: [
        "Placing page numbers in the top header where they collide with existing chapter titles."
      ],
      faq: [
        { q: "Can I start numbering at page 5?", a: "Yes, set the Starting Number field to 5." }
      ]
    },
    relatedTools: ["page-numbers", "bates-numbering", "header-footer", "organize-pdf"]
  },
  {
    slug: "how-to-extract-pdf-pages",
    title: "How to Extract Specific Pages from a PDF",
    category: "Organization",
    readTime: "4 min read",
    lastUpdated: "2026-02-05",
    summary: "Pluck specific pages or chapters from large documents and save them as standalone PDFs.",
    content: {
      intro: "Extracting individual pages allows you to share only relevant portions of large manuals or contracts.",
      steps: [
        { stepNumber: 1, title: "Upload PDF", description: "Drop your file into the Extract Pages tool." },
        { stepNumber: 2, title: "Select pages", description: "Click thumbnail pages or type ranges like '2-4, 8'." },
        { stepNumber: 3, title: "Save new PDF", description: "Download the clean extracted document." }
      ],
      proTips: [
        "Check thumbnails visually before extracting to ensure correct charts are selected."
      ],
      commonMistakes: [
        "Forgetting to verify page ranges."
      ],
      faq: [
        { q: "Is the source file altered?", a: "No, your original file remains unchanged." }
      ]
    },
    relatedTools: ["extract-pages", "split-pdf", "delete-pdf-pages", "organize-pdf"]
  },
  {
    slug: "how-to-organize-pdf-pages",
    title: "How to Reorder, Rotate, and Organize PDF Pages",
    category: "Organization",
    readTime: "5 min read",
    lastUpdated: "2026-02-03",
    summary: "Visual guide to rearranging misordered pages, rotating sideways sheets, and deleting blanks.",
    content: {
      intro: "Scanned documents often end up out of order or sideways. Learn how to use a visual thumbnail board to organize your PDF.",
      steps: [
        { stepNumber: 1, title: "Open Organize PDF", description: "Load your document to see all pages as thumbnails." },
        { stepNumber: 2, title: "Drag to reorder", description: "Click and drag thumbnails into the correct sequence." },
        { stepNumber: 3, title: "Rotate sideways pages", description: "Use the rotate icon on any thumbnail to turn it 90°." },
        { stepNumber: 4, title: "Delete blanks", description: "Click the trash icon on blank or unnecessary pages." },
        { stepNumber: 5, title: "Save and Download", description: "Export your organized document." }
      ],
      proTips: [
        "Use zoom controls on the thumbnail board to inspect small text before deleting."
      ],
      commonMistakes: [
        "Deleting index pages by accident."
      ],
      faq: [
        { q: "Can I duplicate a page?", a: "Yes, use the duplicate icon on any thumbnail." }
      ]
    },
    relatedTools: ["organize-pdf", "merge-pdf", "rotate-pdf", "delete-pdf-pages"]
  },
  {
    slug: "how-to-fill-a-pdf-form",
    title: "How to Fill Out and Sign PDF Forms Online",
    category: "Forms & Sign",
    readTime: "5 min read",
    lastUpdated: "2026-02-01",
    summary: "Complete interactive or non-interactive PDF application forms without printing.",
    content: {
      intro: "Whether a PDF has interactive AcroForm fields or is a flat scan, learn how to fill in answers, tick checkmarks, and sign.",
      steps: [
        { stepNumber: 1, title: "Upload the form", description: "Open the form in Filora's Fill & Sign tool." },
        { stepNumber: 2, title: "Click to type answers", description: "Click on lines to place text boxes for your name, address, and details." },
        { stepNumber: 3, title: "Add checkmarks and dates", description: "Click the checkmark tool to tick boxes." },
        { stepNumber: 4, title: "Apply your signature", description: "Sign using your mouse, touchscreen, or uploaded signature." },
        { stepNumber: 5, title: "Download completed form", description: "Save your completed PDF." }
      ],
      proTips: [
        "Use the 'Flatten' option when submitting completed financial forms so entries cannot be altered."
      ],
      commonMistakes: [
        "Leaving required fields blank."
      ],
      faq: [
        { q: "Can I fill non-interactive scanned forms?", a: "Yes! You can click anywhere to place text annotations over any line." }
      ]
    },
    relatedTools: ["fill-sign-pdf", "create-pdf-forms", "edit-pdf", "flatten-pdf"]
  },
  {
    slug: "how-to-reduce-pdf-size",
    title: "10 Proven Techniques to Reduce PDF File Size",
    category: "Optimization",
    readTime: "7 min read",
    lastUpdated: "2026-01-28",
    summary: "Advanced strategies for shrinking heavy PDFs: image downsampling, grayscale conversion, font subsetting, and pruning.",
    content: {
      intro: "Learn 10 practical techniques to trim oversized PDF documents for instant emailing and faster web downloads.",
      steps: [
        { stepNumber: 1, title: "Downsample raster images to 150 DPI", description: "High-DPI 600 DPI photos waste space; 150 DPI is ideal for screen reading." },
        { stepNumber: 2, title: "Convert color scans to Grayscale", description: "Dropping RGB channels to monochrome cuts image weight significantly." },
        { stepNumber: 3, title: "Remove unneeded pages and attachments", description: "Delete divider sheets and blank scan backsides." },
        { stepNumber: 4, title: "Clean unreferenced metadata and streams", description: "Use Filora's Compress tool to purge ghost objects." }
      ],
      proTips: [
        "Combine compression with Grayscale for maximum reduction."
      ],
      commonMistakes: [
        "Re-compressing already pixelated low-res graphics."
      ],
      faq: [
        { q: "Why is my PDF 50MB when it only has 5 pages?", a: "It likely contains uncompressed raw camera scans. Compressing it will shrink it by over 80%." }
      ]
    },
    relatedTools: ["compress-pdf", "grayscale-pdf", "delete-pdf-pages", "pdf-analyzer"]
  },
  {
    slug: "how-to-create-a-pdf-from-images",
    title: "How to Create a Professional PDF from Photos and Scans",
    category: "Creation",
    readTime: "4 min read",
    lastUpdated: "2026-01-25",
    summary: "Combine smartphone photos into an elegant A4 or Letter PDF document with balanced margins.",
    content: {
      intro: "Create professional multi-page PDF documents from camera photos and graphic files.",
      steps: [
        { stepNumber: 1, title: "Upload images to JPG to PDF", description: "Select all your photos." },
        { stepNumber: 2, title: "Arrange sequence", description: "Drag photo cards into the desired story order." },
        { stepNumber: 3, title: "Choose A4/Letter and margins", description: "Select page format and clean white margin borders." },
        { stepNumber: 4, title: "Download compiled PDF", description: "Export your clean document." }
      ],
      proTips: [
        "Crop out surrounding shadows and desk clutter before converting."
      ],
      commonMistakes: [
        "Mixing portrait and landscape photos without setting orientation."
      ],
      faq: [
        { q: "Is there a limit on how many photos I can add?", a: "You can combine dozens of photos at once." }
      ]
    },
    relatedTools: ["jpg-to-pdf", "png-to-pdf", "merge-pdf", "compress-pdf"]
  },
  {
    slug: "how-to-remove-pdf-annotations",
    title: "How to Remove Annotations, Highlights, and Notes from PDF",
    category: "Editing",
    readTime: "4 min read",
    lastUpdated: "2026-01-20",
    summary: "Strip review markups, highlights, and sticky notes to restore a pristine original document.",
    content: {
      intro: "Clean up review comments and markup before publishing documents to clients or archiving.",
      steps: [
        { stepNumber: 1, title: "Upload annotated PDF", description: "Select your marked-up file." },
        { stepNumber: 2, title: "Choose annotation types", description: "Select all markups or specific types (Comments, Highlights, Pen marks)." },
        { stepNumber: 3, title: "Clean and Download", description: "Download your clean, distraction-free PDF." }
      ],
      proTips: [
        "Preview the clean output to ensure all comments were successfully removed."
      ],
      commonMistakes: [
        "Confusing digital annotations with scanned photocopied marks."
      ],
      faq: [
        { q: "Can I remove only highlights but keep links?", a: "Yes, Filora lets you target specific annotation categories." }
      ]
    },
    relatedTools: ["remove-annotations", "flatten-pdf", "edit-pdf"]
  }
];

export function getGuideBySlug(slug: string): GuideItem | undefined {
  return GUIDES_DATA.find(g => g.slug === slug);
}
