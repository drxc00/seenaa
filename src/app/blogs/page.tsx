import { Icon } from "@/components/icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllBlogs } from "@/data/domain-dal";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PublicBlogs() {
  const allBlogs = await getAllBlogs();

  return (
    <main className="min-h-screen w-full px-4 py-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center mb-8 ">
          <div className="flex flex-col items-center justify-center gap-3">
            <Icon />
            <h1 className="text-2xl font-semibold md:text-3xl">blogs</h1>
          </div>
          <Link
            href={
              process.env.NODE_ENV === "production"
                ? `https://${process.env.NEXT_PUBLIC_ORIGIN_DOMAIN}`
                : `http://localhost:3000`
            }
          >
            <Button variant="link">seenaa.xyz</Button>
          </Link>
        </div>
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allBlogs.map((blog) => (
            <Link
              key={blog.username}
              href={
                process.env.NODE_ENV === "production"
                  ? `https://${blog.username}.${process.env.NEXT_PUBLIC_ORIGIN_DOMAIN}`
                  : `http://${blog.username}.localhost:3000`
              }
            >
              <Card className="h-full p-0">
                <CardContent className="py-4 px-0 text-center flex flex-col gap-4">
                  <CardHeader className="flex flex-col items-center text-center pt-2">
                    <Avatar className="h-10 w-10 md:h-14 md:w-14">
                      <AvatarImage src={blog.image || ""} alt={blog.name} />
                      <AvatarFallback>{blog.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg md:text-xl lowercase">
                      {blog.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      @{blog.username}
                    </CardDescription>
                  </CardHeader>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {blog.bio || "no bio available"}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>

        {allBlogs.length === 0 && (
          <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              No blogs available at the moment.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
