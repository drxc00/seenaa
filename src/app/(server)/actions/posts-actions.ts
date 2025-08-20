"use server";

import { db } from "@/db/drizzle";
import { post } from "@/db/schema";
import { withAuthActions } from "@/lib/safe-actions";
import { textCompletion } from "@/models/completion";
import { generateSlug } from "@/utils/post-utils";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
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
      postTitle: z.string(),
      postContent: z.string(),
      postContentTextOnly: z.string().optional(),
    })
  )
  .action(
    async ({
      parsedInput: { postId, postTitle, postContent, postContentTextOnly },
    }) => {
      try {
        /** Extract the title and content
         *  The title is h1 tag with the id="post-title"
         */

        // const pattern = /<h1[^>]*data-type=["']title["'][^>]*>(.*?)<\/h1>/;
        // // Extract title using regex
        // const titleMatch = postContent.match(pattern);
        // const title = titleMatch ? titleMatch[1].trim() : "Untitled";

        // // Remove the title from content
        // const contentWithoutTitle = postContent.replace(pattern, "").trim();

        // Create an excerpt from the content
        const excerpt =
          postContentTextOnly?.replace(postTitle, "").trim() || "";
        const excerptLimit = 200; // Set the desired excerpt length limit
        const excerptText =
          excerpt.length > excerptLimit
            ? `${excerpt.slice(0, excerptLimit)}...`
            : excerpt;

        await db
          .update(post)
          .set({
            title: postTitle,
            content: postContent,
            excerpt: excerptText,
            slug: generateSlug(postTitle),
            updatedAt: new Date(),
          })
          .where(eq(post.id, postId));

        revalidateTag("blog-data");
        revalidateTag("posts");
        revalidateTag("post-data");
        revalidateTag("home-page-data");

        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          message: (error as Error).message,
        };
      }
    }
  );

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

      revalidateTag("home-page-data");
      revalidateTag("blog-data");
      revalidateTag("posts");

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

      revalidateTag("home-page-data");
      revalidateTag("blog-data");
      revalidateTag("posts");
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

export const deletePost = withAuthActions
  .schema(
    z.object({
      postId: z.string(),
    })
  )
  .action(async ({ parsedInput: { postId } }) => {
    try {
      await db.delete(post).where(eq(post.id, postId));
      revalidateTag("home-page-data");
      revalidateTag("blog-data");
      revalidateTag("posts");
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

export const aiTextCompletion = withAuthActions
  .schema(
    z.object({
      context: z.string(),
      model: z.string(),
    })
  )
  .action(async ({ parsedInput: { context, model } }) => {
    try {
      const generatedText = await textCompletion({ context, model });
      return {
        success: true,
        generatedText: generatedText,
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  });
