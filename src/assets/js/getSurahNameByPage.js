
export function getSurahNameByPage(surahList, pageNumber) {
    return surahList.filter(surah => surah.page === pageNumber);
}
  