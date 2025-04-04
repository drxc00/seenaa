import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogData, isSubDomainValid } from "@/data/domain-dal";
import { ArrowRight, Calendar, Send } from "lucide-react";
import Link from "next/link";

type BlogData = Awaited<ReturnType<typeof getBlogData>>;
type BlogPageProps = {
  params: Promise<{ domain: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { domain } = await params;

  if (!(await isSubDomainValid(domain))) {
    throw new Error("Invalid Seenaa Blog");
  }

  const blogData: BlogData = await getBlogData(domain);

  return (
    <main className="w-full max-w-5xl mx-auto py-10 px-4 sm:px-6">
      <Card className="w-full p-0 shadow-none border-dashed">
        <CardContent className="p-4">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-14 h-14 border-1 border-primary/10">
              <AvatarImage src={blogData?.user.image || ""} alt={domain} />
              <AvatarFallback className="text-lg font-medium bg-primary/5">
                {blogData?.user.name?.[0] || ""}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center space-y-1">
              <h1 className="font-bold text-xl tracking-tight lowercase">
                {blogData?.user.name}
              </h1>
              <p className="text-muted-foreground text-md font-medium">
                @{blogData?.user.username}
              </p>
            </div>
            {blogData?.user.bio && (
              <p className="text-muted-foreground text-center max-w-md">
                {blogData.user.bio}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <section className="mb-8 mt-16">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Send className="w-6 h-6" />
            <h2 className="text-2xl font-semibold tracking-tight">
              recent posts
            </h2>
          </div>
          {blogData?.posts?.length && blogData?.posts?.length > 6 && (
            <Button variant="ghost" size="sm">
              View all
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogData?.posts.map((post) => (
            <Card
              key={post?.id}
              className="overflow-hidden shadow-none transition-all duration-200 hover:shadow-sm p-0"
            >
              <CardContent className="p-4 flex flex-col gap-3">
                <h3 className="text-lg font-semibold line-clamp-2 leading-tight">
                  {post?.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={post?.createdAt.toISOString()}>
                      {post?.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>

                  <Link href={`/${post?.slug}`}>
                    <Button variant="ghost" size="sm" className="font-medium">
                      <span>Read post</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {blogData?.posts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No posts yet. Check back soon!</p>
          </div>
        )}
      </section>
    </main>
  );
}
