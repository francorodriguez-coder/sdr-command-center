// API Route: /api/sync
// Scheduled tasks POST data here → persisted in Vercel Postgres
// Dashboard GETs all data from here
// Supports partial updates per source (hubspot, asana, granola, etc.)

import { NextResponse } from "next/server";
import { getAllState, setState, getSyncData, setSyncData, logActivity, initDB } from "../../lib/db";

const API_KEY = process.env.SYNC_API_KEY || "sdr-command-center-dev";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source");
  const key = searchParams.get("key");

  // If requesting specific source data
  if (source) {
    const data = await getSyncData(source, key);
    return NextResponse.json({ status: "ok", source, data });
  }

  // Return full dashboard state
  const state = await getAllState();
  return NextResponse.json({
    status: "ok",
    state,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Support different sync modes
    if (body.mode === "init") {
      // Initialize database tables
      const result = await initDB();
      return NextResponse.json({ status: "ok", ...result });
    }

    if (body.mode === "source") {
      // Sync data from a specific source (hubspot, asana, granola, etc.)
      const { source, key, data } = body;
      await setSyncData(source, key, data);
      await logActivity(`Sync ${source}/${key}`, "sync", `${Object.keys(data).length} fields updated`, "scheduled-task");
      return NextResponse.json({ status: "ok", source, key });
    }

    if (body.mode === "state") {
      // Update a dashboard state section
      const { key, data } = body;
      await setState(key, data);
      return NextResponse.json({ status: "ok", key });
    }

    if (body.mode === "bulk") {
      // Bulk update multiple sections at once
      const results = {};
      for (const [key, data] of Object.entries(body.data || {})) {
        await setState(key, data);
        results[key] = "ok";
      }
      await logActivity("Bulk sync", "sync", `${Object.keys(results).length} sections updated`, body.source || "system");
      return NextResponse.json({ status: "ok", results });
    }

    // Legacy: simple overwrite
    for (const [key, value] of Object.entries(body)) {
      if (key !== "mode" && key !== "source") {
        await setState(key, value);
      }
    }
    return NextResponse.json({ status: "ok", message: "Data synced" });

  } catch (error) {
    return NextResponse.json({ error: error.message || "Invalid request" }, { status: 400 });
  }
}
