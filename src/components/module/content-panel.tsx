import { FiFileText, FiLink } from "react-icons/fi";
import { truncate_text } from "@/utils/text-util.ts";

type TClipItem = "file" | "link" | "text" | undefined;

interface IContentPanel {
  title: string;
  content: string;
  type?: TClipItem;
}

const ContentIcon = ({ type }: { type?: TClipItem }) => {
  // @ts-ignore

  const iconMap: Record<TClipItem, JSX.Element> = {
    file: <FiFileText aria-label="File" className={"text-chart-1"} />,
    link: <FiLink aria-label="Link" className={"text-chart-1"} />,
    text: <FiFileText aria-label="Text" className={"text-chart-1"} />,
    undefined: <FiFileText aria-label="Unknown" />,
  };

  return (
    <div
      className="bg-[#FFA995]/12  rounded-md
         w-8 h-8 flex items-center justify-center text-white"
    >
      {iconMap[type]}
    </div>
  );
};

const ContentPanel = ({ title, content, type }: IContentPanel) => {
  return (
    <div className="bg-card cursor-pointer px-5 py-6 rounded-2xl space-y-2 shadow-sm">
      <div className="flex  items-center gap-3">
        <ContentIcon type={type} />
        <h6 className="text-white font-semibold text-sm">{title}</h6>
      </div>
      <p className="text-gray-100 text-sm break-words">
        {truncate_text(content, 45)}
      </p>
    </div>
  );
};

export default ContentPanel;
