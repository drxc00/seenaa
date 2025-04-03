import { PiPaperPlaneThin } from "react-icons/pi";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="flex flex-row items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
          <PiPaperPlaneThin className="h-6 w-6" />
          <span>seenaa</span>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} seenaa. All rights reserved.
        </div>
      </div>
    </main>
  );
}
