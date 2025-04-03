import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { user, account, session, verification } from "@/db/auth-schema";
import { nextCookies } from "better-auth/next-js";

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
  plugins: [nextCookies()],
});
