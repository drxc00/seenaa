import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Card, CardContent } from "./ui/card";
import { Cog, LayoutGrid, NotepadTextDashed, Paperclip } from "lucide-react";
import { PiPaperPlaneThin } from "react-icons/pi";

const menus = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    name: "Posts",
    href: "/dashboard/posts",
    icon: Paperclip,
  },
  {
    name: "Drafts",
    href: "/dashboard/drafts",
    icon: NotepadTextDashed,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Cog,
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar collapsible="offcanvas" variant="floating">
      <SidebarHeader className="flex flex-row items-center justify-center">
        <div className="flex items-center gap-2">
          <Card className="p-0">
            <CardContent className="p-1">
              <PiPaperPlaneThin className="h-6 w-6" />
            </CardContent>
          </Card>
          <span className="text-lg">seenaa </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <Card className="p-0">
                        <CardContent className="p-1">
                          <item.icon className="h-4 w-4" />
                        </CardContent>
                      </Card>
                      <span className="text-md font-semibold">{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
