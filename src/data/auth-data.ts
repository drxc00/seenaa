/**
 * Function to get the session data.
 * Unlink next-auth, better-auth makes session management more modularized.
 * Meaning, we can't simply invoke the auth() function we have created in auth.ts
 * We need to pass sepcific paramers, in this case the headers.
 * While not a big deal, it is wasteful to write the same code over and over again.
 * As such, we can create a helper function to get the session data.
 */

import "server-only";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getAuthData(
  params?: { otherHeaders?: Headers } | null | undefined
) {
  return auth.api.getSession({
    /**
     * If otherHeaders are provided, use them, otherwise use the headers from the request
     * Other headers are used for example when calling the API from the client
     * */
    headers: params?.otherHeaders || (await headers()),
  });
}
