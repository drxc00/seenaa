import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getHomePageData } from "@/data/general-data";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { unstable_cache as cache } from "next/cache";

const cachedHomePageData = cache(getHomePageData, ["home-page-data"], {
  revalidate: 3600, // 1 hour
  tags: ["home-page-data"],
});

export default async function PreviewSection() {
  const data = await cachedHomePageData();
  return (
    <div className="w-full max-w-3xl mb-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* View All Blogs */}
        <Link href="/blogs" className="group">
          <div className="relative overflow-hidden border border-border bg-card rounded-xl p-8 h-48 flex flex-col justify-between transition-all">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-light">blogs</h3>
              <span className="text-xs text-muted-foreground px-2 py-1 rounded-full border border-border">
                {data.writerCount} writers
              </span>
            </div>

            <div className="flex -space-x-3 mb-4">
              {data.writerPreview.map((writer, index) => (
                <Avatar
                  key={writer.id}
                  className={cn(
                    "w-8 h-8 rounded-full border border-background",
                    `z-${index + 1 * 10}`
                  )}
                >
                  <AvatarImage src={writer.image || ""} alt={writer.name} />
                  <AvatarFallback>{writer.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border border-background">
                <span className="text-xs">+</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Discover writers
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Link>

        {/* View All Posts */}
        <Link href="/posts" className="group">
          <div className="relative overflow-hidden border border-border bg-card rounded-xl p-8 h-48 flex flex-col justify-between transition-all duration-300 ">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-light">posts</h3>
              <span className="text-xs text-muted-foreground px-2 py-1 rounded-full border border-border">
                {data.postCount} stories
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="w-2/3 h-1.5 bg-secondary rounded-full"></div>
              <div className="w-1/2 h-1.5 bg-secondary rounded-full"></div>
              <div className="w-3/4 h-1.5 bg-secondary rounded-full"></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Explore content
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
