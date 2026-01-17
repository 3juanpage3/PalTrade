import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("🔍 Checking database health...");

    // Test 1: Check database connection
    console.log("✓ Attempting to connect to database...");
    await prisma.$queryRaw`SELECT 1`;
    console.log("✓ Database connection successful");

    // Test 2: Check if WantedItem table exists
    try {
      const count = await prisma.wantedItem.count();
      console.log(`✓ WantedItem table exists (${count} records)`);
      return NextResponse.json(
        {
          status: "healthy",
          database: "connected",
          wantedItemTable: "exists",
          recordCount: count,
          message: "✅ Everything is working! Tables exist.",
        },
        { status: 200 }
      );
    } catch (tableError: any) {
      console.error("✗ WantedItem table does not exist:", tableError.message);
      return NextResponse.json(
        {
          status: "tables_missing",
          database: "connected",
          wantedItemTable: "missing",
          message:
            "❌ Database connected but WantedItem table not found. Run the SQL migration in Supabase.",
          error: tableError.message,
        },
        { status: 503 }
      );
    }
  } catch (error: any) {
    console.error("✗ Database connection failed:", error);
    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        message:
          "❌ Cannot connect to database. Check DATABASE_URL in your .env.local",
        error: error.message,
      },
      { status: 503 }
    );
  }
}
