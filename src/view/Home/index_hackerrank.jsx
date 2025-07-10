import { useEffect, useState } from "react";
import surat from "../../quran_db/surat/1.json";
import Item from "./item";

export default function Home() {
    const [text, setText] = useState("");

    useEffect(() => {
        if (!text) return;
        inputting(text)
    },[text])

    const corrections = {
        'inpt': 'input',
        'realy': 'really',
        'wierd': 'weird'
    };

    const autoCorrect = (key) => {
        if (corrections[key] != undefined) {
            let filtered = text.replace(key, corrections[key])
            setText(filtered)
        }
    };

    const inputting = (char) => {
        if (char.slice(-1) == ' ') {
            let words = char.split(' ')
            let word = words[words.length - 2]
            autoCorrect(word)
        }
    };

    return (
        <div className="max-w-xl mx-auto mb-6">
            <div className="flex gap-2">
                <textarea type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Search for a verse or word..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
                />
                {/* <button onClick={handleSearch} className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700"> */}
                {/* Search */}
                {/* </button> */}
            </div>
        </div>
    );
}