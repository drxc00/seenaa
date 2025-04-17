// import Navbar from "@/components/front-navbar";
import { getAllBlogs, getRecentBlogPosts } from "@/data/domain-dal";
import { RecentPostCard } from "./_components/recent-post-card";
import { BlogCard } from "./_components/blog-card";

export const dynamic = "force-dynamic";

export default async function PublicBlogs() {
  const [allBlogs, recentPosts] = await Promise.all([
    getAllBlogs(),
    getRecentBlogPosts(),
  ]);
  return (
    <div>
      {/* <Navbar /> */}
      <main className="w-full px-4 py-4 md:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center mb-8">
            <h1 className="text-2xl font-semibold md:text-3xl">blogs</h1>
          </div>
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allBlogs.map((blog) => (
              <BlogCard blog={blog} key={blog.username} />
            ))}
          </section>

          {allBlogs.length === 0 && (
            <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <p className="text-muted-foreground">
                No blogs available at the moment.
              </p>
            </div>
          )}

          <section className="mt-20">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              recent posts
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((recentPost) => (
                <RecentPostCard
                  key={recentPost.post.id}
                  postData={recentPost}
                />
              ))}
            </div>

            {recentPosts.length === 0 && (
              <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <p className="text-muted-foreground">
                  No posts available at the moment.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
