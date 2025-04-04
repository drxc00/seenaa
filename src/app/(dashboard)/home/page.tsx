import { CreateNewPostButton } from "@/components/create-new-post-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getAuthData } from "@/data/auth-data";
import { getUserPosts } from "@/data/post-dal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function dashboard() {
  const authData = await getAuthData();

  if (!authData?.session) redirect("/signin");

  const posts = await getUserPosts(authData?.user?.id as string);

  return (
    <main className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl ">posts</h1>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <CreateNewPostButton />
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden p-0">
            <div className="flex justify-between items-start px-4 pt-4">
              <CardTitle className="text-lg font-semibold p-0">
                {post.title}
              </CardTitle>
              <Badge variant={post.published ? "default" : "secondary"}>
                {post.published ? "Published" : "Draft"}
              </Badge>
            </div>
            <CardContent className="px-4 pb-4 flex flex-col gap-4">
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Created: {post.createdAt.toDateString()}</p>
                <p>Updated: {post.updatedAt.toDateString()}</p>
              </div>
              <Link href={`/post/${post.id}`} className="w-full">
                <Button variant="outline" className="w-full justify-between">
                  <span>Open Post</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
