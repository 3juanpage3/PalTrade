import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { status } = await request.json();
    const offerId = params.id;

    if (!status || !["accepted", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Get the offer and verify listing ownership
    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
      include: {
        listing: true,
        bidder: true,
      },
    });

    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    // Only listing owner can accept/reject offers
    if (offer.listing.userId !== user.id) {
      return NextResponse.json(
        { error: "Not authorized to modify this offer" },
        { status: 403 }
      );
    }

    // If accepting, reject all other offers for this listing
    if (status === "accepted") {
      await prisma.offer.updateMany({
        where: {
          listingId: offer.listingId,
          id: { not: offerId },
          status: "pending",
        },
        data: { status: "rejected" },
      });

      // Send rejection notifications to other bidders
      const otherOffers = await prisma.offer.findMany({
        where: {
          listingId: offer.listingId,
          id: { not: offerId },
          status: "rejected",
        },
      });

      for (const otherOffer of otherOffers) {
        await prisma.notification.create({
          data: {
            userId: otherOffer.bidderId,
            type: "offer_rejected",
            title: "Bid Not Accepted",
            message: `Your bid for ${offer.listing.name} was not accepted`,
            relatedId: otherOffer.id,
          },
        });
      }

      // Deactivate listing
      await prisma.listing.update({
        where: { id: offer.listingId },
        data: { isActive: false },
      });
    }

    // Update the offer
    const updatedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: { status },
      include: {
        bidder: true,
        listing: true,
      },
    });

    // Create notification for bidder
    const notificationType =
      status === "accepted" ? "offer_accepted" : "offer_rejected";
    const notificationMessage =
      status === "accepted"
        ? `Your bid on ${updatedOffer.listing.name} was accepted!`
        : `Your bid on ${updatedOffer.listing.name} was rejected`;

    await prisma.notification.create({
      data: {
        userId: offer.bidderId,
        type: notificationType,
        title: status === "accepted" ? "Bid Accepted!" : "Bid Rejected",
        message: notificationMessage,
        relatedId: offerId,
      },
    });

    return NextResponse.json(updatedOffer, { status: 200 });
  } catch (error) {
    console.error("Error updating offer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
