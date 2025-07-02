import { create } from "zustand";

interface SearchStore {
  search: string;
  keywords: string[];
  setSearch: (search: string) => void;
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
  clearKeywords: () => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  search: "",
  keywords: [],
  setSearch: (search) => set({ search }),
  addKeyword: (keyword) =>
    set((state) => ({
      keywords: state.keywords.includes(keyword)
        ? state.keywords
        : [...state.keywords, keyword],
    })),
  removeKeyword: (keyword) =>
    set((state) => ({
      keywords: state.keywords.filter((k) => k !== keyword),
    })),
  clearKeywords: () => set({ keywords: [] }),
}));

export default useSearchStore;
