import { getBlogData } from "@/data/domain-dal";
import { PostCard } from "../_components/post-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const blogData = await getBlogData(domain);

  return (
    <main className="w-full max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <Link
        href={
          process.env.NODE_ENV === "production"
            ? `https://${domain}.${process.env.NEXT_PUBLIC_ORIGIN_DOMAIN}`
            : `http://${domain}.localhost:3000`
        }
      >
        <Button variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          back
        </Button>
      </Link>
      <h1 className="text-3xl font-semibold">blogs</h1>
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
