import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const wantedSchema = z.object({
  type: z.enum(["pal", "item"]),
  name: z.string().min(1),
  description: z.string().optional(),
  traits: z.array(z.string()).optional(),
  levelMin: z.number().int().min(1).max(50).optional(),
  levelMax: z.number().int().min(1).max(50).optional(),
  willingToPay: z.number().positive(),
  urgency: z.enum(["low", "medium", "high"]).default("medium"),
});

// GET all wanted items with filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const search = searchParams.get("search");
    const urgency = searchParams.get("urgency");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const where: any = {};
    if (type && type !== "all") where.type = type;
    if (urgency && urgency !== "all") where.urgency = urgency;
    if (minPrice) where.willingToPay = { gte: parseInt(minPrice) };
    if (maxPrice) {
      where.willingToPay = { ...where.willingToPay, lte: parseInt(maxPrice) };
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const wantedItems = await prisma.wantedItem.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            responses: true,
          },
        },
      },
      orderBy: {
        urgency: "desc", // Show urgent first
        createdAt: "desc",
      },
      take: 100,
    });

    return NextResponse.json(
      wantedItems.map((item) => ({
        ...item,
        respondents: item._count.responses,
        _count: undefined,
      }))
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch wanted items" },
      { status: 500 }
    );
  }
}

// POST new wanted item
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = wantedSchema.parse(body);

    const wantedItem = await prisma.wantedItem.create({
      data: {
        ...data,
        userId: session.user.id,
        traits: data.traits || [],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(wantedItem, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create wanted item" },
      { status: 500 }
    );
  }
}
