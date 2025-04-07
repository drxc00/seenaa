import "server-only";
import { db } from "@/db/drizzle";
import { eq, and, desc } from "drizzle-orm";
import { post } from "@/db/schema";
import { user } from "@/db/auth-schema";

export async function isSubDomainValid(domain: string) {
  /**
   * Simply validates if the subdomain is valid or not.
   * Checks the database if the domain exists.
   */
  const userSubDomain = await db
    .select()
    .from(user)
    .where(eq(user.username, domain));

  return userSubDomain.length > 0;
}

export async function getBlogData(domain: string, limit?: number) {
  /**
   * Fetches the blog data from the database
   * This includes the user and their posts
   * Returns the
   */

  /** Get the user id first */
  const userData = await db
    .select()
    .from(user)
    .where(eq(user.username, domain));

  if (!userData) return null; // No user found

  /** Get user data and user published posts */
  // Base query for posts
  // Base query builder
  const postQuery = db
    .select()
    .from(post)
    .where(and(eq(post.userId, userData[0].id), eq(post.published, true)))
    .orderBy(desc(post.createdAt));

  // Add limit if defined
  const posts = limit ? await postQuery.limit(limit) : await postQuery;

  // Returns the user data and posts
  return { user: userData[0], posts };
}

export async function getAllBlogs() {
  const allBlogs = await db
    .select({
      name: user.name,
      username: user.username,
      image: user.image,
      bio: user.bio,
    })
    .from(user)
    .orderBy(desc(user.createdAt));

  return allBlogs;
}

export async function getRecentBlogPosts() {
  /**
   * Returns all post with user data
   * Limits: 6
   */

  const posts = await db
    .select()
    .from(post)
    .leftJoin(user, eq(post.userId, user.id))
    .where(eq(post.published, true))
    .orderBy(desc(post.id))
    .limit(6);

  return posts;
}
