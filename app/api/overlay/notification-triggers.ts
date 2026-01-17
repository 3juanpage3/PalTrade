import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Create notification helper
 * Call this whenever a trade event happens
 */
export async function createNotification(
  userId: string,
  type:
    | "offer_received"
    | "offer_accepted"
    | "offer_rejected"
    | "trade_completed",
  title: string,
  message: string,
  relatedId?: string
) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        relatedId,
        read: false,
      },
    });

    // Broadcast to overlay via WebSocket (if using Socket.io)
    // io.to(`user:${userId}`).emit('notification', notification);

    // Or if using Supabase, trigger update
    // await supabase.from('notifications').insert([notification]);

    return notification;
  } catch (error) {
    console.error("Failed to create notification:", error);
  }
}

/**
 * Updated offers endpoint to trigger notifications
 * POST /api/offers - Create new offer
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      listingId,
      bidderId,
      offerType,
      offerPrice,
      offerName,
      offerImage,
    } = body;

    // Create the offer
    const offer = await prisma.offer.create({
      data: {
        listingId,
        bidderId,
        offerType,
        offerPrice,
        offerName,
        offerImage,
        status: "pending",
      },
      include: {
        listing: {
          include: {
            user: true,
          },
        },
        bidder: true,
      },
    });

    // Get listing owner
    const listingOwner = offer.listing.user;

    // Send notification to listing owner (via overlay)
    await createNotification(
      listingOwner.id,
      "offer_received",
      `${offer.bidder.name} made an offer on ${offer.listing.name}!`,
      `Offered: ${offerPrice} ${
        offerType === "pal" && offerName ? `(${offerName})` : ""
      }`,
      offer.listing.id
    );

    return NextResponse.json(offer, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create offer" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/offers/[id] - Accept/Reject offer
 */

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const offerId = searchParams.get("id");
    const body = await request.json();
    const { status } = body;

    if (!["accepted", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const offer = await prisma.offer.update({
      where: { id: offerId || "" },
      data: { status },
      include: {
        listing: true,
        bidder: true,
      },
    });

    // Notify bidder
    const action = status === "accepted" ? "accepted" : "declined";
    await createNotification(
      offer.bidderId,
      `offer_${action}` as any,
      `${offer.listing.name} - Offer ${action}!`,
      `Your offer on ${offer.listing.name} was ${action}.`,
      offer.listing.id
    );

    return NextResponse.json(offer);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update offer" },
      { status: 500 }
    );
  }
}

/**
 * Helper: Broadcast to all online users in overlay
 * Add this to your background job/webhook handler
 */

export async function broadcastTradeNotification(
  sellerId: string,
  buyerId: string,
  listingName: string,
  listingId: string
) {
  // Notify seller
  await createNotification(
    sellerId,
    "trade_completed",
    `Trade completed: ${listingName}`,
    `Your ${listingName} has been successfully traded!`,
    listingId
  );

  // Notify buyer
  await createNotification(
    buyerId,
    "trade_completed",
    `Trade received: ${listingName}`,
    `You received the ${listingName}!`,
    listingId
  );
}
