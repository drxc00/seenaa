import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider >
      <DashboardSidebar />
      <main className=" p-2">
        {children}
      </main>
    </SidebarProvider>
  );
}
