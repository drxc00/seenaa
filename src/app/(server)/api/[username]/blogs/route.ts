import "server-only";
import { NextResponse } from "next/server";
import { getPublishedUserPosts } from "@/data/post-dal";
import { db } from "@/db/drizzle";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const userData = await db
      .select()
      .from(user)
      .where(eq(user.username, username));

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
