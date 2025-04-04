import "server-only";
import { user } from "@/db/auth-schema";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function getUserData(userId: string) {
  const userData = await db.select().from(user).where(eq(user.id, userId));
  return userData[0];
}
