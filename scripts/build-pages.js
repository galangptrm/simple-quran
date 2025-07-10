import fs from "fs-extra";
import path from "path";
import Database from "better-sqlite3";

// ❶  open databases
const layoutDB = new Database("./src/db/layout-quran_utsmani.db", { readonly: true });
const wordsDB  = new Database("./src/db/words-qpc-v4.db",  { readonly: true });

// ❷  load Indonesian translation (key = "surah:ayah")
// const indo = JSON.parse(await fs.readFile("./raw/translation/id.indonesian.json", "utf8"));

const linesStmt = layoutDB
  .prepare("SELECT * FROM pages WHERE page_number = 1 ORDER BY line_number");

// prepare once (outside the loop)
const wordsStmt = wordsDB.prepare(`
  SELECT *
  FROM   words
  WHERE  id BETWEEN ? AND ?
  ORDER  BY id
`);

const lines = {};
for (const row of linesStmt.iterate()) {
  const { page_number, first_word_id, last_word_id } = row;
  // console.log('LINES', row.page_number);
  // console.log("SELECT * FROM words WHERE id BETWEEN "+row.first_word_id+" AND "+row.last_word_id+" ORDER BY id");

  if (!lines[page_number]) {
    // console.log(`SELECT * FROM words WHERE id BETWEEN ${first_word_id} AND ${last_word_id} ORDER BY id`);
    const WORDS = wordsStmt.all(row.first_word_id, row.last_word_id);
    // console.log('WORDS', WORDS);

    if (row.line_type == "ayah") {
      let words = joinWords(WORDS)
      lines[page_number].push[{row, 'ayat' : words}]
    } else if (row.line_type == "surah_name") {
      lines[page_number].push[{row, 'ayat' : words}]
      
    }
  }
}

function joinWords(wordsArray = []) {
  return wordsArray.map(w => w.text).join("");
}

// function getWords(words, firstWordId, lastWordId) {
//   return Object.entries(words)
//       .map(([key, value]) => ({ id: Number(key), text: value })) // Convert keys to numbers
//       .sort((a, b) => a.id - b.id) // Sort by word ID
//       .filter(word => word.id >= firstWordId && word.id <= lastWordId) // Filter by range
//       .map(word => word.text) // Extract text values
//       .join(' ');
// }

// // ❹  write JSON per page
// await fs.ensureDir("./src/assets/pages");
// for (const [num, lines] of Object.entries(pages)) {
//   await fs.writeJSON(
//     `./src/assets/pages/page${num.padStart(3, "0")}.json`,
//     { page: Number(num), lines },
//     { spaces: 2 }
//   );
// }
// console.log("✅ 604 pages generated");

