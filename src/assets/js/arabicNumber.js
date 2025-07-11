
// Helper
export function toArabicNumber(num) {
    if (!num) {
        return;
    }
    const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
    return String(num).split("").map(d => arabicDigits[d] || d).join("");
}