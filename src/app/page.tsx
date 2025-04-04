import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { getAuthData } from "@/data/auth-data";
import { SignOutButton } from "@/components/signout-button";
import Link from "next/link";
import { PiGithubLogo } from "react-icons/pi";

export default async function Home() {
  const authData = await getAuthData();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <section className="max-w-md w-full space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <Icon />
          <div className="space-y-1">
            <h1 className="text-2xl font-medium tracking-tight">seenaa</h1>
            <p className="text-muted-foreground">
              When you&apos;re bored and want to write something
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {authData?.session ? (
            <>
              <Link href="/home">
                <Button size="lg" className="w-full">
                  Go to Home
                </Button>
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button size="lg" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <Link href="https://github.com/drxc00/seenaa" target="_blank">
            <Button size="lg" variant="link" className="w-full">
              <PiGithubLogo className="h-4 w-4" />
              Check out the code
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
