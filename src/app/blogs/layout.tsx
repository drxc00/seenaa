import Navbar from "@/components/front-navbar";
import { PiPaperPlaneThin } from "react-icons/pi";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen container-wrapper">
      <Navbar />
      <div className="flex-grow border border-dashed border-t-0 border-b-0 container mx-auto">
        {children}
      </div>
      <div className="border border-dashed flex items-center justify-center">
        <div className="container flex flex-col justify-center items-center border border-dashed border-t-0 border-b-0 py-4 ">
          <div className="flex flex-row items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
            <PiPaperPlaneThin className="h-6 w-6" />
            <span>seenaa</span>
          </div>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} seenaa. All rights reserved.
          </div>
        </div>
      </div>
    </main>
  );
}
