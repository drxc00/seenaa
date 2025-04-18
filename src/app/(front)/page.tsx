// import { Icon } from "@/components/icon";
// import { Button } from "@/components/ui/button";
// import { SignOutButton } from "@/components/signout-button";
// import Link from "next/link";
// import { PiGithubLogo } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PiGithubLogo } from "react-icons/pi";

export default async function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center p-4">
        {/* <section className="max-w-md w-full space-y-6">
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
                  <Button size="lg" className="w-full cursor-pointer">
                    Go to Home
                  </Button>
                </Link>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button size="lg" className="w-full cursor-pointer">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full cursor-pointer"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            <Link href="/blogs">
              <Button
                size="lg"
                variant="secondary"
                className="w-full cursor-pointer"
              >
                View all blogs
              </Button>
            </Link>
            <Link href="https://github.com/drxc00/seenaa" target="_blank">
              <Button size="lg" variant="link" className="w-full">
                <PiGithubLogo className="h-4 w-4" />
                Check out the code
              </Button>
            </Link>
          </div>
        </section> */}

        <main className="flex-1">
          <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight lowercase">
              Write, Share, <span className="font-normal">with seenaa.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
              An open-source writing platform where ideas find their voice.
              Create your personal space and let your words resonate.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/home">
                  <Button size="lg">Start Writing</Button>
                </Link>
                <Link href="https://github.com/drxc00/seenaa" target="_blank">
                  <Button size="lg" variant="outline" className="w-full">
                    <PiGithubLogo className="h-4 w-4" />
                    Check out the code
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <div className="w-full max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* View All Blogs */}
              <Link href="/blogs" className="group">
                <div className="relative overflow-hidden border border-border rounded-xl p-8 h-48 flex flex-col justify-between transition-all">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-light">blogs</h3>
                    <span className="text-xs text-muted-foreground px-2 py-1 rounded-full border border-border">
                      24 writers
                    </span>
                  </div>

                  <div className="flex -space-x-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border border-background z-30">
                      <span className="text-xs">N</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border border-background z-20">
                      <span className="text-xs">S</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border border-background z-10">
                      <span className="text-xs">A</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border border-background">
                      <span className="text-xs">+</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Discover writers
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>

              {/* View All Posts */}
              <Link href="/posts" className="group">
                <div className="relative overflow-hidden border border-border rounded-xl p-8 h-48 flex flex-col justify-between transition-all duration-300 ">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-light">posts</h3>
                    <span className="text-xs text-muted-foreground px-2 py-1 rounded-full border border-border">
                      86 stories
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="w-2/3 h-1.5 bg-secondary rounded-full"></div>
                    <div className="w-1/2 h-1.5 bg-secondary rounded-full"></div>
                    <div className="w-3/4 h-1.5 bg-secondary rounded-full"></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Explore content
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </main>
    </>
  );
}
