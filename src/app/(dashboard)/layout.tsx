import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-muted" >
      <DashboardSidebar />
      <main className="p-6 w-full">
        {children}
      </main>
    </SidebarProvider>
  );
}
