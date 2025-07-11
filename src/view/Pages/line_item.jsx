import React from "react";

export default function LineItem({line, surahNames, surahNamesIndex=0}) {
    let surah_name = ""
    console.log('suratNames', surahNamesIndex);
    if (surahNames && line.line_type == "surah_name") {
        surah_name = surahNames[1].surat_name
        console.log('suratNames', surah_name);
    }
    return (
        <div key={`page-${line.page_number}-line-${line.line_number}`} className="py-1">
            {line.line_type === "surah_name" && (
                <p style={{ textAlign: line.is_centered ? "center" : "justify" }} className="text-xl font-bold">{surah_name}
                </p>
            )}
            {line.line_type === "basmallah" && <p style={{ textAlign: "center" }}>﷽</p>}
            {line.line_type === "ayah" && (
                <>
                    <p dir="rtl" style={{ textAlign: line.is_centered ? "center" : "justify" }} className="text-base">
                        {line.words.map((w) => w.ar).join(" ")}
                    </p>
                </>
            )}
        </div>
    );
}