import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full">
        <div className="container px-4 md:px-6 items-center justify-center flex flex-col">
          <div className="gap-6 w-full max-w-4xl">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-center tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Tell your story, inspire others, and leave a lasting legacy.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl text-center mx-auto">
                  Seenaa is an open source blogging platform designed to help
                  you share your voice with the world.
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="#get-started">Start Blogging</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
