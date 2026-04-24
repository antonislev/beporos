import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

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

    const orders = (await kv.get<any[]>("orders")) || [];
    orders.push(order);
    await kv.set("orders", orders);

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
    const orders = (await kv.get<any[]>("orders")) || [];
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ orders: [] });
  }
}