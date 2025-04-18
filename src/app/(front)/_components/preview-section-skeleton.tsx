import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PreviewSectionSkeleton() {
  return (
    <div className="w-full max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Blogs Skeleton */}
        <Link href="/blogs" className="group">
          <div className="relative overflow-hidden border border-border rounded-xl p-8 h-48 flex flex-col justify-between transition-all">
            <div className="flex justify-between items-start">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>

            <div className="flex -space-x-3 mb-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  className={cn(
                    "w-8 h-8 rounded-full",
                    `z-${i + 1 * 10}`
                  )}
                />
              ))}
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>

            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-32" />
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </Link>

        {/* Posts Skeleton */}
        <Link href="/posts" className="group">
          <div className="relative overflow-hidden border border-border rounded-xl p-8 h-48 flex flex-col justify-between transition-all duration-300">
            <div className="flex justify-between items-start">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>

            <div className="space-y-2 mb-4">
              <Skeleton className="h-1.5 w-2/3" />
              <Skeleton className="h-1.5 w-1/2" />
              <Skeleton className="h-1.5 w-3/4" />
            </div>

            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-32" />
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}