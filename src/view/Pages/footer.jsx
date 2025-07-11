import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // if using lucide icons
import { toArabicNumber } from "../../assets/js/arabicNumber";

export default function Footer({page, setPage, setDirection}) {

    function nextPage() {
        setDirection("forward")
        setPage(page+1)
    }

    function previousPage() {
        setDirection("backward")
        setPage(page-1)
    }

    return (
        <footer className="sticky bottom-0 bg-white z-10">
            <div className="flex justify-between items-center h-16 px-4">
                <button disabled={page === 604}
                    onClick={() => nextPage()}
                    className="p-2 disabled:opacity-30">
                    <ChevronLeft size={24} />
                </button>

                <span className="text-lg font-semibold">
                    {toArabicNumber(page)}
                </span>

                <button disabled={page === 1}
                    onClick={() => previousPage()}
                    className="p-2 disabled:opacity-30">
                    <ChevronRight size={24} />
                </button>
            </div>
        </footer>
    );
}