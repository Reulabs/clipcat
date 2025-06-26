import React from "react";
import SearchModule from "@/components/module/search.tsx";
import { Sidebar, SidebarTrigger } from "@/components/ui";
import { AppSidebar } from "@/components/module/app-sidebar";
import Sidenav from "@/components/module/sidenav.tsx";
import ContentPanel from "@/components/module/content-panel.tsx";
import ContentPreviewPanel from "@/components/module/content-preview.tsx";

interface IDashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: IDashboardLayoutProps) => {
  return (
    <div className="flex h-screen w-screen bg-background text-foreground !mx-0 !px-0">
      <aside
        className="flex flex-col justify-between w-20 bg-[#1D1D1D]
         items-center p-2"
      >
        <Sidenav />
      </aside>
      <div className=" flex flex-col w-screen">
        <header className="p-4  bg-background">
          <SearchModule />
        </header>

        <main className="flex flex-wrap">
          <section className="  w-full md:w-[450px] min-w-[20rem] p-4">
            <div className="space-y-4">
              <ContentPanel
                title={"User testing interpretation"}
                content={
                  "Let's assume instead that the test was properly con..."
                }
                type={"file"}
              />
            </div>
          </section>

          {/*Preview panel*/}
          <div className={" w-full  lg:w-[600px]"}>
            <ContentPreviewPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
