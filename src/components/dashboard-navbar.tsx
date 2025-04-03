import { PiPaperPlaneThin } from "react-icons/pi";
import { SignOutButton } from "./signout-button";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

export function DashboardNavbar() {
  return (
    <Card className="p-0 rounded-lg">
      <CardContent className="p-2 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <PiPaperPlaneThin className="h-8 w-8" />
            <span className="text-lg font-semibold">seenaa</span>
          </div>
        </Link>
        <div className="flex gap-2">
          <Button>View Blog</Button>
          <SignOutButton />
        </div>
      </CardContent>
    </Card>
  );
}
