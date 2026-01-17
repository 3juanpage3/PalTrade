import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * WebSocket handler for overlay real-time notifications
 *
 * Note: Next.js doesn't natively support WebSockets.
 * For production, use:
 * 1. Supabase Realtime (recommended for quick setup)
 * 2. Socket.io with a separate Node.js server
 * 3. Firebase Realtime Database
 * 4. Pusher.com
 *
 * Below is a Server-Sent Events (SSE) alternative that works with Next.js
 */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  if (!userId || !token) {
    return NextResponse.json(
      { error: "Missing userId or token" },
      { status: 400 }
    );
  }

  // Set up Server-Sent Events response
  const encoder = new TextEncoder();
  let isClosed = false;

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial connection message
      controller.enqueue(
        encoder.encode(
          "data: " + JSON.stringify({ type: "CONNECTED" }) + "\n\n"
        )
      );

      // Poll for notifications every 5 seconds
      const interval = setInterval(async () => {
        if (isClosed) {
          clearInterval(interval);
          controller.close();
          return;
        }

        try {
          // Get new notifications for user
          const notifications = await prisma.notification.findMany({
            where: {
              userId,
              read: false,
            },
            take: 5,
            orderBy: {
              createdAt: "desc",
            },
          });

          if (notifications.length > 0) {
            controller.enqueue(
              encoder.encode(
                "data: " +
                  JSON.stringify({
                    type: "NOTIFICATION",
                    payload: notifications,
                  }) +
                  "\n\n"
              )
            );
          }
        } catch (error) {
          console.error("Notification poll error:", error);
        }
      }, 5000);

      // Clean up on disconnect
      request.signal.addEventListener("abort", () => {
        isClosed = true;
        clearInterval(interval);
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
