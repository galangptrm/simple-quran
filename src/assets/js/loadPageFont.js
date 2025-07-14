// public/assets/fonts/pages_font/p001.woff2, p002.woff2, etc

// loadFontForPage.js
const loadedFonts = new Set();

/**
 * Loads the main font for a specific Quran page.
 * Returns the font name (e.g. QPC-001) so it can be applied in your JSX.
 */
export async function loadFontForPage(pageNumber) {
  const padded = String(pageNumber);
  const fontKey = `p${padded}.woff2`;
  const fontName = `QPC-${padded}`;

  if (loadedFonts.has(fontName)) return fontName;

  const url = `${import.meta.env.BASE_URL}/assets/fonts/pages_font/${fontKey}`;
  const font = new FontFace(fontName, `url(${url})`, { display: "swap" });

  try {
    await font.load();
    document.fonts.add(font);
    loadedFonts.add(fontName);
    console.info("✅ Font loaded:", fontName);
    return fontName;
  } catch (err) {
    console.error("❌ Failed to load font:", fontName, err);
    return null;
  }
}

/**
 * Preloads fonts for ±3 pages around the given page.
 */
export async function preloadNearbyFonts(centerPage) {
  const promises = [];

  for (let offset = -3; offset <= 3; offset++) {
    const page = centerPage + offset;
    if (page >= 1 && page <= 604) {
      promises.push(loadFontForPage(page));
    }
  }

  await Promise.all(promises);
}
