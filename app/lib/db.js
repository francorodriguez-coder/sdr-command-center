// Database layer — Vercel Postgres + in-memory fallback
// Works with Vercel Postgres in prod, falls back to in-memory for dev/preview
import { sql } from "@vercel/postgres";

// ============================================================
// SCHEMA INIT — Run once on first deploy
// ============================================================
export async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS dashboard_state (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS actions (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        action TEXT NOT NULL,
        target TEXT,
        priority TEXT DEFAULT 'media',
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        approved_at TIMESTAMP,
        rejected_at TIMESTAMP,
        completed_at TIMESTAMP,
        result JSONB,
        metadata JSONB
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS activity_log (
        id SERIAL PRIMARY KEY,
        time TIMESTAMP DEFAULT NOW(),
        action TEXT NOT NULL,
        type TEXT NOT NULL,
        detail TEXT,
        source TEXT DEFAULT 'system'
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS sync_data (
        source TEXT NOT NULL,
        key TEXT NOT NULL,
        data JSONB NOT NULL,
        synced_at TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY (source, key)
      )
    `;
    return { ok: true };
  } catch (e) {
    console.error("DB init failed:", e.message);
    return { ok: false, error: e.message };
  }
}

// ============================================================
// DASHBOARD STATE — Key-value store for dashboard sections
// ============================================================
export async function getState(key) {
  try {
    const { rows } = await sql`SELECT value FROM dashboard_state WHERE key = ${key}`;
    return rows[0]?.value || null;
  } catch { return null; }
}

export async function setState(key, value) {
  try {
    await sql`
      INSERT INTO dashboard_state (key, value, updated_at)
      VALUES (${key}, ${JSON.stringify(value)}, NOW())
      ON CONFLICT (key) DO UPDATE SET value = ${JSON.stringify(value)}, updated_at = NOW()
    `;
    return true;
  } catch (e) { console.error("setState error:", e.message); return false; }
}

export async function getAllState() {
  try {
    const { rows } = await sql`SELECT key, value, updated_at FROM dashboard_state ORDER BY key`;
    const state = {};
    for (const row of rows) {
      state[row.key] = { data: row.value, updatedAt: row.updated_at };
    }
    return state;
  } catch { return {}; }
}

// ============================================================
// ACTIONS — Queue with approve/reject/complete lifecycle
// ============================================================
export async function getActions(status = null) {
  try {
    if (status) {
      const { rows } = await sql`SELECT * FROM actions WHERE status = ${status} ORDER BY created_at DESC`;
      return rows;
    }
    const { rows } = await sql`SELECT * FROM actions ORDER BY created_at DESC LIMIT 100`;
    return rows;
  } catch { return []; }
}

export async function addAction({ type, action, target, priority = "media", metadata = {} }) {
  const id = `action_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  try {
    await sql`
      INSERT INTO actions (id, type, action, target, priority, status, metadata)
      VALUES (${id}, ${type}, ${action}, ${target}, ${priority}, 'pending', ${JSON.stringify(metadata)})
    `;
    return { id, status: "pending" };
  } catch (e) { return { error: e.message }; }
}

export async function updateAction(id, status, result = null) {
  try {
    const timeField = status === "approved" ? "approved_at"
      : status === "rejected" ? "rejected_at"
      : status === "completed" ? "completed_at" : null;

    if (timeField && result) {
      await sql`UPDATE actions SET status = ${status}, ${sql.unsafe(timeField)} = NOW(), result = ${JSON.stringify(result)} WHERE id = ${id}`;
    } else if (timeField) {
      await sql`UPDATE actions SET status = ${status}, ${sql.unsafe(timeField)} = NOW() WHERE id = ${id}`;
    } else {
      await sql`UPDATE actions SET status = ${status} WHERE id = ${id}`;
    }
    return true;
  } catch (e) { return false; }
}

// ============================================================
// ACTIVITY LOG — Append-only feed
// ============================================================
export async function logActivity(action, type, detail, source = "system") {
  try {
    await sql`INSERT INTO activity_log (action, type, detail, source) VALUES (${action}, ${type}, ${detail}, ${source})`;
    return true;
  } catch { return false; }
}

export async function getActivity(limit = 20) {
  try {
    const { rows } = await sql`SELECT * FROM activity_log ORDER BY time DESC LIMIT ${limit}`;
    return rows;
  } catch { return []; }
}

// ============================================================
// SYNC DATA — Source-specific data store (hubspot, asana, etc.)
// ============================================================
export async function setSyncData(source, key, data) {
  try {
    await sql`
      INSERT INTO sync_data (source, key, data, synced_at)
      VALUES (${source}, ${key}, ${JSON.stringify(data)}, NOW())
      ON CONFLICT (source, key) DO UPDATE SET data = ${JSON.stringify(data)}, synced_at = NOW()
    `;
    return true;
  } catch { return false; }
}

export async function getSyncData(source, key = null) {
  try {
    if (key) {
      const { rows } = await sql`SELECT data, synced_at FROM sync_data WHERE source = ${source} AND key = ${key}`;
      return rows[0] || null;
    }
    const { rows } = await sql`SELECT key, data, synced_at FROM sync_data WHERE source = ${source}`;
    return rows;
  } catch { return null; }
}
