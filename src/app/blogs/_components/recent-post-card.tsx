import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRecentBlogPosts } from "@/data/domain-dal";
import Link from "next/link";

interface RecentPostCardProps {
  postData: Awaited<ReturnType<typeof getRecentBlogPosts>>[number];
}
export function RecentPostCard({ postData }: RecentPostCardProps) {
  return (
    <article className="group">
      <Link
        href={
          process.env.NODE_ENV === "production"
            ? `https://${postData.user?.username}.${process.env.NEXT_PUBLIC_ORIGIN_DOMAIN}/blog/${postData.post.slug}`
            : `http://${postData.user?.username}.localhost:3000/blog/${postData.post.slug}`
        }
        target="_blank"
        className="block p-6 bg-card rounded-xl border border-border hover:shadow-sm transition-all w-full"
      >
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-10 h-10 border-1 border-primary/10">
            <AvatarImage
              src={postData.user?.image || ""}
              alt={postData.user?.username || ""}
            />
            <AvatarFallback className="font-medium bg-primary/5">
              {postData.user?.name.charAt(0) || ""}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium lowercase">{postData.user?.name}</div>
            <div className="mb-2 text-sm text-muted-foreground">
              {" "}
              <time dateTime={postData.post?.createdAt.toISOString()}>
                {postData.post?.createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-medium mb-2 group-hover:text-rose-600 transition-colors">
          {postData.post?.title}
        </h3>
        <p className="text-muted-foreground mb-3 line-clamp-2">
          {postData.post?.excerpt}
        </p>
      </Link>
    </article>
  );
}
