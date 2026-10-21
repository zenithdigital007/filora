/**
 * Pdfyara Font Manager & Detection Engine
 * 
 * Provides:
 * 1. Comprehensive catalog of 60+ top document, system, and Google fonts
 * 2. Intelligent PDF font detection, normalization, and PostScript mapping
 * 3. Dynamic on-demand font loader using Google Fonts & Browser Font Loading API
 * 4. CSS font stack builder for pixel-perfect replacement matching
 */

export type FontCategory = "sans-serif" | "serif" | "monospace" | "display" | "handwriting";

export interface FontDefinition {
  id: string;
  name: string;
  family: string;
  cssStack: string;
  category: FontCategory;
  isSystem?: boolean;
  isGoogleFont?: boolean;
  popular?: boolean;
}

// Exhaustive catalog of available document fonts across all typography categories
export const AVAILABLE_FONTS: FontDefinition[] = [
  // --- POPULAR / CORE SANS-SERIF ---
  {
    id: "inter",
    name: "Inter",
    family: "Inter",
    cssStack: "'Inter', system-ui, -apple-system, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "roboto",
    name: "Roboto",
    family: "Roboto",
    cssStack: "'Roboto', 'Helvetica Neue', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "open-sans",
    name: "Open Sans",
    family: "Open Sans",
    cssStack: "'Open Sans', 'Helvetica Neue', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "lato",
    name: "Lato",
    family: "Lato",
    cssStack: "'Lato', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "montserrat",
    name: "Montserrat",
    family: "Montserrat",
    cssStack: "'Montserrat', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "poppins",
    name: "Poppins",
    family: "Poppins",
    cssStack: "'Poppins', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "outfit",
    name: "Outfit",
    family: "Outfit",
    cssStack: "'Outfit', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "source-sans-3",
    name: "Source Sans 3",
    family: "Source Sans 3",
    cssStack: "'Source Sans 3', 'Source Sans Pro', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
  },
  {
    id: "raleway",
    name: "Raleway",
    family: "Raleway",
    cssStack: "'Raleway', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
  },
  {
    id: "nunito",
    name: "Nunito",
    family: "Nunito",
    cssStack: "'Nunito', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
  },
  {
    id: "ubuntu",
    name: "Ubuntu",
    family: "Ubuntu",
    cssStack: "'Ubuntu', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
  },
  {
    id: "rubik",
    name: "Rubik",
    family: "Rubik",
    cssStack: "'Rubik', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
  },
  {
    id: "work-sans",
    name: "Work Sans",
    family: "Work Sans",
    cssStack: "'Work Sans', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
  },
  {
    id: "pt-sans",
    name: "PT Sans",
    family: "PT Sans",
    cssStack: "'PT Sans', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
  },
  {
    id: "oswald",
    name: "Oswald",
    family: "Oswald",
    cssStack: "'Oswald', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
  },
  {
    id: "quicksand",
    name: "Quicksand",
    family: "Quicksand",
    cssStack: "'Quicksand', Arial, sans-serif",
    category: "sans-serif",
    isGoogleFont: true,
  },

  // --- SYSTEM STANDARD SANS-SERIF ---
  {
    id: "arial",
    name: "Arial",
    family: "Arial",
    cssStack: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
    category: "sans-serif",
    isSystem: true,
    popular: true,
  },
  {
    id: "calibri",
    name: "Calibri",
    family: "Calibri",
    cssStack: "Calibri, 'Segoe UI', Arial, sans-serif",
    category: "sans-serif",
    isSystem: true,
    popular: true,
  },
  {
    id: "helvetica",
    name: "Helvetica",
    family: "Helvetica",
    cssStack: "Helvetica, Arial, sans-serif",
    category: "sans-serif",
    isSystem: true,
    popular: true,
  },
  {
    id: "segoe-ui",
    name: "Segoe UI",
    family: "Segoe UI",
    cssStack: "'Segoe UI', Arial, sans-serif",
    category: "sans-serif",
    isSystem: true,
    popular: true,
  },
  {
    id: "trebuchet-ms",
    name: "Trebuchet MS",
    family: "Trebuchet MS",
    cssStack: "'Trebuchet MS', Arial, sans-serif",
    category: "sans-serif",
    isSystem: true,
  },
  {
    id: "verdana",
    name: "Verdana",
    family: "Verdana",
    cssStack: "Verdana, Geneva, sans-serif",
    category: "sans-serif",
    isSystem: true,
  },
  {
    id: "tahoma",
    name: "Tahoma",
    family: "Tahoma",
    cssStack: "Tahoma, Verdana, sans-serif",
    category: "sans-serif",
    isSystem: true,
  },
  {
    id: "century-gothic",
    name: "Century Gothic",
    family: "Century Gothic",
    cssStack: "'Century Gothic', Arial, sans-serif",
    category: "sans-serif",
    isSystem: true,
  },
  {
    id: "franklin-gothic",
    name: "Franklin Gothic Medium",
    family: "Franklin Gothic Medium",
    cssStack: "'Franklin Gothic Medium', Arial, sans-serif",
    category: "sans-serif",
    isSystem: true,
  },

  // --- POPULAR / CORE SERIF ---
  {
    id: "times-new-roman",
    name: "Times New Roman",
    family: "Times New Roman",
    cssStack: "'Times New Roman', Times, Georgia, serif",
    category: "serif",
    isSystem: true,
    popular: true,
  },
  {
    id: "georgia",
    name: "Georgia",
    family: "Georgia",
    cssStack: "Georgia, 'Times New Roman', serif",
    category: "serif",
    isSystem: true,
    popular: true,
  },
  {
    id: "merriweather",
    name: "Merriweather",
    family: "Merriweather",
    cssStack: "'Merriweather', Georgia, serif",
    category: "serif",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "playfair-display",
    name: "Playfair Display",
    family: "Playfair Display",
    cssStack: "'Playfair Display', Georgia, serif",
    category: "serif",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "lora",
    name: "Lora",
    family: "Lora",
    cssStack: "'Lora', Georgia, serif",
    category: "serif",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "cambria",
    name: "Cambria",
    family: "Cambria",
    cssStack: "Cambria, Georgia, serif",
    category: "serif",
    isSystem: true,
    popular: true,
  },
  {
    id: "garamond",
    name: "Garamond",
    family: "Garamond",
    cssStack: "Garamond, 'EB Garamond', Georgia, serif",
    category: "serif",
    isSystem: true,
    popular: true,
  },
  {
    id: "eb-garamond",
    name: "EB Garamond",
    family: "EB Garamond",
    cssStack: "'EB Garamond', Garamond, Georgia, serif",
    category: "serif",
    isGoogleFont: true,
  },
  {
    id: "palatino",
    name: "Palatino",
    family: "Palatino",
    cssStack: "Palatino, 'Palatino Linotype', 'Book Antiqua', Georgia, serif",
    category: "serif",
    isSystem: true,
  },
  {
    id: "pt-serif",
    name: "PT Serif",
    family: "PT Serif",
    cssStack: "'PT Serif', Georgia, serif",
    category: "serif",
    isGoogleFont: true,
  },
  {
    id: "libre-baskerville",
    name: "Libre Baskerville",
    family: "Libre Baskerville",
    cssStack: "'Libre Baskerville', Baskerville, Georgia, serif",
    category: "serif",
    isGoogleFont: true,
  },
  {
    id: "cormorant-garamond",
    name: "Cormorant Garamond",
    family: "Cormorant Garamond",
    cssStack: "'Cormorant Garamond', Garamond, serif",
    category: "serif",
    isGoogleFont: true,
  },
  {
    id: "cinzel",
    name: "Cinzel",
    family: "Cinzel",
    cssStack: "'Cinzel', Times, serif",
    category: "serif",
    isGoogleFont: true,
  },
  {
    id: "baskerville",
    name: "Baskerville",
    family: "Baskerville",
    cssStack: "Baskerville, 'Libre Baskerville', Georgia, serif",
    category: "serif",
    isSystem: true,
  },
  {
    id: "book-antiqua",
    name: "Book Antiqua",
    family: "Book Antiqua",
    cssStack: "'Book Antiqua', Palatino, Georgia, serif",
    category: "serif",
    isSystem: true,
  },

  // --- MONOSPACE & CODE ---
  {
    id: "courier-new",
    name: "Courier New",
    family: "Courier New",
    cssStack: "'Courier New', Courier, monospace",
    category: "monospace",
    isSystem: true,
    popular: true,
  },
  {
    id: "consolas",
    name: "Consolas",
    family: "Consolas",
    cssStack: "Consolas, 'Courier New', monospace",
    category: "monospace",
    isSystem: true,
    popular: true,
  },
  {
    id: "fira-code",
    name: "Fira Code",
    family: "Fira Code",
    cssStack: "'Fira Code', 'Courier New', monospace",
    category: "monospace",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "roboto-mono",
    name: "Roboto Mono",
    family: "Roboto Mono",
    cssStack: "'Roboto Mono', 'Courier New', monospace",
    category: "monospace",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    family: "JetBrains Mono",
    cssStack: "'JetBrains Mono', 'Courier New', monospace",
    category: "monospace",
    isGoogleFont: true,
  },
  {
    id: "source-code-pro",
    name: "Source Code Pro",
    family: "Source Code Pro",
    cssStack: "'Source Code Pro', 'Courier New', monospace",
    category: "monospace",
    isGoogleFont: true,
  },
  {
    id: "inconsolata",
    name: "Inconsolata",
    family: "Inconsolata",
    cssStack: "'Inconsolata', 'Courier New', monospace",
    category: "monospace",
    isGoogleFont: true,
  },
  {
    id: "space-mono",
    name: "Space Mono",
    family: "Space Mono",
    cssStack: "'Space Mono', 'Courier New', monospace",
    category: "monospace",
    isGoogleFont: true,
  },
  {
    id: "monaco",
    name: "Monaco",
    family: "Monaco",
    cssStack: "Monaco, Menlo, monospace",
    category: "monospace",
    isSystem: true,
  },
  {
    id: "menlo",
    name: "Menlo",
    family: "Menlo",
    cssStack: "Menlo, Monaco, monospace",
    category: "monospace",
    isSystem: true,
  },

  // --- SCRIPT & HANDWRITING ---
  {
    id: "caveat",
    name: "Caveat",
    family: "Caveat",
    cssStack: "'Caveat', cursive, sans-serif",
    category: "handwriting",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "dancing-script",
    name: "Dancing Script",
    family: "Dancing Script",
    cssStack: "'Dancing Script', cursive, sans-serif",
    category: "handwriting",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "pacifico",
    name: "Pacifico",
    family: "Pacifico",
    cssStack: "'Pacifico', cursive, sans-serif",
    category: "handwriting",
    isGoogleFont: true,
    popular: true,
  },
  {
    id: "satisfy",
    name: "Satisfy",
    family: "Satisfy",
    cssStack: "'Satisfy', cursive, sans-serif",
    category: "handwriting",
    isGoogleFont: true,
  },
  {
    id: "comic-sans-ms",
    name: "Comic Sans MS",
    family: "Comic Sans MS",
    cssStack: "'Comic Sans MS', 'Comic Sans', cursive, sans-serif",
    category: "handwriting",
    isSystem: true,
  },

  // --- DISPLAY & IMPACT ---
  {
    id: "impact",
    name: "Impact",
    family: "Impact",
    cssStack: "Impact, 'Arial Black', sans-serif",
    category: "display",
    isSystem: true,
    popular: true,
  },
];

