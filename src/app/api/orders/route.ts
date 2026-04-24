import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "");

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

    await redis.rpush("orders", JSON.stringify(order));

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
    const raw = await redis.lrange("orders", 0, -1);
    const orders = raw.map((item) => JSON.parse(item));
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ orders: [] });
  }
}