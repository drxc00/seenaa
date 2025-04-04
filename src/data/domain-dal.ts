import "server-only";
import { db } from "@/db/drizzle";
import { eq, and } from "drizzle-orm";
import { post, userBlogDomain } from "@/db/schema";
import { user } from "@/db/auth-schema";

export async function hasSubDomainSet(userId: string) {
  /**
   * Checks if the user have a subdomain set.
   * This is used for their respective subdomains.
   * For example: drxco.seenaa.xyz
   * "drxco" is the custom subdomain set for the user.
   */

  const userSubDomain = await db
    .select()
    .from(userBlogDomain)
    .where(eq(userBlogDomain.userId, userId));
  return userSubDomain.length > 0;
}

export async function isSubDomainValid(domain: string) {
  /**
   * Simply validates if the subdomain is valid or not.
   * Checks the database if the domain exists.
   */
  const userSubDomain = await db
    .select()
    .from(userBlogDomain)
    .where(eq(userBlogDomain.domain, domain));

  return userSubDomain.length > 0;
}

export async function getUserBlogDomain(userId: string) {
  /**
   * Fetches the subdomain/blog name associated with the user.
   * For example: drxco.seenaa.xyz we want to know if the user is "drxco"
   * This is used to fetch the blog data for the user.
   */
  const userSubDomain = await db
    .select()
    .from(userBlogDomain)
    .where(eq(userBlogDomain.userId, userId));
  return userSubDomain[0]?.domain;
}

export async function getBlogData(domain: string) {
  /**
   * Fetches the blog data from the database
   * This includes the user and their posts
   */

  /** Get the user id first */
  const userId = await db
    .select({ userId: userBlogDomain.userId })
    .from(userBlogDomain)
    .where(eq(userBlogDomain.domain, domain))
    .then((res) => res[0]?.userId);

  if (!userId) return null; // No user found

  /** Get user data and user published posts */
  const userDataPromise = db.select().from(user).where(eq(user.id, userId));
  const postsPromise = db
    .select()
    .from(post)
    .where(and(eq(post.userId, userId), eq(post.published, true)));

  const [userData, posts] = await Promise.all([userDataPromise, postsPromise]);

  // Returns the user data and posts
  return { user: userData[0], posts };
}