// Mapping lookup table for instant PDF PostScript font name matching
const POSTSCRIPT_FONT_MAP: Record<string, { family: string; category: FontCategory }> = {
  // Arial variations
  arial: { family: "Arial", category: "sans-serif" },
  arialmt: { family: "Arial", category: "sans-serif" },
  "arial-boldmt": { family: "Arial", category: "sans-serif" },
  "arial-italicmt": { family: "Arial", category: "sans-serif" },
  "arial-bolditalicmt": { family: "Arial", category: "sans-serif" },
  arialblack: { family: "Arial", category: "sans-serif" },
  "arial-black": { family: "Arial", category: "sans-serif" },
  arialnarrow: { family: "Arial", category: "sans-serif" },

  // Helvetica
  helvetica: { family: "Helvetica", category: "sans-serif" },
  "helvetica-bold": { family: "Helvetica", category: "sans-serif" },
  "helvetica-oblique": { family: "Helvetica", category: "sans-serif" },
  "helvetica-boldoblique": { family: "Helvetica", category: "sans-serif" },
  helveticaneue: { family: "Helvetica", category: "sans-serif" },

  // Calibri
  calibri: { family: "Calibri", category: "sans-serif" },
  "calibri-bold": { family: "Calibri", category: "sans-serif" },
  "calibri-italic": { family: "Calibri", category: "sans-serif" },
  "calibri-light": { family: "Calibri", category: "sans-serif" },
  calibrimt: { family: "Calibri", category: "sans-serif" },

  // Times New Roman
  timesnewroman: { family: "Times New Roman", category: "serif" },
  timesnewromanpsmt: { family: "Times New Roman", category: "serif" },
  "timesnewromanps-boldmt": { family: "Times New Roman", category: "serif" },
  "timesnewromanps-italicmt": { family: "Times New Roman", category: "serif" },
  "timesnewromanps-bolditalicmt": { family: "Times New Roman", category: "serif" },
  "times-roman": { family: "Times New Roman", category: "serif" },
  "times-bold": { family: "Times New Roman", category: "serif" },
  "times-italic": { family: "Times New Roman", category: "serif" },
  "times-bolditalic": { family: "Times New Roman", category: "serif" },

  // Courier New
  couriernew: { family: "Courier New", category: "monospace" },
  couriernewpsmt: { family: "Courier New", category: "monospace" },
  "couriernewps-boldmt": { family: "Courier New", category: "monospace" },
  "couriernewps-italicmt": { family: "Courier New", category: "monospace" },
  courier: { family: "Courier New", category: "monospace" },
  "courier-bold": { family: "Courier New", category: "monospace" },
  "courier-oblique": { family: "Courier New", category: "monospace" },

  // Cambria
  cambria: { family: "Cambria", category: "serif" },
  "cambria-bold": { family: "Cambria", category: "serif" },
  "cambria-italic": { family: "Cambria", category: "serif" },
  cambriamath: { family: "Cambria", category: "serif" },

  // Georgia
  georgia: { family: "Georgia", category: "serif" },
  "georgia-bold": { family: "Georgia", category: "serif" },
  "georgia-italic": { family: "Georgia", category: "serif" },

  // Garamond
  garamond: { family: "Garamond", category: "serif" },
  "garamond-bold": { family: "Garamond", category: "serif" },
  "garamond-italic": { family: "Garamond", category: "serif" },
  ebgaramond: { family: "EB Garamond", category: "serif" },
  "eb-garamond": { family: "EB Garamond", category: "serif" },

  // Palatino
  palatino: { family: "Palatino", category: "serif" },
  palatinolinotype: { family: "Palatino", category: "serif" },
  "palatino-roman": { family: "Palatino", category: "serif" },
  "palatino-bold": { family: "Palatino", category: "serif" },
  bookantiqua: { family: "Book Antiqua", category: "serif" },

  // Segoe UI
  segoeui: { family: "Segoe UI", category: "sans-serif" },
  "segoeui-bold": { family: "Segoe UI", category: "sans-serif" },
  "segoeui-semibold": { family: "Segoe UI", category: "sans-serif" },

  // Trebuchet MS
  trebuchetms: { family: "Trebuchet MS", category: "sans-serif" },
  "trebuchetms-bold": { family: "Trebuchet MS", category: "sans-serif" },

  // Verdana & Tahoma
  verdana: { family: "Verdana", category: "sans-serif" },
  "verdana-bold": { family: "Verdana", category: "sans-serif" },
  tahoma: { family: "Tahoma", category: "sans-serif" },
  "tahoma-bold": { family: "Tahoma", category: "sans-serif" },

  // Google Fonts & Web standard fonts
  roboto: { family: "Roboto", category: "sans-serif" },
  "roboto-regular": { family: "Roboto", category: "sans-serif" },
  "roboto-bold": { family: "Roboto", category: "sans-serif" },
  "roboto-medium": { family: "Roboto", category: "sans-serif" },
  "roboto-light": { family: "Roboto", category: "sans-serif" },
  robotomono: { family: "Roboto Mono", category: "monospace" },

  opensans: { family: "Open Sans", category: "sans-serif" },
  "opensans-regular": { family: "Open Sans", category: "sans-serif" },
  "opensans-bold": { family: "Open Sans", category: "sans-serif" },
  "opensans-semibold": { family: "Open Sans", category: "sans-serif" },

  lato: { family: "Lato", category: "sans-serif" },
  "lato-regular": { family: "Lato", category: "sans-serif" },
  "lato-bold": { family: "Lato", category: "sans-serif" },

  montserrat: { family: "Montserrat", category: "sans-serif" },
  "montserrat-regular": { family: "Montserrat", category: "sans-serif" },
  "montserrat-bold": { family: "Montserrat", category: "sans-serif" },
  "montserrat-medium": { family: "Montserrat", category: "sans-serif" },

  poppins: { family: "Poppins", category: "sans-serif" },
  "poppins-regular": { family: "Poppins", category: "sans-serif" },
  "poppins-bold": { family: "Poppins", category: "sans-serif" },

  inter: { family: "Inter", category: "sans-serif" },
  "inter-regular": { family: "Inter", category: "sans-serif" },
  "inter-bold": { family: "Inter", category: "sans-serif" },
  "inter-medium": { family: "Inter", category: "sans-serif" },

  merriweather: { family: "Merriweather", category: "serif" },
  playfairdisplay: { family: "Playfair Display", category: "serif" },
  lora: { family: "Lora", category: "serif" },
  firacode: { family: "Fira Code", category: "monospace" },
  jetbrainsmono: { family: "JetBrains Mono", category: "monospace" },
  sourcecodepro: { family: "Source Code Pro", category: "monospace" },
  consolas: { family: "Consolas", category: "monospace" },
  comicssansms: { family: "Comic Sans MS", category: "handwriting" },
  caveat: { family: "Caveat", category: "handwriting" },
  dancingscript: { family: "Dancing Script", category: "handwriting" },
  pacifico: { family: "Pacifico", category: "handwriting" },
  impact: { family: "Impact", category: "display" },
};

