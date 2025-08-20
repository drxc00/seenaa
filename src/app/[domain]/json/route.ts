import { getPublishedUserPosts } from "@/data/post-dal";
import { user } from "@/db/auth-schema";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ domain: string }> }
) {
  const { domain } = await params; // This is also the username of the user
  try {
    const userData = await db
      .select()
      .from(user)
      .where(eq(user.username, domain));

    if (!userData || userData.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = userData[0].id;
    const userPosts = await getPublishedUserPosts(userId);
    if (!userPosts || userPosts.length === 0) {
      return NextResponse.json({ posts: [] }, { status: 200 });
    }

    // Filter out posts
    const posts = userPosts.map((post) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      slug: post.slug,
    }));

    return NextResponse.json({ posts: posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch user posts" },
      { status: 500 }
    );
  }
}
