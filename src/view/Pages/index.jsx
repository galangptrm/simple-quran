// src/pages/Mushaf.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import suratList from "../../assets/surat/daftar_surah.json";
import juzList from "../../assets/surat/daftar_juz.json";

import { getSurahNameByPage } from '../../assets/js/getSurahNameByPage';
import { loadPage } from "../../assets/js/loadPage";
import { loadFontForPage, preloadNearbyFonts } from "../../assets/js/loadPageFont";

import Header from "./header";
import Footer from "./footer";
import LineItem from "./line_item";
import Loading from "./loading";

export default function Pages() {

    const { page: pageParam } = useParams();
    const initialPage = parseInt(pageParam, 10) || 1;

    const [page, setPage] = useState(initialPage);
    const [data, setData] = useState({});
    const [fontName, setFontName] = useState("qpc");
    const [shadowPos, setShadow] = useState("shadow-r")
    const [loading, setLoading] = useState(true);
    const [direction, setDirection] = useState("forward"); // or "backward"
    // const [surahNamesIndex, setSurahNamesIndex] = useState(0);

    // const [surahNames, setSurahNames] = useState([]);
    let surahNames = []
    if (suratList.data) {
        surahNames = getSurahNameByPage(suratList.data, page)
        console.log('Surat list', surahNames);
    }

    function getJuzNumber(pageNumber) {
        return juzList.data.filter(juz => pageNumber >= juz.page && pageNumber < juz.page_end)[0].id;
    }
    let juzNumber = getJuzNumber(page)

    useEffect(() => {
        let cancelled = false;
        setLoading(true)
        setData(null); // show loading

        if (page%2 == 0) {
            setShadow("shadow-l")
        } else {
            setShadow("shadow-r")
        }
    
        loadFontForPage(page).then((fontname) => {
            if (cancelled || !fontname) {
                return;
            }
            setFontName(fontname);
            loadPage(page).then((result) => {
                if (!cancelled && result) {
                    setData(result);
                    setLoading(false)
                }
            });
        });

        // Preload surrounding fonts asynchronously
        // preloadNearbyFonts(page);
    
        return () => {
            cancelled = true; // stop stale async updates
        };
    }, [page]);
    
    const pageVariants = {
        initial: (direction) => ({
          rotateY: direction === "forward" ? 90 : -90,
          opacity: 0,
          transformOrigin: direction === "forward" ? "right center" : "left center",
        }),
        animate: {
          rotateY: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: "easeOut" },
        },
        exit: (direction) => ({
          rotateY: direction === "forward" ? -90 : 90,
          opacity: 0,
          transformOrigin: direction === "forward" ? "left center" : "right center",
          transition: { duration: 0.5, ease: "easeIn" },
        }),
    };    
    let surahNamesIndex = 0
    return (
        <div className="flex flex-col min-h-screen w-screen">

            <Header surahNames={surahNames} juzNumber={juzNumber}/>

            {/* Main Content */}
            <main key={page} className={`flex-1 flex items-center justify-center p-4`} style={{ fontFamily : fontName }}>
                <AnimatePresence mode="wait" custom={direction}>

                {!loading && data.lines && (

                    <motion.div
                        custom={direction}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="inset-0 p-4">

                        {data.lines.map((line) => {
                            if (line.line_type == "surah_name") {
                                surahNamesIndex++
                            }
                            return (
                                <LineItem key={`page-${line.page_number}-line-${line.line_number}`} line={line} surahNames={surahNames} surahNamesIndex={surahNamesIndex}/>
                            )
                        })}
                    </motion.div>
                )}
                </AnimatePresence>

                {loading && (
                    <Loading/>
                )}

            </main>
            
            <Footer page={page} setPage={setPage} setDirection={setDirection}/>
            
        </div>
    );
}
