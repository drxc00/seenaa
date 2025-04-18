import { getBlogData } from "@/data/domain-dal";
import { PostCard } from "../_components/post-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { unstable_cache as cache } from "next/cache";

const cachedBlogData = cache(getBlogData, ["blog-data"], {
  revalidate: 3600, // 1 hour
  tags: ["blog-data"],
});

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const blogData = await cachedBlogData(domain);

  return (
    <main className="w-full max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <Link
        href={
          process.env.NODE_ENV === "production"
            ? `https://${domain}.${process.env.NEXT_PUBLIC_ORIGIN_DOMAIN}`
            : `http://${domain}.localhost:3000`
        }
      >
        <div className="flex flex-row gap-4 items-center">
          <ArrowLeft className="h-4 w-4" />
          <span>back</span>
        </div>
      </Link>
      <h1 className="text-3xl font-semibold mt-4">blogs</h1>
      <section className="mt-6">
        <div className="grid gap-6">
          {blogData?.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
