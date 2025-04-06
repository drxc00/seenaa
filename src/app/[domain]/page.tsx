import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogData, isSubDomainValid } from "@/data/domain-dal";
import { PostCard } from "./_components/post-card";
import Link from "next/link";
import { notFound } from "next/navigation";

type BlogData = Awaited<ReturnType<typeof getBlogData>>;
type BlogPageProps = {
  params: Promise<{ domain: string }>;
};

export async function generateMetadata({ params }: BlogPageProps) {
  const { domain } = await params;
  return {
    title: `${domain} | seenaa`,
    description: `Blog of ${domain}`,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { domain } = await params;

  if (!(await isSubDomainValid(domain))) {
    return notFound();
  }

  // Limits the posts to 6 for the home page
  const blogData: BlogData = await getBlogData(domain, 6);

  return (
    <main className="w-full max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <Card className="w-full p-0 shadow-none">
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
          </div>
        </CardContent>
      </Card>
      <section className="mt-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <h2 className="text-lg font-semibold tracking-tight">about me</h2>
          </div>
          {blogData?.user?.bio && (
            <p className="text-muted-foreground">{blogData?.user?.bio}</p>
          )}

          {!blogData?.user?.bio && (
            <p className="text-muted-foreground">
              there&apos;s nothing here...
            </p>
          )}
        </div>
      </section>

      <section className="mb-8 mt-16">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight">
              recent posts
            </h2>
          </div>
          <Link href="/blog">
            <Button variant="link" size="sm">
              View all
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {blogData?.posts.map((post) => (
            <PostCard key={post.id} post={post} />
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
