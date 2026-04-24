import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      from: "BEPOROS Orders <onboarding@resend.dev>",
      to: "antonislev7@gmail.com",
      subject: `New Order: ${productName} — @${order.instagram}`,
      html: `
        <h2>New Order</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Instagram:</strong> <a href="https://instagram.com/${order.instagram}">@${order.instagram}</a></p>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Size:</strong> ${size}</p>
        <p><strong>Quantity:</strong> ${quantity || 1}</p>
        <p><strong>Date:</strong> ${order.date}</p>
      `,
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (key !== process.env.ADMIN_KEY) {
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