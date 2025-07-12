import suratList from "../../assets/surat/daftar_surah.json";

export default function Home() {
    return (
        <div className="w-100 mx-auto py-6 text-white">
        {/* {Object.entries(groupedSurahs).map(([juz, surahList]) => ( */}
          <div key={1} className="mb-6">
            {/* <h2 className="text-sm text-gray-400 font-medium mb-2">Juz' {1}</h2> */}
            <h2 className="text-lg text-gray-400 font-medium mb-2 p-6">
              Daftar Surat
            </h2>
            <div className="space-y-2">
              {suratList.data.map((surah) => (
                <a key={surah.id} href={`/page/${surah.page}`} className="flex items-center justify-between bg-white-800 p-6 rounded hover:bg-gray-100 transition">
                  <div className="w-80">
                    <p className="text-base font-semibold">
                      {surah.id}. {surah.surat_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {surah.surat_terjemahan} - {surah.count_ayat} ayat
                    </p>
                  </div>
                  <span className="text-base text-gray-400">{surah.page}</span>
                </a>
              ))}
            </div>
          </div>

      </div>
    );
}
