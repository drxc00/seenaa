import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";
import { headers } from "next/headers";

export const withAuthActions = createSafeActionClient().use(async ({ next }) => {
  /** Auth middleware */
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Session not found!");
  }

  /** Get user Id and pass as additional context to action */
  if (!session.user.id) {
    throw new Error("User not found!");
  }

  const userId = session.user.id;

  return next({ ctx: { userId } });
});
