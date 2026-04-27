import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

async function getRedis() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
}

function isAuthed(req: NextRequest): boolean {
  const { searchParams } = new URL(req.url);
  return searchParams.get("key") === process.env.ADMIN_KEY;
}

export async function GET() {
  try {
    const redis = await getRedis();
    const raw = await redis.lRange("society_posts", 0, -1);
    await redis.disconnect();
    const posts = raw.map((item) => JSON.parse(item));
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ posts: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, excerpt, body: postBody, tag, pinned, imageUrl, videoUrl } = body;

    if (!title || !excerpt || !tag) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const post = {
      id: Date.now().toString(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      title,
      excerpt,
      body: postBody || "",
      tag,
      date: new Date().toISOString().split("T")[0],
      pinned: pinned || false,
      imageUrl: imageUrl || "",
      videoUrl: videoUrl || "",
    };

    const redis = await getRedis();
    await redis.rPush("society_posts", JSON.stringify(post));
    await redis.disconnect();

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Post error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { id, title, excerpt, body: postBody, tag, pinned, imageUrl, videoUrl } = body;

    if (!id || !title || !excerpt || !tag) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const redis = await getRedis();
    const raw = await redis.lRange("society_posts", 0, -1);
    const posts = raw.map((item) => JSON.parse(item));

    const index = posts.findIndex((p: any) => p.id === id);
    if (index === -1) {
      await redis.disconnect();
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    posts[index] = {
      ...posts[index],
      title,
      excerpt,
      body: postBody || "",
      tag,
      pinned: pinned || false,
      imageUrl: imageUrl || "",
      videoUrl: videoUrl || "",
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    };

    await redis.del("society_posts");
    for (const post of posts) {
      await redis.rPush("society_posts", JSON.stringify(post));
    }
    await redis.disconnect();

    return NextResponse.json({ success: true, post: posts[index] });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const redis = await getRedis();
    const raw = await redis.lRange("society_posts", 0, -1);
    const posts = raw.map((item) => JSON.parse(item));
    const filtered = posts.filter((p: any) => p.id !== id);

    await redis.del("society_posts");
    for (const post of filtered) {
      await redis.rPush("society_posts", JSON.stringify(post));
    }
    await redis.disconnect();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}