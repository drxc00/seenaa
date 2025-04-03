import { CreateNewPostButton } from "@/components/create-new-post-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserPosts } from "@/data/post-dal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function PostsPage() {
  const authData = await auth.api.getSession({
    headers: await headers(),
  });

  const posts = await getUserPosts(authData?.user?.id as string);

  return (
    <main className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl ">posts</h1>
        <CreateNewPostButton />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {posts.map((post) => (
          <Card key={post.id} className="p-0">
            <CardContent className="p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-lg">{post.title}</h1>
                <Badge>{post.published ? "Published" : "Draft"}</Badge>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-muted-foreground">
                  Created at: {post.createdAt.toDateString()}
                </p>
                <p className="text-muted-foreground">
                  Updated at: {post.updatedAt.toDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 w-full">
                <Button variant="outline">View</Button>
                <Link href={`/post/${post.id}`}>
                  <Button>Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
