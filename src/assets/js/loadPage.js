export async function loadPage(pageNumber) {
  const padded = String(pageNumber).padStart(3, "0");
  const url = `/assets/pages/page${padded}.json`; // move pages to public/assets/pages/

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Page ${pageNumber} not found`);
    }
    console.log('URL', url);
    const json = await res.json();
    console.log('JSON', json);
    return json;
  } catch (err) {
    console.error("loadPage error:", err);
    return null;
  }
}

