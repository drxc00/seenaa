"use client";

import { PiPaperPlaneThin } from "react-icons/pi";
import { SignOutButton } from "./signout-button";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  AlignJustify,
  ExternalLink,
  Home,
  Moon,
  Sun,
  UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "next-themes";

export function DashboardNavbar() {
  const { theme, setTheme } = useTheme();
  const pathName = usePathname();
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();
  const blogDomain = session?.user?.username;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <Card className="p-0 rounded-lg">
      <CardContent className="p-2 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <PiPaperPlaneThin className="h-8 w-8" />
            <span className="text-lg font-semibold">seenaa</span>
          </div>
        </Link>
        <div className="hidden sm:flex gap-2">
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
          <Button size="lg" variant="outline" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          <SignOutButton />
        </div>

        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" variant="outline">
                <AlignJustify className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="px-4 w-xs">
              <SheetHeader>
                <SheetTitle>seenaa</SheetTitle>
              </SheetHeader>
              <SheetDescription
                aria-describedby="sheet-description"
                aria-hidden
              ></SheetDescription>
              <Link
                href={
                  process.env.NODE_ENV === "production"
                    ? `https://${blogDomain}.${process.env.NEXT_PUBLIC_ORIGIN_DOMAIN}`
                    : `http://${blogDomain}.localhost:3000`
                }
                target="_blank"
              >
                <SheetClose asChild>
                  <Button
                    disabled={isPending}
                    size="lg"
                    variant="outline"
                    className="w-full"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>blog</span>
                  </Button>
                </SheetClose>
              </Link>
              {pathName === "/home" ? (
                <Link href="/profile">
                  <SheetClose asChild>
                    <Button size="lg" variant="outline" className="w-full">
                      <UserRound className="h-4 w-4" />
                      <span>profile</span>
                    </Button>
                  </SheetClose>
                </Link>
              ) : (
                <Link href="/home">
                  <SheetClose asChild>
                    <Button size="lg" variant="outline" className="w-full">
                      <Home className="h-4 w-4" />
                      <span>home</span>
                    </Button>
                  </SheetClose>
                </Link>
              )}
              <Button size="lg" variant="outline" onClick={toggleTheme}>
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
              <SignOutButton />
            </SheetContent>
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
}
