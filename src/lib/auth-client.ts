import { createAuthClient } from "better-auth/react";
import {
  customSessionClient,
  usernameClient,
} from "better-auth/client/plugins";
import type { auth } from "@/lib/auth"; // Import the auth instance as a type

export const authClient = createAuthClient({
  /** the base url of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [usernameClient(), customSessionClient<typeof auth>()],
});
