import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const quickListSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  type: z.enum(["item", "pal"]).default("pal"),
  category: z.string().optional(),
  stats: z.string().optional(),
});

// Quick list endpoint optimized for overlay speed
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = quickListSchema.parse(body);

    const listing = await prisma.listing.create({
      data: {
        ...data,
        userId: session.user.id,
        quantity: 1,
      },
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        listing,
        message: `${data.name} listed successfully!`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}
