import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const result = await sql`
      SELECT data FROM sync_data WHERE key = 'ecosystem_graph' LIMIT 1
    `;
    if (result.rows.length === 0) {
      return Response.json({ orgs: [], people: [], edges: [], aeroTeam: [] });
    }
    return Response.json(result.rows[0].data);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const apiKey = req.headers.get("authorization")?.replace("Bearer ", "");
    if (apiKey !== process.env.SYNC_API_KEY) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    await sql`
      DELETE FROM sync_data WHERE key = 'ecosystem_graph'
    `;
    await sql`
      INSERT INTO sync_data (key, data, source, synced_at)
      VALUES ('ecosystem_graph', ${JSON.stringify(body)}::jsonb, 'api', NOW())
    `;
    return Response.json({ status: "ok" });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
