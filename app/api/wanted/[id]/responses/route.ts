import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const responseSchema = z.object({
  message: z.string().min(1),
  offerPrice: z.number().positive().optional(),
});

// GET responses for a wanted item
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const responses = await prisma.wantedItemResponse.findMany({
      where: { wantedItemId: params.id },
      include: {
        respondent: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(responses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch responses" },
      { status: 500 }
    );
  }
}

// POST response to wanted item
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = responseSchema.parse(body);

    // Verify wanted item exists
    const wantedItem = await prisma.wantedItem.findUnique({
      where: { id: params.id },
    });

    if (!wantedItem) {
      return NextResponse.json(
        { error: "Wanted item not found" },
        { status: 404 }
      );
    }

    // Create response
    const response = await prisma.wantedItemResponse.create({
      data: {
        wantedItemId: params.id,
        respondentId: session.user.id,
        message: data.message,
        offerPrice: data.offerPrice,
      },
      include: {
        respondent: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Create notification for wanted item owner
    await prisma.notification.create({
      data: {
        userId: wantedItem.userId,
        type: "offer_received",
        title: `${session.user.name} has what you want!`,
        message: `Someone responded to your "${wantedItem.name}" request`,
        relatedId: params.id,
      },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create response" },
      { status: 500 }
    );
  }
}
