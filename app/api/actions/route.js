// API Route: /api/actions
// Full lifecycle: add → pending → approved (with instructions) → completed
//                 pending → hold (parked for later) → pending (re-activated)
// Franco approves WITH instructions from dashboard
// Scheduled tasks poll for approved actions, execute them, mark complete

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const API_KEY = process.env.SYNC_API_KEY || "sdr-command-center-dev";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  try {
    let rows;
    if (status) {
      ({ rows } = await sql`SELECT * FROM actions WHERE status = ${status} ORDER BY created_at DESC`);
    } else {
      ({ rows } = await sql`SELECT * FROM actions ORDER BY created_at DESC LIMIT 100`);
    }

    if (!status) {
      const grouped = {
        pending: rows.filter(a => a.status === "pending"),
        approved: rows.filter(a => a.status === "approved"),
        hold: rows.filter(a => a.status === "hold"),
        completed: rows.filter(a => a.status === "completed").slice(0, 20),
        rejected: rows.filter(a => a.status === "rejected").slice(0, 10),
      };
      return NextResponse.json({ status: "ok", actions: grouped, total: rows.length });
    }
    return NextResponse.json({ status: "ok", actions: rows, total: rows.length });
  } catch (e) {
    return NextResponse.json({ status: "ok", actions: { pending: [], approved: [], hold: [], completed: [], rejected: [] }, total: 0 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // ADD — Create a new action in the queue
    if (body.action === "add") {
      const id = `action_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const type = body.data?.type || body.type || "general";
      const action = body.data?.action || body.description || "Sin descripcion";
      const target = body.data?.target || body.target || "";
      const priority = body.data?.priority || body.priority || "media";
      const metadata = JSON.stringify(body.data?.metadata || body.metadata || {});
      const source = body.data?.source || body.source || "system";

      await sql`
        INSERT INTO actions (id, type, action, target, priority, status, metadata, source)
        VALUES (${id}, ${type}, ${action}, ${target}, ${priority}, 'pending', ${metadata}, ${source})
      `;
      // Log it
      await sql`INSERT INTO activity_log (action, type, detail, source) VALUES (${`Nueva accion: ${action}`}, 'action', ${target}, ${source})`;
      return NextResponse.json({ status: "ok", id });
    }

    // APPROVE — Franco approves WITH optional instructions
    if (body.action === "approve") {
      const instructions = body.instructions || null;
      if (instructions) {
        await sql`UPDATE actions SET status = 'approved', approved_at = NOW(), instructions = ${instructions} WHERE id = ${body.actionId}`;
      } else {
        await sql`UPDATE actions SET status = 'approved', approved_at = NOW() WHERE id = ${body.actionId}`;
      }
      await sql`INSERT INTO activity_log (action, type, detail, source) VALUES (${`Accion aprobada: ${body.actionId}`}, 'action', ${instructions || 'Sin instrucciones especificas'}, 'franco')`;
      return NextResponse.json({ status: "ok" });
    }

    // HOLD — Park an action for later (from pending or approved)
    if (body.action === "hold") {
      const reason = body.reason || null;
      await sql`UPDATE actions SET status = 'hold', instructions = ${reason} WHERE id = ${body.actionId}`;
      await sql`INSERT INTO activity_log (action, type, detail, source) VALUES (${`Accion en hold: ${body.actionId}`}, 'action', ${reason || 'Sin motivo'}, 'franco')`;
      return NextResponse.json({ status: "ok" });
    }

    // UNHOLD — Move a held action back to pending
    if (body.action === "unhold") {
      await sql`UPDATE actions SET status = 'pending', approved_at = NULL, instructions = NULL WHERE id = ${body.actionId}`;
      await sql`INSERT INTO activity_log (action, type, detail, source) VALUES (${`Accion reactivada: ${body.actionId}`}, 'action', 'Movida de hold a pending', 'franco')`;
      return NextResponse.json({ status: "ok" });
    }

    // REJECT
    if (body.action === "reject") {
      const reason = body.reason || null;
      await sql`UPDATE actions SET status = 'rejected', rejected_at = NOW(), instructions = ${reason} WHERE id = ${body.actionId}`;
      await sql`INSERT INTO activity_log (action, type, detail, source) VALUES (${`Accion rechazada: ${body.actionId}`}, 'action', ${reason || ''}, 'franco')`;
      return NextResponse.json({ status: "ok" });
    }

    // COMPLETE — Scheduled task marks an approved action as executed
    if (body.action === "complete") {
      const authHeader = request.headers.get("authorization");
      if (authHeader !== `Bearer ${API_KEY}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const result = JSON.stringify(body.result || {});
      const executionLog = JSON.stringify(body.executionLog || {});
      await sql`UPDATE actions SET status = 'completed', completed_at = NOW(), result = ${result}, execution_log = ${executionLog} WHERE id = ${body.actionId}`;
      await sql`INSERT INTO activity_log (action, type, detail, source) VALUES (${`Accion ejecutada: ${body.actionId}`}, 'action', ${JSON.stringify(body.result || {})}, 'executor')`;
      return NextResponse.json({ status: "ok" });
    }

    // BATCH ADD
    if (body.action === "batch_add") {
      const results = [];
      for (const item of body.actions || []) {
        const id = `action_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        await sql`
          INSERT INTO actions (id, type, action, target, priority, status, source)
          VALUES (${id}, ${item.type || 'general'}, ${item.action}, ${item.target || ''}, ${item.priority || 'media'}, 'pending', ${item.source || 'system'})
        `;
        results.push({ id });
      }
      return NextResponse.json({ status: "ok", results });
    }

    return NextResponse.json({ error: "Unknown action. Use: add, approve, reject, hold, unhold, complete, batch_add" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
