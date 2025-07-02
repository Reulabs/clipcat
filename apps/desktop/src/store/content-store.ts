import { create } from "zustand";
import { ClipboardItem } from "@/types";

interface IContentStore {
  content: string;
  contentInfo: string;
  selectedItem: ClipboardItem | null;
  updateContent: (content: string) => void;
  updateContentInfo: (info: string) => void;
  setSelectedItem: (item: ClipboardItem | null) => void;
}

const useContentStore = create<IContentStore>((set) => ({
  content: "",
  contentInfo: "",
  selectedItem: null,
  updateContent: (content) => set({ content }),
  updateContentInfo: (info) => set({ contentInfo: info }),
  setSelectedItem: (item) => set({ selectedItem: item }),
}));

export default useContentStore;
