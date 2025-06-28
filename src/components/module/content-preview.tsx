import React, { ReactNode } from "react";
import {
  FiChevronDown,
  FiCopy,
  FiEdit,
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

const DROPMENU = [
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

const ContentPreviewPanel = ({ children, title }: IContentPreviewPanel) => {
  return (
    <section className="bg-background h-[614px]  overflow-y-auto">
      <Card className="h-full border-none py-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-white/90 font-semibold">{title ?? "Title"}</h3>

          <CustomDropDown trigger={TRIGGER}>
            <DropdownMenu>
              {DROPMENU.map(({ title, icon: Icon }) => {
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
