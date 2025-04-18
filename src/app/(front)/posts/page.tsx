import { getRecentBlogPosts } from "@/data/domain-dal";
import { RecentPostCard } from "./_components/recent-post-card";
import { unstable_cache as cache } from "next/cache";

const cachedRecentPosts = cache(getRecentBlogPosts, ["posts"], {
  revalidate: 3600, // 1 hour
  tags: ["posts"],
});

export default async function PostsPage() {
  const recentPosts = await cachedRecentPosts();
  return (
    <main className="w-full px-4 py-4 md:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-2xl font-semibold">recent posts</h1>
        </div>
      </div>
      <div className="px-14 grid grid-cols-1 gap-8">
        {recentPosts.map((recentPost) => (
          <RecentPostCard key={recentPost.post.id} postData={recentPost} />
        ))}
      </div>

      {recentPosts.length === 0 && (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            No posts available at the moment.
          </p>
        </div>
      )}
    </main>
  );
}
