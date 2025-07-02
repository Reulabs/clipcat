import useSearchStore from "@/store/search-store";

const useSearch = () => {
  const {
    search,
    keywords,
    setSearch,
    addKeyword,
    removeKeyword,
    clearKeywords,
  } = useSearchStore();

  return {
    search,
    keywords,
    setSearch,
    addKeyword,
    removeKeyword,
    clearKeywords,
  };
};

export { useSearch };
