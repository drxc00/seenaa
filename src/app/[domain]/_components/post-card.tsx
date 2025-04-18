import { ArrowRight } from "lucide-react";
import { post } from "@/db/schema";
import Link from "next/link";

interface PostCardProps {
  post: typeof post.$inferSelect;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link
        href={`/blog/${post?.slug}`}
        className="block p-6 rounded-xl border border-border bg-card hover:shadow-sm transition-all"
      >
        <div className="mb-2 text-sm text-muted-foreground">
          {" "}
          <time dateTime={new Date(post?.createdAt).toISOString()}>
            {new Date(post?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
        <h3 className="text-lg font-medium mb-2 ">{post?.title}</h3>
        <p className="text-muted-foreground mb-3 line-clamp-2">
          {post?.excerpt}
        </p>
        <div className="flex items-center text-sm font-medium text-muted-foreground ">
          Read post <ArrowRight size={16} className="ml-1" />
        </div>
      </Link>
    </article>
  );
}
