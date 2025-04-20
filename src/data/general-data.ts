import { user } from "@/db/auth-schema";
import { db } from "@/db/drizzle";
import { post } from "@/db/schema";
import { count, desc, eq } from "drizzle-orm";
import "server-only";

export async function getHomePageData() {
  /**
   * For the homepage, we want to show the number of posts and writers (with their avatars)
   * Here we will fetch 3 user images for preview, but we will also fetch the number of all writers
   * We will also fetch the number of posts they have written
   */

  const writersPromise = db.select().from(user).orderBy(desc(user.createdAt));
  const postsPromise = db
    .select({ count: count() })
    .from(post)
    .where(eq(post.published, true));

  const [writers, posts] = await Promise.all([writersPromise, postsPromise]);

  return {
    writerCount: writers.length,
    postCount: posts[0].count,
    writerPreview: writers.slice(0, 3).map((writer) => ({
      id: writer.id,
      name: writer.name,
      username: writer.username,
      image: writer.image,
    })),
  };
}
