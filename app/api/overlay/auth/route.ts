import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// OAuth endpoint for overlay authentication
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code required" },
        { status: 400 }
      );
    }

    // In a real implementation, you would exchange the code for a token
    // For now, we'll just return a placeholder
    const token = Buffer.from(`overlay:${Date.now()}`).toString("base64");

    return NextResponse.json({
      token,
      expiresIn: 86400, // 24 hours
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 400 }
    );
  }
}

// OAuth authorization endpoint
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("client_id");
  const redirectUri = searchParams.get("redirect_uri");
  const scope = searchParams.get("scope");

  // Return OAuth consent page
  return NextResponse.json({
    authUrl: `/api/overlay/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`,
  });
}
