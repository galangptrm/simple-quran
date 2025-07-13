import React from "react";

export default function LineItem({line, surahNames, surahNamesIndex=0}) {
    let surah_name = ""
    if (surahNames[surahNamesIndex-1] && line.line_type == "surah_name") {
        surah_name = surahNames[surahNamesIndex-1].surat_name
    }
    return (
        <div key={`page-${line.page_number}-line-${line.line_number}`} className="py-1 md:py-3 lg:py-1 md:my-3 lg:my-3 xl:my-1 text-base md:text-3xl lg:text-3xl xl:text-xl w-screen">
            {line.line_type === "surah_name" && (
                <>
                <hr />
                <p style={{ textAlign: line.is_centered ? "center" : "justify" }} className="text-sm md:text-xl lg:text-2xl font-bold">
                    Surah {surah_name}
                </p>
                <hr />
                </>
            )}
            {line.line_type === "basmallah" && (
                <p className="" style={{ textAlign: "center" }}>
                    ﷽
                </p>)}
            {line.line_type === "ayah" && (
                <p dir="rtl" style={{ textAlign: "center" }} className="">
                    {line.words.map((w) => w.ar).join(" ")}
                </p>
            )}
        </div>
    );
}