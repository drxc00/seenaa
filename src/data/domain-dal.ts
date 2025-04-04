import "server-only";
import { db } from "@/db/drizzle";
import { eq, and } from "drizzle-orm";
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

export async function getBlogData(domain: string) {
  /**
   * Fetches the blog data from the database
   * This includes the user and their posts
   */

  /** Get the user id first */
  const userData = await db
    .select()
    .from(user)
    .where(eq(user.username, domain));

  if (!userData) return null; // No user found

  /** Get user data and user published posts */
  const posts = await db
    .select()
    .from(post)
    .where(and(eq(post.userId, userData[0].id), eq(post.published, true)));

  // Returns the user data and posts
  return { user: userData[0], posts };
}
