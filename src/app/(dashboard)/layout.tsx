import { getAuthData } from "@/data/auth-data";
import { redirect } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboard-navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authData = await getAuthData();
  if (!authData?.session) redirect("/");

  return (
    <>
      <main className="w-full bg-muted min-h-screen">
        <div className="sticky top-0 z-50 w-full py-4 px-10">
          <DashboardNavbar />
        </div>
        <div className="px-10">{children}</div>
      </main>
    </>
  );
}
