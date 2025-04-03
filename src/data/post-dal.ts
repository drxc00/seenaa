import "server-only";
import { db } from "@/db/drizzle";
import { post } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getPostData(postId: string) {
  const postData = await db
    .select({
      postTitle: post.title,
      postContent: post.content,
    })
    .from(post)
    .where(eq(post.id, postId));

  return postData;
}

export async function getUserPosts(userId: string) {
  const userPosts = await db
    .select()
    .from(post)
    .where(eq(post.userId, userId))
    .orderBy(desc(post.createdAt));
  return userPosts;
}
