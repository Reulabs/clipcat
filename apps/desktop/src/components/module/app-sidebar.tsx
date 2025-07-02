import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { FiBookmark, FiClock, FiSettings } from "react-icons/fi";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "History",
    url: "/",
    icon: FiClock,
  },
  {
    title: "Bookmark",
    url: "/bookmark",
    icon: FiBookmark,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: FiSettings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className={"border-0"}>
      <SidebarContent className={"border-0 bg-[var(--bg-surface-sunken)]"}>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
