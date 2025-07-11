import React from "react";
import { BookOpen } from "lucide-react"; // if using lucide icons

export default function Header({ surahNames = []}) {

    return (
        <header className="sticky top-0 bg-white z-10 p-4 flex items-center justify-between">
            <a href="/home" className="text-sm text-grey-600 hover:underline font-medium">
                <BookOpen size={24} />
            </a>
            <div className="text-center flex-1">
                {surahNames && (
                    <div id="juz-number" className="text-xs text-gray-500">
                        {surahNames.map((surah) => (` ${surah.surat_name} `))}
                    </div>
                )}
            </div>
            <div className="w-[60px] text-xs text-gray-300">
                {surahNames && (
                    <>{surahNames.map((surah) => (`${surah.surat_text}\n`))}</>
                )}
            </div> {/* Placeholder to balance layout */}
        </header>
      
    );
}