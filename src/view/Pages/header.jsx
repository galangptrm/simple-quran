import React from "react";
import { HomeIcon } from "lucide-react"; // if using lucide icons
import { Link } from 'react-router-dom';

export default function Header({ surahNames = [], juzNumber = 1}) {
    console.log('Header surahNames', surahNames);

    return (
        <header className="sticky top-0 bg-white z-10 p-4 flex items-center justify-between">
            <Link to="/home" className="text-sm text-grey-600 hover:underline font-medium">
                <HomeIcon size={24} />
            </Link>
            <div className="text-center flex-1">
                {surahNames && (
                    <div id="juz-number" className="lg:text-lg md:text-base sm:text-xs text-gray-500">
                        {surahNames.map((surah) => (` ${surah.surat_name} `))}
                    </div>
                )}
            </div>
            <div className="w-[60px] lg:text-lg md:text-base text-xs text-gray-300">
                Juz {juzNumber}
            </div> {/* Placeholder to balance layout */}
        </header>
      
    );
}