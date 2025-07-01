import React from "react";

export default function Item({data}) {
    const ayat = data
    return (
        <li key={ayat.aya_id} className="p-4 bg-gray-100 rounded">
            <p className="text-lg font-semibold">
                Ayat {ayat.aya_number}
            </p>
            <p>{ayat.translation_aya_text}</p>
            <p>{ayat.aya_text}</p>
        </li>
    )
}