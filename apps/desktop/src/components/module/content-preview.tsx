import { ReactNode, useState } from "react";
import {
  FiChevronDown,
  FiCopy,
  FiEdit,
  FiFileText,
  FiLink,
  FiMoreHorizontal,
  FiShare,
  FiTrash2,
} from "react-icons/fi";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui";
import CustomDropDown from "@/components/module/drop-down-module.tsx";
import { DropdownMenu } from "@/components/ui";
import { toast } from "sonner";
import { invoke } from "@tauri-apps/api/core";
import useContentStore from "@/store/content-store";

type TClipItem = "file" | "link" | "text";
interface IContentPreviewPanel {
  children: ReactNode;
  title?: string;
  type?: TClipItem;
  clipInfo?: any;
}

const TRIGGER = (
  <div className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full bg-white/6">
    <FiMoreHorizontal size={20} color="#fff" />
  </div>
);

const iconMap: Record<TClipItem, JSX.Element> = {
  file: <FiFileText aria-label="File" className={"text-chart-1"} />,
  link: <FiLink aria-label="Link" className={"text-chart-1"} />,
  text: <FiFileText aria-label="Text" className={"text-chart-1"} />,
};

const ContentPreviewPanel = ({
  children,
  title,
  type = "text",
  clipInfo,
}: IContentPreviewPanel) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const { updateContent } = useContentStore();

  const toggleShowMore = () => setShowMoreInfo((prev) => !prev);

  const handleCopy = () => {
    if (!clipInfo?.content) return;
    navigator.clipboard.writeText(clipInfo.content);
    toast.success("Copied to clipboard");
  };

  const handleShare = async () => {
    if (!clipInfo?.content) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: clipInfo.content,
        });
      } catch (error) {
        toast.error("Error sharing content");
      }
    } else {
      handleCopy();
    }
  };

  const handleRemove = async () => {
    if (!clipInfo?.timestamp) return;
    try {
      await invoke("remove_item", { timestamp: clipInfo.timestamp });
      updateContent("");
      toast.success("Item removed");
    } catch (error) {
      toast.error("Error removing item");
    }
  };

  const handleEdit = () => {
    toast.info("Edit functionality is not yet available.");
  };

  const dropdownMenu = [
    { title: "Copy", icon: FiCopy, action: handleCopy },
    { title: "Share", icon: FiShare, action: handleShare },
    { title: "Edit", icon: FiEdit, action: handleEdit },
    { title: "Remove", icon: FiTrash2, action: handleRemove },
  ];

  return (
    <section className="bg-background h-[614px]  overflow-y-auto">
      <Card className="h-full border-none py-2">
        <CardHeader className="flex mt-2 flex-row items-center justify-between">
          <div className={"flex items-center gap-2"}>
            <div
              className="bg-[#FFA995]/12  rounded-md
         w-8 h-8 flex items-center justify-center text-orange-600"
            >
              {iconMap[type]}
            </div>
            <h3 className="text-white/90 font-semibold text-sm">
              {title ?? "Untitled"}
            </h3>
          </div>
          <CustomDropDown trigger={TRIGGER}>
            <DropdownMenu>
              {dropdownMenu.map(({ title, icon: Icon, action }) => {
                const titleIsRemove = title.toLowerCase() === "remove";
                return (
                  <div
                    className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-muted/5"
                    key={title}
                    onClick={action}
                  >
                    <Icon size={14} color={titleIsRemove ? "red" : "white"} />
                    <span
                      className={`text-xs ${titleIsRemove ? "text-red-600" : ""}`}
                    >
                      {title}
                    </span>
                  </div>
                );
              })}
            </DropdownMenu>
          </CustomDropDown>
        </CardHeader>

        <CardContent
          className={`transition-all duration-500 bg-[var(--big-surface)] mx-6 rounded-lg overflow-y-auto text-sm
    ${showMoreInfo ? "h-[calc(340px-20px)] py-6" : "h-[calc(480px-20px)] py-6"}
  `}
        >
          {children}
        </CardContent>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden mx-6 rounded-lg bg-[var(--big-surface)] ${
            showMoreInfo ? "max-h-[140px] py-6" : "max-h-0 py-0"
          }`}
        >
          <CardContent className="text-sm text-white/80">
            {clipInfo && (
              <div className="flex flex-col gap-2">
                <p>
                  <span className="font-semibold">Source App:</span>{" "}
                  {clipInfo.app}
                </p>
                <p>
                  <span className="font-semibold">Timestamp:</span>{" "}
                  {clipInfo.timestamp}
                </p>
              </div>
            )}
          </CardContent>
        </div>

        <div className={"flex justify-center"}>
          <Button
            className="bg-[var(--big-surface)] cursor-pointer text-[var(--text-link)] rounded-full text-xs font-medium w-40 flex items-center gap-1"
            onClick={toggleShowMore}
          >
            <FiChevronDown
              className={`transition-transform duration-300 ${
                showMoreInfo ? "rotate-180" : ""
              }`}
            />
            {showMoreInfo ? "See less" : "See more"}
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default ContentPreviewPanel;
