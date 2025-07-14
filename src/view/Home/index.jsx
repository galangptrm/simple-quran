import suratList from "../../assets/surat/daftar_surah.json";
import { Link } from 'react-router-dom';

export default function Home() {
    return (
      <>
        <div className="sticky top-0 bg-black z-10 p-4">
          <h2 className="text-lg text-white font-medium">
            Daftar Surat
          </h2>
        </div>
        <div className="w-full mx-auto px-4 py-6">
          <div key={1} className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {suratList.data.map((surah) => (
                <Link key={surah.id} to={`/page/${surah.page}`} className="flex items-center justify-between bg-white-800 p-6 rounded hover:bg-gray-100 transition">
                  <div className="w-80">
                    <p className="text-base font-semibold">
                      {surah.id}. {surah.surat_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {surah.surat_terjemahan} - {surah.count_ayat} ayat
                    </p>
                  </div>
                  <span className="text-base text-gray-400">{surah.page}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}
