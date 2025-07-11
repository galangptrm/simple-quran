import { useEffect, useState } from "react";
import surat from "../../assets/surat/1.json";
import Item from "./item";

export default function Home() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [dataList, setAllData] = useState([]);

    useEffect(() => {
        setResults(surat.data)
    },[])

    const handleSearch = () => {
        const q = query.trim().toLowerCase();
        if (!q) return setResults([]);

        setAllData(surat.data)

        const matched = surat.data
            .filter((item) => item.translation_aya_text.toLowerCase().includes(q))
            .map((item) => ({
                ...item,
                highlighted: highlightText(item.translation_aya_text, q),
            }));

        setResults(matched);

        console.log('Matched', matched);
    };

    const highlightText = (text, search) => {
        const esc = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex
        return text.split(new RegExp(`(${esc})`, "gi")).map((part, i) =>
            part.toLowerCase() === search.toLowerCase() ? (
            <span key={i} className="bg-yellow-300">
                {part}
            </span>
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
                {results ? (
                    <ul className="space-y-3">
                        {results.map((item) => {
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