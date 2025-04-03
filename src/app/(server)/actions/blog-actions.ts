"use server";

import { db } from "@/db/drizzle";
import { userBlogDomain } from "@/db/schema";
import { withAuthActions } from "@/lib/safe-actions";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const setBlogName = withAuthActions
  .schema(z.object({ blogName: z.string() }))
  .action(async ({ parsedInput: { blogName }, ctx: { userId } }) => {
    /**
     * Set blog name
     * Update userBlogDomain in db
     */
    try {
      const existing = await db
        .select()
        .from(userBlogDomain)
        .where(eq(userBlogDomain.domain, blogName));

      if (existing.length > 0) {
        /**
         * Blog name already exists
         * Return error
         */
        return {
          success: false,
          message: "Blog name already exists",
        };
      }

      await db
        .insert(userBlogDomain)
        .values({
          domain: blogName,
          userId: userId,
        })
        .onConflictDoNothing();
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  });
