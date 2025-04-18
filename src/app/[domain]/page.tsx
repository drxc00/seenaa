import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getBlogData, isSubDomainValid } from "@/data/domain-dal";
import { PostCard } from "./_components/post-card";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_cache as cache } from "next/cache";

const cachedBlogData = cache(getBlogData, ["blog-data"], {
  revalidate: 3600, // 1 hour
  tags: ["blog-data"],
});

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
  const blogData: BlogData = await cachedBlogData(domain, 6);

  return (
    <div>
      <main className="w-full max-w-4xl min-h-full mx-auto py-8 px-4 sm:px-6">
        <section className="mb-14 flex flex-col items-center text-center">
          <div className="mb-6 relative">
            <Avatar className="w-14 h-14 border-1 border-primary/10">
              <AvatarImage src={blogData?.user.image || ""} alt={domain} />
              <AvatarFallback className="text-lg font-medium bg-primary/5">
                {blogData?.user.name?.[0] || ""}
              </AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-3xl font-bold mb-1 lowercase">
            {blogData?.user.name}
          </h1>
          <p className="text-gray-500">@{blogData?.user.username}</p>
        </section>

        <section>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <h2 className="text-lg font-semibold inline-block border-b-2 border-gray-200 pb-1">
                about me
              </h2>
            </div>
            {blogData?.user?.bio && (
              <p className="leading-relaxed">{blogData?.user?.bio}</p>
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
              <h2 className="text-lg font-semibold inline-block border-b-2 border-gray-200 pb-1">
                recent posts
              </h2>
            </div>
            <Link href="/blog">
              <Button
                variant="link"
                size="sm"
                className="cursor-pointer font-semibold"
              >
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
    </div>
  );
}
