import React, { ReactNode } from "react";
import {
  FiChevronDown,
  FiCopy,
  FiEdit,
  FiFileText,
  FiLink,
  FiMoreHorizontal,
  FiShare,
  FiTrash,
  FiTrash2,
} from "react-icons/fi";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui";
import CustomDropDown from "@/components/module/drop-down-module.tsx";
import { DropdownMenu } from "@/components/ui";

interface IContentPreviewPanel {
  children?: ReactNode;
  title?: string;
}

const TRIGGER = (
  <div className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full bg-white/6">
    <FiMoreHorizontal size={20} color="#fff" />
  </div>
);

const DROPDOWNMENU = [
  {
    title: "Copy",
    icon: FiCopy,
  },
  {
    title: "Share",
    icon: FiShare,
  },
  {
    title: "Edit",
    icon: FiEdit,
  },
  {
    title: "Remove",
    icon: FiTrash2,
  },
];

const iconMap: Record<TClipItem, JSX.Element> = {
  file: <FiFileText aria-label="File" className={"text-chart-1"} />,
  link: <FiLink aria-label="Link" className={"text-chart-1"} />,
  text: <FiFileText aria-label="Text" className={"text-chart-1"} />,
  undefined: <FiFileText aria-label="Unknown" />,
};

const ContentPreviewPanel = ({
  children,
  title,
  type,
}: IContentPreviewPanel) => {
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
              {DROPDOWNMENU.map(({ title, icon: Icon }) => {
                const titleIsRemove = title.toLowerCase() === "remove";
                return (
                  <div
                    className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-muted/5"
                    key={title}
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
          className=" h-[calc(340px-20px)] bg-[var(--big-surface)] mx-6
                    py-6 rounded-lg"
        >
          {children}
        </CardContent>

        <CardContent
          className=" h-[140px] bg-[var(--big-surface)] mx-6
                    py-6 rounded-lg"
        >
          {children}
        </CardContent>

        <div className={"flex justify-center"}>
          <Button
            className={
              "bg-[var(--big-surface)]  cursor-pointer text-[var(--text-link)] rounded-full text-xs font-medium w-40 "
            }
          >
            <FiChevronDown /> See more
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default ContentPreviewPanel;
