import { useState, useEffect } from "react";
import { FiFileText, FiLink } from "react-icons/fi";
import useContentStore from "@/store/content-store.ts";
import { truncate_text } from "@/utils/text-util.ts";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ContentPreview from "@/components/views/content-preview.tsx";
import { ClipboardItem } from "@/types";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    listener();
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

type TClipItem = "file" | "link" | "text" | undefined;

interface IContentPanel {
  item: ClipboardItem;
  title: string;
  content: string;
  type?: TClipItem;
}

const ContentIcon = ({ type }: { type?: TClipItem }) => {
  const iconMap: Record<TClipItem, JSX.Element> = {
    file: <FiFileText aria-label="File" className="text-chart-1" />,
    link: <FiLink aria-label="Link" className="text-chart-1" />,
    text: <FiFileText aria-label="Text" className="text-chart-1" />,
    undefined: <FiFileText aria-label="Unknown" />,
  };

  return (
    <div className="bg-[#FFA995]/12 rounded-md w-8 h-8 flex items-center justify-center text-white">
      {iconMap[type]}
    </div>
  );
};

const ContentPanel = ({ item, title, content, type }: IContentPanel) => {
  const { updateContent, setSelectedItem } = useContentStore();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const handleClick = () => {
    updateContent(content);
    setSelectedItem(item);
  };

  const PanelContent = (
    <div
      className="bg-card cursor-pointer px-5 py-6 rounded-2xl space-y-2 shadow-sm"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <ContentIcon type={type} />
        <h6 className="text-white font-semibold text-sm">{title}</h6>
      </div>
      <p className="text-gray-100 text-sm break-words">
        {truncate_text(content, 90)}
      </p>
    </div>
  );

  if (isSmallScreen) {
    return (
      <Sheet>
        <SheetTrigger asChild>{PanelContent}</SheetTrigger>
        <SheetContent
          side="right"
          className="bg-card border-0 [&>button]:hidden"
        >
          <ContentPreview />
        </SheetContent>
      </Sheet>
    );
  }

  return PanelContent;
};

export default ContentPanel;
