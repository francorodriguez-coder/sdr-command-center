// API Route: /api/init
// POST: Initialize database tables + seed initial data
// Call once after connecting Vercel Postgres

import { NextResponse } from "next/server";
import { initDB, setState, addAction, logActivity } from "../../lib/db";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const API_KEY = process.env.SYNC_API_KEY || "sdr-command-center-dev";
    if (authHeader !== `Bearer ${API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Create tables
    const dbResult = await initDB();
    if (!dbResult.ok) {
      return NextResponse.json({ error: "DB init failed", detail: dbResult.error }, { status: 500 });
    }

    // 2. Seed initial state
    await setState("prioridades", [
      { n: "1", label: "Campanas core + pipeline actualizado", color: "#3b82f6", detail: "Lost SQL + Nurture Stalled SQL. Enviar emails, trackear, reportar indices de respuesta." },
      { n: "2", label: "Warm-up LinkedIn (piloto)", color: "#a855f7", detail: "Batch 3/semana, tier B/C. 4 etapas: identificar > follow > engage > connect." },
      { n: "3", label: "CSAT / NPS agresivo", color: "#eab308", detail: "Multi-canal incl. WhatsApp. Meta: completar en 2 meses. Separar CSAT de NPS." },
      { n: "4", label: "Account Planning", color: "#22c55e", detail: "Santillana (jueves), REMAX (prox. semana). Mapeo relacional + oportunidades." },
    ]);

    await setState("config", {
      syncApiKey: API_KEY,
      dashboardUrl: "https://sdr-command-center.vercel.app",
      pipelines: {
        sdr: "826132498",
        inbound: "default",
        upselling: "3532048",
      },
      stageMap: {
        "1224356372": { name: "New Lead", group: "pre" },
        "1224356373": { name: "Research + Tagging", group: "pre" },
        "1232050606": { name: "Ready to Ship", group: "pre" },
        "1308810585": { name: "Ready to Ship by Owner", group: "pre" },
        "1244737059": { name: "Hold", group: "pre" },
        "1224356374": { name: "Initial Outreach", group: "active" },
        "1275457612": { name: "1st Email Answered", group: "active" },
        "1224356375": { name: "Followup Sequence", group: "active" },
        "1224356376": { name: "Conversation", group: "active" },
        "1225118002": { name: "Requalification", group: "active" },
        "1225118003": { name: "Handoff", group: "active" },
        "1224356377": { name: "Won", group: "won" },
        "1224356378": { name: "Lost (Nurture Loop)", group: "lost" },
        "1225118004": { name: "Lost (No Response)", group: "lost" },
        "1244570040": { name: "Lost (Disqualified)", group: "lost" },
      },
    });

    // 3. Seed initial actions
    const initialActions = [
      { type: "campaign", action: "Armar campana Nurture Stalled SQL", target: "15 deals seleccionados del pipeline Inbound", priority: "alta" },
      { type: "email", action: "Enviar WhatsApp CSAT", target: "Empatico AI + 2 pendientes", priority: "alta" },
      { type: "warmup", action: "Follow a Naveed Janmohamed en LinkedIn", target: "Piloto warm-up — Asignado a Agustin", priority: "media" },
      { type: "warmup", action: "Follow a Amanda Zhu en LinkedIn", target: "Piloto warm-up — Asignado a Nicolas", priority: "media" },
      { type: "warmup", action: "Follow a Lior Alexander en LinkedIn", target: "Piloto warm-up — Asignado a Roberto", priority: "media" },
      { type: "email", action: "Enviar email a Hannah (Santillana)", target: "Confirmar extension proyecto a 2.5 meses", priority: "media" },
      { type: "planning", action: "Agendar reunion con Cris (Santillana)", target: "Presentar ballpark proposal nueva inversion", priority: "media" },
      { type: "report", action: "Actualizar reporte de campanas", target: "Indices de respuesta por campana", priority: "media" },
    ];

    for (const a of initialActions) {
      await addAction(a);
    }

    // 4. Log it
    await logActivity("Sistema inicializado", "sync", "DB creada, prioridades y acciones cargadas", "init");

    return NextResponse.json({
      status: "ok",
      message: "Database initialized, state seeded, actions created",
      tables: ["dashboard_state", "actions", "activity_log", "sync_data"],
      actionsCreated: initialActions.length,
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
