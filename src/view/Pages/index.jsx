// src/pages/Mushaf.jsx
import { useEffect, useState } from "react";
import { loadPage } from "../../assets/js/loadPage";
import { loadFontForPage } from "../../assets/js/loadPageFont";

export default function Pages() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState({});

    useEffect(() => {
        let cancelled = false;
        setData(null); // show loading
    
        loadFontForPage(page).then(() => {
            loadPage(page).then((result) => {
                console.log('Result', result);
                if (!cancelled && result) {
                    setData(result);
                }
            });
        });
    
        return () => {
            cancelled = true; // stop stale async updates
        };
    }, [page]);
    
    if (!data?.lines) {
      return <p>Loading page {page}…</p>;
    }
    

    return (
        <div key={`page-${page}`} className="mx-auto p-4 font-qpc">
        {data.lines && data.lines.map(line => (
            <div key={`page-${page}-line-${line.line_number}`} className="py-1">
            {line.line_type === "surah_name" && (
                <p style={{textAlign: line.is_centered ? "center" : "justify"}}
                    className="text-xl font-bold">سورة {line.surah_number}
                </p>
            )}
            {line.line_type === "basmallah" && <p style={{textAlign: "center"}}>﷽</p>}
            {line.line_type === "ayah" && (
                <>
                    <p dir="rtl" style={{textAlign: line.is_centered ? "center" : "justify"}}
                        className="text-base leading-snug font-qpc">
                        {line.words.map(w => w.ar).join(" ")}
                    </p>
                    <p className="text-sm text-gray-700">
                        {line.words.map(w => w.id).join(" ")}
                    </p>
                </>
            )}
            </div>
        ))}

        <footer className="flex justify-between mt-6">
            <button disabled={page === 1}   onClick={() => setPage(page-1)}>← Prev</button>
            <span>Page {page}/604</span>
            <button disabled={page === 604} onClick={() => setPage(page+1)}>Next →</button>
        </footer>
        </div>
    );
}
