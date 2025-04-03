import "server-only";
import { db } from "@/db/drizzle";
import { post } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { user } from "@/db/auth-schema";

export async function getPostData(postId: string) {
  const postData = await db
    .select({
      postTitle: post.title,
      postContent: post.content,
      postPublished: post.published,
    })
    .from(post)
    .where(eq(post.id, postId));

  return postData;
}

export async function getPostDataFromSlug(slug: string) {
  const postData = await db
    .select({
      postTitle: post.title,
      postId: post.id,
      postContent: post.content,
      postPublished: post.published,
      postCreatedAt: post.createdAt,
      user: user,
    })
    .from(post)
    .where(eq(post.slug, slug))
    .leftJoin(user, eq(post.userId, user.id))
    .limit(1);

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
