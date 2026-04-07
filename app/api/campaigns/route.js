// /api/campaigns
// GET  — returns campaigns from DB (synced from Asana)
// POST — syncs new campaign data (called by morning briefing with Bearer auth)

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const API_KEY = process.env.SYNC_API_KEY || "sdr-command-center-dev";

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT data, synced_at FROM sync_data WHERE key = 'campaigns' LIMIT 1
    `;
    if (rows.length === 0) {
      return NextResponse.json({ status: "ok", campaigns: [], synced_at: null });
    }
    const { data, synced_at } = rows[0];
    return NextResponse.json({
      status: "ok",
      campaigns: data.campaigns || [],
      total: data.total || 0,
      synced_at,
    });
  } catch (e) {
    return NextResponse.json({ status: "error", campaigns: [], error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  const apiKey = request.headers.get("authorization")?.replace("Bearer ", "");
  if (apiKey !== API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const campaigns = body.campaigns || [];
    const payload = JSON.stringify({ campaigns, total: campaigns.length, project_id: body.project_id });

    await sql`DELETE FROM sync_data WHERE key = 'campaigns'`;
    await sql`
      INSERT INTO sync_data (key, data, source, synced_at)
      VALUES ('campaigns', ${payload}::jsonb, 'asana', NOW())
    `;

    await sql`
      INSERT INTO activity_log (action, type, detail, source)
      VALUES (${`Campaigns synced from Asana: ${campaigns.length} campañas`}, 'sync', 'asana_sync', 'system')
    `;

    return NextResponse.json({ status: "ok", total: campaigns.length });
  } catch (e) {
    return NextResponse.json({ status: "error", error: e.message }, { status: 500 });
  }
}
