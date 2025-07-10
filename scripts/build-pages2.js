import fs from "fs-extra";
import path from "path";
import Database from "better-sqlite3";

// ❶  open databases
// const layoutDB = new Database("./raw/mushaf_layout.sqlite", { readonly: true });
// const wordsDB  = new Database("./raw/quran_words.sqlite",  { readonly: true });
const layoutDB = new Database("./src/db/layout-quran_utsmani.db", { readonly: true });
const wordsDB  = new Database("./src/db/words-qpc-v4.db",  { readonly: true });

// ❷  load Indonesian translation (key = "surah:ayah")
// const indo = JSON.parse(await fs.readFile("./src/translation/id.indonesian.json", "utf8"));

// ❸  helpers
const getWords = wordsDB
  .prepare("SELECT id AS word_index, text, surah, ayah FROM words WHERE word_index BETWEEN ? AND ? ORDER BY word_index");

const linesStmt = layoutDB
  .prepare("SELECT * FROM pages ORDER BY page_number, line_number");

const pages = {};
for (const row of linesStmt.iterate()) {
  const { page_number, first_word_id, last_word_id } = row;
  if (!pages[page_number]) pages[page_number] = [];
  const words = row.line_type === "ayah"
    ? getWords.all(first_word_id, last_word_id)
        .map(w => ({
          ar: w.text,
        //   id: indo[`${w.surah}:${w.ayah}`] || ""
        }))
    : [];

  pages[page_number].push({ ...row, words });
}

// ❹  write JSON per page
await fs.ensureDir("./src/assets/pages");
for (const [num, lines] of Object.entries(pages)) {
  await fs.writeJSON(
    `./src/assets/pages/page${num.padStart(3, "0")}.json`,
    { page: Number(num), lines },
    { spaces: 2 }
  );
}
console.log("✅ 604 pages generated");
