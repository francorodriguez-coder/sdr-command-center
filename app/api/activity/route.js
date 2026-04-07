// API Route: /api/activity
// GET: Returns recent activity feed
// POST: Log a new activity entry

import { NextResponse } from "next/server";
import { getActivity, logActivity } from "../../lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "20");
  const activity = await getActivity(limit);
  return NextResponse.json({ status: "ok", activity });
}

export async function POST(request) {
  try {
    const body = await request.json();
    await logActivity(
      body.action || "Unknown",
      body.type || "system",
      body.detail || "",
      body.source || "api"
    );
    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
