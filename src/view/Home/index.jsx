import { useEffect, useState } from "react";
import surat from "../../quran_db//surat/2.json";
import Item from "./item";

export default function Home() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [DataList, setAllData] = useState([]);

    const handleSearch = () => {
        const q = query.trim().toLowerCase();
        if (!q) return setResults([]);

        const matched = quranData
            .filter((item) => item.text.toLowerCase().includes(q))
            .map((item) => ({
                ...item,
                highlighted: highlightText(item.text, q),
            }));

        setResults(matched);

        console.log('Matched', matched);
    };

    const highlightText = (text, search) => {
        const parts = text.split(new RegExp(`(${search})`, "gi"));
        return parts.map((part, i) =>
            part.toLowerCase() === search ? (
                <mark key={i} className="bg-yellow-300">
                {part}
                </mark>
            ) : (
                part
            )
        );
    };

    return (
        <main className="flex-grow p-6 bg-gray-50">
            {/* Search bar */}
            <div className="max-w-xl mx-auto mb-6">
                <div className="flex gap-2">
                    <input type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a verse or word..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <button onClick={handleSearch} className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700">
                    Search
                    </button>
                </div>
            </div>

            {/* Search results */}
            <div className="max-w-xl mx-auto">
            {surat.data && !results ? (
                <ul className="space-y-3">
                    {surat.data.map((item) => {
                        return (
                            <Item data={item}/>
                        )
                    })}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No results yet.</p>
            )}
            </div>
        </main>
    );
}