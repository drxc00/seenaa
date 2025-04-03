"use server";

import { db } from "@/db/drizzle";
import { post } from "@/db/schema";
import { withAuthActions } from "@/lib/safe-actions";
import { generateSlug } from "@/utils/post-utils";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const createNewPost = withAuthActions.action(
  async ({ ctx: { userId } }) => {
    try {
      const [newPost] = await db
        .insert(post)
        .values({
          title: "Untitled",
          userId: userId,
        })
        .returning({ id: post.id });
      return {
        success: true,
        postId: newPost.id,
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }
);

export const savePostContent = withAuthActions
  .schema(
    z.object({
      postId: z.string(),
      postContent: z.string(),
    })
  )
  .action(async ({ parsedInput: { postId, postContent } }) => {
    try {
      /** Extract the title and content
       *  The title is h1 tag with the id="post-title"
       */

      const pattern = /<h1[^>]*data-type=["']title["'][^>]*>(.*?)<\/h1>/;
      // Extract title using regex
      const titleMatch = postContent.match(pattern);
      const title = titleMatch ? titleMatch[1].trim() : "Untitled";

      // Remove the title from content
      const contentWithoutTitle = postContent.replace(pattern, "").trim();

      await db
        .update(post)
        .set({
          title: title,
          content: contentWithoutTitle,
          slug: generateSlug(title),
          updatedAt: new Date(),
        })
        .where(eq(post.id, postId));

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

export const publishPost = withAuthActions
  .schema(
    z.object({
      postId: z.string(),
    })
  )
  .action(async ({ parsedInput: { postId } }) => {
    try {
      await db
        .update(post)
        .set({
          published: true,
        })
        .where(eq(post.id, postId));

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

export const unPublishPost = withAuthActions
  .schema(
    z.object({
      postId: z.string(),
    })
  )
  .action(async ({ parsedInput: { postId } }) => {
    try {
      await db
        .update(post)
        .set({
          published: false,
        })
        .where(eq(post.id, postId));

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
