import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogData, isSubDomainValid } from "@/data/domain-dal";
import { Calendar } from "lucide-react";
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
    <main className="min-h-screen w-full max-w-5xl mx-auto py-16 px-4 sm:px-6">
      <div className="flex flex-col items-center mb-12 space-y-4">
        <Avatar className="w-20 h-20 border-2 border-primary/10 shadow-sm">
          <AvatarImage src={blogData?.user.image || ""} alt={domain} />
          <AvatarFallback className="text-lg font-medium bg-primary/5">
            {blogData?.user.name?.[0] || ""}
          </AvatarFallback>
        </Avatar>
        <h1 className="font-bold text-3xl tracking-tight">
          {blogData?.user.name}
        </h1>
        {/* {blogData?.user.bio && (
          <p className="text-muted-foreground text-center max-w-md">
            {blogData.user.bio}
          </p>
        )} */}
      </div>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Recent Posts
          </h2>
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
              className="overflow-hidden transition-all duration-200 hover:shadow-md p-0"
            >
              <CardContent className="p-4 flex flex-col gap-3">
                <h3 className="text-xl font-bold line-clamp-2 leading-tight">
                  {post?.title}
                </h3>

                {/* {post?.excerpt && (
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                )} */}
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
                      Read post
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