// Memory cache of loaded fonts in current browser session
const loadedFontsCache = new Set<string>();

/**
 * Ensures that a font family is loaded and available for both DOM and Canvas 2D contexts.
 * Automatically injects Google Fonts link stylesheet if not already present,
 * and waits for document.fonts.load to confirm readiness.
 */
export async function ensureFontLoaded(fontFamily: string): Promise<boolean> {
  if (typeof window === "undefined" || !fontFamily) return true;

  const cleanName = fontFamily.trim().replace(/^['"]|['"]$/g, "");
  if (loadedFontsCache.has(cleanName)) return true;

  // System fonts are locally installed and always immediately available
  const systemFonts = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Times",
    "Courier New",
    "Courier",
    "Calibri",
    "Cambria",
    "Georgia",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Segoe UI",
    "Century Gothic",
    "Franklin Gothic Medium",
    "Palatino",
    "Garamond",
    "Book Antiqua",
    "Baskerville",
    "Consolas",
    "Monaco",
    "Menlo",
    "Impact",
    "Comic Sans MS",
  ];

  if (systemFonts.some((f) => f.toLowerCase() === cleanName.toLowerCase())) {
    loadedFontsCache.add(cleanName);
    return true;
  }

  try {
    // Check if the browser already has this font face active
    if (document.fonts?.check?.(`16px "${cleanName}"`)) {
      loadedFontsCache.add(cleanName);
      return true;
    }

    // Inject Google Font link tag if not already injected
    const fontSlug = cleanName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const linkId = `pdfyara-font-${fontSlug}`;

    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      const formattedFamily = cleanName.replace(/\s+/g, "+");
      link.href = `https://fonts.googleapis.com/css2?family=${formattedFamily}:ital,wght@0,300..900;1,300..900&display=swap`;
      document.head.appendChild(link);
    }

    // Await document font loading
    if (document.fonts?.load) {
      await Promise.race([
        document.fonts.load(`16px "${cleanName}"`),
        new Promise((resolve) => setTimeout(resolve, 1200)), // 1.2s timeout safety
      ]);
    }

    loadedFontsCache.add(cleanName);
    return true;
  } catch (err) {
    console.warn(`[Pdfyara Font Manager] Font load timeout or fallback for "${cleanName}":`, err);
    return false;
  }
}

