export async function loadPage(pageNumber) {
  const padded = String(pageNumber).padStart(3, "0");
  const url = `${import.meta.env.BASE_URL}/assets/pages/page${padded}.json`; // move pages to public/assets/pages/

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Page ${pageNumber} not found`);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("loadPage error:", err);
    return null;
  }
}

