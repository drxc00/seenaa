"use client";

import { PiPaperPlaneThin } from "react-icons/pi";
import { SignOutButton } from "./signout-button";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { ExternalLink, Home, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

export function DashboardNavbar() {
  const pathName = usePathname();
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();
  const blogDomain = session?.user?.username;

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
          <Link
            href={
              process.env.NODE_ENV === "production"
                ? `https://${blogDomain}.${process.env.NEXT_PUBLIC_ORIGIN_DOMAIN}`
                : `http://${blogDomain}.localhost:3000`
            }
            target="_blank"
          >
            <Button disabled={isPending} size="lg" variant="outline">
              <ExternalLink className="h-4 w-4" />
              <span>blog</span>
            </Button>
          </Link>
          {pathName === "/home" ? (
            <Link href="/profile">
              <Button size="lg" variant="outline">
                <UserRound className="h-4 w-4" />
                <span>profile</span>
              </Button>
            </Link>
          ) : (
            <Link href="/home">
              <Button size="lg" variant="outline">
                <Home className="h-4 w-4" />
                <span>home</span>
              </Button>
            </Link>
          )}
          <SignOutButton />
        </div>
      </CardContent>
    </Card>
  );
}
