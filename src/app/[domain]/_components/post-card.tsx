import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { post } from "@/db/schema";
import Link from "next/link";

interface PostCardProps {
  post: typeof post.$inferSelect;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden shadow-none transition-all duration-200 hover:shadow-sm p-0">
      <CardContent className="p-4 flex flex-col gap-3">
        <h3 className="text-lg font-semibold line-clamp-2 leading-tight">
          {post?.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={post?.createdAt.toISOString()}>
            {post?.createdAt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
        <p className="text-sm text-muted-foreground">{post?.excerpt}</p>
        <div className="flex items-center justify-between">
          <Link href={`/blog/${post?.slug}`}>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
              <span>Read post</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
