import React from "react";

export default function Item({data}) {
    const ayat = data
    const translation = ayat.highlighted ? ayat.highlighted : ayat.translation_aya_text

    return (
        <li keys={`${ayat.sura_id}_${ayat.aya_id}`} className="p-4 bg-gray-100 rounded">
            <p className="font-semibold">
                Ayat {ayat.aya_number}
            </p>
            <p className="text-lg align-right">{ayat.aya_text}</p>
            {translation}
        </li>
    )
}