import { Button } from "@/components/ui/button";
import { getPostDataFromSlug } from "@/data/post-dal";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getPostDataFromSlug(slug);

  const title = postData[0]?.postTitle || "Untitled";
  const content = postData[0]?.postContent || "";

  return (
    <main className="min-h-screen flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span>See all posts</span>
          </Button>
        </Link>

        <article>
          {/* Title and Metadata */}
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-start dark:text-white">
              {title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <p className="font-medium flex items-center gap-1">
                {postData[0]?.user?.name}{" "}
                <span className="text-muted-foreground/80">
                  (@{postData[0]?.user?.username})
                </span>
              </p>
              <span>|</span>
              <p>{postData[0]?.postCreatedAt.toDateString()}</p>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-zinc sm:prose-lg lg:prose-xl dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Created with{" "}
              <Link
                href={
                  process.env.NODE_ENV === "production"
                    ? (process.env.NEXT_ORIGIN_DOMAIN as string)
                    : "http://localhost:3000"
                }
                className="font-semibold"
              >
                seenaa
              </Link>
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
