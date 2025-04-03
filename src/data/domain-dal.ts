import "server-only";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { userBlogDomain } from "@/db/schema";

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
