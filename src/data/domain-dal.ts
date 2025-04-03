import "server-only";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
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
  const userSubDomain = await db
    .select()
    .from(userBlogDomain)
    .where(eq(userBlogDomain.domain, domain));

  return userSubDomain.length > 0;
}

export async function getUserBlogDomain(userId: string) {
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
  const userWithPosts = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image, // Include image field
      posts: post,
    })
    .from(userBlogDomain)
    .where(eq(userBlogDomain.domain, domain))
    .leftJoin(user, eq(userBlogDomain.userId, user.id)) // Join user table
    .leftJoin(post, eq(post.userId, user.id) && eq(post.published, true)); // Join posts

  if (userWithPosts.length === 0) return null; // No user found

  const userData = {
    id: userWithPosts[0].id,
    name: userWithPosts[0].name,
    email: userWithPosts[0].email,
    image: userWithPosts[0].image, // Include the image in response
  };

  const posts = userWithPosts
    .filter((entry) => entry.posts?.id)
    .map((entry) => entry.posts);

  return { user: userData, posts };
}
