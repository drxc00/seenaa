// import Navbar from "@/components/front-navbar";
import { getAllBlogs } from "@/data/domain-dal";
import { BlogCard } from "./_components/blog-card";

export const dynamic = "force-dynamic";

export default async function PublicBlogs() {
  const allBlogs = await getAllBlogs();
  //   getRecentBlogPosts(),
  // ]);
  return (
    <div>
      <main className="w-full px-4 py-4 md:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center mb-8">
            <h1 className="text-2xl font-semibold">blogs</h1>
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
        </div>
      </main>
    </div>
  );
}
