import { NextRequest, NextResponse } from "next/server";

// In-memory fallback if Vercel KV isn't set up yet
let memoryOrders: any[] = [];

// Try to import Vercel KV — falls back gracefully
let kv: any = null;
try {
  const kvModule = require("@vercel/kv");
  kv = kvModule.kv;
} catch {
  kv = null;
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

    if (kv && process.env.KV_REST_API_URL) {
      // Store in Vercel KV
      const orders = (await kv.get("orders")) || [];
      orders.push(order);
      await kv.set("orders", orders);
    } else {
      // Fallback: in-memory (resets on deploy, fine for testing)
      memoryOrders.push(order);
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Simple auth check via query param (replace with real auth later)
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (key !== "beporos2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let orders;
    if (kv && process.env.KV_REST_API_URL) {
      orders = (await kv.get("orders")) || [];
    } else {
      orders = memoryOrders;
    }

    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ orders: memoryOrders });
  }
}