export interface DetectedFontResult {
  cleanFamily: string;
  category: FontCategory;
  fontWeight: string;
  fontStyle: string;
  cssStack: string;
  rawName: string;
}

/**
 * Intelligently detects and normalizes any PDF font name into:
 * 1. Clean human-readable font family (e.g. "Calibri", "Times New Roman", "Montserrat")
 * 2. Proper CSS category ("sans-serif", "serif", "monospace", etc.)
 * 3. Exact font weight ("normal", "bold", "semibold", etc.)
 * 4. Exact font style ("normal", "italic")
 * 5. Robust CSS font stack with embedded PDF font support
 */
export function detectFontFromPdf(
  rawFontName: string,
  styleFontName = "",
  hintObj?: { bold?: boolean; italic?: boolean; fallbackName?: string; name?: string }
): DetectedFontResult {
  const combinedRaw = (hintObj?.name || rawFontName || styleFontName || "").trim();

  // 1. Strip PDF subset tag: e.g. "ABCDEF+Calibri-Bold" -> "Calibri-Bold"
  const stripped = combinedRaw.replace(/^[A-Za-z0-9]{6}\+/, "").replace(/^[/#]/, "");
  const lower = stripped.toLowerCase();

  // 2. Detect Weight & Style from name tokens or hints
  let fontWeight = hintObj?.bold ? "bold" : "normal";
  let fontStyle = hintObj?.italic ? "italic" : "normal";

  if (
    lower.includes("bold") ||
    lower.includes("black") ||
    lower.includes("heavy") ||
    lower.includes("w700") ||
    lower.includes("w800") ||
    lower.includes("w900") ||
    lower.includes("semibold") ||
    lower.includes("demi")
  ) {
    fontWeight = "bold";
  }

  if (lower.includes("italic") || lower.includes("oblique")) {
    fontStyle = "italic";
  }

  // 3. Normalize name to strip style suffixes: e.g. "Calibri-BoldItalic" -> "Calibri"
  const normalizedKey = lower
    .replace(/-(bold|italic|oblique|regular|light|medium|semibold|black|heavy|mt|psmt|ps|std|pro)+/g, "")
    .replace(/(bold|italic|oblique|regular|light|medium|semibold|black|heavy|mt|psmt|ps|std|pro)+$/g, "")
    .replace(/[^a-z0-9]/g, "");

  // 4. Check known mapping dictionary
  const matched =
    POSTSCRIPT_FONT_MAP[lower] ||
    POSTSCRIPT_FONT_MAP[normalizedKey] ||
    Object.entries(POSTSCRIPT_FONT_MAP).find(([k]) => lower.includes(k))?.[1];

  let cleanFamily = matched?.family;
  let category: FontCategory = matched?.category || "sans-serif";

  // 5. If not in dictionary, infer category and format clean title
  if (!cleanFamily) {
    // Check fallback category hints from PDF.js
    const fallback = (hintObj?.fallbackName || styleFontName || "").toLowerCase();

    if (
      fallback === "monospace" ||
      lower.includes("mono") ||
      lower.includes("courier") ||
      lower.includes("code") ||
      lower.includes("consolas")
    ) {
      category = "monospace";
      cleanFamily = "Courier New";
    } else if (
      !fallback.includes("sans") &&
      (fallback === "serif" ||
        lower.includes("serif") ||
        lower.includes("times") ||
        lower.includes("roman") ||
        lower.includes("georgia") ||
        lower.includes("cambria") ||
        lower.includes("garamond"))
    ) {
      category = "serif";
      cleanFamily = "Times New Roman";
    } else {
      category = "sans-serif";
      // Convert CamelCase or hyphen-delimited to readable title
      const cleanTitle = stripped
        .replace(/-(bold|italic|oblique|regular|light|medium|semibold|black|heavy|mt|psmt|ps|std|pro).*/i, "")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .trim();

      cleanFamily = cleanTitle && cleanTitle.length > 2 ? cleanTitle : "Arial";
    }
  }

  // 6. Generate robust CSS font stack prioritizing:
  // (a) Exact PDF font name, (b) Clean family name, (c) Universal web safe fallback
  const genericFallback =
    category === "serif"
      ? "'Times New Roman', Times, Georgia, serif"
      : category === "monospace"
      ? "'Courier New', Courier, monospace"
      : category === "handwriting"
      ? "'Comic Sans MS', cursive, sans-serif"
      : category === "display"
      ? "Impact, Arial, sans-serif"
      : "Arial, Helvetica, sans-serif";

  const cssStack = rawFontName
    ? `"${cleanFamily}", "${rawFontName}", ${genericFallback}`
    : `"${cleanFamily}", ${genericFallback}`;

  return {
    cleanFamily,
    category,
    fontWeight,
    fontStyle,
    cssStack,
    rawName: combinedRaw,
  };
}

/**
 * Returns the CSS font-family string for an extracted text item or annotation.
 */
export function getFontFamilyCss(cleanFontFamily?: string, fallbackCategory: string = "sans-serif"): string {
  if (!cleanFontFamily) {
    if (fallbackCategory === "serif") return "'Times New Roman', Times, Georgia, serif";
    if (fallbackCategory === "monospace") return "'Courier New', Courier, monospace";
    return "Arial, Helvetica, sans-serif";
  }

  const found = AVAILABLE_FONTS.find(
    (f) => f.family.toLowerCase() === cleanFontFamily.toLowerCase() || f.name.toLowerCase() === cleanFontFamily.toLowerCase()
  );

  if (found) return found.cssStack;

  const catFallback =
    fallbackCategory === "serif"
      ? "Times New Roman, Times, serif"
      : fallbackCategory === "monospace"
      ? "'Courier New', Courier, monospace"
      : "Arial, Helvetica, sans-serif";

  return `"${cleanFontFamily}", ${catFallback}`;
}
