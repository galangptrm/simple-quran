// public/assets/fonts/p001.woff2, p002.woff2, etc

const loadedFonts = new Set();

/**
 * Loads the correct Quran font subset for a specific page.
 * @param {number} pageNumber
 */
export async function loadFontForPage(pageNumber) {
  const padded = String(pageNumber);
  const fontKey = `p${padded}.woff2`;

  if (loadedFonts.has(fontKey)) return;

  const url = `/assets/fonts/pages_font/${fontKey}`; // public folder path

  const font = new FontFace("QPC", `url(${url})`, { display: "swap" });

  try {
    await font.load();
    document.fonts.add(font);
    loadedFonts.add(fontKey);
    console.info("Loaded font:", fontKey);
  } catch (err) {
    console.error("Failed to load font:", fontKey, err);
  }
}


