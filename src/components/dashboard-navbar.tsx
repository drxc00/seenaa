"use client";

import { PiPaperPlaneThin } from "react-icons/pi";
import { SignOutButton } from "./signout-button";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export function DashboardNavbar() {
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();
  const blogDomain = session?.user?.blogDomain;

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
                ? `https://${blogDomain}.${process.env.NEXT_ORIGIN_DOMAIN}`
                : `http://${blogDomain}.localhost:3000`
            }
            target="_blank"
          >
            <Button disabled={isPending} size="lg">
              View Blog
            </Button>
          </Link>
          <SignOutButton />
        </div>
      </CardContent>
    </Card>
  );
}
