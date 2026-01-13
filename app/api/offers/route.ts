import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { listingId, offerType, offerPrice, offerName, offerImage } =
      await request.json();

    // Validate input
    if (!listingId || !offerType || offerPrice === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if listing exists
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Can't bid on own listing
    if (listing.userId === user.id) {
      return NextResponse.json(
        { error: "Cannot bid on your own listing" },
        { status: 400 }
      );
    }

    // Create the offer
    const offer = await prisma.offer.create({
      data: {
        listingId,
        bidderId: user.id,
        offerType,
        offerPrice,
        offerName: offerName || null,
        offerImage: offerImage || null,
      },
      include: {
        bidder: { select: { id: true, name: true, email: true, image: true } },
      },
    });

    // Create notification for listing owner
    await prisma.notification.create({
      data: {
        userId: listing.userId,
        type: "offer_received",
        title: "New Bid",
        message: `${user.name || "Someone"} placed a bid on your ${
          listing.name
        } listing`,
        relatedId: offer.id,
      },
    });

    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    console.error("Error creating offer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const listingId = searchParams.get("listingId");

    if (!listingId) {
      return NextResponse.json(
        { error: "listingId is required" },
        { status: 400 }
      );
    }

    const offers = await prisma.offer.findMany({
      where: { listingId },
      include: {
        bidder: { select: { id: true, name: true, email: true, image: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(offers, { status: 200 });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
