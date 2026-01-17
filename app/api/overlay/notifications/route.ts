import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const notificationSchema = z.object({
  userId: z.string(),
  type: z.enum(["offer", "message", "trade", "listing"]),
  title: z.string(),
  message: z.string(),
  relatedId: z.string().optional(),
  actionUrl: z.string().optional(),
});

// Get user notifications
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

// Create notification (internal API)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = notificationSchema.parse(body);

    const notification = await prisma.notification.create({
      data,
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}
