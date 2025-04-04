"use server";

import { withAuthActions } from "@/lib/safe-actions";
import { profileSchema } from "@/lib/zod-schema";
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";

export const updateUserProfile = withAuthActions
  .schema(profileSchema)
  .action(
    async ({
      parsedInput: { userId, name, username, bio, image, email, password },
    }) => {
      try {
        const payload: {
          /** Cause typescipt */
          name?: string;
          username?: string;
          bio?: string;
          image?: string;
          email?: string;
          password?: string;
        } = {
          name,
          username,
          bio,
          image,
          email,
        };

        if (password) {
          /**
           * Conditionally add the password to the payload if provided
           * ctx from better-auth docs.
           * https://www.better-auth.com/docs/authentication/email-password
           * */
          const ctx = await auth.$context;
          const hash = await ctx.password.hash(password);
          payload.password = hash as string;
        }
        // Update user profile
        await db.update(user).set(payload).where(eq(user.id, userId));
        return {
          success: true,
          message: "User profile updated successfully",
        };
      } catch (error) {
        return {
          success: false,
          message: "Failed to update user profile",
          error: error as Error,
        };
      }
    }
  );
