
export function getSurahNameByPage(surahList, pageNumber) {
    return surahList.filter(surah => {
        if (pageNumber == surah.page) {
            return surah
        } else if (pageNumber >= surah.page && pageNumber < surah.page_end){
            return surah
        }
    });
}
  