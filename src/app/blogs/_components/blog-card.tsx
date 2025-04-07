import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllBlogs } from "@/data/domain-dal";
import Link from "next/link";

interface BlogCardProps {
  blog: Awaited<ReturnType<typeof getAllBlogs>>[number];
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      key={blog.username}
      href={
        process.env.NODE_ENV === "production"
          ? `https://${blog.username}.${process.env.NEXT_PUBLIC_ORIGIN_DOMAIN}`
          : `http://${blog.username}.localhost:3000`
      }
    >
      <Card className="h-full p-0 shadow-none hover:shadow rounded-xl">
        <CardContent className="py-4 px-4 text-center flex flex-col gap-4">
          <CardHeader className="flex flex-col items-center text-center pt-2">
            <Avatar className="h-10 w-10 md:h-14 md:w-14">
              <AvatarImage src={blog.image || ""} alt={blog.name} />
              <AvatarFallback>{blog.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg md:text-xl lowercase">
              {blog.name}
            </CardTitle>
            <CardDescription className="text-sm">
              @{blog.username}
            </CardDescription>
          </CardHeader>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {blog.bio || "no bio available"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
