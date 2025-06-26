import React, { ReactNode } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface IContentPreviewPanel {
  children?: ReactNode;
  title?: string;
}

const ContentPreviewPanel = ({ children, title }: IContentPreviewPanel) => {
  return (
    <section className="bg-background h-[614px] p-4 overflow-y-auto">
      <Card className="h-full border-none py-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-white/90 font-semibold">{title ?? "Title"}</h3>
          <div className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-white/6">
            <FiMoreHorizontal size={20} color="#fff" />
          </div>
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
      </Card>
    </section>
  );
};

export default ContentPreviewPanel;
