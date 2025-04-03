import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { user, account, session, verification } from "@/db/auth-schema";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { getUserBlogDomain } from "@/data/domain-dal";

export const auth = betterAuth({
  /**
   * Drizzle adapter
   */
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      account,
      session,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    customSession(async ({ user, session }) => {
      /**
       * Since the default provider doesn't return the user's blog domain, we need to get it from the database
       * We do this by creating a custom function to get the user's blog domain
       */
      const userBlogDomain = await getUserBlogDomain(user.id);
      return {
        session,
        user: {
          ...user,
          blogDomain: userBlogDomain,
        },
      };
    }),
  ],
});
