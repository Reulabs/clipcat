import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/module/app-sidebar";

export default function IndexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true} className={"border-0"}>
      {/*<AppSidebar/>*/}
      <main>
        {/*<SidebarTrigger/>*/}
        <div className="ml-10">{children}</div>
      </main>
    </SidebarProvider>
  );
}
