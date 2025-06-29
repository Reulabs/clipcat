import { create } from "zustand";

interface IContentStore {
  content: string;
  contentInfo: string;
  updateContent: (content: string) => void;
  updateContentInfo: (info: string) => void;
}

const useContentStore = create<IContentStore>((set) => ({
  content: "",
  contentInfo: "",
  updateContent: (content) => set({ content }),
  updateContentInfo: (info) => set({ contentInfo: info }),
}));

export default useContentStore;
