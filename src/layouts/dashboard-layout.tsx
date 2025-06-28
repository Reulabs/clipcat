import React from "react";
import SearchModule from "@/components/module/search.tsx";
import { AppSidebar } from "@/components/module/app-sidebar";
import Sidenav from "@/components/module/sidenav.tsx";
import ContentPanel from "@/components/module/content-panel.tsx";
import ContentPreviewPanel from "@/components/module/content-preview.tsx";

interface IDashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: IDashboardLayoutProps) => {
  return (
    <div className="flex h-screen w-full max-w-[1200px] mx-auto bg-background text-foreground overflow-x-hidden">
      <aside className="flex flex-col justify-between w-16 bg-[#1D1D1D] items-center p-2 shrink-0">
        <Sidenav />
      </aside>

      <div className="flex flex-col flex-1">
        <header className="p-4 bg-background shrink-0">
          <SearchModule />
        </header>

        <main className="flex flex-wrap p-4 gap-4 overflow-x-hidden">
          <section className="w-full md:w-[450px] min-w-[20rem]">
            <ContentPanel
              title={"User testing interpretation"}
              content={"Let's assume instead that the test was properly con..."}
              type={"file"}
            />
          </section>

          <div className="w-full lg:w-[600px]">
            <ContentPreviewPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
