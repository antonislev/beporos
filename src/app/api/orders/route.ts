import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

async function getRedis() {
  const client = createClient({ url: process.env.REDIS_URL });
  await client.connect();
  return client;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, instagram, size, quantity, productId, productName } = body;

    if (!name || !instagram || !size || !productId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const order = {
      id: Date.now().toString(),
      name,
      instagram: instagram.replace("@", ""),
      size,
      quantity: quantity || 1,
      productId,
      productName,
      date: new Date().toISOString(),
      status: "new",
    };

    const redis = await getRedis();
    await redis.rPush("orders", JSON.stringify(order));
    await redis.disconnect();

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (key !== "beporos2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const redis = await getRedis();
    const raw = await redis.lRange("orders", 0, -1);
    await redis.disconnect();
    const orders = raw.map((item) => JSON.parse(item));
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ orders: [] });
  }
}