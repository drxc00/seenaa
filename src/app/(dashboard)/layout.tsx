import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getAuthData } from "@/data/auth-data";
import { hasSubDomainSet } from "@/data/domain-dal";
import { DomainReqDialog } from "./dashboard/_components/domain-req-dialog";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authData = await getAuthData();

  const hasDomainSet = await hasSubDomainSet(authData?.user?.id as string);

  return (
    <SidebarProvider className="bg-muted">
      <DashboardSidebar />
      {!hasDomainSet && <DomainReqDialog open />}
      <main className="p-6 w-full">{children}</main>
    </SidebarProvider>
  );
}
