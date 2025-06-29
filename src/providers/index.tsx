import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/module/app-sidebar";
import { Toaster } from "sonner";
export default function IndexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true} className={"border-0"}>
      <Toaster position={"top-center"} richColors closeButton />
      {/*<AppSidebar/>*/}
      <main>
        {/*<SidebarTrigger/>*/}
        <div className="ml-10">{children}</div>
      </main>
    </SidebarProvider>
  );
}
