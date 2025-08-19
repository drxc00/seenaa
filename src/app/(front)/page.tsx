import { Button } from "@/components/ui/button";
import Link from "next/link";
import PreviewSection from "./_components/preview-section";
import { Suspense } from "react";
import PreviewSectionSkeleton from "./_components/preview-section-skeleton";
import { getAuthData } from "@/data/auth-data";

export default async function Home() {
  const authData = await getAuthData();
  return (
    <>
      <main className="flex flex-col items-center justify-center p-4">
        <main className="flex-1">
          <section className="container mx-auto px-4 py-20 md:py-24 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight lowercase">
              Write, Share, <span className="font-normal">with seenaa.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
              An open-source writing platform where ideas find their voice.
              Create your personal space and let your words resonate. With AI
              stuff too.
            </p>
            <div className="flex flex-col gap-4 items-center justify-center">
              {authData?.session ? (
                <div className="flex flex-col sm:flex-row">
                  <Link href="/home">
                    <Button size="lg">Go to home</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signin">
                    <Button size="lg">Sign in</Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="lg" variant="outline" className="w-full">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
              <Button variant="link" size="sm">
                Check out the code
              </Button>
            </div>
          </section>
          <Suspense fallback={<PreviewSectionSkeleton />}>
            <PreviewSection />
          </Suspense>
        </main>
      </main>
    </>
  );
}
